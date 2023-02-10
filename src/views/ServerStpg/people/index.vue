<template>
      <div class="server_info_container">
    <!-- <Notice /> -->
    <BaseForm />
  </div>
</template>
<script>
    import BaseForm from "./components/BaseForm/index";
export default {
    components: {
    // Notice,
    BaseForm,
  },
}
</script>

<style lang="less" scoped>
.server_info_container {
  background-color: #f6f6f6;
}
</style>