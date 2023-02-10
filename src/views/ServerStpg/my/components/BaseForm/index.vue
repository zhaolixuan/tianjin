<template>
  <div class="base_info_form_container">
    <!-- 验证通过表单区域 -->
    <div class="authorization">
      <van-form @submit="handleSubmit"
                class="baseInfoForm"
                v-model="baseInfoFormInterface">
        <div class="base_form_avator">
          <span>头像</span>
          <img :src="fileList.avator"
               alt="" />
          <!-- <SmUpload
            v-show="!fileList.avator"
            :maxCount="1"
            @postImg="postImg"
          /> -->
        </div>
        <div class="base_form_username">
          <span>姓名</span>
          <van-field readonly
                     input-align="right"
                     v-model="baseInfoFormInterface.assessorName"
                     name="用户名"
                     placeholder="" />
        </div>
        <div class="base_form_username">
          <span>手机</span>
          <van-field readonly
                     input-align="right"
                     v-model="baseInfoFormInterface.phone"
                     name="用户名"
                     placeholder="" />
        </div>
        <div class="base_form_username">
          <span>机构名称</span>
          <van-field readonly
                     input-align="right"
                     v-model="baseInfoFormInterface.mealsInfoName"
                     name="用户名"
                     placeholder="" />
        </div>
        <div class="base_form_username">
          <span>身份证号</span>
          <van-field readonly
                     input-align="right"
                     v-model="baseInfoFormInterface.assessorIdcard"
                     name="用户名"
                     placeholder="" />
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { getAssessorInfo } from '@/api/serverStpg.js'

export default {
  data() {
    return {
      authorization: true,
      baseInfoForm: {
        username: '',
        phone: '',
        nickName: '',
        hiredate: '',
        organnization: '',
        idNumber: '',
      },
      baseInfoFormInterface: {},
      fileList: {
        avator: '',
      },
    }
  },

  mounted() {
    this.getData()
  },

  methods: {
    handleSubmit() {
      // console.log(this.baseInfoForm);
    },

    postImg(data) {
      // console.log(file);
    },

    getData() {
      getAssessorInfo().then((res) => {
        console.log(res)
        this.baseInfoFormInterface = {
            ...res.data
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.base_info_form_container {
  height: 410px;
  // 验证的表单样式
  .authorization {
    background-color: #fff;
    .baseInfoForm {
      height: 100%;
      .base_form_avator {
        height: 79px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
        padding: 0px 14px;
        span {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;
          line-height: 22px;
        }
        img {
          width: 54px;
          height: 54px;
        }
        /deep/.van-uploader {
          width: 54px;
          height: 54px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .van-uploader__wrapper {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .van-uploader__upload {
              width: 100%;
              height: 100%;
              margin: 0px;
            }
          }
        }
      }
      .base_form_username {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 55px;
        padding: 0px 14px;
        border: 1px solid #eee;
        span {
          width: 144px;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;
          line-height: 22px;
          text-align: left;
        }
      }
    }
  }
  
}
</style>
