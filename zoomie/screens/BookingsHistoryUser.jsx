import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import HistoryCard from '../components/HistoryCard';
import ActiveBookingUserCard from '../components/ActiveBookingUserCard'

export default function BookingsHistoryUser (props) {

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Current Booking's</Text>
        <ActiveBookingUserCard />
      </View>
      <View>
        <Text style={styles.title}>History Booking's</Text>
        <HistoryCard />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  },
  tinyProfPic: {
    alignSelf: 'flex-end',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'flex-end',
    right: 20,
  },
  title: {
    left: 14,
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 34,
    marginBottom: 20,
  },
  title: {
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});