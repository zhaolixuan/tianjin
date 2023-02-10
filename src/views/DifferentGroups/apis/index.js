import fetch from '@/api/fetches.js'

export function getAmountGroupInfo (params) {
  return fetch('post', '/yanglao-api/freeOrderInfo/getConsumptionAmountGroupInfo', params, 'json')
}
