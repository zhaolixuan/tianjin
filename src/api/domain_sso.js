/** sso跳转登录页域名配置文件 */
let domain = ''

if (process.env.NODE_ENV === 'development') {
  domain = 'http://tianjin-cloud.xjoycity.com'
  // domain = 'http://tj-yanglao-test.xjoycity.com'
} else if (process.env.NODE_ENV === 'production') {
  // domain = 'http://10.0.7.126'
  domain = ''
}

export default domain
