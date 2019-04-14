import React, { Component } from 'react';

import { TouchableOpacity } from 'react-native'
import { View, Text, Button } from 'native-base'

import styles from '../styles/comp/account'

export default class Navbar extends Component<{}> {
	constructor(props) {
		super(props);
	}

  onBackScreen = () => {
    const { screen, componetId } = this.props
    if (screen === 'loginScreen') {
        Navigation.push(componetId, { screen: { name: screen }})
    }
  }

	render() {
      const { label, button, componentId, screen } = this.props;
       return(
       	   <View style={styles.container}>
              <View style={{ width: '65%'}}>
                  <Text style={styles.leftText}> {label } ? </Text>
              </View>

              <View style={{ width: '35%'}}>
                    <TouchableOpacity onPress={() => Navigation.push( componentId, { component: { name: screen }}) }>
                        <Text style={styles.rightText}> {button} </Text>
                    </TouchableOpacity>
              </View>
           </View>
       	)
	}
}

