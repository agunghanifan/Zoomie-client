import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import * as ImagePicker from 'expo-image-picker';
import base64 from 'react-native-base64'
import { useDispatch, useSelector } from 'react-redux'
import { currentUser } from '../store/actions/users'
import { getDataGarage } from '../store/actions/garages'
import { useIsFocused } from "@react-navigation/native";

const width = Dimensions.get('window').width; 

export default function EditProfileBengkel (props) {
  const garageLogIn = useSelector(state => state.garages.garageLogIn)
  const [profilImage, setProfilImage] = useState(null);
  // const [name, setName] = useState(user.name);
  const [garageName, setGarageName] = useState(garageLogIn[0].name);
  const [garageAddress, setGarageAddress] = useState(garageLogIn[0].address);
  const [garageDescription, setGarageDescription] = useState(garageLogIn[0].description);
  const [garageImage, setGarageImage] = useState(null);
  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    dispatch(currentUser())
    dispatch(getDataGarage())
  }, [isFocused]);

  const pickProfilImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setProfilImage(result.uri);
    }
  };

  const pickGarageImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setGarageImage(result.uri);
    }
  };

  // ini logic load font
  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  // end load font

  const signUp = () => {
    // Validation
    // check password and repeat password
    if (!garageName || !garageAddress || !garageDescription) {
      Alert.alert("Please fill all of the field!");
    }
    else {
      // if validated, then go to sign up process
      const newUser = {
        profilImage: base64.encode(profilImage),
        garageName,
        garageAddress,
        garageDescription,
        garageImage: base64.encode(garageImage)
      }
      console.log(newUser);
    }
  }

  return (
    <ScrollView>
      <View style={styles.center}>
        <Text style={styles.subTitle}>User Profile</Text>
        {/* <TextInput style={styles.textinput} placeholder="Name" value={name} onChange={(event) => setName(event.nativeEvent.text)} /> */}
        <View style={styles.uploadImage}>
          <View>
            <Button title="Pick an profile image" onPress={pickProfilImage} />
          </View>
          {profilImage && <Image source={{ uri: profilImage }} style={{ width: width * 0.4, height: width * 0.4 }} />}
        </View>
        <Text style={styles.subTitle}>Garage Profile</Text>
        <TextInput style={styles.textinput} placeholder="Garage Name" value={garageName} onChange={(event) => setGarageName(event.nativeEvent.text)} />
        <TextInput style={styles.textinput} placeholder="Garage Address" value={garageAddress} onChange={(event) => setGarageAddress(event.nativeEvent.text)} />
        <TextInput style={styles.textinput} multiline placeholder="Garage Description" value={garageDescription} onChange={(event) => setGarageDescription(event.nativeEvent.text)} />
        <View style={styles.uploadImage}>
          <View>
            <Button title="Pick an garage image" onPress={pickGarageImage} />
          </View>
          {garageImage && <Image source={{ uri: garageImage }} style={{ width: width * 0.4, height: width * 0.4 }} />}
        </View>
      </View>
      {/* <Text>{JSON.stringify(garageLogIn)}</Text>
      <Text>{JSON.stringify(user)}</Text> */}
      <View style={styles.center}>
        <TouchableOpacity onPress={() => signUp()} style={styles.btnSignUp}>
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
