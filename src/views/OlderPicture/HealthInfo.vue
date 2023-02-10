<template>
  <div class="healthwrapper">
    <ListTable :title="title" :icon="icon" :infoData="infoData" :listData="secondInfoData||{}"></ListTable>
  </div>
</template>

<script>
import ListTable from "./common/ListTable";
import { formatTime } from '@/utils/utils';

export default {
  props: {
    listData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      title: "健康档案",
      icon: "iconyiliaojiankang",
      infoData: [
        {
          title: "个人档案编号",
          key: "number"
        },
        {
          title: "建档时间",
          key: "jdDate"
        },
        {
          title: "体检编号",
          key: "tjNo"
        },
        {
          title: "高血压",
          key: "gxyDate"
        },
        {
          title: "糖尿病",
          key: "tnbDate"
        },
        {
          title: "精神病",
          key: "jsbDate"
        },
        {
          title: "肢体残疾",
          key: "ztcjDate"
        },
        {
          title: "其他重要疾病",
          key: "otherIllness"
        },
        {
          title: "是否签约",
          key: "isSign"
        },
        // {
        //   title: "街道",
        //   key: "communityName"
        // },
        {
          title: "责任医生",
          key: "doctor"
        }
      ]
    };
  },

  components: {
    ListTable
  },
  
  computed: {
    secondInfoData() {
      let listData = this.listData;
      for(var k in listData) {
        if(k == 'gxyDate' && listData[k]) {
          console.log(listData[k]);
          listData[k] = ' √ 患病时间:  ' + formatTime(new Date(listData[k]));
        }else if(k == 'tnbDate' && listData[k]) {
          listData[k] = ' √ 患病时间:  ' + formatTime(new Date(listData[k]));
        }else if(k == 'jsbDate' && listData[k]) {
          listData[k] = ' √ 患病时间:  ' + formatTime(new Date(listData[k]));
        }else if(k == 'ztcjDate' && listData[k]) {
          listData[k] = ' √ 患病时间:  ' + formatTime(new Date(listData[k]));
        }else if(k == 'otherIllness' && listData[k]) {
          listData[k] = ' √ 患病种类:  ' + listData[k];
        }
      }
      return listData;
    },
  },
  // mounted(){
  //   console.log(formatTime(new Date('2021-12-21')));
  // },
};
</script>

<style scoped>
.healthwrapper {
  position: absolute;
  top: 1.25rem;
  right: 0.77rem;
  width: 4rem;
}
</style>