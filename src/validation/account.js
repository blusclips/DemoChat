import validator from 'validator';

export const inputField = (username, type) => {
  const error = {
    error: '',
    isValid: false,
    phone: false,
    email: false,
    value: '',
  };

  username = username || '';
  if (validator.isEmpty(username)) {
    error.error = `Enter ${type}`;
  } else if (validator.isEmail(username)) {
    error.email = true;
    error.isValid = true;
  } else if (validator.isMobilePhone(username)) {
    error.phone = true;
    error.isValid = true;
  } else if (!validator.isAlphanumeric(username)) {
    error.error = `${type} must be a character or number`;
  } else {
    error.isValid = true;
  }
  return error;
};
