import fetch from '@/api/fetches.js'
export function getPersonInfo (params) {
  return fetch('post', '/yanglao-api/oldBasePersonInfo/getEveryDistributioInfo', params, 'json')
}
export function getByParentId (params) {
  return fetch('get', '/yanglao-api/baseperson/getbyParentId', params, 'json')
}
