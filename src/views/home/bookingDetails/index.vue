<template>
  <div class="booking_container">
    <!-- activity_info -->
    <!-- this module can render from interface -->
    <!-- used form localStorage -->
    <div class="activity_info">
      <div class="header">活动信息</div>
      <div class="name">{{ comeFromLocalObj.activeTitle }}</div>
      <div class="join_time activity_time">
        报名时间：{{ comeFromLocalObj.activeStartTime }}--{{
          comeFromLocalObj.activeEndTime
        }}
      </div>
      <div class="join_time address">
        活动地点：{{ comeFromLocalObj.activeSite }}
      </div>
      <div class="join_time type">
        报名类型：{{ comeFromLocalObj.applyType }}
      </div>
      <div class="join_time cost">
        活动费用：{{
          comeFromLocalObj.activeCost ? comeFromLocalObj.activeCost : "待定价"
        }}
      </div>
    </div>
    <!-- applicant_info -->
    <div class="applicant_people_container">
      <div class="header">申请人信息</div>
      <el-form
        :model="activityBookingForm"
        :rules="activityBookingFormRules"
        ref="activityBookingForm"
        label-width="100px"
        class="activityBookingForm"
        label-position="left"
      >
        <div class="name_wrap">
          <!-- <span class="label_name">姓名</span>
          <van-field
            v-model="name"
            placeholder="请输入"
            input-align="right"
            :rules="[{ required: true, message: '请填写用户名' }]"
          /> -->
          <!-- element ui -->
          <el-form-item label="姓名" prop="name" class="username-field">
            <el-input
              v-model="activityBookingForm.name"
              class="addChild"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </div>
        <div class="name_wrap">
          <!-- <span class="label_name">身份证</span>
          <van-field
            v-model="idCard"
            placeholder="请输入"
            input-align="right"
            name="validator"
            :rules="[{ required: true, message: '身份证格式错误' }]"
          /> -->
          <el-form-item label="身份证" prop="idCard" class="username-field">
            <el-input
              v-model="activityBookingForm.idCard"
              class="addChild"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </div>
        <div class="name_wrap">
          <!-- <span class="label_name phone">联系电话</span>
          <van-field
            v-model="phone"
            placeholder="请输入"
            input-align="right"
            :rules="[{ required: true, message: '请填写联系电话' }]"
          /> -->
          <el-form-item label="联系电话" prop="phone" class="username-field">
            <el-input
              v-model="activityBookingForm.phone"
              class="addChild"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </div>
        <div class="name_wrap">
          <!-- <span class="label_name">备注</span>
          <van-field
            v-model="remark"
            placeholder="请输入"
            input-align="right"
            :rules="[{ required: true, message: '请填写备注' }]"
          /> -->
          <el-form-item label="备注" prop="remark" class="username-field">
            <el-input
              v-model="activityBookingForm.remark"
              class="addChild"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- tips -->
    <div class="tips_contaier">
      注：采用线上预约，线下沟通。活动方会电话联系，请保持电话畅通。
    </div>
    <div class="GoAddChildAccount">
      <van-button
        type="primary"
        size="large"
        v-on:click="handleGoYuYue"
        class="GoAdd"
        :disabled="this.isYuyue == '我要预约' ? false : true"
        ref="GoAdd"
        >{{ isYuyue == "已预约" ? "已预约" : "我要预约" }}</van-button
      >
    </div>
  </div>
</template>

<script>
import { getSessionItem, setItem, getItem } from "@/utils/storage.js";
import { addActiveAddItem } from "@/api/home.js";

export default {
  name: "bookingDetails",
  data() {
    // 身份证的校验规则
    var checkIdCard = (idCardReg, value, cb) => {
      var idCardReg =
        /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
      if (idCardReg.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的身份证号 ！"));
    };

    // 手机号的校验规则
    var checkTelephone = (telephoneReg, value, cb) => {
      var telephoneReg =
        /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/;
      if (telephoneReg.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号 ！"));
    };

    return {
      comeFromLocalObj: {},
      activityBookingForm: {
        name: "",
        idCard: "",
        phone: "",
        remark: "",
      },
      activityBookingFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { validator: checkIdCard, trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkTelephone, trigger: "blur" },
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
      isYuyue: "我要预约",
    };
  },

  mounted() {
    this.comeFromLocalObj = getItem("activityDetails");
  },

  methods: {
    handleGoYuYue() {
      this.$refs.activityBookingForm.validate((valid) => {
        if (!valid) {
          return false;
        } else {
          let data = {
            activeId: this.comeFromLocalObj.id,
            name: this.activityBookingForm.name,
            idCard: this.activityBookingForm.idCard,
            contactPhone: this.activityBookingForm.phone,
            remark: this.activityBookingForm.remark,
          };
          addActiveAddItem(data).then((res) => {
            if (res.code && res.code == 200) {
              this.$message.success("预约成功");
              this.isYuyue = "已预约";
              // local 存储 isYuyue 的值等到返回到上一级进行取出
              // setItem("isYuyue", this.isYuyue);

              // this.$router.go(-1);
              // this.$refs.GoAdd.style.backgroundColor = "#000"
            } else {
              this.$message.error("手机号格式错误");
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.booking_container {
  background-color: #f6f6f6;
  .activity_info {
    height: 186px;
    padding: 0px 14px;
    border: 1px solid #fff;
    background-color: #fff;
    text-align: left;
    .header {
      height: 27px;
      font-size: 20px;
      margin-top: 19px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #000000;
      line-height: 28px;
    }
    .name {
      height: 25px;
      font-size: 18px;
      margin-top: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      line-height: 25px;
    }
    .join_time {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.6);
      line-height: 20px;
    }
    .activity_time {
      height: 40px;
    }
  }
  .applicant_people_container {
    height: 250px;
    background-color: #fff;
    .header {
      height: 27px;
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #000000;
      line-height: 28px;
      text-align: left;
      padding: 0px 14px;
    }
    .name_wrap {
      height: 55px;
      margin-top: 1px;
      border-bottom: 1px solid #eee;
      padding: 0px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .label_name {
        width: 70px;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 25px;
        text-align: left;
      }
      .phone {
        width: 100px;
      }
      // modify input placeholder attr's font-size
      /deep/.van-field__control--right {
        font-size: 16px;
      }
      /deep/.el-form-item.username-field {
        width: 357px;
        height: 40px;
        line-height: 60px;
        margin-bottom: 0px;
      }
      // 更改 input 表单边框
      /deep/.addChild .el-input__inner {
        border: none;
      }
      // 更改form表单 label 的字体大小
      /deep/.el-form-item__label {
        font-size: 18px;
      }
      // 更改本组件中表单元素错误提示的位置
      /deep/.el-form-item__error {
        top: 65%;
        left: 15px;
      }
    }
  }
  .tips_contaier {
    margin-top: 18px;
    padding: 0px 14px;
    height: 54px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 27px;
    text-align: left;
  }
  .GoAddChildAccount {
    height: 53px;
    margin-top: 20px;
    padding: 0px 12px;
    .GoAdd {
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 25px;
    }
  }
}
</style>
