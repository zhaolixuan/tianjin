<template>
  <div class="older-content">
    <norm-layout text="服务方式（近三十天）"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import ServiceChart from "@/views/BuffetPage/components/ServiceChart/index";

export default {
  name: "ServiceWay",
  props: {
    serviceStyleTotalMap: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    ServiceData() {
      this.serviceStyleTotalMap.forEach(item => {
        item.name = item.mealType;
        item.value = item.serviceMealTypeTotal;
      });
      return {
        data: this.serviceStyleTotalMap,
        radius: ["40%", "50%"],
        center: ["52%", "42%"],
        title: "服务方式",
        itemStyle: {
          borderWidth: 5,
          borderColor: "#031831"
        },
        colors: [
          { start: "#1887FE", end: "#18E7FE" },
          { start: "#62FEEF", end: "#45EB9D" },
          { start: "#CC4E32", end: "#FF876C" }
        ],
        formatter: "{b|{b}：}{c|{c}客次}\n{d|{d}%}"
      };
    }
  },

  components: {
    NormLayout,
    ServiceChart
  }
};
</script>

<style lang="less" scoped>
.older-content {
  height: 2.6rem;
}
</style>
