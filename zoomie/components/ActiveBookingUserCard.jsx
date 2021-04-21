import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import statusTranslate from '../helpers/statusTranslate';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import Moment from 'moment';

const width = Dimensions.get('window').width; 

export default function ActiveBookingUserCard (props) {
  const { transaction } = props;
  // console.log(transaction.User.image);

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Montserrat': require('../assets/fonts/Montserrat-Medium.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const goToChat = (garage) => {
    props.props.navigation.navigate('Chat', {
      garage
    });
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

  return (
    <View style={styles.card}>
      <View>
        <TouchableOpacity onPress={() => goToDetailOrder(transaction)}>
          <Image 
            style={styles.cardImg}
            source={{
              uri: transaction.Garage.image
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardInfo}>
        <View>
          <Text style={styles.cardDate} onPress={() => goToDetailOrder(transaction)}>{formatDate(transaction.date)}</Text>
          <Text style={styles.cardName} onPress={() => goToDetailOrder(transaction)}>{transaction.Garage.name}</Text>
          <Text style={styles.cardStatus} onPress={() => goToDetailOrder(transaction)}>({statusTranslate(transaction.status)})</Text>
          <Text style={styles.cardAddress} onPress={() => goToDetailOrder(transaction)}>{transaction.Garage.address}</Text>
        </View>
        <View style={styles.btnGroups}>
          <TouchableOpacity style={styles.btnFavorite} onPress={() => goToChat(transaction.Garage)}>
            <Text style={styles.btnFavoriteText}>CHAT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnBook} onPress={() => goToDetailOrder(transaction)}>
            <Text style={styles.btnFavoriteText}>Detail Order</Text>
          </TouchableOpacity>
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
    borderColor: '#DB3022',
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
    fontSize: 12,
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