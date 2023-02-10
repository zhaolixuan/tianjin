// export default {
//   legend: {
//     orient: 'vertical',
//     right: '20%',
//     y: 'center',
//     itemWidth: 15,
//     borderRadius: 0,
//     data: [],
//     textStyle: {
//       color: 'rgba(201,238,255,1)',
//       fontSize: 12,
//       padding: [0, 0, 0, 10]
//     }
//   },
//   series: {
//     name: '访问来源',
//     type: 'pie',
//     center: ['30%', '50%'],
//     radius: ['45%', '65%'],
//     avoidLabelOverlap: false,
//     hoverOffset: 1,
//     label: {
//       normal: {
//         show: false
//       }
//     },
//     labelLine: {
//       normal: {
//         show: false
//       }
//     },
//     itemStyle: {
//       borderWidth: 5,
//       borderColor: '#07143f'
//     },
//     data: []
//   }
// }

export default function createOptions () {
  return {
    legend: {
      orient: 'vertical',
      right: '20%',
      y: 'center',
      itemWidth: 15 / window.devicePixelRatio,
      borderRadius: 0,
      data: [],
      textStyle: {
        color: 'rgba(201,238,255,1)',
        fontSize: 12 / window.devicePixelRatio,
        padding: [0, 0, 0, 10]
      }
    },
    series: {
      name: '访问来源',
      type: 'pie',
      center: ['30%', '50%'],
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
}
