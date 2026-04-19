import React from 'react';
import { createAppContainer } from 'react-navigation';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';

import configureStore from './src/configureStore';
import AppNavigator from './src/screens';
import ErrorBoundary from './src/components/ErrorBoundary';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);

const AppContainer = createAppContainer(AppNavigator);
const store = configureStore();

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  componentDidMount = async () => {
    try {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      });
    } catch (err) {
      console.warn('Font load failed', err);
    } finally {
      this.setState({ fontsLoaded: true });
    }
  };

  render() {
    if (!this.state.fontsLoaded) {
      return null;
    }
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </ErrorBoundary>
    );
  }
}
