import React from 'react';
import {
  Platform,
  Text,
} from 'react-native';

const defaultFontFamily = {
  ...Platform.select({
    android: { fontFamily: 'Roboto' },
  }),
};

const oldRender = Text.render;
Text.render = function defaultFontTextRender(...args) {
  const origin = oldRender.call(this, ...args);
  return React.cloneElement(origin, {
    style: [ defaultFontFamily, origin.props.style ],
  });
};
