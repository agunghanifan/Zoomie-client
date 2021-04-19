import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../../axios/'

export function setGarageLogin (payload) {
    return { type: 'garageLogIn/setgarageLogIn', payload }
}

export function loading (payload) {
    return { type: 'loading/setloading', payload }
}

export function setError (payload) {
    return { type: 'error/setError', payload }
}

export function getDataGarage () {
  return async (dispatch) => {
    try {
      dispatch(setError(null))
      const headers = {
        access_token: await AsyncStorage.getItem('@access_token')
      }
      // console.log(headers)
      const idUser = await AsyncStorage.getItem('@id')
      // console.log(idUser)
      const { data } = await axios.get(`/garage`, { headers });
      // console.log(data, "ini data getDataGarage")
      const dataFilter = data.filter(garage => +garage.userId === +idUser)
      // console.log(dataFilter, 'ini yang kena filter')
      // console.log(dataFilter)
      dispatch(setGarageLogin(dataFilter));
    } catch (err) {
      console.log(err);
      dispatch(setError(err))
    }
  }
}
