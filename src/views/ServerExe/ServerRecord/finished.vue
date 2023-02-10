<template>
  <div class="finished_container">
    <div class="server_project">
      <div class="project_title">
        <span>服务项目</span>
      </div>
      <div class="project_content">
        <div class="img">
          <img src="" alt="" />
        </div>
        <div class="content">
          <div class="consult_center">天津市宜家宜居养老中心</div>
          <div class="project_name">网红冰镇红糖冰粉解暑款（多点多送）</div>
          <div class="number_and_price">
            <span class="number">X2</span>
            <span class="price">￥19.00</span>
          </div>
        </div>
      </div>
    </div>
    <div class="server_details_list">
      <div class="list_title">服务明细</div>
      <div class="details_start_time">
        <span class="start_time">开始时间</span>
        <span>2021.6.17 9:00-17:00</span>
      </div>
      <div class="details_end_time">
        <span class="end_time">结束时间</span>
        <span>2021.6.17 9:00-17:00</span>
      </div>
      <div class="details_end_time">
        <span class="end_time">服务时长</span>
        <span>2021.6.17 9:00-17:00</span>
      </div>
      <div class="tip">
        注：结束时间为当前时间，服务时长为开始时间截止当前时间算出的值
      </div>
    </div>
    <div class="server_cancel_voucher">
      <div class="title">上传凭证</div>
      <div class="upload_container">
        <div class="first_container"></div>
        <div class="second_container"></div>
      </div>
    </div>
    <div class="server_content">
      <div class="title">服务内容</div>
      <div class="server_container_content">
        上午陪同老师去医院，下午陪老人聊天舒缓心情，老人开心的度过一天
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.finished_container {
  margin-top: 12px;
  background-color: #fff;
  padding: 0px 13px 31px;
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
      height: 80px;
      margin-top: 15px;
      display: flex;
      justify-content: flex-start;
      div {
        height: 80px;
        width: 80px;
        border: 1px solid #eee;
      }
      .first_container {
        margin-right: 6px;
      }
    }
  }
  .server_content {
    margin-top: 23px;
    height: 73px;
    // border: 1px solid #eee;
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
</style>
