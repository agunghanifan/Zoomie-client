import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import axios from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import ReviewCard from '../components/ReviewCard';
import ReviewEmpty from '../components/ReviewEmpty';
import starRating from '../helpers/starRating';

const width = Dimensions.get('window').width; 

export default function DetailShop(props) {
  const { garage } = props.route.params;
  const reviews = useSelector(state => state.reviews.reviews);

  const dispatch = useDispatch();

  useEffect(_ => {
    getReviews();
  }, [])

  const getReviews = async () => {
    try {
      const headers = {
        access_token: await AsyncStorage.getItem('@access_token')
      }
      const { data } = await axios.get('/reviews/', { 
          params: { 
            garage: garage.id 
          }, 
          headers 
        })
      dispatch({ type: 'reviews/setReviews', payload: data })
    } catch (error) {
      console.log(error);
    }
  }

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Montserrat': require('../assets/fonts/Montserrat-Medium.ttf'),
  });
  if (!fontsLoaded || !reviews) {
    return <AppLoading />;
  }

  const booking = (id) => {
    props.navigation.navigate('Chat', {
      garage
    })
  }

  const reviewAvg = () => {
    if (reviews.length > 0) {
      let temp = reviews.reduce((n, {score}) => n + score, 0) / reviews.length;
      return temp.toFixed(1);
    } else {
      return '-'
    }
  }
  
  return (
    <View style={styles.container}>
      <ScrollView style={{marginBottom: 5}}>
        <View>
          <Image 
            style={styles.repairShopPicture}
            source={{
              uri: garage.image
            }}
          />
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.shopName}>{garage.name}</Text>
          <Text style={styles.shopAddress}>{garage.address}</Text>
          <Text style={{ marginTop: 5 }}>{starRating(reviewAvg())}</Text>
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.shopInfo}>
            {garage.description}
          </Text>
        </View>
        <View style={styles.containerReviews}>
          <Text style={styles.shopReview}>Reviews: ( {reviewAvg()} / 5 ) </Text>
        </View>
        {
          reviews.length < 1 ? <ReviewEmpty /> :
          reviews.map(review => (
            <ReviewCard 
              review={review}
              key={review.id}
            />
          ))
        }
      </ScrollView>
      <View style={styles.containerBooking}>
        <TouchableOpacity style={styles.btnBooking} onPress={() => booking(garage.id)}>
          <Text style={styles.btnBookingText}>BOOKING / CHAT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTitle: {
    marginLeft: 14,
  },
  containerReviews: {
    marginTop: 20,
    marginLeft: 14,
  },
  containerInfo: {
    marginLeft: 14,
    marginRight: 14,
  },
  containerBooking: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    
  },
  btnBooking: {
    width: width * 0.9,
    height: 48,
    backgroundColor: '#DB3022',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBookingText: {
    fontFamily: 'Bebes Neue',
    color: '#ffffff',
    fontSize: 18,
  },
  repairShopPicture: {
    width: width * 1,
    height: width * 1,
  },
  shopName: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 34,
    marginBottom: 5,
    marginTop: 16,
  },
  shopAddress: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 20,
    color: '#9B9B9B',
  },
  shopReview: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 20,
    color: '#000',
  },
  shopInfo: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1,
    padding: 10,
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 22,
    marginBottom: 5,
    marginTop: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#DB3022',
  },
});