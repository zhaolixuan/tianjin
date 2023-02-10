<template>
  <div class="child-account-container">
    <!-- 暂无 -->
    <div
      class="no-child-list"
      v-if="childAccountList.length < 0"
      v-on:click="handleToggleShow"
    >
      <div class="notice-info">暂无子女账号</div>
    </div>
    <!-- 存在 -->
    <div
      class="have-child-account-container"
      v-else
      v-on:click="handleToggleShow"
    >
      <div
        class="child-account-item"
        v-for="(item, index) in approvedList"
        :key="index"
      >
        <div class="item-avator">
          <img
            src="../../../../assets/images/zinvtouxiang.png"
            alt=""
            class="img-avator"
          />
        </div>
        <div class="item-name-phone-container">
          <div class="item-name">{{ item.childName }}</div>
          <div class="item-phone">{{ item.childAccount }}</div>
        </div>
        <van-button
          type="default"
          class="modify unbind"
          v-on:click="handleUnbind(item.childId)"
          >解绑</van-button
        >
        <!-- 根据状态码判断审核状态 -->
        <div class="status">
          {{
            item.status == 0
              ? "待审核"
              : item.status == 1
              ? "审核通过"
              : "审核失败"
          }}
        </div>
        <!-- <van-button
          type="default"
          class="modify"
          v-on:click="handleModify(item.id)"
          >修改</van-button
        > -->
      </div>
    </div>
    <!-- 新增按钮 -->
    <div class="GoAddChildAccount" v-if="this.childAccountList.length < 5">
      <van-button
        type="primary"
        size="large"
        v-on:click="hanldeGoAddChildAccount"
        class="GoAdd"
        >新增子女账号</van-button
      >
    </div>
    <!-- 替换显示的做法 -->
    <!-- <div class="GoAddChildAccount" v-else></div> -->
    <!-- 文字提示 -->
    <div class="notice-heaeder">绑定须知</div>
    <div class="notice-content">
      新增子账号后，子账号与主账号使用权限一致，通过手机号验证码登录即可;
      <br />
      最多绑定5个子账号
    </div>
    <div class="approvalrecord" @click="hanldeGoApprovalRecord">审核记录</div>
  </div>
</template>

