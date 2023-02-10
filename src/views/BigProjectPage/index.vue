<template>
  <div class="bigproject_bg">
    <div class="nav_btn" @click="openDialog"></div>
    <el-dialog :fullscreen="fullscreen" :visible.sync="$store.state.navDialogVisible" >
      <Navigation></Navigation>
    </el-dialog>
    <Header></Header>
    <div class="wrapper">
        <ProjectWrapper></ProjectWrapper>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Header from '@/components/Header/index'
import ProjectWrapper from './BigProjectWrapper/ProjectWrapper'
import Navigation from '@/components/Navigation/index'
export default {
    name: "project",
    data (){
      return {
        // navDialogVisible: false,
        fullscreen: true
      }
    },
    created () {
      this.$store.commit('setActiveName', '智慧河西综合管理平台')
      this.$store.commit('setActiveKey',-1)
    },
    methods:{
      openDialog () {
        this.$store.commit('setNavDialogVisible', true)
      }
    },
    components:{
      Header,
      ProjectWrapper,
      Navigation
    }
}
</script>

<style>
.bigproject_bg{
    background: url(../../assets/img/big_project_bg.jpg) 50% 100% no-repeat;
    background-size: cover;
    height: 100%;
    overflow: hidden;
}
.wrapper{
    width: 100%;
    height: 89%;
    position: relative;
}
</style>
