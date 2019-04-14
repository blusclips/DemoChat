import { accountAddValue } from './types';
import { inputField } from '../validation/account';

import { loginWithEmail, lol } from '../network/account'

function addValue(data) {
  return {
    type: accountAddValue,
    data,
  };
}

function dispatchAddValue (arr) {
  return dispatch => {
    for (let i = 0; i < arr.length; i += 1) {
      dispatch(addValue(arr[i]));
    }
  }
}

export const setValue = arr => dispatch => {
  dispatch(dispatchAddValue(arr))
};

export const loginUserAction = (obj) => dispatch => {
  const username = inputField(obj.username, 'Username / Email / Phone number');
  const password = inputField(obj.password, 'Password');
  if (!username.isValid) {
    const arr = [{ field: 'errorBool', value: true }, { field: 'error', value: username.error }];
    dispatch(dispatchAddValue(arr))
    return;
  }

  if (!password.isValid) {
    const arr = [{ field: 'errorBool', value: true }, { field: 'error', value: password.error }];
    dispatch(dispatchAddValue(arr))
    return;
  }

  if (username.email) {
     loginWithEmail({ username: obj.username, password: obj.password }).then(response => {
       const { success, data } = response
       if(success) {
           
       } else {
        const arr = [{ field: 'errorBool', value: true }, { field: 'error', value: data }];
        dispatch(dispatchAddValue(arr))
        return;
       }
     })
  } else if (username.phone) {
  } else {
  }
};
