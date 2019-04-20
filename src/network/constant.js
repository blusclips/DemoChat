import axios from 'axios'
import io from 'socket.io-client'

export const URL = 'https://ugdemochat.herokuapp.com'
export const axiosInstance = axios.create({
    baseURL: `${URL}/api/v1`
});

export const Socket = io(`${URL}/`);