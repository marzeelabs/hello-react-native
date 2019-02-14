import React from 'react';
import {
  createDrawerNavigator,
  createStackNavigator,
} from 'react-navigation';

import HomeDrawerNavigationContent from './HomeDrawerNavigationContent';
import HomeScreen from '../screens/Home';
import SettingsScreen from '../screens/Settings';
import TabBarIcon from '../components/TabBarIcon';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  title: 'Home',
  drawerIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="information-circle"
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  title: 'Settings',
  drawerIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="options"
    />
  ),
};

export default createDrawerNavigator({
  HomeStack,
  SettingsStack,
}, {
  initialRouteName: 'HomeStack',
  contentComponent: HomeDrawerNavigationContent,
});
