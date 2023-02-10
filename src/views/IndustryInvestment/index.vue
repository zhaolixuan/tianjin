<template>
  <div class="industryInvestment">
    <div class="nav_btn" @click="openDialog"></div>
    <el-dialog :fullscreen="fullscreen" :visible.sync="$store.state.navDialogVisible" >
      <Navigation></Navigation>
    </el-dialog>
    <Header></Header>
    <div class="industryInvestment-wrapper">
      <div class="right-side">
        <rightWrapper></rightWrapper>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/index'
import rightWrapper from './rightWrapper'
import Navigation from '@/components/Navigation/index'
export default {
  name: 'index',
  data () {
    return {
      fullscreen: true
      // navDialogVisible: false
    }
  },
  methods: {
    openDialog () {
      this.$store.commit('setNavDialogVisible', true)
    }
  },
  components: {
    Header,
    rightWrapper,
    Navigation
  }
}
</script>

<style lang="less">
  .industryInvestment{
    background: url("../../assets/img/big_project_bg.gif") 50% 100% no-repeat;
    background-size: cover;
    height: 100%;
    overflow: hidden;
    .industryInvestment-wrapper{
      display: flex;
      width: 97%;
      margin: 0 .3rem;
      .left-side{
        width: 2.4rem;
      }
      .right-side{
        flex:1;
      }
    }
  }

</style>
