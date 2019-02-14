import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  View,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import FlashMessage from 'react-native-flash-message';

import AppNavigator from '../AppNavigator';
import Loading from '../../components/Loading/Loading';

import styles from './GlobalNavigator.scss';

class GlobalNavigator extends Component {
  state = {
    lastError: 0,
  };

  componentDidMount() {
    this.checkForError();
  }

  componentDidUpdate() {
    const {
      authenticating,
      jwToken,
    } = this.props;

    if (this.navigator) {
      const action = {};

      if (authenticating) {
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

    this.checkForError();
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

  render() {
    const {
      loading,
    } = this.props;

    return (
      <View style={styles['global-navigator__container']}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator ref={(nav) => { this.navigator = nav; }} />
        <Loading
          textContent="Hold on..."
          visible={loading}
        />
        <FlashMessage ref={(ref) => { this.flashMessage = ref; }} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authenticating: state.general.authenticating,
  error: state.general.error,
  jwToken: state.auth.jwToken,
  loading: state.general.loading,
});

export default connect(mapStateToProps)(GlobalNavigator);
