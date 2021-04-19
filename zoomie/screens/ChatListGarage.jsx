import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import OrderCard from '../components/OrderCard';
import ChatEmpty from '../components/ChatEmpty';
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTransactionById, setLoading } from '../store/actions/transactions'
import { useIsFocused } from '@react-navigation/native'
import { getDataGarage } from '../store/actions/garages'

export default function HomeGarage (props) {

  const loading = useSelector(state => state?.transactions?.loading)
  const garageLogIn = useSelector(state => state.garages.garageLogIn)
  const [dataFilter, setDataFilter] = useState(null)
  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  useEffect(() => {
    console.log('masuk useEffect')
    dispatch(setLoading(true))
    dispatch(fetchAllTransactionById())
    dispatch(getDataGarage())
  }, [isFocused])

  useEffect(() => {
    let transactionsFiltered = transactions?.filter(transaction => transaction.status < 10)
    setDataFilter(transactionsFiltered)
        // console.log(dataFilter, "ini data filter")
  }, [transactions])

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded || !dataFilter || !garageLogIn || !transactions || loading) {
    return <AppLoading />;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CHAT LIST</Text>
        <Image 
          style={styles.tinyProfPic}
          source={{
            uri: 'https://image.freepik.com/free-photo/adorable-dark-skinned-adult-woman-dressed-yellow-jumper-using-mobile-phone-with-happy-expression_273609-34293.jpg'
          }}
        />
      </View>
      <ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    minHeight: 60,
    padding: 10,
    marginBottom: 20,
  },
  headerText: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 24,
  },
  tinyProfPic: {
    position: 'absolute',
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