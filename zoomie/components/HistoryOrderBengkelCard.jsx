import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import statusTranslate from '../helpers/statusTranslate'
import Moment from 'moment';

const width = Dimensions.get('window').width; 

export default function HistoryOrderBengkel (props) {

  const { transaction } = props

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Montserrat': require('../assets/fonts/Montserrat-Medium.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function formatPrice(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const formatDate = (date) => {
    Moment.locale('en');
    return Moment(date).format('DD MMM YYYY');
  }

  return (
    <View style={styles.card}>
      <View>
        <TouchableOpacity>
          <Image 
            style={styles.cardImg}
            source={{
              uri: transaction.User.image
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardInfo}>
        <View>
          <Text style={styles.cardDate}>{formatDate(transaction.date)}</Text>
          <Text style={styles.cardName}>{transaction.User.name}</Text>
          <Text style={styles.cardAddress}>{transaction.User.email}</Text>
          <Text style={styles.priceInfo}>
            {statusTranslate(transaction.status)}
          </Text>
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.shopInfo}>
            {transaction.description}
          </Text>
        </View>
        <View>
          <Text style={styles.priceInfo}>
            Total: {formatPrice(transaction.price)}
          </Text>
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
    marginTop: 12,
    marginBottom: 12,
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    borderRadius: 8,
    borderColor: '#DB3022',
    borderTopWidth:5,
    borderBottomWidth:1,
  },
  cardImg: {
    width: 110,
    height: 110,
    top: -25,
    borderRadius: 10,
  },
  cardInfo: {
    width: width * 0.48,
    marginLeft: 20,
  },
  cardName: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 20,
    color: '#000',
  },
  cardAddress: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 14,
    color: '#9B9B9B',
  },
  cardDate: {
    position: 'absolute',
    alignSelf: 'flex-end',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 14,
    color: '#9B9B9B',
  },
  shopInfo: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 12,
    color: '#000',
  },
  priceInfo: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 16,
    color: '#000',
  },
  btnGroups: {
    marginTop: 20,
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
  containerInfo: {
    marginLeft: 14,
  },
  containerBooking: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    
  },
});