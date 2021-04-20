import React, { Component, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Alert, FlatList, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import { Entypo } from '@expo/vector-icons';
import ChatCard from '../components/ChatCard';
import axios from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client'

const width = Dimensions.get('window').width; 
let socket;

export default function Chat(props) {
  const { garage } = props.route.params;

  const chats = useSelector(state => state.chats.chats);
  const [yourstatus, setYourstatus] = useState('');
  const [chat, setChat] = useState('');
  const [test, setTest] = useState('');

  const dispatch = useDispatch();
  // console.log(garage, "garage from chat");

  useEffect(_ => {
    props.navigation.setOptions({ title: garage.name.toUpperCase()})
    getChats();
    socket = io('http://192.168.0.150:3000');
    socket.on("newChat", newChatCallback);

    return () => {
      socket.off('newChat', newChatCallback);
    }
  }, []);

  const newChatCallback = () => {
    getChats();
  }

  async function getChats () {
    try {
      let status = await AsyncStorage.getItem('@roles');
      setYourstatus(status);
      const headers = {
        access_token: await AsyncStorage.getItem('@access_token')
      }
      const { data } = await axios.get('/chats/' + garage.id, { headers });
      dispatch({ type: 'chats/setChats', payload: data });
    } catch (error) {
      console.log(error.response);
    }
  }

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded || !chats) {
    return <AppLoading />;
  }

  const goBack = () => {
    props.navigation.goBack();
  }

  const sendMessage = async () => {
    if (chat) {
      try {
        dispatch({ type: 'chats/setChats', payload: [] });
        const headers = {
          access_token: await AsyncStorage.getItem('@access_token')
        }
        const newChat = {
          message: chat
        }
        const { data } = await axios.post('/chats/' + garage.id, newChat, { headers });
        setChat('')
      } catch (error) {
        console.log(error.response);
      }
    }
  }

  const bookingBtn = () => {
    Alert.alert("Submit Booking", "Are you sure to Submit Booking?",
      [
        { text: "Cancel", onPress: () => null, style: "cancel" },
        { text: "YES", onPress: () => confirmBooking() }
      ]
    );    
  }

  const confirmBooking = async () => {
    //bikin baru transaksi
    const headers = {
      access_token: await AsyncStorage.getItem('@access_token')
    }
    const newTransactions = {
      description: '',
      garageId: garage.id
    }
    const { data } = await axios.post('/transactions', newTransactions, { headers })
    console.log(data);
    props.navigation.navigate('Success')
  }
  const setButton = () => {
    if (yourstatus == 'user') {
      return (
        <>
          <TouchableOpacity style={styles.btnBooking} onPress={() => bookingBtn()}>
            <Text style={styles.btnBookingText}>SUBMIT BOOKING</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCancel} onPress={() => goBack()}>
            <Text style={styles.btnBookingText}>CANCEL</Text>
          </TouchableOpacity>
        </>
      )
    } else {
      return (
        <>
          <TouchableOpacity style={styles.btnCancel2} onPress={() => goBack()}>
            <Text style={styles.btnBookingText}>Back</Text>
          </TouchableOpacity>
        </>
      )
    }
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        inverted
        data={chats}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          let color,align;
          if (yourstatus == 'user') {
            color = item.sender == 'user' ? '#22D781': 'wheat';
            align = item.sender == 'user' ? 'flex-end': 'flex-start';
          } else {
            color = item.sender == 'garage' ? '#22D781': 'wheat';
            align = item.sender == 'garage' ? 'flex-end': 'flex-start';
          }
          return (
            <>
              <ChatCard
                color={color}
                align={align}
                chat={item}
                key={item.id}
              />
            </>
          );
        }}
      />
      <View style={styles.containerChat}>
        <TextInput
          multiline
          placeholder="Message"
          style={styles.chatInput}
          onChange={(event) => setChat(event.nativeEvent.text)} 
          value={chat}
        />
        <TouchableOpacity style={styles.btnSend}>
          <Entypo onPress={() => sendMessage()} name="direction" size={40} color="black" style={{transform: [{rotate: "36deg"}]}}/>
        </TouchableOpacity>
      </View>
      <View style={styles.btnGroup}>
        {setButton()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMessage: {
    marginBottom: 5,
  },
  containerChat: {
    backgroundColor: '#FCFCFC',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  containerTitle: {
    margin: 14,
  },
  containerInfo: {
    marginLeft: 14,
    marginRight: 14,
  },
  chatInput: {
    fontFamily: 'Bebes Neue',
    backgroundColor: '#F2F2F2',
    width: width * 0.75,
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 10,
    borderRadius: 50,
    marginRight: 10,
  },
  btnGroup: {
    backgroundColor: '#FCFCFC',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    flexDirection: 'row',
  },
  btnBooking: {
    width: width * 0.4,
    height: 48,
    backgroundColor: '#DB3022',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancel: {
    width: width * 0.4,
    height: 48,
    backgroundColor: '#4F4F4F',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancel2: {
    width: width * 0.8,
    height: 48,
    backgroundColor: '#4F4F4F',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBookingText: {
    fontFamily: 'Bebes Neue',
    color: '#ffffff',
    fontSize: 18,
  },
  flatlist: {
    height: 100,
    padding: 200,
  },
  heading2: {
    color: 'grey',
  },
  subheading: {
    fontSize: 18,
    color: 'black',
  },
});