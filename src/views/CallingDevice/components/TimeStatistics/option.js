
export const createBar = (name, data, color) => {
  return {
    name,
    data,
    type: 'bar',
    barWidth: 16,
    max: 100,
    itemStyle: {
      color: color
    }
  }
}

export const defaultOptions = {
  legend: {
    left: 'center',
    data: ['呼入', '呼出'],
    icon: 'rect',
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: '#C9EEFF',
      fontSize: 12 / window.devicePixelRatio,
      padding: [0, 40, 0, 5]
    }
  },
  grid: {
    top: '50',
    left: '3%',
    right: '3%',
    bottom: '40',
    containLabel: true
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'line' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  yAxis: {
    type: 'value',
    show: true,
    nameTextStyle: {
      fontSize: 12
    },
    axisLine: {
      lineStyle: {
        color: '#4FD0FF'
      }
    },
    axisLabel: {
      color: '#4FD0FF'
    },
    axisTick: {
      show: false
    },
    minInterval: 1,
    splitNumber: 5,
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: ['rgba(14, 80, 131, 1)'],
        width: 1
      }
    }
  },
  xAxis: {
    data: [],
    type: 'category',
    nameTextStyle: {
      fontSize: 12 / window.devicePixelRatio
    },
    axisLine: {
      lineStyle: {
        color: '#4FD0FF'
      }
    },
    axisLabel: {
      color: '#4FD0FF'

    },
    axisTick: {
      show: false
    }
  },
  series: [
    createBar('呼入', []),
    createBar('呼出', [])
  ]
}
