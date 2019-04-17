import React, { Component } from 'react';

import { Item, Input, Label } from 'native-base'

import styles from '../styles/comp/input'

export default class Navbar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
      const { label, onChange, password } = this.props;
       return(
       	   <Item style={styles.container} floatingLabel>
                <Label style={styles.label}> { label } </Label>
                <Input autoCapitalize={false} secureTextEntry={password} style={ styles.textInput } onChangeText={(value) => onChange(value)} />
           </Item>
       	)
	}
}

