import React, { PureComponent } from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { changeSavedValue } from '../actions';
import styles from './styles/TestPlaque';

class TestPlaque extends PureComponent {
  onPress = () => {
    const {
      change,
      savedValue,
    } = this.props;

    change(savedValue !== 'Yay!' ? 'Yay!' : 'Foo');
  };

  render() {
    const { savedValue } = this.props;

    return (
      <View>
        <Text style={styles.testPlaque}>
          { `Current saved valued: ${savedValue}` }
        </Text>

        <Button
          onPress={ this.onPress }
          title="Toggle"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  savedValue: state.savedValue,
});

const mapDispatchToProps = dispatch => ({
  change: value => dispatch(changeSavedValue(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TestPlaque);
