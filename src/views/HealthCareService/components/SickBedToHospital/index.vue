<template>
  <div class="older_content">
    <NormLayout text="医护一体化病床入院情况统计" :flag="false" />
    <ServiceChart :ServiceData="ServiceData" />
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import ServiceChart from "../ServiceChart/index";

export default {
  name: "SickBedToHospital",
  data() {
    return {};
  },

  props: {
    integratedMedicalWardMap: {
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
      this.integratedMedicalWardMap.map(item => {
        item.name = item.inState;
        item.value = item.inStateTotal;
      });
      return {
        data: this.integratedMedicalWardMap,
        radius: ["50%", "65%"],
        center: ["47%", "48%"],
        title: "",
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
  height: 2.95rem;
}
</style>
