<template>
  <div class="search-box">
    <van-field
      class="search-content-box"
      v-model="serachContent"
      center
      clearable
      placeholder="请输入您要查询的老人"
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

      <template >
        <van-button type="primary" class="search-btns" @click="button">
       
          新增名单</van-button
        >
      </template>
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
       console.log(this.serachContent);
      this.$emit("handleChangeText", this.serachContent);
    },button(){
         this.$router.push({
        path: "/slhgz-add",
   
      });
    }
  },
};
</script>

<style lang="less" scoped>
.search-box {
  padding: 8px 10px;
  display: flex;
  align-items: center;
  background: #fff;
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
}  .search-btns {
      height: 30px;
      background: linear-gradient(180deg, #0cd9b0 0%, #05b178 100%);
     // border-radius: 15px;
     
      display: flex;
      align-items: center;
      padding: 3px;
      justify-content: space-around;
      margin-right: 10px;
      margin-left: 10px;
      .van-button__content {
        width: 100%;
      }
      .van-button__text {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;
        letter-spacing: 2px;
       
      }
    }
</style>
