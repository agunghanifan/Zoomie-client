import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';

export default function ProfileUser ({ navigation: { navigate } }) {

  // ini logic load font
  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />
  }
  // end load font
  
  return (
    <ScrollView>
      <Text style={styles.title}>MY PROFILE</Text>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg'
        }}
      />
      <Text>Derek Deskumar</Text>
      <Text>Derekdeskumar@mail.com</Text>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Bebes Neue'
  },
  title: {
    left: 30,
    top: 106,
    fontFamily: 'Bebes Neue',
    fontSize: 34,
    color: '#222222',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  textUsername: {
    width: 98,
    height: 22,
    left: 113,
    top: 175,
    fontFamily: 'Bebes Neue',
    fontSize: 18,
    lineHeight: 22,
    color: '#222222'
  }
});
