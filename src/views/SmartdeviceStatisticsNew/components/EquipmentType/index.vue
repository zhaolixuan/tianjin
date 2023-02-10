<template>
  <div class="older-content">
    <norm-layout text="智能设备类型" :flag="false"></norm-layout>
    <message-item :ServiceData="ServiceData"></message-item>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import MessageItem from '@/views/OlderDistribution/components/MessageItem/index'
import { mapGetters } from 'vuex'
export default {
  name: 'EquipmentWarning',
  props: {
    equipmentData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['breadCrumbCodes']),
    ServiceData () {
      let { deviceopenTotal, equipmentTotal } = this.equipmentData
      let data = [
        {
          title: '一键通设备',
          number: deviceopenTotal,
          text: '个',
          line: true,
          // flag: false
          path: {
            path: 'EquipmentList',
            query: {
              code: this.breadCrumbCodes, title: '智能设备检测大数据统计分析'
            }
          }
        },
        {
          title: '门磁设备',
          number: equipmentTotal,
          text: '个',
          line: false,
          // flag: false
          path: {
            path: 'TheagedGateList',
            query: { code: this.breadCrumbCodes, title: '智能设备监测大数据统计分析' }
          }
        }
      ]
      return data
    }
  },
  components: {
    NormLayout,
    MessageItem
  }
}
</script>

<style lang="less" scoped>
.older-content{
  height: 2rem;
}
</style>
