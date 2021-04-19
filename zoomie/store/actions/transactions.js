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
      // console.log("masuk fetchAllTransaction")
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
      dispatch(setLoading(false))
    } catch (err) {
        console.log(err);
        dispatch(setError(err))
    }
  } 
}

export function fetchTransactionById (payload) {
  return async (dispatch) => {
    dispatch(setError(null))
    // console.log("masuk fetch transaksi by id")
    const headers = {
      access_token: await AsyncStorage.getItem('@access_token')
    }
    const { data } = await axios.get(`/transactions/${payload}`, { headers });
    // console.log(data, "ini data dari fetchtransbyID")
    // console.log(data, "ini dari fetch transaction by id")
    dispatch(setTransactionsById(data))
    dispatch(setLoading(false))
  }
}

export function updateTransactions (payload) {
  return async (dispatch) => {
    console.log("masukupdate Transaksi")
    dispatch(setError(null))
    const headers = {
      access_token: await AsyncStorage.getItem('@access_token')
    }
    console.log(headers, "ini headers dari update")
    console.log(payload.id, "ini payload dalam updateTransaksi")
    axios({
      url: 'http://192.168.100.18:3000' + '/transactions/' + `${payload.id}`,
      method: 'PUT',
      headers,
      data: {
        status: Number(payload.status),
        price: Number(payload.price),
        date: payload.date,
        description: payload.description
      }
    })
        .then(response => {
          console.log(response, "ini response")
        })
        .catch(err => {
          console.log(err)
        })
  }
}
