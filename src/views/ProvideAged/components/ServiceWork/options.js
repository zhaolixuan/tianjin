import echarts from 'echarts'

export default {
  grid: {
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
    containLabel: true
  },
  yAxis: {
    type: 'value',
    show: false
  },
  xAxis: {
    type: 'category',
    data: [],
    nameRotate: 45,
    nameGap: 20,
    axisTick: {
      show: false,
      alignWithLabel: true
    },
    axisLabel: {
      show: true,
      interval: 0,
      color: 'rgba(123, 151, 177, 1)',
      fontSize: 12 / window.devicePixelRatio
    },
    axisLine: {
      show: false,
      color: 'rgba(255, 213, 213, 1)'
    }
  },
  series: {
    name: '近六个月订单',
    type: 'line',
    smooth: true,
    data: [200, 300, 200, 400, 700, 600, 0],
    lineStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: '#FF37FE' // 0% 处的颜色
        }, {
          offset: 1,
          color: '#FCDEFF' // 100% 处的颜色
        }],
        global: false // 缺省为 false
      },
      shadowBlur: 4,
      shadowColor: '#FFC7C7'
    },
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(248, 102, 217, 1)'
        }, {
          offset: 1,
          color: 'rgba(246, 156, 156, 0.1)'
        }])
      }
    },
    label: {
      show: true,
      position: 'top',
      color: 'rgba(201,238,255,1)'
    }
  }
}
