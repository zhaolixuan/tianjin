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
    type: 'value',
    show: false
  },
  yAxis: {
    type: 'category',
    data: ['不识字', '小学', '初中', '高中/中专', '大专及以上'],
    axisTick: {
      alignWithLabel: true
    },
    axisLabel: {
      show: true,
      interval: 0,
      color: 'rgba(123, 151, 177, 1)'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    }
  },
  series: {
    name: '教育程度',
    type: 'bar',
    barWidth: '14',
    barCategoryGap: '15%',
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
