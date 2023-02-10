import echarts from 'echarts'

const createGenderPie = function (center, ratio, startColor, endColor) {
  return {
    name: '性别占比',
    type: 'pie',
    center: center,
    radius: ['20%', '27%'],
    hoverOffset: 0,
    avoidLabelOverlap: false,
    data: [{
      value: ratio,
      name: `${ratio}%`,
      label: {
        normal: {
          show: true,
          position: 'center',
          color: 'rgba(201,238,255,1)'
        }
      },
      emphasis: {
        label: {
          show: true
        }
      },
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: startColor },
            { offset: 1, color: endColor }
          ],
          global: false
        }
      }
    }, {
      value: 100 - ratio,
      name: `${100 - ratio}%`,
      label: {
        normal: {
          show: false,
          position: 'center'
        }
      },
      itemStyle: {
        color: '#223159'
      }
    }]
  }
}

export const createGenderRatio = function (maleRatio, famaleRatio) {
  return [
    createGenderPie(['15%', '25%'], maleRatio, 'rgba(164, 234, 255, 1)', 'rgba(0, 171, 245, 1)'),
    createGenderPie(['60%', '25%'], famaleRatio, 'rgba(252, 200, 233, 1)', 'rgba(250, 107, 163, 1)')
  ]
}

export const createBar = function (maleData, famaleData) {
  return [{
    name: '人口分布',
    type: 'bar',
    barWidth: '11',
    legendHoverLink: false,
    data: maleData,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 1, 0,
          [
            { offset: 0, color: 'rgba(7, 180, 255, 1)' },
            { offset: 1, color: 'rgba(164, 234, 255, 0)' }
          ]
        )
      }
    },
    label: {
      show: true,
      position: 'inside',
      color: 'rgba(201,238,255,1)',
      offset: [-10, 1]
    }
  }, {
    name: '人口分布',
    type: 'bar',
    xAxisIndex: 1,
    yAxisIndex: 1,
    barWidth: '11',
    legendHoverLink: false,
    data: famaleData,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 1, 0,
          [
            { offset: 0, color: 'rgba(252, 200, 233, 0)' },
            { offset: 1, color: 'rgba(255, 75, 146, 1)' }
          ]
        )
      }
    },
    label: {
      show: true,
      position: 'inside',
      color: 'rgba(201,238,255,1)',
      offset: [10, 1]
    }
  }]
}

const createTitle = function (text, top, left) {
  return {
    show: true,
    text: text,
    top,
    left,
    textStyle: {
      color: 'rgba(201,238,255,1)',
      fontSize: 12
    }
  }
}

export const createTitles = function () {
  return [
    createTitle('男性', '20%', '22%'),
    createTitle('女性', '20%', '67%')
  ]
}

export const defaultOptions = {
  title: createTitles(0, 0),
  grid: [{
    top: '50%',
    left: 12,
    width: '37%',
    height: '50%',
    containLabel: true
  }, {
    top: '50%',
    left: '40%',
    width: '56%',
    height: '50%',
    containLabel: true
  }],
  xAxis: [{
    type: 'value',
    show: false,
    inverse: true
  }, {
    type: 'value',
    show: false,
    gridIndex: 1
  }],
  yAxis: [{
    type: 'category',
    inverse: true,
    data: ['60-69(含)周岁', '70-79(含)周岁', '80-89(含)周岁', '90(含)周岁以上'],
    axisLabel: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    }
  }, {
    type: 'category',
    gridIndex: 1,
    inverse: true,
    data: ['60-69(含)周岁', '70-79(含)周岁', '80-89(含)周岁', '90(含)周岁以上'],
    axisTick: {
      alignWithLabel: true
    },
    axisLabel: {
      show: true,
      interval: 0,
      color: 'rgba(123, 151, 177, 1)',
      fontSize: 12
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    }
  }],
  series: [
    ...createBar([0, 0, 0, 0], [0, 0, 0, 0]),
    ...createGenderRatio(0, 0)
  ]
}
