<template>
  <div class="serviceDetails">
    <div class="headerImg">
      <img :src="ServiceDetail.catoryPicture" alt="" />
    </div>
    <div class="serviceDetails_info">
      <p class="title">{{ ServiceDetail.name }}</p>
      <!-- <p class="type"><span>可退</span> <span>当季限量</span></p> -->
      <p>
        <span class="info_price">￥{{ ServiceDetail.price }}</span>
        <span class="share">
          <i class="el-icon-share"></i>
          分享
        </span>
      </p>
    </div>
    <!-- 评分评论 -->
    <div class="serviceDetails_comments">
      <div class="score" @click="jumpScore">
        <p>评分</p>
        <van-rate
          v-model="value"
          readonly
          color="#FF9C27"
          void-icon="star"
          void-color="#ccc"
        />
        <p>{{ value }}</p>
        <!-- <span>总销量 1000</span> -->
      </div>
      <div class="serviceDetails_comments_list">
        <p class="title">用户评价</p>
        <nav
          class="serviceDetails_comments_item"
          v-for="i in ServiceDetail.orderAppraiseList"
          :key="i.id"
        >
          <div class="left_img">
            <img
              :src="
                i.orderAppraiseFileList[0] && i.orderAppraiseFileList[0].url
              "
              alt=""
            />
          </div>
          <div class="right_content">
            <div class="right_content_info">
              <div class="name">
                <img :src="i.avatar" alt="" />
                <p>{{ i.appraiseName }}</p>
              </div>
              <van-rate
                v-model="i.levels"
                readonly
                color="#FF9C27"
                void-icon="star"
                void-color="#ccc"
              />
            </div>
            <div class="right_content_text">
              {{ i.remarks }}
            </div>
          </div>
        </nav>
        <van-empty
          v-if="!ServiceDetail.orderAppraiseList.length"
          description="暂无评价"
        />
      </div>
    </div>

    <Footer
      @handelOrder="handelOrder"
      :active="conllectionActive"
      @handelConllection="handelConllection"
      :phone="ServiceDetail.mealsPhone"
    />
    <van-popup
      v-model="popubShow"
      round
      position="bottom"
      :style="{ height: '433px' }"
    >
      <div class="popup_box">
        <nav class="popup_wares">
          <img :src="ServiceDetail.catoryPicture" alt="" />
          <div class="name">
            <p class="title">{{ ServiceDetail.name }}</p>
            <p class="info_price">￥{{ ServiceDetail.price }}</p>
          </div>
        </nav>
        <nav class="popup_type">
          <!-- 产品说这块让先去掉 -->
          <!-- <p>分类</p> -->
          <!-- <div>
            <span class="active">加糖</span>
            <span>加冰</span>
            <span>去冰</span>
          </div> -->
        </nav>
        <nav class="popup_num">
          <p>数量</p>
          <div class="stepper">
            <div class="add" @click="num++">+</div>
            <div class="num">{{ num }}</div>
            <div class="sub" @click="num > 1 && num--">-</div>
          </div>
        </nav>
        <nav class="popup_btn">
          <van-button
            round
            block
            @click="submit"
            type="primary"
            style="background: #05b178"
            >立即购买</van-button
          >
        </nav>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Footer from "./component/footer.vue";
