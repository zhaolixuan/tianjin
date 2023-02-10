<template>
  <div class="rate-list">
    <div class="row-line"></div>
    <div v-for="(item,index) in rateData" :key="index" class="rate-box">
      <div class="rate-content">
        <p class="rate-name">{{item.name?item.name:'-'}}</p>
        <p class="rate-ratio">
          <span class="rate-number">{{item.number&&item.number.toString().indexOf('.')!=-1?parseFloat(item.number).toFixed(2):item.number||0}}</span>
          <span class="rate-unit">{{item.unit?item.unit:'-'}}</span>
        </p>
      </div>
      <div v-if="index<rateData.length-1" class="right-line"></div>
    </div>
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
        rateData(){
            return this.$store.state.bigproject.rateData
        },
    }
}
</script>

<style scoped>
.rate-list{
    display: flex;
    padding-top: .16rem;
    padding-bottom: .4rem;
    position: relative;
}
.rate-list .row-line{
    width: 100%;
    height: .02rem;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url(../../../assets/img/row_line.png);
    position: absolute;
    bottom: 0px;
    left: 0px;
}
.rate-list .rate-box{
    flex: 1;
    font-size: .14rem;
    color: #A5DCFF;
    position: relative;
}
.rate-list .rate-box .rate-content{
    width: 50%;
    position: relative;
    left: 50%;
    transform: translate(-50%)
}
.rate-list .rate-box .rate-ratio{
    color: #ECF4FF;
}
.rate-list .rate-box .rate-number{
    font-size: .3rem;
}
.rate-list .rate-box .rate-text i{
    font-style: normal;
    color: #F77678;
}
.rate-list .rate-box .right-line{
    width: .02rem;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url(../../../assets/img/col_line.png);
    position: absolute;
    right: 0px;
    top: 0px;
}
</style>


