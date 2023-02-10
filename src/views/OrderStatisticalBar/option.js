import echarts from 'echarts'

export const createLine = (serviceData, moneyData) => {
  return [
    {
      name: '服务量',
      type: 'bar',
      barWidth: 45,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(61,126,235, 1)'
          },
          {
            offset: 1,
            color: 'rgba(61,126,235, 0)'
          }
          ]),
          borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(160,196,225, 1)'
          },
          {
            offset: 1,
            color: 'rgba(61,126,235, 1)'
          }
          ]),
          borderWidth: 2
        }
      },
      label: {
        show: true,
        position: 'top',
        color: '#fff',
        fontSize: 16
      },
      data: serviceData
    },
    {
      name: '消费金额',
      type: 'line',
      yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
      // smooth: true, // 平滑曲线显示
      showAllSymbol: true, // 显示所有图形。
      symbol: 'circle', // 标记的图形为实心圆
      symbolSize: 8, // 标记的大小
      itemStyle: {
        // 折线拐点标志的样式
        color: '#4FD0FF',
        borderColor: 'rgba(0, 255, 255, 1)',
        width: 2,
        shadowColor: '#3D7EEB',
        shadowBlur: 4
      },
      lineStyle: {
        color: 'RGBA(43, 177, 193, 1)',
        width: 2,
        shadowColor: '#3D7EEB',
        shadowBlur: 4
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(0, 255, 255, 1)'
        },
        {
          offset: 1,
          color: 'rgba(61,126,235, 0)'
        }
        ])
      },
      label: {
        show: true,
        position: [-10, -50],
        color: '#4FD0FF',
        fontSize: 16
      },
      data: moneyData
    }
  ]
}

export const createZoom = (max) => {
  return {
    type: 'slider',
    show: false,
    realtime: true,
    bottom: 120,
    height: 10,
    start: 0,
    end: max,
    showDetail: false,
    textStyle: {
      color: '#26D9FF',
      fontSize: 16
    }
  }
}

export const createXais = (xData) => {
  return {
    data: xData,
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
    }
  }
}

export const defaultOptions = {
  grid: {
    top: '10%',
    bottom: '21%',
    left: '5%',
    right: '5%'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      label: {
        show: true
      }
    }
  },
  legend: {
    selected: {
      '服务量': true, '消费金额': false
    },
    textStyle: {
      color: '#26D9FF',
      fontSize: 16
    }
  },
  xAxis: createXais([]),
  dataZoom: createZoom(100),
  yAxis: [{
    type: 'value',
    name: '服务量',
    nameTextStyle: {
      color: '#26D9FF',
      fontSize: 16
    },
    position: 'left',
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
  {
    type: 'value',
    name: '消费金额',
    nameTextStyle: {
      color: '26D9FF',
      fontSize: 16
    },
    position: 'right',
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
  }
  ],
  series: [
    ...createLine([0, 0, 0, 0, 0, 0])
  ]
}
