import fetch from '@/api/fetches.js'

export function getDataStatistical (params) {
  return fetch('post', '/yanglao-api/freeOrderInfo/getServiceDataStatistical', params, 'json')
}
export function getServiceDataStatisticalSecond (params) {
  return fetch('post', '/yanglao-api/freeOrderInfo/getServiceDataStatisticalSecond', params, 'json')
}
