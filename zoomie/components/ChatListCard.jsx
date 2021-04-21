import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import { useIsFocused } from '@react-navigation/native'

const width = Dimensions.get('window').width; 

export default function GarageCard(props) {
  const { chat } = props;
  const isFocused = useIsFocused()

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Montserrat': require('../assets/fonts/Montserrat-Medium.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  const goToChat = () => {
    props.props.navigation.navigate('Chat', {
      garage: chat.User
    })
  }

  return (
    <TouchableOpacity onPress={() => goToChat()}>
      <View style={styles.card}>
        <View>
          <Image 
            style={styles.cardImg}
            source={{
              uri: chat.User.image
            }}
          />
        </View>
        <View style={styles.cardInfo}>
          <View>
            <Text style={styles.cardName} onPress={() => goToChat()}>{chat.User.name}</Text>
            <Text style={styles.cardText} onPress={() => goToChat()}>Tap to reply chat</Text>
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
    marginBottom: 4,
    marginTop: 4,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 8,
    borderColor: '#DB3022',
    borderRightWidth:5,
  },
  cardImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  cardName: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 20,
    color: '#000',
  },
  cardInfo: {
    left: 20,
    top: 8,
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 14,
    color: '#9B9B9B',
    justifyContent: 'center'
  },
  cardText: {
    fontFamily: 'Montserrat',
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