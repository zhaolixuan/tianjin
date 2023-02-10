'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_URL: '"http://116.196.89.151/"'
  API_URL: '"http://tj-yanglao-test.xjoycity.com"',
  IS_LOGIN:false
})
