import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native'

import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';

const width = Dimensions.get('window').width;

export default function CheckoutUser() {

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>BENGKEL INFOS</Text>
        <View style={styles.cardInfo}>
          <View style={styles.paddingCardText}>
            <Text style={{ fontSize: 14, fontWeight: 'bold'}}>Bengkel Makmur</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold'}}>JL. Suka Maju</Text>
          </View>
        </View>
        <View style={styles.antrian}>
          <Text style={{ fontSize: 18, fontWeight: 'bold'}}>STATUS: ON PROGRESS</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 10 }}>Antrian ke -</Text>
          <Text style={{ fontSize: 96, fontWeight: 'bold'}}>8</Text>
        </View>
        <View style={styles.cardItems}>
          <View style={styles.paddingCardText}>
            <Text>LIST ITEM SERVICE</Text>
            <View style={styles.paddingCardText}>
              <Text>Ganti Oli</Text>
              <Text>Ganti Lampu Depan</Text>
              <Text>Ganti Knalpot</Text>
              <Text>Ganti Kapas Rem</Text>
              <Text>Ganti Kapas Rem</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.containerBooking}>
          <TouchableOpacity style={styles.btnBooking}>
            <Text style={styles.btnBookingText}>ORDER COMPLETE</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    left: 10,
    top: 19,
    fontWeight: 'bold',
    fontSize: 16
  },
  cardInfo: {
    alignSelf: 'center',
    width: width * 0.9,
    height: 108,
    top: 30,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  paddingCardText: {
    padding: 18,
    paddingBottom: 30,
    shadowColor: '#000000',
    shadowRadius: 10,
    shadowOffset: {
      height: 10,
      width: 10
    }
  },
  antrian: {
    top: 50,
    alignItems: 'center',
  },
  cardItems: {
    alignSelf: 'center',
    top: 50,
    backgroundColor: '#ffffff',
    width: width * 0.9,
    // height: 150,
    borderRadius: 10,
  },
  containerBooking: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  btnBooking: {
    width: width * 0.9,
    height: 48,
    backgroundColor: '#db3022',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBookingText: {
    fontFamily: 'Bebes Neue',
    color: '#ffffff',
    fontSize: 18,
  },
})
