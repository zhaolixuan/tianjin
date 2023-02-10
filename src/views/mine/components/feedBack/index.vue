<template>
  <div class="feedBack_container">
    <div class="header">
      <div class="left_tip">选择反馈类型</div>
      <div class="select">
        <el-select v-model="defaultSelect" placeholder="请选择">
          <el-option
            v-for="item in defaultSelectList"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="feedBack_content">
      <div class="remark">
        <el-form
          :model="feedBackForm"
          :rules="feedBackRuleFormRules"
          ref="feedBackRuleForm"
          class="feedBackRuleForm"
        >
          <el-form-item prop="feedBack">
            <el-input
              type="textarea"
              v-model="feedBackForm.feedBack"
              class="feedBack"
              :rows="3"
              placeholder="请输入反馈意见"
              resize="none"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="pic_box">
        <SmUpload class="feedBack" :maxCount="2" @postImg="postImg" />
      </div>
    </div>
    <van-form @submit="submitFeedBack" class="text">
      <div class="remark">
        <van-field
          v-model="text"
          placeholder="手机/邮箱/QQ（必填）"
          :rules="[{ required: true }]"
        />
      </div>
    </van-form>
    <!-- 已提交之后 防止再次点击提交 所以这个不绑定事件代替 -->
    <div
      :class="['submit', this.btnText == '已提交' ? 'noPress' : '']"
      v-if="this.btnText == '已提交'"
    >
      <span>{{ btnText }}</span>
    </div>
    <!-- 未提交时候 触发的是这个按钮区域 -->
    <div
      :class="['submit', this.btnText == '已提交' ? 'noPress' : '']"
      v-on:click="submitFeedBack"
      v-else
    >
      <span>{{ btnText }}</span>
    </div>
  </div>
</template>

<script>
import { feedbackInfoadd, feedbackInfoupload } from "@/api/home";
import { removeAaary } from "@/utils/index";
import { getSessionItem } from "@/utils/storage";
import SmUpload from "@/components/common/SmUpload";

export default {
  name: "feedBack",
  data() {
    return {
      text: "",
      defaultSelect: "产品体验",
      defaultSelectList: [
        { label: "服务相关", value: 0 },
        { label: "派单增速", value: 1 },
        { label: "优惠力度", value: 2 },
        { label: "产品功能", value: 3 },
        { label: "产品体验", value: 4 },
        { label: "其它问题", value: 5 },
      ],
      feedBackForm: {
        feedBack: "",
      },
      feedBackRuleFormRules: {
        feedBack: [
          { required: true, message: "请输入反馈意见", trigger: "blur" },
        ],
      },
      fileList: [],
      btnText: "提交",
    };
  },
  components: {
    SmUpload,
  },
  methods: {
    postImg(data) {
      this.fileList = data.fileList;
      var forms = new FormData();
      forms.append("files", data.file);
      feedbackInfoupload(forms)
        .then((res) => {
          for (let index = 0; index < data.fileList.length; index++) {
            if (data.fileList[index].id == "") {
              if (res.code && res.code == 200) {
                let item = res.data[0];
                data.fileList[index].urlName = item.urlName;
                data.fileList[index].name = item.name;
                data.fileList[index].url = item.url;
                data.fileList[index].id = item.id || 1;
                data.fileList[index].status = "done";
                data.fileList[index].message = "上传成功";
              } else {
                data.fileList[index].status = "failed";
                data.fileList[index].message = "上传失败";
              }
            }
          }
          this.fileList = data.fileList;
          // console.log(this.fileList);
        })
        .catch((err) => {});
    },
    submitFeedBack() {
      this.$refs.feedBackRuleForm.validate((valid) => {
        if (!valid) {
          return false;
        } else {
          let files = this.fileList.map((i) => {
            return {
              urlName: i.urlName,
              name: i.name,
              url: i.url,
            };
          });
          let data = {
            type: this.defaultSelect,
            files,
            feedbackMessage: this.feedBackForm.feedBack,
            // loginType: getSessionItem("loginType"),
            contactWay: this.text,
          };
          feedbackInfoadd(data)
            .then((res) => {
              // 测试让加上提示信息
              if (res.code && res.code == 200) {
                this.btnText = "已提交";
                this.$message.success("提交成功");
              }
            })
            .catch((err) => {});
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.feedBack_container {
  position: relative;
  background: #f6f6f6;
  height: calc(99vh - 65px);
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 55px;
    padding: 0px 14px;
    background-color: #fff;
    border: 1px solid #eee;
    .left_tip {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 25px;
    }
    .select {
      width: 100px;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
  .feedBack_content {
    height: 254px;
    padding: 17px 14px 0px 13px;
    background-color: #fff;
    .remark {
      width: 348px;
      height: 105px;
      background-color: rgba(0, 0, 0, 0.02);
      display: flex;
      justify-content: center;
      align-items: center;
      .feedBackRuleForm.el-form {
        width: 322px;
        height: 52px;
        /deep/ .feedBack.el-textarea {
          width: 322px;
          height: 52px;
          margin-top: 0px;
        }
        /deep/ .el-textarea__inner {
          width: 322px;
          height: 52px;
          border: none;
          background-color: #fff;
        }
      }
    }
    .pic_box {
      height: 83px;
      margin-top: 15px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      /deep/.feedBack.van-uploader {
        border: 1px dotted rgba(0, 0, 0, 0.11);
      }
   
      /deep/.van-uploader__upload {
        width: 83px !important;
        height: 83px !important;
        border-radius: 0px;
      }
    }
  }
  .text {
    margin-top: 10px;
    padding: 17px 14px;
    background: #fff;
    .remark {
      padding: 14px;
      background-color: rgba(0, 0, 0, 0.02);
    }
  }
  .submit {
    position: absolute;
    bottom: 27px;
    left: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 352px;
    height: 53px;
    background: #05b178;
    border-radius: 4px;
    span {
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 25px;
    }
  }
  // 已提交样式
  .noPress {
    background-color: #7fddad;
  }
}
</style>
