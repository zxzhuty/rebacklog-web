// 自定义配置，参考 ./default/setting.config.js，需要自定义的属性在这里配置即可
module.exports = {
  multiPage: true,
  hideSetting: true,
  animate: {
    //动画设置
    disabled: true, //禁用动画，true:禁用，false:启用
    name: "fade", //动画效果，支持的动画效果可参考 ./animate.config.js
    direction: "left" //动画方向，切换页面时动画的方向，参考 ./animate.config.js
  }
};
