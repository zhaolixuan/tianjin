import echarts from 'echarts'
export default {
  grid: {
    top: 0,
    left: 0,
    right: 30,
    bottom: '30',
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
      fontSize: 12 / window.devicePixelRatio
    },
    axisLine: {
      show: false
    }
  },
  series: [
    {
      type: 'bar',
      barGap: '-100%',
      barCategoryGap: '45%',
      animation: false,
      data: [],
      z: -1,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 1, 0, [
              { offset: 0, color: 'RGBA(27, 24, 66, 1)' },
              { offset: 1, color: 'RGBA(60, 41, 49, 1)' }
            ]
          )
        }
      }
    },
    {
      name: '教育程度',
      type: 'bar',
      data: [],
      z: 1,
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
        type: 'value',
        show: true,
        position: 'right',
        color: 'rgba(201,238,255,1)',
        formatter: function (param) {
          param.data += ' 项'
          return param.data
        }
      }
    }
  ]
}
