<template>
  <div class="main_list">
    <div class="line_top"></div>
    <ul>
      <li><p>{{gdp.sumName}}</p><p class="list_num"><b>{{gdp.sum}}</b>{{gdp.sumUnit}}</p></li>
      <li><p>{{gdp.orderName}}</p><p class="list_num">第 <b>{{gdp.order}}</b> 名</p></li>
      <li><p>{{gdp.fixedAssetsName}}</p><p class="list_num"><b>{{gdp.fixedAssets}}</b>{{gdp.fixedAssetsUnit}}</p></li>
      <li><p>{{gdp.populationName}}</p><p class="list_num"><b>{{gdp.population}}</b>{{gdp.populationUnit}}</p></li>
    </ul>
    <div class="line_bottom"></div>
  </div>
</template>
<script>
//* eslint-disable */
import { fetch } from '@/api/base'
export default {
  data () {
    return {
      data: {}
    }
  },
  created () {
    const _$ = this
    fetch('/api/data', {})
      .then(function (data) {
        _$.data = data.data || {}
      })
  },
  computed: {
    gdp () {
      return this.data.gdp || {}
    }
  }
}
</script>
<style scoped>
  .main_list{
    position: relative;
  }
  .main_list ul{
    display: flex;
    height: 16%;
    color: #B1DFFF;
    background-image: radial-gradient(50% 107%, rgba(0,40,102,0.11) 52%, rgba(7,64,154,0.18) 100%);
    border: 1px solid rgba(0,177,255,0.12);
  }
  .main_list ul li{
    flex: 1;
    text-align: center;
    width:25%;
    font-size: .18rem;
    margin:0 0.8%;
    position: relative;
    background: url("../../../assets/img/gdp_line.png") right .3rem no-repeat;
    padding:.3rem 0;
  }
  .main_list ul li:last-child{
    background: none;
  }
  .main_list ul li p b{
    font-size: .3rem;
    color: #36FFFE ;
  }
  .list_num{
    color: #36FFFE ;
    margin-top: .1rem;
  }
  .line_top,.line_bottom{
    position: absolute;
    width: 100%;
    height:1px;
    background: -webkit-radial-gradient(rgba(31,172,255,0.6),rgba(0,65,135,0.5), rgba(31,172,255,0.3));
    background: -o-radial-gradient(rgba(31,172,255,0.6),rgba(0,65,135,0.5), rgba(31,172,255,0.3));
    background: -moz-radial-gradient(rgba(31,172,255,0.6),rgba(0,65,135,0.5), rgba(31,172,255,0.3));
    background: radial-gradient(rgba(31,172,255,0.6),rgba(0,65,135,0.5), rgba(31,172,255,0.3));
  }
  .line_top{
    top: 0;
    left: 0;
  }
  .line_bottom{
    bottom: 0;
    left: 0;
  }
</style>
