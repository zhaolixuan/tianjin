<template>
  <div class="older-content">
    <norm-layout text="探访服务记录排名" :flag="false" :routerPath="path"></norm-layout>
    <service-type :MedircalData="ServiceData" path="olderPage"></service-type>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceType from '@/views/OlderDistribution/components/ServiceType/index'
import api from '@/api/api.js'
export default {
  name: 'ReviewRank',
  data () {
    return {
      streetVisitMap: []

    }
  },
  props: {
    ageMap: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ServiceData () {
      return {
        title: this.streetVisitMap.map(v => v.streetName),
        data: this.streetVisitMap.map(v => v.visitTotal),
        label: true,
        labelWidth: 30
      }
    },
    path () {
      return {
        path: 'VisitingRecords',
        query: {}
      }
    }
  },
  created () {
    api.getStreetVisitInfo().then(res => {
      const { streetVisitMap } = res && res.data
      this.streetVisitMap = streetVisitMap && streetVisitMap.length >= 5 ? streetVisitMap.slice(0, 5).reverse() : streetVisitMap.reverse()
      console.log(this.streetVisitMap)
    })
  },
  components: {
    NormLayout,
    ServiceType
  }
}
</script>

<style lang="less" scoped>
.older-content {
  height: 2.9rem;
}
</style>
