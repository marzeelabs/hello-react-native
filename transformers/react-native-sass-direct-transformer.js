/* eslint-disable import/no-extraneous-dependencies */

// Adapted from https://github.com/kristerkari/react-native-sass-transformer

const appRoot = require('app-root-path');
const css2rn = require('css-to-react-native-transform').default;
const path = require('path');
const sass = require('node-sass');
const upstreamTransformer = require('metro/src/reactNativeTransformer');

module.exports.transform = (src, filename, options) => {
  if (typeof src === 'object') {
    // handle RN >= 0.46
    ({ src, filename, options } = src);
  }

  if (filename.endsWith('.scss')) {
    const dirname = path.dirname(filename);

    const defaultOpts = {
      includePaths: [ dirname, appRoot ],
      indentedSyntax: false,
    };

    const data = [ src ];

    // Initialize sass variables and functions in all our scss files without
    // having to explicitely do so in every one of them.
    data.unshift('@import \'scss/init\';');

    const opts = Object.assign(
      {},
      defaultOpts,
      options.sassOptions || {},
      {
        data: data.join('\n'),
      },
    );

    const result = sass.renderSync(opts);
    const css = result.css.toString();
    const cssObject = css2rn(css, { parseMediaQueries: true });

    return upstreamTransformer.transform({
      src: `module.exports = ${JSON.stringify(cssObject)}`,
      filename,
      options,
    });
  }

  return upstreamTransformer.transform({ src, filename, options });
};
