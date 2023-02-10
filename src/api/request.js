/**
 * 请求模块
 */
import axios from 'axios'
// import router from '@/router/'
import JSONbig from 'json-bigint'
// import { MessageBox } from "@/components/message/main.js";
import { MessageBox, Message } from 'element-ui'
import { Toast } from 'vant'
import { logOut } from '@/utils/domain.js'

const request = axios.create({
    // baseURL: process.env.VUE_APP_API_PERFIX,
    timeout: 20000,
    withCredentials: true,
    transformResponse: [
        function (data) {
            try {
                return JSONbig.parse(data)
            } catch (err) {
                return data
            }
        },
    ],
})

// 请求拦截器
request.interceptors.request.use(
    function (config) {
        if (config.method === 'get') {
            config.data = true
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        if (response.data.code === 401) {
            redirectLogin()
            return Promise.resolve(new Error('您还未登录'))
        }
        if (response.data.code == 500) {
            return Message.error(response.data.message)
        }
        return response.data
    },
    (error) => {
        Toast.clear()
        Toast.fail('服务器异常')
        return Promise.resolve(error)
    }
)

function redirectLogin () {
    MessageBox.alert('您还未登录，确认请登录', '提示', {
        type: 'warning',
        showClose: false,
        callback: () => {
            logOut()
        },
    })
}

// 导出
export default request
