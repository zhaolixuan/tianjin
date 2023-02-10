<template>
  <div class="search-box">
    <van-field
      class="search-content-box"
      v-model="serachContent"
      center
      clearable
      placeholder="请输入您也要查询的养老机构"
      v-on:change="handleChangeText"
      @clear="handleChangeText"
    >
      <template #button>
        <van-button type="primary" class="search-btn">
          <van-icon name="search" />
          搜索</van-button
        >
      </template>
    </van-field>
  </div>
</template>

<script>
export default {
  name: "searchBox",
  data() {
    return {
      serachContent: "",
    };
  },

  methods: {
    handleChangeText() {
      // console.log(this.serachContent);
      this.$emit("handleChangeText", this.serachContent);
    },
  },
};
</script>

<style lang="less" scoped>
.search-box {
  padding: 8px 10px;
  display: flex;
  align-items: center;
  .search-content-box {
    flex: 1;
    background: rgba(4, 72, 57, 0.07);
    border-radius: 19px;
    height: 37px;
    /deep/ .van-field__control {
      background: transparent;
    }
    .search-btn {
      height: 24px;
      background: linear-gradient(180deg, #0cd9b0 0%, #05b178 100%);
      border-radius: 15px;
      width: 74px;
      display: flex;
      align-items: center;
      padding: 0;
      justify-content: space-around;
      margin-right: 10px;
      .van-button__content {
        width: 100%;
      }
      .van-button__text {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;
        letter-spacing: 2px;
        .van-icon {
          margin-right: 9px;
        }
      }
    }
  }
}
</style>
