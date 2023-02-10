<template>
  <div class="myRating-container">
    <div class="content">
      <div
        class="content-item"
        v-for="(item, index) in ratingList"
        :key="index"
      >
        <img :src="item.catoryPicture" alt="" class="img" />
        <div class="item-left">
          <div class="item-info">{{ item.name }}</div>
          <div class="item-price-publish">
            <span class="item-price">￥{{ item.totalPrice }}</span>
            <van-button
              plain
              type="primary"
              class="publishRating"
              v-on:click="handleGoPublishRating(item.id, item.orderId)"
              >发布评价</van-button
            >
            <!-- item.id 是商品id item.orderId 是订单id -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNotEvaluatedListByid } from "@/api/mine";

export default {
  data() {
    return {
      ratingList: [],
    };
  },

  created() {},

  mounted() {
    // 订单 id
    this.getNotEvaluatedListByid(this.$route.query.id);
  },

  methods: {
    getNotEvaluatedListByid(id) {
      let params = {
        orderId: id,
      };
      getNotEvaluatedListByid(params).then((res) => {
        // console.log(res);
        this.ratingList = res.data;
      });
    },

    // 还是订单 id 159 的话 就有问题
    // 应该是 商品的 id
    // 当前就是商品 id
    handleGoPublishRating(id, orderId) {
      this.$router.push({
        path: "/postcomments",
        query: { id: id, orderId: orderId },
      });
    },
  },
};
</script>

<style scoped lang="less">
.content {
  background: #fff;
  .content-item {
    // height: 120px;
    padding: 19px 14px;
    display: flex;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    .img {
      height: 82px;
      width: 82px;
      // border: 1px solid green;
      margin-right: 18px;
    }
    .item-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .rate {
        display: flex;
        justify-content: flex-end;
      }
      .item-info {
        font-size: 17px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 24px;
        text-align: left;
      }
      .item-price-publish {
        height: 32px;
        display: flex;
        justify-content: space-between;
        .item-price {
          font-size: 20px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #e62c3b;
          line-height: 34px;
        }
        .publishRating {
          width: 95px;
          height: 34px;
          background: rgba(5, 177, 120, 0.05);
          border-radius: 17px;
          border: 1px solid #05b178;
        }
      }
    }
  }
}
</style>
