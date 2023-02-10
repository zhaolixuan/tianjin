<template>
  <div class="older-content">
    <norm-layout text="60岁以上失能半失能入户医疗服务"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import ServiceChart from "@/views/BuffetPage/components/ServiceChart/index";
export default {
  name: "MediacalServices",
  props: {
    halfincapacitatedNumMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData() {
      let {
        incapacitatedServiceTotala,
        incapacitatedServiceTotalb,
        incapacitatedServiceTotalc,
        incapacitatedServiceTotald,
        incapacitatedServiceTotalaPeople,
        incapacitatedServiceTotalbPeople,
        incapacitatedServiceTotalcPeople,
        incapacitatedServiceTotaldPeople
      } = this.halfincapacitatedNumMap[0] || [];
      let arr = [
        incapacitatedServiceTotalaPeople,
        incapacitatedServiceTotalbPeople,
        incapacitatedServiceTotalcPeople,
        incapacitatedServiceTotaldPeople
      ];
      return {
        data: [
          { name: "入户查体", value: incapacitatedServiceTotala },
          { name: "入户随访", value: incapacitatedServiceTotalb },
          { name: "特需服务", value: incapacitatedServiceTotalc },
          { name: "家床 ", value: incapacitatedServiceTotald }
        ],
        radius: ["50%", "67%"],
        center: ["50%", "55%"],
        title: "补贴政策",
        itemStyle: {
          borderWidth: 5,
          borderColor: "#031831"
        },
        colors: [
          { start: "#1887FE", end: "#18E7FE" },
          { start: "#62FEEF", end: "#45EB9D" },
          { start: "#CC4E32", end: "#FF876C" }
        ],
        formatter: params => {
          return `${params.data.name}: ${params.data.value} 次 \n ${arr[params.dataIndex]} 人`;
        }
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
  height: 2.7rem;
}
</style>
