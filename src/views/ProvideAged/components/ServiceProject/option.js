export default {
  legend: {
    orient: 'vertical',
    left: '40%',
    top: 'center',
    y: 'center',
    itemWidth: 15,
    borderRadius: 0,
    data: [],
    nameTextStyle: {
      align: 'left'
    },
    textStyle: {
      color: 'RGBA(43, 177, 193, 1)',
      fontSize: 12,
      padding: [0, 0, 0, 20]
    }
  },
  series: {
    name: '访问来源',
    type: 'pie',
    center: ['20%', '50%'],
    radius: ['45%', '65%'],
    avoidLabelOverlap: false,
    hoverOffset: 1,
    label: {
      normal: {
        show: false
      }
    },
    labelLine: {
      normal: {
        show: false
      }
    },
    itemStyle: {
      borderWidth: 5,
      borderColor: '#07143f'
    },
    data: []
  }
}
