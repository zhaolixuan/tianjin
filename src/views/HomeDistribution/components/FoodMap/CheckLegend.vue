<template>
  <div class="look_container">
    <div class="tip_item" v-for="(item,v) in TipData" :key="v" @click="handleShow(item,v)">
      <img
        :src="require(`@/views/OlderDistribution/assets/img/${item.icon}.png`)"
        class="tip_img"
        alt
      />
      <span>{{item.text}}</span>
      <div class="tip_look">
        <img :src="require(`@/views/OlderDistribution/assets/img/${item.show?'look_true':'look_false'}.png`)"
             alt=""
             @click="changeStatus(item,v)">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CheckLegend',
  data () {
    return {
      TipData: [
        { text: '街级', icon: 'jj1', show: true },
        { text: '社区级', icon: 'sqj1', show: true },
        { text: '服务站', icon: 'fwd1', show: true }
        // {text: '残疾人', icon: 'tip_pink', show: true}
      ],
      obj: {},
      timer: null
    }
  },
  methods: {
    changeStatus (item, index) {
      if (item.show) {
        item.show = false
      } else {
        item.show = true
      }
      // 如果是街道或者社区级别
      if (this.typeNew >= 2) {
        this.$emit('addPieChart', this.legendData)
      } else {
        // 如果是河西区级别
        this.$emit('checkShowHexiQu', index + 1, item.show)
      }
    },
    getLegendData () {
      return this.TipData
    },
    handleShow (item, index) {
      item.show
        ? (this.TipData[index].show = false)
        : (this.TipData[index].show = true)
      this.obj = {
        label: item.text,
        show: this.TipData[index].show
      }
      this.$emit('checkShow', this.TipData)
    }
  },
  computed: {
    ...mapGetters(['typeNew', 'codeNew']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0]

      return params
    }
  },
  watch: {
    typeNew (val) {
      this.timer = setTimeout(() => {
        this.$emit('checkShow', this.TipData)
      }, 1000)
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
.look_container {
  width: 1.9rem;
  height: 2.5rem;
  // background: url("~@/views/OlderDistribution/assets/img/look-legend_bg.png");
  background-repeat: repeat;
  background-size: contain;
  position: absolute;
  bottom: 5%;
  left: 1%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 0.33rem;
  padding-left: 0.33rem;
  z-index: 99;
  .tip_item {
    font-size: 0.15rem;
    color: #ffffff;
    margin-bottom: 0.15rem;
    display: flex;
    align-items: center;
    .tip_img {
      width: 0.24rem;
      height: 0.24rem;
      margin-right: 0.14rem;
    }
    .tip_look {
      width: 0.22rem;
      height: 0.15rem;
      margin-left: 0.1rem;
      img{
        width: 100%;
        height: 100%;
      }
      :hover {
        cursor: pointer;
      }
    }
  }
}
</style>
