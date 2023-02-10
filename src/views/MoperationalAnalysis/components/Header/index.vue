<template>
  <div class="header">{{ title }}</div>
</template>

<script>
export default {
  data() {
    return {
      title: "河西区居家养老服务中心运营统计分析"
    };
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 0.75rem;
  background-color: #fff;
  border-radius: 0.3rem;
  text-align: center;
  line-height: 0.75rem;
  box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.1);
  opacity: 1;
  font-size: 42px;
  font-family: PingFang SC-Medium, PingFang SC;
  font-weight: 500;
  color: #000000;
}
</style>
