import React, { Component } from 'react';
import {
  // AsyncStorage,
  View,
} from 'react-native';
import {
  Button,
  Input,
} from 'react-native-elements';
import { connect } from 'react-redux';
import FlashMessage from 'react-native-flash-message';

import auth from '../actions/auth';

import styles from './SignIn.scss';

class SignIn extends Component {
  static navigationOptions = {
    title: 'Please sign in',
    header: null,
  };

  inputs = {
    username: null,
    password: null,
  };

  state = {
    usernameValue: '',
    usernameShake: false,

    passwordValue: '',
    passwordShake: false,

    lastError: 0,
  };

  componentDidMount() {
    this.getInputDefaults();
    this.checkForError();
  }

  componentDidUpdate() {
    this.checkForError();
  }

  getInputDefaults = () => {
    const {
      usernamePreviousValue,
      passwordPreviousValue,
    } = this.props;

    if (usernamePreviousValue || passwordPreviousValue) {
      const newState = {};

      if (usernamePreviousValue) {
        newState.usernameValue = usernamePreviousValue;
      }

      if (passwordPreviousValue) {
        newState.passwordValue = passwordPreviousValue;
      }

      this.setState(newState);
    }
  }

  checkForError = () => {
    const {
      error,
    } = this.props;

    const {
      lastError,
    } = this.state;

    if (error && error.timestamp > lastError) {
      this.setState({
        lastError: error.timestamp,
      }, () => {
        this.flashMessage.showMessage({
          message: error.message,
          autoHide: true,
          canRegisterAsDefault: false,
          duration: 4000,
          floating: true,
          hideOnPress: false,
          icon: 'auto',
          position: 'top',
          type: 'warning',
        });
      });
    }
  };

  _signInAsync = async () => {
    const {
      login,
      // navigation,
    } = this.props;

    const {
      username,
      password,
    } = this.inputs;

    const {
      usernameValue,
      usernameShake,
      passwordValue,
      passwordShake,
    } = this.state;

    const newState = {};

    if (!usernameValue !== usernameShake) {
      newState.usernameShake = !usernameValue;
    }

    if (!passwordValue !== passwordShake) {
      newState.passwordShake = !passwordShake;
    }

    if (Object.keys(newState).length) {
      this.setState(newState);
    }

    if (usernameValue && passwordValue) {
      login({
        username: usernameValue,
        password: passwordValue,
      });
    }
    else {
      if (!usernameValue) {
        username.shake();
      }
      if (!passwordValue) {
        password.shake();
      }
    }

    // await AsyncStorage.setItem('userToken', 'abc');

    // navigation.navigate('Main');
  };

  render() {
    const {
      usernameShake,
      passwordShake,
    } = this.state;

    const {
      usernamePreviousValue,
      passwordPreviousValue,
    } = this.props;

    const usernameProps = {
      containerStyle: [ styles['sign-in__container'] ],
      inputStyle: [ styles['sign-in__input'] ],
      inputContainerStyle: [],
    };

    const passwordProps = {
      containerStyle: [ styles['sign-in__container'] ],
      inputStyle: [ styles['sign-in__input'] ],
      inputContainerStyle: [],
    };

    if (usernameShake) {
      usernameProps.inputContainerStyle.push(styles['sign-in__input-container--error']);
      usernameProps.placeholderTextColor = styles['sign-in__input--error'].color;
    }
    if (passwordShake) {
      passwordProps.inputContainerStyle.push(styles['sign-in__input-container--error']);
      passwordProps.placeholderTextColor = styles['sign-in__input--error'].color;
    }

    return (
      <View style={styles['sign-in__wrapper']}>
        <View>
          <Input
            autoComplete="username"
            textContentType="username"
            placeholder="Username"
            defaultValue={usernamePreviousValue || ''}
            onChangeText={text => this.setState({ usernameValue: text })}
            ref={(ref) => { this.inputs.username = ref; }}
            {...usernameProps}
          />

          <Input
            autoComplete="password"
            textContentType="password"
            secureTextEntry
            placeholder="Password"
            defaultValue={passwordPreviousValue || ''}
            onChangeText={text => this.setState({ passwordValue: text })}
            ref={(ref) => { this.inputs.password = ref; }}
            {...passwordProps}
          />

          <Button
            buttonStyle={styles['sign-in__btn']}
            title="Sign in!"
            onPress={this._signInAsync}
          />
        </View>

        <FlashMessage ref={(ref) => { this.flashMessage = ref; }} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  usernamePreviousValue: state.auth.username,
  passwordPreviousValue: state.auth.password,
});

const mapDispatchToProps = dispatch => ({
  login: authData => dispatch(auth.login(authData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
