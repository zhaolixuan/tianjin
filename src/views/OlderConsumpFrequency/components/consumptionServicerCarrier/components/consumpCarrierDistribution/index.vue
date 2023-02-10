<template>
  <div class="older-content">
    <service-type :MedircalData="ServiceData" path="olderPage"></service-type>
  </div>
</template>

<script>
import ServiceType from "@/views/OlderDistribution/components/ServiceType/index";
import api from "@/api/api.js";

export default {
  data() {
    return {
      ServiceData:{},
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
      type: String,
    },

    // 重新拉数据处理
    ispressSearchButton: {
      type: Number
    },
  },

  watch:{
    ispressSearchButton(){
      this.getConsumeDistributionList()
    }
  },

  mounted(){
    this.getConsumeDistributionList()
  },

  methods:{
    getConsumeDistributionList(){
      let params = {
        beginDay: this.statisticsForm.beginDay,
        endDay: this.statisticsForm.endDay,
        // num: this.count || 100,
        MinNum: this.statisticsForm.count,
        MaxNum: this.statisticsForm.MaxNum,
        classifyType: "merchant_name"
      };
      api.getConsumeDistributionList(params).then(res=>{
        // console.log(res);
        const zaitiList = res.data.slice(0,5).reverse();
        this.ServiceData = {
          title:zaitiList.map(v => v.merchantName),
          data:zaitiList.map(v => v.peopleNum),
          label:true,
          labelWidth: 30,
        }
      })
    }
  },

  // 其它接口中的处理
  // computed: {
  //   ServiceData() {
  //     return {
  //       title: this.streetVisitMap.map(v => v.streetName),
  //       data: this.streetVisitMap.map(v => v.visitTotal),
  //       label: true,
  //       labelWidth: 30
  //     };
  //   }
  // },

  // created() {
  //   api.getStreetVisitInfo().then(res => {
  //     const { streetVisitMap } = res && res.data;
  //     this.streetVisitMap =
  //       streetVisitMap && streetVisitMap.length >= 5
  //         ? streetVisitMap.slice(0, 5).reverse()
  //         : streetVisitMap.reverse();
  //     console.log(this.streetVisitMap);
  //   });
  // },

  components: {
    ServiceType
  }
};
</script>

<style lang="less" scoped>
.older-content {
  height: 2.9rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
