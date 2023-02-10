<template>
  <div class="rate_content">
    <div class="rate_item" v-for="(item,index) in rateText" :key="index">
      <p class="rate_text">{{item.label}}</p>
      <el-rate v-model="item.value" class="rate_icon" :colors="rateColor"></el-rate>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserRate',
  data () {
    return {
      rateColor: ['#FF5600', '#FF5600', '#FF5600', '#FF5600', '#FF5600']
    }
  },
  props: {
    rateText: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.rate_content {
  height: 1.5rem;
  padding-left: 0.2rem;
}
.rate_item {
  display: flex;
  height: 0.4rem;
  align-items: center;
}
.rate_text {
  width: 25%;
  color: #4fd0ff;
  text-align: right;
  font-size: 0.15rem;
  padding-top: 0.1rem;
}
.el-rate {
  margin-left: 0.3rem;
}
.el-rate /deep/ .el-rate__icon {
  font-size: 0.35rem !important;
  margin-right: 0.3rem;
}
.el-rate /deep/ .el-icon-star-off{
  opacity: 0.3;
 color: #FF8400!important;
}
</style>
