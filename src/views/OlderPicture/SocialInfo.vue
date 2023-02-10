<template>
  <div class="socialwrapper">
    <ListTable :title="title" :icon="icon" :infoData="infoData" :listData="listData||{}"></ListTable>
  </div>
</template>

<script>
import ListTable from "./common/ListTable";
export default {
  props: {
    listData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      title: "社保数据",
      icon: "iconshebaoshuju",
      infoData: [
        //需求 2022/4/11 更改
        {
          title:"待遇类别",
           key:"type"
        },
         {
           title:"退休金额",
           key:"paidinAmount"
        },
        {
          title: "退休日期",
          key: "retireDate"
        },
        {

          title: "开始年月", 
          key: "startTime"
        },
        {
        
          title: "发放年月", 
          key: "sendTime"
        }
        // {
        //   title: "单位名称",
        //   key: "unitName"
        // },
      //  {
      //     // title: "参加工作时间",
      //     title: "开始年月", // 2022年4月11需求修为这个title
      //     key: "joinworkDate"
      //   },
        // {
        //   title: "工龄（月）",
        //   key: "workAges"
        // },
        // {
        //   title: "养老待遇",
        //   key: "pensionMoney"
        // }
      ]
    };
  },
  components: {
    ListTable
  }
};
</script>

<style scoped>
.socialwrapper {
  position: absolute;
  bottom: 0.5rem;
  right: 0.77rem;
  width: 4rem;
}
</style>