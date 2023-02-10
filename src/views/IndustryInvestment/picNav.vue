<template>
  <div class="picNav-wrapper">
    <div class="pic-data-wrapper">
      <section class="picbox" v-for="(item,index) in picData" :key="index">
        <div class="left">
          <img :src="item.directionUrl" :title="item.direction">
        </div>
        <div class="right">
          <div class="imgWrapper" v-for="(_item,_index) in item.industryDirections" :key="_index" >
            <div class="imgcell" @click="goToProjectList(_item.industryCode,_item.name)">
              <img :src="_item.diurl" class="one" :title="_item.name">
              <img :src="_item.gaourl" class="two" :title="_item.name">
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Api from '@/api/api'
export default {
  data () {
    return {
      picData: []
    }
  },
  created () {
    this.getPicNavList(1)
  },
  methods: {
    // 获取图片菜单
    getPicNavList (id) {
      Api.getPicList({id})
        .then(res => {
          if (res && res.obj.length > 0) {
            this.picData = res.obj
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    goToProjectList (parentId, childName) {
      this.$router.push({path: 'Industry', query: { parentId, childName, key: 5 }})
    }
  }
}
</script>

<style lang="less">
  .picNav-wrapper{
    font-size: .14rem;
    color: #8fc0f3;
    height: 9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .pic-data-wrapper{
      .picbox{
        margin-bottom: .3rem;
        display: flex;
        justify-content: center;
        .left{
          margin: auto 0;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .right{
          background: url('../../assets/img/navbg22.png') no-repeat;
          background-size: 100% 100%;
          min-width: 3rem;
          max-width: 6rem;
          min-height: 1rem;
          /*border: 1px solid #0454c9;*/
          transform: skew(-30deg);
          text-align: center;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          .imgWrapper{
            transform: skew(30deg);
            cursor: pointer;
            flex: none;
            .imgcell{
              width: 1.2rem;
              img{
              }
              .one{
                display: block;
              }
              .two{
                display: none;
              }
            }
          }
          .imgWrapper:hover .one{
            display: none;
          }
          .imgWrapper:hover .two{
            display: block;
          }
        }
      }
    }
  }
</style>
