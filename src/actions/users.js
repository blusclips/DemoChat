import {
  set_value,
  add_sent_message,
  refer_message,
  upload_image,
  add_offline_messages,
} from './types';

import { loginUser, uploadImage } from '../network/account';
import { Socket, setSocketAuth } from '../network/constant';

export const setValueAction = (obj) => (dispatch) => {
  dispatch({ type: set_value, data: obj });
};

export const loginUserAction = (obj) => (dispatch) => {
  loginUser(obj.username, obj.password)
    .then(({ success, data, error }) => {
      if (!success) {
        dispatch({
          type: set_value,
          data: { field: 'error', value: error || 'Login failed' },
        });
        return;
      }
      if (data && data.token) {
        setSocketAuth(data.token);
        dispatch({ type: set_value, data: { field: 'json_web_token', value: data.token } });
      }
      const payload = (data && data.data) || {};
      dispatch({ type: set_value, data: { field: 'user', value: payload.user || {} } });
      dispatch({ type: set_value, data: { field: 'otherUser', value: payload.otherUser || {} } });
      if (obj.navigation) {
        obj.navigation.navigate('Chat');
      }
    })
    .catch((err) => {
      dispatch({
        type: set_value,
        data: { field: 'error', value: err.message || 'Network error' },
      });
    });
};

export const sendMessageAction = (messageArr) => (dispatch) => {
  if (!messageArr || messageArr.text === '') {
    return;
  }
  dispatch({ type: add_sent_message, data: messageArr });
  Socket.emit('send_message', messageArr);
};

export const getNewMessageAction = (userId) => (dispatch) => {
  Socket.emit('get_new_messages', { obj: userId }, (data) => {
    if (data && Array.isArray(data.data) && data.data.length > 1) {
      dispatch({ type: add_offline_messages, data: data.data });
      Socket.emit('remove_old_messages');
    }
  });

  Socket.off('recieved_message');
  Socket.on('recieved_message', (data) => {
    dispatch({ type: add_sent_message, data });
  });
};

export const teardownMessageListeners = () => () => {
  Socket.off('recieved_message');
};

export const referMessAction = (obj) => (dispatch) => {
  dispatch({ type: refer_message, data: obj });
};

export const uploadImageAction = (obj) => (dispatch) => {
  dispatch({ type: add_sent_message, data: obj });
  uploadImage(obj)
    .then((body) => {
      if (!body || typeof body !== 'object') {
        throw new Error('Invalid upload response');
      }
      const { secure_url, eager } = body;
      if (!secure_url) {
        throw new Error('Upload response missing secure_url');
      }
      const thumbnail =
        Array.isArray(eager) && eager.length > 0 && eager[0].secure_url
          ? eager[0].secure_url
          : secure_url;
      const payload = { ...obj, image_secure_url: secure_url, image_thumbnail: thumbnail };
      Socket.emit('send_message', payload);
      dispatch({ type: upload_image, data: payload });
    })
    .catch((err) => {
      console.warn('Image upload failed', err.message);
    });
};
