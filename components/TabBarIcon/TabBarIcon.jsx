import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'expo';

import style from './TabBarIcon.scss';

export default class TabBarIcon extends React.Component {
  render() {
    const {
      collection,
      focused,
      name,
      realName,
    } = this.props;

    const color = focused
      ? style['tab-bar__icon-text--focused'].color
      : style['tab-bar__icon-text'].color;

    const CollectionIcon = Icon[collection || 'Ionicons'];

    return (
      <CollectionIcon
        {...this.props}
        name={ realName || `${Platform.OS === 'ios' ? 'ios' : 'md'}-${name}` }
        size={26}
        style={style['tab-bar__icon']}
        color={color}
      />
    );
  }
}
