/** axios封装 */
import axios from 'axios'
import { getCookie } from '@/api/cookie.js';
import { getLocalItem } from '@/utils/utils.js';

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = ''
}

// 请求超时时间
axios.defaults.timeout = 60000

// 允许携带cookie
axios.defaults.withCredentials = true

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.gunsToken = getLocalItem('gunsToken') ? getLocalItem('gunsToken') : getCookie('gunsToken')
// 从App.vue文件中从url获取到的authSSO值给到headers中的aioc字段
if (getLocalItem('authSSO')) {
  axios.defaults.headers.aioc = getLocalItem('authSSO');
}

export default axios
