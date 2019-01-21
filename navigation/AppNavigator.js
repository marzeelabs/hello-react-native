import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import AuthLoadingScreen from '../screens/AuthLoading';
import SignInScreen from '../screens/SignIn';

const stacks = {
  Auth: createStackNavigator({
    SignIn: SignInScreen,
  }),
  AuthLoading: createStackNavigator({
    AuthLoading: AuthLoadingScreen,
  }),
  Main: MainTabNavigator,
};

const options = {
  initialRouteName: 'AuthLoading',
};

export default createAppContainer(createSwitchNavigator(stacks, options));
