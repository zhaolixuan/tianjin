<template>
  <div class="chart_help">
    <div ref="canvasChart" style="height: 100%;"></div>
  </div>
</template>

<script>
import initChart from "@/views/ProvideAged/mixins/initChart.js";
import {
  createTitles,
  createBar,
  createGenderRatio,
  defaultOptions
} from "./option.js";

export default {
  name: "TwowayColumnar",
  mixins: [initChart],
  data() {
    return {
      defaultOptions,
      timer: null
    };
  },

  props: {
    twoData: {
      type: Array,
      default: () => []
    }
  },

  watch: {
    twoData: {
      deep: true,
      handler(oldVal, newVal) {
        this.handleResizeChart();
      }
    }
  },

  mounted(){
    // 请求放到 OlderConsumpFrequency/index.vue 拿不到数据
    // 放到 ageAndSex/index.vue twoData 有数据
    // console.log(this.twoData);
  },

  computed: {
    computedOptions() {
      const option = this.defaultOptions;
      const getAgeNumber = (sex, age) => {
        const sexIns = this.twoData.find(item => item.sex === sex);
        return sexIns ? sexIns[age] : 0;
      };
      const getSexNumber = sex => {
        const sexIns = this.twoData.find(item => item.sex === sex)  || {};
        // return sexIns ? sexIns.sexTotal : 0;
        // 改造
        var sexTotal = sexIns.sixTotal + sexIns.sevenTotal + sexIns.eightTotal + sexIns.nineTotal;
        // console.log(sexTotal);// 389 / 412
        return sexIns ? sexTotal : sexIns.sexTotal;
      };
      const getBarData = sex => [
        getAgeNumber(sex, "sixTotal"),
        getAgeNumber(sex, "sevenTotal"),
        getAgeNumber(sex, "eightTotal"),
        getAgeNumber(sex, "nineTotal")
      ];

      const maleNumber = getSexNumber("女");
      // console.log(maleNumber); // 389
      const famaleNumber = getSexNumber("男");
      // console.log(famaleNumber);// 412

      // 百分比
      const maleRatio =
        Math.round((maleNumber * 100) / (maleNumber + famaleNumber)) || 0;
      const famaleRatio =
        Math.round((famaleNumber * 100) / (maleNumber + famaleNumber)) || 0;
      // 给 echarts 赋值
      return Object.assign({}, option, {
        title: createTitles(maleNumber, famaleNumber),
        series: [
          ...createBar(getBarData("男"), getBarData("女")),
          ...createGenderRatio(famaleRatio, maleRatio)
        ]
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
    }
  }
};
</script>

<style lang="less" scoped>
.chart_help {
  height: 90%;
}
</style>
