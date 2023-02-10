<template>
  <div class="rating_details">
    <div class="rating_from">
      <div class="avator_box">
        <!-- 返回接口少头像字段 -->
        <img :src="ratingDetailsFromApiObj.catoryPicture" alt="" />
      </div>
      <div class="name_and_time">
        <div class="name">{{ ratingDetailsFromApiObj.personalName }}</div>
        <div class="time">{{ ratingDetailsFromApiObj.appraiseTime }}</div>
      </div>
      <div class="rate_level">
        <van-rate v-model="ratingDetailsFromApiObj.levels" color="#FF9C27" />
      </div>
    </div>
    <div class="rating_content_box">
      <div class="rating_text_box">
        {{ ratingDetailsFromApiObj.remarks }}
      </div>
      <div class="rating_pic_box">
        <div class="pic_item">
          <img
            v-for="i in ratingDetailsFromApiObj.orderAppraiseFileList"
            :key="i.id"
            :src="i.url"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAppraiseDetailById } from "@/api/mine.js";

export default {
  name: "RatingDetails",
  data() {
    return {
      ratingDetailsFromApiObj: {},
    };
  },

  mounted() {
    this.getAppraiseDetailById(this.$route.query.id);
  },

  methods: {
    getAppraiseDetailById(id) {
      let params = {
        appraiseId: id,
      };
      getAppraiseDetailById(params).then((res) => {
        // console.log(res);
        if (res.code && res.code == 200) {
          this.ratingDetailsFromApiObj = res.data;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.rating_details {
  background-color: #fff;
  padding: 15px 14px;
  // height: 100vh;
  display: felx;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .rating_from {
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .avator_box {
      display: flex;
      height: 50px;
      width: 50px;
      margin-right: 14px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name_and_time {
      width: 160px;
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .name {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 25px;
        letter-spacing: 1px;
      }
      .time {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        line-height: 20px;
        text-align: left;
      }
    }
  }
  .rating_content_box {
    margin-top: 17px;
    .rating_text_box {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 25px;
      text-align: left;
    }
    .rating_pic_box {
      margin-top: 20px;
      .pic_item {
        width: 347px;
        margin-bottom: 4px;
        img {
          width: 100%;
          height: 100%;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
