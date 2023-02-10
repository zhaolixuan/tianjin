import echarts from 'echarts'

export default{
  legend: {
    left: 'center',
    data: ['订餐时间'],
    icon: 'rect',
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: '#C9EEFF',
      fontSize: 12 / window.devicePixelRatio,
      padding: [0, 10, 0, 0]
    }
  },
  grid: {
    top: '50',
    left: '0',
    right: '0',
    bottom: '0',
    containLabel: true
  },
  xAxis: {
    data: [],
    type: 'category',
    nameTextStyle: {
      fontSize: 12 / window.devicePixelRatio
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#0E5083'
      }
    },
    axisLabel: {
      color: '#7B97B1'
    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    show: false,
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  series:
    {
      type: 'pictorialBar',
      barWidth: 130,
      barCategoryGap: '-130%',
      symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
      data: [],
      color: 'rgba(57, 219, 237, 1)',
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'rgba(201,238,255,1)'
            }
          }
        }
      }
    }

}
