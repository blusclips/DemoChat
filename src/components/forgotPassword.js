import React, { Component } from 'react';

import { TouchableOpacity } from 'react-native'

import { Text } from 'native-base'

import styles from '../styles/comp/text'

export default class Navbar extends Component<{}> {
	constructor(props) {
		super(props);
	}

	render() {
      const { text } = this.props;
       return(
       	   <TouchableOpacity style={styles.container}>
              <Text style={styles.forgotPassword}> { text } </Text>
           </TouchableOpacity>
       	)
	}
}

