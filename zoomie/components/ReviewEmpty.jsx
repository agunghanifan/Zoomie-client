import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';

const width = Dimensions.get('window').width; 

export default function SuccessPage(props) {
  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Montserrat': require('../assets/fonts/Montserrat-Medium.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>- No review yet -</Text>
      <Text style={styles.subTitle}>lets book and become first reviewer!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Bebes Neue',
    fontStyle: 'normal',
    fontSize: width * 0.06,
    color: '#9B9B9B',
  },
  subTitle: {
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: width * 0.03,
    color: '#9B9B9B',
  },
});
