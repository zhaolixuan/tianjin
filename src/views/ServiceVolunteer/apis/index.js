import fetch from '@/api/fetches.js'

export function getVolunteerServiceInfo (params) {
  return fetch('post', '/yanglao-api/deviceopenSecond/getVolunteerServiceInfo', params, 'json')
}
