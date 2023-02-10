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
import api from "@/api/api.js";

export default {
  name: "middleTotalSecond",
  data() {
    return {
      resData: {}
    };
  },

  props: {
    statisticsForm: {
      type: Object,
      default: () => {
        return {};
      }
    },

    ispressSearchButton: {
      type: Number
    }
  },

  components: {
    MessageItem
  },

  created() {
    this.getConsumptionList();
  },

  watch: {
    ispressSearchButton() {
      this.getConsumptionList();
    }
  },

  methods: {
    getConsumptionList() {
      let params = {
        beginDay: this.statisticsForm.beginDay,
        endDay: this.statisticsForm.endDay,
        MinNum: this.statisticsForm.count,
        MaxNum: this.statisticsForm.MaxNum
      };
      api.getPeopleTotalNum(params).then(res => {
        this.resData = res.data;
      });
    }
  },

  computed: {
    ...mapGetters(["breadCrumbCodes"]),
    ServiceData() {
      let { totalAmount, serviceNum, peopleNum } = this.resData;
      return [
        {
          title: "服务量",
          number: serviceNum,
          text: "次",
          flag: true
        },
        {
          title: "消费金额",
          number: totalAmount,
          text: "元",
          flag: true
        },
        {
          title: "消费人数",
          number: peopleNum,
          text: "次",
          flag: true
        }
      ];
    }
  }
};
</script>

<style lang="less" scoped>
.order_content {
  height: 0.7rem;
  .post_container {
    width: 104%;
  }
}
</style>
