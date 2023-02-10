<template>
  <div class="older-content">
    <norm-layout text="呼入呼出时间统计时间" :flag="false"></norm-layout>
    <time-statistics :incomeMap="incomeMap"></time-statistics>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import TimeStatistics from '../TimeStatistics/index'
export default {
  name: 'CallTime',
  computed: {
    incomeMap () {
      return {
        data: [21376, 5367, 1367],
        title: ['8:00-16:00', '16:00-00:00', '00:00-08:00'],
        top: 10
      }
    }
  },
  components: {
    NormLayout,
    TimeStatistics
  }
}
</script>

<style lang="less" scoped>
.older-content {
  height: 3.5rem;
}
</style>
