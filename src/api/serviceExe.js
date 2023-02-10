import request from '@/api/request'
import { getCookie } from '@/utils/storage'
/**
 * get 请求样例
 */
export function getRequest(params) {
    return request({
        method: `GET`,
        url: ``,
        params,
    })
}

/**
 * post 请求样例
 */
export function postRequest(data) {
    return request({
        method: `POST`,
        url: ``,
        data,
    })
}

/**
 * get 获取服务统计
 */
export function getStatisticalRecords() {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/servicePsersonal/StatisticalRecords`,
        headers: {
            gunsToken: getCookie('gunsToken'),
        },
    })
}

/**
 * get 根据具体类别服务统计
 */
export function getStatisticalRecordsByCategory(params) {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/servicePsersonal/getStatisticalRecordsByCategory`,
        headers: {
            gunsToken: getCookie('gunsToken'),
        },
        params,
    })
}

// 服务人员个人信息的接口 get
export function getServiceUserInformation() {
    return request({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/servicePsersonal/getServiceUserInformation`,
        headers: {
            gunsToken: getCookie('gunsToken'),
        },
    })
}

// 重置密码
export function reset(params) {
    return request({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/familyServiceUser/reset`,
        params,
    })
}
// 养老床位服务计划列表
export function findServicePlanList(params) {
    return request({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/familyPlanProject/findServicePlanList`,
        params,
    })
}

// 获取服务计划详情界面分类
export function familyType() {
    return request({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/orderFamily/familyType`,
    })
}
// 获取服务计划详情
export function familyPlanDetail(params) {
    return request({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/familyPlanProject/familyPlanDetail`,
        params,
    })
}

/**
 * 服务人员预约下单
 */
export function saveServiceOrder(data) {
    return request({
        method: `POST`,
        url: `${process.env.VUE_APP_API_URL}/orderFamily/saveServiceOrder`,
        headers: {
            gunsToken: getCookie('gunsToken'),
        },
        data,
    })
}

/**
 * 已预约服务列表
 */
export function searchAppointmentList(params) {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/orderFamily/searchAppointmentList`,
        params,
    })
}

/**
 * 已预约服务详情
 */
export function getAppointmentDetail(params) {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/orderFamily/getAppointmentDetail`,
        params,
    })
}

/**
 * 已预约服务-服务人员点击开始服务更新服务状态
 */
export function startService(params) {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/orderFamily/startService`,
        params,
    })
}
/**
 * 已预约服务-服务人员点击结束服务更新服务状态
 */
export function endService(params) {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/orderFamily/endService`,
        params,
    })
}

/**
 * post 上传文件
 */
export function uploadFill(data) {
    return request({
        method: `POST`,
        url: `${process.env.VUE_APP_API_URL}/orderFamily/upload`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data,
    })
}

/**
 * 已完成服务列表
 */
export function searchCompleteList(params) {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/orderFamily/searchCompleteList`,
        params,
    })
}
/**
 * 取消订单
 */
export function cancelOrder(params) {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/orderFamily/cancelOrder`,
        params,
    })
}
/**
 * 改派订单
 */
export function editOrder(params) {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/orderFamily/editOrder`,
        params,
    })
}
/**
 * post 删除文件
 */
export function deleteFill(params) {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/orderFamily/delete`,
        params,
    })
}

/**
 * 已完成服务列表
 */
export function statisticalData(params) {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/orderFamily/statisticalData`,
        params,
    })
}