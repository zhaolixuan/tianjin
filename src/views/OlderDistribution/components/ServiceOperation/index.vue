<template>
  <div class="older-content">
    <norm-layout text="居家养老三大服务"  unit="客次"></norm-layout>
    <div class="older-tab">
      <p :class="[activeIndex === index ? 'tab_item active' : 'tab_item']" v-for="(item,index) in tabData" :key="index" @click="handleTab(index)">{{item}}</p>
    </div>
    <institutions-instance :SpiritsData="ServiceData" :minHeight="true"></institutions-instance>
  </div>
</template>

<script>
import NormLayout from '../NormLayout'
import InstitutionsInstance from '../InstitutionsInstance/index'
export default {
  name: 'ServiceOperation',
  data () {
    return {
      tabData: ['助餐', '助医', '家政'],
      activeIndex: 0
    }
  },
  props: {
    serviceSupportMap: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleTab (index) {
      this.activeIndex = index
    }
  },
  computed: {
    ServiceData () {
      return this.serviceSupportMap[this.activeIndex]
    }
  },
  components: {
    NormLayout,
    InstitutionsInstance
  },
  // this file had been studied at 20210817
}
</script>

<style lang="less" scoped>
.older-content{
  height: 3.2rem;
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
