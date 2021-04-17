import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';

const width = Dimensions.get('window').width; 

export default function GarageCard(props) {
  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const goToOrderDetail = () => {
    props.props.navigation.navigate('Edit Order');
  }
  
  const chat = () => {
    props.props.navigation.navigate('Chat');
  }

  const finishOrder = () => {
    console.log(`Order Finished!`);
  } 

  return (
    <View style={styles.card}>
      <View>
        <TouchableOpacity onPress={() => goToOrderDetail()}>
          <Image 
            style={styles.cardImg}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png'
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardInfo}>
        <View>
          <Text style={styles.cardDate} onPress={() => goToDetail()}>2020 / 04 / 17</Text>
          <Text style={styles.cardName} onPress={() => goToDetail()}>Bapack Sulthon</Text>
          <Text style={styles.cardInfo} onPress={() => goToDetail()}>Astrea Supra</Text>
        </View>
        <View style={styles.btnGroups}>
          <TouchableOpacity style={styles.btnFavorite} onPress={() => finishOrder()}>
            <Text style={styles.btnFavoriteText}>FINISH ORDER</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnBook} onPress={() => chat()}>
            <Text style={styles.btnFavoriteText}>CHAT</Text>
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
    justifyContent: 'space-around',
    margin: 20,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 8,
  },
  cardImg: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  cardInfo: {
    marginLeft: 20,
  },
  cardName: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 20,
    color: '#000',
  },
  cardInfo: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 14,
    color: '#9B9B9B',
  },
  cardDate: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 14,
    color: '#000',
    alignSelf: 'flex-end',
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
});