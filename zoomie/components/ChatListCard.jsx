import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import { useIsFocused } from '@react-navigation/native'

const width = Dimensions.get('window').width; 

export default function GarageCard(props) {
  // const { data, navigation } = props
  // let dateNewFormat = new Date(data.date).toLocaleDateString()
  const isFocused = useIsFocused()

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  const goToChat = () => {
    props.props.navigation.navigate('Chat', {
      garage
    })
  }

  return (
    <TouchableOpacity onPress={() => goToChat()}>
      <View style={styles.card}>
        <View>
          <Image 
            style={styles.cardImg}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png'
            }}
          />
        </View>
        <View style={styles.cardInfo}>
          <View>
            <Text style={styles.cardName} onPress={() => goToChat()}>name</Text>
            <Text style={styles.cardInfo} onPress={() => goToChat()}>decription</Text>
          </View>
          <View style={styles.btnGroups}>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    width: width * 0.9,
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