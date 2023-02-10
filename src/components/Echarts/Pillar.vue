<template>
  <div :id="id" :class="option.class" :style="option.style"></div>
</template>

<script>
export default {
  name: 'Pillar',
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
    dataObj: {
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
          left: '0',
          top: '10%',
          right: '0',
          bottom: '55'
        },
        tooltip: {},
        xAxis: {
          // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          // data: ['金融', '社会服务', '批发零售', '房地产', '住宿和餐饮', '交通仓储邮政'],
          data:this.dataObj.city,
          axisLabel: {
            interval: 0,
            rotate: 45, 
            textStyle: {
              fontSize: 10
            },
            color: '#A5DCFF'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#C8C8C8',
              type: 'dashed'
            }
          }
        },
        yAxis: {
          splitNumber: 3,
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          }
        },

        series: [{
          type: 'bar',
          barWidth: 10,
          // data: [8, 15, 18, -8, 5, -2, 10, 15, 22, -10, 12, 7],
          // data: [267.15, 121.57, 47.51, 28.01, 19.63,10.68],
          data:this.dataObj.numList,
          itemStyle: {
            color: function (params) {
              var c = ''
              if (params.value > 0) {
                c = '#CC4E32'
              } else {
                c = '#A8E7F6'
              }
              return c
            }
          }
        }]
      }
    }
  }
}
</script>

<style scoped>

</style>
