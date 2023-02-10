import fetch from '@/api/fetches.js'

export function getCateringerServiceToday (params) {
  return fetch('post', '/yanglao-api/freeOrderInfo/getCateringerServiceToday', params, 'json')
}

export function getServiceFreeOrderPage (params) {
  return fetch('post', 'yanglao-api/freeOrderInfo/serviceFreeOrderPage', params, 'json')
}
export function getCaterServiceToday (params) {
  return fetch('post', '/yanglao-api/freeOrderInfo/getCaterServiceToday', params, 'json')
}
export function getfindControlUnitPage (params) {
  return fetch('post', '/artemis-web/api/common/v1/userAuthRestService/getUserByUsername', params, 'json')
}
export function getCaterServiceTodayTwo (params) {
  return fetch('post', '/yanglao-api/freeOrderInfo/getCaterServiceTodayTwo', params, 'json')
}
