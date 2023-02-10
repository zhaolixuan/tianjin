<template>
  <div class="older-content">
    <service-type :MedircalData="ServiceData" path="olderPage"></service-type>
  </div>
</template>

<script>
import ServiceType from "../ServiceType/index";
import api from "@/api/api.js";

export default {
  data() {
    return {
      ServiceData: {}
    };
  },

  props: {
    ageMap: {
      type: Object,
      default: () => {}
    },
    statisticsForm: {
      type: Object,
      default: () => {
        return {};
      }
    },
    count: {
      type: String
    },

    ispressSearchButton: {
      type: Number
    }
  },

  watch: {
    ispressSearchButton() {
      this.getConsumeDistributionList();
    }
  },

  mounted() {
    this.getConsumeDistributionList();
  },

  components: {
    ServiceType
  },

  methods: {
    getConsumeDistributionList() {
      let params = {
        beginDay: this.statisticsForm.beginDay,
        endDay: this.statisticsForm.endDay,
        MinNum: this.statisticsForm.count,
        MaxNum: this.statisticsForm.MaxNum,
        classifyType: "street"
      };
      api.getConsumeDistributionList(params).then(res => {
        if (res.code && res.code == 200) {
          const streetVisitMapa = res.data.slice(0, 8).reverse();
          this.ServiceData = {
            title: streetVisitMapa.map(v => v.street),
            data: streetVisitMapa.map(v => v.peopleNum),
            label: true,
            labelWidth: 30
          };
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.older-content {
  height: 3.5rem;
}
</style>
