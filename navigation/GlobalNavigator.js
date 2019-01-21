import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  View,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import AppNavigator from './AppNavigator';
import styles from './styles/GlobalNavigator';

class GlobalNavigator extends Component {
  componentDidUpdate() {
    const { token } = this.props;

    if (this.navigator) {
      const action = {};

      if (token === null) {
        action.routeName = 'Auth';
      }
      else {
        action.routeName = 'Main';
      }

      this.navigator.dispatch(
        NavigationActions.navigate(action),
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator ref={(nav) => { this.navigator = nav; }} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(GlobalNavigator);
