<template>
  <div class="comments">
    <div class="comments_top">
      <div class="score">
        <p>评分</p>
        <van-rate
          v-model="value"
          readonly
          color="#FF9C27"
          void-icon="star"
          void-color="#ccc"
        />
        <span>{{ value.toFixed(1) }}</span>
      </div>
      <div class="type">
        <nav
          v-for="i in typeLsit"
          :key="i.name"
          :class="i.select ? 'active' : ''"
        >
          {{ i.name }}
        </nav>
      </div>
    </div>
    <div class="comments_list">
      <div class="comments_item" v-for="i in orderAppraiseList" :key="i.id">
        <div class="info">
          <div class="name">
            <img :src="i.avatar" alt="" />
            <div>
              <p>{{ i.appraiseName }}</p>
              <span>{{ i.appraiseTime }}</span>
            </div>
          </div>
          <van-rate
            v-model="i.levels"
            readonly
            color="#FF9C27"
            void-icon="star"
            void-color="#ccc"
          />
        </div>
        <div class="text">
          {{ i.remarks }}
        </div>
        <div class="imgList">
          <div v-for="j in i.orderAppraiseFileList" :key="j.id">
            <van-image :src="j.url" fit="cover" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getServiceDetails } from "@/api/service";
export default {
  data() {
    return {
      value: 5,
      orderAppraiseList: [],
      typeLsit: [
        // { name: "全部", select: true },
        // { name: "最新", select: false },
        // { name: "有图", select: false },
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let data = {
        ...this.$route.query,
      };
      getServiceDetails(data)
        .then((res) => {
          if (res && res.code == 200) {
            let num = 0;
            res.data.orderAppraiseList.forEach((i) => {
              num += i.levels;
            });
            let value = (num / res.data.orderAppraiseList.length).toFixed() * 1;
            this.value = value || 0;
            this.orderAppraiseList = res.data.orderAppraiseList;
          } else {
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style scoped lang="less">
.comments {
  .comments_top {
    background: #fff;
    padding: 19px 14px;

    .score {
      display: flex;
      align-items: center;
      position: relative;
      p {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        margin-right: 12px;
      }
      .van-rate {
        margin-right: 12px;
      }

      span {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        position: absolute;
        right: 14px;
      }
    }
    .type {
      margin-top: 12px;
      display: flex;
      align-items: center;
      nav {
        padding: 6px 20px;
        border-radius: 17px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(4, 4, 4, 0.5);
        margin-right: 20px;
      }
      .active {
        background: rgba(5, 177, 120, 0.05);
        border: 1px solid #05b178;
        color: #05b178;
      }
    }
  }
  .comments_list {
    margin-top: 11px;
    background: #fff;
    .comments_item {
      padding: 14px;
      text-align: left;
      border-bottom: 1px solid #ccc;
      .info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          display: flex;
          align-items: center;
          text-align: left;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          div {
            margin-left: 11px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            p {
              font-size: 17px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #000000;
            }
            span {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.6);
            }
          }
        }
      }
      .text {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 25px;
        margin: 17px 0;
      }
      .imgList {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        div {
          width: 113px;
          height: 113px;
          background: #ccc;
          margin-bottom: 4px;
          img {
            width: 100%;
          }
        }
      }
      .right_content_text {
        font-size: 14px;
        margin-top: 5px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        text-align: left;
      }
    }
  }
}
</style>
