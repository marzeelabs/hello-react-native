import { Component } from 'react';
import { connect } from 'react-redux';

import auth from '../actions/auth';
import backend from '../actions/backend';
import general from '../actions/general';

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

      getJWTokenFromStorage,
      loadingStop,
      remote,
      setJWToken,
    } = this.props;

    if (!username && !password) {
      // We may be just opening the app for the first time, see if there's an
      // access token in the device storage that we can use.
      const storedToken = await getJWTokenFromStorage();

      if (storedToken) {
        return setJWToken(storedToken);
      }
    }

    if (username && password) {
      return remote({
        path: '/jwt/token',
        auth: true,
        method: 'POST',
        body: {
          name: username,
          pass: password,
        },
      })
        .then((responseJson) => {
          if (responseJson !== false) {
            setJWToken(responseJson.token);
          }
        });
    }

    return loadingStop();
  };

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  password: state.auth.password,
});

const actionCreators = {
  ...auth,
  ...backend,
  ...general,
};

export default connect(mapStateToProps, actionCreators)(AuthLoadingScreen);
