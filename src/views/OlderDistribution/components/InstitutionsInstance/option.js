import echarts from 'echarts'
export default {
  grid: {
    top: 10,
    height: '82%',
    left: '15%',
    right: 23
  },
  animation: false,
  title: {
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    // formatter 提示框浮层内容格式器
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
        itemStr = '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-image:linear-gradient(' + item.color.colorStops[0].color + ',' + item.color.colorStops[1].color + ');"></span>' + item.name + '：' + item.value
      })
      tooltipStr += itemStr
      return tooltipStr
    }
  },
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    type: 'category',
    boundaryGap: false,
    nameTextStyle: {
      fontSize: 12 / window.devicePixelRatio
    },
    axisLine: {
      lineStyle: {
        color: '#80B5FF'
      }
    },
    axisLabel: {
      color: 'rgba(79,208,255,0.78)',
      interval: 0
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
        color: 'rgba(128,181,255,0.25)'
      }
    },
    axisTick: {
      show: false,
      inside: false
    },
    axisLabel: {
      color: 'rgba(79,208,255,0.78)',
      inside: false
    },
    itemWidth: 10,
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: ['rgba(128,181,255,0.25)'],
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
      type: 'line',
      smooth: false,
      symbol: 'none',
      symbolSize: 3,
      sampling: 'average',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255,85,0,1)'
            },
            {
              offset: 1,
              color: 'rgba(255,85,0,1)'
            }
          ])
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255,85,0,0.5)'
            },
            {
              offset: 1,
              color: 'rgba(255,85,0, 0.01)'
            }
          ])
        }
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      z: 10
    }
  ]
}
