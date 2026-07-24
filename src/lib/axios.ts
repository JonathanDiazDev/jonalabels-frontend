import axios from 'axios'
import { API_BASE_URL } from '../api/http'

const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

export default http
