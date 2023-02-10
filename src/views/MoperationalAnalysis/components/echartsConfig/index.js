/* eslint-disable */
let xAxis = {
  type: 'category',
  boundaryGap: true,
  data: ['zhouyi', 'zhouer', 'zhousan', 'zhousi'],
  axisTick: {
    show: false
  },
  axisLine: {
    show: false,
    lineStyle: {
      color: "#999FC0"
    }
  },
  axisLabel: {
    interval: 0
  }
}
// 'axis'
// 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
let tooltip = {
  trigger: 'axis',
  backgroundColor: '#fff',
  extraCssText: 'box-shadow: 0 5px 18px rgba(227, 228, 229, 1)',
  axisPointer: {
    type: 'shadow',
    shadowStyle: {
      color: 'rgba(247, 249, 255, .4)'
    }
  },
  textStyle: {
    color: '#141D54'
  }
}
// 'item'
// 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
let tooltipItem = {
  trigger: 'item',
  backgroundColor: '#fff',
  extraCssText: 'box-shadow: 0 5px 18px rgba(227, 228, 229, 1)',
  axisPointer: {
    type: 'shadow',
    shadowStyle: {
      color: 'rgba(247, 249, 255, .4)'
    }
  },
  textStyle: {
    color: '#141D54'
  }
}
let yAxis = {
  type: 'value',
  axisTick: {
    show: false
  },
  axisLine: {
    show: false,
    lineStyle: {
      color: "#999FC0"
    }
  },
  boundaryGap: false,
  splitLine: {
    show: true,
    lineStyle:{
      type: "dashed",
      color: '#EDF0FD'
    }
  }
}
let dataZoom = [{
  backgroundColor: 'rgb(236, 239, 253, .5)',
  fillerColor: 'rgb(216, 221, 253, .5)',
  show: true,
  start: 0,
  end: 100,
  height: 11
}]
let colors = ['#4B66FE', '#EE6C65', '#00DCF0', '#997EFF', '#FF6BB1', '#3BC0FF', '#FFC932', '#34D3AA', '#FF8A46', '#49517F', '#7F93FF', '#3BBD93', '#72A03F', '#1884D1', '#596EC2', '#9C50C2', '#BA8950', '#C5529A', '#C16161', '#667BF7']
let wordDcloudColors = ['#4B66FE', '#A2AFFB', '#EE6C65', '#F3B2AF', '#00DCF0', '#95EDF5', '#997EFF', '#C9BBFC', '#FF6BB1', '#FCB2D5', '#3BC0FF', '#9ADCFC', '#FFC932', '#FCE195', '#34D3AA', '#96E6D1', '#FF8A46', '#FCC19F', '#49517F', '#A1A5BC']
export {
  xAxis,
  yAxis,
  dataZoom,
  wordDcloudColors,
  colors,
  tooltip,
  tooltipItem
}