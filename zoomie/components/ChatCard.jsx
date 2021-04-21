import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Moment from 'moment';
import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

const width = Dimensions.get('window').width; 

export default function ChatCard (props) {
  const {color, align, chat } = props;

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Montserrat': require('../assets/fonts/Montserrat-Medium.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const formatTime = (date) => {
    Moment.locale('en');
    return Moment(date).format('hh:mm, DD MMM');
  }
  
  return (
    <TouchableOpacity>
    <View
      style={styles.flatlist, {
          backgroundColor: `${color}`,
          alignSelf: `${align}`,
          maxWidth: width * 0.8,
          margin: 10,
          marginTop: 5,
          borderRadius: 15,
          justifyContent: 'center',
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 5,
          paddingBottom: 5,
        }
    }>
      <Text style={styles.subheading}>{chat.message}</Text>
      <Text style={styles.heading2}>{formatTime(chat.createdAt)}</Text>
    </View>
  </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  flatlist: {
    height: 100,
    padding: 200,
  },
  heading2: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: 'grey',
    fontFamily: 'Bebes Neue',
  },
  subheading: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Montserrat',
  },
});