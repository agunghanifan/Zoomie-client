import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';

export default function ProfileBengkel (props) {

  // ini logic load font
  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />
  }
  // end load font

  function historyOrders () {
    console.log("masuk history Bookings")
    props.navigation.navigate('Order History Bengkel')
  }

  function goToEditProfile () {
    console.log("masuk page edit profile")
    props.navigation.navigate('Edit Profil Bengkel', {
      username: 'sririyanto',
      email: 'sririyanto@gmail.com'
    })
  }

  function logOut () {
    Alert.alert("Logout", "Are you sure to Logout?",
      [
        { text: "Cancel", onPress: () => null, style: "cancel" },
        { text: "Logout", onPress: () => props.navigation.replace('Welcome Page') }
      ]
    );    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY PROFILE</Text>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://image.freepik.com/free-photo/adorable-dark-skinned-adult-woman-dressed-yellow-jumper-using-mobile-phone-with-happy-expression_273609-34293.jpg'
        }}
      />
      <Text style={styles.textUsername}>sririyanto</Text>
      <Text style={styles.textEmail}>sririyanto@mail.com</Text>
      <View style={styles.btnBox}>
        <View style={styles.capsText}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }} onPress={() => historyOrders()}>History Book</Text>
          <Text style={{ fontSize: 11 }}>Your Recent History Book</Text>
        </View>
      </View>
      <View style={styles.btnBox}>
        <View style={styles.capsText}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }} onPress={() => goToEditProfile()}>Edit Profile</Text>
          <Text style={{ fontSize: 11 }}>Edit your profile here</Text>
        </View>
      </View>
      <View style={styles.btnBox} >
        <View style={styles.capsText}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }} onPress={() => logOut()}>Logout</Text>
          <Text style={{ fontSize: 11 }}>Logout from App</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    fontFamily: 'Bebes Neue',
    backgroundColor: '#F9F9F9'
  },
  title: {
    left: 41,
    fontFamily: 'Bebes Neue',
    fontSize: 34,
    color: '#222222',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    left: 41,
    top: 10
  },
  textUsername: {
    left: 113,
    top: -35,
    fontFamily: 'Bebes Neue',
    fontSize: 18,
    color: '#222222'
  },
  textEmail: {
    left: 113,
    top: -35
  },
  btnBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 409,
    height: 72,
    borderBottomColor: '#828282',
    borderBottomWidth: 1
  },
  capsText: {
    left: 38
  }
});
