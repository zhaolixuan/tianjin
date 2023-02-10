import fetch from '@/api/fetches.js'

export function getHomeBaseInfoOne (params) {
  return fetch('post', '/yanglao-api/freeOrderInfo/getHomeBaseInfoOne', params, 'json')
}
