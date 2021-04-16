import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import { Link } from '@react-navigation/native';

export default function App({ navigation: { navigate } }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // ini logic load font
  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  // end load font

  function navigateToSignUp () {
    navigate('SignUp')
  }

  function logIn () {
    const data = {
      username,
      password
    }
    console.log(data)
  }
  
  return (
    <ScrollView>
      <Text style={styles.title}>LOG IN HERE</Text>
      <View style={styles.center}>
        <TextInput style={styles.textinput} placeholder="Username" onChange={(event) => setUsername(event.nativeEvent.text)} />
        <TextInput style={styles.textinput} secureTextEntry={true} placeholder="Password" onChange={(event) => setPassword(event.nativeEvent.text)} />  
      </View>
      <Text style={styles.haveAccount} onPress={() => navigateToSignUp()}>FORGOT YOUR PASSWORD &#8594; </Text>
      <View style={styles.center}>
        <TouchableOpacity onPress={() => logIn()} style={styles.btnSignUp}>
          <Text style={styles.btnSignUpText}>LOG IN</Text>
        </TouchableOpacity>
      </View>
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
  btnSignUp: {
    marginTop: 20,
    width: 330,
    height: 64,
    backgroundColor: '#DB3022',
    borderRadius: 28,
  },
  btnSignUpText: {
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
    left: 270,
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
    backgroundColor: '#ffffff',
    elevation: 4,
    paddingLeft: 20,
    fontFamily: 'Bebes Neue',
    margin: 5
  },
  title: {
    marginTop: 80,
    marginBottom: 50,
    left: 14,
    height: 41,
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 34,
    lineHeight: 41
  }
});
