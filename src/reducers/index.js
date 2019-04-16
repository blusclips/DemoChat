import { fetch_users, network, loading, set_value, add_sent_message, refer_message } from '../actions/types';

const initialState = {
  json_web_token: 'jwt',
  users: [],
  user: {},
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
      return {
        ...state,
        messages: [...[action.data], ...state.messages]
      }
    case refer_message:
      const newMesageArr = state.messages.map((mess) => {
         if(mess._id === action.data._id) {
            mess.refer = true;
            return mess
         } else {
            return mess
         }
      })
      return {
        ...state,
        messages: newMesageArr
      }
    default:
      return state;
  }
}
