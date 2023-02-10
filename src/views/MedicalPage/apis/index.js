import fetch from '@/api/fetches.js'

export function getCateringerService (params) {
  return fetch('post', '/yanglao-api/healthStationInfo/getCateringerServiceToday', params, 'json')
}

export function getHealthStation (params) {
  return fetch('post', '/yanglao-api/healthStationInfo/getHealthStation', params, 'json')
}
