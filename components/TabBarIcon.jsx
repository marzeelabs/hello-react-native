import React from 'react';
import { Icon } from 'expo';

import style from './TabBarIcon.scss';

export default class TabBarIcon extends React.Component {
  render() {
    const {
      name,
      focused,
    } = this.props;

    const color = focused
      ? style['tab-bar__icon-text--focused'].color
      : style['tab-bar__icon-text'].color;

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
