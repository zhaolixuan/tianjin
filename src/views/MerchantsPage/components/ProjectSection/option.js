
export default {
  tooltip: {
    trigger: 'item'
  },
  radar: {
    indicator: [
      {text: '陈塘管委会', max: 100},
      {text: '区商务局', max: 100},
      {text: '合作交流办', max: 100},
      {text: '陈塘管委会', max: 100},
      {text: '金融局', max: 100},
      {text: '区文化和旅游局', max: 100}
    ],
    radius: 65,
    center: ['50%', '50%'],
    splitNumber: 7,
    name: {
      color: 'rgba(123, 151, 177, 1)',
      lineHeight: 15,
      fontSize: 12
    },
    nameGap: 5.5,
    splitArea: {
      show: true,
      areaStyle: {
        color: ['RGBA(7, 19, 62, 1)', 'rgba(0, 91, 159, 0.5)']
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        width: 1,
        color: 'RGBA(26, 88, 146, 1)'
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: 'RGBA(26, 88, 146, 1)',

        width: 1
      }
    }
  },
  series: {
    type: 'radar',
    symbol: 'none',
    symbolSize: 20,
    tooltip: {
      trigger: 'item',
      textStyle: {
        align: 'left'
      },
      formatter: function (params, data) {
        let tooltipStr = '引进项目部门分布'
        params.name.map((item, index) => {
          tooltipStr += '<p style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgba(10, 182, 255, 1);"></p>' + item + ' :' + params.value[index] + '项 <br/>'
        })

        return tooltipStr
      },
      extraCssText: 'width:120px; white-space:pre-wrap'
    },
    itemStyle: {
      normal: {
        areaStyle: {
          type: 'default',
          opacity: 0.59,
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [{
              offset: 0, color: 'rgba(0, 255, 255, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(10, 182, 255, 1)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        lineStyle: {
          width: 0
        }
      }
    },
    data: [
      {value: [40, 30, 20, 40, 50, 60], name: '陈塘管委会'},
      {value: [40, 30, 20, 40, 50, 60], name: '区文化和旅游局'},
      {value: [40, 30, 20, 40, 50, 60], name: '金融局'},
      {value: [40, 30, 20, 40, 50, 60], name: '陈塘管委会'},
      {value: [40, 30, 20, 40, 50, 60], name: '合作交流办'},
      {value: [40, 30, 20, 40, 50, 60], name: '区商务局'}
    ]
  }
}
