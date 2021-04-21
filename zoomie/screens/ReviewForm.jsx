import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import axios from '../axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

export default function ReviewForm (props) {
  const { transaction } = props.route.params;

  const [message, setMessage] = useState('')
  const [rating, setRating] = useState('')

  // ini logic load font
  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Montserrat': require('../assets/fonts/Montserrat-Medium.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  // end load font

  const addRatingBtn = () => {
    Alert.alert("Send Review", "Are you sure to send review?",
      [
        { text: "Cancel", onPress: () => null, style: "cancel" },
        { text: "Send Review", onPress: () => addRating() }
      ]
    );    
  }

  const addRating = async () => {
    if (!message || !rating) {
      Alert.alert("Error", "Please fill all of the field")
    } else {
      try {
        const newRating = {
          message,
          score: rating
        }
        const headers = {
          access_token: await AsyncStorage.getItem('@access_token')
        }
        const { data } = await axios.post('/reviews/' + transaction.id, newRating, { headers });
        Alert.alert("Success", "Thankyou for your review!")
        // props.navigation.replace('Main');
        props.navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  function ratingWord (rate) {
    switch (rate) {
      case "5":
        return 'Best (5)'
      case "4":
        return 'Good (4)'
      case "3":
        return 'Average (3)'
      case "2":
        return 'Below Average (2)'
      case "1":
        return 'Poor (1)'
      default:
        return ''
    }
  }

  return (
    <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{transaction.Garage.name}</Text>
      <Text style={styles.shopAddress}>{transaction.Garage.address}</Text>
    </View>
    <ScrollView>
      <View style={styles.center}>
        <Text style={styles.label}>Rating</Text>
        <View style={styles.textinput}>
        <RNPickerSelect
          value={rating}
          onValueChange={(value) => setRating(value)}
          items={[
            { label:"Best (5)", value:"5" },
            { label:"Good (4)", value:"4" },
            { label:"Average (3)", value:"3" },
            { label:"Below Average (2)", value:"2" },
            { label:"Poor (1)", value:"1" },
          ]}
        />
        <Text style={styles.dropdownText}>{ratingWord(rating)}</Text>
        </View>
        <Text style={styles.label}>Message</Text>
        <TextInput multiline style={styles.textArea} value={message} placeholder="What do you think ?" onChange={(event) => setMessage(event.nativeEvent.text)} />
      </View>
      <StatusBar style="auto" />
    </ScrollView>
      <View style={styles.containerBooking}>
        <TouchableOpacity onPress={() => addRatingBtn()} style={styles.btnSignUp}>
          <Text style={styles.btnSignUpText}>SEND REVIEW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    fontFamily: 'Bebes Neue'
  },
  containerBooking: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  titleContainer: {
    width: 330,
    backgroundColor: '#fff',
    alignSelf: 'center',
    margin: 20,
    padding: 20,
  },
  title: {
    alignSelf: 'center',
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 34,
  },
  label: {
    alignSelf: 'flex-start',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 18,
    left: 15,
    margin: 5,
  }, 
  btnSignUp: {
    width: 330,
    height: 64,
    backgroundColor: '#DB3022',
    borderRadius: 28,
  },
  btnSignUpText: {
    alignSelf: 'center',
    fontFamily: 'Bebes Neue',
    top: 20,
    textAlign: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: 20,
  },
  center: {
    alignItems: 'center',
  },
  haveAccount: {
    width: 110,
    height: 20,
    left: 250,
    top: 10,
    fontFamily: 'Bebes Neue',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'right',
    color: '#222222'
  },
  textinput: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 330,
    height: 64,
    borderRadius: 4,
    color: '#000',
    elevation: 4,
    paddingLeft: 20,
    fontFamily: 'Montserrat',
    margin: 5
  },
  textArea: {
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 330,
    minHeight: 130,
    borderRadius: 4,
    color: '#000',
    elevation: 4,
    padding: 20,
    fontFamily: 'Montserrat',
    margin: 5
  },
  dropdownText: {
    position: 'absolute',
    color: '#000',
    fontFamily: 'Montserrat',
  },
  shopAddress: {
    alignSelf: 'center',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 20,
    color: '#9B9B9B',
  },
});
