import React, { Component } from 'react';

import { TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';

import styles from '../styles/comp/account';

export default class Navbar extends Component {
  render() {
    const { label, button, onPress } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ width: '65%' }}>
          <Text style={styles.leftText}> {label} ? </Text>
        </View>

        <View style={{ width: '35%' }}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.rightText}> {button} </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
