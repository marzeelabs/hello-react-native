import React, { Component } from 'react';
import { connect } from 'react-redux';

import auth, { getStoredToken } from '../actions/auth';
import Loading from '../components/Loading';
import remote from '../components/remote';
import processResponse from '../components/processResponse';

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
      username,
      password,
      jwToken,

      errorDispatch,
      finish,
      greet,
      setJWToken,
    } = this.props;

    if (!jwToken && !username && !password) {
      // We may be just opening the app for the first time, see if there's an
      // access token in the device storage that we can use.
      const storedToken = await getStoredToken();

      if (storedToken) {
        return setJWToken(storedToken);
      }
    }

    if (jwToken) {
      return finish();
    }

    if (username && password) {
      return remote({
        path: '/api/token',
        method: 'POST',
        body: {
          name: username,
          pass: password,
        },
      })
        .then(response => processResponse('auth', response, errorDispatch))
        .then((responseJson) => {
          if (responseJson !== false) {
            setJWToken(responseJson.token);
          }
        })
        .catch((ex) => {
          // eslint-disable-next-line no-console
          console.warning(ex);

          errorDispatch('An unknown error occurred.');
        });
    }

    return greet();
  };

  // Render any loading content that you like here
  render() {
    return (
      <Loading textContent="Hold on..." />
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  password: state.auth.password,
  jwToken: state.auth.jwToken,
});

const mapDispatchToProps = dispatch => ({
  errorDispatch: payload => dispatch(auth.error(payload)),
  finish: () => dispatch(auth.finish()),
  greet: () => dispatch(auth.greet()),
  setJWToken: payload => dispatch(auth.setJWToken(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
