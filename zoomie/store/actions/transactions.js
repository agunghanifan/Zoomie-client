import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../axios/'

export function setTransactions (payload) {
  return { type: 'transactions/setTransactions', payload }
}

export function setLoading (payload) {
  return { type: 'loading/setLoading', payload }
}

export function setError (payload) {
  return { type: 'error/setError', payload }
}

export function setTransactionsById (payload) {
  return { type: 'transactionsById/setTransactionsById', payload }
}


export function fetchAllTransactionById () {
  return async (dispatch) => {
    try {
      console.log("masuk fetchAllTransaction")
      dispatch(setError(null))
      const headers = {
        access_token: await AsyncStorage.getItem('@access_token')
      }
      const userId = await AsyncStorage.getItem('@id')
      // console.log(userId, headers)
      const { data } = await axios.get('/transactions', { headers });
      // console.log(data, "ini data fetch all trans")
      const filterData = data.filter(transaction => +transaction.Garage.userId === +userId)
      // console.log(filterData)
      dispatch(setTransactions(filterData));
    } catch (err) {
        console.log(err);
        dispatch(setError(err))
    }
  } 
}

export function fetchTransactionById (payload) {
  return async (dispatch) => {
    dispatch(setError(null))
    console.log("masuk fetch transaksi by id")
    const headers = {
      access_token: await AsyncStorage.getItem('@access_token')
    }
    const { data } = await axios.get(`/transactions/${payload}`, { headers });
    // console.log(data, "ini data dari fetchtransbyID")
    console.log(data, "ini dari fetch transaction by id")
    dispatch(setTransactionsById(data))
    dispatch(setLoading(false))
  }
}
