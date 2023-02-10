<template>
  <span class="header-item">
    <img v-if="icon" :src="iconPath" />
    <span>{{ label }}</span>
  </span>
</template>

<script>
export default {
  name: 'HeaderItem',
  props: {
    label: [String],
    icon: [String]
  },
  computed: {
    iconPath () {
      return require(`@/views/ProvideAged/assets/icons/${this.icon}.png`)
    }
  }
}
</script>

<style lang="less" scoped>
.header-item {
  display: flex;
  align-items: center;
  margin-right: 0.119rem;
  font-size: 0.17rem;

  img {
    margin-right: 8px;
    height: 0.142rem;
  }
}
</style>
