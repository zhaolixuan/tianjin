<template>
  <div class="older-content">
    <div class="content-top">
      <norm-layout text="探访服务情况"></norm-layout>
      <message-item :ServiceData="ServiceData"  lineNumber="three"></message-item>
    </div>
    <!-- <div class="content-bottom">
      <p>回访核查真实性：</p>
      <work-map :realReta="visitReturnMap.realReta"></work-map>
    </div> -->
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import MessageItem from '@/views/OlderDistribution/components/MessageItem/index'
import WorkMap from '../WaterPoloMap/index.vue'

import { mapGetters } from 'vuex'
export default {
  name: 'ReviewSituation',
  props: {
    visitReturnMap: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['breadCrumbCodes']),
    ServiceData () {
      const { visitTimeTotal, visitTotal, visitWeekTotal } = this.visitReturnMap
      return [{
        title: '探访次数',
        number: visitTotal || 0,
        flag: true,
        text: '次'
      },
      {
        title: '近三十天探访次数',
        number: visitTimeTotal || 0,
        flag: true,
        text: '次'
      },
      {
        title: '近七天探访次数',
        number: visitWeekTotal || 0,
        flag: true,
        text: '次'
      }
      ]
    }
  },
  components: {
    NormLayout,
    MessageItem,
    WorkMap
  }
}
</script>

<style lang="less" scoped>
.older-content{
  min-height: 1.7rem;
  .content-top{
    height: 1.4rem;
  }
  .content-bottom{
    height: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    color: #fff;
    font-size: .18rem;
    font-weight: bold;
  }
}
</style>
