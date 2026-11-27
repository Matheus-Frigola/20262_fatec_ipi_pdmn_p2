import axios from 'axios'

// Troque pelo IP do computador na rede (veja a linha exp:// no terminal do Expo)
const backendClient = axios.create({
  baseURL: 'http://192.168.0.12:3000'
})

export default backendClient
