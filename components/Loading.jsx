import React, { Component } from 'react';
import {
  StatusBar,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './Loading.scss';

export default class Loading extends Component {
  render() {
    const {
      textContent,
      visible,
    } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <View style={styles.loading__container}>
        <View>
          <Spinner
            visible
            textContent={textContent || 'Hold on...'}
            size="large"
            color={styles.loading__spinner.color}
            overlayColor={styles['loading__spinner-overlay'].color}
            textStyle={styles.loading__spinner}
          />
          <StatusBar barStyle="default" />
        </View>
      </View>
    );
  }
}
