<template>
  <div class="order_content">
    <NormLayout text="医护一体化床位" :flag="false" />
    <div class="post_container">
      <MessageItem :ServiceData="ServiceData" lineNumber="four" />
    </div>
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import MessageItem from "@/views/OlderDistribution/components/MessageItem/index";
import { mapGetters } from "vuex";

export default {
  name: "MedicalCareBed",
  data() {
    return {};
  },

  props: {
    hospitalBedAdmissionsMap: {
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
        actualNum,
        certificateNum,
        currentNum,
        surplusNum
      } = this.hospitalBedAdmissionsMap;
      return [
        {
          title: "证书床位数",
          // number: (certificateNum / 10000).toFixed(2),
          number: certificateNum,
          text: "张",
          flag: true
        },
        {
          title: "实际开放数",
          // number: (actualNum / 10000).toFixed(2),
          number: actualNum,
          text: "张",
          flag: true
        },
        {
          title: "目前住院人数",
          number: (currentNum / 10000).toFixed(2),
          number: currentNum,
          text: "张",
          flag: true
        },
        {
          title: "富余床位数",
          number: (surplusNum / 10000).toFixed(2),
          number: surplusNum,
          text: "张",
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
