<template>
  <div class="order_content">
    <div class="post_container">
      <MessageItem :ServiceData="ServiceData" lineNumber="three" />
    </div>
  </div>
</template>

<script>
import MessageItem from "@/views/OlderDistribution/components/MessageItem/index";
import { mapGetters } from "vuex";

export default {
  name: "LeftTotalSecond",
  data() {
    return {};
  },

  props: {
    consumptionNumLeftTotal: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  components: {
    MessageItem
  },

  computed: {
    ...mapGetters(["breadCrumbCodes"]),
    ServiceData() {
      let { amount, num, peopleNum } = this.consumptionNumLeftTotal;
      return [
        {
          title: "服务量",
          number: num,
          text: "次",
          flag: true
        },
        {
          title: "消费金额",
          number: amount,
          text: "元",
          flag: true
        },
        {
          title: "消费人数",
          number: peopleNum,
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
  height: 1.3rem;
  .post_container {
    width: 104%;
  }
}
</style>
