import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import FavoriteCard from '../components/FavoriteCard';
import FavoriteEmpty from '../components/FavoriteEmpty';
import axios from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

export default function Favorites(props) {
  const favorites = useSelector(state => state.favorites.favorites);
  const loading = useSelector(state => state.favorites.loading);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [image, setImage] = useState(null);

  useEffect(_ => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getFavorites ();
      getUser ();
    });
    return unsubscribe;
  }, [isFocused])

  async function getFavorites () {
    try {
      dispatch({ type: 'loading/setLoading', payload: true })
      dispatch({ type: 'favorites/setFavorites', payload: [] });
      const headers = {
        access_token: await AsyncStorage.getItem('@access_token')
      }
      const { data } = await axios.get('/favorites', { headers });
      dispatch({ type: 'favorites/setFavorites', payload: data });
      dispatch({ type: 'loading/setLoading', payload: false })
    } catch (error) {
      console.log(error);
    }
  }

  async function getUser () {
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
  });
  if (!fontsLoaded || !favorites || loading) {
    return <AppLoading />;
  }
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>LIST FAVORITES</Text>
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
      <ScrollView>
        {
          favorites.length < 1 ? <FavoriteEmpty /> :
          favorites.map(favorite => (
            <FavoriteCard
              refetch={getFavorites}
              props={props}
              favorite={favorite}
              key={favorite.id}
            />
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 20,
  },
});