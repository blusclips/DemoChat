import React from 'react'
import { createAppContainer } from "react-navigation";
import { Provider } from 'react-redux'
import { Font } from 'expo';
import configureStore from './src/configureStore'
import AppNavigator from "./src/screens"

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  state = {
    fontsLoaded: false
  }
  componentDidMount = async () => {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({fontsLoaded: true})
  }
  render() {
    if(!this.state.fontsLoaded) {
      return null;
    }
    return (
      <Provider store={configureStore()}>
        <AppContainer />
      </Provider>
    )
  }
}
