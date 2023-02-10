<template>
  <div class="service_content">
    <nav class="service_content_item 1"
         v-for="i in shoppingCat"
         :key="i.id">
      <div class="left-img">
        <img v-if="i.catoryPicture"
             :src="i.catoryPicture"
             alt="" />
        <div v-else
             class="imgBox">{{i.name}}</div>
      </div>
      <div class="right-box">
        <p class="title">{{ i.name }}</p>
        <div class="info">
          <p class="info_type">{{ i.projectName }}</p>
          <p>
            <span class="info_price">￥{{ i.price }}</span>
            <span class="info_num">x{{ i.number }}</span>
          </p>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['shoppingCat'],
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    checkDetail(i) {
      this.$router.push({ path: '/serviceDetails', query: { id: i } })
    },
  },
}
</script>

<style scoped lang="less">
.service_content {
  .service_content_item {
    padding: 24px 0px;
    display: flex;
    justify-content: space-between;
    .left-img {
      width: 104px;
      height: 104px;
      background: #ccc;
      margin-right: 14px;
      img {
        width: 100%;
        height: 100%;
      }
      .imgBox {
        width: 100%;
        height: 100%;
        background: #05b178;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #fff;
      }
    }
    .right-box {
      width: 230px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 17px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        text-align: left;
      }
      .info {
        display: flex;
        flex-direction: column;
        p {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .info_price {
            font-size: 20px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #e62c3b;
          }
          .info_num {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.5);
          }
        }
        .info_type {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
}
</style>
