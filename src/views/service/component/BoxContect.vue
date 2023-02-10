<template>
  <div class="service_content">
    <van-list v-model="loading1" :finished="finished" @load="onLoad">
      <nav
        class="service_content_item"
        @click="checkDetail(i)"
        v-for="i in serviceContentData"
        :key="i.id"
      >
        <div class="left-img">
          <img :src="i.mealsProjectPicture" alt="" />
        </div>
        <div class="right-box">
          <div>
            <p class="title">{{ i.mealsInfoName }}</p>
            <p class="address">{{ i.address }}</p>
          </div>
          <div>
            <!-- <span>社区：{{ i.mealsInfoName }}</span> -->
            <!-- <span>级别：社区级</span> -->
            <span></span>
            <span></span>
          </div>
          <!-- <div class="info">
            <p class="info_type">营养早餐</p>
            <p>
              <span class="info_price">￥19.00</span>
              <span class="info_num">已售1000</span>
            </p>
          </div> -->
        </div>
      </nav>
    </van-list>
  </div>
</template>

<script>
export default {
  props: {
    serviceContentData: {
      Type: Array,
      default: () => {
        return [];
      },
    },
    loading: {
      Type: Boolean,
      default: () => {
        return false;
      },
    },
    finished: {
      Type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      loading1: false,
    };
  },
  watch: {
    loading(n) {
      if (!n) {
        this.loading1 = false;
      }
    },
  },
  created() {},
  mounted() {},
  methods: {
    onLoad() {
      this.$emit("onLoad");
    },
    checkDetail(i) {
      this.$router.push({
        path: "/details",
        query: { id: i.mealsInfoId, category: i.typeName },
      });
    },
  },
};
</script>

<style scoped lang="less">
.service_content {
  .service_content_item {
    padding: 24px 14px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
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
      text-align: left;
      .title {
        font-size: 17px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
      }
      .address {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 8px;
      }
      div {
        display: flex;
        flex-direction: column;
      }
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
}
</style>
