<template>
  <div class="older-content">
    <norm-layout text="一键通预警" :flag="false"></norm-layout>
    <message-item :ServiceData="ServiceData" lineNumber="three"></message-item>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import MessageItem from '@/views/OlderDistribution/components/MessageItem/index'
import { mapGetters } from 'vuex'
export default {
  name: 'EquipmentWarning',
  props: {
    warningMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['breadCrumbCodes']),
    ServiceData () {
      let data = [
        {
          title: '预警次数',
          number: 14,
          text: '次',
          line: true,
          flag: true
        },
        {
          title: '待处理',
          number: 55,
          text: '个',
          line: true,
          flag: true
        },
        {
          title: '已处理',
          number: 33,
          text: '个',
          flag: true
        }
      ]
      data.map((item, index) => {
        item.title = this.warningMap.length > 0 ? this.warningMap[index].warningWorks : item.title
        item.number = this.warningMap.length > 0 ? this.warningMap[index].warningTotal : 0
      })
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
  height: 1.4rem;
}
</style>
