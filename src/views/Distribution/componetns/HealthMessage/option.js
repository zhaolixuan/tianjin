import echarts from 'echarts'

export const createHealth = (lineData, barData) => {
  return [
    {
      name: '有健康档案的',
      type: 'bar',
      yAxisIndex: 0,
      barWidth: 16,
      smooth: true,
      symbol: 'circle',
      data: barData, // [22, 10, 43, 10]
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [
            { offset: 0, color: 'rgba(11, 107, 247, 1)' },
            { offset: 1, color: 'rgba(11, 107, 247, 0.1)' }
          ]
        )
      }
    },
    {
      name: '有健康档案的',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      symbol: 'circle',
      data: lineData, // [22, 10, 43, 10],
      itemStyle: {
        normal: {
          color: 'rgba(11, 107, 247, 1)'
        }
      }
    }
  ]
}

export const createHome = (lineData, barData) => {
  return [
    {
      name: '签订家庭医生',
      type: 'bar',
      barWidth: 16,
      yAxisIndex: 0,
      smooth: true,
      symbol: 'circle',
      data: barData, // [43, 32, 12, 54],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [
            { offset: 0, color: 'rgba(94, 27, 251, 1)' },
            { offset: 1, color: 'rgba(94, 27, 251, 0.1)' }
          ]
        )
      }
    },
    {
      name: '签订家庭医生',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      symbol: 'circle',
      data: lineData, // [43, 32, 12, 54],
      itemStyle: {
        normal: {
          color: 'rgba(94, 27, 251, 1)'
        }
      }
    }
  ]
}

export const createMedical = (lineData, barData) => {
  return [
    {
      name: '享有医疗保险',
      type: 'bar',
      barWidth: 16,
      yAxisIndex: 0,
      smooth: true,
      symbol: 'circle',
      data: barData, // [53, 32, 65, 12],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [
            { offset: 0, color: 'rgba(133, 43, 246, 1)' },
            { offset: 1, color: 'rgba(133, 43, 246, 0.1)' }
          ]
        )
      }
    },
    {
      name: '享有医疗保险',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      symbol: 'circle',
      data: lineData, // [53, 32, 65, 12]
      itemStyle: {
        normal: {
          color: 'rgba(133, 43, 246, 1)'
        }
      }
    }
  ]
}

export const defaultOptions = {
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      label: {
        backgroundColor: '#283b56'
      }
    },
    formatter: function (params, data) {
      let tooltipStr = params && params[0] ? params[0].axisValueLabel + '<br/>' : ''
      let seriesName = ''
      let itemStr = ''
      params.map(item => {
        if (seriesName !== item.seriesName) {
          tooltipStr += itemStr
          seriesName = item.seriesName
          itemStr = ''
        }
        itemStr = item.seriesType === 'bar' ? ('<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-image:linear-gradient(' + item.color.colorStops[0].color + ',' + item.color.colorStops[1].color + ');"></span>' + item.seriesName + '老人：' + item.value + '人;&nbsp;&nbsp;' + itemStr) : (itemStr + '占总老人数：' + item.value + '% <br/> ')
      })
      tooltipStr += itemStr
      return tooltipStr
    }
  },
  legend: {
    data: ['有健康档案的', '签订家庭医生', '享有医疗保险'],
    itemWidth: 10,
    itemHeight: 10,
    icon: 'circle',
    textStyle: {
      color: '#C9EEFF',
      fontSize: 12 / window.devicePixelRatio,
      padding: [0, 30, 0, 10]
    }
  },
  grid: {
    top: '65',
    left: '35',
    right: '40',
    bottom: '40',
    containLabel: true
  },
  dataZoom: {
    show: false,
    start: 0,
    end: 100
  },
  xAxis: {
    type: 'category',
    boundaryGap: [0.2, 0.2],
    data: [],
    nameTextStyle: {
      color: '#0E5083',
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
    splitLine: {
      show: false
    }
  },
  yAxis: [
    {
      type: 'value',
      scale: true,
      // max: 1000,
      min: 0,
      name: '各片区医疗指标',
      boundaryGap: [0.2, 0.2],
      nameTextStyle: {
        fontSize: 12,
        color: 'rgba(123, 151, 177, 1)',
        padding: [20, 0, 0, 0]
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
      splitNumber: 5,
      splitLine: {
        show: false,
        lineStyle: {
          type: 'dashed',
          color: ['rgba(14, 80, 131, 1)'],
          width: 1
        }
      }
    },
    {
      type: 'value',
      scale: true,
      max: 100,
      min: 0,
      name: '各片区已享医疗\n数占总老人数',
      nameTextStyle: {
        color: 'rgba(123, 151, 177, 1)',
        fontSize: 12,
        padding: [20, 0, 0, 0]
      },
      boundaryGap: [0.2, 0.2],
      axisLine: {
        lineStyle: {
          color: '#0E5083'
        }
      },
      axisLabel: {
        color: '#7B97B1',
        formatter: '{value} %'
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
    }
  ],
  series: [
    ...createHealth([], []),
    ...createHome([], []),
    ...createMedical([], [])
  ]
}
