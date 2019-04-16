import axios from 'axios'
import io from 'socket.io-client'

export const URL = 'http://192.168.43.117:2000'
export const axiosInstance = axios.create({
    baseURL: `${URL}/api/v1`
});

export const Socket = io(`${URL}/`);