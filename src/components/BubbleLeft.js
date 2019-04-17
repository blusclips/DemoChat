import React, { Component } from 'react';

import { Text } from 'native-base'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { moderateScale } from 'react-native-size-matters';
import { Svg } from 'expo';

export default class Navbar extends Component<{}> {
	constructor(props) {
		super(props);
  }
  
  chatHighlight = (message) => {
    this.props.selectChat(message)
  }

	render() {
       const { currentMessage } = this.props;
       return(
        <TouchableOpacity onLongPress={() => this.chatHighlight(currentMessage)} style={[styles.item, styles.itemIn]}>
        <View style={[styles.balloon, { backgroundColor: !currentMessage.refer ? '#e8e8e8' : '#32505d' }]}>
        { currentMessage.select ? <View> 
            <Text style={{paddingTop: 5, color: 'white'}}> { currentMessage.select.text } </Text>
            <Text style={{paddingTop: 2, color: 'white', fontSize: 11, fontWeight: 'bold' }}> { currentMessage.select.user.name } </Text>
          </View> : null }
          <Text style={{paddingTop: 2, color: '#c2c2c2', fontSize: 13 }}> { currentMessage.text } </Text>
          <View
          style={[
            styles.arrowContainer,
            styles.arrowLeftContainer,
          ]}
        >

           <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
                <Svg.Path
                    d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                    fill={ !currentMessage.refer ? '#e8e8e8' : '#32505d' }
                    x="0"
                    y="0"
                />
            </Svg>
        </View>
        </View>
      </TouchableOpacity>
       	)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loader: {
    justifyContent: 'center',
  },
  network: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 'bold'
  },
  newInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    padding:10,
    height:50,
  },
  item: {
    marginVertical: moderateScale(7, 2),
    flexDirection: 'row'
 },
 itemIn: {
     marginLeft: 20
 },
 itemOut: {
    alignSelf: 'flex-end',
    marginRight: 20
 },
 balloon: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 20,
 },
 arrowContainer: {
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     zIndex: -1,
     flex: 1
 },
 arrowLeftContainer: {
     justifyContent: 'flex-end',
     alignItems: 'flex-start'
 },

 arrowRightContainer: {
     justifyContent: 'flex-end',
     alignItems: 'flex-end',
 },

 arrowLeft: {
     left: moderateScale(-6, 0.5),
 },

 arrowRight: {
     right:moderateScale(-6, 0.5),
 }
});

