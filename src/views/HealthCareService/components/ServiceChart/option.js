
export default {
  tooltip: {
    trigger: 'item',
    // 项目中提示用的这个配置
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  series: {
    name: '',
    type: 'pie',
    radius: ['50%', '70%'],
    center: ['50%', '55%'],
    avoidLabelOverlap: true,
    // minAngle: 5,
    hoverOffset: 1,
    label: {
      formatter: '',
      borderWidth: 50,
      borderRadius: 4,
      padding: [0, -120],
      color: '#4FD0FF',
      fontSize: 14,
      rich: {
        a: {
          color: '#fff',
          lineHeight: 22,
          align: 'center'
        },
        c: {
          color: '#fff',
          lineHeight: 22,
          align: 'center'
        },
        hr: {
          borderColor: '#4FD0FF',
          width: '100%',
          borderWidth: 0.5,
          height: 0
        },
        b: {
          lineHeight: 10,
          fontSize: 14,
          color: '#4FD0FF'

        },
        d: {
          color: '#fff',
          fontSize: 13
        }
      }
    },
    labelLine: {
      length: 6,
      length2: 140,
      lineStyle: {
        color: '#192b44',
        width: 2
      }
    },
    data: []
  }
}
