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
    modifyVars: {
      '@font-family': "-apple-system, BlinkMacSystemFont, 'Century Gothic', 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
      '@primary-color': '#1DA57A',
      '@text-color': '#828282',
      '@heading-color': '#1DA57A',
      '@border-color-split': '#828282',
      '@icon-color': '#282c34',
      '@body-background': '#282c34',
      '@component-background': '#202228',

      '@item-active-bg': '#16171b',
      '@menu-item-color': '#828282',
      '@menu-highlight-color': '#1DA57A',

      '@card-head-color': '#1DA57A',
      '@card-actions-background': '#16171b',

      'select-item-selected-bg': '#16171b'
    },
  }),
);