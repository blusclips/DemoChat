import { fetch_users, network, loading, set_value, add_sent_message, refer_message, upload_image } from '../actions/types';

const initialState = {
  json_web_token: 'jwt',
  users: [],
  user: {},
  otherUser: {},
  loading: false,
  network: false,
  error: '',
  username: '',
  messages: [ {
    _id: 1,
    text: "Hello developer",
    refer: false,
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any"
    }
  }, {
    _id: 2,
    text: "Hello developer jakins",
    refer: false,
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any"
    }
  }],
  message: ''
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case set_value:
      return {
        ...state,
        [action.data.field]: action.data.value
      }
    case fetch_users:
      return {
        ...state,
        users: action.data.data,
        loading: false
      }
    case loading:
      return {
        ...state,
        network: false,
        loading: true
      }
    case network:
      return {
        ...state,
        loading: false,
        network: true
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
