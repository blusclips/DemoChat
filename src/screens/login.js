import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native';
import { loginUserAction, setValueAction } from '../actions/users'
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
           <Text style={[styles.heading]}> Demo </Text>
           <Text style={[styles.heading, styles.one]}> Messenger </Text>
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
    marginTop: 100,
    width: '80%',
    marginLeft: '10%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#615A5A',
  },
  one: {
    color: '#AAAAAA',
    fontStyle: 'italic',
    marginBottom: 120,
  },
  or: {
    fontSize: 16,
    color: '#AAAAAA',
    marginTop: 20,
    marginBottom: 20,
  }
});