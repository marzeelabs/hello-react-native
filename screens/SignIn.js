import React, { Component } from 'react';
import {
  AsyncStorage,
  Button,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { actionLogin } from '../actions/auth';

class SignIn extends Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  _signInAsync = async () => {
    const {
      login,
      navigation,
    } = this.props;

    // await AsyncStorage.setItem('userToken', 'abc');
    login('yay');

    // navigation.navigate('Main');
  };

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: token => dispatch(actionLogin(token)),
});

export default connect(null, mapDispatchToProps)(SignIn);
