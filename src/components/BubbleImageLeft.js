import React, { Component } from 'react';

import { Text } from 'native-base'
import { Image, StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters';
import { Svg } from 'expo';

export default class Navbar extends Component<{}> {
	constructor(props) {
		super(props);
	}

	render() {
      const { error } = this.props;
       return(
        <View style={[styles.item, styles.itemOut]}>
        <View style={[styles.balloon, {backgroundColor: '#1084ff'}]}>

        <Image
            style={{ width: 50, height: 50 }}
            styleName="small"
            borderRadius={5}
            source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png'}}
            />
          <View
          style={[
            styles.arrowContainer,
            styles.arrowRightContainer,
          ]}
        >
           <Svg style={styles.arrowRight} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.485 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
                <Svg.Path
                    d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                    fill="#1084ff"
                    x="0"
                    y="0"
                />
            </Svg>
        </View>
        </View>
      </View>
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