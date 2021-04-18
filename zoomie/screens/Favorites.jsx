import React, { useEffect } from 'react';
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
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(_ => {
    getFavorites ();
  }, [isFocused])

  async function getFavorites () {
    const headers = {
      access_token: await AsyncStorage.getItem('@access_token')
    }
    const { data } = await axios.get('/favorites', { headers });
    dispatch({ type: 'favorites/setFavorites', payload: data });
  }


  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded || !favorites) {
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
        <Text style={styles.title}>LIST FAVORITES REPAIR SHOP </Text>
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