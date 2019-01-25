// eslint-disable-next-line import/no-extraneous-dependencies
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('./transformers/react-native-sass-direct-transformer.js'),
    },
    resolver: {
      sourceExts: [ ...sourceExts, 'jsx', 'scss' ],
    },
  };
})();
