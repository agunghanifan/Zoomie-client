import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import statusTranslate from '../helpers/statusTranslate';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';

const width = Dimensions.get('window').width;

export default function CheckoutUser(props) {
  const { transaction } = props.route.params;
  console.log(transaction);

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const goBack = () => {
    props.navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>REPAIR SHOP INFO</Text>
        <View style={styles.cardInfo}>
          <View style={styles.paddingCardText}>
            <Text style={styles.garageName}>{transaction.Garage.name}</Text>
            <Text style={styles.garageAddress}>{transaction.Garage.address}</Text>
          </View>
        </View>
        <View style={styles.antrian}>
          <Text style={styles.status}>STATUS: {statusTranslate(transaction.status)}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 10 }}>Antrian ke -</Text>
          <Text style={{ fontSize: 96, fontWeight: 'bold'}}>8</Text>
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
  title: {
    left: 10,
    top: 19,
    fontWeight: 'bold',
    fontSize: 16
  },
  cardInfo: {
    alignSelf: 'center',
    width: width * 0.9,
    top: 30,
    borderRadius: 10,
    backgroundColor: '#ffffff',
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
  antrian: {
    top: 50,
    alignItems: 'center',
  },
  cardItems: {
    alignSelf: 'center',
    top: 50,
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
