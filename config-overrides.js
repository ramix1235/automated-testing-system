/*
 * Default theme see at https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
 */

const {
  override,
  fixBabelImports,
  addLessLoader
} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),
);