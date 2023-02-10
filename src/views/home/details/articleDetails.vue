<template>
  <div class="article-details-container">
    <div>
      <div class="details_header">{{ detailsListData.articleTitle }}</div>
      <div class="header_middle">
        <span class="time">{{ detailsListData.createTime }}</span>
        <span class="share" @click="share">
          <i class="el-icon-share"></i>分享</span
        >
      </div>
      <div v-if="detailsListData.articleFileAddress" class="article_pic">
        <img :src="detailsListData.articleFileAddress" alt="" />
      </div>
      <div
        class="article_content"
        v-html="detailsListData.articleContent"
      ></div>
    </div>
  </div>
</template>

<script>
import { getArticleDetalisByarticleId } from "@/api/home.js";
import nativeShare from "@/mixin/nativeShare";
export default {
  mixins: [nativeShare],
  data() {
    return {
      detailsListData: {},
    };
  },

  mounted() {
    // console.log(this.$route.query.articleId);
    this.getArticleDetails();
  },

  methods: {
    getArticleDetails() {
      let params = {
        articleId: this.$route.query.articleId,
      };
      getArticleDetalisByarticleId(params).then((res) => {
        if (res.code && res.code == 200) {
          this.detailsListData = res.data;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.article-details-container {
  background-color: #fff;
  padding: 20px 16px 20px 17px;
  .details_header {
    height: 56px;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
    line-height: 28px;
    text-align: left;
  }
  .header_middle {
    height: 31px;
    margin-top: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .time {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
      line-height: 25px;
    }
    .share {
      margin-right: -16px;
      width: 91px;
      height: 31px;
      background: #ff9c27;
      border-radius: 100px 0px 0px 100px;
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 31px;
      .el-icon-share {
        margin-right: 5px;
      }
    }
  }
  .article_pic {
    margin-top: 17px;
    width: 342px;
    height: 182px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .article_content {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 28px;
    text-align: left;
  }
}
</style>
