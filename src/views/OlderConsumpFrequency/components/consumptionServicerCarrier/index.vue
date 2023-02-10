<template>
  <div class="servicer_carrier_container">
    <BoxHeader
      :headerList="headerList"
      class="header"
      :activeHeader="activeHeader"
      v-on:activeHeaderItem="activeHeaderItem"
    />
    <norm-layout text="" :flag="true" class="header_lay"></norm-layout>
    <BoxContent
      :activeHeader="activeHeader"
      :statisticsForm="statisticsForm"
      :count="count"
      :ispressSearchButton="ispressSearchButton"
    />
    <!-- more button -->
    <el-button class="btns" @click="handleGetMore">更多 》</el-button>
  </div>
</template>

<script>
import BoxHeader from "./boxHeader";
import BoxContent from "./boxContent";
import NormLayout from '@/views/OlderDistribution/components/NormLayout'

export default {
  data() {
    return {
      headerList: [
        {
          label: "老年人消费人群服务商分布",
          value: "0"
        },
        {
          label: "老年人消费群服务载体分布",
          value: "1"
        }
      ],
      activeHeader: "0"
      // statisticsForm: {},
      // count: 0
    };
  },

  props: {
    statisticsForm: {
      type: Object,
      default: () => {
        return {};
      }
    },

    count: {
      type: String,
    },

    // 重新拉数据处理
    ispressSearchButton: {
      type: Number
    },
  },

  watch: {
    // 监听值改变 重新调用接口 做刷新处理
    activeHeader() {
      if (this.activeHeader == 0) {
        console.log("OlderConsumeServerDistribution");
      } else {
        console.log("OlderConsumeServerCarrierDistribution");
      }
    }
  },

  // mounted() {
  //   this.statisticsForm = statisticsForm;
  //   this.count = count;
  // },

  methods: {
    activeHeaderItem(n) {
      this.activeHeader = n;
    },

    // judge and jump
    handleGetMore() {
      if (this.activeHeader == 0) {
        // 代替本窗口做法
        // this.$router.push({
        //   path: "/OlderConsumeServerDistribution",
        //   query: {
        //     beginDay: this.statisticsForm.beginDay,
        //     endDay: this.statisticsForm.endDay,
        //     num: this.count,
        //     classifyType: "service_point"
        //   }
        // });

        // 新窗口打开的做法
       this.$router.push({
          name:'OlderConsumeServerDistribution',
          query:{
            beginDay: this.statisticsForm.beginDay,
            endDay: this.statisticsForm.endDay,
            MinNum: this.statisticsForm.count,
            MaxNum: this.statisticsForm.MaxNum,
            classifyType: "service_point"
          }
        });

      } else {
        // 替代本窗口做法
        // this.$router.push({
        //   path: "/OlderConsumeServerCarrierDistribution"
        // });

        // 这个做新窗口打开
      this.$router.push({
          name:'OlderConsumeServerCarrierDistribution',
          query:{
            beginDay: this.statisticsForm.beginDay,
            endDay: this.statisticsForm.endDay,
            MinNum: this.statisticsForm.count,
            MaxNum: this.statisticsForm.MaxNum,
            classifyType: "merchant_name"
          }
        });

      }
    }
  },

  components: {
    BoxHeader,
    BoxContent,
    NormLayout
  }
};
</script>

<style lang="less" scoped>
.servicer_carrier_container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .header{
    z-index: 99;
    cursor: pointer;
  }
  .header_lay{
    margin-top: -20px;
  }
  .btns {
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    background-image: none;
    border: 1px solid #036798;
    background-color: #04263b;
    color: #fff;
  }
}
</style>
