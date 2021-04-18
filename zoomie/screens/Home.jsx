import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import GarageCard from '../components/GarageCard';
import GarageEmpty from '../components/GarageEmpty';
import axios from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

export default function Home(props) {
  const garages = useSelector(state => state.garages.garages);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [image, setImage] = useState(null);

  useEffect(_ => {
    async function getGarages () {
      try {
        const headers = {
          access_token: await AsyncStorage.getItem('@access_token')
        }
        const { data } = await axios.get('/garage', { headers });
        dispatch({ type: 'garages/setGarages', payload: data })
      } catch (error) {
        console.log(error.response);
      }
    }
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
    getGarages ();
  }, [isFocused])

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded || !garages) {
    return <AppLoading />;
  }
  
  return (
    <View style={styles.container}>
      <View>
        <Image 
          style={styles.tinyProfPic}
          source={{
            uri: 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'
          }}
        />
        {
          image && <Image source={{ uri: image }} style={styles.profilPic} />
        }
      </View>
      <View>
        <Text style={styles.title}>LIST REPAIR SHOP</Text>
      </View>
      <ScrollView>
        {
          garages.length < 1 ? <GarageEmpty /> :
          garages.map(garage => (
            <GarageCard
              props={props}
              garage={garage}
              key={garage.id}
            />
          ))
        }
      </ScrollView>
      <View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  tinyProfPic: {
    alignSelf: 'flex-end',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'flex-end',
    right: 20,
  },
  profilPic:{
    position: 'absolute',
    alignSelf: 'flex-end',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'flex-end',
    right: 20,
  },
  title: {
    left: 14,
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 34,
    marginBottom: 20,
  },
});