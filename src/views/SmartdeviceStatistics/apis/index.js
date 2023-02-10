import fetch from '@/api/fetches.js'

export function getDevicesService (params) {
  return fetch('post', '/yanglao-api/deviceopenSecond/getSmartDevicesService', params, 'json')
}
