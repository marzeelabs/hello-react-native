import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'expo';

import styles from './HeaderIcon.scss';

export default class HeaderIcon extends React.Component {
  render() {
    const {
      collection,
      name,
      realName,
    } = this.props;

    const CollectionIcon = Icon[collection || 'Ionicons'];

    return (
      <CollectionIcon
        {...this.props}
        name={ realName || `${Platform.OS === 'ios' ? 'ios' : 'md'}-${name}` }
        size={36}
        style={styles.header__icon}
      />
    );
  }
}
