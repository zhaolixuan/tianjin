<template>
  <div class="older-content">
    <norm-layout text="老年人基础信息" path="OlderInformation"></norm-layout>
    <message-item :ServiceData="ServiceData"></message-item>
  </div>
</template>

<script>
import NormLayout from "../NormLayout";
import MessageItem from "../MessageItem/index";
import { mapGetters } from "vuex";

export default {
  name: "OlderMessage",
  data() {
    return {
      timer: null,
      orderCountInfo: {}
    };
  },
  components: {
    NormLayout,
    MessageItem
  },
  computed: {
    ...mapGetters(["typeNew", "codeNew", "baseInfo", "breadCrumbCodes"]),
    params() {
      let params = {};
      const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0];
      return params;
    },
    ServiceData() {
      const date = new Date();
      const year = date.getFullYear();
      const month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
      let {
        sixtyOldTotal,
        eightUnderTotal,
        lowIncome,
        isAloneTotal,
        disabilityTotal,
        currentBirthdayTotal
      } = this.baseInfo.returnBaseTotalmap;
      return [
        {
          title: "常住老年人",
          // OlderDistribution 首页中的 OlderMessage   组件的数据来源于
          // store 中的 getters 属性中的 baseInfo 这个计算属性 baseInfo
          // 这个计算属性在 provide_store.js 中经过 formatBaseInfo 函数
          // 的改造 改造成了对象 而对象中 returnBaseTotalmap 是使用的数据
          // 所以此时 从this.baseInfo.returnBaseTotalmap 中解构 6个数据
          // http://10.0.7.126/yanglao-api/oldBasePersonInfo/getOldBasePersonInfo
          // 这个接口返回很多首页的基础信息 在OlderDistribution这个首页使
          // 用的是 returnBaseTotalmap 这个属性
          number: sixtyOldTotal,
          icon: "older",
          text: "人",
          line: true,
          path: {
            path: "OlderInformation",
            query: { ...this.params, identifyFields: 1, type: "older" }
          }
        },
        {
          title: "高龄(80岁以上)",
          number: eightUnderTotal,
          icon: "book",
          text: "人",
          path: {
            path: "OlderInformation",
            query: { ...this.params, identifyFields: 4, type: "book" }
          }
        },
        {
          title: "低收入(3000元及以下)",
          number: lowIncome,
          icon: "older",
          line: true,
          text: "人",
          path: {
            path: "OlderInformation",
            query: {
              identifyFields: 2,
              type: "older",
              ...this.params
            }
          }
        },
        {
          title: "独居老人",
          number: isAloneTotal,
          icon: "home",
          text: "人",
          path: {
            path: "OlderInformation",
            query: { ...this.params, identifyFields: 5, type: "home" }
          }
        },
        {
          title: "失能老人",
          number: disabilityTotal,
          icon: "friend",
          text: "人",
          line: true,
          path: {
            path: "OlderInformation",
            query: { ...this.params, identifyFields: 3, type: "friend" }
          }
        },
        {
          title: "今日生日",
          number: currentBirthdayTotal,
          icon: "birthday",
          text: "人",
          path: {
            path: "olderPage",
            query: {
              birthday: `${year}${month}${day}`,
              ...this.params
            }
          }
        }
      ];
    }
  }
};
</script>

<style lang="less" scoped>
.older-content {
  height: 3rem;
}
</style>
