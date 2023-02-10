<template>
  <div class="box_content">
    <!-- 老年人消费人群服务商分布 -->
    <ConsumpServicerDistribution
      v-if="activeHeader == 0"
      :statisticsForm="statisticsForm"
      :count="count"
      :ispressSearchButton="ispressSearchButton"
    />
    <!-- 老年人消费人群服务载体分布 -->
    <ConsumpCarrierDistribution
      :statisticsForm="statisticsForm"
      :count="count"
      :ispressSearchButton="ispressSearchButton"
      v-else
    />
  </div>
</template>

<script>
// 这两个组件随着 header 组件中的nav切换而切换显示
import ConsumpServicerDistribution from "./components/consumpServicerDistribution/index";
import ConsumpCarrierDistribution from "./components/consumpCarrierDistribution/index";

export default {
  props: {
    activeHeader: {
      type: String,
      default: () => {
        return "";
      }
    },

    statisticsForm: {
      type: Object,
      default: () => {
        return {};
      }
    },

    count: {
      type: String,
    },

    // 重新拉数据处理
    ispressSearchButton: {
      type: Number
    },
  },

  data() {
    return {
      // statisticsForm: {},
      // count: 0
    };
  },

  // mounted() {
  //   this.statisticsForm = statisticsForm;
  //   this.count = count;
  // },

  components: {
    ConsumpServicerDistribution,
    ConsumpCarrierDistribution
  }
};
</script>

<style lang="less" scoped>
.box_content {
  margin-top: 0.3rem;
  height: 3.2rem;
  width: 100%;
  // border: 1px solid #80b5ff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
