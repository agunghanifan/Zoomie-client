import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import GarageCard from '../components/GarageCard';
import GarageEmpty from '../components/GarageEmpty';
import axios from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

export default function Home(props) {
  const garages = useSelector(state => state.garages.garages);
  const [search, setSearch] = useState('')
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [image, setImage] = useState(null);

  useEffect(_ => {
    getUser()
    getGarages ();
  }, [isFocused])

  async function getGarages () {
    try {
      dispatch({ type: 'garages/setGarages', payload: [] })
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

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Montserrat': require('../assets/fonts/Montserrat-Medium.ttf'),
  });
  if (!fontsLoaded || !garages) {
    return <AppLoading />;
  }

  const searchBtn = async () => {
    try {
      let searchedGarage = []
      const headers = {
        access_token: await AsyncStorage.getItem('@access_token')
      }
      const { data } = await axios.get('/garage', { headers });
      data.forEach(garage => {
        if (garage.address.toLowerCase().includes(search.toLowerCase()) || garage.name.toLowerCase().includes(search.toLowerCase())) {
          searchedGarage.push(garage);
        }
      });
      dispatch({ type: 'garages/setGarages', payload: searchedGarage })
      setSearch('');
    } catch (error) {
      console.log(error.response);
    }
  }
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>LIST REPAIR SHOP</Text>
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
      <View style={styles.containerSearch}>
        <View>
          <TextInput style={styles.textinput}
            placeholder="search name / area"
            value={search}
            onChange={(event) => setSearch(event.nativeEvent.text)} 
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={() => searchBtn()}>
            <Text style={styles.searchBtnText}>Search</Text>
          </TouchableOpacity>
        </View>
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
  containerSearch: {
    flexDirection:'row',
    left: 14,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBtn: {
    marginLeft: 3,
    borderRadius: 5,
    backgroundColor: '#DB3022',
    padding: 10,
    width: 80
  },
  searchBtnText: {
    textAlign: 'center',
    color: '#fff',
  },
  tinyProfPic: {
    position: 'absolute',
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
    marginTop: 9,
    left: 14,
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 34,
  },
  textinput: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 45,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    elevation: 4,
    paddingLeft: 20,
    fontFamily: 'Montserrat',
    margin: 5,
  },
});