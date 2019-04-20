import React, { Component } from 'react';

import { Text } from 'native-base'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { ImageBackground, ActivityIndicator } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import {  utils } from 'react-native-gifted-chat';
import { Svg } from 'expo';

const { isSameUser } = utils;
const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};

export default class Navbar extends Component<{}> {
	constructor(props) {
    super(props);
  }
  
  chatHighlight = (message) => {
    this.props.selectChat(message)
  }

	render() {
      const { currentMessage, nextMessage } = this.props;
      const sameUser = isSameUser(currentMessage, nextMessage);
      const marginBottom = sameUser ? 2 : 10;
       return(
        <TouchableOpacity 
          onLongPress={() => this.chatHighlight(currentMessage)}
           style={[styles.itemOut, { marginBottom }]}>
        <View style={[styles.balloon, styles.bubblesContainer, {backgroundColor: !currentMessage.image ? '#86AEFA' : null  }]}>
          { currentMessage.select ? <View>
            <View style={{ padding: 5}}>
                <View style={styles.innerText}>
                      <View style={{flexDirection: 'column'}}>
                        <Text style={{color: '#666', paddingHorizontal: 10, paddingTop: 5, fontWeight: '700'}}>{ currentMessage.select.user.name }</Text>
                        <Text style={{color: '#444', paddingHorizontal: 10, paddingTop: 5}}>{ currentMessage.select.text }</Text>
                      </View>
                </View>
              </View>
          </View> : null }
          { !currentMessage.image && <Text style={{ paddingTop: 5, color: !currentMessage.refer ? '#fff' : '#fff',  fontSize: 15, paddingLeft: 5, lineHeight: 17 }}> { currentMessage.text } </Text> }
          { currentMessage.image && <ImageBackground
            style={{ width: 200, height: 150, justifyContent: 'center' }}
            borderRadius={5}
            source={{ uri: currentMessage.image }}
          > 
            { !currentMessage.upload && <ActivityIndicator style={{ justifyContent: 'center' }} color="blue" size="small" /> }
          </ImageBackground> }
          { !sameUser && !currentMessage.image && <View
          style={[
            styles.arrowContainer,
            styles.arrowRightContainer,
          ]}
        >
           <Svg style={styles.arrowRight} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.485 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
                <Svg.Path
                    d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                    fill={ !currentMessage.refer ? '#86AEFA' : null }
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
      paddingHorizontal: moderateScale(5, 2),
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
   cover: {
     position: 'absolute',
     backgroundColor: 'red',
     width: '100%'
   },
   innerText: {
     backgroundColor: "#BBCBFD",
     paddingBottom: 4,
     borderRadius: 10,
     marginTop: -5
   },
   bubblesContainer: {
   }
  });

