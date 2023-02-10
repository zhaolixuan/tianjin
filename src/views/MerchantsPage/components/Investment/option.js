import echarts from 'echarts'

export default {
  grid: {
    top: 10,
    left: 10,
    right: '20%',
    bottom: 40,
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
      show: false,
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
    type: 'bar',
    barWidth: '15',
    barCategoryGap: -1,
    legendHoverLink: false,
    data: [87, 7, 4],
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
      color: 'rgba(201,238,255,1)',
      formatter: function (params) {
        return params.value + '亿元'
      }
    }
  }
}
