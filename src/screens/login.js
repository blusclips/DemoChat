import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native';
import { loginUserAction, setValueAction } from '../actions/users'

import Title from '../components/title'
import Error from '../components/error'
import TextInput from '../components/input'
import ButtonLOng from '../components/button/long'

class HomeScreen extends Component {

  loginUserB = () => {
    const { loginUser, navigation } = this.props
    loginUser({ username: 'userB', navigation})
  }

  loginUserA = () => {
    const { loginUser, navigation } = this.props
    loginUser({ username: 'userA', navigation})
  }

  render() {
    return (
      <View style={{ flex: 1, width: '80%', marginLeft: '10%' }}>
           {Title({ title: 'Demo Messaenger'})}
           <ButtonLOng label="Login as userA" onPress={this.loginUserA} />
           <ButtonLOng label="Login as userB" onPress={this.loginUserB} />
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
     loginUser: (obj) => dispatch(loginUserAction(obj))
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