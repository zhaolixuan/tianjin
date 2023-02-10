<template>
  <div class="order_content">
    <NormLayout text="医护一体化病床数和家庭床位病床数" />
    <div class="post_container">
      <MessageItem :ServiceData="ServiceData" lineNumber="three" />
    </div>
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import MessageItem from "@/views/OlderDistribution/components/MessageItem/index";
import { mapGetters } from "vuex";

export default {
  name: "SickbedNumber",
  data() {
    return {};
  },

  props: {
    healthStationMap: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  components: {
    NormLayout,
    MessageItem
  },

  computed: {
    ...mapGetters(["breadCrumbCodes"]),
    ServiceData() {
      let {
        haveHealthRecordsTotal,
        healthStationNum,
        healthStationTotal,
        insuranceClaimsMoney,
        insuranceClaimsTotal,
        insuranceOutMoney,
        insuranceToMoney,
        peopleTotal,
        serverTotal,
        serviceObjectTotal,
        signHomeoctorTotal
      } = this.healthStationMap;
      return [
        {
          title: "证书床位数",
          number: (haveHealthRecordsTotal / 10000).toFixed(2),
          text: "万人",
          flag: true
        },
        {
          title: "实际开放数",
          number: (haveHealthRecordsTotal / 10000).toFixed(2),
          text: "万人",
          flag: true
        },
        {
          title: "目前住院人数",
          number: (haveHealthRecordsTotal / 10000).toFixed(2),
          text: "万人",
          flag: true
        },
        {
          title: "富裕床位数",
          number: (haveHealthRecordsTotal / 10000).toFixed(2),
          text: "万人",
          flag: true
        },
        {
          title: "家庭病床当前住院数",
          number: (haveHealthRecordsTotal / 10000).toFixed(2),
          text: "万人",
          flag: true
        },
        {
          title: "家庭病床累计住院数",
          number: (haveHealthRecordsTotal / 10000).toFixed(2),
          text: "万人",
          flag: true
        },
        {
          title: "家庭病床累计出院数",
          number: (haveHealthRecordsTotal / 10000).toFixed(2),
          text: "万人",
          flag: true
        }
      ];
    }
  }
};
</script>

<style lang="less" scoped>
.order_content {
  height: 3.5rem;
  .post_container {
    width: 104%;
  }
}
</style>
