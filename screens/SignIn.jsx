import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
} from 'react-native';
import {
  Button,
  Input,
} from 'react-native-elements';
import { connect } from 'react-redux';

import { actionLogin } from '../actions/auth';

import styles from './SignIn.scss';

class SignIn extends Component {
  static navigationOptions = {
    title: 'Please sign in',
    header: null,
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
      <View style={styles['sign-in__container']}>
        <View>
          <Input
            autoComplete="username"
            textContentType="username"
            containerStyle={styles['sign-in__input-container']}
            inputStyle={styles['sign-in__input']}
            placeholder="Username"
          />
          <Input
            autoComplete="password"
            textContentType="password"
            secureTextEntry
            containerStyle={styles['sign-in__input-container']}
            inputStyle={styles['sign-in__input']}
            placeholder="Password"
          />
          <Button
            buttonStyle={styles['sign-in__btn']}
            title="Sign in!"
            onPress={this._signInAsync}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: token => dispatch(actionLogin(token)),
});

export default connect(null, mapDispatchToProps)(SignIn);
