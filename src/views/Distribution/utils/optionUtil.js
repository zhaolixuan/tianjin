export const mergeObject = (originObj, obj) => Object.assign({}, originObj, obj)

export const getMinIntervalByData = (dataArr) => {
  const maxData = dataArr.length > 1 ? dataArr.reduce((a, b) => a > b ? a : b) : dataArr.length === 1 ? dataArr[0] : 0
  const average = Math.floor(maxData / 5)
  const averageArr = average.toString().split('')
  const isZero = averageArr.find(item => item === '0')

  if (isZero) {
    return average
  } else {
    let baseNumber = averageArr[0]
    let unit = '1'
    let zeroLen = averageArr.length - 1

    if (averageArr.length > 1 && averageArr[1] >= 5) {
      zeroLen -= 1
      baseNumber = averageArr.slice(0, 2).join('')
    }
    while (zeroLen > 0) {
      unit += '0'
      zeroLen -= 1
    }
    unit = parseInt(unit)

    return (parseInt(baseNumber) + 1) * unit
  }
}
export const getMinInterval = (dataArr) => {
  const maxData = dataArr.length > 1 ? dataArr.reduce((a, b) => a > b ? a : b) : dataArr.length === 1 ? dataArr[0] : 0
  const average = Math.floor(maxData / 5)
  const averageStr = average.toString()
  let interval = parseInt(averageStr.slice(0, 1).padEnd(averageStr.length, '0')) + parseInt('1'.padEnd(averageStr.length, '0'))
  return {
    interval: interval,
    max: interval * 5
  }
}
