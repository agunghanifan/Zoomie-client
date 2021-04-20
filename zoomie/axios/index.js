import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.100.15:3000'
})

export default instance
