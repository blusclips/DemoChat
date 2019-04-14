import React from 'react';

import { View, Text } from 'native-base';

import styles from '../styles/comp/title';

export default (title = props => (
  <View style={styles.container}>
    <Text style={styles.title}> {props.title}</Text>
  </View>
));
