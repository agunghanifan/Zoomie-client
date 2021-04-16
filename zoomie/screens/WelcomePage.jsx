import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';

export default function App(props) {
  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const goToSignupUser = () => {
    props.navigation.navigate('Signup User');
  }
  const goToSignupGarage = () => {
    console.log(`go to signup garage`);
    // props.navigation.navigate('Signup User');
  }
  const goToLogin = () => {
    console.log(`go to login`);
    // props.navigation.navigate('Signup User');
  }

  return (
    <View style={styles.container}>
      <View style={styles.home}>
        <Text style={styles.homeText}>WELCOME TO ZOOMIE APP</Text>
      </View>
      <View style={styles.btnGroup}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>SIGN UP FOR BENGKEL OWNERS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText} onPress={() => goToSignupUser()}>SIGN UP FOR USERS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnGray}>
          <Text style={styles.btnText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  btnGroup: {
    flex: 1,
    justifyContent: 'center',
  },
  btn: {
    marginTop: 20,
    justifyContent: 'center',
    width: 330,
    height: 58,
    backgroundColor: '#DB3022',
    borderRadius: 28,
  },
  btnGray: {
    marginTop: 20,
    justifyContent: 'center',
    width: 330,
    height: 58,
    backgroundColor: '#4F4F4F',
    borderRadius: 28,
  },
  btnText: {
    fontFamily: 'Bebes Neue',
    textAlign: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: 20,
  },
  home: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "stretch",
    minHeight: 200,
    backgroundColor: '#DB3022',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  homeText: {
    alignItems: 'center',
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 34,
    color: '#222222',
  }
});
