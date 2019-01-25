import React, { PureComponent } from 'react';
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends PureComponent {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}
