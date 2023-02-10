<template>
  <div class="older-content">
    <norm-layout text="全区公共区域适老化改造"
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
  name: 'OlderSubsidy',
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
      {
          title: '适老化公园改造',
          number:
            this.serviceAgencyMap.parkCount > 0
              ? this.serviceAgencyMap.parkCount
              : 0
           
            ,
          text: '个',
          line: true,
          path: {
            // name: 'HomeDistribution',
            // 10月27日更改为跳到下面这个列表页 并携带 街道码 和 canteenlevel 载体级别
            name: 'YanglaoshilaohuaParkList',
            // query: {
            //   code: this.breadCrumbCodes,
            //   title: '居家养老服务载体分布',
            //   canteenlevel: '街级',
            // },
          },
        },
        {
          title: '福一把、楼道休息椅改造小区',
          number:
            this.serviceAgencyMap.fuyibaComminity > 0
              ? this.serviceAgencyMap.fuyibaComminity
              : 0
              ,
          text: '个',
          line: true,
          // path: {
          //   // name: 'HomeDistribution',
          //   // 10月27日更改为跳到下面这个列表页 并携带 街道码 和 canteenlevel 载体级别
          //   name: 'YanglaoshilaohuaList',
          //   // query: {
          //   //   code: this.breadCrumbCodes,
          //   //   title: '居家养老服务载体分布',
          //   //   canteenlevel: '街级',
          //   // },
          // },
        },
        {
          title: '福一把、楼道休息椅改造楼栋',
          number: this.serviceAgencyMap.fuyibaTower > 0
              ? this.serviceAgencyMap.fuyibaTower
              : 0
              ,
          text: '万栋',
          line: true,
          // path: {
          //   name: 'YanglaoshilaohuaList',
          //   // query: {
          //   //   code: this.breadCrumbCodes,
          //   //   title: '居家养老服务载体分布',
          //   //   canteenlevel: '社区',
          //   // },
          // },
        // },
        // {
        //   title: '福一把改造小区',
        //   number:560
        //     // this.serviceAgencyMap.length > 0
        //     //   ? this.serviceAgencyMap[3].canteenCount
        //     //   : 0
        //       ,
        //   text: '个',
        //   path: {
        //     name: 'ServiceCarrier',
        //     query: {
        //       code: this.breadCrumbCodes,
        //       title: '居家养老服务载体分布',
        //       canteenlevel: '服务站',
        //     },
        //   },
        // },{
        //   title: '福一把改造楼栋',
        //   number:1.6
        //     // this.serviceAgencyMap.length > 0
        //     //   ? this.serviceAgencyMap[3].canteenCount
        //     //   : 0
        //       ,
        //   text: '万',
        //   path: {
        //     name: 'ServiceCarrier',
        //     query: {
        //       code: this.breadCrumbCodes,
        //       title: '居家养老服务载体分布',
        //       canteenlevel: '服务站',
        //     },
        //   },
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
  height: 2.5rem;
}
</style>
