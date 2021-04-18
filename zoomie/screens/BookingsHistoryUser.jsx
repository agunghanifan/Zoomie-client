import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import HistoryCard from '../components/HistoryCard';
import ActiveBookingUserCard from '../components/ActiveBookingUserCard'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import axios from '../axios';

export default function BookingsHistoryUser (props) {
  const transactions = useSelector(state => state.transactions.transactions);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(_ => {
    fetchTransaction ()
  }, [isFocused])

  const fetchTransaction = async () => {
    try {
      const headers = {
        access_token: await AsyncStorage.getItem('@access_token')
      }
      const { data } = await axios.get('/transactions', { headers });
      dispatch({ type: 'transactions/setTransactions', payload: data})
    } catch (error) {
      console.log(error);
    }
  }

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded || !transactions) {
    return <AppLoading />;
  }
  
  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Current Booking's</Text>
        {
          transactions.map(transaction => {
            if (transaction.status < 9) {
              return (
                <ActiveBookingUserCard
                  props={props}
                  transaction={transaction}
                  key={transaction.id}
                />
              )
            }
          })
        }
      </View>
      <View>
        <Text style={styles.title}>History Booking's</Text>
        {
          transactions.map(transaction => {
            if (transaction.status > 8) {
              return (
                <HistoryCard
                  props={props}
                  transaction={transaction}
                  key={transaction.id}
                />
              )
            }
          })
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
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
  title: {
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});