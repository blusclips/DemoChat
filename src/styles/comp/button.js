import { StyleSheet } from 'react-native';

import { buttonText, button } from '../colors';

export default (styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 50,
  },
  buttonLong: {
    height: 43,
    marginTop: 70,
    backgroundColor: '#435f7a',
    borderRadius: 100,
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
