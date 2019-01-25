// Adapted from https://github.com/kristerkari/babel-plugin-react-native-platform-specific-extensions

const fs = require('fs');
const nodePath = require('path');
const babelTemplate = require('@babel/template').default;

module.exports = () => ({
  name: 'react-native-platform-specific-incremental-extensions',

  visitor: {
    ImportDeclaration: function importResolver(path, state) {
      const extensions = state.opts
          && Array.isArray(state.opts.extensions)
          && state.opts.extensions;

      if (!extensions) {
        throw new Error('You have not specified any extensions in the plugin options.');
      }

      const { node } = path;
      const baseFileName = node.source.value;
      const ext = nodePath.extname(baseFileName);

      if (!extensions.find(e => `.${e}` === ext)) {
        return;
      }

      const specifier = node.specifiers[0];

      const nativeFileName = baseFileName.replace(ext, `.native${ext}`);
      const iosFileName = baseFileName.replace(ext, `.ios${ext}`);
      const androidFileName = baseFileName.replace(ext, `.android${ext}`);
      const transformedFileName = state.file.opts.filename;
      const currentDir = nodePath.dirname(transformedFileName);

      const fileExists = filename => fs.existsSync(nodePath.resolve(currentDir, filename));

      const base = fileExists(baseFileName);
      const native = fileExists(nativeFileName);
      const ios = fileExists(iosFileName);
      const android = fileExists(androidFileName);

      if (base || native || ios || android) {
        // Omit the var assignment when specifier is empty (global import
        // case, executing for the side-effects only).
        const assignee = specifier ? `var ${specifier.local.name} = ` : '';
        const importStr = 'import { Platform } from "react-native"; import * as deepmerge from "deepmerge";';

        const baseStr = base ? `require("${baseFileName}")` : '{}';
        const nativeStr = native ? `require("${nativeFileName}")` : '{}';
        const iosStr = ios ? `require("${iosFileName}")` : '{}';
        const androidStr = android ? `require("${androidFileName}")` : '{}';

        const code = `${importStr + assignee}deepmerge.all([${baseStr},${nativeStr},Platform.select({ios:${iosStr},android:${androidStr}})]);`;
        const ast = babelTemplate.ast(code);
        path.replaceWithMultiple(ast);
      }
    },
  },
});
