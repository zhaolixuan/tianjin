const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");
module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL + "/",
  configureWebpack: (config) => {
    Object.assign(config, {
      resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@c": path.resolve(__dirname, "./src/components"),
          "@a": path.resolve(__dirname, "./src/assets"),
        },
      },
      externals: {
        echarts: "echarts",
        "v-charts": "VeIndex",
        "AMap": "AMap",
      },
    });
  },
  chainWebpack(config) {
    config.plugin("compressionPlugin").use(
      new CompressionPlugin({
        algorithm: "gzip",
        test: /\.js$|\.html$|.\css/, // 匹配文件名
        threshold: 30720, // 对超过10k的数据压缩
        minRatio: 0.8,
        deleteOriginalAssets: false, // 不删除源文件
      })
    );
  },
  devServer: {
    // host:'',
    port: 8080,
    open: true,
    proxy: {
      [process.env.VUE_APP_API_URL]: {
        target: "https://tj-yanglao-test.xjoycity.com",
        changeOrigin: true,
        headers: {
          Origin: "https://tj-yanglao-test.xjoycity.com",
        },

        // pathRewrite: { '^${process.env.VUE_APP_API_URL}': '' }
      },
      
      "/user-api": {
        target: "http://tj-yanglao-test.xjoycity.com/aioc-userapi",
        changeOrigin: true,
        headers: {
          Origin: "http://tj-yanglao-test.xjoycity.com/aioc-userapi",
        },
        pathRewrite: { "^/user-api": "" },
      },
    },
  },

  css: {
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    requireModuleExtension: true,
  },
};
