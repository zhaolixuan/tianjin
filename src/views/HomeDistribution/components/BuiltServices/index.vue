<!--
 * @Description: fileContent
 * @Author: diaolili
 * @Date: 2021-04-27 15:30:21
-->
<template>
  <div class="older-content">
    <norm-layout text="居家养老服务类别"></norm-layout>
    <message-item :ServiceData="ServiceData" lineNumber="one" :flag="flag"></message-item>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import MessageItem from '@/views/OlderDistribution/components/MessageItem/index'
import { mapGetters } from 'vuex'
export default {
  name: 'BuiltService',
  props: {
    serviceMealMap: {
      type: Object,
      default: () => {}
    }
  },
  data(){
    return {
      flag: 'BuiltService',
    }
  },
  computed: {
    ...mapGetters(['breadCrumbCodes']),
    ServiceData () {
      return [
        {
          title: '助餐服务类',
          icon: 'meals'
        },
        {
          title: '生活照料类',
          icon: 'take'
        },
        {
          title: '助医服务类',
          icon: 'medicl'
        },
        {
          title: '托养床位类',
          icon: 'raise'
        },
        {
          title: '其他服务类',
          icon: 'other'
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
  height: 5.5rem;
}
</style>
