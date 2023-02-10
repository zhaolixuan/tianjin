
export default {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['呼出', '成功'],
    textStyle: {
      color: '#4FD0FF'
    }
  },
  grid: {
    left: '1%',
    right: '4%',
    bottom: '3%',
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
    splitLine: {
      lineStyle: {
        color: 'rgba(79,208,255,0.4)'
      }
    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    type: 'category',
    data: ['越秀街', '友谊路', '下瓦房', '天塔', '桃园', '梅江', '马场', '尖山', '东海', '大营门', '陈塘庄'],
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
    }
  },
  series: [
    {
      name: '呼出',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'insideRight'
      },
      data: [334, 334, 301, 302, 320, 330, 390, 334, 301, 302, 320],
      itemStyle: {
        color: '#18d9fe'
      }
    },
    {
      name: '成功',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'insideRight'
      },
      data: [210, 210, 210, 119, 90, 312, 218, 123, 154, 192, 116],
      itemStyle: {
        color: '#1893fe'
      }
    }
  ]
}
