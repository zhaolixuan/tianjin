'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // 代理表
        proxyTable: {
            '/userapi': {
                // target: 'http://116.196.89.151',
                // target: 'http://tianjin-cloud.xjoycity.com',
                target: 'http://tj-yanglao-test.xjoycity.com',
                changeOrigin: true
            },
            '/aioc-userapi': {
                // target: 'http://116.196.89.151',
                // target: 'http://tianjin-cloud.xjoycity.com',
                target: 'http://tj-yanglao-test.xjoycity.com',
                changeOrigin: true
            },
            '/yanglao-api': {
                // target: 'http://116.196.89.151:8080',
                // target: 'http://tianjin-cloud.xjoycity.com',
                target: 'http://tj-yanglao-test.xjoycity.com',
                changeOrigin: true,
            },
            '/bi': {
                target: 'http://tianjin-cloud.xjoycity.com',
                changeOrigin: true,
            },
            '/aioc-api': {
                // target: 'http://116.196.89.151',
                // target: 'http://tianjin-cloud.xjoycity.com',
                target: 'http://tj-yanglao-test.xjoycity.com',
                changeOrigin: true,
                // pathRewrite: {'^/api': ''}
            },
            '/inspection-api': {
                // target: 'http://116.196.89.151',
                target: 'http://tj-yanglao-test.xjoycity.com',
                changeOrigin: true,
            },
            '/business': {
                // target: 'http://218.69.106.195:29836',
                target: 'http://124.71.239.138:29836',
                changeOrigin: true,
            },
            '/api': {
                target: 'http://open.ys7.com',
                changeOrigin: true,
            },
            '/pension': {
                target: 'https://www.youaizhilin.com',
                changeOrigin: true
            }
        },

        // Various Dev Server settings
        // 这个项目原有的 host入下 localhost 是我自己添加的
        // host: 'dev.xjoycity.com', // can be overwritten by .process.envHOST
        host: 'dev.jdcloud.com', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: false,
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        /**
         * Source Maps
         */

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}