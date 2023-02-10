<template>
  <div class="older-content">
    <norm-layout text="养老人才队伍" path="ProvideTalents"></norm-layout>
    <message-item :ServiceData="ServiceData" lineNumber="three"></message-item>
  </div>
</template>

<script>
import NormLayout from '../NormLayout'
import MessageItem from '../MessageItem/index'
import { mapGetters } from 'vuex'
export default {
  name: 'ProviedTalens',
  props: {
    collectionPersonMap: {
      type: Object,
      default: () => {}
    },
    baseInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['breadCrumbCodes']),
    ServiceData () {
      return [
        {
          title: '家庭医生',
          number: this.breadCrumbCodes.length <= 1 ? 690 : 0,
          text: '名',
          flag: true,
          line: true
        },
        {
          title: '网格员',
          number: this.collectionPersonMap.gridPersonTotal,
          text: '名',
          line: true,
          flag: true,
          path: {
            path: 'NewReseau',
            query: { code: this.breadCrumbCodes, title: '河西区居家养老管理平台' }
          }
        },
        {
          title: '志愿者',
          number: this.baseInfo.returnBaseTotalmap.isAloneTotal,
          text: '名',
          flag: true
        }
      ]
    }
  },
  components: {
    NormLayout,
    MessageItem
  }
}
</script>

<style lang="less" scoped>
.older-content {
  height: 1.4rem;
}
</style>
