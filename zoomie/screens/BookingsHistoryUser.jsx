import React, { useEffect, useState } from 'react';
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
  const [image, setImage] = useState(null);

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
      const { data } = await axios.get('/transactions', { headers });
      const filteredData = data.filter(trans => trans.User.id == id)
      dispatch({ type: 'transactions/setTransactions', payload: filteredData})
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
  });
  if (!fontsLoaded || !transactions) {
    return <AppLoading />;
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
          <Text style={styles.subTitle}>History Booking's</Text>
          {
            transactions.map(transaction => {
              if (transaction.status >= 10 && transaction.status != 99) {
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
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 24,
    marginBottom: 20,
  },
});