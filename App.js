import React from 'react'
import { createAppContainer } from "react-navigation";
import { Provider } from 'react-redux'
import configureStore from './src/configureStore'
import AppNavigator from "./src/screens"

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <AppContainer />
      </Provider>
    )
  }
}
