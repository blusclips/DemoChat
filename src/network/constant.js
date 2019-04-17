import axios from 'axios'
import io from 'socket.io-client'

export const URL = 'http://192.168.0.102:2000'
export const axiosInstance = axios.create({
    baseURL: `${URL}/api/v1`
});

export const Socket = io(`${URL}/`);