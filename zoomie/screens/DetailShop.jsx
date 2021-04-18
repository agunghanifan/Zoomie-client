import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';

const width = Dimensions.get('window').width; 

export default function DetailShop(props) {
  const { garage } = props.route.params;
  console.log(garage, "garage from detail");

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const booking = (id) => {
    props.navigation.navigate('Chat', {
      garage
    })
  }
  
  return (
    <View style={styles.container}>
      <ScrollView style={{marginBottom: 5}}>
        <View>
          <Image 
            style={styles.repairShopPicture}
            source={{
              uri: 'https://cdn.medcom.id/images/library/images/WhatsApp%20Image%202020-02-20%20at%2012_21_13%20PM.jpeg'
            }}
          />
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.shopName}>{garage.name}</Text>
          <Text style={styles.shopAddress}>{garage.address}</Text>
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.shopInfo}>
            {garage.description}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.containerBooking}>
        <TouchableOpacity style={styles.btnBooking} onPress={() => booking(garage.id)}>
          <Text style={styles.btnBookingText}>BOOKING / CHAT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTitle: {
    margin: 14,
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
  repairShopPicture: {
    width: width * 1,
    height: width * 1,
  },
  shopName: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 34,
    marginBottom: 5,
    marginTop: 16,
  },
  shopAddress: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 20,
    color: '#9B9B9B',
  },
  shopInfo: {
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: 24,
    marginBottom: 5,
    marginTop: 16,
  },
});