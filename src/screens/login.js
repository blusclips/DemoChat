import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import { loginUserAction, setValueAction } from '../actions/users';
import ButtonLOng from '../components/button/long';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onSubmit = () => {
    const { loginUser, navigation, setValue } = this.props;
    const username = this.state.username.trim();
    const { password } = this.state;
    if (!username || !password) {
      setValue({ field: 'error', value: 'Enter username and password' });
      return;
    }
    setValue({ field: 'error', value: '' });
    loginUser({ username, password, navigation });
  };

  render() {
    const { store } = this.props;
    const error = (store && store.error) || '';
    return (
      <View style={styles.container}>
        <Text style={[styles.heading]}> Demo </Text>
        <Text style={[styles.heading, styles.one]}> Messenger </Text>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          style={styles.input}
        />
        <ButtonLOng label="Log in" onPress={this.onSubmit} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setValue: (obj) => dispatch(setValueAction(obj)),
    loginUser: (obj) => dispatch(loginUserAction(obj)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

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
    marginBottom: 60,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  error: {
    color: '#C62828',
    marginTop: 12,
    textAlign: 'center',
  },
});
