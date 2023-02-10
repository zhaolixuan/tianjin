<template>
  <div class="title_box">
    <div class="dis_title" v-if="status">{{info.title}}</div>
    <div class="worker_container" >
      <dl v-for="item in info.list" :key="item.id" :class="{isStyle:ss}">
        <dt>
          <img :src="require(`@/views/Distribution/assets/icons/${item.icon}.png`)" class="icon" alt="norm-icon">
        </dt>
        <dd>
          <p>{{item.name}}</p>
          <p><span>{{item.sum}}</span>{{item.unit?item.unit:"人"}}</p>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  name: 'topTile',
  props: ['info'],
  data () {
    return {

    }
  },
  created () {
  },
  computed: {
    status () {
      if (this.info.title) {
        return true
      }
    },
    ss () {
      if (this.info.list.length == 1) {
        return true
      }
    }

  }
}
</script>
<style lang="less" scoped >
  .title_box{
    height: 0.5rem;
    display: flex;
    margin-bottom: 0.3rem;
    // align-items: center;
    // justify-content: center
  }
  .dis_title{
    width: 30%;
    height: 0.5rem;
    text-align: center;
    line-height: 0.4rem;
    color: rgba(201, 238, 255, 1);
    font-size: 0.2rem;

  }
.worker_container{
  width: 70%;
  flex:1;
  height: 0.4rem;
  margin-top: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding:0 0.1rem;
  dl{
      display: flex;
      flex:1;
      align-items: center;
      justify-content: center;
      dt{
          width:0.2rem;
          border-radius: 50%;
          margin-right: 0.11rem;
            img{
              width: 0.35rem;
              height: 0.35rem;
            }
          }
        dd{
            line-height: 0.18rem;
            font-size: 0.13rem;
            margin-left: 10px;
            margin-top: 0.0.8rem;
            color: rgba(201, 238, 255, 1);
          }
    }

}
.worker_container .isStyle{
  justify-content:flex-start;
  padding-left: 0.15rem;

}
</style>
