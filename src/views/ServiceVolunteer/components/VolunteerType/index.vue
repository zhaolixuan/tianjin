<template>
  <div class="older-content">
    <norm-layout text="志愿者人员类型"></norm-layout>
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
    volunteersTypeMap: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['breadCrumbCodes']),
    ServiceData () {
      const { volunteerTotal1, volunteerTotal2, volunteerTotal3, volunteerTotal4, volunteerTotal5, volunteerTotal6 } = this.volunteersTypeMap
      return [{
        title: '网格员',
        number: volunteerTotal2 || 0,
        text: '人',
        path: {
          path: 'VolunteerList',
          query: { volunteerType: '网格员' }
        }
      },
      // {
      //   title: '党员志愿者',
      //   number: volunteerTotal3 || 0,
      //   flag: true,
      //   text: '人',
      //   path: {
      //     path: 'VolunteerList',
      //     query: { volunteerType: '志愿者' }
      //   }
      // },
      {
        title: '社区党员',
        number: volunteerTotal4 || 0,
        flag: true,
        text: '人',
        path: {
          path: 'VolunteerList',
          query: { volunteerType: '社区党员' }
        }
      },
      {
        title: '老协成员',
        number: volunteerTotal5 || 0,
        text: '人',
        path: {
          path: 'VolunteerList',
          query: { volunteerType: '老协会长' }
        }
      },
      // {
      //   title: '楼栋长',
      //   number: volunteerTotal6 || 0,
      //   flag: true,
      //   text: '人'
      // },
      {
        title: '志愿者',
        number: volunteerTotal1 || 0,
        flag: true,
        text: '人',
        path: {
          path: 'VolunteerList',
          query: { volunteerType: '志愿者' }
        }
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
.older-content{
  height: 2.5rem;
}
</style>
