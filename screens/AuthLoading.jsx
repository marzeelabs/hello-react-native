import React, { Component } from 'react';
import {
  ActivityIndicator,
  // AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import auth from '../actions/auth';

import styles from './AuthLoading.scss';

class AuthLoadingScreen extends Component {
  static navigationOptions = {
    title: 'Hold on...',
    header: null,
  };

  componentDidMount() {
    this.bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const {
      // navigation,
      username,
      password,
      token,

      error,
      greet,
      setToken,
      tokenValid,
    } = this.props;

    if (token) {
      tokenValid();
      return;
    }

    if (username && password) {
      if (username === 'testuser' && password === 'test') {
        setToken('yay');
        return;
      }

      error('The username or password do not match.');
      return;
    }

    greet();

    // const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the Main screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // navigation.navigate(userToken ? 'Main' : 'Auth');

    // navigation.navigate(token === null ? 'Auth' : 'Main');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles['auth-loading__container']}>
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  password: state.auth.password,
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  error: payload => dispatch(auth.error(payload)),
  greet: () => dispatch(auth.greet()),
  setToken: payload => dispatch(auth.setToken(payload)),
  tokenValid: () => dispatch(auth.tokenValid()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
