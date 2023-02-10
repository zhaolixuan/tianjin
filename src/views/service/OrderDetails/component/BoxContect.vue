<template>
  <div class="service_content">
    <nav class="service_content_item" v-for="i in contentData" :key="i.id">
      <div class="left-img">
        <img :src="i.catoryPicture" alt="" />
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
  props: {
    contentData: {
      Type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      value: "",
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
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
        flex: 1;
        justify-content: flex-end;
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
          margin-bottom: 10px;
        }
      }
    }
  }
  /deep/ .remarks {
    .van-cell__title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #000000;
    }
    .van-field {
      margin-top: 12px;
    }
    .total {
      .van-field__control {
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #e62c3b;
      }
    }
  }
}
</style>
