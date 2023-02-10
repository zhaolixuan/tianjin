<template>
  <div class="older-content">
    <norm-layout
      text="服务载体服务量排行"
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
  components: {
    NormLayout,
    IncomeSource
  },

  computed: {
    path() {
      return {
        path: "ServiceCarrierOperation",
        query: {
          start: this.time ? formatTime(new Date(this.time[0])) : "",
          end: this.time ? formatTime(new Date(this.time[1])) : "",
          key: 1,
          type: 'money',
        }
      };
    },
    
    ServiceData() {
      this.serviceTypeMap.map(item => {
        if (String(item.merchantName).indexOf("居家养老服务中心") !== -1) {
          item.currentMonth = String(item.merchantName).replace(
            "居家养老服务中心",
            ""
          );
        } else if (String(item.merchantName).indexOf("居家养老服务点") !== -1) {
          item.currentMonth = String(item.merchantName).replace(
            "居家养老服务点",
            ""
          );
        } else if (String(item.merchantName).indexOf("社区服务点") !== -1) {
          item.currentMonth = String(item.merchantName).replace(
            "社区服务点",
            ""
          );
        } else if (String(item.merchantName).indexOf("居家养老服务站") !== -1) {
          item.currentMonth = String(item.merchantName).replace(
            "居家养老服务站",
            ""
          );
        }
        item.orderfreeCardTotal = item.merchantTotal;
      });
      let data = this.serviceTypeMap.slice(0, 8);

      // 数据是变化着的 这种方法不太适合 所以还是在上面的 map 中加入 居家养老服务站的判读
      // data.forEach(item => {
      //   if (item.currentMonth === "儒林园居家养老服务站") {
      //     item.currentMonth = "儒林园居家" + "\n" + "养老服务站";
      //   }else if(item.currentMonth === '先进里居家养老服务站') {
      //     item.currentMonth = "先进里" + "\n" + "居家养老服务站";
      //   }
      // });

      return {
        data: data.map(item => item.orderfreeCardTotal),
        title: data.map(item => item.currentMonth),
        top: 20,
        right: "1%"
      };
    }
  }
};
</script>

<style lang="less" scoped>
.older-content {
  height: 4.2rem;
}
</style>
