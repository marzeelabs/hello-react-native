import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import SignOut from '../components/SignOut';
import TabBarIcon from '../components/TabBarIcon';

import './Home.scss';

const cns = 'home';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
      />
    ),
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
        <View styleName={`${cns}__inner-container`}>
          <Text styleName={`${cns}__mode-text`}>
            Development mode is enabled, your app will be slower but you can use useful development
            tools.
            {' '}
            <Text onPress={this._handleLearnMorePress} styleName={`${cns}__help-text`}>
              Learn more
            </Text>
          </Text>
          <TouchableOpacity onPress={this._handleHelpPress}>
            <Text styleName={`${cns}__help-text`}>Help, it didn’t automatically reload!</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <Text styleName={`${cns}__mode-text`}>
          You are not in development mode, your app will run at full speed.
      </Text>
    );
  }

  render() {
    return (
      <View className="test" styleName={`${cns}__container`}>
        <ScrollView styleName={`${cns}__content-container`}>
          <View styleName={`${cns}__welcome-container`}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              styleName={`${cns}__welcome-image`}
            />
          </View>
          { this._maybeRenderDevelopmentModeWarning() }

          <View styleName={`${cns}__inner-container`}>
            <Image
              source={
                require('../assets/images/0.png')
              }
              styleName={`${cns}__mz-image`}
            />

            <Text styleName={`${cns}__mz-text`}>
              Hello Marzee Labs people!
            </Text>
          </View>

          <SignOut />
        </ScrollView>

        <View styleName={`${cns}__tab-bar-info-container`}>
          <Text styleName={`${cns}__tab-bar-info-text`}>This is a tab bar. You can edit it in:</Text>

          <View styleName={`${cns}__code-highlight-container ${cns}__tab-bar-info-filename`}>
            <MonoText styleName={`${cns}__code-highlight-text`}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }
}
