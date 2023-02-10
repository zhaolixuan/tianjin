<template>
  <div :id="id" :class="option.class" :style="option.style"></div>
</template>

<script>
export default {
  name: 'Industry',
  props: {
    id: {
      type: String,
      default: ''
    },
    option: {
      type: Object
    },
    dataObj: {
      type: Object
    }
  },
  mounted () {
    this.init()
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeHandle)
  },
  watch: {
    value: {
      handler (newVal, oldVal) {
        if (this.chart) {
          this.chart.setOption(this.defaultOption())
        } else {
          this.init()
        }
      },
      deep: true // 对象内部属性的监听，关键。
    }
  },
  methods: {
    init () {
      this.chart = this.$echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.defaultOption())
      window.addEventListener('resize', this.resizeHandle)
    },
    resizeHandle () {
      this.chart.resize()
    },
    defaultOption () {
      return {
        grid: {
          top: 'middle',
          left: '3%',
          right: '4%',
          bottom: '3%',
          height: '80%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
          color: ['#F46824', '#47FFF6', '#A8E7F6', '#ba2f2e', '#3fc7ff'],
          // data: ['第一产业', '第二产业', '第三产业'],
          data: ['信息安全', '人工智能', '大数据', '新金融', '物联网'],
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 10
          },
          top: 'top'
        },
        xAxis: {
          type: 'category',
          data: [100, 105, 120, 130, 160, 189, 100, 137, 128, 130, 140, 189],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          nameTextStyle: {
            color: '#999'
          },
          splitArea: {
            show: false
          }
        },
        series: [{
          name: '大数据',
          type: 'line',
          data: [122, 132, 146, 138, 135, 140, 146, 173, 160, 165, 172, 188],
          color: '#F58080',
          lineStyle: {
            normal: {
              width: 2,
              color: {
                type: 'linear',

                colorStops: [{
                  offset: 0,
                  color: '#F46824' // 0% 处的颜色
                }, {
                  offset: 0.4,
                  color: '#F46824' // 100% 处的颜色
                }, {
                  offset: 1,
                  color: '#F46824' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          symbol: 'circle',
          symbolSize: 2,
          itemStyle: {
            normal: {
              color: '#F46824',
              borderWidth: 2,
              borderColor: '#F46824'
            }
          },
          smooth: true
        },
        {
          name: '新金融',
          type: 'line',
          data: [129, 118, 132, 138, 144, 150, 142, 150, 149, 167, 172, 188],
          lineStyle: {
            normal: {
              width: 2,
              color: {
                type: 'linear',

                colorStops: [{
                  offset: 0,
                  color: '#47FFF6' // 0% 处的颜色
                },
                {
                  offset: 0.4,
                  color: '#47FFF6' // 100% 处的颜色
                }, {
                  offset: 1,
                  color: '#47FFF6' // 100% 处的颜色
                }
                ],
                globalCoord: false // 缺省为 false
              }
            }
          },
          symbol: 'circle',
          symbolSize: 2,
          itemStyle: {
            normal: {
              color: '#47FFF6',
              borderWidth: 2,
              borderColor: '#47FFF6'
            }
          },
          smooth: true
        },
        {
          name: '物联网',
          type: 'line',
          data: [119, 130, 142, 128, 137, 140, 146, 153, 149, 160, 169, 180],
          lineStyle: {
            normal: {
              width: 2,
              color: {
                type: 'linear',

                colorStops: [{
                  offset: 0,
                  color: '#A8E7F6' // 0% 处的颜色
                },
                {
                  offset: 0.4,
                  color: '#A8E7F6' // 100% 处的颜色
                }, {
                  offset: 1,
                  color: '#A8E7F6' // 100% 处的颜色
                }
                ],
                globalCoord: false // 缺省为 false
              }
            }
          },
          symbol: 'circle',
          symbolSize: 2,
          itemStyle: {
            normal: {
              color: '#A8E7F6',
              borderWidth: 2,
              borderColor: '#A8E7F6'
            }
          },
          smooth: true
        },
        {
          name: '人工智能',
          type: 'line',
          data: [109, 117, 152, 118, 127, 130, 136, 153, 149, 160, 169, 180],
          lineStyle: {
            normal: {
              width: 2,
              color: {
                type: 'linear',

                colorStops: [{
                  offset: 0,
                  color: '#ba2f2e' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#9d2312' // 100% 处的颜色
                }
                ],
                globalCoord: false // 缺省为 false
              }
            }
          },
          symbol: 'circle',
          symbolSize: 2,
          itemStyle: {
            normal: {
              color: '#ba2f2e',
              borderWidth: 2,
              borderColor: '#ba2f2e'
            }
          },
          smooth: true
        },
        {
          name: '信息安全',
          type: 'line',
          data: [129, 140, 112, 121, 132, 142, 149, 155, 150, 161, 179, 185],
          lineStyle: {
            normal: {
              width: 2,
              color: {
                type: 'linear',

                colorStops: [{
                  offset: 0,
                  color: '#3fc7ff' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#009aff' // 100% 处的颜色
                }
                ],
                globalCoord: false // 缺省为 false
              }
            }
          },
          symbol: 'circle',
          symbolSize: 2,
          itemStyle: {
            normal: {
              color: '#3fc7ff',
              borderWidth: 2,
              borderColor: '#3fc7ff'
            }
          },
          smooth: true
        }
        ]

      }
    }
  }
}
</script>

<style scoped>

</style>
