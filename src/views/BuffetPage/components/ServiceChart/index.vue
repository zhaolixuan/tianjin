<template>
  <div class="chart_help">
    <div ref="canvasChart" style="height: 100%;"></div>
  </div>
</template>

<script>
import initChart from "@/views/ProvideAged/mixins/initChart.js";
import defaultOptions from "./option.js";
import { mapGetters } from "vuex";

export default {
  name: "ServiceChart",
  mixins: [initChart],
  data() {
    return {
      defaultOptions,
      timer: null,
      name: ""
    };
  },
  props: {
    ServiceData: {
      type: Object,
      default: () => {}
    },
    path: {
      type: String,
      default: () => ""
    }
  },
  watch: {
    ServiceData: {
      deep: true,
      handler(oldVal, newVal) {
        this.handleResizeChart();
      }
    },
    name: {
      handler(newo, oldVal) {}
    }
  },
  computed: {
    ...mapGetters(["breadCrumbCodes"]),
    computedOptions() {
      const option = this.defaultOptions;
      option.series.radius = this.ServiceData ? this.ServiceData.radius : [];
      option.series.center = this.ServiceData ? this.ServiceData.center : [];
      option.series.itemStyle = this.ServiceData
        ? this.ServiceData.itemStyle
        : [];
      option.series.label.formatter =
        this.ServiceData.formatter || this.formatterVlaue();
   // option.series.label.formatter =  this.formatterVlaue();
      option.series.labelLine.length = this.ServiceData.labelLine
        ? this.ServiceData.labelLine.length
        : 6;
      option.legend = this.ServiceData.legend ? this.ServiceData.legend : "";
      return Object.assign({}, option, {
        series: Object.assign({}, option.series, {
          name: this.ServiceData.title ? this.ServiceData.title : "",
          data: this.ServiceData.data.map((item, index) => ({
            value: item.value,
            name: item.name,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: this.ServiceData.colors[
                      index % this.ServiceData.colors.length
                    ].start
                  },
                  {
                    offset: 1,
                    color: this.ServiceData.colors[
                      index % this.ServiceData.colors.length
                    ].end
                  }
                ],
                global: false
              }
            }
          }))
        })
      });
    }
  },

  methods: {
    handleResizeChart() {
      this.$nextTick(() => {
        this.chart.dispose();
        this.chart = this.$echarts.init(this.$refs.canvasChart);
        this.chart.setOption(this.computedOptions);
        this.chart.resize();
      });
    },
    GotoPage(path, query) {
      if (path) {
        this.$router.push({
          path: path,
          query: query
        });
      }
    },
    formatterVlaue() {
      return data => {
      //  console.log(data);
        return data.name + "：" + data.percent.toFixed(0) + "%";
      };
    }
  },

  mounted() {
    let _self = this;
    if (this.path) {
      this.timer = setInterval(() => {
        this.chart.on("click", function(params) {
          switch (params.name) {
            case "男":
              _self.GotoPage(_self.path, {
                code: this.breadCrumbCodes,
                sex: "1"
              });
              break;
            case "女":
              _self.GotoPage(_self.path, {
                code: this.breadCrumbCodes,
                sex: "2"
              });
              break;
            case "独居":
              _self.GotoPage(_self.path, {
                code: this.breadCrumbCodes,
                isLone: "1"
              });
              break;
            case "家人居住":
              _self.GotoPage(_self.path, {
                code: this.breadCrumbCodes,
                isLone: "2"
              });
              break;
          }
        });
      }, 3000);
    }
  },

  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style lang="less" scoped>
.chart_help {
  height: 90%;
  padding-left: 0.2rem;
}
</style>
