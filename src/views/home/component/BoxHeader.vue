<template>
  <div class="box-header">
    <p
      v-for="i in headerData"
      :key="i"
      :class="activeHeader == i ? 'active' : ''"
      @click="handelActive(i)"
    >
      {{ i }}
    </p>
    <div @click="handelAll">查看全部 ></div>
  </div>
</template>

<script>
export default {
  props: {
    headerData: {
      Type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      activeHeader: "",
    };
  },
  watch: {
    activeHeader(i) {
      this.$emit("handelActive", i);
    },
  },
  methods: {
    handelActive(i) {
      this.activeHeader = i;
    },
    handelAll() {
      this.$emit("handelSeemore", this.activeHeader);
    },
  },
  mounted() {
    this.activeHeader = this.headerData[0];
  },
};
</script>

<style lang="less" scoped>
.box-header {
  display: flex;
  align-items: center;
  position: relative;
  padding: 15px 14px 0px;

  p {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    margin-right: 9px;
    color: rgba(0, 0, 0, 0.5);
  }
  .active {
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
  }
  div {
    position: absolute;
    right: 14px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(5, 177, 120, 0.61);
  }
}
</style>
