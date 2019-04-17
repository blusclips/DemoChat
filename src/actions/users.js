import { fetch_users, loading, network, set_value, add_sent_message, refer_message, upload_image } from './types';

import { fetchUsers, sendMessage, loginUser, uploadImage } from '../network/account'
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

export const fetchUsersAction = (obj) => {
    return (dispatch) => {
       dispatch({ type: loading })
       fetchUsers(obj).then(({ success, data }) => {
         if(success){
            dispatch({ type: fetch_users, data })
         } else {
            dispatch({ type: network })
         }
       })
    }
}

export const sendMessageAction = (messageArr) => {
   return (dispatch) => {
      if(messageArr.text === '') { return }
      dispatch({ type: add_sent_message, data: messageArr })
      Socket.on('recieve_text_message', function(data) {
         dispatch({ type: add_sent_message, data: data })
      });
      sendMessage({message: messageArr }) 
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
         sendMessage({message: obj })
         dispatch({ type: upload_image, data: obj })
      })
   }
}