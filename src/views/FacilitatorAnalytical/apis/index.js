import fetch from '@/api/fetches.js'

export function getServiceProvide (params) {
  return fetch('post', '/yanglao-api/freeOrderInfo/getServiceProvideOperationInfo', params, 'json')
}
