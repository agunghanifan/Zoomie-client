import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';

export default function SignupUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  // ini logic load font
  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  // end load font

  const signUp = () => {
    const newUser = {
      username, password, email, name
    }
    console.log(newUser);
  }

  return (
    <ScrollView>
      <Text style={styles.title}>SIGN UP</Text>
      <View style={styles.center}>
        <TextInput style={styles.textinput} placeholder="Username" onChange={(event) => setUsername(event.nativeEvent.text)} />
        <TextInput style={styles.textinput} secureTextEntry={true} placeholder="Password" onChange={(event) => setPassword(event.nativeEvent.text)} />  
        <TextInput style={styles.textinput} placeholder="Email" onChange={(event) => setEmail(event.nativeEvent.text)} />
        <TextInput style={styles.textinput} placeholder="Name" onChange={(event) => setName(event.nativeEvent.text)} />
      </View>
      <Text style={styles.haveAccount}>ALREADY HAVE AN ACCOUNT? &#8594;</Text>
      <View style={styles.center}>
        <TouchableOpacity onPress={() => signUp()} style={styles.btnSignUp}>
          <Text style={styles.btnSignUpText}>SIGN UP</Text>
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
    fontFamily: 'Bebas Neue'
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
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 16,
    left: 185,
    marginTop: 10,
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
