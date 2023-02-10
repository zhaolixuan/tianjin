<template>
  <div class="home-container">
    <div class="header">
      <img class="header-bj"
           src="../../../assets/images/home-bj.png"
           alt="" />

      <div class="header-title">
        <div class="header-left">
          <span>评估员</span>
        </div>
        <div class="header-right">
          <span @click="goInfo">个人主页</span>
        </div>
        <div class="name">
          <span>{{opQuestionsAssessor.assessorName}}</span>
        </div>
      </div>
    </div>

    <div class="home-nav">
      <el-card class="nav-item"
               v-for="i in menuList"
               :key="i.name">
        <div class="el-card__body"
             @click="toService(i.name)">
          <img :src="i.src"
               alt="" />
          <span> {{ i.name }}</span>
        </div>
        <div class="el-card__num">
          <span>{{ i.num}}</span>
        </div>
      </el-card>
    </div>

    <div class="home-dak">
      <div class="content">
        <img src="../../../assets/images/rijian.png"
             alt="" />
        <span @click="goArchives"
              style="padding-left: 15px"> 老人年档案库</span>
      </div>
    </div>

    <div class="home-cj">
      <el-button @click="goOne"
                 class="home-butt">创建老人评估能力</el-button>
    </div>
  </div>
</template>

<script>
import { assessorCount } from '@/api/serverStpg.js'
export default {
  data() {
    return {
      menuList: [
        {
          name: '全部老人',
          src: require('@/assets/images/st-quanbu.png'),
          router: '',
        },
        {
          name: '待评估老人',
          src: require('@/assets/images/st-dpg.png'),
          router: '',
        },
        {
          name: '累计评估报告',
          src: require('@/assets/images/st-lj.png'),
          router: '',
        },
        {
          name: '待完成评估报告',
          src: require('@/assets/images/st-dwc.png'),
          router: '',
        },
      ],
      opQuestionsAssessor:{

      }
    }
  },

  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      assessorCount().then((res) => {
        this.opQuestionsAssessor = res.data.opQuestionsAssessor
        this.menuList = [
          {
            name: '全部老人',
            src: require('@/assets/images/st-quanbu.png'),
            router: '',
            num: res.data.oldPeopleSum,
          },
          {
            name: '待评估老人',
            src: require('@/assets/images/st-dpg.png'),
            router: '',
            num: res.data.notEvaluated,
          },
          {
            name: '累计评估报告',
            src: require('@/assets/images/st-lj.png'),
            router: '',
            num: res.data.evaluatedCount,
          },
          {
            name: '待完成评估报告',
            src: require('@/assets/images/st-dwc.png'),
            router: '',
            num: res.data.notEvaluatedCount,
          },
        ]
      })
    },
    toService(name) {
      //   this.$router.push({ path: "/service", query: { name: name } });
    },
    goOne() {
      this.$router.push({ path: '/serveStpg-assessmentOne' })
    },
    goInfo() {
      this.$router.push({ name: 'ServeStpgMy' })
    },
    goArchives() {
      this.$router.push({ name: 'ServeStpgArchives' })
    },
  },
}
</script>
<style lang="less" scoped>
.home-container {
  .header {
    .header-bj {
      width: 100%;
      height: 200px;
    }
    .header-title {
      margin-top: -150px;
      display: flex;
      color: #fff;
      flex-wrap: wrap;
      font-family: PingFang SC;
      .header-left {
        width: 50%;
        justify-content: start;
        text-align: left;
        padding-left: 20px;
        font-size: 17px;

        font-weight: 500;
      }
      .header-right {
        width: 50%;
        justify-content: end;
        text-align: right;
        padding-right: 20px;
        font-size: 14px;
        font-weight: normal;
      }
      .name {
        font-size: 14px;
        padding-left: 20px;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
  .home-nav {
    margin-top: 50px;

    font-family: PingFangSC-Semibold, PingFang SC;

    color: rgba(0, 0, 0, 0.8);
    line-height: 25px;
    display: flex;
    flex-wrap: wrap;
    // border-bottom: 1px solid red;

    justify-content: space-between;
    padding: 15px;
    /deep/.nav-item {
      background-color: #fff;
      width: 163px;
      height: 91px;
      text-align: center;
      margin-bottom: 10px;
      display: flex;
      flex-direction: wrap;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%);
      .el-card__num {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 5px;
        font-size: 26px;
        font-family: DIN Alternate;
        font-weight: 700;
        color: rgba(30, 30, 30, 0.9);
      }
      .el-card__body {
        // display: flex;
        // flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 0;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(102, 102, 102, 0.9);
      }

      img {
        width: 23px;
        height: 23px;
      }
    }
  }
  .home-dak {
    padding: 15px;
    display: flex;
    flex-direction: wrap;
    align-items: center;
    justify-content: center;
    .content {
      width: 100%;
      height: 60px;
      background: rgba(13, 212, 146, 0.1);
      border-radius: 4px;
      text-align: left;
      align-items: center;
      display: flex;
      justify-content: left;
      padding-left: 15px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;

      color: rgba(13, 189, 131, 1);
      img {
        width: 32px;
        height: 32px;
      }
    }
  }
  .home-cj {
    padding: 15px;
    .home-butt {
      background: linear-gradient(
        269.22deg,
        rgba(11, 185, 127, 1) 0%,
        rgba(21, 216, 151, 1) 100%
      );
      height: 44px;
      width: 100%;
      border-radius: 4px;
      box-shadow: 0 0 4px 0 rgba(6, 122, 84, 0.1);
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
