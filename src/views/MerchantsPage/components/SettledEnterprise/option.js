// import echarts from 'echarts'

export default{
  legend: [
    {
      orient: 'horizontal',
      left: '0%',
      y: '78%',
      icon: 'rect',
      itemWidth: 10 / window.devicePixelRatio,
      itemHeight: 10 / window.devicePixelRatio,
      borderRadius: 0,
      data: [],
      textStyle: {
        color: 'rgba(201,238,255,1)',
        fontSize: 12 / window.devicePixelRatio,
        padding: [0, 0, 0, 8]
      }
    }, {
      orient: 'horizontal',
      left: '53%',
      y: '78%',
      icon: 'rect',
      itemWidth: 10 / window.devicePixelRatio,
      itemHeight: 10 / window.devicePixelRatio,
      borderRadius: 0,
      data: [],
      textStyle: {
        color: 'rgba(201,238,255,1)',
        fontSize: 12 / window.devicePixelRatio,
        padding: [0, 0, 0, 8]
      }
    }
  ],
  series: [
    {
      type: 'pie',
      center: ['20%', '43%'],
      radius: ['40%', '60%'],
      avoidLabelOverlap: false,
      hoverOffset: 1,
      label: {
        normal: {
          show: false,
          position: 'center'
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
      data: [
      //   {
      //     name: '国有32%',
      //     value: 30,
      //     itemStyle: {
      //       color: new echarts.graphic.LinearGradient(
      //         1, 0, 0, 1, [
      //           {offset: 0, color: '#DF98FF'},
      //           {offset: 1, color: '#B500FF'}
      //         ]
      //       ),
      //       global: false
      //     }
      //   },
      //   {
      //     name: '民营68%',
      //     value: 70,
      //     itemStyle: {
      //       color: new echarts.graphic.LinearGradient(
      //         1, 0, 0, 1, [
      //           {offset: 0, color: 'rgba(164,234,255,1)'},
      //           {offset: 1, color: 'rgba(0,134,245,1)'}
      //         ]
      //       ),
      //       global: false
      //     }
      //   }
      ]
    }, {
      type: 'pie',
      center: ['77%', '43%'],
      radius: ['40%', '60%'],
      avoidLabelOverlap: false,
      hoverOffset: 1,
      label: {
        normal: {
          show: false,
          position: 'center'
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
      data: [
        // {
        //   name: '投资15%',
        //   value: 15,
        //   itemStyle: {
        //     color: new echarts.graphic.LinearGradient(
        //       1, 0, 0, 1, [
        //         {offset: 0, color: '#FCC8E9'},
        //         {offset: 1, color: '#FA6BA3'}
        //       ]
        //     ),
        //     global: false
        //   }
        // },
        // {
        //   name: '注册85%',
        //   value: 85,
        //   itemStyle: {
        //     color: new echarts.graphic.LinearGradient(
        //       1, 0, 0, 1, [
        //         {offset: 0, color: '#FFF04C'},
        //         {offset: 1, color: '#F3FAC0'}
        //       ]
        //     ),
        //     global: false
        //   }
        // }
      ]
    }
  ]
}
