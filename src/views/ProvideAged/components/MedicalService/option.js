import echarts from 'echarts'
export default {
  tooltip: {
    trigger: 'axis'
  },
  indicator: [
    {text: '品牌', max: 100},
    {text: '内容', max: 100},
    {text: '可用性', max: 100},
    {text: '功能', max: 100}
  ],
  radar: {
    indicator: [],
    radius: 70,
    center: ['40%', '50%'],
    splitNumber: 7,
    name: {
      color: 'rgba(123, 151, 177, 1)',
      lineHeight: 15,
      fontSize: 12
    },
    nameGap: 5.5,
    splitArea: {
      show: true,
      areaStyle: {
        color: ['RGBA(7, 19, 62, 1)', 'rgba(0, 91, 159, 0.5)']
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        width: 1,
        color: 'RGBA(26, 88, 146, 1)'
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: 'RGBA(26, 88, 146, 1)',
        width: 1
      }
    }
  },
  series: {
    type: 'radar',
    symbol: 'none',
    symbolSize: 20,
    tooltip: {
      trigger: 'item'
    },
    itemStyle: {
      normal: {
        areaStyle: {
          type: 'default',
          opacity: 0.59,
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [{
              offset: 0, color: 'rgba(0, 255, 255, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(10, 182, 255, 1)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        lineStyle: {
          width: 0
        }
      }
    },
    data: []
  }
}
