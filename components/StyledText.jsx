/* eslint-disable import/prefer-default-export */

import React from 'react';
import { Text } from 'react-native';

export class MonoText extends React.Component {
  render() {
    const { style } = this.props;

    return <Text {...this.props} style={[ style, { fontFamily: 'space-mono' } ]} />;
  }
}