import { conllectionAddItem, conllectionDeleteItem } from "@/api/mine";
import { getServiceDetails } from "@/api/service";
import { getCookie } from "@/utils/storage.js";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      popubShow: false,
      num: 1,
      conllectionActive: 0,
      ServiceDetail: {
        orderAppraiseList: [],
      },
      collectionId: "",
    };
  },

  components: {
    Footer,
  },

  computed: {
    value: function () {
      let num = 0;
      this.ServiceDetail.orderAppraiseList.forEach((i) => {
        num += i.levels;
      });
      let value =
        (num / this.ServiceDetail.orderAppraiseList.length).toFixed() * 1;
      return value || 0;
    },
  },

  created() {},

  mounted() {
    this.getData();
    // 1、服务评价列表 get
    // this.getFinishOrderNotEvaluatedListData();
  },

  methods: {
    ...mapMutations(["SET_SHOPPING_CAT", "SET_FOOT_INFI"]),

    getData() {
      let data = {
        ...this.$route.query,
      };
      getServiceDetails(data)
        .then((res) => {
          if (res && res.code == 200) {
            this.ServiceDetail = res.data;
            this.conllectionActive = res.data.collectionStatus * 1;
            this.collectionId = res.data.collectionId;
          } else {
            this.ServiceDetail = {};
          }
        })
        .catch((err) => {});
    },

    jumpScore() {
      this.$router.push({
        path: "/comments",
        query: {
          ...this.$route.query,
        },
      });
    },

    submit() {
      let data = [
        {
          ...this.ServiceDetail,
          totalPrice: this.num * this.ServiceDetail.price,
          number: this.num,
        },
      ];
      let footerInfo = {
        num: this.num,
        price: this.num * this.ServiceDetail.price,
      };
      this.SET_SHOPPING_CAT(data);
      this.SET_FOOT_INFI(footerInfo);
      this.$router.push({ name: "SubmitOrder" });
    },

    handelConllection() {
      let data;
      let { name, catoryPicture, price, typeName, projectName, collectionId } =
        this.ServiceDetail;
      let { typeCode, projectCode, mealsInfoId } = this.$route.query;
      if (!this.conllectionActive) {
        // 收藏
        data = {
          serviceMealsId: this.$route.query.mealsInfoId,
          createTime: new Date() * 1,
          idCard: getCookie("idCard").split("idCard")[1],
          // title:name,
          photoUrl: catoryPicture,
          price,
          typeName,
          projectName,
          name,
          type: 0,
          typeCode,
          projectCode,
          mealsInfoId,
        };
        this.fun(conllectionAddItem, data);
      } else {
        // 取消收藏
        data = {
          id: collectionId,
          type: 0,
        };
        this.fun(conllectionDeleteItem, data);
      }
    },

    fun(funName, data) {
      funName(data)
        .then((res) => {
          if (res && res.code == 200) {
            this.getData();
          }
        })
        .catch((err) => {});
    },

    handelOrder() {
      this.popubShow = true;
    },

    // // 获取评价列表
    // getFinishOrderNotEvaluatedListData() {
    //   // console.log("getFinishOrderNotEvaluatedList");
    //   let params = {};
    //   getFinishOrderNotEvaluatedList(params).then((res) => {
    //     // console.log(res);
    //     if (res.code && res.code == 200) {
    //       this.ServiceDetail.orderAppraiseList = res.data;
    //     }
    //   });
    // },
  },
};
</script>

<style scoped lang="less">
.serviceDetails {
  padding-bottom: 70px;
  .headerImg {
    height: 245px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .serviceDetails_info {
    padding: 19px 16px 14px 14px;
    background: #fff;
    position: relative;
    p {
      text-align: left;
      display: flex;
      align-items: center;
    }
    .title {
      font-size: 24px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
    }
    .type {
      margin: 14px 0;
      span {
        display: inline-block;
        padding: 3px 14px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.5);
        background: rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        margin-right: 9px;
      }
    }
    .info_price {
      font-size: 30px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #e62c3b;
    }
    .share {
      position: absolute;
      right: 0;
      width: 91px;
      height: 31px;
      background: #ff9c27;
      border-radius: 100px 0px 0px 100px;
      text-align: center;
      line-height: 31px;
      display: inline-block;
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }
  .serviceDetails_comments {
    margin-top: 15px;
    background: #fff;
    .score {
      padding: 19px 14px;
      border-bottom: 1px solid #ccc;
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
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.6);
        position: absolute;
        right: 14px;
      }
    }
    .serviceDetails_comments_list {
      padding: 13px 14px;
      .title {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        text-align: left;
      }
      .serviceDetails_comments_item {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left_img {
          width: 82px;
          height: 82px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .right_content {
          width: 250px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .right_content_info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .name {
              display: flex;
              align-items: center;

              img {
                width: 36px;
                height: 36px;
                border-radius: 50%;
              }
              p {
                font-size: 17px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #000000;
                margin-left: 11px;
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
  }
  .popup_box {
    width: 100%;
    height: 100%;
    padding: 33px 16px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .popup_wares {
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 98px;
        height: 98px;
      }
      .name {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: left;
        width: 231px;
        .title {
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;
        }
        .info_price {
          font-size: 30px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #e62c3b;
        }
      }
    }
    .popup_type {
      p {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        text-align: left;
        margin-bottom: 10px;
      }
      div {
        display: flex;
        span {
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
          color: #05b178;
          border: 1px solid #05b178;
        }
      }
    }
    .popup_num {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        text-align: left;
      }
      .stepper {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #05b178;
        .add {
          width: 40px;
          height: 34px;
          background: rgba(5, 177, 120, 0.05);
          border-radius: 17px 0px 0px 17px;
          border: 1px solid #05b178;
        }
        .num {
          width: 40px;
          height: 34px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #05b178;
        }
        .sub {
          width: 40px;
          height: 34px;
          border-radius: 0px 17px 17px 0px;
          border: 1px solid #05b178;
        }
      }
    }
    .popup_btn {
      .van-button__text {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
}
</style>
