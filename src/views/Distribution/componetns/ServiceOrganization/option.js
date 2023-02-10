import echarts from 'echarts'

export default {
  animation: false,
  title: {
    left: 'center'
  },
  legend: {
    data: ['养老中心', '日间照料中心'],
    left: 'center',
    icon: 'rect',
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: '#C9EEFF',
      fontSize: 12 / window.devicePixelRatio,
      padding: [0, 40, 0, 5]
    }
  },
  tooltip: {
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
        itemStr = '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-image:linear-gradient(' + item.color.colorStops[0].color + ',' + item.color.colorStops[1].color + ');"></span>' + item.seriesName + '：' + item.value + '家'
      })
      tooltipStr += itemStr
      return tooltipStr
    }
  },
  grid: {
    top: '50',
    left: '56',
    right: '70',
    bottom: '40',
    containLabel: true
  },
  xAxis: {
    data: [],
    type: 'category',
    boundaryGap: false,
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
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    nameTextStyle: {
      fontSize: 12
    },
    axisLine: {
      lineStyle: {
        color: '#0E5083'
      }
    },
    axisTick: {
      show: false,
      inside: false
    },
    axisLabel: {
      color: '#7B97B1',
      inside: false
    },
    itemWidth: 10,
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: ['rgba(14, 80, 131, 1)'],
        width: 1
      }
    }
  },
  dataZoom: [{
    type: 'inside',
    throttle: 50
  }],
  series: [
    {
      name: '养老中心',
      type: 'line',
      smooth: false,
      symbol: 'none',
      symbolSize: 5,
      sampling: 'average',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(19, 225, 229, 1)'
            },
            {
              offset: 1,
              color: 'rgba(19, 225, 229, 0.1)'
            }
          ])
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(19, 225, 229, 1)'
            },
            {
              offset: 1,
              color: 'rgba(19, 225, 229, 0.1)'
            }
          ])
        }
      },
      data: [],
      z: 10
    },
    {
      name: '日间照料中心',
      type: 'line',
      smooth: false,
      symbol: 'none',
      symbolSize: 5,
      sampling: 'average',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(63, 110, 255, 1)'
          },
          {
            offset: 1,
            color: 'rgba(63, 110, 255, 0.1)'
          }
          ])
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(63, 110, 255, 1)'
          },
          {
            offset: 1,
            color: 'rgba(63, 110, 255, 0.1)'
          }
          ])
        }
      },
      data: [],
      z: 10
    }
  ]
}
