<template>
  <div class="main-bg">
    <!--<div class="nav_btn" @click="dialogVisible = true"></div>-->
    <!--<el-dialog :fullscreen="fullscreen" :visible.sync="dialogVisible">-->
      <!--<Navigation></Navigation>-->
    <!--</el-dialog>-->
     <Header></Header>
     <div class="wrapper">
       <MainWrapper></MainWrapper>
     </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/index'
import Header from '@/components/Header/index'
import MainWrapper from './MainWrapper/MainWrapper.vue'
export default {
  data () {
    return {
      dialogVisible: false,
      fullscreen: true
    }
  },
  methods: {

  },
  components: {
    Header,
    Navigation,
    MainWrapper
  }
}
</script>

<style>
.main-bg{
  background: url("../../assets/img/big_project_bg.gif") 50% 100% no-repeat;
  background-size: cover;
  height: 100%;
  overflow: hidden;
}
  .wrapper{
    width: 100%;
    height: 85%;
    position: relative;
  }
</style>
