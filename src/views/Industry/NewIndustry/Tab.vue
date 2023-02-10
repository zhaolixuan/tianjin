<template>
  <div class="h-tab">
    <ul class="h-tab_ul">
      <li :class="activeClass(index)" v-for="(item, index) of tabList" :key="index" @click="handleClick(item, index)">{{
        item.industryName }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HTab',
  props: {
    tabList: {
      type: Array,
      default: function () {
        return []
      }
    },
    activeIndex: {
      teype: Number,
      default: 0
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    handleClick (item, index) {
      if (index !== this.currentIndex) {
        this.currentIndex = index
        this.$emit('onClick', item, index)
      }
    }
  },
  computed: {
    activeClass () {
      return function (index) {
        if (this.currentIndex === index) {
          return 'h-tab_li active'
        }
        return 'h-tab_li'
      }
    }
  },
  watch: {
    activeIndex: {
      immediate: true,
      handler (val) {
        this.currentIndex = parseInt(val)
      }
    }
  }
}
</script>

<style lang="less">
  .h-tab {
    height: 100%;
    font-size: 0rem;
    .h-tab_li {
      display: inline-block;
      width: 1.6rem;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.16rem;
      text-align: center;
      color: #436fd2;
      background: url('../../../assets/img/btnbg.png') no-repeat;
			background-size: 1.6rem 0.45rem;
      margin-right: 0.2rem;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      &.active {
        background: url('../../../assets/img/bg1.jpg') no-repeat;
        background-size: 1.6rem 0.49rem;
        color: #8fc0f3;
        border: 1px solid #068ff9;
        box-sizing: border-box;
        animation: bgAnim 0.5s ease-in-out;
      }
    }
  }

  @keyframes bgAnim {
    from {
      opacity: 0.7;
    }
    to {
      opacity: 1;
    }
  }
</style>
