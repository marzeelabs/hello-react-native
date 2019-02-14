import React, { PureComponent } from 'react';
import { ExpoConfigView } from '@expo/samples';

import HamburgerButton from '../components/HamburgerButton';

export default class SettingsScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: 'app.json',
    headerLeft: <HamburgerButton navigation={navigation} />,
  });

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}
