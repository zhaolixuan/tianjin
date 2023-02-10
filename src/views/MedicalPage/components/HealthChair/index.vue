<template>
  <div class="older-content">
    <norm-layout
      text="用药指导"
      title="助医运营监管大数据统计分析"
    ></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import ServiceChart from "@/views/BuffetPage/components/ServiceChart/index";
import { mapGetters } from "vuex";
export default {
  name: "HealthChair",
  props: {
    PatientsMap: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["breadCrumbCodes"]),
    ServiceData() {
      this.PatientsMap.map(item => {
        item.name = item.medicinePatient;
        item.value = item.medicineTotal;
      });
      var peopleArr = [];
      for (var i = 0; i < this.PatientsMap.length; i++) {
        peopleArr.push(this.PatientsMap[i].medicineTotalPeople);
      }
      return {
        data: this.PatientsMap,
        radius: ["60%", "70%"],
        center: ["52%", "45%"],
        title: "用药指导",
        colors: [
          { start: "rgba(24,231,254,1)", end: "rgba(24,135,254,1)" },
          { start: "rgba(247,147,147,1)", end: "rgba(221,71,71,1)" },
          { start: "rgba(69,235,157,1)", end: "rgba(98,254,239,1)" },
          { start: "rgba(127,113,251,1)", end: "rgba(178,125,255,1)" },
          { start: "rgba(255,132,0,1)", end: "rgba(255,85,0,1)" }
        ],
        labelLine: {
          length: 4,
          length2: 10
        },
        // formatter: '{b|{b}：}{c|{c}次}',
        formatter: params => {
          return `${params.data.name}: ${params.data.value} 次 \n ${
            peopleArr[params.dataIndex]
          } 人`;
        }
      };
    }
  },
  methods: {
    handleClickRow() {
      this.$router.push({
        path: "/RecordList",
        query: {
          code: this.breadCrumbCodes,
          title: "助医运营监管大数据统计分析"
        }
      });

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
