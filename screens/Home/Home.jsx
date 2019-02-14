import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { WebBrowser } from 'expo';

import backend from '../../actions/backend';
import general from '../../actions/general';
import profile from '../../actions/profile';

import HamburgerButton from '../../components/HamburgerButton';
import { MonoText } from '../../components/StyledText';

import styles from './Home.scss';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerLeft: <HamburgerButton navigation={navigation} />,
  });

  componentDidMount() {
    const {
      name,

      loadingStart,
      loadingStop,
      remote,
      setProfile,
    } = this.props;

    if (!name) {
      loadingStart();

      remote('/profile')
        .then((responseJson) => {
          if (responseJson !== false) {
            setProfile(responseJson);
          }
        })
        .then(loadingStop);
    }
  }

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
    const {
      name,
    } = this.props;

    if (!name) {
      return null;
    }

    return (
      <View style={styles.home__container}>
        <ScrollView style={styles['home__content-container']}>
          <View style={styles['home__welcome-container']}>
            <Image
              source={
                __DEV__
                  ? require('../../assets/images/robot-dev.png')
                  : require('../../assets/images/robot-prod.png')
              }
              style={styles['home__welcome-image']}
            />
          </View>
          { this._maybeRenderDevelopmentModeWarning() }

          <View style={styles['home__inner-container']}>
            <Image
              source={
                require('../../assets/images/0.png')
              }
              style={styles['home__mz-image']}
            />

            <Text style={styles['home__mz-text']}>
              {`Hello ${name}!`}
            </Text>
          </View>
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

const mapStateToProps = state => ({
  name: state.profile.name,
});

const actionCreators = {
  ...backend,
  ...general,
  ...profile,
};

export default connect(mapStateToProps, actionCreators)(HomeScreen);
