<template>
  <div class="login-form-area"
       :class="{ unpd: loginShow == '老人/家属' }">
    <div class="login-notice"
         v-if="loginShow == '适老化改造'">
      {{ loginShow }}
    </div>

    <div class="login-notice"
         v-if="loginShow == '老年人能力评估'">
      {{ loginShow }}
    </div>
    <div class="login-notice"
         v-else>{{ loginShow }}端</div>
    <div class="login-form"
         v-if="loginShow == '老人/家属'">
      <!-- <div class="selectiden">
        <p>选择身份</p>
        <span
          v-for="i in selectiden"
          :key="i.id"
          :class="activeiden == i.id ? 'active' : ''"
          @click="activeiden = i.id"
          >{{ i.name }}</span
        >
      </div> -->
      <el-form :model="loginForm"
               :rules="loginFormRules"
               ref="loginForm"
               class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"
                    placeholder="请输入手机号码"
                    class="username"
                    prefix-icon="el-icon-mobile"></el-input>
        </el-form-item>
        <el-form-item prop="kaptcha">
          <el-input v-model="loginForm.kaptcha"
                    placeholder="请输入验证码"
                    class="password"
                    prefix-icon="el-icon-key"></el-input>
          <div class="btn"
               @click="getkaptcha">
            {{ text == "获取验证码" ? text : text + "S后重新发送" }}
          </div>
        </el-form-item>
        <!-- <el-form-item prop="idCard">
          <el-input
            v-model="loginForm.idCard"
            placeholder="请输入老人身份证号"
            class="password"
            prefix-icon="el-icon-postcard"
          ></el-input>
        </el-form-item> -->
      </el-form>
      <div>
        <van-button type="primary"
                    size="large"
                    v-on:click="goToHome">登录</van-button>
      </div>
    </div>
    <div class="login-form"
         v-else>
      <el-form :model="loginForm"
               :rules="loginFormRules"
               ref="loginForm"
               class="demo-ruleForm">
        <el-form-item prop="phoneIdCrad">
          <el-input v-model="loginForm.phoneIdCrad"
                    placeholder="请输入手机号码/身份证号"
                    class="username"
                    prefix-icon="el-icon-mobile"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"
                    placeholder="请输入密码"
                    class="password"
                    prefix-icon="el-icon-key"
                    show-password></el-input>
        </el-form-item>
      </el-form>
      <div>
        <van-button type="primary"
                    size="large"
                    v-on:click="goToHome">登录</van-button>
      </div>
    </div>
    <van-popup style="background: transparent"
               v-model="show"
               get-container=".login-form-area"
               :close-on-popstate="true"
               :close-on-click-overlay="false">
      <van-loading size="30px"
                   vertical
                   color="#fff">登录中...</van-loading>
    </van-popup>
  </div>
</template>

