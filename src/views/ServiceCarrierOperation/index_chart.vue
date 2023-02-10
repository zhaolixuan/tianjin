<template>
  <div class="chart_help">
    <div ref="canvasChart" style="height: 100%;"></div>
  </div>
</template>

<script>
import initChart from "@/views/ProvideAged/mixins/initChart.js";

import {
  defaultOptions,
  createLine,
  createLineService,
  createLineAmount,
  createXais,
  createZoom
} from "./option.js";

export default {
  name: "ConsumeChart",
  mixins: [initChart],
  data() {
    return {
      defaultOptions,
      timer: null
    };
  },
  props: {
    serviceData: {
      type: Object,
      default: () => {}
    },
    Dtype: {
      type: String,
      default: () => {
        return "";
      }
    }
  },

  mounted() {
    console.log(this.Dtype);
  },

  watch: {
    serviceData: {
      deep: true,
      handler(oldVal, newVal) {
        this.handleResizeChart();
      }
    }
  },

  computed: {
    computedOptions() {
      let { zValue, rValue, xData } = this.serviceData;
      let maxNumber = this.serviceData.xData.length > 29 ? 50 : 100;
      if (this.Dtype == "money") {
        return Object.assign({}, this.defaultOptions, {
          xAxis: createXais(xData),
          dataZoom: createZoom(maxNumber),
          series: [...createLineService(zValue)]
        });
      } else if (this.Dtype == "amount") {
        return Object.assign({}, this.defaultOptions, {
          xAxis: createXais(xData),
          dataZoom: createZoom(maxNumber),
          series: [...createLineAmount(rValue)]
        });
      } else {
        return Object.assign({}, this.defaultOptions, {
          xAxis: createXais(xData),
          dataZoom: createZoom(maxNumber),
          series: [...createLine(zValue, rValue)]
        });
      }
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
    }
  }
};
</script>

<style lang="less" scoped>
.chart_help {
  height: 100%;
}
</style>
