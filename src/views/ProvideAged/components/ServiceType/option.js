import echarts from 'echarts'

export default {
  grid: {
    top: 20,
    left: 0,
    right: '27%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    show: false,
    nameRotate: 45,
    nameGap: 20,
    nameTextStyle: {
      linHeight: 20
    },
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: 'category',
    data: [],
    axisTick: {
      alignWithLabel: true
    },
    axisLabel: {
      show: true,
      interval: 0,
      align: 'right',
      color: 'rgba(123, 151, 177, 1)',
      lineHeight: 15,
      fontSize: 12
    },
    axisLine: {
      show: false
    }
  },
  series: {
    name: '教育程度',
    type: 'bar',
    barWidth: '15',
    barCategoryGap: -1,
    legendHoverLink: false,
    data: [],
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 1, 0, [
            { offset: 0, color: 'rgba(255,62,198,0)' },
            { offset: 1, color: 'rgba(255,130,50, 1)' }
          ]
        )
      }
    },
    label: {
      show: true,
      position: 'right',
      color: 'rgba(201,238,255,1)'
    }
  }
}
