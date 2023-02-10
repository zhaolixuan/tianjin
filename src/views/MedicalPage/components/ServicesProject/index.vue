<template>
  <div class="older-content">
    <norm-layout text="服务项目"></norm-layout>
    <service-charts :SpiritsData="ServiceData" :minHeight="true"></service-charts>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceCharts from '../ServicesCharts/index'
export default {
  name: 'ServicesProject',
  props: {
    serviceObjectNumMap: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      projectObj:{
        serContentData:[],
        serNumData:[],
      }
    }
  },
  computed: {
    ServiceData () {
      let Data = this.serviceObjectNumMap ? this.serviceObjectNumMap[0] : {}
      let data = [
        Data ? Data.serviceContentTotale : 0,
        Data ? Data.serviceContentTotald : 0,
        Data ? Data.serviceContentTotalc : 0,
        Data ? Data.serviceContentTotalb : 0,
        Data ? Data.serviceContentTotala : 0
      ]
      this.projectObj.serContentData = data;
      let serNumData = [
        Data ? Data.serviceContentTotalePeople : 0,
        Data ? Data.serviceContentTotaldPeople : 0,
        Data ? Data.serviceContentTotalcPeople : 0,
        Data ? Data.serviceContentTotalbPeople : 0,
        Data ? Data.serviceContentTotalaPeople : 0
      ];
      this.projectObj.serNumData = serNumData;
      return this.projectObj;
    }
  },
  components: {
    NormLayout,
    ServiceCharts
  }
}
</script>

<style lang="less" scoped>
.older-content {
  height: 3.1rem;
}
</style>
