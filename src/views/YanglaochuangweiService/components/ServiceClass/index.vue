<!--
 * @Author: ext.zhangfengyuan ext.zhangfengyuan@jd.com
 * @Date: 2022-08-25 15:41:48
 * @LastEditors: ext.zhangfengyuan ext.zhangfengyuan@jd.com
 * @LastEditTime: 2022-10-28 15:16:30
 * @FilePath: \tianjin\src\views\YanglaochuangweiService\components\ServiceClass\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="older-content">
    <norm-layout text="服务类型统计" :flag="false"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '@/views/BuffetPage/components/ServiceChart/index'
export default {
  name: 'ServiceClass',
  props: {
    serviceSortMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
     // let { sortTotala, sortTotalb, sortTotalc, sortTotald, sortTotale } = this.serviceSortMap || []
  let data = [
        // {name: '其他服务类', value: sortTotale},
        // {name: '托养床位类', value: sortTotald},
        // {name: '助医服务类', value: sortTotalc},
        // {name: '生活照料类', value: sortTotalb},
        // {name: '助餐服务类', value: sortTotala}
      ]
	  this.serviceSortMap.forEach((item)=>{
		data.push({name:item.serviceType,value:item.totalCount})
		})

    
      return {
        data,
        radius: ['47%', '55%'],
        center: ['50%', '50%'],
        title: '服务类别',
        itemStyle: {
          borderWidth: 5,
          borderColor: '#031831'
        },
        colors: [
          {start: '#1887FE', end: '#18E7FE'},
          {start: '#62FEEF', end: '#45EB9D'},
          {start: '#CC4E32', end: '#FF876C'}
        ],
        formatter: '{b|{b}：}\n{c|{c}次} {d|{d}%}'
      }
    }
  },
  components: {
    NormLayout,
    ServiceChart
  }
}
</script>

<style lang="less" scoped>
.older-content {
  height: 2.8rem;
}
</style>
