export const createLegend = (legend) => {
  return {
    data: legend,
    right: 0,
    bottom: '40%',
    orient: 'vertical',
    textStyle: {
      color: '#26D9FF',
      fontSize: 16
    }
  }
}

export const createxAxis = (xAxis) => {
  return {
    type: 'category',
    boundaryGap: false,
    axisLine: {
      show: true, // 隐藏X轴轴线
      lineStyle: {
        color: '#26D9FF',
        width: 2
      }
    },
    axisTick: {
      show: true // 隐藏X轴刻度
    },
    axisLabel: {
      show: true,
      interval: 0,
      textStyle: {
        color: '#26D9FF', // X轴文字颜色
        fontSize: 16
      }
    },
    data: xAxis
  }
}
export const createLine = (line) => {
  let data = []
  if (line) {
    line.map(ite => {
      data.push({
        name: ite.merchantName,
        type: 'line',
        symbol: 'circle',
        symbolSize: 10,
        data: ite.value,
        lineStyle: {
          width: 3
        }
      })
    })
  } else {
    data = []
  }

  return data
}
export const defaultOptions = {
  tooltip: {
    trigger: 'axis'
  },
  legend: createLegend(),
  grid: {
    left: '3%',
    right: '13%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: createxAxis(),
  yAxis: {
    type: 'value',
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#26D9FF',
        width: 2
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#26D9FF',
        fontSize: 16
      }
    }
  },
  series: createLine()
}
