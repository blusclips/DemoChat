import {
  set_value,
  add_sent_message,
  refer_message,
  upload_image,
  add_offline_messages,
} from '../actions/types';

const initialState = {
  json_web_token: '',
  user_logged_in: false,
  users: [],
  user: {},
  otherUser: {},
  loading: false,
  network: false,
  error: '',
  username: '',
  messages: [],
  message: '',
};

function parseOfflineMessage(raw) {
  if (!raw) return null;
  try {
    return typeof raw.message === 'string' ? JSON.parse(raw.message) : null;
  } catch (err) {
    return null;
  }
}

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case set_value:
      return {
        ...state,
        [action.data.field]: action.data.value,
      };

    case add_offline_messages: {
      const offlineMessages = (Array.isArray(action.data) ? action.data : [])
        .map(parseOfflineMessage)
        .filter(Boolean);
      return {
        ...state,
        messages: offlineMessages.reverse(),
      };
    }

    case add_sent_message: {
      const clearedReferences = state.messages.map((mes) =>
        mes.refer ? { ...mes, refer: false } : mes,
      );
      return {
        ...state,
        messages: [action.data, ...clearedReferences],
      };
    }

    case refer_message:
      return {
        ...state,
        messages: state.messages.map((mess) =>
          mess._id === action.data._id ? { ...mess, refer: !mess.refer } : mess,
        ),
      };

    case upload_image:
      return {
        ...state,
        messages: state.messages.map((mess) =>
          mess._id === action.data._id ? { ...mess, upload: true } : mess,
        ),
      };

    default:
      return state;
  }
}
