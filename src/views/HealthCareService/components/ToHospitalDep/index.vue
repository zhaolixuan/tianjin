<template>
  <div class="older_content">
    <NormLayout text="入院科室" :flag="false" />
    <ServiceChart :ServiceData="ServiceData" />
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import ServiceChart from "../ServiceChart/index";

export default {
  name: "ToHospitalDep",
  data() {
    return {};
  },

  props: {
    hospitalDepartmentsMap: {
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
      this.hospitalDepartmentsMap.map(item => {
        item.name = item.department;
        item.value = item.departmentTotal;
      });
      return {
        data: this.hospitalDepartmentsMap,
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
  height: 2.1rem;
}
</style>
