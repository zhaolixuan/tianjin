<template>
  <div class="login-container">
    <div class="login-bg">
      <img src="../../assets/images/jjyl-yasuo.jpg" alt="" />
    </div>
    <div class="login-form-area">
      <div class="login-form">
        <el-form
          :model="loginForm"
          :rules="loginFormRules"
          ref="loginForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入账号"
              class="username"
              prefix-icon="el-icon-mobile"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              class="password"
              prefix-icon="el-icon-key"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
        <div>
          <van-button type="primary" size="large" v-on:click="goToHome"
            >登录</van-button
          >
        </div>
      </div>
      <van-popup
        style="background: transparent"
        v-model="show"
        get-container=".login-form-area"
        :close-on-popstate="true"
        :close-on-click-overlay="false"
      >
        <van-loading size="30px" vertical color="#fff">登录中...</van-loading>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { LoginKsh, Login } from "@/api/home";
import { mapMutations } from "vuex";
import { setCookie, setSessionItem } from "@/utils/storage";
//import Vconsole from "vconsole";
import { android } from "../mine";
//let vConsole = new Vconsole();
export default {
  props: ["loginShow"],
  name: "loginForm",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginFormRules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },

      show: false,
      token: "",
    };
  },

  mounted() {
    this.token = this.$route.query.token;
    if (this.token != "" && this.token != undefined) {
      console.log(this.token);
      setCookie("gunsToken", this.$route.query.token);
      this.SET_INFO_NAME(this.$route.query.username);
      setSessionItem("username", this.$route.query.userName);
      setSessionItem("account", this.$route.query.phoneIdCrad);
      setSessionItem("idCard", this.$route.query.username);
      this.getUserInfo();
    }
  },

  methods: {
    ...mapMutations(["SET_INFO_NAME"]),
    goToHome() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          const data = {
            account: this.loginForm.username,
            password: this.loginForm.password,
          };
          Login(data).then((res) => {
            console.log(JSON.stringify(res.data));
            if (res.code && res.code == "200") {
              setCookie("gunsToken", res.data.token);
              this.SET_INFO_NAME(this.loginForm.username);
              setSessionItem("username", res.data.userName);
              setSessionItem("account", this.loginForm.phoneIdCrad);
              setSessionItem("idCard", this.loginForm.username);

              try {
                window.android.onLoinGoTo(JSON.stringify(res.data));
              } catch (e) {
                console.log("出错了");
              }

              this.getUserInfo();
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    getUserInfo() {
          this.show = true;
      LoginKsh({}).then((res) => {

        if (res.code && res.code == "200") {
          //  res.data.roleId 39 管理员权限
          if (res.data.roleId != undefined && ['39','41'].includes(res.data.roleId)) {
            this.$message.success("用户登录成功！");
            setTimeout(() => {
               this.show = false;
              this.$router.replace({ name: "ServeKsh" });
            }, 1000);
          } else {
               this.show = false;
            this.$message.error("登录失败没有权限！");
          }
        } else {
             this.show = false;
          this.$message.error(res.msg);
        }
      });
    },
  },
};
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
  .login-form-area {
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
    // justify-content: space-between;
    .login-notice {
      font-size: 25px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.61);
      line-height: 36px;
      letter-spacing: 1px;
      margin-top: 20px;
    }
    .login-form {
      margin-top: 20px;
      width: 100%;
      box-sizing: border-box;
      /deep/ .username {
        border: 1px solid #05b178;
        border-radius: 4px;
        border: 1px solid #05b178;
        display: flex;
        align-items: center;
        padding: 3px 0;
        .el-input__inner {
          border: none;
          padding-left: 40px;
        }
        .el-input__icon {
          display: flex;
          align-items: center;
        }
      }
      /deep/ .password {
        border: 1px solid #05b178;
        border-radius: 4px;
        padding: 3px 0;
        .el-input__inner {
          border: none;
          padding-left: 40px;
        }
        .el-icon-key {
          display: flex;
          align-items: center;
        }
      }
    }
    .bottom {
      height: 40px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
      line-height: 20px;
      text-align: left;
      padding: 0px 20px;
    }
    .selectiden {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.5);
      margin-bottom: 14px;
      p {
        margin-right: 28px;
      }
      span {
        margin-right: 15px;
      }
      .active {
        color: #000000;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(
            180deg,
            rgba(10, 198, 157, 0) 0%,
            #049464 100%
          );
        }
      }
    }
    .btn {
      position: absolute;
      right: 10px;
      top: 0;
      width: 123px;
      height: 34px;
      background: rgba(5, 177, 120, 0.1);
      border-radius: 5px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #05b178;
      line-height: 34px;
      text-align: center;
      transform: translateY(15%);
    }
  }
  .unpd {
    //   padding-top: 10px;
    padding: 38px 21px;
  }
}
</style>
