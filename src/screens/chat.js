import React, { Component } from 'react';
import { connect } from 'react-redux'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { StyleSheet, View, Image, Text, Platform } from 'react-native';
import { Header } from 'react-native-elements'
import { setValueAction, sendMessageAction, referMessAction } from '../actions/users'

import Loader from '../components/loader'
import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';

class HomeScreen extends Component<{}> {
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
       newMessage._id = messages.length + 1;
       if(refer) {
         newMessage['refer'] = true
         newMessage['select'] = selectedMessage
       }
       sendMessage(newMessage);
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
    return (
      <Text> hallo bloody snikky </Text>
    )
  }

  selectChat = (e, message) => {
     this.setState({
       refer: true,
       selectedMessage: message
     })
     alert(JSON.stringify(message))
     const { referMess } = this.props
     referMess(message);
  }

  addImage = () => {
     alert('add my image')
  }

  render() {
    const { navigation, store, setValue } = this.props
    const { profile, username } = navigation.state.params
    const { messages, message, user } = store
    return (
      <View style={{flex: 1}}>
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
            renderAvatarOnTop={true}
            renderMessage={this.renderMessage}
            renderBubble={this.renderBubble}
            onLongPress={this.selectChat}
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
  },
  newInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    padding:10,
    height:50,
  },
});