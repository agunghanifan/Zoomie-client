import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import axios from '../axios'

const width = Dimensions.get('window').width; 

export default function SignupUser(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  // ini logic load font
  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Montserrat': require('../assets/fonts/Montserrat-Medium.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  // end load font
  
  const goToLogin = () => {
    props.navigation.navigate('Login User');
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const signUp = async () => {
    // Validation
    // check password and repeat password
    if (password !== repeatPassword || !password) {
      Alert.alert("password didn't match or please check your password!");
      setPassword('');
      setRepeatPassword('');
    } else if (password.length < 6) {
      Alert.alert("password length minimal must be 6 digit!");
    } else if ( !username || !name || !email ) {
      Alert.alert("Please fill all of the field!");
    } else if ( !validateEmail(email) ) {
      Alert.alert("email format wrong!");
    } else {
      try {
        const newUser = {
          username: username.toLowerCase(),
          password,
          email: email.toLowerCase(),
          name,
          image: 'https://image.freepik.com/free-photo/adorable-dark-skinned-adult-woman-dressed-yellow-jumper-using-mobile-phone-with-happy-expression_273609-34293.jpg'
        }
        console.log(newUser);
        const { data } = await axios.post('/register', newUser)
        console.log(data);
        Alert.alert(`Register Success`, `Please login using ${newUser.username}`);
        props.navigation.replace('Login User')
      }
      catch (err) {
        console.log(err.response.data);
        Alert.alert(`Error`, err.response.data.errors[0].errors[0].message);
      }
    }
  }

  return (
    <ScrollView>
      <View style={styles.center}>
        <Text style={styles.title}>SIGN UP USER</Text>
        <TextInput style={styles.textinput} placeholder="Username" value={username} onChange={(event) => setUsername(event.nativeEvent.text)} />
        <TextInput style={styles.textinput} secureTextEntry={true} placeholder="Password" value={password} onChange={(event) => setPassword(event.nativeEvent.text)} />  
        <TextInput style={styles.textinput} secureTextEntry={true} placeholder="Password" value={repeatPassword} onChange={(event) => setRepeatPassword(event.nativeEvent.text)} />  
        <TextInput style={styles.textinput} placeholder="Email" value={email} onChange={(event) => setEmail(event.nativeEvent.text)} />
        <TextInput style={styles.textinput} placeholder="Name" value={name} onChange={(event) => setName(event.nativeEvent.text)} />
      </View>
      <Text style={styles.haveAccount} onPress={() => goToLogin()}>ALREADY HAVE AN ACCOUNT? &#8594;</Text>
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
    fontFamily: 'Montserrat',
    margin: 5
  },
  title: {
    marginTop: 40,
    marginBottom: 50,
    height: 41,
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 34,
    lineHeight: 41
  },
  uploadImage: {
    flexDirection: 'row'
  }
});
