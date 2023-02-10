
export const creatBar = (serviceData, moneyData) => {
  return [
    {
      name: '消费人群服务商分布',
      type: 'bar',
      data: serviceData,
      barMaxWidth: 40,
      label: {
        show: true,
        fontSize: 16
      },
      itemStyle: {
        color: '#1887FE'
      }
    },
    // {
    //   name: '消费金额',
    //   type: 'bar',
    //   data: moneyData,
    //   barMaxWidth: 40,
    //   label: {
    //     show: true,
    //     fontSize: 16
    //   },
    //   itemStyle: {
    //     color: 'RGBA(43, 177, 193, 1)'
    //   }
    // }
  ]
}

export const creatYaxis = (yData) => {
  return {
    type: 'category',
    // yData 街道名组成的数组
    data: yData,
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
}

export const creatXaxis = (xData)=>{
  return {
    type: 'category',
    data: xData,
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
}

export const defaultOptions = {
  // 工具提示
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  // 图列
  legend: {
    selected: {
      '服务量': true, '消费金额': false
    },
    textStyle: {
      color: '#26D9FF'
    }
  },
  // echart图形布局
  grid: {
    left: '1%',
    right: '2%',
    bottom: '40%',
    containLabel: true
  },
  // X 轴配置项
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01],
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
    splitLine: {
      show: false,
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
  // 默认 Y 轴的值 为 creatYaxis() 方法传入数组
  yAxis: creatYaxis([]),
  // 默认的 series 为 展开 调用 本js文件中 creatBar方法 得到的数据 当前传递的为 两个 空数组
  // echarts 中的 series 中的 每一项都是 对象
  series: [
    ...creatBar([], [])
  ]
}
