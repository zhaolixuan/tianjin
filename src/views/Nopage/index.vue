<template>
  <div class="blankInfo">{{info}}</div>
</template>
<script>
export default {
  computed: {
    info () {
      // eslint-disable-next-line eqeqeq
      return '404 找不到了'
    }
  }
}
</script>
<style scoped>
  .blankInfo {
    font-size: 30px;
    text-align: center;
    line-height: 500px;
  }
</style>
