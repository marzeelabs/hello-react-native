import React from 'react';
import { Icon } from 'expo';

import './TabBarIcon.scss';
import styles from '../scss/variables';

export default class TabBarIcon extends React.Component {
  render() {
    const {
      name,
      focused,
    } = this.props;

    const color = focused
      ? styles['js-constant__brand--blue'].color
      : styles['js-constant__grey--high-light'].color;

    return (
      <Icon.Ionicons
        name={name}
        size={26}
        styleName="tab-bar__icon"
        color={color}
      />
    );
  }
}
