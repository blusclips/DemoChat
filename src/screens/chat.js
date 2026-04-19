import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  Keyboard,
  TextInput,
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat, Actions } from 'react-native-gifted-chat';
import { ImagePicker, Permissions } from 'expo';
import { Header, Icon } from 'react-native-elements';
import UUIDV4 from 'uuid/v4';

import {
  setValueAction,
  sendMessageAction,
  referMessAction,
  uploadImageAction,
  getNewMessageAction,
  teardownMessageListeners,
} from '../actions/users';

import BubbleLeft from '../components/BubbleLeft';
import BubbleRight from '../components/BubbleRight';

const MAX_MESSAGE_LENGTH = 2000;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refer: false,
      showFooter: false,
      replyMsg: '',
      replyTo: '',
      message: '',
      send: false,
      selectedMessage: {},
    };
  }

  componentDidMount() {
    const { getNewMessage, store, setValue } = this.props;
    if (!store.user_logged_in && store.user && store.user._id) {
      getNewMessage(store.user._id);
      setValue({ field: 'user_logged_in', value: true });
    }
  }

  componentWillUnmount() {
    const { teardownListeners } = this.props;
    if (teardownListeners) {
      teardownListeners();
    }
  }

  onSend = () => {
    const { sendMessage, store } = this.props;
    const { refer, selectedMessage, message } = this.state;
    const { otherUser = {}, user = {} } = store;

    const obj = {
      _id: UUIDV4(),
      text: message,
      createdAt: new Date(),
      user: {
        _id: user._id,
        name: user.username,
        avatar: user.profile,
      },
      reciever: {
        _id: otherUser._id,
        name: otherUser.username,
        avatar: otherUser.profile,
      },
      select: false,
      refer: false,
    };

    if (refer) {
      obj.refer = true;
      obj.select = selectedMessage;
    }

    sendMessage(obj);
    this.setState({
      refer: false,
      showFooter: false,
      message: '',
      send: false,
      selectedMessage: {},
    });
    Keyboard.dismiss();
  };

  renderCustomActions(props) {
    const options = {};
    return <Actions {...props} options={options} />;
  }

  dismisChatFooter = () => {
    this.setState({ showFooter: false });
    const { referMess } = this.props;
    const { selectedMessage } = this.state;
    referMess(selectedMessage);
  };

  renderChatFooter = () => {
    const { replyTo, replyMsg, showFooter } = this.state;
    if (!showFooter) {
      return <View style={{ height: 30 }} />;
    }
    return (
      <View style={{ maxHeight: 100, flexDirection: 'row', marginBottom: 13 }}>
        <View style={{ minHeight: 50, width: 5, backgroundColor: '#435f7a' }} />
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ color: '#435f7a', paddingLeft: 10, paddingTop: 5 }}>{replyTo}</Text>
          <Text style={{ color: 'gray', paddingLeft: 10, paddingTop: 5 }}>{replyMsg}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 10,
          }}
        >
          <TouchableOpacity onPress={this.dismisChatFooter}>
            <Icon name="x" type="feather" color="#0084ff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderInputToolbar = () => {
    const { send, message } = this.state;
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          position: 'absolute',
          alignItems: 'center',
          flexDirection: 'row',
          bottom: 0,
          paddingBottom: 5,
          paddingTop: 5,
        }}
      >
        <TextInput
          value={message}
          onChangeText={this.onChangeText}
          multiline
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder="Type a message"
          style={{
            minHeight: 40,
            marginTop: 5,
            marginBottom: 5,
            paddingLeft: 15,
            marginLeft: 10,
            borderWidth: 1,
            borderColor: '#00695c',
            backgroundColor: '#fbfbfb',
            borderRadius: 15,
            width: '80%',
          }}
        />
        <View style={{ width: '20%', justifyContent: 'center' }}>
          {send && (
            <Icon
              size={30}
              color="#00695c"
              onPress={this.onSend}
              style={{
                color: '#00695c',
                textAlign: 'center',
                alignSelf: 'center',
                top: '50%',
              }}
              name="send"
            />
          )}
          {!send && (
            <Icon
              size={30}
              color="#00695c"
              onPress={this.addImage}
              style={{
                color: '#00695c',
                textAlign: 'center',
                alignSelf: 'center',
                top: '50%',
              }}
              name="image"
            />
          )}
        </View>
      </View>
    );
  };

  renderMessage = (props) => (
    <View>
      {props.position === 'left' && <BubbleLeft selectChat={this.selectChat} {...props} />}
      {props.position === 'right' && <BubbleRight selectChat={this.selectChat} {...props} />}
    </View>
  );

  selectChat = (message) => {
    const { refer } = this.state;
    if (refer) {
      this.setState({ refer: false, selectedMessage: {} });
    } else {
      this.setState({
        refer: true,
        selectedMessage: message,
        showFooter: true,
        replyTo: message.user.name,
        replyMsg: message.text,
      });
    }
    const { referMess } = this.props;
    referMess(message);
  };

  addImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Hey! You have not enabled Camera permissions');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      return;
    }

    const { store, uploadImage } = this.props;
    const { user = {}, otherUser = {} } = store;
    const obj = {
      _id: UUIDV4(),
      createdAt: new Date(),
      user: {
        _id: user._id,
        name: user.username,
        avatar: user.profile,
      },
      reciever: {
        _id: otherUser._id,
        name: otherUser.username,
        avatar: otherUser.profile,
      },
      image: result.uri,
      select: false,
      refer: false,
      upload: false,
    };
    uploadImage(obj);
  };

  onChangeText = (message) => {
    const trimmed = message.slice(0, MAX_MESSAGE_LENGTH);
    this.setState({ message: trimmed, send: trimmed !== '' });
  };

  render() {
    const { store, setValue } = this.props;
    const { otherUser = {}, messages = [], message = '', user = {} } = store;
    const { profile = '', username = '' } = otherUser;

    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#eee' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Header
          placement="left"
          leftComponent={
            profile ? (
              <Image
                source={{ uri: profile }}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: '#00695C',
                }}
              />
            ) : null
          }
          centerComponent={{ text: username, style: { color: '#444', fontSize: 21 } }}
          containerStyle={{
            backgroundColor: '#fbfbfb',
            justifyContent: 'space-around',
          }}
        />
        <GiftedChat
          messages={messages}
          text={message}
          onInputTextChanged={(text) => setValue({ field: 'message', value: text })}
          onSend={this.onSend}
          user={{
            _id: user._id,
            name: user.username,
            avatar: user.profile,
          }}
          renderActions={this.renderCustomActions}
          isAnimated
          alwaysShowSend
          showUserAvatar
          scrollToBottom
          bottomOffset={100}
          renderMessage={this.renderMessage}
          onPressActionButton={this.addImage}
          renderChatFooter={this.renderChatFooter}
          renderInputToolbar={this.renderInputToolbar}
        />
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null}
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setValue: (obj) => dispatch(setValueAction(obj)),
    sendMessage: (arr) => dispatch(sendMessageAction(arr)),
    uploadImage: (obj) => dispatch(uploadImageAction(obj)),
    referMess: (obj) => dispatch(referMessAction(obj)),
    getNewMessage: (_id) => dispatch(getNewMessageAction(_id)),
    teardownListeners: () => dispatch(teardownMessageListeners()),
  };
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
    fontWeight: 'bold',
  },
});
