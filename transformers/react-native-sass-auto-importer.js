// This is not working, we need to manually import the scss files in the
// component for now... :(

const fs = require('fs');
const nodePath = require('path');
const babelTemplate = require('@babel/template').default;

module.exports = () => ({
  name: 'react-native-sass-auto-importer',

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

      if (extensions.indexOf(ext) === -1) {
        return;
      }

      const scssFileName = ext ? baseFileName.replace(ext, '.scss') : `${baseFileName}.scss`;
      const transformedFileName = state.file.opts.filename;
      const currentDir = nodePath.dirname(transformedFileName);

      const fileExists = filename => fs.existsSync(nodePath.resolve(currentDir, filename));

      if (fileExists(scssFileName)) {
        const code = `import "./${scssFileName}";`;
        const ast = babelTemplate.ast(code);
        path.insertBefore(ast);
      }
    },
  },
});
