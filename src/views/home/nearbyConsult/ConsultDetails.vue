<template>
  <div class="details-container">
    <div class="details-header">
      <div class="header-first-line">
        <span class="name">{{ vicinalServiceDetail.merchantName }}</span>
        <span class="status">营业中</span>
      </div>
      <div class="header-second-line">
        <span>营业时间：{{ vicinalServiceDetail.businessHours }}</span>
      </div>
      <div class="header-third-line">
        <span class="phone">联系电话：{{ vicinalServiceDetail.phone }}</span>
        <span class="icon">
          <img src="../../../assets/images/dianhua.png" alt="" />
          <a style="color: #000" :href="`tel:${vicinalServiceDetail.phone}`"
            >电话</a
          >
        </span>
      </div>
      <div class="header-fourth-line">
        <span class="c_name">{{ vicinalServiceDetail.address }}</span>
        <span class="icon-daohang" @click="daohang">
          <img src="../../../assets/images/daohang.png" alt="" />
          导航
        </span>
      </div>
    </div>
    <div class="details-activity">
      <div class="activity-header">
        <span class="title">机构活动</span>
        <el-button
          type="text"
          class="more"
          :disabled="!vicinalServiceDetail.activeResult.length"
          @click="all"
          >查看全部></el-button
        >
      </div>
      <div
        class="activity-item"
        v-for="i in vicinalServiceDetail.activeResult"
        :key="i.id"
      >
        <div class="img-box">
          <img :src="i.activeImage" alt="" />
          <span class="readingNum"
            >{{ item.numberRead ? item.numberRead : "0" }}人读过</span
          >
        </div>
        <div class="activity-info">
          <div class="title">{{ i.activeTitle }}</div>
          <div class="add-activity-time">
            报名时间：{{ i.activeStartTime }} — {{ i.activeEndTime }}
          </div>
          <div class="address">活动地点：{{ i.activeSite }}</div>
        </div>
      </div>
      <van-empty
        v-if="!vicinalServiceDetail.activeResult.length"
        description="暂无活动"
      />
    </div>
    <div class="details-service">
      <div class="title">机构服务</div>
      <div class="label-box">
        <span v-for="i in vicinalServiceDetail.serviceType" :key="i">{{
          i
        }}</span>
      </div>
      <!-- <div class="about-we">关于我们</div>
      <div class="content-text">
        <p>
          价位——低价优先选择<br />目前，论经济能力，大部分老年人都难以自主承担入住养老院所需的费用
          而面对养老难题的子女，多数是上有老下有小，其中不乏独生子女，同样有一定负担。
        </p>
        <p>
          制定合理的价位，但并不因此削弱服务的质量，而是借助系统地梳理，简化操作流程，不仅能实现看护资源的合理分配
          让各部分的衔接和执行更加流畅，也将有效降低机构运营的成本。
          环境——降低老人建立新认知的负担 年龄影响，老人
          学习和接受新事物的能力与意愿较弱，进入一个新环境，他们往往会在心理上有所抗拒。
          让他们能直观感受到舒适甚 至熟悉的氛围，将有助于减少他们的认知负担。
        </p>
      </div> -->
    </div>
  </div>
</template>

<script>
import { getVicinalServiceDetail } from "@/api/home";
import { navigation } from "@/utils/index";
export default {
  data() {
    return {
      limit: 2,
      vicinalServiceDetail: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    all() {
      this.$router.push({
        path: "/activity",
        query: { initiator: this.vicinalServiceDetail.merchantName },
      });
    },
    getData() {
      let data = {
        ID: this.$route.query.id,
        limit: this.limit,
      };
      getVicinalServiceDetail(data)
        .then((res) => {
          if (res && res.code == 200) {
            this.vicinalServiceDetail = res.data;
          }
        })
        .catch((err) => {});
    },
    daohang() {
      let { lONGITUDE, lATITUDE, merchantName, address } =
        this.vicinalServiceDetail;
      let url;
      if (window.lng) {
        url = `https://m.amap.com/navigation/carmap/saddr=${window.lng},${window.lat}&daddr=${lONGITUDE},${lATITUDE}&sort=dist`;
      } else {
        url = `https://uri.amap.com/marker?position=${lONGITUDE},${lATITUDE}&name=${merchantName}&content=${address}&output=html`;
      }
      navigation(url);
    },
  },
};
</script>

<style lang="less" scoped>
.details-container {
  background-color: #f6f6f6;
  .details-header {
    height: 223px;
    background-color: #fff;
    padding: 0px 10px 0px 14px;
    .header-first-line {
      height: 55px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      .name {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 25px;
      }
      .status {
        width: 42px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(5, 177, 120, 0.61);
        line-height: 20px;
      }
    }
    .header-second-line {
      height: 55px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #eee;
      span {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 22px;
      }
    }
    .header-third-line {
      height: 55px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      .phone {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 22px;
      }
      .icon {
        margin-left: 30px;
        display: inline-block;
        width: 53px;
        height: 23px;
        background: rgba(5, 177, 120, 0.1);
        border-radius: 0 16px 16px 0;
        font-size: 12px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #03855a;
        letter-spacing: 2px;
        position: relative;
        line-height: 23px;
        img {
          position: absolute;
          width: 23px;
          height: 23px;
          left: -12px;
        }
      }
    }
    .header-fourth-line {
      height: 55px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .c_name {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 22px;
        text-align: left;
      }
      .icon-daohang {
        margin-left: 30px;
        display: inline-block;
        width: 53px;
        height: 23px;
        background: rgba(5, 177, 120, 0.1);
        border-radius: 0 16px 16px 0;
        font-size: 12px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #03855a;
        letter-spacing: 2px;
        position: relative;
        line-height: 23px;
        img {
          position: absolute;
          width: 23px;
          height: 23px;
          left: -12px;
        }
      }
    }
  }
  .details-activity {
    background-color: #fff;
    .activity-header {
      margin-top: 14px;
      padding: 0px 18px 0px 15px;
      background-color: #fff;
      height: 62px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #000000;
        line-height: 28px;
      }
      .more {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        line-height: 20px;
      }
      .el-button {
        color: rgba(5, 177, 120, 0.61);
      }
      .is-disabled {
        color: #ccc;
      }
    }
    .activity-item {
      .img-box {
        height: 194px;
        padding: 0px 17px;
        border: 1px solid #eee;
        position: relative;
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
      }
      .activity-info {
        padding: 0px 17px;
        margin-top: 14px;
        padding-bottom: 19px;
        .title {
          font-size: 17px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
          line-height: 24px;
          text-align: left;
        }
        .add-activity-time {
          margin-top: 14px;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.6);
          line-height: 20px;
          text-align: left;
        }
        .address {
          margin-top: 4px;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.6);
          line-height: 20px;
          text-align: left;
        }
      }
    }
  }
  .details-service {
    background-color: #fff;
    margin-top: 14px;
    .title {
      padding-top: 17px;
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #000000;
      line-height: 28px;
      text-align: left;
      padding-left: 15px;
    }
    .label-box {
      padding: 0px 15px;
      margin-top: 19px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      &::after {
        content: "";
        width: 106px;
        height: 34px;
      }
      span {
        margin-bottom: 8px;
        display: inline-block;
        // padding: 6px 15px;
        width: 106px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 17px;
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .about-we {
      height: 27px;
      margin-top: 19px;
      padding-left: 15px;
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #000000;
      line-height: 28px;
      text-align: left;
    }
    .content-text {
      margin-top: 12px;
      margin-right: 16px;
      text-align: left;
      padding: 0px 15px;
      p {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 28px;
      }
    }
  }
}
</style>
