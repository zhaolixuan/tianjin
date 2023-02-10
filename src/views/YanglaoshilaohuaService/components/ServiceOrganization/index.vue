<template>
  <div class="older-content">
    <norm-layout text="适老化入户改造"
                 path="YanglaoshilaohuaList"></norm-layout>
    <message-item :ServiceData="ServiceData"
                  lineNumber="three"></message-item>
  </div>
</template>

<script>
import NormLayout from '../NormLayout'
import MessageItem from '../MessageItem/index'
import { mapGetters } from 'vuex'
export default {
  name: 'ServiceOrganization',
  props: {
    serviceAgencyMap: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(['breadCrumbCodes']),

    ServiceData() {
      let data = [
        // {
        //   title: '改造目标数',
        //   number:
        //     this.serviceAgencyMap.modifyTargetCount > 0
        //       ? this.serviceAgencyMap.modifyTargetCount
        //       : 0,
        //   text: '户',
        //   line: true,
          
        // },
        
        {
          title: '改造完成',
          number:
            this.serviceAgencyMap.modifyingCount > 0
              ? this.serviceAgencyMap.modifyingCount
              : 0,

          text: '户',
          line: true,

          path: {
            name: 'YanglaoshilaohuaList',
            query: {
              code: this.breadCrumbCodes,
              // title: '居家养老服务载体分布',
              // canteenlevel: '服务站',
            },
          },
        },
        {
          title: '安装项目数',
          number:
            this.serviceAgencyMap.projectCount > 0
              ? this.serviceAgencyMap.projectCount
              : 0,

          text: '个',
          line: true,
        },
        {
          title: '改造金额',
          number:this.serviceAgencyMap.projectTotalMoney,
          text: '元',
          animation:false
          
        },
        {
          title: '补贴金额',
          number:this.serviceAgencyMap.subMoney,
          text: '元',
          animation:false
          
        },
      ]
      return data
    },
  },
  components: {
    NormLayout,
    MessageItem,
  },
}
</script>

<style lang="less" scoped>
.older-content {
  height: 1.7rem;
}
</style>
