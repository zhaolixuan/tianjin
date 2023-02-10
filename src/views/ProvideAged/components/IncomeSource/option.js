import echarts from 'echarts'

export default {
  grid: {
    top: 20,
    left: 0,
    right: '20%',
    bottom: '3%',
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
      color: 'rgba(123, 151, 177, 1)',
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
    name: '收入',
    type: 'bar',
    barWidth: '15',
    barCategoryGap: '15%',
    legendHoverLink: false,
    data: [],
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255, 111, 111, 1)' },
            { offset: 1, color: 'rgba(75, 0, 255, 0)' }
          ]
        )
      }
    },
    label: {
      show: true,
      position: 'top',
      color: '#C9EEFF'
    }
  }
}
