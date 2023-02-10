<template>
  <div class="industry-left-wrapper">
    <div class="title" v-if="tabList.title">
      <p>{{ tabList.title }}</p>
      <i></i>
    </div>
    <ul>
      <li :class="activeClass(index)" v-for="(item, index) of tabList" :key="index" @click="handleClick(item, index)"><span>{{ item.title }}</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'leftWrapper',
  props: ['tabList'],
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    handleClick (item, index) {
      this.$emit('onClick', item, index)
      this.currentIndex = index
      this.$store.commit('setIndex', index)
    }
  },
  computed: {
    activeClass () {
      return function (index) {
        if (this.currentIndex === index) {
          return 'item-active'
        }
        return 'item'
      }
    }
  }
}
</script>

<style lang="less">
  .industry-left-wrapper {
    width: 2rem;
    font-size: 0.18rem;
    background:rgba(11, 65, 131, 0.3) ;
    .title {
      height: 0.85rem;
      line-height: 0.85rem;
      text-align: center;
      color: #87bdff;
      p {
        height: 0.83rem;
        font-size: .24rem;
      }
      i {
        display: block;
        height: 0.02rem;
        /*background: url('../../assets/img/tabImg/line.png');*/
        background-position: center;
      }
    }
    ul{
      padding-top: .2rem;
      li {
        cursor: pointer;
        height: .7rem;
        line-height: .7rem;
        text-align: center;
        span{
          display: block;
        }
      }
    }
    .item {
      color: #87bdff;
    }
    .item-active span{
      color: #ffffff;
      /*background: url('../../assets/img/tabImg/liActive.png') no-repeat;*/
      width: 1.89rem;
      height: .7rem;
      background-size:1.89rem .7rem;
      margin-left: .1rem;
    }
  }

</style>
