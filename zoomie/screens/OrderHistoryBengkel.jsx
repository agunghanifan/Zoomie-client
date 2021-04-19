import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import { useDispatch, useSelector } from 'react-redux'
import HistoryOrderCard from '../components/HistoryOrderBengkelCard'
import { fetchAllTransactionById } from '../store/actions/transactions'
import OrderEmpty from '../components/OrderEmpty'
import { useIsFocused } from '@react-navigation/native'

export default function OrderHistoryBengkel (props) {
  const dispatch = useDispatch()
  const transactions = useSelector(state => state.transactions.transactions)
  const [dataFilter, setDataFilter] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    dispatch(fetchAllTransactionById())
  }, [isFocused])

  useEffect(() => {
    setDataFilter(transactions.filter(transaction => transaction.status === 10))
  }, [transactions])

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>History Orders</Text>
        {
          dataFilter.length === 0 ? <OrderEmpty /> :
          dataFilter.map((transaction, index) => {
            return <HistoryOrderCard transaction={transaction} key={index}/>
          })
        }
        {/* <Text>{JSON.stringify(dataFilter)} ini filter</Text> */}
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
  title: {
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});