<template>
  <div class="server_info_container">
    <!-- <Notice /> -->
    <BaseForm />
  </div>
</template>

<script>
// import Notice from "./components/BaseNotice/index";
import BaseForm from "./components/BaseForm/index";

export default {
  data() {
    return {};
  },
  components: {
    // Notice,
    BaseForm,
  },
};
</script>

<style lang="less" scoped>
.server_info_container {
  background-color: #f6f6f6;
}
</style>
