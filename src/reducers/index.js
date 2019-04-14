import { accountAddValue } from '../actions/types';

const initialState = {
  json_web_token: 'jwt',
  username: null,
  password: null,
  errorBool: false,
  error: '',
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case accountAddValue:
      return {
        ...state,
        [action.data.field]: action.data.value,
      };
    default:
      return state;
  }
}
