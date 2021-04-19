import React from 'react';
import { StyleSheet, Image, Dimensions, View, Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';

const width = Dimensions.get('window').width; 

export default function SuccessPage(props) {
  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.emptyImage}
        source={require('../assets/img/order-empty.png')}
      />
      <Text style={styles.title}>NO CHAT YET</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: width * 0.13,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  emptyImage: {
    width: width * 0.8,
    height: width * 0.9,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: width * 0.07,
    color: '#504E4E',
    margin: 15,
  },
});
