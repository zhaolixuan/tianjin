<template>
  <div class="jd_card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.jd_card {
  padding: 0.2rem;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0rem .02rem .06rem .01rem rgba(4, 38, 72, 0.039);
  opacity: 1;
}
</style>
