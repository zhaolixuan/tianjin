import fetch from '@/api/fetches.js'

export function getHelpMealsInfo (params) {
  return fetch('post', '/yanglao-api/basePersonSecond/getHelpMealsInfo ', params, 'json')
}
export function getMealsInfoSecond (params) {
  return fetch('post', '/yanglao-api/basePersonSecond/getHelpMealsInfoSecond', params, 'json')
}
export function getHelpMealsInfoThree (params) {
  return fetch('post', '/yanglao-api/basePersonSecond/getHelpMealsInfoThree', params, 'json')
}
