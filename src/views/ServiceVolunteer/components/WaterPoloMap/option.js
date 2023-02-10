
export default {
  graphic: [{
    type: 'group',
    bottom: 0
  }],
  series: {
    type: 'liquidFill',
    radius: '80%',
    center: ['50%', '50%'],
    data: [0.5],
    color: ['rgba(0, 122, 255, 1)'],
    outline: {
      itemStyle: {
        borderWidth: 2,
        borderColor: 'rgba(0, 122, 255, 1)'
      }
    },
    backgroundStyle: {
      color: 'RGBA(5, 38, 91, 1)',
      opcity: 0.3
    },
    label: {
      normal: {
        formatter: 0.5 * 100 + '%\n完成率',
        textStyle: {
          fontSize: 12,
          color: 'rgba(0, 122, 255, 1)'
        }
      }
    }
  }
}
