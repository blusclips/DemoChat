import { StyleSheet } from 'react-native';

import { status } from '../colors';

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 31,
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
  },
  leftText: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 16,
    color: 'rgba(0,0,0,0.604)',
    letterSpacing: 0.04,
  },
  rightText: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.04,
    color: status,
  },
}));
