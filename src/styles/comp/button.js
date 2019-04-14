import { StyleSheet } from 'react-native';

import { buttonText } from '../colors';

export default (styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 50,
  },
  buttonLong: {
    flex: 1,
    height: 43,
    justifyContent: 'center',
  },
  buttonLongText: {
    fontFamily: 'Roboto',
    color: buttonText,
    justifyContent: 'center',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
}));
