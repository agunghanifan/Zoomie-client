import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import GarageCard from '../components/GarageCard';
import axios from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home(props) {
  const garages = useSelector(state => state.garages.garages);
  const dispatch = useDispatch();

  useEffect(_ => {
    async function getGarages () {
      const headers = {
        access_token: await AsyncStorage.getItem('@access_token')
      }
      const { data } = await axios.get('/garage', { headers });
      console.log(data, '<<< data');
      console.log(`halo`);
    }

    getGarages ();
  }, [])

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
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
      </View>
      <View>
        <Text style={styles.title}>LIST REPAIR SHOP</Text>
      </View>
      <ScrollView>
        <GarageCard props={props}/>
        <GarageCard props={props}/>
        <GarageCard props={props}/>
        <GarageCard props={props}/>
        <GarageCard props={props}/>
        <GarageCard props={props}/>
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
  title: {
    left: 14,
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 34,
    marginBottom: 20,
  },
});