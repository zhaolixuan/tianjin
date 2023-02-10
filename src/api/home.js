import request from '@/api/request'
import { getCookie } from '@/utils/storage'

/**
 * get 请求样例
 */
export const getRequest = (params) => {
    return request({
        method: `GET`,
        url: ``,
        params,
    })
}

/**
 * post 请求样例
 */
export const postRequest = (data) => {
    return request({
        method: `POST`,
        url: ``,
        data,
    })
}

/**
 * post 1、登录接口
 */
export const Login = (data) => {
    return request({
        method: `POST`,
        url: `${process.env.VUE_APP_USER_API}/user/login`,
        data,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    })
}

/**
 * GET 2.获取验证码
 */
export const Getkaptcha = (params) => {
    return request({
        method: `GET`,
        // url: `${process.env.VUE_APP_USER_API}/child/kaptcha`,
        url: `${process.env.VUE_APP_API_URL}/appLogin/getPhoneCode`,
        params,
    })
}

/**
 * POST 2.登录接口
 */
export const LoginKaptcha = (data) => {
    return request({
        method: `POST`,
        url: `${process.env.VUE_APP_USER_API}/child/loginKaptchaApp`,
        // url: `${process.env.VUE_APP_USER_API}/child/login_kaptcha`,
        data,
    })
}

/**
 * GET 2.登录接口
 */
export const LoginKsh = (data) => {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_USER_API}/user/getUserInfo`,
        data,
    })
}


/**
 * POST 2.绑定
 * createUser 姓名
 * phone  绑定手机号
 * idcardNumber  身份证号码
 * pensionCardNumber  养老卡号
 */
export const AppBind = (data) => {
    return request({
        method: `POST`,
        url: `${process.env.VUE_APP_API_URL}/appLogin/AppBind`,
        data,
    })
}

/**
 * POST 2.解除绑定
 * phone  绑定手机号
 */
export const removeBinding = (data) => {
    return request({
        method: `POST`,
        url: `${process.env.VUE_APP_API_URL}/appLogin/removeBinding`,
        data,
    })
}


/**
 * POST 2.获取老人信息
 * createUser 姓名
 * phone  绑定手机号
 * idcardNumber  身份证号码
 * pensionCardNumber  养老卡号
 */
export const getPeopleInfomation = (data) => {
    return request({
        method: `POST`,
        url: `${process.env.VUE_APP_API_URL}/appLogin/getPeopleInfomation`,
        data,
    })
}

/* 
  get  查询余额
*/
export const getBalancePrice = (params) => {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/appLogin/getBalancePrice`,
        params,
    })
}





/* 
  get  地址列表
*/
export const getAddressList = (params) => {
        return request({
            method: `GET`,
            url: `${process.env.VUE_APP_API_URL}/pensionOccupyHome/getUserByIdCard`,
            params,
        })
    }
    /* 
      post 添加收货地址信息
    */

export const saveUserAddress = (data) => {
    return request({
        method: `POST`,
        url: `${process.env.VUE_APP_API_URL}/pensionOccupyHome/saveUserAddress`,
        data,
    })
}

/* 
  post 查询收货地址信息
*/

export const getUserAddress = (params) => {
    return request({
        method: `get`,
        url: `${process.env.VUE_APP_API_URL}/pensionOccupyHome/getUserAddress`,
        params,
    })
}

/* 
  post 修改收货地址信息
*/

export const updateUserAddress = (data) => {
    return request({
        method: `POST`,
        url: `${process.env.VUE_APP_API_URL}/pensionOccupyHome/updateUserAddress`,
        data,
    })
}

/* 
  post 删除收货地址信息
*/

export const deleteUserAddress = (data) => {
        return request({
            method: `POST`,
            url: `${process.env.VUE_APP_API_URL}/pensionOccupyHome/deleteUserAddress`,
            data,
        })
    }
    /* 


    /* 
      get 2 获取资讯列表接口
      Consult.vue 组件也使用到了
    */
