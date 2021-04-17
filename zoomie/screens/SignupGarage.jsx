import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import * as ImagePicker from 'expo-image-picker';
import base64 from 'react-native-base64'

const width = Dimensions.get('window').width; 

export default function SignupUser(props) {
  const [profilImage, setProfilImage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [garageName, setGarageName] = useState('');
  const [garageStatus, setGarageStatus] = useState('');
  const [garageAddress, setGarageAddress] = useState('');
  const [garageDescription, setGarageDescription] = useState('');
  const [garageImage, setGarageImage] = useState(null);

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
  
  const goToLogin = () => {
    props.navigation.navigate('Login User');
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const signUp = () => {
    // Validation
    // check password and repeat password
    if (password !== repeatPassword || !password) {
      Alert.alert("password didn't match or please check your password!");
      setPassword('');
      setRepeatPassword('');
    } else if (!username || !name || !garageName || !email || !garageAddress || !garageStatus || !garageDescription) {
      Alert.alert("Please fill all of the field!");
    } else if (!validateEmail(email)) {
      Alert.alert("email format wrong!");
    }
    else {
      // if validated, then go to sign up process
      const newUser = {
        username,
        password,
        email: email.toLowerCase(),
        name,
        profilImage: base64.encode(profilImage),
        garageName,
        garageAddress,
        garageStatus,
        garageDescription,
        garageImage: base64.encode(garageImage)
      }
      console.log(newUser);
    }
  }

  return (
    <ScrollView>
      <View style={styles.center}>
        <Text style={styles.title}>SIGN UP REPAIR SHOP</Text>
        <Text style={styles.subTitle}>User Profile</Text>
        <TextInput style={styles.textinput} placeholder="Username" value={username} onChange={(event) => setUsername(event.nativeEvent.text)} />
        <TextInput style={styles.textinput} secureTextEntry={true} placeholder="Password" value={password} onChange={(event) => setPassword(event.nativeEvent.text)} />  
        <TextInput style={styles.textinput} secureTextEntry={true} placeholder="Repeat Password" value={repeatPassword} onChange={(event) => setRepeatPassword(event.nativeEvent.text)} />  
        <TextInput style={styles.textinput} placeholder="Email" value={email} onChange={(event) => setEmail(event.nativeEvent.text)} />
        <TextInput style={styles.textinput} placeholder="Name" value={name} onChange={(event) => setName(event.nativeEvent.text)} />
        <View style={styles.uploadImage}>
          <View>
            <Button title="Pick an profile image" onPress={pickProfilImage} />
          </View>
          {profilImage && <Image source={{ uri: profilImage }} style={{ width: width * 0.4, height: width * 0.4 }} />}
        </View>
        <Text style={styles.subTitle}>Garage Profile</Text>
        <TextInput style={styles.textinput} placeholder="Garage Name" value={garageName} onChange={(event) => setGarageName(event.nativeEvent.text)} />
        <TextInput style={styles.textinput} placeholder="Garage Address" value={garageAddress} onChange={(event) => setGarageAddress(event.nativeEvent.text)} />
        <TextInput style={styles.textinput} placeholder="Garage Status" value={garageStatus} onChange={(event) => setGarageStatus(event.nativeEvent.text)} />
        <TextInput style={styles.textinput} placeholder="Garage Description" value={garageDescription} onChange={(event) => setGarageDescription(event.nativeEvent.text)} />
        <View style={styles.uploadImage}>
          <View>
            <Button title="Pick an garage image" onPress={pickGarageImage} />
          </View>
          {garageImage && <Image source={{ uri: garageImage }} style={{ width: width * 0.4, height: width * 0.4 }} />}
        </View>
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
