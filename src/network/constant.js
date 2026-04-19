import axios from 'axios';
import io from 'socket.io-client';

import { API_URL } from '../config';

export const URL = API_URL;

export const axiosInstance = axios.create({
  baseURL: `${URL}/api/v1`,
  timeout: 15000,
});

export const Socket = io(`${URL}/`, {
  autoConnect: false,
  transports: ['websocket'],
});

export const setSocketAuth = (token) => {
  Socket.io.opts.query = { token };
  Socket.disconnect();
  Socket.connect();
};
