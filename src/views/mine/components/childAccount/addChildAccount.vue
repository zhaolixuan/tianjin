<template>
  <div class="add-child-account">
    <!-- <van-form class="add-child-form" ref="addChildForm"> -->
    <!-- 用户 -->
    <!-- <div class="username">
        <van-field
          class="username-field"
          v-model="addChildAccountForm.username"
          name="用户名"
          label="用户名"
          :required="true"
          placeholder="请输入亲属姓名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
      </div> -->
    <!-- 手机 -->
    <!-- <div class="username">
        <van-field
          class="username-field"
          v-model="addChildAccountForm.phone"
          name="手机"
          label="手机"
          placeholder="请输入子女手机号--默认为账户名"
          :rules="[{ validator, message: '手机号格式错误' }]"
        />
      </div> -->
    <!-- 昵称 -->
    <!-- <div class="username">
        <van-field
          class="username-field"
          v-model="addChildAccountForm.idNumber"
          name="身份证号"
          label="身份证号"
          placeholder="请输入--用于验证是否为亲属关系"
          :rules="[{ required: true, message: '请输入身份证号' }]"
        />
      </div> -->
    <!-- 年龄 -->
    <!-- <div class="username">
        <van-field
          class="username-field"
          v-model="addChildAccountForm.password"
          name="密码"
          label="密码"
          placeholder="默认与主账号密码一致，支持修改"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </div> -->
    <!-- <div class="realation_box">
        <span>关系</span>
        <el-select
          v-model="realationship"
          placeholder="请选择"
          class="rea_sel"
          v-on:change="handleRealationChange"
        >
          <el-option
            v-for="(item, index) in realationshipList"
            :key="index"
            :value="item.value"
            :label="item.label"
          >
          </el-option>
        </el-select>
      </div> -->
    <!-- </van-form> -->

    <!-- el-form 的表单 -->
    <el-form
      :model="addChildAccountForm"
      :rules="addChildAccountFormRules"
      ref="addChildForm"
      label-width="100px"
      class="add-child-form"
      label-position="left"
    >
      <div class="username">
        <el-form-item label="用户名" prop="username" class="username-field">
          <el-input
            v-model="addChildAccountForm.username"
            class="addChild"
            placeholder="请输入亲属姓名"
          ></el-input>
        </el-form-item>
      </div>
      <div class="username">
        <el-form-item label="手机" prop="phone" class="username-field">
          <el-input
            v-model="addChildAccountForm.phone"
            class="addChild"
            placeholder="请输入子女手机号-默认为账户名"
          ></el-input>
        </el-form-item>
      </div>
      <div class="realation_box">
        <span>关系</span>
        <el-select
          v-model="realationship"
          placeholder="请选择"
          class="rea_sel"
          v-on:change="handleRealationChange"
        >
          <el-option
            v-for="(item, index) in realationshipList"
            :key="index"
            :value="item.value"
            :label="item.label"
          >
          </el-option>
        </el-select>
      </div>
    </el-form>
    <!-- 确定 -->
    <div class="submitAddChildAccount">
      <van-button
        type="primary"
        size="large"
        v-on:click="submitAddChildAccount('addChildForm')"
        class="submitAdd"
        >确定</van-button
      >
    </div>
  </div>
</template>

<script>
import { childrenAccountAdd } from "@/api/mine.js";

export default {
  name: "addAccount",

  data() {
    // 手机号的校验
    var checkTelephone = (telephoneReg, value, cb) => {
      var telephoneReg =
        /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/;
      if (telephoneReg.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号 ！"));
    };

    return {
      addChildAccountForm: {
        username: "",
        phone: "",
        idNumber: "",
        password: "",
      },

      addChildAccountFormRules: {
        username: [
          { required: true, message: "请输入亲属姓名", trigger: "blur" },
        ],

        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkTelephone, trigger: "blur" },
        ],

        realationship: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },

      realationship: "",
      realationshipList: [
        {
          label: "父母",
          value: "父母",
        },
        {
          label: "子女",
          value: "子女",
        },
        {
          label: "兄弟姐妹",
          value: "兄弟姐妹",
        },
        {
          label: "夫妻",
          value: "夫妻",
        },
      ],
    };
  },

  mounted() {
    // console.log(this.$route.query.id);
  },

  methods: {
    submitAddChildAccount() {
      // 预校验
      this.$refs.addChildForm.validate((valid) => {
        // console.log(valid);
        if (!valid) {
          return false;
        } else {
          let params = {
            childAccount: this.addChildAccountForm.phone,
            childName: this.addChildAccountForm.username,
            relationship: this.realationship,
          };
          // 新增子女账户
          childrenAccountAdd(params).then((res) => {
            if (res.code == 200) {
              // this.$router.push({path:'/childAccount',query:{isFresh:true}});
              this.$router.push({ path: "/childAccount" });
            }
          });
        }
      });
    },

    handleRealationChange(val) {
      // console.log(val);
      this.realationship = val;
    },
  },
};
</script>

<style lang="less" scoped>
.add-child-account {
  .add-child-form {
    background-color: #fff;
    .username {
      height: 55px;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      padding: 0px 12px;
      // .username-field {
      //   font-size: 14px;
      //   font-family: PingFangSC-Medium, PingFang SC;
      //   font-weight: 500;
      //   color: #000000;
      //   line-height: 25px;
      //   background-color: #fff;
      //   /deep/.van-field__value .van-field__control {
      //     text-align: right;
      //   }
      // }
      /deep/.el-form-item.username-field {
        width: 357px;
        height: 40px;
        line-height: 60px;
        margin-bottom: 0px;
      }
      /deep/.addChild .el-input__inner {
        border: none;
      }
      /deep/.el-form-item__label {
        font-size: 18px;
      }
      // 更改本组件中表单元素错误提示的位置
      /deep/.el-form-item__error {
        top: 65%;
        left: 15px;
      }
    }
    .realation_box {
      height: 55px;
      padding: 0px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        margin-left: 10px;
        font-size: 20px;
      }
      /deep/.el-select.rea_sel {
        width: 120px;
      }
    }
  }
  .submitAddChildAccount {
    height: 53px;
    margin-top: 20px;
    padding: 0px 12px;
    .submitAdd {
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 25px;
    }
  }
}
</style>
