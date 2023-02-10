import echarts from 'echarts'
export default {
  grid: {
    top: 10,
    left: 0,
    right: '20%',
    bottom: '13%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: [],
    axisTick: {
      alignWithLabel: true,
      show: false
    },
    axisLabel: {
      show: true,
      interval: 0,
      color: 'rgba(79,208,255,0.78)',
      fontSize: 12 / window.devicePixelRatio
    },
    axisLine: {
      show: false
    }
  },
  yAxis: {
    show: false
  },
  series: {
    name: '消费',
    type: 'bar',
    barWidth: '30',
    barCategoryGap: '18%',
    legendHoverLink: false,
    data: [],
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [
            { offset: 0, color: 'rgba(24,231,254,1)' },
            { offset: 1, color: 'rgba(24,135,254,1)' }
          ]
        )
      }
    },
    label: {
      show: true,
      position: 'top',
      color: '#ffffff',
      formatter: '{c}'
    }
  }
}
