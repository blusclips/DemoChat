import { set_value, add_sent_message, refer_message, upload_image, add_offline_messages } from '../actions/types';

const initialState = {
  json_web_token: 'jwt',
  users: [],
  user: {},
  otherUser: {},
  loading: false,
  network: false,
  error: '',
  username: '',
  messages: [],
  message: ''
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case set_value:
      return {
        ...state,
        [action.data.field]: action.data.value
      }
    case add_offline_messages:
    const offlineMessages = action.data.map(messageObj => {
        messageObj = JSON.parse(messageObj.message)
        return messageObj
    });
    return {
      ...state,
      messages: offlineMessages.reverse()
    }
    case add_sent_message:
      const messageArr = [...[action.data], ...state.messages];
      messageArr.map((mes) => {
        if(mes.refer) {
           mes.refer = false
           return mes
        } else {
          return mes
        }
      })
      return {
        ...state,
        messages: messageArr
      }
    case refer_message:
      const newMesageArr = state.messages.map((mess) => {
         if(mess._id === action.data._id) {
            mess.refer = !mess.refer;
            return mess
         } else {
            return mess
         }
      })
      return {
        ...state,
        messages: newMesageArr
      }
    case upload_image:
    const MessageArr = state.messages.map((mess) => {
      if(mess._id === action.data._id) {
        mess.upload = true
        return mess
      } else {
        return mess
      }
    })
    return {
      ...state,
      messages: MessageArr
    }
    default:
      return state;
  }
}
