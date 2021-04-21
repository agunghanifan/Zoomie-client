import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Alert, Button, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useSelector, useDispatch } from 'react-redux';
import { useFonts } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../axios'
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';


export default function ProfileUser (props) {
  const user = useSelector(state => state.users.user);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [image, setImage] = useState('https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg');

  useEffect(_ => {
    async function getUser() {
      try {
        const id = await AsyncStorage.getItem('@id');
        const headers = {
          access_token: await AsyncStorage.getItem('@access_token')
        }
        const { data } = await axios.get('/user/' + id, { headers });
        dispatch({ type: 'user/setUser', payload: data });
        setImage(data.image)
      }
      catch (err) {
        console.log(err);
      }
    }
    getUser()
  }, [isFocused])

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function uploadImage () {
    try {
      let formData = new FormData()
      let fileType= image.substring(image.lastIndexOf('.') + 1)
      formData.append("image", {
          uri: image,
          name: `photo.${fileType}`,
          type: `image/${fileType}`
        })
      const headers = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        access_token: await AsyncStorage.getItem('@access_token')
      }
      console.log(`mengupload `, image);
      const { data } = await axios.patch('/upload-avatar', formData, { headers })
      Alert.alert("Success", `your avatar has been changed!`)
    } catch (error) {
      console.log(error, 'error upload file');
      Alert.alert("Error", `error upload file, try again later!`)
    }
  }

  // ini logic load font
  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Montserrat': require('../assets/fonts/Montserrat-Medium.ttf'),
  });
  if (!fontsLoaded || !user) {
    return <AppLoading />
  }
  // end load font

  // function historyBookings () {
  //   props.navigation.navigate('Bookings History User')
  // }

  function logOutBtn () {
    Alert.alert("Logout", "Are you sure to Logout?",
      [
        { text: "Cancel", onPress: () => null, style: "cancel" },
        { text: "Logout", onPress: () => logOut() }
      ]
    );    
  }

  async function logOut () {
    try {
      await AsyncStorage.clear();
      props.navigation.replace('Welcome Page');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY PROFILE</Text>
      <TouchableOpacity onPress={pickImage}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: 'https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg'
          }}
        />
        {
          image && <Image source={{ uri: image }} style={styles.profilPic} />
        }
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnUpload} onPress={uploadImage}>
        <Text style={styles.btnUploadText}>Save</Text>
      </TouchableOpacity>
      <Text style={styles.textUsername}>{user.name}</Text>
      <Text style={styles.textEmail}>{user.email}</Text>
      {/* <View style={styles.btnBox}>
        <View style={styles.capsText}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }} onPress={() => historyBookings()}>Your Order and History</Text>
          <Text style={{ fontSize: 11 }}>Your Order Process and Recent History Book</Text>
        </View>
      </View> */}
      <View style={styles.btnBox} >
        <View style={styles.capsText}>
          <Text style={{ fontSize: 16, fontWeight: 'bold'}} onPress={() => logOutBtn()}>Logout</Text>
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
  btnUpload: {
    left: 47,
    top: 5,
    backgroundColor: 'blue',
    width: 65,
    padding: 5,
  },
  btnUploadText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'Bebes Neue',
    fontSize: 20,
  },
  title: {
    left: 41,
    fontFamily: 'Bebes Neue',
    fontSize: 34,
    color: '#222222',
  },
  tinyLogo: {
    width: 75,
    height: 75,
    borderRadius: 50,
    left: 41,
    top: 10
  },
  profilPic:{
    position: 'absolute',
    width: 75,
    height: 75,
    borderRadius: 50,
    left: 41,
    top: 10
  },
  textUsername: {
    left: 130,
    top: -77,
    fontFamily: 'Montserrat',
    fontSize: 18,
    color: '#222222'
  },
  textEmail: {
    left: 130,
    top: -77,
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
    alignSelf: 'stretch',
    left: 38
  }
});
