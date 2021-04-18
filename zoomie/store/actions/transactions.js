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

// export function setHistoryTransactions (payload) {
//   return { type: 'transactions/setTransactionsHistory', payload }
// }


export function fetchAllTransactionById () {
  return async (dispatch) => {
    try {
      console.log("masuk fetchAllTransaction")
      dispatch(setError(null))
      const headers = {
        access_token: await AsyncStorage.getItem('@access_token')
      }
      const userId = await AsyncStorage.getItem('@id')
      console.log(userId, headers)
      const { data } = await axios.get('/transactions', { headers });
      console.log(data, "ini data fetch all trans")
      const filterData = data.filter(transaction => +transaction.Garage.userId === +userId)
      console.log(filterData)
      dispatch(setTransactions(filterData));
    } catch (err) {
        console.log(err);
        dispatch(setError(err))
    }
  } 
}

// export function fetchHistoryTransaction () {
//   return async (dispatch) => {
//     try {
//       dispatch(setError(null))
//       const headers = {
//         access_token: await AsyncStorage.getItem('@access_token')
//       }
//       const dataStatus = {
//         status: 0
//       }
//       const { data } = await axios.get('/transactions/', { headers, data: dataStatus });
//       console.log(data)
//       dispatch(setTransactions(data));
//     } catch (err) {
//         console.log(err);
//         dispatch(setError(err))
//     }
//   } 
// }
