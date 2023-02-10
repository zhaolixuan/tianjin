<template>
  <div class="main-bg">
    <div class="consume_bg">
      <div class="consume_bg_img"></div>
      <div class="consume_layer consume_layer_left"></div>
      <div class="consume_layer consume_layer_right"></div>
    </div>
    <Consume></Consume>
    <Map :cityType="0"></Map>
  </div>
</template>

<script>
import Consume from './Components/Consume'
import Map from './Components/Map'
export default {
  data () {
    return {

    }
  },
  components: {
    Consume,
    Map
  }
}
</script>

<style>
  .main-bg {
    height: 100%;
  }
  .consume_bg{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
  }
  .consume_bg_img{
    position: absolute;
    top: 0;
    left: 0;
    background: url("Components/img/index_bg.png") 50% 100% no-repeat;
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
    z-index: 0;
  }
  .consume_layer{
    height: 100%;
    width: 32.5%;
    background: rgba(0,0,0,0.3);
    position: absolute;
    z-index: -1;
    filter: blur(50px);
  }
  .consume_layer_left{
    left:0;
  }
  .consume_layer_right{
    right:0;
  }
</style>