<script>
import addChildAccount from "@/views/mine/components/childAccount/addChildAccount.vue";
import { getChildUserList, judgeAmount, childRemove } from "@/api/mine.js";
export default {
  name: "childAccount",
  data() {
    return {
      childAccountList: [
        {
          id: 1,
          avator: "",
          name: "张儿子",
          phone: "13111101111",
          avatorUrl:
            "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng41b0c05fc72eb687b47f4a7915bab37abd7e14ff0966aa3d5ece3c0b61d42b4b",
        },
        {
          id: 2,
          avator: "",
          name: "",
          phone: "",
          avatorUrl: `https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng41b0c05fc72eb687b47f4a7915bab37abd7e14ff0966aa3d5ece3c0b61d42b4b`,
        },
      ],
      isHaveChildAccount: false,
      // 通过判断子女账号的返回值 true 和 false来判断
      isWakeUpAddChildAcount: true,
      // 审核通过的列表
      approvedList: [],
    };
  },

  mounted() {
    this.getChildUserListData();
    this.judgeChildrenAccountAmount();
    // console.log(this.$route.query.isFresh);
    // if(this.$route.query.isFresh){
    //   // 再次调用 judgeAmount 接口
    //   this.judgeChildrenAccountAmount();
    // }
  },

  // computed: {
  //   showApproved:function(){
  //     var approvedList = [];
  //     var approved = this.childAccountList;
  //     for (var i = 0; i < approved.length; i++) {
  //       if(approved[i].status == 0){
  //         approved[i].status == '待审核';
  //         approvedList.push(approved[i]);
  //       }else if(approved[i].status == 1){
  //         approved[i].status == '审核通过';

  //       }else{
  //         approved[i].status == '审核通过';
  //       }
  //     }
  //     return approvedList;
  //   },
  // },

  methods: {
    getChildUserListData() {
      let params = {
        status: "1",
      };
      getChildUserList(params).then((res) => {
        // console.log(res);
        if (res.code && res.code == 200 && res.data) {
          this.childAccountList = res.data;
          // after first chandao bug
          var approvedList = [];
          var approved = this.childAccountList;
          for (var i = 0; i < approved.length; i++) {
            if (approved[i].status == 0) {
              approved[i].status == "待审核";
            } else if (approved[i].status == 1) {
              approved[i].status == "审核通过";
              approvedList.push(approved[i]);
            } else {
              approved[i].status == "审核通过";
            }
          }
          this.approvedList = approvedList;
        }
      });
    },

    // 判断子女账号的数量是否达到上限来决定是否显示 新增按钮
    // 返回 true 跳转到新增 返回false提示数量已达上限
    judgeChildrenAccountAmount() {
      let params = {};
      judgeAmount(params).then((res) => {
        // console.log(res);
        let { data } = res;
        // data = true;
        this.isWakeUpAddChildAcount = data;
      });
    },

    // 跳转到新增
    hanldeGoAddChildAccount() {
      if (this.isWakeUpAddChildAcount) {
        this.$router.push({
          path: "/addChildAccount",
          component: addChildAccount,
        });
      } else {
        return false;
      }
    },

    hanldeGoApprovalRecord() {
      this.$router.push({
        name: "approvalRecord",
      });
    },

    // 解绑
    handleUnbind(childId) {
      this.$dialog
        .confirm({
          title: "解绑账号",
          message: "确定解绑此账号？",
        })
        .then(() => {
          // 根据 childId 发请求进行解绑
          let params = {
            childId: childId,
          };
          childRemove(params).then((res) => {
            // console.log(res);
            if (res.code && res.code == 200) {
              this.$message.success("解绑成功");
              this.getChildUserListData();
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    // 修改
    // handleModify(id) {
    //   // console.log(id);
    //   // 修改和新增共用一个组件
    //   this.$router.push({ path: "/addChildAccount", query: { id: id } });
    // },

    // 模拟切换有无账号互显
    handleToggleShow() {
      // this.isHaveChildAccount = !this.isHaveChildAccount;
    },
  },
};
</script>

<style lang="less" scoped>
.child-account-container {
  position: relative;
  .no-child-list {
    position: relative;
    height: 232px;
    border: 1px solid #eee;
    background-image: url("../../../../assets/images/child-account-not@2x.png");
    background-size: auto 233px;
    .notice-info {
      position: absolute;
      bottom: 0px;
      left: 128px;
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.4);
      line-height: 28px;
    }
  }
  .have-child-account-container {
    margin-top: 6px;
    .child-account-item {
      margin-bottom: 3px;
      background: #fff;
      display: flex;
      align-items: center;
      height: 103px;
      border-bottom: 1px solid #eee;
      padding: 0px 12px;
      .item-avator {
        width: 60px;
        height: 60px;
        margin-right: 16px;
        border-radius: 30px;
        overflow: hidden;
        border: 1px solid #eee;
        .img-avator {
          width: 100%;
          height: 100%;
          border-radius: 30px;
        }
      }
      .item-name-phone-container {
        width: 101px;
        margin-right: 18px;
        text-align: left;
        .item-name {
          height: 30px;
          font-size: 22px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;
          line-height: 30px;
          letter-spacing: 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .item-phone {
          height: 21px;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.6);
          line-height: 21px;
        }
      }
      .modify {
        height: 34px;
        width: 72px;
        border-radius: 17px;
      }
      .unbind {
        margin-right: 20px;
      }
      .status {
        font-size: 15px;
        color: #169bd5;
      }
    }
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
  .notice-heaeder {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 28px;
    text-align: left;
    margin-top: 25px;
    padding: 0px 12px;
  }
  .notice-content {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 27px;
    text-align: left;
    margin-top: 9px;
    padding: 0px 12px;
  }
  .approvalrecord {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    padding-bottom: 10px;
    font-size: 15px;
    color: #169bd5;
  }
}
</style>
