import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../axios'

const width = Dimensions.get('window').width; 

export default function EditProfileBengkel (props) {
  const { garage } = props.route.params;
  // const [name, setName] = useState(user.name);
  const [garageName, setGarageName] = useState('');
  const [garageAddress, setGarageAddress] = useState('');
  const [garageDescription, setGarageDescription] = useState('');
  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  useEffect(() => {
    setGarageName(garage.name);
    setGarageAddress(garage.address);
    setGarageDescription(garage.description);
  }, [isFocused]);


  // ini logic load font
  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  // end load font

  const editProfile = async () => {
    // Validation
    // check password and repeat password
    if (!garageName || !garageAddress || !garageDescription) {
      Alert.alert("Please fill all of the field!");
    }
    else {
      // if validated, then go to sign up process
      try {
        const updateProfile = {
          name: garageName,
          address: garageAddress,
          description: garageDescription,
        }
        console.log(updateProfile);
        const headers = {
          access_token: await AsyncStorage.getItem('@access_token')
        }
        const { data } = await axios.put('/garage', updateProfile, { headers })
        Alert.alert("Success", "Your Garage profile has been changed!")
        props.navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <ScrollView>
      <View style={styles.center}>
        <Text style={styles.subTitle}>Garage Profile</Text>
        <TextInput style={styles.textinput} placeholder="Garage Name" value={garageName} onChange={(event) => setGarageName(event.nativeEvent.text)} />
        <TextInput style={styles.textinput} placeholder="Garage Address" value={garageAddress} onChange={(event) => setGarageAddress(event.nativeEvent.text)} />
        <TextInput style={styles.textArea} multiline placeholder="Garage Description" value={garageDescription} onChange={(event) => setGarageDescription(event.nativeEvent.text)} />
      </View>
      {/* <Text>{JSON.stringify(garageLogIn)}</Text>
      <Text>{JSON.stringify(user)}</Text> */}
      <View style={styles.center}>
        <TouchableOpacity onPress={() => editProfile()} style={styles.btnSignUp}>
          <Text style={styles.btnSignUpText}>EDIT PROFILE</Text>
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
    marginBottom: 20,
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
  textArea: {
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: 330,
    minHeight: 130,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    elevation: 4,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    fontFamily: 'Bebes Neue',
    margin: 5
  },
  title: {
    marginTop: 40,
    marginBottom: 20,
    height: 41,
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 34,
    lineHeight: 41
  },
  subTitle: {
    marginTop: 20,
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 16,
    alignSelf: 'flex-start',
    left: 10,
  },
  uploadImage: {
    flexDirection: 'row'
  }
});
