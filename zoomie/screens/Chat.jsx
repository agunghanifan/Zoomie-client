import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import { Entypo } from '@expo/vector-icons';
import ChatCard from '../components/ChatCard';
import axios from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width; 
let newId = 100;

export default function Chat(props) {
  const [chat, setChat] = useState('');
  const { garage } = props.route.params;
  // console.log(garage, "garage from chat");

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const goToHome = () => {
    // props.navigation.navigate('Home')
    props.navigation.goBack();
  }

  const sendMessage = () => {
    console.log(chat);
    setChat('')
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
  
  // data chat dummy
  let data = [
    { id: 1, sender: 'you', time: '20:10', message: 'okay..' },
    { id: 2, sender: '', time: '19:10', message: 'Okay' },
    { id: 3, sender: 'you', time: '19:10', message: 'Thanks and go away!' },
    { id: 4, sender: '', time: '19:10', message: 'Oh Im so sorry to hear about that' },
    { id: 5, sender: 'you', time: '19:10', message: 'What?' },
    { id: 6, sender: '', time: '19:10', message: 'Okay' },
    { id: 7, sender: 'you', time: '19:10', message: 'Im Not Good' },
    { id: 8, sender: '', time: '19:10', message: 'How Are You?' },
    { id: 9, sender: 'you', time: '19:10', message: 'Hi..!' },
    { id: 10, sender: '', time: '19:10', message: 'Hello' },
  ];
  
  return (
    <View style={styles.container}>
      <FlatList
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