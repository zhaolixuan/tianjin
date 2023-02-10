<template>
  <div class="older-content">
    <norm-layout text="智能设备安装老年人" :flag="false"></norm-layout>
    <twoway-columnar :twoData="ServiceData"></twoway-columnar>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import TwowayColumnar from '../TwowayColumnar/index'
import IncomeSource from '@/views/BuffetPage/components/ConsumeChart/index'

export default {
  name: 'OldtypeInstall',
  data () {
    return {
      dls: []
    }
  },
  
  props: {
    chartsData: {
      type: Array,
      default: () => []
    },
    equipmentSexMap: {
      type: Array,
      default: () => []
    }
  },

  components: {
    NormLayout,
    TwowayColumnar,
    IncomeSource
  },

  computed: {
    ServiceData () {
      const createData = (sex) => this.chartsData.map((item, ind) => {
          // if(this.equipmentSexMap.length > 0) {
            if (item.sex === sex && this.equipmentSexMap.length && this.equipmentSexMap[ind].sex === sex) {
            let equipmentSexMap = Object.keys(this.equipmentSexMap[ind])
            Object.keys(item).forEach((ite, key) => {
              if (ite === equipmentSexMap[key] && (typeof (item[ite]) === 'number' && typeof (this.equipmentSexMap[ind][ite]) === 'number')) {
                item[ite] = item[ite] + this.equipmentSexMap[ind][ite]
              }
            })
            return item
          // }
        }
      })
      let installData = createData('女')
      installData.push(...createData('男'))
      const ObjectData = (data) => data.filter(item => item !== undefined)
      return ObjectData(installData)
    }
  }
}
</script>

<style lang="less" scoped>
.older-content {
  height: 3rem;
}
</style>
