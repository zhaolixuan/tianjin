<template>
  <div class="older-content">
    <norm-layout text="签约老人身体状况"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import ServiceChart from "@/views/BuffetPage/components/ServiceChart/index";

export default {
  name: "PeopleState",
  props: {
    orderTypeTotalMap: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    ServiceData() {
      this.orderTypeTotalMap.forEach(item => {
        item.name = item.channalsName;
        item.value = item.orderChannalsTotal;
      });
      //   console.log( this.orderTypeTotalMap);
      return {
        data: this.orderTypeTotalMap,
        radius: ["47%", "55%"],
        center: ["50%", "50%"],
        title: "服务方式",
        itemStyle: {
          borderWidth: 3,
          borderColor: "#031831"
        },
        colors: [
          { start: "#1887FE", end: "#18E7FE" },
          { start: "#62FEEF", end: "#45EB9D" },
          { start: "#CC4E32", end: "#FF876C" }
        ],
        formatter: "{b|{b}：}{c|{c}个}\n{d|{d}%}"
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
  height: 3rem;
}
</style>
