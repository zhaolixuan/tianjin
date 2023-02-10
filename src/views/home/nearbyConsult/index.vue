<template>
  <div class="nearby_onsult">
    <nav class="nearby_onsult_nav" v-for="i in vicinalServiceList" :key="i.iD">
      <div class="nearby_onsult_nav_info">
        <div class="nearby_onsult_nav_title">
          <p>{{ i.merchantName }}</p>
          <span>{{ i.enterprisename ? "营业中" : "不营业" }}</span>
        </div>
        <div style="padding-bottom: 4px">
          <p>营业时间：{{ i.businessHours }}</p>
        </div>
        <div>
          <p>{{ i.address }}</p>
          <p>据您约{{ (i.distance * 1).toFixed(0) }}KM</p>
        </div>
      </div>
      <div class="nearby_onsult_nav_menu">
        <!-- <p class="todetails" @click="handleYangLaoCenterDetails(i)">
          机构详情 >
        </p> -->
        <span></span>
        <p>
          <span @click.stop="daohang(i)">
            <img src="../../../assets/images/daohang.png" alt="" />
            导航</span
          >
          <span style="background: rgba(255, 125, 16, 0.1); color: #ce6309">
            <img src="../../../assets/images/dianhua.png" alt="" />
            <a style="color: #000" :href="`tel:${i.phone}`">电话</a>
          </span>
        </p>
      </div>
    </nav>
    <van-empty description="暂无数据" v-if="!vicinalServiceList.length" />
    <van-popup
      style="background: transparent"
      v-model="show"
      get-container=".nearby_onsult"
      :close-on-popstate="true"
      :close-on-click-overlay="false"
    >
      <van-loading size="30px" vertical color="#fff">加载中...</van-loading>
    </van-popup>
  </div>
</template>

<script>
import { getVicinalServiceList } from "@/api/home";
export default {
  data() {
    return {
      vicinalServiceList: [],
      lat: "",
      lng: "",
      show: true,
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    daohang(i) {
      let url = `https://uri.amap.com/marker?position=${i.lONGITUDE},${i.lATITUDE}&name=${i.address}&content=${i.merchantName}&output=html`;
      window.open(url, "_blank");
    },
    getData() {
      // 上个锁 保证列表只会请求一次
      let data = {
        LONGITUDE: window.lng,
        LATITUDE: window.lat,
      };
      getVicinalServiceList(data)
        .then((res) => {
          this.show = false;
          if (res && res.code == 200) {
            this.vicinalServiceList = res.data;
          }
        })
        .catch((err) => {});
    },
    handleYangLaoCenterDetails(i) {
      this.$router.push({
        path: "/consultDetails",
        query: {
          id: i.iD,
        },
      });
    },
    getCurrentPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          // console.log(position.coords.longitude);
          // console.log(position.coords.latitude);
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.nearby_onsult {
  background: #fff;
  .nearby_onsult_nav {
    padding: 14px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .nearby_onsult_nav_info {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding-bottom: 15px;
      margin-bottom: 15px;
      div {
        display: flex;
        justify-content: space-between;
        p {
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.6);
        }
      }
      .nearby_onsult_nav_title {
        margin-bottom: 12px;
        p {
          font-size: 20px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
        }
        span {
          display: inline-block;
          padding: 3px 5px;
          border-radius: 4px;
          border: 1px solid #05b178;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(5, 177, 120, 0.61);
        }
      }
    }
    .nearby_onsult_nav_menu {
      display: flex;
      justify-content: space-between;
      .todetails {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(5, 177, 120, 0.61);
      }
      p {
        span {
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

            // transform: translateX(-100%);
          }
        }
      }
    }
  }
}
</style>
