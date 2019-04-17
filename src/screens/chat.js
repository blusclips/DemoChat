import React, { Component } from 'react';
import { connect } from 'react-redux'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';
import { StyleSheet, View, Image, Text, Platform } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { ImagePicker, Permissions } from 'expo';
import { Header } from 'react-native-elements'
import { setValueAction, sendMessageAction, referMessAction, uploadImageAction } from '../actions/users'

import BubbleLeft from '../components/BubbleLeft'
import BubbleRight from '../components/BubbleRight'


class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
       refer: false,
       selectedMessage: {}
    }
  }

  onSend = (messagesArr = []) => {
       const { sendMessage, store } = this.props
       const { refer, selectedMessage } = this.state
       const { messages } = store
       const newMessage = messagesArr[0];
       newMessage.select = false;
       newMessage.refer = false;
       newMessage._id = messages.length + 1;
       if(refer) {
         newMessage['refer'] = true
         newMessage['select'] = selectedMessage
       }
       sendMessage(newMessage);
       this.setState({
        refer: false,
        selectedMessage: {}
      })
  }

  renderCustomActions(props) {
    const options = { };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  renderBubble = (props, lol) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderMessage = (props) => {
    const { currentMessage } = props;
    return (
        <View>
            {props.position === 'left' && <BubbleLeft selectChat={this.selectChat} { ...props } /> }
            {props.position === 'right' && <BubbleRight selectChat={this.selectChat} { ...props } /> }
        </View>
    )
  }

  selectChat = (message) => {
     const { refer } = this.state
     if(refer) {
      this.setState({
        refer: false,
        selectedMessage: {}
      })
     } else {
      this.setState({
        refer: true,
        selectedMessage: message
      })
     }
     const { referMess } = this.props
     referMess(message);
  }

  addImage = async (props) => {
    const { status, expires, permissions } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      alert('Hey! You heve not enabled Camera permissions');
      return
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      const { navigation, store, sendMessage, uploadImage } = this.props
      const { profile, username } = navigation.state.params
      const { messages, user } = store
      const obj = {
         _id: messages.length + 1,
         createdAt: new Date(),
         user: {
           _id: user._id,
           name: user.username,
           avatar: user.profile
         },
         image: result.uri,
         select: false,
         refer: false,
         upload: false
      }
      uploadImage(obj)
    }
  }

  render() {
    const { navigation, store, setValue } = this.props
    const { profile, username } = navigation.state.params
    const { messages, message, user } = store
    return (
      <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
      <Header
          placement="left"
          leftComponent={<Image source={{uri: profile }} style={{ width: 35, height: 35, borderRadius: 100 }} />}
          centerComponent={{ text: username, style: { color: '#fff', fontWeight: 'bold', fontSize: 21 } }}
          containerStyle={{
            backgroundColor: '#32505d',
            justifyContent: 'space-around'
          }}
        />
      <GiftedChat
            messages={messages}
            text={message}
            onInputTextChanged={text => setValue({ field: 'message', value: text })}
            onSend={messages => this.onSend(messages)}
            user={{
                _id: user._id,
                name: user.username,
                avatar: user.profile
            }}
            renderActions={this.renderCustomActions}
            isAnimated={true}
            alwaysShowSend={true}
            showUserAvatar={true}
            scrollToBottom={true}
            renderMessage={this.renderMessage}
            onPressActionButton={this.addImage}
         />
         {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
         </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state
  }
  // body...
}

function mapDispatchToProps(dispatch) {
  return {
     setValue: (obj) => dispatch(setValueAction(obj)),
     sendMessage: (arr) => dispatch(sendMessageAction(arr)),
     uploadImage: (obj) => dispatch(uploadImageAction(obj)),
     referMess: (obj) => dispatch(referMessAction(obj))
  }
  // body...
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

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
  }
});