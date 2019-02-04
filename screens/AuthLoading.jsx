import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './AuthLoading.scss';

class AuthLoadingScreen extends Component {
  static navigationOptions = {
    title: 'Hold on...',
    header: null,
  };

  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const {
      navigation,
      token,
    } = this.props;
    // const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the Main screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // navigation.navigate(userToken ? 'Main' : 'Auth');

    navigation.navigate(token === null ? 'Auth' : 'Main');
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
  token: state.auth.token,
});

export default connect(mapStateToProps)(AuthLoadingScreen);
