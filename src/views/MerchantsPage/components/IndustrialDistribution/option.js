import echarts from 'echarts'

export default {
  grid: {
    top: 20,
    left: '-20',
    right: '0%',
    bottom: '0',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    show: true,
    data: [],
    axisTick: {
      show: true,
      alignWithLabel: true
    },
    axisLabel: {
      show: true,
      interval: 0,
      color: 'rgba(123, 151, 177, 1)',
      fontSize: 12 / window.devicePixelRatio,
      lineHeight: 15
    },
    axisLine: {
      show: false
    }
  },
  yAxis: {
    show: false
  },
  series: {
    name: '',
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
