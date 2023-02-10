<template>
  <div class="older-content">
    <norm-layout text="年龄性别分布" :flag="false"></norm-layout>
    <TwowayColumnar :twoData="devicesSexMap" />
  </div>
</template>

<script>
import TwowayColumnar from "../TwowayColumnar/index";
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import api from "@/api/api.js";

export default {
  data() {
    return {
      devicesSexMap: [],
      maleObj: {},
      femaleObj: {},
    };
  },

  props: {
    chartsData: {
      type: Array,
      default: () => []
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

    // devicesSexMap: {
    //   type: Array,
    //   default: () => {
    //     return [];
    //   }
    // },

    equipmentSexMap: {
      type: Array,
      default: () => []
    },

    ispressSearchButton: {
      type: Number
    },
  },

  watch: {
    ispressSearchButton() {
    // 男
    this.getAgeTotalMapMale();
    // 女
    this.getAgeTotalMapFemale();
    }
  },

  mounted() {
    // 男
    this.getAgeTotalMapMale();
    // 女
    this.getAgeTotalMapFemale();
  },

  // computed: {
  //   // 旧的 摘录的 SmartdeviceStatisticsNew 路由中左侧面板的处理逻辑 它没有数据
  //   // 留着学习逻辑吧
  //   // ServiceData() {
  //   //   const createData = sex =>
  //   //     this.chartsData.map((item, ind) => {
  //   //       if (item.sex === sex && this.equipmentSexMap[ind].sex === sex) {
  //   //         let equipmentSexMap = Object.keys(this.equipmentSexMap[ind]);
  //   //         Object.keys(item).forEach((ite, key) => {
  //   //           if (
  //   //             ite === equipmentSexMap[key] &&
  //   //             (typeof item[ite] === "number" &&
  //   //               typeof this.equipmentSexMap[ind][ite] === "number")
  //   //           ) {
  //   //             item[ite] = item[ite] + this.equipmentSexMap[ind][ite];
  //   //           }
  //   //         });
  //   //         return item;
  //   //       }
  //   //     });
  //   //   let installData = createData("女");
  //   //   installData.push(...createData("男"));
  //   //   const ObjectData = data => data.filter(item => item !== undefined);
  //   //   return ObjectData(installData);
  //   // }

  //   // 新的
  //   ServiceData() {
  //     return this.devicesSexMap;
  //   }
  // },

  methods: {
    // 男
    getAgeTotalMapMale() {
      let params = {
        beginDay: this.statisticsForm.beginDay,
        endDay: this.statisticsForm.endDay,
        sex: "男",
        num: this.count
      };
      api.getAgeTotalMap(params).then(res => {
        this.maleObj = Object.assign({ sex: "男" }, res.data);
      });
    },

    // 女
    getAgeTotalMapFemale() {
      let params = {
        beginDay: this.statisticsForm.beginDay,
        endDay: this.statisticsForm.endDay,
        sex: "女",
        num: this.count
      };
      api.getAgeTotalMap(params).then(res => {
        this.femaleObj = Object.assign({ sex: "女" }, res.data);
        this.devicesSexMap = [];
        this.devicesSexMap.push(this.maleObj, this.femaleObj);
        // 参考 http://dev.jdcloud.com:8080/#/ProvideAged 路由中
        // GenderDistribution/index.vue 中 chartData 数据格式
      });
    }
  },

  components: {
    TwowayColumnar,
    NormLayout
  }
};
</script>

<style lang="less" scoped>
.older-content {
  height: 3rem;
}
</style>
