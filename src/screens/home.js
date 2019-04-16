import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native';
import { Header, Text, ListItem } from 'react-native-elements'
import { fetchUsersAction } from '../actions/users'

import Loader from '../components/loader'

class HomeScreen extends Component<{}> {

  componentWillMount(){
    const { fetchUsers, store } = this.props
    fetchUsers({ _id: store.user._id })
  }

  openChatPage = (chat) => {
    const { _id, username, profile } = chat
    this.props.navigation.navigate('Chat', { _id, username, profile })
  }

  render() {
    const { store } = this.props
    const { loading, network, users } = store
    return (
      <View style={{ flex: 1 }}>
         <Header
          placement="left"
          leftComponent={{ icon: 'chat', color: '#fff' }}
          centerComponent={{ text: 'Chats', style: { color: '#fff', fontWeight: 'bold', fontSize: 21 } }}
          containerStyle={{
            backgroundColor: '#32505d',
            justifyContent: 'space-around'
          }}
        />
        
        { loading && (
               <View style={ styles.container}>
                  <Loader />
               </View>
        ) }

        { network && (
               <View style={ styles.container}>
                  <Text style={ styles.network }> No Internet Connection Available </Text>
               </View>
        ) }

        { (users.length > 0) && (
            users.map((user, i ) => (
              <ListItem
                onPress={ () => this.openChatPage(user) }
                key={user._id}
                leftAvatar={{ source: { uri: user.profile }}}
                title={user.username}
                contentContainerStyle={{
                  borderBottomColor: '#f2f2f2',
                  borderBottomWidth: 2,
                  paddingBottom: 20

                }}
              />
            ))
        ) }
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
     fetchUsers: (obj) => dispatch(fetchUsersAction(obj))
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