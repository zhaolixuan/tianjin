<template>
  <div class="older-content">
    <norm-layout text="居家养老服务监管"></norm-layout>
    <div class="older-tab">
      <p :class="[activeIndex === index ? 'tab_item active' : 'tab_item']" v-for="(item,index) in tabData" :key="index" @click="handleTab(index)">{{item}}</p>
    </div>
    <service-type v-if="activeIndex === 1" :MedircalData="MedircalData"></service-type>
    <user-rate v-if="activeIndex === 0" :rateText="rateText"></user-rate>
  </div>
</template>

<script>
import NormLayout from '../NormLayout'
import ServiceType from '../ServiceType/index'
import UserRate from '../UserRate/index'
export default {
  name: 'OlderSubsidy',
  data () {
    return {
      tabData: ['评价', '监管方式'],
      activeIndex: 0,
      rateText: [{label: '服务人员着装', value: 5}, {label: '服务人员态度', value: 5}, {label: '服务质量', value: 5}]
    }
  },
  methods: {
    handleTab (index) {
      this.activeIndex = index
    }
  },
  computed: {
    MedircalData () {
      return {
        title: ['用户APP评价', '电话评价', '现场评价'],
        data: [71300, 32800, 148000]
      }
    }
  },
  components: {
    NormLayout,
    ServiceType,
    UserRate
  }
}
</script>

<style lang="less" scoped>
.older-content{
  height: 2.3rem;
  .older-tab{
    width: 100%;
    height: .3rem;
    display: flex;
    padding-left: .4rem;
    .tab_item{
      width: .8rem;
      height: .25rem;
      border: 1px solid #00CEFE;
      text-align: center;
      line-height: .25rem;
      color: rgba(79,208,255,0.70);
      font-size: .15rem;
      opacity: 0.6;
    }
    .active{
      border: 1px solid #68F4FF;
      color: #68F4FF;
      opacity: 1;
    }
  }
}
</style>
