<template>
  <div>
    <!-- 不可点击 -->
    <a v-if="menu.notclick" class="menu_link notclick" @mouseenter="handleMouseEnter(menu)" @mouseleave="handleMouseLeave(menu)">
      {{menu.alias || menu.title}}
    </a>
    <!-- 跳转外链 -->
    <a v-else-if="menu.type && menu.type=='goto'" :href="menu.href?menu.href:''" class="menu_link" target="_blank" @mouseenter="handleMouseEnter(menu)" @mouseleave="handleMouseLeave(menu)">
      {{menu.alias || menu.title}}
    </a>
    <!-- 跳转内部路由 -->
    <router-link v-else class="menu_link" :to="{ path: '/' + menu.href?menu.href:'' }" @mouseenter.native="handleMouseEnter(menu)" @mouseleave.native="handleMouseLeave(menu)" @click.native="handleClick(menu)">
      {{menu.alias || menu.title}}
    </router-link>
  </div>
</template>

<script>
export default{
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleMouseEnter (menu) {
      this.$emit('mouseenter', menu)
    },
    handleMouseLeave (menu) {
      this.$emit('mouseleave', menu)
    },
    handleClick (menu) {
      this.$emit('click', menu)
    }
  }
}
</script>

<style scoped>
.menu_link{
  color: #43DDED;
  text-decoration: none;
}
.notclick{
  color: rgb(81, 143, 150);
  cursor: not-allowed;
}
</style>
