import echarts from 'echarts'
export default {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: '1%',
    right: '4%',
    bottom: '1%',
    top: 10,
    containLabel: true
  },
  xAxis: {
    type: 'value',
    axisLabel: {
      color: '#4FD0FF'
    },
    axisLine: {
      lineStyle: {
        color: '#4FD0FF'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(79,208,255,0.4)'
      }
    }
  },
  yAxis: {
    type: 'category',
    axisLabel: {
      color: '#4FD0FF'
    },
    axisLine: {
      lineStyle: {
        color: '#4FD0FF'
      }
    },
    axisTick: {
      show: false
    },
    data: ['社区康复管理', '健康宣教', '用药指导', '血糖测量', '血压测量']
  },
  series: [
    {
      name: '服务次数',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'insideRight'
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 1, 0, [
              { offset: 0, color: 'rgba(24,135,254,1)' },
              { offset: 1, color: 'rgba(24,231,254,1)' }
            ]
          )
        }
      },
      data: [320, 302, 301, 334, 390]
    },
    {
      name: '服务人数',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'insideRight'
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 1, 0, [
              { offset: 0, color: 'rgba(24,135,254,1)' },
              { offset: 1, color: 'rgba(24,231,254,1)' }
            ]
          )
        }
      },
      data: [320, 302, 301, 334, 390]
    }
  ]
}
