<template>
  <div class="older-content">
    <norm-layout
      text="服务载体消费金额排行"
      :flag="false"
      :routerPath="path"
    ></norm-layout>
    <income-source :incomeMap="ServiceData"></income-source>
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import IncomeSource from "@/views/BuffetPage/components/ConsumeChart/index";
import { formatTime } from "@/utils/utils";

export default {
  name: "ServiceOperation",
  props: {
    serviceTypeMap: {
      type: Array,
      default: () => []
    },
    time: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    path() {
      return {
        path: "ServiceCarrierOperation",
        query: {
          start: this.time ? formatTime(new Date(this.time[0])) : "",
          end: this.time ? formatTime(new Date(this.time[1])) : "",
          key: 1,
          type: 'amount',
        }
      };
    },
    ServiceData() {
      this.serviceTypeMap.map(item => {
        item.currentMonth =
          String(item.merchantName).length > 8
            ? String(item.merchantName).slice(0, 6) +
              "\n" +
              String(item.merchantName).slice(6, 12) +
              "\n" +
              String(item.merchantName).slice(12, 20)
            : String(item.merchantName);
        item.orderfreeCardTotal = item.consumeMoney;
      });
      let data = this.serviceTypeMap.slice(0, 6);
      return {
        data: data.map(item => item.orderfreeCardTotal),
        title: data.map(item => item.currentMonth),
        top: 20,
        right: "1%"
      };
    }
  },
  components: {
    NormLayout,
    IncomeSource
  }
};
</script>

<style lang="less" scoped>
.older-content {
  height: 4.2rem;
}
</style>
