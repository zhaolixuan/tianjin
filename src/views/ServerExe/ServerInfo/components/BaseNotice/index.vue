<template>
  <div class="notice_container">
    {{ noticeInfo }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeInfo: "完善您的个人信息，验证您所在的服务机构，方便您的服务",
    };
  },
};
</script>

<style lang="less" scoped>
.notice_container {
  height: 70px;
  background: #ff7927;
  padding: 7px 11px 9px 12px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 27px;
  text-align: left;
}
</style>
