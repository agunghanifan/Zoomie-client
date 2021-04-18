import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import statusTranslate from '../helpers/statusTranslate';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';

const width = Dimensions.get('window').width; 

export default function HistoryCard (props) {
  const { transaction } = props;

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const goToDetail = (garage) => {
    props.props.navigation.navigate('Detail Shop', {
      garage
    });
  }
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  }

  return (
    <View style={styles.card}>
      <View>
        <TouchableOpacity onPress={() => goToDetail(transaction.Garage)}>
          <Image 
            style={styles.cardImg}
            source={{
              uri: 'https://cdn.medcom.id/images/library/images/WhatsApp%20Image%202020-02-20%20at%2012_21_13%20PM.jpeg'
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardDate} onPress={() => goToDetail(transaction.Garage)}>{formatDate(transaction.date)}</Text>
        <Text style={styles.cardName} onPress={() => goToDetail(transaction.Garage)}>{transaction.Garage.name}</Text>
          <Text style={styles.cardStatus} onPress={() => goToDetailOrder(transaction)}>({statusTranslate(transaction.status)})</Text>
        <Text style={styles.cardAddress} onPress={() => goToDetail(transaction.Garage)}>{transaction.Garage.address}</Text>
        <Text style={styles.cardName} onPress={() => goToDetail(transaction.Garage)}>{transaction.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    width: width * 0.9,
    margin: 20,
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 5,
    flexDirection: 'row',
    borderRadius: 8,
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
  cardStatus: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 15,
    color: '#000',
  },
  cardAddress: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 14,
    color: '#9B9B9B',
  },
  cardDate: {
    alignSelf: 'flex-end',
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 14,
    color: '#9B9B9B',
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
    marginRight: 14,
  },
  containerBooking: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    
  },
});