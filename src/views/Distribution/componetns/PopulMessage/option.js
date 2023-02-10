import echarts from 'echarts'

export const createBar = (name, data, color1, color2) => {
  return {
    name,
    data,
    type: 'bar',
    barWidth: 16,
    max: 100,
    itemStyle: {
      color: new echarts.graphic.LinearGradient(
        0, 0, 0, 1, [
          { offset: 0, color: color1 },
          { offset: 1, color: color2 }
        ]
      )
    }
  }
}

export const defaultOptions = {
  legend: {
    left: 'center',
    data: ['失独老人', '独居老人'],
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
        itemStr = '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-image:linear-gradient(' + item.color.colorStops[0].color + ',' + item.color.colorStops[1].color + ');"></span>' + item.seriesName + '：' + item.value + '人'
      })
      tooltipStr += itemStr
      return tooltipStr
    }
  },
  yAxis: {
    type: 'value',
    show: true,
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
    },
    minInterval: 1,
    splitNumber: 5,
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: ['rgba(14, 80, 131, 1)'],
        width: 1
      }
    }
  },
  xAxis: {
    data: [],
    type: 'category',
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
    }
  },
  series: [
    createBar('失独老人', []),
    createBar('独居老人', [])
  ]
}
