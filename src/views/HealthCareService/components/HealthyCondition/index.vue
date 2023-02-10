<template>
  <div class="order_content">
    <NormLayout text="健康情况" />
    <div class="post_container">
      <MessageItem :ServiceData="ServiceData" lineNumber="two" />
    </div>
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import MessageItem from "@/views/OlderDistribution/components/MessageItem/index";
import { mapGetters } from "vuex";

export default {
  name: "HealthyCondition",
  data() {
    return {};
  },

  components: {
    NormLayout,
    MessageItem
  },

  props: {
    healthStationMap: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  computed: {
    ...mapGetters(["breadCrumbCodes"]),
    ServiceData() {
      let {
        haveHealthRecordsTotal,
        signHomeoctorTotal
      } = this.healthStationMap;
      return [
        {
          title: "健康档案",
          // number: (haveHealthRecordsTotal / 10000).toFixed(2),
          number: haveHealthRecordsTotal,
          text: "人",
          flag: true,
          path: {
            path: "HealthRecordInfoSheet",
            query: { code: this.breadCrumbCodes }
          }
        },
        {
          title: "家庭医生签约",
          // number: (signHomeoctorTotal / 10000).toFixed(2),
          number: signHomeoctorTotal,
          text: "人",
          flag: true
        }
      ];
    }
  }
};
</script>

<style lang="less" scoped>
.order_content {
  height: 2rem;
  .post_container {
    width: 104%;
  }
}
</style>
