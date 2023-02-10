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
          left: '0',
          top: '10%',
          right: '0',
          bottom: '20'
        },
        tooltip: {},
        xAxis: {
          data: ['大数据', '新金融', '物联网', '人工智能', '信息安全'],
          axisLabel: {
            interval: 0,
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
          data: [8, 15, 18, 4, 5],
          itemStyle: {
            color: function (params) {
              var c = '#A8E7F6'
              return c
            }
          }
        }, {
          type: 'bar',
          barWidth: 10,
          data: [10, 15, 8, 12, 7],
          itemStyle: {
            color: function (params) {
              var c = '#CC4E32'
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
