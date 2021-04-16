import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

const width = Dimensions.get('window').width; 

export default function ChatCard (props) {
  const {color, align, message, time} = props;
  return (
    <TouchableOpacity>
    <View
      style={styles.flatlist, {
          backgroundColor: `${color}`,
          alignSelf: `${align}`,
          maxWidth: width * 0.8,
          minHeight: 70,
          margin: 10,
          marginTop: 5,
          borderRadius: 20,
          justifyContent: 'center',
          paddingLeft: 20,
          paddingRight: 20,
        }
      }>
      <Text style={styles.subheading}>{message}</Text>
      <Text style={styles.heading2}>{time}</Text>
    </View>
  </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  flatlist: {
    height: 100,
    padding: 200,
  },
  heading2: {
    color: 'grey',
  },
  subheading: {
    fontSize: 18,
    color: 'black',
  },
});