import { createStackNavigator } from "react-navigation";

import Login from './login';

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login
  }
}, {
  initialRoute: 'login',
  headerMode: 'none'
});

export default AppNavigator;
