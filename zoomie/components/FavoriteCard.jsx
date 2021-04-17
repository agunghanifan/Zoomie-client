import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';

const width = Dimensions.get('window').width; 

export default function FavoriteCard(props) {
  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const goToDetail = () => {
    props.props.navigation.navigate('Detail Shop');
  }

  const booking = () => {
    props.props.navigation.navigate('Chat');
  }
  
  const deleteFavorite = () => {
    Alert.alert("Delete Favorites", "Are you sure to delete?",
      [
        { text: "Cancel", onPress: () => null, style: "cancel" },
        { text: "Delete", onPress: () => Alert.alert("Deleted from Favorites!") }
      ]
    );    
  } 
  
  return (
    <View style={styles.card}>
      <View>
        <TouchableOpacity onPress={() => goToDetail()}>
          <Image 
            style={styles.cardImg}
            source={{
              uri: 'https://cdn.medcom.id/images/library/images/WhatsApp%20Image%202020-02-20%20at%2012_21_13%20PM.jpeg'
            }}
            onPress={() => goToDetail()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardInfo}>
        <View>
          <Text style={styles.cardName} onPress={() => goToDetail()}>Bangkel Makmur</Text>
          <Text style={styles.cardAddress} onPress={() => goToDetail()}>JL. SUKA MAJU</Text>
        </View>
        <View style={styles.btnGroups}>
          <TouchableOpacity style={styles.btnFavorite}>
            <Text style={styles.btnFavoriteText} onPress={() => deleteFavorite()}>DELETE FAVORITE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnBook} onPress={() => booking()}>
            <Text style={styles.btnFavoriteText}>BOOK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
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
    marginLeft: 20,
  },
  cardName: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 20,
  },
  cardAddress: {
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
});