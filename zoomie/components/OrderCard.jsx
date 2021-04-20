import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { updateStatus } from '../store/actions/transactions'
import statusTranslate from '../helpers/statusTranslate'

const width = Dimensions.get('window').width; 

export default function GarageCard(props) {
  const { data, navigation } = props
  let dateNewFormat = new Date(data.date).toLocaleDateString()
  const isFocused = useIsFocused()
  const dispatch = useDispatch()

  useEffect(() => {

  }, [data, isFocused])

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const goToOrderDetail = () => {
    
    navigation.navigate('Edit Order', {
      id: data.id
    });
  }
  
  const chat = () => {
    props.navigation.navigate('Chat', {
      garage: data.User,
      title: 'WHATEVER'
    })
  }
  
  function finishOrderBtn (id) {
    Alert.alert("Finish Order", "Are you sure to finish this order?",
      [
        { text: "Cancel", onPress: () => null, style: "cancel" },
        { text: "Finish!", onPress: () => finishOrder(id) }
      ]
    );    
  }

  const finishOrder = (id) => {
    dispatch(updateStatus(id))
  } 

  return (
    <View style={styles.card}>
      <View>
        <TouchableOpacity onPress={() => goToOrderDetail()}>
          <Image 
            style={styles.cardImg}
            source={{
              uri: data.User.image
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardInfo}>
        <View>
          <Text style={styles.cardDate} onPress={() => goToOrderDetail()}>{dateNewFormat}</Text>
          <Text style={styles.cardName} onPress={() => goToOrderDetail()}>{data.User.name}</Text>
          <Text style={styles.cardStatus} onPress={() => goToOrderDetail()}>{statusTranslate(data.status)}</Text>
          <Text style={styles.cardInfo} onPress={() => goToOrderDetail()}>{data.description}</Text>
        </View>
        <View style={styles.btnGroups}>
          <TouchableOpacity style={styles.btnFavorite} onPress={() => finishOrderBtn(data.id)}>
            <Text style={styles.btnFavoriteText}>FINISH ORDER</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnBook} onPress={() => chat()}>
            <Text style={styles.btnFavoriteText}>CHAT</Text>
          </TouchableOpacity>
        </View>
        {/* <Text>{JSON.stringify(data)}</Text> */}
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
  cardStatus: {
    marginLeft: 5,
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 14,
    color: '#000',
  },
  cardName: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 20,
    color: '#000',
  },
  cardInfo: {
    marginLeft: 5,
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