import React, { PureComponent } from 'react';
import {
  Button,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import auth from '../actions/auth';

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

const mapDispatchToProps = {
  ...auth,
};

export default connect(null, mapDispatchToProps)(SignOut);
