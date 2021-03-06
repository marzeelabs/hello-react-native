import React, { Component } from 'react';
import {
  ScrollView,
} from 'react-native';
import {
  DrawerItems,
  SafeAreaView,
} from 'react-navigation';
import { connect } from 'react-redux';

import TabBarIcon from '../../components/TabBarIcon/TabBarIcon';

import auth from '../../actions/auth';

class HomeDrawerNavigatorContent extends Component {
  onPressLogout = () => {
    const {
      logout,
    } = this.props;

    logout();
  };

  render() {
    const logoutItems = [
      {
        index: 0,
        isTransitioning: false,
        key: 'LogoutButton',
        routeName: '#LogoutButton',
        routes: [
          {
            key: 'LogoutButtonRoute',
            routeName: '#LogoutButton',
          },
        ],
      },
    ];

    return (
      <ScrollView alwaysBounceVertical={false}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...this.props} />
          <DrawerItems
            {...this.props}
            items={logoutItems}
            getLabel={() => 'Sign out'}
            onItemPress={this.onPressLogout}
            renderIcon={() => (
              <TabBarIcon
                realName="sign-out"
                collection="Octicons"
              />
            )}
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = {
  ...auth,
};

export default connect(null, mapDispatchToProps)(HomeDrawerNavigatorContent);
