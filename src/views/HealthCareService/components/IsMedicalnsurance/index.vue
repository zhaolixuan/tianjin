<template>
  <div class="older_content">
    <NormLayout text="是否有医保" :flag="false" />
    <ServiceChart :ServiceData="ServiceData" />
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import ServiceChart from "../ServiceChart/index";

export default {
  name: "IsMedicalnsurance",
  data() {
    return {
      serviceChannalsMap: []
    };
  },

  props: {
    haveOrNoInsurance: {
      type: Object,
      default: () => {}
    }
  },

  components: {
    NormLayout,
    ServiceChart
  },

  computed: {
    ServiceData() {
      let newArr = [];
      let { haveInsurance, noInsurance } = this.haveOrNoInsurance;
      newArr.push(
        {
          channalsName: "有医保数",
          value: haveInsurance
        },
        {
          channalsName: "无医保数",
          value: noInsurance
        }
      );
      this.serviceChannalsMap = newArr;
      this.serviceChannalsMap.map(item => {
        item.name = item.channalsName;
        item.value = item.value;
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
  height: 2.1rem;
}
</style>
