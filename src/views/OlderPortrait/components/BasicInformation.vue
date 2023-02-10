<template>
  <div class="page_content">
    <div class="title"> <span class="radio"></span> 基本信息</div>
    <div class="main">
      <div class="left_content">
        <div class="photo"></div>
      </div>
      <div class="center_content">
        <ul>
          <li><span class="left—text left-width">姓名：</span><span class="right—text right-width">{{basePersonVo.name || '暂无数据'}}</span><span class="left—text left-width">性别：</span><span class="right—text right-width">{{basePersonVo.sex || '暂无数据'}}</span><span class="left—text left-width">年龄：</span><span class="right—text right-width">{{basePersonVo.age || '暂无数据'}}</span></li>
          <li><span class="left—text">身份证号码：</span><span class="right—text">{{basePersonVo.idcardNumber || '暂无数据'}}</span><span class="left—text">教育程度：</span><span class="right—text">{{basePersonVo.schoolLevel || '暂无数据'}}</span></li>
          <li><span class="left—text">身体情况：</span><span class="right—text">{{basePersonVo.personbody || '暂无数据'}}</span><span class="left—text">享有医保：</span><span class="right—text">{{basePersonVo.medicalInsurance || '暂无数据'}}</span></li>
          <li><span class="left—text">月收入：</span><span class="right—text">{{basePersonVo.yestardayMedicalInsurance || '暂无数据'}}</span><span class="left—text">联系电话：</span><span class="right—text">{{basePersonVo.mobile || '暂无数据'}}</span></li>
          <li><span class="left—text">紧急联系人：</span><span class="right—text">{{basePersonVo.emergencyPerson || '暂无数据'}}</span><span class="left—text">联系电话：</span><span class="right—text">{{basePersonVo.emergencyPhone || '暂无数据'}}</span></li>
          <li><span class="left—text">户籍地址：</span><span class="right—text">{{basePersonVo.registerAddress || '暂无数据'}}</span></li>
        </ul>
      </div>
      <div class="right_content">
        <div class="btn" @click="handleClickLink">查看更多资料</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicInformation',
  props: {
    idCard: {
      type: String,
      default: () => ''
    },
    basePersonVo: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleClickLink () {
     this.$router.push({
        path: '/olderPicture',
        query: { idCard: this.idCard }
      })

    }
  }
}
</script>

<style lang="less" scoped>
.page_content{
  width: 100%;
  height: 2.3rem;
  padding: .2rem .25rem;
  box-sizing: border-box;
  .title{
    width: 100%;
    height: .2rem;
    color: #7BD5FF;
    display: flex;
    align-items: center;
    font-size: .19rem;
    font-family: PingFangSC-Medium;
    .radio{
      display: inline-block;
      width: .1rem;
      height: .1rem;
      border-radius: 50%;
      background-color:  #7BD5FF;
      box-shadow: 0 0 4px 0 rgba(207,255,244,0.50);
      margin-right: .12rem;
    }
  }
  .main{
    width: 100%;
    height: 1.8rem;
    display: flex;
    .left_content{
      width: 15%;
      height: 100%;
      padding: .1rem 0;
      .photo{
        width: 1.3rem;
        height: 1.6rem;
        background-image: url('~@/views/OlderPortrait/assets/photo_bg.png');
        background-size: 100% 100%;
      }
    }
    .center_content{
      width: 73%;
      height: 100%;
      ul{
        width: 97%;
        padding-top: .1rem;
        li{
        height: .28rem;
        font-size: .13rem;
        line-height: .28rem;
        padding-left: .1rem;
        display: flex;
        .left—text{
          color: #89A3AE;
          width: .85rem;
          display: inline-block;
          font-family: MicrosoftYaHei;
        }
        .right—text{
          color: #C9EEFF;
          width: 2.4rem;
          font-family: MicrosoftYaHei-Bold;
        }
        .left-width{
          width: .5rem;
        }
        .right-width{
          width: 1.2rem;
        }
      }
      li:nth-child(odd){
        background-image: linear-gradient(90deg, rgba(36,72,133,.6) 1%, rgba(16,35,78,0.49) 97%);
      }
      }
    }
    .right_content{
      width: 12%;
      display: flex;
      justify-content: center;
      align-items: center;
      .btn{
      width: 1rem;
      height: .3rem;
      background-image: linear-gradient(180deg, rgba(0,230,255,0.60) 0%, rgba(0,201,255,0.00) 100%);
      box-shadow: inset 0 1px 3px 2px #2A8CFF;
      font-size: .13rem;
      text-align: center;
      line-height: .3rem;
      color: #C9EEFF;
      cursor: pointer;
    }
    }
  }
}
</style>
