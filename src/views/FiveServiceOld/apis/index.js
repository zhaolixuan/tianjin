import fetch from '@/api/fetches.js'

export function getDataStatistical (params) {
  return fetch('post', '/yanglao-api/freeOrderInfo/getServiceDataStatistical', params, 'json')
}
