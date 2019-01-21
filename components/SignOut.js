import React, { PureComponent } from 'react';
import {
  Button,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { actionLogout } from '../actions/auth';

class SignOut extends PureComponent {
  onPress = () => {
    const {
      logout,
    } = this.props;

    logout();
  };

  render() {
    return (
      <View>
        <Button
          onPress={ this.onPress }
          title="Logout"
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actionLogout()),
});

export default connect(null, mapDispatchToProps)(SignOut);