<script>
import { Login, Getkaptcha, LoginKaptcha } from '@/api/home'
import { setCookie, setSessionItem } from '@/utils/storage'
import { mapMutations } from 'vuex'
export default {
  props: ['loginShow'],
  name: 'loginForm',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        idCard: '',
        phoneIdCrad: '',
        kaptcha: '',
      },
      loginFormRules: {
        username: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: '手机号格式不对',
            trigger: 'blur',
          },
        ],
        idCard: [
          {
            required: true,
            message: '请填写证件号码',
            trigger: 'blur',
          },
          {
            pattern:
              /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '证件号码格式有误！',
            trigger: 'blur',
          },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        kaptcha: [
          {
            required: true,
            message: '请填写验证码',
            trigger: 'blur',
          },
        ],
        phoneIdCrad: [
          {
            required: true,
            message: '请输入手机号码/身份证号',
            trigger: 'blur',
          },
        ],
      },
      selectiden: [
        {
          name: '老人',
          id: 0,
        },
        {
          name: '家属',
          id: 1,
        },
      ],
      activeiden: '0',
      text: '获取验证码',
      show: false,
    }
  },

  mounted() {},

  methods: {
    ...mapMutations(['SET_INFO_NAME']),
    getkaptcha() {
      this.$refs['loginForm'].validateField('username', (valid) => {
        if (valid != '') return
        if (this.text != '获取验证码') return
        Getkaptcha({ phone: this.loginForm.username })
          .then((res) => {
            if (res && res.code == 200) {
              this.$toast.success('验证码发送成功')
              this.text = 60
              let time = setInterval(() => {
                if (this.text <= 0) {
                  clearInterval(time)
                  this.text = '获取验证码'
                } else {
                  this.text--
                }
              }, 1000)
            } else {
              this.$toast.fail('验证码发送失败')
            }
          })
          .catch((err) => {})
      })
    },
    goToHome() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.show = true
          if (this.loginShow == '老人/家属') {
            const data = {
              phone: this.loginForm.username,
              // parentCardNumber: this.loginForm.idCard,
              kaptcha: this.loginForm.kaptcha,
              // loginType: this.activeiden,
            }

            LoginKaptcha(data).then((res) => {
              this.show = false
              if (res.code && res.code == '200') {
                this.$message.success('用户登录成功！')
                setCookie('gunsToken', res.data.token)
                this.SET_INFO_NAME(res.data.userName)
                setSessionItem('username', res.data.userName)
                setSessionItem('phone', res.data.phone)
                setSessionItem('cardNumber', res.data.cardNumber)
                setCookie('idCard', 'idCard' + res.data.idcard)
                res.data.identityType = 'theElderly_personnel' //家属员标识
                try {
                  window.android.onLoinGoTo(JSON.stringify(res.data)) //Android 交互
                } catch (e) {
                  console.log('出错了')
                }

                setTimeout(() => {
                  if (this.GetQueryValue('redirect')) {
                    this.$router.push({ name: this.GetQueryValue('redirect') })
                  } else {
                    this.$router.push({ path: '/home' })
                  }
                }, 300)
              } else if (res.code == '402') {
                // 没有绑定养老服务卡
                this.$dialog
                  .confirm({
                    title: '绑定服务卡',
                    message: '该手机号未绑定养老卡，是否现在绑定？',
                  })
                  .then(() => {
                    this.$router.push({ path: '/binding' })
                  })
                  .catch(() => {
                    // on cancel
                  })
              } else {
                this.$message.error(res.msg)
              }
            })
          } else if (this.loginShow == '服务人员') {
            const data = {
              account: this.loginForm.phoneIdCrad,
              password: this.loginForm.password,
            }
            Login(data).then((res) => {
              this.show = false
              if (res.code && res.code == '200') {
                this.$message.success('用户登录成功！')
                setCookie('gunsToken', res.data.token)
                this.SET_INFO_NAME(this.loginForm.username)
                setSessionItem('username', res.data.userName)
                setSessionItem('account', this.loginForm.phoneIdCrad)
                res.data.identityType = 'server_personnel' //服务人员标识
                res.data.phoneIdCrad = this.loginForm.phoneIdCrad
                res.data.phone = this.loginForm.username
                console.log(res.data)

                try {
                  window.android.onLoinGoTo(JSON.stringify(res.data))
                } catch (e) {
                  console.log('出错了')
                }

                // setSessionItem(
                //     'idCard',
                //     this.loginForm.username
                // )
                setTimeout(() => {
                  this.$router.push({ name: 'ServerHome' })
                }, 1000)
              } else {
                this.$message.error(res.msg)
              }
            })
          } else if (this.loginShow == '适老化改造') {
            const data = {
              account: this.loginForm.phoneIdCrad,
              password: this.loginForm.password,
            }
            Login(data).then((res) => {
              this.show = false
              if (res.code && res.code == '200') {
                this.$message.success('用户登录成功！')
                setCookie('gunsToken', res.data.token)
                this.SET_INFO_NAME(this.loginForm.username)
                setSessionItem('username', res.data.userName)
                setSessionItem('account', this.loginForm.phoneIdCrad)
                setSessionItem('idCard', this.loginForm.username)
                res.data.identityType = 'slh_personnel' //适老化人员标识
                res.data.phoneIdCrad = this.loginForm.phoneIdCrad
                res.data.idCard = this.loginForm.username
                try {
                  window.android.onLoinGoTo(JSON.stringify(res.data))
                } catch (e) {
                  console.log('出错了')
                }
                setTimeout(() => {
                  this.$router.push({ name: 'Slhgzhome' })
                  //this.$router.push({ name: 'ServerHome' })
                }, 1000)
              } else {
                this.$message.error(res.msg)
              }
            })
            // this.$router.push({ name: 'Slhgzhome' })
          } else if (this.loginShow == '老年人能力评估') {
            const data = {
              account: this.loginForm.phoneIdCrad,
              password: this.loginForm.password,
            }
            Login(data).then((res) => {
              console.log(res)
              this.show = false
              if (res.code && res.code == '200') {
                this.$message.success('用户登录成功！')
                setCookie('gunsToken', res.data.token)
                this.SET_INFO_NAME(this.loginForm.userName)
                setSessionItem('username', res.data.userName)
                setSessionItem('userId', res.data.userId)
               
                try {
                  window.android.onLoinGoTo(JSON.stringify(res.data))
                } catch (e) {
                  console.log('出错了')
                }
                setTimeout(() => {
                  this.$router.push({ name: 'ServeStpgHome' })
                }, 1000)
              } else {
                this.$message.error(res.msg)
              }
            })
          }
          window.navigatorApi.watchPosition()
        } else {
          return false
        }
      })
    },
    GetQueryValue(queryName) {
      var query = decodeURI(window.location.search.substring(1))
      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] == queryName) {
          return pair[1]
        }
      }
      return null
    },
  },
}
</script>

<style lang="less" scoped>
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
        content: '';
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
</style>
