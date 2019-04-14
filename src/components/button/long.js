import React, { Component } from 'react';

import { View, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'

import styles from '../../styles/comp/button'

export default class Navbar extends Component<{}> {
	constructor(props) {
		super(props);
	}

	render() {
      const { label, onPress } = this.props;
       return(
       	   <TouchableOpacity style={styles.buttonLong} onPress={()=> onPress()}>
  					<Text style={styles.buttonLongText}> {label} </Text>
  		   </TouchableOpacity>
       	)
	}
}

