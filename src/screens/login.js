import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native';
import { loginUserAction, setValueAction } from '../actions/users'

import Title from '../components/title'
import Error from '../components/error'
import TextInput from '../components/input'
import ButtonLOng from '../components/button/long'

class HomeScreen extends Component<{}> {

  loginUser = () => {
    const { store, setValue, loginUser, navigation } = this.props
    const { username } = store
    if(username === 'userA' || username === 'userB') {
      loginUser({ username, navigation })
    } else {
      setValue({ field: 'error', value: 'Enter Username - (userA or userB)' })
      return
    }
  }

  addUsername = (value) => {
    const { setValue } = this.props
    setValue({field: 'error', value: '' })
    setValue({field: 'username', value }) 
  }

  render() {
    const { store, setValue } = this.props
    const { error, username } = store
    return (
      <View style={{ flex: 1, width: '80%', marginLeft: '10%' }}>
           {Title({ title: 'Demo Messaenger'})}
           {(error !== '') && <Error error={error} /> }
           <TextInput label="userA or userB" onChange={ this.addUsername } />
           <ButtonLOng label="Login" onPress={this.loginUser} />
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