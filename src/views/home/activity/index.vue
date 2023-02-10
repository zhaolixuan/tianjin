<template>
  <div class="consult padbox">
    <div
      class="consult_con"
      v-for="(item, index) in activityList"
      :key="index"
      v-on:click="handleGoToActivityDeatils(item.id)"
    >
      <div class="imgbox">
        <img v-if="item.files.length" :src="item.files[0].url" alt="" />
        <span class="readingNum"
          >{{ item.numberRead ? item.numberRead : "0" }}人读过</span
        >
      </div>
      <!-- <div class="imgbox" v-else>
        <img src="../../../assets/images/home-activity-img-second.jpg" alt="" />
        <span class="readingNum"
          >{{ item.numberRead ? item.numberRead : "0" }}人读过</span
        >
      </div> -->
      <div class="text">
        <p>{{ item.activeTitle }}</p>
      </div>
      <div class="information">
        <p>报名时间：{{ item.activeStartTime }} -- {{ item.activeEndTime }}</p>
        <p>活动地点：{{ item.activeSite }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getActiveList } from "@/api/home.js";

export default {
  data() {
    return {
      activityList: [],
      initiator: null,
    };
  },

  mounted() {
    if (this.$route.query && this.$route.query.initiator) {
      this.initiator = this.$route.query.initiator;
    }
    this.getActiveListData();
  },

  methods: {
    handleGoToActivityDeatils(id) {
      this.$router.push({
        path: "/activityDetails",
        query: { id: id },
      });
    },

    getActiveListData() {
      let params = {
        initiator: this.initiator,
      };
      getActiveList(params).then((res) => {
        if (res.code && res.code == 200 && res.data) {
          this.activityList = res.data;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.consult {
  .consult_tab {
    display: flex;
    align-items: center;
    margin-top: 15px;
    padding: 0px 14px;
    p {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      margin-right: 9px;
      color: rgba(0, 0, 0, 0.5);
      margin-right: 20px;
    }
    .active {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
    }
  }
  .consult_con {
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
    padding: 0px 14px 20px;

    .imgbox {
      width: 340px;
      height: 194px;
      position: relative;
      background: #ccc;
      img {
        width: 100%;
        height: 100%;
      }
      span {
        position: absolute;
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
      }
      .readingNum {
        bottom: 7px;
        left: 16px;
      }
      .time {
        bottom: 7px;
        right: 10px;
      }
    }
    .text {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      align-items: center;
      p {
        width: 281px;
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        line-height: 22px;
        text-align: left;
      }
      i {
        margin-right: 5px;
      }
    }
    .information {
      margin-top: 14px;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.6);
      text-align: left;
      line-height: 20px;
    }
  }
}
</style>
