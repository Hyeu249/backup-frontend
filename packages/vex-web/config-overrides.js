var path = require('path');
var fs = require('fs');
const { override, babelInclude, fixBabelImports } = require('customize-cra');

module.exports = function (config, env) {
  return Object.assign(
    config,
    override(
      /*Make sure Babel compiles the stuff in the common folder*/
      babelInclude([
        path.resolve('src'), // don't forget this
        // fs.realpathSync('../../node_modules/@iso/apps'),
        fs.realpathSync('../../node_modules/@iso/components'),
        fs.realpathSync('../../node_modules/@iso/lib'),
        fs.realpathSync('../../node_modules/@iso/ui'),
        fs.realpathSync('../../node_modules/@iso/redux'),
        fs.realpathSync('../../node_modules/@iso/containers'),
        fs.realpathSync('../../node_modules/@iso/config'),
        fs.realpathSync('../../node_modules/@iso/assets'),
        fs.realpathSync('../../node_modules/@iso/vex_containers'),
        fs.realpathSync('../../node_modules/@iso/vex_redux'),
        fs.realpathSync('../../node_modules/@iso/vex_config'),
        fs.realpathSync('../../node_modules/@iso/vex_ui'),
        fs.realpathSync('../../node_modules/@iso/vex_lib'),
        fs.realpathSync('../../node_modules/@iso/vex_components'),
      ]),
      fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      })
    )(config, env)
  );
};
