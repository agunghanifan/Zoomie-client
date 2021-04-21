import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import statusTranslate from '../helpers/statusTranslate';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import Moment from 'moment';
import axios from '../axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width; 

export default function HistoryCard (props) {
  const { transaction } = props;

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Montserrat': require('../assets/fonts/Montserrat-Medium.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  const goToDetailOrder = (transaction) => {
    props.props.navigation.navigate('Checkout User', {
      transaction
    });
  }
  
  const formatDate = (date) => {
    Moment.locale('en');
    return Moment(date).format('ddd, DD MMM YYYY');
  }

  const goToReview = async () => {
    if (transaction.isReviewed == true) {
      Alert.alert("Reviewed", "You already reviewed this garage!")
    } else {
      props.props.navigation.navigate('Review Form', {
        transaction
      });
    }
  }

  const btnText = () => {
    if (transaction.isReviewed) {
      return (
        <TouchableOpacity style={styles.btnBook} onPress={() => goToReview(transaction.Garage)}>
          <Text style={styles.btnFavoriteText}>Reviewed &nbsp; &#10003;</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={styles.btnFavorite} onPress={() => goToReview(transaction.Garage)}>
          <Text style={styles.btnFavoriteText}>Review</Text>
        </TouchableOpacity>
      )
    }
  }

  return (
    <View style={styles.card}>
      <View>
        <TouchableOpacity onPress={() => goToDetailOrder(transaction)}>
          <Image 
            style={styles.cardImg}
            source={{
              uri: 'https://cdn.medcom.id/images/library/images/WhatsApp%20Image%202020-02-20%20at%2012_21_13%20PM.jpeg'
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardInfo}>
        <View onPress={() => goToDetailOrder(transaction)}>
          <TouchableOpacity onPress={() => goToDetailOrder(transaction)}>
            <Text style={styles.cardDate} >{formatDate(transaction.date)}</Text>
            <Text style={styles.cardName} >{transaction.Garage.name}</Text>
            <Text style={styles.cardAddress} >{transaction.Garage.address}</Text>
            <Text style={styles.cardStatus} >({statusTranslate(transaction.status)})</Text>
            <Text style={styles.cardName} >{transaction.description}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnGroups}>
          {btnText()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    width: width * 0.9,
    margin: 20,
    marginBottom: 15,
    marginTop: 15,
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 8,
    flexDirection: 'row',
    borderRadius: 8,
    borderColor: '#4F4F4F',
    borderTopWidth:5,
    borderBottomWidth:1,
  },
  btnGroups: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  cardImg: {
    width: 110,
    height: 110,
    top: -25,
    borderRadius: 10,
  },
  cardInfo: {
    width: width * 0.48,
    marginLeft: 15,
  },
  cardName: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 20,
    color: '#000',
  },
  cardStatus: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 12,
    color: '#000',
  },
  cardAddress: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 14,
    color: '#9B9B9B',
  },
  cardDate: {
    alignSelf: 'flex-end',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 14,
    color: '#9B9B9B',
  },
  btnGroups: {
    marginTop: 20,
    flexDirection: 'row',
  },
  btnFavorite: {
    width: width * 0.4,
    height: 30,
    marginRight: 15,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    backgroundColor: '#DB3022',
  },
  btnFavoriteText: {
    fontFamily: 'Bebes Neue',
    color: '#ffffff',
    fontSize: 11,
  },
  btnBook: {
    width: width * 0.4,
    height: 30,
    marginRight: 15,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    backgroundColor: '#4F4F4F',
  },
  btnBookText: {
    fontFamily: 'Bebes Neue',
    color: '#ffffff',
    fontSize: 11,
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
});