import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  View,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import AppNavigator from './AppNavigator';

import styles from './GlobalNavigator.scss';

class GlobalNavigator extends Component {
  componentDidUpdate() {
    const {
      loading,
      jwToken,
    } = this.props;

    if (this.navigator) {
      const action = {};

      if (loading) {
        action.routeName = 'AuthLoading';
      }
      else if (!jwToken) {
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
      <View style={styles['global-navigator__container']}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator ref={(nav) => { this.navigator = nav; }} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  jwToken: state.auth.jwToken,
});

export default connect(mapStateToProps)(GlobalNavigator);
