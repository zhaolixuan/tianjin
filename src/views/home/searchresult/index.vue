<template>
  <div class="searchresult">
    <Box-header
      :headerData="serviceHeaderData"
      @handelActive="servicehandelActive"
      :activeHeader="activeHeader"
    />
    <div class="content">
      <div class="service" v-if="activeHeader == '服务'">
        <van-list v-model="loading1" :finished="finished" @load="onLoad">
          <div
            class="service_content_item"
            @click="checkDetail(i)"
            v-for="i in searchresultData"
            :key="i.id"
          >
            <div class="left-img">
              <img :src="i.mealsProjectPicture" alt="" />
            </div>
            <div class="right-box">
              <div>
                <p class="title">{{ i.mealsInfoName }}</p>
                <p class="info_price">￥{{ i.price }}</p>
              </div>
              <div>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </van-list>
      </div>
      <div class="consult padbox" v-else-if="activeHeader == '养老资讯'">
        <div
          class="consult_con"
          v-for="(item, index) in searchresultData"
          :key="index"
          v-on:click="handleGoDetails(item.articleId)"
        >
          <div class="imgbox">
            <!-- 存在数据用返回的真实数据渲染 -->
            <div v-if="item.files.length">
              <img
                :src="
                  item.files instanceof Array &&
                  item.files[0].url != '' &&
                  item.files[0].url
                "
                alt=""
              />
            </div>
            <!-- 某个tab返回的数据中没有图片链接 那就本地图片补充 -->
            <div v-else>
              <img src="~@/assets/images/home-activity-img-second.jpg" alt="" />
            </div>
            <span class="readingNum" v-if="item.numberRead"
              >{{ item.numberRead }}人读过</span
            >
            <span class="readingNum" v-else>33人读过</span>
            <span class="time">{{ item.createTime }}</span>
          </div>
          <div class="text">
            <p>{{ item.articleTitle }}</p>
            <img
              src="~@/assets/images/fenxiang.png"
              @click.stop="share"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="consult padbox" v-else>
        <div
          class="consult_con"
          v-for="(item, index) in searchresultData"
          :key="index"
          v-on:click="handleGoActivityDetails(item.id)"
        >
          <!-- have img -->
          <div class="imgbox" v-if="item.files.length">
            <img
              :src="
                item.files instanceof Array &&
                item.files[0].url != '' &&
                item.files[0].url
              "
              alt=""
            />
            <span class="readingNum"
              >{{ item.numberRead ? item.numberRead : "0" }}人读过</span
            >
            <span class="time">{{ item.publishTime }}</span>
          </div>
          <!-- not exist img use default img instead -->
          <div class="imgbox" v-else>
            <img src="~@/assets/images/home-activity-img-second.jpg" alt="" />
            <span class="readingNum">99人读过</span>
            <span class="time">2021-05-06</span>
          </div>
          <!-- content for text -->
          <div class="text">
            <p>{{ item.activeTitle }}</p>
          </div>
          <div class="information">
            <p>报名时间：{{ item.activeStartTime }}</p>
            <p>活动地点：{{ item.activeSite }}</p>
          </div>
        </div>
      </div>
      <van-empty v-if="!searchresultData.length" description="暂无内容" />
    </div>
  </div>
</template>

<script>
import BoxHeader from "./component/BoxHeader.vue";
import nativeShare from "@/mixin/nativeShare";
export default {
  mixins: [nativeShare],
  props: ["searchresultData", "loading", "finished"],
  data() {
    return {
      serviceHeaderData: ["服务", "养老资讯", "活动"],
      activeHeader: "服务",
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
  components: {
    BoxHeader,
  },
  watch: {},
  created() {},
  mounted() {
    this.$emit("setActiveHeader", this.activeHeader);
  },
  methods: {
    onLoad() {
      this.$emit("onLoad");
    },
    // 服务跳详情
    checkDetail(i) {
      this.$router.push({
        path: "/details",
        query: { id: i.mealsInfoId, category: i.typeName },
      });
    },

    handleGoDetails(id) {
      // 模拟进行传参 分别对应 home 首页养老资讯活动 1 和 2
      // this.$router.push({ path: "/articleDetails", query: { id: i } });
      this.$router.push({ path: "/articleDetails", query: { articleId: id } });
    },
    handleGoActivityDetails(id) {
      this.$router.push({ path: "/activityDetails", query: { id: id } });
    },
    servicehandelActive(i) {
      this.activeHeader = i;
      this.$emit("setActiveHeader", this.activeHeader);
    },
  },
};
</script>

<style scoped lang="less">
.searchresult {
  .content {
    padding-top: 53px;
  }
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
      .info_price {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #e62c3b;
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
      // margin-top: 20px;
      border-bottom: 1px solid #ccc;
      padding: 0px 14px 20px;

      .imgbox {
        width: 340px;
        height: 194px;
        position: relative;
        background: #ccc;
        img {
          position: absolute;
          left: 0;
          top: 0;
          width: 340px;
          height: 194px;
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
        img {
          width: 30px;
          height: 30px;
        }
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
}
</style>
