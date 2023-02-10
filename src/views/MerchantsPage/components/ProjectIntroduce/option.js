
export default {
  grid: {
    top: 20,
    bottom: 35
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    textStyle: {
      align: 'left'
    },
    formatter: function (params, data) {
      let tooltipStr = params[0].axisValueLabel
      let seriesName = ''
      let itemStr = ''
      params.map(item => {
        if (seriesName !== item.seriesName) {
          tooltipStr += itemStr
          seriesName = item.seriesName
          itemStr = ''
        }
        itemStr = '<br/>' + item.marker + item.seriesName + '：' + item.value
      })
      tooltipStr += itemStr
      return tooltipStr
    }
  },
  legend: {
    data: ['引进项目数', '优质项目数'],
    icon: 'rect',
    itemWidth: 10,
    itemHeight: 10,
    right: '0',
    top: 0,
    textStyle: {
      color: 'rgba(123, 151, 177, 1)',
      fontSize: 12 / window.devicePixelRatio
    }
  },
  xAxis: {
    data: ['市外', '市内'],
    axisTick: {show: true},
    axisLine: {show: false},
    axisLabel: {
      show: true,
      color: 'rgba(123, 151, 177, 1)',
      interval: 0,
      fontSize: 12 / window.devicePixelRatio
    }
  },
  yAxis: {
    splitLine: {show: false},
    axisTick: {show: false},
    axisLine: {show: false},
    axisLabel: {show: false}
  },
  series: [{
    name: '引进项目数',
    type: 'pictorialBar',
    barCategoryGap: '40%',
    barGap: '-120%',
    color: 'RGBA(44, 176, 192, 1)',
    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
    label: {
      show: true,
      position: 'top'
    },
    itemStyle: {
      opacity: 0.8
    },
    emphasis: {
      itemStyle: {
        opacity: 0.8
      }
    },
    data: [123, 60],
    z: 15
  },
  {
    name: '优质项目数',
    type: 'pictorialBar',
    barCategoryGap: '40%',
    barGap: '-120%',
    color: 'RGBA(7, 102, 179, 1)',
    // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
    label: {
      show: true,
      position: 'top'
    },
    itemStyle: {
      opacity: 0.8
    },
    emphasis: {
      itemStyle: {
        opacity: 0.8
      }
    },
    data: [177, 70],
    z: 12
  }
  ]
}
