import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import axios from '../axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'

export default function WelcomePage(props) {
  const isFocused = useIsFocused()
  const dispatch = useDispatch();
  
  useEffect(_ => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // check access token
      checkLocalStorage()
    });
    return unsubscribe;
  }, [])

  async function checkLocalStorage() {
    try {
      const id = await AsyncStorage.getItem('@id');
      if (id) {
        const headers = {
          access_token: await AsyncStorage.getItem('@access_token')
        }
        // kalo ada token, dia pindah halaman 
        if (headers.access_token) {
          const { data } = await axios.get('/user/' + id, { headers });
          dispatch({ type: 'user/setUser', payload: data });
          if (data.roles == 'user') props.navigation.replace('Main')
          else props.navigation.replace('Main Garage')
        }
        // kalo ga ada dia ga ngelakuin apa2
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Montserrat': require('../assets/fonts/Montserrat-Medium.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const goToSignupUser = () => {
    props.navigation.navigate('Signup User');
  }

  const goToSignupGarage = () => {
    props.navigation.navigate('Signup Garage');
  }
  
  const goToLogin = () => {
    props.navigation.navigate('Login User');
  }

  return (
    <View style={styles.container}>
      <View style={styles.home}>
        <ImageBackground
          source={require('../assets/img/wrench.jpg')}
          imageStyle={{ borderRadius: 15}}
          style={styles.homeBackground}
        >
          <Text style={styles.homeText}>WELCOME TO</Text>
          <Text style={styles.homeText}>ZOOMIE</Text>
        </ImageBackground>
      </View>
      <View style={styles.btnGroup}>
        <Image
          style={styles.logo}
          source={require('../assets/img/zoomie-logo.png')}
        />
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText} onPress={() => goToSignupGarage()}>SIGN UP FOR REPAIR SHOP OWNERS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText} onPress={() => goToSignupUser()}>SIGN UP FOR USERS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnGray}>
          <Text style={styles.btnText} onPress={() => goToLogin()}>LOGIN</Text>
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
    justifyContent: 'center',
  },
  btn: {
    marginTop: 13,
    justifyContent: 'center',
    width: 320,
    height: 58,
    backgroundColor: '#DB3022',
    borderRadius: 28,
  },
  btnGray: {
    marginTop: 15,
    justifyContent: 'center',
    width: 320,
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
    minHeight: 320,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  homeBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 320,
    alignSelf: "stretch",
    backgroundColor: '#4F4F4F',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  homeText: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 70,
    color: '#ffffff',
    textShadowColor: '#000',
    textShadowRadius: 30,
  },
  logo: {
    alignSelf: 'center',
    width: 97,
    height: 110,
    margin: 20,
  },
});
