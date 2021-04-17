import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';

const width = Dimensions.get('window').width; 

export default function HistoryCard (props) {
  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const goToDetail = () => {
    props.props.navigation.navigate('Detail Shop');
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
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardInfo}>
        <View>
          <Text style={styles.cardName} onPress={() => goToDetail()}>Bangkel Makmur</Text>
          <Text style={styles.cardAddress} onPress={() => goToDetail()}>JL. SUKA MAJU</Text>
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.shopInfo}>
            LIST ITEM SERVICE {'\n'}
            &nbsp; GANTI OLI {'\n'}
            &nbsp; &#183; TUNE UP {'\n'}
            &nbsp; &#183; SERVICE {'\n'}
            &nbsp; &#183; GANTI OLI {'\n'}
            &nbsp; &#183; SPARE PART {'\n'}
            &nbsp; &#183; BONGKAR PASANG MESIN {'\n'}
          </Text>
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