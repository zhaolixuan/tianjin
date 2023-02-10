import fetch from '@/api/fetches.js'

export function getSmartDevicesEquipmentService (params) {
  return fetch('post', '/yanglao-api/deviceopenSecond/getSmartDevicesEquipmentService', params, 'json')
}
export function getSmartDevicesEquipmentServiceSecond (params) {
  return fetch('post', '/yanglao-api/deviceopenSecond/getSmartDevicesEquipmentServiceSecond', params, 'json')
}
export function getAlarmPopoverInfo (params) {
  return fetch('post', '/yanglao-api/deviceopenSecond/alarmPopoverInfo', params, 'json')
}
export function getRemindersService (params) {
  return fetch('post', '/yanglao-api/deviceopenSecond/remindersService', params, 'json')
}
