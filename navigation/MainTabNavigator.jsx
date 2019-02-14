import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import HomeDrawerNavigation from './HomeDrawerNavigator';
import LinksScreen from '../screens/Links';
import TabBarIcon from '../components/TabBarIcon';

import styles from './MainTabNavigator.scss';

// Having a DrawerNavigator inside a BottomTabNavigator has some issues when
// switching screens. The chosen stack for the bottom tab sometimes jumps back
// to the previous. We should only use one type of navigator at a time to
// prevent such issues; I'm leaving in the code for both for now though as an
// example of what they can do.

HomeDrawerNavigation.navigationOptions = {
  title: 'Main',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="information-circle"
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  title: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="link"
    />
  ),
};

export default createBottomTabNavigator({
  HomeDrawerNavigation,
  LinksStack,
}, {
  initialRouteName: 'HomeDrawerNavigation',
  tabBarOptions: {
    activeBackgroundColor: styles['tab-bar__item--active'].backgroundColor,
    style: styles['tab-bar'],
  },
});
