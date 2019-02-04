import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import SignOut from '../components/SignOut';

import styles from './Home.scss';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  _handleLearnMorePress() {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/development-mode',
    );
  }

  _handleHelpPress() {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes',
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      return (
        <View style={styles['home__inner-container']}>
          <Text style={styles['home__mode-text']}>
            Development mode is enabled, your app will be slower but you can use useful development
            tools.
            {' '}
            <Text onPress={this._handleLearnMorePress} style={styles['home__help-text']}>
              Learn more
            </Text>
          </Text>
          <TouchableOpacity onPress={this._handleHelpPress}>
            <Text style={styles['home__help-text']}>Help, it didn’t automatically reload!</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <Text style={styles['home__mode-text']}>
          You are not in development mode, your app will run at full speed.
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.home__container}>
        <ScrollView style={styles['home__content-container']}>
          <View style={styles['home__welcome-container']}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles['home__welcome-image']}
            />
          </View>
          { this._maybeRenderDevelopmentModeWarning() }

          <View style={styles['home__inner-container']}>
            <Image
              source={
                require('../assets/images/0.png')
              }
              style={styles['home__mz-image']}
            />

            <Text style={styles['home__mz-text']}>
              Hello Marzee Labs people!
            </Text>
          </View>

          <SignOut />
        </ScrollView>

        <View style={styles['home__tab-bar-info-container']}>
          <Text style={styles['home__tab-bar-info-text']}>This is a tab bar. You can edit it in:</Text>

          <View style={[ styles['home__code-highlight-container'], styles['home__tab-bar-info-filename'] ]}>
            <MonoText style={styles['home__code-highlight-text']}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }
}
