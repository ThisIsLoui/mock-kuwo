/* eslint-disable no-undef */
module.exports = {
  /* 继承已有的规则 */
  extends: [
    'stylelint-config-standard-scss', // SCSS、CSS 标准配置规则
    'stylelint-config-html/vue', // 配置 vue 中 style 样式格式化
    'stylelint-config-html/html', // 配置 html 中 style 样式格式化
    'stylelint-config-recess-order', // 配置css属性书写顺序插件,
  ],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    /* 允许深度选择器 */
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'],
      },
    ],
    /* 允许style标签里为空 */
    'no-empty-source': null,
    'no-descending-specificity': null,
  },
  ignoreFiles: ['dist/**/*'],
}
