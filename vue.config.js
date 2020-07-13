const path = require("path");
const ThemeColorReplacer = require("webpack-theme-color-replacer");
const { getThemeColors, modifyVars } = require("./src/utils/themeUtil");
const { resolveCss } = require("./src/utils/theme-color-replacer-extend");

module.exports = {
  lintOnSave: false,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/theme/theme.less")]
    }
  },
  configureWebpack: config => {
    config.entry.app = ["babel-polyfill", "whatwg-fetch", "./src/main.ts"];
    config.plugins.push(
      new ThemeColorReplacer({
        fileName: "css/theme-colors-[contenthash:8].css",
        matchColors: getThemeColors(),
        resolveCss
      })
    );
  },
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title= 'Re-Backlog'
      return args
    })
    // 生产环境下关闭css压缩的 colormin 项，因为此项优化与主题色替换功能冲突
    if (process.env.NODE_ENV === "production") {
      config.plugin("optimize-css").tap(args => {
        args[0].cssnanoOptions.preset[1].colormin = false;
        return args;
      });
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: modifyVars(),
          javascriptEnabled: true
        }
      }
    }
  },
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/dologin": {
        target: "https://localhost:4000",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/dologin": "/connect/token"
        }
      },
      "/api": {
        target: "https://localhost:5000",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    },
    port: 5001,
    https: false
  }
};
