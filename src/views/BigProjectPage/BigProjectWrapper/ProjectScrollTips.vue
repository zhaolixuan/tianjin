<template>
  <div class="scroll-tips">
    <p class="scroll-content">
      <span class="scroll-head">○</span>
      <marquee class="scroll-text" behavior="scroll" direction="left" >
                <span v-for="(data,index) in scrollData" :key="index">
                    <i>{{data.name}}</i>
                    <i style="margin-left:.2rem">当前阶段：{{data.projectStatus?data.projectStatus:'-'}}</i>
                    <i style="margin-left:.2rem">事件时间：{{data.projectDate?data.projectDate:'-'}}</i>
                </span>
      </marquee>
    </p>
  </div>
</template>

<script>
/* eslint-disable */
  import api from '@/api/api'
  export default {
    data() {
      return {

      }
    },
    computed:{
      scrollData(){
        return this.$store.state.bigproject.scrollData
      }
    },
    created(){
      api.getZsWarnDtos().then(res=>{
        this.$store.commit('setScrollData',res.zsWarnDetails || [])
      }).catch(error=>{
        console.log(error)
      });
    }
  }
</script>

<style scoped>
i{
    font-style: normal
}
.scroll-tips{
    /* width: 40%; */
    font-size: .14rem;
    color: #a5dcff;
}
.scroll-content{
    overflow: hidden;
    padding: .1rem .2rem;
}
.scroll-head{
    display: inline-block;
    font-size: .2rem;
    margin-right: .05rem;
}
.scroll-text{
    line-height: .18rem;
    width: 90%;
    display: inline-block;
    white-space: nowrap;
}
.scroll-text span{
    margin-right: 100%;
}
</style>

