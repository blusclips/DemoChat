import React, { Component } from 'react';
import { connect } from 'react-redux'
import { TouchableOpacity, Keyboard, TextInput } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat, Actions } from 'react-native-gifted-chat';
import { StyleSheet, View, Image, Text, Platform } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { Header, Icon } from 'react-native-elements'
import { setValueAction, sendMessageAction, referMessAction, uploadImageAction, getNewMessageAction } from '../actions/users'

import BubbleLeft from '../components/BubbleLeft'
import BubbleRight from '../components/BubbleRight'

function makeid(length) {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
       refer: false,
       showFooter: false,
       replyMsg: '',
       replyTo: '',
       message: '',
       selectedMessage: {}
    }
  }

  componentWillMount = () => {
    const { getNewMessage, store } = this.props
    getNewMessage(store.user._id)
  }

  onSend = () => {
       const { sendMessage, store } = this.props
       const { refer, selectedMessage, message } = this.state
       const { otherUser, user } = store
       const obj = {
        _id: makeid(8),
        text: message,
        createdAt: new Date(),
        user: {
          _id: user._id,
          name: user.username,
          avatar: user.profile
        },
        reciever: {
         _id: otherUser._id,
         name: otherUser.username,
         avatar: otherUser.profile
        },
        select: false,
        refer: false
     }

       if(refer) {
         obj['refer'] = true
         obj['select'] = selectedMessage
       }

       sendMessage(obj);
       this.setState({
        refer: false,
        showFooter: false,
        message: '',
        selectedMessage: {}
      })
      Keyboard.dismiss()
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

  dismisChatFooter = () => {
    this.setState({
       showFooter: false
    })
    const { referMess } = this.props
    const { selectedMessage } = this.state
    referMess(selectedMessage);
  }

  renderChatFooter = () => {
    const { replyTo, replyMsg, showFooter } = this.state
    if(!showFooter) {
      return null
    }
    return (
      <View style={{height: 50, flexDirection: 'row'}}>
      <View style={{height:50, width: 5, backgroundColor: '#435f7a'}}></View>
      <View style={{flexDirection: 'column'}}>
          <Text style={{color: '#435f7a', paddingLeft: 10, paddingTop: 5}}>{replyTo}</Text>
          <Text style={{color: 'gray', paddingLeft: 10, paddingTop: 5}}>{replyMsg}</Text>
      </View>
        <View style={{flex: 1,justifyContent: 'center',alignItems:'flex-end', paddingRight: 10}}>
          <TouchableOpacity onPress={this.dismisChatFooter}>
              <Icon name="x" type="feather" color="#0084ff" />
          </TouchableOpacity>
         </View>
      </View>
    )
  }

  renderInputToolbar = () => {
    return (
      <View style={{ flex: 1, width: '100%', alignItems: 'center', flexDirection: 'row', bottom: 0, paddingBottom: 10, paddingTop: 5 }}>
           <View style={{ minHeight: 45, marginTop: 5, marginBottom: 5, paddingLeft: 15, marginLeft: 10, borderWidth: 2, borderColor: 'green', borderRadius: 20, width: '80%' }}>
              <TextInput onChangeText={(message)=> this.setState({ message })} multiline={true} placeholder="Type a message" style={{ width: '100%' }} />
           </View>
           <View style={{ width: '20%', justifyContent: 'center'}}>
           <Icon size={30} onPress={this.onSend} style={{ textAlign: 'center', alignSelf: 'center', top: '50%' }} name="send" />
           </View>
      </View>
    )
  }

  renderMessage = (props) => {
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
        selectedMessage: message,
        showFooter: true,
        replyTo: message.user.name,
        replyMsg: message.text
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
      allowsEditing: false,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      const { store, uploadImage } = this.props
      const { user, otherUser } = store
      const obj = {
         _id: makeid(8),
         createdAt: new Date(),
         user: {
           _id: user._id,
           name: user.username,
           avatar: user.profile
         },
         reciever: {
          _id: otherUser._id,
          name: otherUser.username,
          avatar: otherUser.profile
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
    const { store, setValue } = this.props
    const { profile, username } = store.otherUser
    const { messages, message, user } = store
    return (
      <View style={{flex: 1, backgroundColor: '#E6EAEA'}}>
      <Header
          placement="left"
          leftComponent={<Image source={{uri: profile }} style={{ width: 35, height: 35, borderRadius: 100 }} />}
          centerComponent={{ text: username, style: { color: '#fff', fontWeight: 'bold', fontSize: 21 } }}
          containerStyle={{
            backgroundColor: '#556DC1',
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
            renderChatFooter={this.renderChatFooter}
            renderInputToolbar={this.renderInputToolbar}
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
     referMess: (obj) => dispatch(referMessAction(obj)),
     getNewMessage: (_id) => dispatch(getNewMessageAction(_id))
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