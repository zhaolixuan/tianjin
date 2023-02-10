import fetch from '@/api/fetches.js'

const userApi = process.env.NODE_ENV === 'development' ? '/aioc-userapi' : 'aioc-userapi'

// 获取登录用户信息
export function getUserInfo() {
    return fetch('get', `${userApi}/user/getUserInfo`)
}

export function getUserMenus(params) {
    return fetch('post', `${userApi}/user/getUserMenus`, params, 'json')
}

export function getCommunityByUserId(userId) {
    return fetch('get', `${userApi}/user/getCommunityByUserId`, {
        userId
    })
}

// 查询所有的天津市河西区 片区-街道-社区 下拉裂变数据
export function getBaseCommunityInfo() {
    return fetch('get', '/yanglao-api/baseperson/baseCommunityInfo')
}

export function getOldBasePersonInfo(params) {
    return fetch('post', '/yanglao-api/oldBasePersonInfo/getOldBasePersonInfo', params, 'json')
}

export function getBaseServiceOrderInfo(params) {
    return fetch('post', '/yanglao-api/baseperson/baseServiceOrderInfo', params, 'json')
}

export function getBaseServiceOrderCountInfo(params) {
    return fetch('post', '/yanglao-api/baseperson/baseServiceOrderCountInfo', params, 'json')
}
// 获取服务机构/服务工单指标信息
export function getBaseServiceOrderPersonInfo(params) {
    return fetch('post', '/yanglao-api/oldBasePersonInfo/getServiceOrderInfo', params, 'json')
}

export function getBaseMedicalInfo(params) {
    return fetch('post', '/yanglao-api/oldBasePersonInfo/getBaseMedicalInfo', params, 'json')
}

// 获取养老服务指标信息
export function getUrgentneedInfo(params) {
    return fetch('post', '/yanglao-api/oldBasePersonInfo/getUrgentneedServiceInfo', params, 'json')
}

// 获取助餐指标信息
export function getBaseMealInfo(params) {
    return fetch('post', '/yanglao-api/oldBasePersonInfo/getBaseMealInfo', params, 'json')
}
export function getByParentId(params) {
    return fetch('get', '/yanglao-api/baseperson/getbyParentId', params, 'json')
}

// 服务商家分页列表
export function getBusinessInfoPage(params) {
    return fetch('post', '/yanglao-api/baseBusinessInfo/businessInfoPage', params, 'json')
}

export function getOperatingDay(params) {
    return fetch('post', '/yanglao-api/oldBasePersonInfo/getServiceOrderInfoToday', params, 'json')
}
// 获取河西区所有街道
export function getbyZoneCode(params) {
    return fetch('get', '/yanglao-api/baseperson/getbyZoneCode', params, 'json')
}
// 获取补贴指标信息
export function getAllowanceIndexInfo(params) {
    return fetch('post', '/yanglao-api/oldBasePersonInfo/getAllowanceIndexInfo', params, 'json')
}
// 获取河西区重点关注老年人分布
export function getBasePersonInfoNumber(params) {
    return fetch('get', '/yanglao-api/baseperson/getBasePersonInfoNumber', params, 'json')
}
// 获取重点关注老年人分布
export function getBasePersonInfoNumberEmphasis(params) {
    return fetch('get', '/yanglao-api/baseperson/getBasePersonInfoNumberEmphasis', params, 'json')
}
// 获取养老机构数据
export function getFreeOrderInfo(params) {
    return fetch('post', '/yanglao-api/freeOrderInfo/getFreeOrderInfo', params, 'json')
}

// 获取养老机构数据
export function getFreeOrderInfoSecond(params) {
    return fetch('post', '/yanglao-api/freeOrderInfo/getFreeOrderInfoSecond', params, 'json')
}


// 家庭养老床位签约情况
export function getSigningSituation(params) {
    return fetch('get', '/yanglao-api/orderFamily/serviceAnalysis/signingSituation', params, 'json')
}

// 签约人群年龄
export function getSigningPeopleAge(params) {
    return fetch('get', '/yanglao-api/orderFamily/serviceAnalysis/signingPeopleAge', params, 'json')
}

// 签约老人身体状况
export function getPhysicalCondition(params) {
    return fetch('get', '/yanglao-api/orderFamily/serviceAnalysis/physicalCondition', params, 'json')
}

// 服务商签约情况
export function getCompanySigningSituation(params) {
    return fetch('get', '/yanglao-api/orderFamily/serviceAnalysis/companySigningSituation', params, 'json')
}

// 服务量、消费金额
export function getServiceCountPrice(params) {
    return fetch('get', '/yanglao-api/orderFamily/serviceAnalysis/serviceCountPrice', params, 'json')
}

// 服务类型统计
export function getServiceType(params) {
    return fetch('get', '/yanglao-api/orderFamily/serviceAnalysis/serviceType', params, 'json')
}

// 服务项目统计分析前五
export function getServiceProject(params) {
    return fetch('get', '/yanglao-api/orderFamily/serviceAnalysis/serviceProject', params, 'json')
}

// 家庭养老床位服务记录
export function getServiceRecord(params) {
    return fetch('get', '/yanglao-api/orderFamily/serviceAnalysis/serviceRecord', params, 'json')
}

// 服务商护理人员
export function getServiceUserByCompany(params) {
    return fetch('get', '/yanglao-api/orderFamily/getServiceUserByCompany', params, 'json')
}