export const getConsultList = (params) => {
    return request({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/article/list`,
        params,
    })
}

/* 
  get 3 根据文章id获取详情
*/
export const getArticleDetalisByarticleId = (params) => {
    return request({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/article/detail`,
        params,
    })
}

// get 获取活动列表
export const getActiveList = (params) => {
    return request({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/active/list`,
        params,
    })
}

// get 根据 id 获取活动详情
export const getActiveDetails = (params) => {
    return request({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/active/detail`,
        params,
    })
}

// 收藏列表
// 字段1 idCard=>老年人身份证号 字段2 type=> 0(商品) / 1(活动)
// 所以此处 type 1
export const conllectionListActivity = (params) => {
    return request({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/mealsServiceProjectCollection/conllectionList`,
        params,
    })
}

// 收藏保存 POST
// 字段1 "serviceMealsId":"服务中心id", 字段2 "createTime":"创建时间",
// 字段3 "idCard":"老人身份证号"  字段4  "type":"0”  // (0-商品 1-活动)
export const conllectionAddItemActivity = (data) => {
    return request({
        method: 'POST',
        url: `${process.env.VUE_APP_API_URL}/mealsServiceProjectCollection/addItem`,
        data,
    })
}

// 删除收藏
// 字段1 type 0(商品) / 1(活动); 字段2 idCard 老年人身份证号;
// 字段3 serviceMealsId 活动收藏id
export const conllectionDeleteItemActivity = (params) => {
    return request({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/mealsServiceProjectCollection/delete`,
        params,
    })
}

// post 保存活动预约
export const addActiveAddItem = (data) => {
    return request({
        method: 'POST',
        url: `${process.env.VUE_APP_API_URL}/active/addItem`,
        data,
    })
}

// get 查询接口地址
export const getQueryResultList = (params) => {
    return request({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/servicePsersonal/getQueryResultList`,
        params,
        headers: {
            gunsToken: getCookie('gunsToken'),
        },
    })
}


// get 查询接口地址
export const deleteQueryHistoryList = () => {
    return request({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/servicePsersonal/deleteQueryHistoryList`,
        headers: {
            gunsToken: getCookie('gunsToken'),
        },
    })
}



// get 获取附近养老中心列表接口地址
export const getVicinalServiceList = (params) => {
    return request({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/elderlyCareCenter/getVicinalServiceList`,
        params,
    })
}

// get 服务中心详情页
export const getVicinalServiceDetail = (params) => {
    return request({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/elderlyCareCenter/getVicinalServiceDetail`,
        params,
    })
}

// get 查看全部活动
export const getBasePersonByCard = (params) => {
    return request({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/baseperson/getBasePersonByCard`,
        params,
    })
}

/**
 * post 上传文件
 */
export function uploadAvatar(data) {
    return request({
        method: `POST`,
        url: `${process.env.VUE_APP_API_URL}/baseperson/uploadAvatar`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data,
    })
}

// get 搜索历史
export const getQueryHistoryList = () => {
    return request({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/servicePsersonal/QueryHistoryList`,
        headers: {
            gunsToken: getCookie('gunsToken'),
        },
    })
}

// 轮播图 get
export function getSlideshow(params) {
    return request({
        metod: 'GET',
        url: `${process.env.VUE_APP_API_URL}/slideshow/getSlideshow`,
        params,
    })
}

// post 意见反馈提交
export const feedbackInfoadd = (data) => {
    return request({
        method: 'POST',
        url: `${process.env.VUE_APP_API_URL}/feedbackInfo/add`,
        data,
    })
}

/**
 * post 上传文件
 */
export function feedbackInfoupload(data) {
    return request({
        method: `POST`,
        url: `${process.env.VUE_APP_API_URL}/feedbackInfo/upload`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data,
    })
}

// 我的收藏 get
export function myList(params) {
    return request({
        metod: 'GET',
        url: `${process.env.VUE_APP_API_URL}/active/myList`,
        params,
    })
}