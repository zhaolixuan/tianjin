import fetch from '@/api/fetches.js'

export function getCanteenNumber (params) {
  return fetch('post', '/yanglao-api/freeOrderInfo/getCanteenNumberTotal', params, 'json')
}
export function getAccesToken (params) {
  return fetch('post', '/api/lapp/token/get', params)
}
export function getVideo (params) {
  return fetch('post', '/api/lapp/live/video/list', params)
}
