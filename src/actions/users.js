import { set_value, add_sent_message, refer_message, upload_image, add_offline_messages } from './types';

import { loginUser, uploadImage } from '../network/account'
import { Socket } from '../network/constant'


export const setValueAction = (obj) => {
 return (dispatch) => {
    dispatch({ type: set_value, data: obj })
 }
}

export const loginUserAction = (obj) => {
   return (dispatch) => {
      loginUser( obj.username ).then(({ success, data }) => {
         if(success) {
            dispatch({ type: set_value, data: { field: 'user', value: data.data.user }})
            dispatch({ type: set_value, data: { field: 'otherUser', value: data.data.otherUser }})
            obj.navigation.navigate('Chat')
         } else {
            dispatch({ type: set_value, data: { field: 'error', value: 'Enter userA or userB'}})
         }
      })
   }
}

export const sendMessageAction = (messageArr) => { 
   return (dispatch) => {
      if(messageArr.text === '') { return }
      dispatch({ type: add_sent_message, data: messageArr })
      Socket.emit('send_message', messageArr);
   }
}

export const getNewMessageAction = (obj) => {
   return (dispatch) => {
      Socket.emit('get_new_messages', { obj }, (data) => {
         if(data.data.length > 1) {
            dispatch({type: add_offline_messages, data: data.data })
            Socket.emit('remove_old_messages')
         }
      })
      Socket.on('recieved_message', function(data) {
         dispatch({ type: add_sent_message, data: data })
      });
   }
}

export const referMessAction = (obj) => {
   return (dispatch) => {
      dispatch({ type: refer_message, data: obj })
   }
}

export const uploadImageAction = (obj) => {
   return (dispatch) => {
      dispatch({ type: add_sent_message, data: obj })
      uploadImage(obj).then(resp => { 
         const { secure_url, eager } = JSON.parse(resp._bodyInit)
         const thumbnail = eager[0].secure_url
         obj.image_secure_url = secure_url;
         obj.image_thumbnail = thumbnail;
         Socket.emit('send_message', obj );
         dispatch({ type: upload_image, data: obj })
      })
   }
}