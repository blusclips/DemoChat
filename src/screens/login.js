import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native';
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
      <View style={styles.container}>
           <Text style={[styles.heading]}>Messenger</Text>
           <Text style={[styles.heading, styles.one]}>Demo</Text>
           <ButtonLOng label="Login as USER A" onPress={this.loginUserA}/>
           <Text style={styles.or}>Or</Text>
           <ButtonLOng label="Login as USER B" onPress={this.loginUserB} />
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
    alignItems: 'center',
  },
  heading: {
    fontSize: 40,
    color: '#615A5A',
  },
  one: {
    color: '#AAAAAA',
    marginBottom: 120,
  },
  or: {
    fontSize: 16,
    color: '#AAAAAA',
    marginTop: 20,
    marginBottom: 20,
  }
});