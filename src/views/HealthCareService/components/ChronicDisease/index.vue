<template>
  <div class="older_content">
    <NormLayout text="慢性疾病统计" />
    <ServiceType :MedircalData="ServiceData" />
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import ServiceType from "@/views/OlderDistribution/components/ServiceType/index";

export default {
  name: "ChronicDisease",
  data() {
    return {
      streetVisitMap: []
    };
  },

  props: {
    chronicDisease: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  components: {
    NormLayout,
    ServiceType
  },

  computed: {
    ServiceData() {
      let streetArr = [];
      Object.keys(this.chronicDisease).forEach(item => {
        streetArr.push({
          streetName:
            item == "gxyTotal"
              ? "高血压"
              : item == "tnbTotal"
              ? "糖尿病"
              : item == "nzzTotal"
              ? "脑中卒"
              : item == "jsbTotal"
              ? "精神病"
              : item == "ztcjTotal"
              ? "肢体残疾"
              : item == "illnessTotal"
              ? "其它疾病"
              : "",
          visitTotal: this.chronicDisease[item]
        });
      });
      this.streetVisitMap = streetArr;
      return {
        title: this.streetVisitMap.map(v => v.streetName),
        data: this.streetVisitMap.map(v => v.visitTotal),
        label: true,
        labelWidth: 30
      };
    }
  }
};
</script>

<style lang="less" scoped>
.older_content {
  height: 2.9rem;
}
</style>
