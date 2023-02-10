<template>
  <div class="server_record_container">
    <div class="server_info">
      <div class="title">
        <span>服务详情</span>
      </div>
      <div class="order">
        <span>服务编号</span>
        <span>{{ serverRecord.orderNumber }}</span>
      </div>
      <div class="status">
        <span>状态</span>
        <span>{{ serverRecord.serviceStatue == 7 ? "已完成" : "已取消" }}</span>
      </div>
    </div>
    <div class="server_details_cancel">
      <div class="server_project">
        <div class="project_title">
          <span>服务项目</span>
        </div>
        <div class="project_content" v-for="i in serverRecord.list" :key="i.id">
          <div class="img">
            <img :src="serverRecord.mealsServicePicture" alt="" />
          </div>
          <div class="content">
            <div class="consult_center">{{ i.mealsInfoName }}</div>
            <div class="project_name">{{ i.name }}</div>
            <div class="number_and_price">
              <span class="number">X{{ i.number }}</span>
              <span class="price">￥{{ i.price }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="serverRecord.serviceStatue != 7">
        <div class="server_cancel_reason">
          <div class="reason_header">
            <span>取消原因</span>
            <span class="header_right">{{serverRecord.serviceRemarks}}</span>
          </div>
          <div class="reason_content">
            {{ serverRecord.cancelReasonContent }}
          </div>
        </div>
        <!-- <div class="server_cancel_voucher">
          <div class="title">取消凭证</div>
          <div class="upload_container">
            <div class="first_container">
              <img :src="serverRecord.cancelVoucher[0].url" alt="" />
            </div>
            <div class="second_container">
              <img :src="serverRecord.cancelVoucher[1].url" alt="" />
            </div>
          </div>
          <div class="tip">注：如对取消原因有异议，请联系服务商说明情况</div>
        </div> -->
      </div>
      <div v-else>
        <div class="server_details_list">
          <div class="list_title">服务明细</div>
          <div class="details_start_time">
            <span class="start_time">开始时间</span>
            <span>{{ serverRecord.serviceStartTime }}</span>
          </div>
          <div class="details_end_time">
            <span class="end_time">结束时间</span>
            <span>{{ serverRecord.serviceEndTime }}</span>
          </div>
          <div class="details_end_time">
            <span class="end_time">服务时长</span>
            <span>{{ serverRecord.countServiceTime }}</span>
          </div>
          <div class="tip">
            注：结束时间为当前时间，服务时长为开始时间截止当前时间算出的值
          </div>
        </div>
        <div class="server_cancel_voucher">
          <div class="title">上传凭证</div>
          <div class="upload_container">
            <div
              class="first_container"
              v-for="i in serverRecord.orderMealsPersonalFilesList"
              :key="i.id"
            >
              <img :src="i.url" alt="" />
            </div>
          </div>
        </div>
        <div class="server_content">
          <div class="title">服务内容</div>
          <div class="server_container_content">
            {{ serverRecord.serviceRemarks }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDatilByMealsPersonalId } from "@/api/service";
export default {
  data() {
    return {
      serverRecord: {
        list: [],
        // orderNum: "12345678901234",
        // status: 0,
        // imgSrc: require("@/assets/images/common_use_food.jpg"),
        // serviceCenter: "天津市宜家宜居养老中心",
        // serviceName: "网红冰镇红糖冰粉解暑款（多点多送）",
        // number: "2",
        // price: "19.00",
        // cancelReason: ["0"],
        // cancelReasonContent:
        //   "取消原因描述取消原因描述取消原因描述取消原因描述取消原因描述取消原因描述取消原因描述取消原因描述",
        // cancelVoucher: [
        //   { url: require("@/assets/images/common_use_food.jpg") },
        //   { url: require("@/assets/images/common_use_food.jpg") },
        // ],
      },
      id: "",
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getData();
  },
  methods: {
    getData() {
      getDatilByMealsPersonalId({ orderMealsPersonalId: this.id })
        .then((res) => {
          if (res && res.code == 200) {
            this.serverRecord = res.data;
          }
        })
        .catch((err) => {});
    },
  },
  components: {},

  computed: {
    // cancelReason
    // cancelReason() {
    //   return this.serverRecord.cancelReason[0] == "0"
    //     ? "服务人员拒绝上门"
    //     : this.serverRecord.cancelReason[0] == "1"
    //     ? "用户主动取消"
    //     : "单纯不想要了";
    // },
  },
};
</script>

<style lang="less" scoped>
.server_record_container {
  background: #f6f6f6;

  .server_info {
    height: 122px;
    padding: 0px 14px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #fff;
    .title {
      height: 44px;
      text-align: left;
      display: flex;
      align-items: center;
      span {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 22px;
      }
    }
    .order {
      height: 32px;
      text-align: left;
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.5);
        line-height: 20px;
        margin-right: 43px;
      }
    }
    .status {
      height: 32px;
      text-align: left;
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.5);
        line-height: 20px;
        margin-right: 72px;
      }
    }
  }
  .server_details_cancel {
    margin-top: 12px;
    background-color: #fff;
    padding: 0px 13px;
    .server_project {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .project_title {
        height: 22px;
        text-align: left;
        margin-top: 12px;
        display: flex;
        justify-content: left;
        span {
          width: 64px;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;
          line-height: 22px;
        }
      }
      .project_content {
        margin-top: 16px;
        display: flex;
        justify-content: flex-start;
        .img {
          width: 104px;
          height: 104px;
          margin-right: 14px;
          border: 1px solid #eee;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          text-align: left;
          .consult_center {
            height: 24px;
            font-size: 17px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #000000;
            line-height: 24px;
          }
          .project_name {
            margin-top: 8px;
            height: 40px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #000000;
            line-height: 20px;
          }
          .number_and_price {
            margin-top: 5px;
            display: flex;
            justify-content: space-between;
            .number {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.5);
              line-height: 20px;
            }
            .price {
              font-size: 20px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #e62c3b;
              line-height: 28px;
            }
          }
        }
      }
    }
    .server_cancel_reason {
      height: 93px;
      margin-top: 23px;
      border-bottom: 1px solid #eee;
      .reason_header {
        height: 22px;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;
          line-height: 22px;
        }
        .header_right {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.5);
          line-height: 20px;
        }
      }
      .reason_content {
        margin-top: 11px;
        height: 60px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.5);
        line-height: 20px;
        text-align: left;
      }
    }

    .server_details_list {
      margin-top: 23px;
      .list_title {
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 22px;
        text-align: left;
      }
      .details_start_time {
        margin-top: 7px;
        height: 32px;
        text-align: left;
        display: flex;
        align-items: center;
        span {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
          line-height: 20px;
        }
        .start_time {
          margin-right: 43px;
          color: rgba(0, 0, 0, 0.5);
        }
      }
      .details_end_time {
        height: 32px;
        text-align: left;
        display: flex;
        align-items: center;
        span {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
          line-height: 20px;
        }
        .end_time {
          margin-right: 43px;
          color: rgba(0, 0, 0, 0.5);
        }
      }
      .tip {
        margin-top: 16px;
        height: 40px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.5);
        line-height: 20px;
        text-align: left;
      }
    }
    .server_cancel_voucher {
      margin-top: 23px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .title {
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 22px;
        text-align: left;
      }
      .upload_container {
        margin-top: 15px;
        display: flex;
        flex-wrap: wrap;
        div {
          height: 80px;
          width: 80px;
          margin: 0 8px 8px 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .first_container {
          margin-right: 6px;
        }
      }
    }
    .server_content {
      margin-top: 23px;
      height: 73px;
      padding-bottom: 10px;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        height: 22px;
        text-align: left;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 22px;
      }
      .server_container_content {
        height: 40px;
        text-align: left;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.5);
        line-height: 20px;
      }
    }
  }
}
</style>
