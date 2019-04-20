import React, { Component } from 'react';

import { Text } from 'native-base'
import { StyleSheet, View, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import { moderateScale } from 'react-native-size-matters';
import {  utils } from 'react-native-gifted-chat';
import { Svg } from 'expo';

const { isSameUser } = utils;

export default class Navbar extends Component<{}> {
	constructor(props) {
    super(props);
    this.state = {
      loadImage: false
    }
  }
  
  chatHighlight = (message) => {
    this.props.selectChat(message)
  }

	render() {
         const { currentMessage, nextMessage } = this.props;
         const { loadImage } = this.state
         const sameUser = isSameUser(currentMessage, nextMessage);
         const marginBottom = sameUser ? 2 : 10;
       return(
        <TouchableOpacity onLongPress={() => this.chatHighlight(currentMessage)} style={[styles.item, styles.itemIn, { marginBottom }]}>
        <View style={[styles.balloon, styles.border, { backgroundColor: !currentMessage.image ? '#f5f5f5' : null }]}>
        { currentMessage.select ? <View>
          <View style={styles.innerContainer}>
          <View style={styles.coner}></View>
            <Text style={{paddingTop: 5, color: '#666'}}> { currentMessage.select.text } </Text>
            </View>
            <Text style={{paddingTop: 2, color: '#444', fontSize: 11, fontWeight: 'bold' }}> { currentMessage.select.user.name } </Text>
          </View> : null }
          <Text style={{paddingTop: 2, color: '#435f7a', fontSize: 15, lineHeight: 17 }}> { currentMessage.text } </Text>
          
          { currentMessage.image && <ImageBackground
            onLoad={()=> this.setState({ loadImage: true })}
            style={{ width: 200, height: 150, justifyContent: 'center', backgroundColor: !loadImage ? '#b0e0e6' : null }}
            borderRadius={5}
            source={{ uri: currentMessage.image_secure_url }}
          > 
            { !loadImage && <ActivityIndicator style={{ justifyContent: 'center' }} color="blue" size="small" /> }
          </ImageBackground> }

          { !sameUser && !currentMessage.image && <View
          style={[
            styles.arrowContainer,
            styles.arrowLeftContainer,
          ]}
        >

           <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
                <Svg.Path
                    d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                    fill={ !currentMessage.image ? '#f5f5f5' : null }
                    x="0"
                    y="0"
                />
            </Svg>
          </View> } 
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
 },
 innerContainer: {
   backgroundColor: '#e5e5e5',
   borderRadius: 10,
   padding: 5,
   borderWidth: 1,
   borderColor: '#d9d9d9'
 },
 border: {
   borderWidth: 1,
   borderColor: '#e3e3e3',
 }
});

