import React, { Component } from 'react';

import { Text } from 'native-base'

import styles from '../styles/comp/text'

export default class Navbar extends Component<{}> {
	constructor(props) {
		super(props);
	}

	render() {
      const { error } = this.props;
       return(
       	   <Text style={styles.error}> 
              { error } 
            </Text>
       	)
	}
}

