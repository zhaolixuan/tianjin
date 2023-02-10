<template>
  <div :id="id" :class="option.class" :style="option.style"></div>
</template>

<script>
export default {
  name: "Lines",
  props: {
    id: {
      type: String,
      default: "myline"
    },
    option: {
      type: Object
    },
    dataObj: {
      type: Object,
      required: true
      // default: {
      //   legend: [
      //     { name: "实际完成率", key: "actual" },
      //     { name: "计划完成率", key: "plan" }
      //   ],
      //   xAxisList: ["10-01", "10-02", "10-03"],
      //   dataList: [
      //     { key: "actual", data: [10, 25, 60] },
      //     { key: "plan", data: [30, 55, 84] }
      //   ]
      // }
    }
  },
  data() {
    return {
      chart: null,
      themeColor: "rgb(94,167,244)",

      colorList: [
        {
          from: "rgba(255,86,1,1)",
          to: "rgba(221,167,255,1)",
          point: "rgba(67,198,230,1)"
        },
        {
          from: "rgba(97,252,255,1)",
          to: "rgba(37,153,255,1)",
          point: "rgba(67,198,230,1)"
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeHandle);
  },
  watch: {
    dataObj: {
      handler(newVal, oldVal) {
        if (this.chart) {
          this.chart.setOption(this.defaultOption());
        } else {
          this.init();
        }
      },
      deep: true // 对象内部属性的监听，关键。
    }
  },
  methods: {
    init() {
      this.chart = this.$echarts.init(document.getElementById(this.id));
      this.chart.setOption(this.defaultOption());
      window.addEventListener("resize", this.resizeHandle);
    },
    resizeHandle() {
      this.chart.resize();
    },
    defaultOption() {
      return {
        grid: {
          top: 20,
          bottom: 25,
          right: 15
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            var relVal = params[0].name;
            for (var i = 0, l = params.length; i < l; i++) {
              relVal +=
                "<br/>" + params[i].seriesName + " : " + params[i].value + "%";
            }
            return relVal;
          },
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          show: false
        },
        legend: {
          show: true,
          data: this.dataObj.legend,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: this.themeColor
          }
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              inside: true
            },
            axisLabel: {
              textStyle: {
                color: this.themeColor
              },
              interval: "0"
            },
            axisLine: {
              lineStyle: {
                color: this.themeColor
              }
            },
            data: this.dataObj.xAxisList
          }
        ],
        yAxis: [
          {
            type: "value",
            max: 100,
            min: 0,
            splitNumber: 2,
            axisLabel: {
              formatter: "{value}%",
              textStyle: {
                color: this.themeColor
              }
            },
            axisLine: {
              lineStyle: {
                color: this.themeColor
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: this.getSeries()
      };
    },
    getSeries() {
      let series = [];
      this.dataObj.dataList.map((item, index) => {
        let key = item.key;
        let name = "";
        this.dataObj.legend.map(item => {
          if (item.key == key) {
            name = item.name;
          }
        });
        series.push({
          name: name,
          type: "line",
          symbol: "none",
          smooth: true,
          data: item.data,
          lineStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: this.colorList[index].from
              },
              {
                offset: 1,
                color: this.colorList[index].to
              }
            ])
          },
          itemStyle: {
            color: this.colorList[index].from,
            shadowColor: "rgba(0,0,0,0.5)",
            shadowBlur: 2
          }
        });
      });
      return series;
    }
  }
};
</script>

<style scoped>
</style>
