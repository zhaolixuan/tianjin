<template>
  <div class="company-list">
    <div v-for="(data,index) in companyListData" :key="index" class="company-box">
      <p class="company-title">{{data.name?data.name:'-'}}</p>
      <p class="company-content">
                <span class="company-text">
                    <span class="company-num">{{data.number&&data.number.toString().indexOf('.')!=-1?parseFloat(data.number).toFixed(2):data.number||0}}</span>
                    <span class="company-unit">/{{data.unit?data.unit:'-'}}</span>
                </span>
        <span class="company-rate">{{ratestr(data.ratio)}}<i :class="data.ratio>0?'icon-up':'icon-down'">{{data.ratio>0?'↑':'↓'}}</i></span>
      </p>
      <div class="top-left"></div>
      <div class="top-right"></div>
      <div class="bottom-left"></div>
      <div class="bottom-right"></div>
      <div class="light-line"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import api from '@/api/api'
  export default {
    data(){
      return {

      }
    },
    computed:{
      companyListData(){
        return this.$store.state.bigproject.companyListData
      }
    },
    created(){
      api.getZsTbDto().then(res=>{
        this.$store.commit('setCompanyListData',res.data || [])
        this.$store.commit('setRateData',res.datawarn || [])
      }).catch(error=>{
        console.log(error)
      });
    },
    methods:{
      ratestr:function(ratio){
        let ratestr = '同比';
        if(ratio){
          if(ratio>0){
            ratestr += '增长'+ratio*100+'%'
          } else {
            ratestr += '下降'+Math.abs(ratio)*100+'%'
          }
        } else {
          ratestr += ' -'
        }
        return ratestr
      }
    }
  }
</script>


<style scoped>
.company-list{
    width: 100%;
    display: flex;
    margin-bottom: 1%;
    height: 12.5%;
}
.company-list .company-box{
    flex: 1;
    border: .01rem solid rgba(0,157,255,0.5);
    color: #A5DCFF;
    padding: .8% .8% ;
    margin-right: 1%;
    position: relative;
    box-shadow: 0rem 0rem .30rem rgba(0,144,255,0.72) inset;
    background: rgba(15,126,255,0.05)
}
.company-list .company-box .light-line{
    width: 100%;
    height: .02rem;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url(../../../assets/img/light_line.png);
    position: absolute;
    top: -.01rem;
    left: 0rem;
}
.company-list .company-box .top-left{
    width: .16rem;
    height: .10rem;
    border-top: .02rem solid #00B2FF;
    border-left: .03rem solid #00B2FF;
    position: absolute;
    top: 0;
    left: 0;
}
.company-list .company-box .top-right{
    width: .16rem;
    height: .10rem;
    border-top: .02rem solid #00B2FF;
    border-right: .03rem solid #00B2FF;
    position: absolute;
    top: 0;
    right: 0;
}
.company-list .company-box .bottom-left{
    width: .16rem;
    height: .10rem;
    border-bottom: .02rem solid #00B2FF;
    border-left: .03rem solid #00B2FF;
    position: absolute;
    bottom: 0;
    left: 0;
}
.company-list .company-box .bottom-right{
    width: .16rem;
    height: .10rem;
    border-bottom: .02rem solid #00B2FF;
    border-right: .03rem solid #00B2FF;
    position: absolute;
    bottom: 0;
    right: 0;
}
.company-list .company-box:nth-last-child(1){
    margin-right:0;
}
.company-list .company-box .company-title{
    color: #A5DCFF;
    font-size: .18rem;
    line-height: .45rem;
    height: 30%;
}
.company-list .company-box .company-content{
    font-size: .18rem;
    height: 65%;
    position: relative;
    bottom: 0;
    left: 0;
}
.company-list .company-box .company-content .company-text{
    position: absolute;
    bottom: 0;
    left: 0;
}
.company-list .company-box .company-content .company-num{
    font-size: .30rem;
    font-weight: 800;
    color: #ECF4FF;
}
.company-list .company-box .company-content .company-unit{
    color: #ECF4FF;
    font-size: .18rem;
}
.company-list .company-box .company-content .company-rate{
    color: #BDD3F7;
    font-size: .14rem;
    position: absolute;
    bottom: .05rem;
    right: 0;
}
.company-list .company-box .company-content .company-rate i{
    font-style: normal;
    color: #F77678;
    margin-left: .05rem;
}
.company-list .company-box .company-content .company-rate .icon-down{
    color: rgb(127, 255, 159)
}
</style>
