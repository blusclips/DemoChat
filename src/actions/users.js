import { fetch_users, loading, network, set_value, add_sent_message, refer_message } from './types';

import { fetchUsers, sendMessage, loginUser } from '../network/account'
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
            dispatch({ type: set_value, data: { field: 'user', value: data.data }})
            obj.navigation.navigate('Home')
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