import { createStackNavigator } from "react-navigation";

import Home from './home';
import Chat from './chat';
import Login from './login'

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Home: {
    screen: Home
  },
  Chat: {
    screen: Chat 
  }
}, {
  initialRoute: 'login',
  headerMode: 'none'
});

export default AppNavigator;
