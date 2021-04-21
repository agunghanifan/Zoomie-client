import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import HistoryCard from '../components/HistoryCard';
import ActiveBookingUserCard from '../components/ActiveBookingUserCard'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import axios from '../axios';

const width = Dimensions.get('window').width; 

export default function BookingsHistoryUser (props) {
  const transactions = useSelector(state => state.transactions.transactions);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [image, setImage] = useState(null);
  let order = 0;
  let history = 0;

  useEffect(_ => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchTransaction ()
      getUser ();
    });
    return unsubscribe;
  }, [isFocused])

  const fetchTransaction = async () => {
    try {
      const id = await AsyncStorage.getItem('@id')
      const headers = {
        access_token: await AsyncStorage.getItem('@access_token')
      }
      const { data } = await axios.get('/transactions/', {
          params: {
            userId: id,
          },
          headers
        });
      dispatch({ type: 'transactions/setTransactions', payload: data})
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
    'Montserrat': require('../assets/fonts/Montserrat-Medium.ttf'),
  });
  if (!fontsLoaded || !transactions) {
    return <AppLoading />;
  }

  let orderUserEmpty = () => {
    return (
      <View style={styles.containerEmpty}>
        <Text style={styles.titleEmpty}>- No order yet -</Text>
        <Text style={styles.subTitleEmpty}>lets book a order!</Text>
      </View>
    )
  }

  let historyUserEmpty = () => {
    return (
      <View style={styles.containerEmpty}>
        <Text style={styles.titleEmpty}>- No history yet -</Text>
        <Text style={styles.subTitleEmpty}>lets finish a order or book new order!</Text>
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Booking and Order</Text>
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
        <View>
          <Text style={styles.subTitle}>Current Booking's</Text>
          {
            transactions.map(transaction => {
              if (transaction.status < 10) {
                order++
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
          { order == 0 ? orderUserEmpty() : <Text></Text> }
        </View>
        <View>
          <Text style={styles.subTitle}>History Booking's</Text>
          {
            transactions.map(transaction => {
              if (transaction.status >= 10 && transaction.status != 99) {
                history++
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
          { history == 0 ? historyUserEmpty() : <Text></Text> }
        </View>
        {/* <Text>{JSON.stringify(transactions)}</Text> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
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
  subTitle: {
    marginTop: 9,
    left: 14,
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 24,
    marginBottom: 20,
  },
  containerEmpty: {
    margin: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  titleEmpty: {
    textAlign: 'center',
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: width * 0.06,
    color: '#9B9B9B',
  },
  subTitleEmpty: {
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: width * 0.03,
    color: '#9B9B9B',
  },
});