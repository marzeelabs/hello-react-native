import React from 'react';
import { Icon } from 'expo';

import styles from '../scss/variables';

export default class TabBarIcon extends React.Component {
  render() {
    const {
      name,
      focused,
    } = this.props;

    return (
      <Icon.Ionicons
        name={name}
        size={26}
        style={{ marginBottom: -3 }}
        color={focused
          ? styles['js-constant__brand--blue'].color
          : styles['js-constant__grey--high-light'].color}
      />
    );
  }
}
