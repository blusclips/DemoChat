import { StyleSheet } from 'react-native';

import { buttonText, button } from '../colors';

export default (styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 50,
  },
  buttonLong: {
    paddingRight: 50,
    width: '100%',
    paddingLeft: 50,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#004D40',
    borderRadius: 100,
    justifyContent: 'center',
  },
  buttonLongText: {
    fontFamily: 'Roboto',
    color: buttonText,
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));
