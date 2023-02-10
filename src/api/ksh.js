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


//  服务量、金额
export const serviceCountAndPrice = (params) => {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL_MOBULE}/orderFamily/serviceCountAndPrice`,
        params,
        headers: {
            gunstoken: getCookie('gunsToken'),
        },
    })
}


//  服务类别统计
export const serviceType = (params) => {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL_MOBULE}/orderFamily/serviceType`,
        params,
        headers: {
            gunstoken: getCookie('gunsToken'),
        },
    })
}


//  服务项目统计
export const serviceProject = (params) => {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL_MOBULE}/orderFamily/serviceProject`,
        params,
        headers: {
            gunstoken: getCookie('gunsToken'),
        },
    })
}


// 服务商服务情况排名
export const serviceCompanyNameRanking = (params) => {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL_MOBULE}/orderFamily/serviceCompanyNameRanking`,
        params,
        headers: {
            gunstoken: getCookie('gunsToken'),
        },
    })
}

// 服务载体服务情况排名
export const serviceMealsInfoNameRanking = (params) => {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL_MOBULE}/orderFamily/serviceMealsInfoNameRanking`,
        params,
        headers: {
            gunstoken: getCookie('gunsToken'),
        },
    })
}


// 服务情况趋势图
export const serviceConditionTendency = (params) => {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL_MOBULE}/orderFamily/serviceConditionTendency`,
        params,
        headers: {
            gunstoken: getCookie('gunsToken'),
        },
    })
}

// 服务商字典
export const serviceCompanyNameDict = (params) => {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL_MOBULE}/baseMealsInfo/companyNameDict`,
        params,
        headers: {
            gunstoken: getCookie('gunsToken'),
        },
    })
}

// 服务载体级别字典
export const serviceMealsInfoDict = (params) => {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL_MOBULE}/baseMealsInfo/mealsInfoDict`,
        params,
        headers: {
            gunstoken: getCookie('gunsToken'),
        },
    })
}
// 服务商下属服务载体
export const servicecompanyChildMealsInfoDict = (params) => {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL_MOBULE}/baseMealsInfo/companyChildMealsInfoDict`,
        params,
        headers: {
            gunstoken: getCookie('gunsToken'),
        },
    })
}
