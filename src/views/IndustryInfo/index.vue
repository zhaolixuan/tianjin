<template>
  <div class="main-bg">
    <div class="nav_btn" @click="openDialog"></div>
    <el-dialog :fullscreen="fullscreen" :visible.sync="$store.state.navDialogVisible" >
      <Navigation></Navigation>
    </el-dialog>
    <Header></Header>
    <div class="wrapper">
      <IndustryInfo></IndustryInfo>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Header from '@/components/Header/index'
import IndustryInfo from './IndustryInfo/IndustryInfo'
import Navigation from '@/components/Navigation/index'
export default {
  data() {
    return {
      fullscreen: true,
    }
  },
  created() {
    this.$store.commit('setActiveName', '靶向企业画像')
    this.$store.commit('setActiveKey',-1)
  },
  methods: {
    openDialog () {
      this.$store.commit('setNavDialogVisible', true)
    },
  },
  components: {
    Header,
    IndustryInfo,
    Navigation
  }
}
</script>

<style scoped>
  .main-bg{
    background: url("../../assets/img/big_project_bg.gif") 50% 100% no-repeat;
    background-size: cover;
    height: 100%;
    overflow: hidden;
  }
  .wrapper{
    width: 100%;
    height: 88%;
    position: relative;
  }
</style>
