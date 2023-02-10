import fetch from '@/api/fetches.js';

export function getCateringerService(params) {
    return fetch('post', '/yanglao-api/healthStationInfo/getCateringerServiceToday', params, 'json')
};

// FiveService 路由 右侧第一个图用到的接口
export function getDataStatistical(params) {
    return fetch('post', '/yanglao-api/freeOrderInfo/getServiceDataStatistical', params, 'json')
};
