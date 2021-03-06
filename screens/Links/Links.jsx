import React from 'react';
import {
  ScrollView,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import styles from './Links.scss';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <ScrollView style={styles.links__container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <ExpoLinksView />
      </ScrollView>
    );
  }
}
