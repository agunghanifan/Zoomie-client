import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../axios/'

export function setUsers (payload) {
  return { type: 'users/setUsers', payload }
}

export function setLoading (payload) {
  return { type: 'loading/setLoading', payload }
}

export function setError (payload) {
  return { type: 'error/setError', payload }
}

export function setCurrentUser (payload) {
  return { type: 'user/setUser', payload}
}

export function currentUser () {
  return async (dispatch) => {
    try {
      dispatch(setError(null))
      const headers = {
        access_token: await AsyncStorage.getItem('@access_token')
      }
      // console.log(headers)
      const idUser = await AsyncStorage.getItem('@id')
      // console.log(idUser)
      const { data } = await axios.get(`/user/${idUser}`, { headers });
      console.log(data)
      dispatch(setCurrentUser(data));
    } catch (err) {
      console.log(err);
      dispatch(setError(err))
    }
  }
}



