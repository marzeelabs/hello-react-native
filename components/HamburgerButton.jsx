import React, { Component } from 'react';

import HeaderIcon from './HeaderIcon/HeaderIcon';

export default class HamburgerButton extends Component {
  onPress = () => {
    const { navigation } = this.props;

    navigation.toggleDrawer();
  }

  render() {
    return (
      <HeaderIcon
        name="menu"
        onPress={this.onPress}
      />
    );
  }
}
