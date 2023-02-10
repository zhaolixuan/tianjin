
export default {
  legend: {
    left: 'center',
    data: ['领取补贴老人'],
    icon: 'rect',
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: '#C9EEFF',
      fontSize: 12 / window.devicePixelRatio,
      padding: [0, 40, 0, 5]
    }
  },
  grid: {
    top: '50',
    left: '56',
    right: '56',
    bottom: '40',
    containLabel: true
  },
  tooltip: {
    show: true,
    trigger: 'axis',
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
        itemStr = '<br/>' + item.marker + item.seriesName + '：' + item.value + '人'
      })
      tooltipStr += itemStr
      return tooltipStr
    }
  },
  xAxis: {
    data: [],
    type: 'category',
    nameTextStyle: {
      fontSize: 12 / window.devicePixelRatio
    },
    axisLine: {
      lineStyle: {
        color: '#0E5083'
      }
    },
    axisLabel: {
      color: '#7B97B1'

    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    show: true,
    nameTextStyle: {
      fontSize: 12
    },
    axisLine: {
      lineStyle: {
        color: '#0E5083'
      }
    },
    axisLabel: {
      color: '#7B97B1'
    },
    axisTick: {
      show: false
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: ['rgba(14, 80, 131, 1)'],
        width: 1
      }
    }
  },
  series: [
    {
      name: '领取补贴老人',
      type: 'pictorialBar',
      barWidth: 130,
      barCategoryGap: '-130%',
      // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
      symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
      // max: 100,
      data: [],
      itemStyle: {
        color: 'rgba(57, 219, 237, 1)'
      }
    }

  ]
}
