import fetch from '@/api/fetches.js'

export function getOldPersonInfo (params) {
  return fetch('post', '/yanglao-api/basePersonSecond/getOldPersonInfo', params, 'json')
}
export function getOldPersonInfoThird (params) {
  return fetch('post', '/yanglao-api/basePersonSecond/getOldPersonInfoThird', params, 'json')
}
export function getOldPersonInfoSecond (params) {
  return fetch('post', '/yanglao-api/basePersonSecond/getOldPersonInfoSecond', params, 'json')
}
