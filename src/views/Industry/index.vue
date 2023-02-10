<template>
  <div class="main-bg">
    <div class="nav_btn" @click="openDialog"></div>
    <el-dialog :fullscreen="fullscreen" :visible.sync="$store.state.navDialogVisible" >
      <Navigation></Navigation>
    </el-dialog>
    <Header></Header>
    <div class="wrapper">
      <IndustryList></IndustryList>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/index'
import IndustryList from './NewIndustry/IndustryList'
import Navigation from '@/components/Navigation/index'

export default {
  data () {
    return {
      // navDialogVisible: false,
      fullscreen: true
    }
  },
  created () {
    this.$store.commit('setActiveName', '智慧河西综合管理平台')
    this.$store.commit('setActiveKey', -1)
  },
  mounted () {
  },
  methods: {
    openDialog () {
      this.$store.commit('setNavDialogVisible', true)
    }
  },
  components: {
    Header,
    IndustryList,
    Navigation
  }
}
</script>

<style scoped>
.main-bg {
  background: url("../../assets/img/big_project_bg.gif") 50% 100% no-repeat;
  background-size: cover;
  height: 100%;
  overflow: hidden;
}
.wrapper {
  width: 100%;
  height: 86%;
  position: relative;
}
</style>
