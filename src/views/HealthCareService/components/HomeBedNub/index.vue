<template>
  <div class="order_content">
    <NormLayout text="家庭床位" :flag="false" />
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
  name: "HomeBedNub",
  data() {
    return {};
  },

  props: {
    familySickbedMap: {
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
        allTotal,
        haveInsurance,
        inTotal,
        noInsurance,
        outTotal
      } = this.familySickbedMap;
      return [
        {
          title: "家庭病床当前住院数",
          // number: (inTotal / 10000).toFixed(2),
          number: inTotal,
          text: "人",
          flag: true
        },
        {
          title: "家庭病床累计住院数",
          // number: (allTotal / 10000).toFixed(2),
          number: allTotal,
          text: "人",
          flag: true
        },
        {
          title: "家庭病床累计出院数",
          // number: (outTotal / 10000).toFixed(2),
          number: outTotal,
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
  height: 1.5rem;
  .post_container {
    width: 104%;
  }
}
</style>
