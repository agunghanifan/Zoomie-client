import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import statusTranslate from '../helpers/statusTranslate';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import Moment from 'moment';
import axios from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { setTransactions } from '../store/actions/transactions'

const width = Dimensions.get('window').width;

export default function CheckoutUser(props) {
  const { transaction } = props.route.params;
  const transactions = useSelector(state => state.transactions.transactions)
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  let transactionGarage = [];
  
  useEffect(_ => {
    async function getTransactions () {
      try {
        const headers = {
          access_token: await AsyncStorage.getItem('@access_token')
        }
        const { data } = await axios.get('/transactions', { headers });

        data.forEach(trans => {
          if (trans.Garage.id == transaction.Garage.id && trans.date == transaction.date && trans.status < 10 && trans.status >= 0) {
            transactionGarage.push(trans)
          }
        })
        console.log(transactionGarage, 'transactions');
        dispatch(setTransactions(data))
      } catch (error) {
        console.log(error.response);
      }
    }
    getTransactions ();
  }, [isFocused])

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const goBack = () => {
    props.navigation.goBack();
  }

  const countingQue = async () => {

  }

  const formatDate = (date) => {
    if (transaction.status == 0) {
      return 'To Be Added'
    }
    Moment.locale('en');
    return Moment(date).format('ddd, DD MMM YYYY');
  }

  function formatPrice(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.title}>REPAIR SHOP INFO</Text>
        </View>
        <View style={styles.containerCard}>
          <View style={styles.paddingCardText}>
            <Text style={styles.garageName}>{transaction.Garage.name}</Text>
            <Text style={styles.garageAddress}>{transaction.Garage.address}</Text>
          </View>
        </View>
        <View style={styles.containerStatus}>
          <Text style={styles.status}>STATUS: <Text style={{color: '#DB3022'}}>{statusTranslate(transaction.status)}</Text></Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 3 }}>Confirmed Date: <Text style={{color: '#DB3022'}}>{formatDate(transaction.date)}</Text></Text>
        </View>
        <View style={styles.containerPrice}>
          <Text style={styles.priceText}>{transaction.status != 10 ? 'Price Estimation :' : 'Price :'}</Text>
          <Text style={styles.priceNominal}>{formatPrice(transaction.price)}</Text>
        </View>
        <View style={styles.cardItems}>
          <View style={styles.paddingCardText}>
            <Text style={styles.garageName}>Notes from repair shop</Text>
            <View style={styles.paddingCardText}>
              <Text style={styles.garageTextInfo}>{transaction.description ? transaction.description : '- no note yet -'}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.containerBooking}>
          <TouchableOpacity style={styles.btnBooking} onPress={() => goBack()}>
            <Text style={styles.btnBookingText}>Back</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCard: {
    alignSelf: 'center',
    width: width * 0.9,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  containerStatus: {
    alignSelf: 'center',
    width: width * 0.8,
    alignItems: 'center',
    paddingBottom: 5,
  },
  containerPrice: {
    alignSelf: 'center',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderTopWidth: 3,
    width: 300,
    marginTop: 15,
    marginBottom: 30,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 25,
  },
  priceText: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 26,
    marginBottom: 5
  },
  priceNominal: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 50,
  },
  title: {
    left: 10,
    marginTop: 19,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  paddingCardText: {
    padding: 18,
    paddingBottom: 30,
    shadowColor: '#000000',
    shadowRadius: 10,
    shadowOffset: {
      height: 10,
      width: 10
    }
  },
  cardItems: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    width: width * 0.9,
    minHeight: width * 0.7,
    borderRadius: 10,
  },
  containerBooking: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  btnBooking: {
    width: width * 0.9,
    height: 48,
    backgroundColor: '#4F4F4F',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBookingText: {
    fontFamily: 'Bebes Neue',
    color: '#ffffff',
    fontSize: 18,
  },
  garageName: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 20,
    color: '#000',
  },
  garageAddress: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 14,
    color: '#9B9B9B',
  },
  garageTextInfo: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 18,
    color: '#000',
  },
  status: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 20,
    color: '#000',
  },
})
