import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import { loginUserAction, setValue } from '../actions/account'

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app! loggin </Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.account
  }
  // body...
}

function mapDispatchToProps(dispatch) {
  return {
     setValue: (arr) => dispatch(setValue(arr)),
     loginUser: (obj) => dispatch(loginUserAction(obj))
  }
  // body...
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});