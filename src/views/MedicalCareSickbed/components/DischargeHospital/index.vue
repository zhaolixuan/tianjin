<template>
  <div class="older_content">
    <NormLayout text="医护一体化病床出院情况统计" />
    <ServiceChart :ServiceData="ServiceData" />
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import ServiceChart from "@/views/OlderConsumpFrequency/components/ServiceChart/index";

export default {
  name: "DischargeHospital",
  data() {
    return {};
  },

  props: {
    serviceChannalsMap: {
      type: Array,
      default: () => []
    }
  },

  components: {
    NormLayout,
    ServiceChart
  },

  computed: {
    ServiceData() {
      this.serviceChannalsMap.map(item => {
        item.name = item.channalsName;
        item.value = item.orderChannalsTotal;
      });
      return {
        data: this.serviceChannalsMap,
        radius: ["50%", "65%"],
        center: ["47%", "48%"],
        title: "就餐方式",
        itemStyle: {
          borderWidth: 5,
          borderColor: "#031831"
        },
        colors: [
          { start: "#1887FE", end: "#18E7FE" },
          { start: "#62FEEF", end: "#45EB9D" },
          { start: "#CC4E32", end: "#FF876C" }
        ],
        formatter: "{b|{b}：}{c|{c}  人数}\n"
      };
    }
  }
};
</script>

<style lang="less" scoped>
.older_content {
  height: 3.1rem;
}
</style>
