import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import OrderCard from '../components/OrderCard';
import ChatEmpty from '../components/ChatEmpty';
import { fetchAllTransactionById, setLoading } from '../store/actions/transactions'
import { useIsFocused } from '@react-navigation/native'
import { getDataGarage } from '../store/actions/garages'

export default function HomeGarage (props) {
  const chats = useSelector(state => state.chats.chats)
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
  }, [isFocused])

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
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