import React from 'react';
import { Icon } from 'expo';

import style from './TabBarIcon.scss';
import variables from '../scss/variables';

export default class TabBarIcon extends React.Component {
  render() {
    const {
      name,
      focused,
    } = this.props;

    const color = focused
      ? variables['js-constant__brand--blue'].color
      : variables['js-constant__grey--high-light'].color;

    return (
      <Icon.Ionicons
        name={name}
        size={26}
        style={style['tab-bar__icon']}
        color={color}
      />
    );
  }
}
