import { createStackNavigator } from "react-navigation";

import Chat from './chat';
import Login from './login'

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Chat: {
    screen: Chat 
  }
}, {
  initialRoute: 'login',
  headerMode: 'none'
});

export default AppNavigator;
