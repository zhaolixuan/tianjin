<template>
  <div class="older-content">
    <norm-layout text="志愿者服务队伍"></norm-layout>
    <message-item :ServiceData="ServiceData"  lineNumber="three"></message-item>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import MessageItem from '@/views/OlderDistribution/components/MessageItem/index'
import { mapGetters } from 'vuex'
export default {
  name: 'SmartDevice',
  props: {
    volunteersTeamMap: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['breadCrumbCodes']),
    ServiceData () {
      let data = []
      const { teamTotal, volunteerTotal, peopleTotal } = this.volunteersTeamMap
      data = [{
        title: '志愿者服务队伍',
        number: teamTotal || 0,
        text: '个',
        path: {
          path: 'VisitingTeam',
          query: { code: this.breadCrumbCodes }
        }
      },
      {
        title: '志愿者服务人数',
        number: volunteerTotal || 0,
        flag: true,
        text: '人'
      },
      {
        title: '探访老人数',
        number: peopleTotal || 0,
        flag: true,
        text: '人'
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
  height: 1.5rem;
}
</style>
