import { StyleSheet } from 'react-native';

import { status } from '../colors';

export default (styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  forgotPassword: {
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.804)',
    fontFamily: 'Roboto',
    letterSpacing: 0.04,
    paddingTop: 15,
    paddingBottom: 25,
  },
  error: {
    width: '100%',
    marginBottom: 12,
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: status,
  },
}));
