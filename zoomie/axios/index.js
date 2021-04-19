import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.100.18:3000'
})

export default instance
