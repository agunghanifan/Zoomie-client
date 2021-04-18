import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';

const width = Dimensions.get('window').width; 

export default function SuccessPage(props) {
  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const goToHistory = () => {
    props.navigation.replace('Main');
    props.navigation.navigate('Bookings History User')
  }

  return (
    <View style={styles.container}>
      <View style={styles.success}>
        <Image
          style={styles.successImg}
          source={require('../assets/img/success.png')}
        />
        <Text style={styles.successTitle}>SUCCESS!</Text>
        <Text style={styles.successText}>YOUR ORDER HAS BEEN SENT TO GARAGE</Text>
        <Text style={styles.successText}>PLEASE WAIT FOR GARAGE'S CONFIRM</Text>
        <Text style={styles.successText}>JUST RELAX AND FOCUS ON OTHER TASK!</Text>
      </View>
      <View style={styles.btnGroup}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText} onPress={() => goToHistory()}>SEE BOOKLIST AND HISTORY</Text>
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
    justifyContent: 'flex-end',
    padding: 30,
  },
  btnGroup: {
    justifyContent: 'center',
  },
  btn: {
    marginTop: 13,
    justifyContent: 'center',
    width: 320,
    height: 54,
    backgroundColor: '#DB3022',
    borderRadius: 28,
  },
  btnText: {
    fontFamily: 'Bebes Neue',
    textAlign: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: 20,
  },
  success: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "stretch",
    minHeight: 320,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: width * 0.3,
  },
  successTitle: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: width * 0.095,
    color: '#000000',
    margin: 15,
  },
  successText: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: width * 0.05,
    color: '#AFADAD',
  },
  successImg: {
    width: width * 0.8,
    height: width * 0.6
  },
});
