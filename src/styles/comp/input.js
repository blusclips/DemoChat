import { StyleSheet } from 'react-native';

import { status } from '../colors';

export default (styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 42,
    marginBottom: 10,
    marginTop: 100,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.4,
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    color: 'rgba(0, 0, 0, 0.608)',
  },
  textInput: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.4,
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    color: '#32505d',
  }
}));
