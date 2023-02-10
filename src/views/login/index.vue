<template>
  <div class="login-container">
    <div class="login-bg">
      <img src="../../assets/images/jjyl-yasuo.jpg"
           alt="" />
    </div>
    <div class="login-content"
         v-if="loginShow == 'login'">
      <div class="login-notice">请选择您的身份</div>
      <div class="btns-old-people">
        <van-button type="primary"
                    size="large"
                    v-on:click="goLoginOlderOrRelation('老人/家属')"
                    v-model="OlderOrRelation">老人/家属</van-button>
      </div>
      <div class="btns-people">
        <van-button type="primary"
                    plain
                    size="large"
                    v-on:click="goLoginOlderOrRelation('服务人员')"
                    v-model="ServiceStaff">服务人员</van-button>
      </div>
      <div class="btns-people">
        <van-button type="primary"
                    plain
                    size="large"
                    v-on:click="goLoginOlderOrRelation('适老化改造')"
                    v-model="ServiceStaff">适老化改造</van-button>
      </div>
      <div class="btns-people">
        <van-button type="primary"
                    plain
                    size="large"
                    v-on:click="goLoginOlderOrRelation('老年人能力评估')"
                    v-model="ServiceStaff">老年人能力评估</van-button>
      </div>
    </div>
    <LoginForm v-else
               :loginShow="loginShow" />
  </div>
</template>

<script>
import LoginForm from './loginForm'
export default {
  name: 'login',
  data() {
    return {
      // 服务人员
      ServiceStaff: '1',
      // 老人/家属
      OlderOrRelation: '2',
      loginShow: 'login',
    }
  },
  components: {
    LoginForm,
  },
  methods: {
    goLoginOlderOrRelation(name) {
      this.loginShow = name
      this.$route.meta.title = '登录'
    },
  },
}
</script>

<style lang="less" scoped>
.login-container {
  height: calc(100vh - 68px);
  position: relative;
  .login-bg {
    img {
      width: 100%;
    }
  }
  .login-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60%;
    background-color: #fff;
    padding: 38px 21px;
    box-sizing: border-box;
    border-radius: 20px 20px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    .login-notice {
      font-size: 25px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.61);
      line-height: 36px;
      letter-spacing: 1px;
      box-sizing: border-box;
      margin-top: 20px;
    }
    .btns-people {
      width: 100%;
      margin-top: 20px;
    }
    .btns-old-people {
      margin-top: 20px;
      width: 100%;
    }
  }
}
</style>
