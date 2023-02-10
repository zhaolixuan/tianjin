import echarts from 'echarts'

export const createBar = (serData, max, flag) => {
  return {
    name: '教育程度',
    type: 'bar',
    barWidth: max,
    barCategoryGap: -1,
    legendHoverLink: false,
    data: serData,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 1, 0, [
            { offset: 0, color: 'rgba(24,135,254,1)' },
            { offset: 1, color: 'rgba(24,231,254,1)' }
          ]
        )
      }
    },
    label: {
      show: flag,
      position: 'right',
      color: 'rgba(201,238,255,1)'
    }
  }
}

export const createYaxis = (yData) => {
  return {
    type: 'category',
    data: yData,
    axisTick: {
      alignWithLabel: true
    },
    axisLabel: {
      show: true,
      interval: 0,
      align: 'right',
      color: 'rgba(79,208,255,0.78)',
      lineHeight: 15,
      fontSize: 14
    },
    axisLine: {
      show: false
    }
  }
}

export const defaultOptions = {
  grid: {
    top: 10,
    left: 0,
    right: '15%',
    bottom: '15%',
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
  yAxis: createYaxis([]),
  series: createBar([], '20', false)
}
