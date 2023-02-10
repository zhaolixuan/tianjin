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
      this.getConsumeDistributionList();
    }
  },

  mounted() {
    this.getConsumeDistributionList();
  },

  methods: {
    getConsumeDistributionList() {
      let params = {
        beginDay: this.statisticsForm.beginDay,
        endDay: this.statisticsForm.endDay,
        // num: this.count || 100,
        MinNum: this.statisticsForm.count,
        MaxNum: this.statisticsForm.MaxNum,
        classifyType: "service_point"
      };
      api.getConsumeDistributionList(params).then(res => {
        // console.log(res);
        // const zaitiList = res.data.slice(0, 5).reverse();
        // this.ServiceData = {
        //   title: zaitiList.map(v => v.servicePoint),
        //   data: zaitiList.map(v => v.peopleNum),
        //   label: true,
        //   labelWidth: 30
        // };

        // 服务商名字简称处理
        var serverJclist = res.data;
        let newList = [];
        for(var i = 0;i < serverJclist.length; i++){
          if(serverJclist[i].servicePoint == '中民聚康（天津）养老产业发展有限公司'){
            newList.push('中民聚康')
          }else if(serverJclist[i].servicePoint == '天津市海洋石油物业管理有限公司河西区分公司'){
            newList.push('海洋石油')
          }else if(serverJclist[i].servicePoint == '天津市河西区广东路龙福宫老人院'){
            newList.push('龙福宫')
          }else if(serverJclist[i].servicePoint == '天津华夏恒达科技有限公司'){
            newList.push('华夏恒达')
          }else if(serverJclist[i].servicePoint == '天津市河西区聚友福餐饮服务有限公司'){
            newList.push('聚友福')
          }else if(serverJclist[i].servicePoint == '天津市河西区福寿康居家养老服务中心'){
            newList.push('福寿康')
          }else if(serverJclist[i].servicePoint == '天津市河西区逸麟老人院'){
            newList.push('逸麟')
          }else if(serverJclist[i].servicePoint == '天津育嘉物业管理有限公司'){
            newList.push('育嘉')
          }else if(serverJclist[i].servicePoint == '天津市河西区美塘佳苑养老院'){
            newList.push('美塘佳苑')
          }
        };
        const zaitiList = serverJclist.slice(0, 5).reverse();
        newList = newList.slice(0,5).reverse()
        this.ServiceData = {
          title: newList.map(v => v),
          data: zaitiList.map(v => v.peopleNum),
          label: true,
          labelWidth: 30
        };
      });
    }
  },

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
