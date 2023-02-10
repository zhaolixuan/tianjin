<template>
  <div class="consult_list">
    <!-- <div class="consult_list_title">
      <div>
        <p
          @click="active = '新闻动态'"
          :class="active == '新闻动态' ? 'active' : ''"
        >
          新闻动态
        </p>
      </div>
      <div>
        <p
          @click="active = '最新政策'"
          :class="active == '最新政策' ? 'active' : ''"
        >
          最新政策
        </p>
      </div>
    </div> -->
    <div class="consult_list_title">
      <div
        v-for="(item, index) in activeList"
        :key="index"
        @click="handleChangeItem(item, index)"
        :class="['list_item', active == item.name ? 'active' : '']"
      >
        <span>
          {{ item.name }}
        </span>
      </div>
    </div>
    <div class="consult padbox">
      <div
        class="consult_con"
        v-for="(item, index) in dataList"
        :key="index"
        v-on:click="handleGoArticleByid(item.articleId)"
      >
        <div class="imgbox">
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
          <div v-else>
            <img src="../../../assets/images/home-news.jpg" alt="" />
          </div>
          <span class="readingNum">阅读数：{{ item.numberRead }} 人次</span>
          <span class="time">{{ item.createTime }}</span>
        </div>
        <div class="text">
          <p>{{ item.articleTitle }}</p>
          <img
            src="../../../assets/images/fenxiang.png"
            @click.stop="share"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getConsultList } from "@/api/home.js";
import nativeShare from "@/mixin/nativeShare";
export default {
  mixins: [nativeShare],
  name: "",
  data() {
    return {
      active: "",
      activeList: [
        {
          id: 0,
          name: "新闻动态",
        },
        {
          id: 1,
          name: "最新政策",
        },
      ],
      dataList: [],
      policyList: [],
    };
  },
  watch: {
    active(n) {
      this.getConsultListData();
    },
  },
  mounted() {
    this.active = this.$route.query.activeTab;
  },

  methods: {
    getConsultListData() {
      // 这个组件内试了加上下面的参数返回空数组
      let params = {
        articleColumn: this.active,
      };
      getConsultList(params).then((res) => {
        if (res.code && res.code == 200) {
          this.dataList = res.data;
        }
      });
    },
    handleChangeItem(item) {
      this.active = item.name;
    },

    // 全部资讯页 点击某条 资讯 查看详情
    handleGoArticleByid(id) {
      this.$router.push({
        path: "/articleDetails",
        query: {
          articleId: id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.consult_list {
  .consult_list_title {
    background: #fff;
    height: 53px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    .list_item {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      width: 93px;
      height: 100%;
      margin-right: 91px;
      color: #000;
      span {
        width: 72px;
        height: 25px;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        line-height: 25px;
      }
    }
    div:nth-child(2) {
      margin-right: 0px;
    }
    .active {
      color: #049464;
      border-bottom: 3px solid #049464;
    }
  }
  .consult {
    margin-top: 6px;
    .consult_con {
      border-bottom: 1px solid #ccc;
      padding: 17px 14px 20px;

      .imgbox {
        width: 340px;
        height: 194px;
        position: relative;
        background: #ccc;
        img {
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
