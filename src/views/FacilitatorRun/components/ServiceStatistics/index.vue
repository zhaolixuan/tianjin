<template>
  <div class="older-content">
    <div class="tab_cut">
      <p
        :class="[activeIndex === v ? 'active' : '']"
        v-for="(item,v) in tabData"
        :key="v"
        @click="handleCut(v)"
      >{{item}}</p>
    </div>
    <service-type :MedircalData="ServiceData"></service-type>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceType from '@/views/OlderDistribution/components/ServiceType/index'
export default {
  name: 'OldAge',
  data () {
    return {
      tabData: ['服务商服务量统计', '服务商消费金额统计'],
      activeIndex: 0
    }
  },
  props: {
    oldageMap: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ServiceData () {
      let { eightTotal, nineTotal, sevenTotal, sixTotal } =
        this.oldageMap || {}
      return {
        title: ['90岁以上', '80-90岁', '70-79岁', '60-69岁'],
        data: [nineTotal, eightTotal, sevenTotal, sixTotal],
        label: true,
        labelWidth: 30
      }
    }
  },
  methods: {
    handleCut (v) {
      this.activeIndex = v
    }
  },
  components: {
    NormLayout,
    ServiceType
  }
}
</script>

<style lang="less" scoped>
.older-content {
  height: 6.3rem;
  .tab_cut {
    width: 100%;
    height: 0.5rem;
    display: flex;
    p {
      width: 50%;
      line-height: 0.5rem;
      border: 1px solid #00cefe;
      font-size: 0.18rem;
      color: rgba(104, 244, 255, 0.7);
      padding-left: 0.1rem;
      opacity: 0.7;
    }
    .active {
      border: 1px solid #68f4ff;
      color: #68f4ff;
      opacity: 1;
    }
  }
}
</style>
