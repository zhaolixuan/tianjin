import fetch from '@/api/fetches.js'

export function getCarrierOperationInfoOne (params) {
  return fetch('post', '/yanglao-api/freeOrderInfo/getCarrierOperationInfoOne', params, 'json')
}

export function getCarrierOperationInfoTwo (params) {
  return fetch('post', '/yanglao-api/freeOrderInfo/getCarrierOperationInfoTwo', params, 'json')
}
