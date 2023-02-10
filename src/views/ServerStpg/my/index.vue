<template>
  <div class="server_info_container">
    <!-- <Notice /> -->
    <BaseForm />
    <div class="gohome">
      <el-button @click="goStpgHome"
                 class="home-butt">返回首页</el-button>
    </div>
  </div>
</template>
<script>
import BaseForm from './components/BaseForm/index'
export default {
  components: {
    // Notice,
    BaseForm,
  },
  mounted() {
  },
  methods: {
  
    goStpgHome() {
      this.$router.push({
        name: 'ServeStpgHome',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.server_info_container {
  height: calc(100vh - 68px);
  background-color: #fff;
  position: relative;
  .gohome {
    position: absolute;
    bottom: 47px;
    left: 15px;
    right: 15px;
    height: 44px;
    .home-butt {
      background: linear-gradient(
        269.22deg,
        rgba(11, 185, 127, 1) 0%,
        rgba(21, 216, 151, 1) 100%
      );
      height: 44px;
      width: 100%;
      border-radius: 4px;
      box-shadow: 0 0 4px 0 rgba(6, 122, 84, 0.1);
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>