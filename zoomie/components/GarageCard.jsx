import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import axios from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width; 

export default function GarageCard(props) {
  const { garage } = props;
  const dispatch = useDispatch();

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const goToDetail = (garage) => {
    props.props.navigation.navigate('Detail Shop', {
      garage
    })
  }
  
  const booking = (id) => {
    props.props.navigation.navigate('Chat', {
      garage
    })
  }

  const addFavorite = async (garage) => {
    try {
      const headers = {
        access_token: await AsyncStorage.getItem('@access_token')
      }
      const { data } = await axios.get('/favorites', { headers })
      const alreadyFavorites = data.find(favorite => favorite.garageId == garage.id)
      if (alreadyFavorites) {
        Alert.alert(`Info`, `${garage.name} Already in your favorites's list`)
      } else {
        const newFavorite = {
          garageId: garage.id
        }
        const { data } = await axios.post('/favorites', newFavorite, { headers })
        Alert.alert(`Success`, `${garage.name} added to favorites`)
      }
    }
    catch (err) {
      console.log(err.response);
    }
  } 

  return (
    <View style={styles.card}>
      <View>
        <TouchableOpacity onPress={() => goToDetail(garage)}>
          <Image 
            style={styles.cardImg}
            source={{
              uri: garage.image
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardInfo}>
        <View>
          <Text style={styles.cardName} onPress={() => goToDetail(garage)}>{garage.name}</Text>
          <Text style={styles.cardAddress} onPress={() => goToDetail(garage)}>{garage.address}</Text>
        </View>
        <View style={styles.btnGroups}>
          <TouchableOpacity style={styles.btnFavorite} onPress={() => addFavorite(garage)}>
            <Text style={styles.btnFavoriteText}>FAVORITE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnBook} onPress={() => booking(garage.id)}>
            <Text style={styles.btnFavoriteText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
    margin: 20,
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 5,
    flexDirection: 'row',
    borderRadius: 8,
  },
  cardImg: {
    width: 110,
    height: 110,
    top: -25,
    borderRadius: 10,
  },
  cardInfo: {
    marginLeft: 20,
  },
  cardName: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 20,
  },
  cardAddress: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 14,
    color: '#9B9B9B',
  },
  btnGroups: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
  },
  btnFavorite: {
    width: width * 0.22,
    height: 30,
    marginRight: 15,
    backgroundColor: '#DB3022',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnFavoriteText: {
    fontFamily: 'Bebes Neue',
    color: '#ffffff',
    fontSize: 11,
  },
  btnBook: {
    width: width * 0.22,
    height: 30,
    backgroundColor: '#4F4F4F',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBookText: {
    fontFamily: 'Bebes Neue',
    color: '#ffffff',
    fontSize: 11,
  },
});