import request from '@/api/request'
import {
    getCookie
} from '@/utils/storage'

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
 * POST 适老化列表
 */
export const getSlhList = (params) => {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/tjAdaptOldModify/list`,
        params,
        headers: {

        },
    })
}

/**
 * POST 适老化详情
 */
export const getSlhDetail = (params) => {
        return request({
            method: `GET`,
            url: `${process.env.VUE_APP_API_URL}/tjAdaptOldModify/detail`,
            params,
            headers: {

            },
        })
    }
    /**
     * POST 适老化详情社保清单
     */
export const getSlhDetailedList = (params) => {
        return request({
            method: `GET`,
            url: `${process.env.VUE_APP_API_URL}/tjAdaptOldModifyDeviceprojectList/list`,
            params,
            headers: {

            },
        })
    }
    /**
     * POST 适老化详情修改
     */
export const getSlhDetailedEditItem = (params) => {
        return request({
            method: `PUT`,
            url: `${process.env.VUE_APP_API_URL}/tjAdaptOldModify/editItem`,
            params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        })
    }
    /**
     * POST 适老化添加
     */
export const getSlhDetailedAddItem = (params) => {
        return request({
            method: `POST`,
            url: `${process.env.VUE_APP_API_URL}/tjAdaptOldModify/addItem`,
            params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        })
    }
    /**
     * POST 适老化设备清单
     */
export const getSlhProjectList = (params) => {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/tjAdaptOldModify/project/list`,
        params,
        headers: {

        },
    })
}


/**
 * GET 查询街道
 */
export const getSlhSelectstreetList = (params) => {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/tjAdaptOldModify/selectstreet`,
        params,
        headers: {

        },
    })
}

/**
 * GET 查询社区
 */
export const getSlhCommunityList = (params) => {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/tjAdaptOldModify/selectcommunity`,
        params,
        headers: {

        },
    })
}

/**
 * POST 适老化照片添加
 */
export const setSlhAddItem = (params) => {
        return request({
            method: `POST`,
            url: `${process.env.VUE_APP_API_URL}/tjAdaptOldModifyPhotograph/addItem`,
            params,
            headers: {

            },
        })
    }
    /**
     * POST 适老化照片列表
     */
export const getSlhPhotoList = (params) => {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/tjAdaptOldModifyPhotograph/list`,
        params,
        headers: {

        },
    })
}

/**
 * post 设备清单新增
 */
export function deviceprojectList(data) {
    return request({
        method: `POST`,
        url: `${process.env.VUE_APP_API_URL}/tjAdaptOldModifyDeviceprojectList/batchAddItem`,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        data,
    })
}

/**
 * post 上传文件
 */
export function uploadFill(data) {
    return request({
        method: `POST`,
        url: `${process.env.VUE_APP_API_URL}/tjAdaptOldModifyPhotograph/upload`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data,
    })
}
/**
 * post 删除图片
 */
export function deleteFill(data) {
    return request({
        method: `POST`,
        url: `${process.env.VUE_APP_API_URL}/tjAdaptOldModifyPhotograph/delete`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data,
    })
}
// 我的收藏 get
export function myList(params) {
    return request({
        metod: 'GET',
        url: '/${process.env.VUE_APP_API_URL}/active/myList',
        params,
    })
}