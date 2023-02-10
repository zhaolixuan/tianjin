<template>
  <div class="serverMine">
    <div class="mermber-center-container">
      <span class="avator">
        <img :src="ServiceUserInfo.files && ServiceUserInfo.files[0].url"
             alt=""
             class="avator-img" />
      </span>
      <span class="username">{{ ServiceUserInfo.name }}</span>
      <span class="phone">{{ ServiceUserInfo.mealsInfoName }}</span>
      <span class="edit"> 已认证 </span>
    </div>
    <!-- <div class="server_info">
            <div class="num">
                <span>服务次数</span>
                <p>{{ ServiceUserInfo.serviceNum }}</p>
            </div>
            <div class="time">
                <span>服务时长</span>
                <p>{{ ServiceUserInfo.serviceCountTime }}</p>
            </div>
        </div> -->
    <!-- 我的信息 -->
    <div class="other-info-container">
      <div class="other-info-header">我的信息</div>
      <div class="other-info-content">
        <div class="other-info-item">
          <span class="icon child-account"></span>
          <span v-on:click="handleGoChildrenAccount">基本信息</span>
        </div>
        <div class="other-info-item">
          <span class="icon service-address"></span>
          <span v-on:click="handleGoServiceAddress">服务记录</span>
        </div>
        <div class="other-info-item">
          <span class="icon chongzhimima"></span>
          <span v-on:click="handleChangePassword">重置密码</span>
        </div>
        <div class="other-info-item">
          <span class="icon login-out"></span>
          <span v-on:click="handleGoLoginOut">退出</span>
        </div>
      </div>
    </div>
    <Server-exeFooter />
  </div>
</template>

<script>
import ServerExeFooter from '@/components/common/serverExeFooter.vue'
import { delCookie } from '@/utils/storage'
import { getServiceUserInformation, reset } from '@/api/serviceExe.js'
import { getSessionItem } from '@/utils/storage'

export default {
  data() {
    return {
      ServiceUserInfo: {},
    }
  },

  components: {
    ServerExeFooter,
  },

  created() {},

  mounted() {
    this.getServiceUserInformation()
  },

  methods: {
    handleChangePassword() {
      this.$dialog
        .confirm({
          title: '重置密码',
          message: '重置密码后，密码为111111！',
        })
        .then(() => {
          reset({ account: getSessionItem('account') }).then((res) => {
            if (res && res.code == 200) {
              this.$toast.success('重置成功！')
            } else {
              this.$toast.fail('重置失败！')
            }
          })
        })
        .catch(() => {})
      //  this.$router.push({ path: '/server-changePassword' })
    },
    // 获取用户信息
    getServiceUserInformation() {
      getServiceUserInformation().then((res) => {
        if (res.code && res.code == 200) {
          this.ServiceUserInfo = res.data
          // ServiceUserInfo.serviceCountTime =
          let a = this.ServiceUserInfo.serviceCountTime
          let day = 0,
            hour = 0,
            min = 0,
            sec = 0
          if (a.indexOf('天') != -1) {
            day = a.split('天')[0]
            a = a.split('天')[1]
          }
          if (a.indexOf('小时') != -1) {
            hour = a.split('小时')[0]
            a = a.split('小时')[1]
          }
          if (a.indexOf('分') != -1) {
            min = a.split('分')[0]
            a = a.split('分')[1]
          }
          if (a.indexOf('秒') != -1) {
            sec = a.split('秒')[0]
          }
          this.ServiceUserInfo.serviceCountTime = `${
            day * 12 + hour * 1
          }:${min}:${sec}`
        }
      })
    },

    handleGoChildrenAccount() {
      //   this.$router.push({ path: "/childAccount" });
      this.$router.push({ path: '/server-baseinfo' })
    },
    handleGoServiceAddress() {
      this.$router.push({ name: 'serverRecordStatistics' })
    },
    handleGoLoginOut() {
      this.$dialog
        .confirm({
          title: '退出',
          message: '确认退出',
        })
        .then(() => {
          delCookie('gunsToken')
          localStorage.clear()
          try {
            window.android.onPageClose("");//退出
          } catch (e) {
            console.log("出错了");
          }
          this.$router.push({ name: 'login' })
        })
        .catch(() => {})
    },
  },
}
</script>

<style scoped lang="less">
.serverMine {
  padding-bottom: 66px;
  .mermber-center-container {
    height: 121px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    position: relative;
    background-image: url('~@/assets/images/personal-bg-yasuo@2x.jpg');
    background-size: auto 173px;
    .avator {
      position: absolute;
      top: 36px;
      left: 14px;
      display: block;
      height: 60px;
      width: 60px;
      border-radius: 30px;
      border: 1px solid #eee;
      overflow: hidden;
      .avator-img {
        width: 100%;
        height: 100%;
        border-radius: 30px;
      }
    }
    .username {
      position: absolute;
      top: 41px;
      left: 90px;
      font-size: 22px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 30px;
      letter-spacing: 2px;
    }
    .phone {
      position: absolute;
      top: 71px;
      left: 90px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
      line-height: 21px;
    }
    .edit {
      position: absolute;
      top: 49px;
      right: 0px;
      width: 101px;
      height: 31px;
      background: rgba(29, 72, 121, 0.56);
      border-radius: 100px 0px 0px 100px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 31px;
    }
  }
  .server_info {
    display: flex;
    background: #fff;
    padding: 9px;
    height: 91px;
    position: relative;
    &::after {
      content: '';
      width: 1px;
      position: absolute;
      left: 50%;
      background: #ccc;
      height: 71px;
    }
    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;

      span {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
      }
      p {
        font-size: 26px;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: #000000;
        line-height: 30px;
        letter-spacing: 2px;
      }
    }
  }
  .other-info-container {
    height: 277px;
    box-sizing: border-box;
    background: #fff;
    .other-info-header {
      height: 57px;
      text-align: left;
      padding-left: 10px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 28px;
      line-height: 57px;
    }
    .other-info-content {
      padding: 0px 15px;
      .other-info-item {
        height: 68px;
        line-height: 68px;
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 25px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .icon {
          display: block;
          height: 38px;
          width: 38px;
          // border: 1px solid #eee;
          margin-right: 21px;
        }
        .child-account {
          background: url('~@/assets/images/child-account@2x.png') no-repeat;
          background-size: 36px 38px;
        }
        .service-address {
          background: url('~@/assets/images/service-address@2x.png') no-repeat;
          background-size: 36px 38px;
        }
        .chongzhimima {
          background: url('~@/assets/images/chongzhimima.jpg') no-repeat;
          background-size: 36px 36px;
        }
        .login-out {
          background: url('~@/assets/images/login-out@2x.png') no-repeat;
          background-size: 36px 38px;
        }
      }
    }
  }
}
</style>
