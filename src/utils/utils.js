// 获取时间
export function formatTime(date) {
  let formatData = ''
  if (date) {
    let month = (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1))
    let day = (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
    formatData = date.getFullYear() + '-' + month + '-' + day
  }
  return formatData
}

// 获取数据得某一项
export function returnData(Data, parameter, newDt) {
  let newData = []
  newData = Data ? Data.map(item => item[parameter] || newDt) : []
  return newData
}

// 数据排序
export function arrSort(key, sort) {
  return (a, b) => {
    var vala = a[key]
    var valb = b[key]
    return sort ? vala - valb : valb - vala
  }
}

// 计算日期之间的差值
export function getDaysBetween(dateString1, dateString2) {
  var startDate = Date.parse(dateString1)
  var endDate = Date.parse(dateString2)
  var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000)
  // alert(days);
  return days
}

// 12月20日新增 封装本地存储
export const setLocalItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value);
}

// 12月20日新增 封装本地读取
export const getLocalItem = (name, value) => {
  const data = window.localStorage.getItem(name);
  try {
    return JSON.parse(data)
  } catch (error) {
    return data;
  }
}

// 12月20日新增 本地删除
export const removeLocalItem = (name) => {
  window.localStorage.removeItem(name);
}

// 获取 url 指定的参数值
export const getQueryVariable = (variable) => {
  if (window.location.href.indexOf('?') == -1) {
    return (false);
  }
  var query = window.location.href.split('?')[1]
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}
