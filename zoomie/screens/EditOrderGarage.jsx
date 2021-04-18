import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';
import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactionById } from '../store/actions/transactions'
import statusTranslate from '../helpers/statusTranslate'
import DatePicker from 'react-native-date-picker'

const width = Dimensions.get('window').width;

export default function EditOrderGarage (props) {

  const { id } = props.route.params
  const transactionsById = useSelector(state => state.transactions.transactionsById)
  const dispatch = useDispatch()
  const [serviceDate, setServiceDate] = useState(Date(transactionsById.date).toLocaleDateString())
  const [status, setStatus] = useState(statusTranslate(transactionsById.status))
  const [note, setNote] = useState(transactionsById.description)
  const [totalprice, setTotalPrice] = useState(String(transactionsById.price))


  useEffect(() => {
    dispatch(fetchTransactionById(id))
  }, [])

  let [fontsLoaded] = useFonts({
    'Bebes Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const goToSuccess = () => {
    const data = {

    }
    console.log(`Menuju halaman sukses`);
    props.navigation.navigate('Success');
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>ORDER INFO</Text>
        <View style={styles.cardInfo}>
          <View style={styles.paddingCardText}>
            
            <Text style={{ fontSize: 14, fontWeight: 'bold'}}>{transactionsById?.User?.name}</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold'}}>{transactionsById?.description}</Text>
          </View>
        </View>
        <View style={styles.detailOrder}>
          <Text style={styles.label}>Service Date</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Date"
            value={serviceDate}
            onChange={(e) => setServiceDate(e.nativeEvent.target)}
          />
          <Text style={styles.label}>Status</Text>
          <TextInput
            style={styles.textinput}
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.nativeEvent.target)}
          />
          <Text style={styles.label}>NOTE</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.nativeEvent.target)}
          />
          <Text style={styles.label}>Total Price</Text>
          <TextInput
            style={styles.textinput}
            placeholder="Total Price"
            value={totalprice}
            onChange={(e) => setTotalPrice(e.nativeEvent.target)}
          />
        </View>
      </ScrollView>
      {/* <Text>{JSON.stringify(transactionsById)}</Text> */}
      <View style={styles.btnGroup}>
        <TouchableOpacity style={styles.btnBooking} onPress={() => goToSuccess()}>
          <Text style={styles.btnBookingText}>Update Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnBack} onPress={() => props.navigation.goBack()}>
          <Text style={styles.btnBookingText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    left: 10,
    top: 19,
    fontFamily: 'Bebes Neue',
    fontWeight: 'bold',
    fontSize: 16
  },
  textinput: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 330,
    height: 64,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    elevation: 4,
    paddingLeft: 20,
    fontFamily: 'Bebes Neue',
    margin: 5
  },
  textArea: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: 330,
    height: 80,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    elevation: 4,
    paddingLeft: 20,
    fontFamily: 'Bebes Neue',
    margin: 5
  },
  label: {
    left: 30,
    fontFamily: 'Bebes Neue',
    alignSelf: 'flex-start'
  },
  cardInfo: {
    alignSelf: 'center',
    width: width * 0.9,
    height: 108,
    top: 30,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  paddingCardText: {
    padding: 18,
    paddingBottom: 30,
    shadowColor: '#000000',
    shadowRadius: 10,
    shadowOffset: {
      height: 10,
      width: 10
    }
  },
  detailOrder: {
    top: 50,
    minHeight: 700,
    alignItems: 'center',
  },
  cardItems: {
    alignSelf: 'center',
    top: 50,
    backgroundColor: '#ffffff',
    width: width * 0.9,
    // height: 150,
    borderRadius: 10,
  },
  btnGroup: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10
  },
  btnBooking: {
    width: width * 0.45,
    height: 48,
    backgroundColor: '#db3022',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBack: {
    width: width * 0.45,
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
})
