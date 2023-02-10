<template>
  <div class="myorder-container">
    <!-- tab栏切换 -->
    <div class="tab-container">
      <van-tabs
        v-model="active"
        class="vanTabs"
        color="#49c79d"
        v-on:click="handleClickItem"
      >
        <van-tab title="全部">
          <!-- content -->
          <div class="content-container">
            <ContentBox
              :orderList="orderList"
              :loading="loading"
              :finished="finished"
              @onLoad="onLoad"
            />
          </div>
        </van-tab>
        <van-tab title="已预约">
          <div class="content-container">
            <ContentBox
              :orderList="orderList"
              :loading="loading"
              :finished="finished"
              @onLoad="onLoad"
            />
          </div>
          <van-empty
            v-if="!orderList.length"
            description="暂无数据"
          ></van-empty>
        </van-tab>
        <van-tab title="派单中">
          <div class="content-container">
            <ContentBox
              :orderList="orderList"
              :loading="loading"
              :finished="finished"
              @onLoad="onLoad"
            />
          </div>
          <van-empty
            v-if="!orderList.length"
            description="暂无数据"
          ></van-empty>
        </van-tab>
        <van-tab title="服务中">
          <div class="content-container">
            <ContentBox
              :orderList="orderList"
              :loading="loading"
              :finished="finished"
              @onLoad="onLoad"
            />
          </div>
          <van-empty
            v-if="!orderList.length"
            description="暂无数据"
          ></van-empty>
        </van-tab>
        <van-tab title="已完成">
          <div class="content-container">
            <ContentBox
              :orderList="orderList"
              :loading="loading"
              :finished="finished"
              @onLoad="onLoad"
            />
          </div>
          <van-empty
            v-if="!orderList.length"
            description="暂无数据"
          ></van-empty>
        </van-tab>
        <van-tab title="已取消">
          <div class="content-container">
            <ContentBox
              :orderList="orderList"
              :loading="loading"
              :finished="finished"
              @onLoad="onLoad"
            />
          </div>
          <van-empty
            v-if="!orderList.length"
            description="暂无数据"
          ></van-empty>
        </van-tab>
        <!-- <van-tab title="已拒单">
          <div class="content-container">
            <ContentBox
              :orderList="orderList"
              :loading="loading"
              :finished="finished"
              @onLoad="onLoad"
            />
          </div>
          <van-empty
            v-if="!orderList.length"
            description="暂无数据"
          ></van-empty>
        </van-tab> -->
      </van-tabs>
    </div>
  </div>
</template>

<script>
import ContentBox from "./contentBox.vue";
import { getOrderList } from "@/api/service";
import { getCookie } from "@/utils/storage";

export default {
  name: "Myorder",
  data() {
    return {
      active: 0,
      orderStatus: null,
      orderList: [],
      limit: 10,
      page: 0,
      loading: false,
      finished: false,
    };
  },
  components: {
    ContentBox,
  },
  watch: {
    active(n) {
      switch (n) {
        case 0:
          this.orderStatus = null;
          break;

        case 1:
          this.orderStatus = 1;

          break;

        case 2:
          this.orderStatus = 4;

          break;

        case 3:
          this.orderStatus = 6;

          break;

        case 4:
          this.orderStatus = 7;
          break;

        case 5:
          this.orderStatus = 0;

          break;
        case 6:
          this.orderStatus = 3;

          break;

        default:
          break;
      }
      this.finished = false;
      this.page = 1;
      this.orderList = [];
      this.getOrderListData();
    },
  },
  mounted() {
    // this.getOrderListData();
  },

  methods: {
    onLoad() {
      this.page++;
      this.getOrderListData();
    },
    handleClickItem(name, title) {},

    getOrderListData() {
      this.loading = true;
      let params = {
        gunsToken: getCookie("gunsToken"),
        orderStatus: this.orderStatus,
        limit: this.limit,
        page: this.page,
      };
      getOrderList(params).then((res) => {
        this.loading = false;
        if (res && res.code == 200) {
          res.data.forEach((i) => {
            this.orderList.push(i);
          });
          if (res.data.length < 10) {
            this.finished = true;
          }
        } else {
          this.loading = false;
          this.finished = true;
        }
      });
    },

    handleGoDetails(i) {
      this.$router.push({
        path: "/orderDetails",
        query: {
          orderNumber: i.number,
          //  pathName: "Myorder"
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.myorder-container {
  background-color: #f6f6f6;
  .tab-container {
    .vanTabs {
      .content-container {
        .content-item {
          background-color: #fff;
          height: 238px;
          padding: 18px 14px 0px 14px;
          margin-bottom: 10px;
          .order-date-status {
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.5);
            line-height: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #eee;
            padding-bottom: 9px;
            .order-status {
              color: #ff9c27;
            }
          }
          .order-img-info-price {
            height: 142px;
            // margin-top: 9px;
            padding: 19px 0px;
            display: flex;
            border-bottom: 1px solid #eee;
            .order-img {
              width: 104px;
              height: 104px;
              margin-right: 14px;
              // border: 1px solid green;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .order-info-total {
              flex: 1;
              .order-info {
                height: 48px;
                font-size: 17px;
                text-align: left;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #000000;
                line-height: 24px;
              }
              .foot-sort {
                margin-top: 5px;
                height: 20px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.5);
                line-height: 20px;
                text-align: left;
              }
              .order-price {
                margin-top: 4px;
                height: 28px;
                font-size: 20px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #e62c3b;
                line-height: 28px;
                text-align: left;
              }
            }
          }
          .order-pay-details {
            height: 22px;
            margin-top: 11px;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.5);
            line-height: 22px;
            display: flex;
            justify-content: space-between;
            .goDetails {
              font-size: 14px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #05b279;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
