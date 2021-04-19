import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Alert, FlatList, Dimensions, TouchableOpacity, TextInput, LogBox } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import { Entypo } from '@expo/vector-icons';
import ChatCard from '../components/ChatCard';
import axios from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../helpers/firebase';

const width = Dimensions.get('window').width; 
let newId = 100;
// data chat dummy
let data = [
  { id: 1, garageId: 3, garageName: 'Garage46', userId: 36, userName: 'budi', createdAt: new Date(), message: 'okay..' },
  { id: 2, garageId: 3, garageName: 'Garage46', userId: 36, userName: 'budi', createdAt: new Date(), message: 'walalaa..' },
];

export default function Chat(props) {
  const [status, setStatus] = useState([]);
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState('');
  const { garage } = props.route.params;
  
  // LogBox.ignoreLogs(['Setting a timer for a long period of time'])

  useEffect(_ => {
    // fetchData();
  }, [])

  useEffect(_ => {
    console.log(`fetch chat`);
    fetchData();
  }, [status])
  
  const fetchData = async () => {
    const db = firebase.firestore()
    const data = await db.collection("chats").orderBy("createdAt", "asc").get()
    setChats(data.docs.map(doc => doc.data()))
  }

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded || !chats) {
    return <AppLoading />;
  }

  const goToHome = () => {
    props.navigation.goBack();
  }

  const sendMessage = async () => {
    try {
      const db = firebase.firestore()
      const ref = db.collection('chats').doc();
      const id = ref.id;
  
      const newChat = {
        id: id,
        garageId: garage.id,
        garageName: garage.name,
        userId: +await AsyncStorage.getItem('@id'),
        userName: await AsyncStorage.getItem('@name'),
        message: chat,
        createdAt: new Date()
      }
  
      db.collection('chats').add(newChat);
      // emit supaya semua client dapat update
      const data = await db.collection('status').add({ msg: 'someone send chat' });
      const status = await db.collection('status').get();
      setStatus(status.docs.map(doc => doc.data()))
  
      console.log(newChat);
      setChat('')
    } catch (error) {
      console.log(error);
    }
  }
  
  const sendTestMessage = async () => {
    try {
      newId++
      const newChat = {
        id: newId,
        garageId: garage.id,
        garageName: garage.name,
        userId: +await AsyncStorage.getItem('@id'),
        userName: await AsyncStorage.getItem('@name'),
        message: chat,
        sender: 'user',
        createdAt: new Date()
      }
      console.log(newChat);
      const temp = chats.concat(newChat);
      setChats(temp);
      setChat('');
    } catch (error) {
      console.log(error);
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
  
  return (
    <View style={styles.container}>
      {/* <FlatList
        inverted
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          let color = item.sender == 'you' ? '#1EBE71': 'wheat';
          let align = item.sender == 'you' ? 'flex-end': 'flex-start';
          return (
            <ChatCard
              message={item.message}
              time={item.time}
              color={color}
              align={align}
            />
          );
        }}
      /> */}
      <View>
        {
          chats.map(chat => (
            <Text key={chat.id}>{chat.message}</Text>
          ))
        }
      </View>
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
        <TouchableOpacity style={styles.btnBooking} onPress={() => bookingBtn()}>
          <Text style={styles.btnBookingText}>SUBMIT BOOKING</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnCancel} onPress={() => goToHome()}>
          <Text style={styles.btnBookingText}>CANCEL</Text>
        </TouchableOpacity>
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
    paddingTop: 20,
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
    backgroundColor: '#F2F2F2',
    width: width * 0.75,
    fontSize: 20,
    paddingTop: 15,
    paddingBottom: 15,
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