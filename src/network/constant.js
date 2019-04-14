import axios from 'axios'
import store from '../configureStore'

export const URL = 'http://192.168.43.117:7000/api/v1'
export const network = 'No Internet Connection'
export const axiosInstance = axios.create({
    baseURL: URL,
    headers: {
      Authorization: store().getState().json_web_token
    }
  });