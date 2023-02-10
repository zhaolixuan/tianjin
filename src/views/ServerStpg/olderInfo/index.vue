<template>
  <div class="olderInfo">
    <nav class="info">
      <p class="name">{{ olderInfoData.oldPeople }}</p>
      <div class="infobox">
        <p>老人性别：<span>{{ olderInfoData.sex }}</span></p>
        <p>身份证号：<span>{{ olderInfoData.idCard }}</span></p>
        <p>老人地址：<span>{{ olderInfoData.communityName }}</span></p>
      </div>
    </nav>

    <nav class="olderData">
      <Box-header :headerData="serviceHeaderData"
                  @handelActive="servicehandelActive"
                  :activeHeader="activeHeader" />

      <WWC v-if="activeHeader == 0"
           :serviceContentData="wwcData"></WWC>

      <YWC v-else
           :serviceContentData="ywcData"></YWC>

      <div class="btn">

        <div class="create"
             @click="handelCreate">创建新的评估</div>
        <div class="back">
          <router-link to="/serveStpg-home">返回首页</router-link>
        </div>

      </div>
    </nav>

  </div>
</template>

<script>
import BoxHeader from './component/BoxHeader.vue'
import YWC from './component/YWC.vue'
import WWC from './component/WWC.vue'

import { getAssessorData } from '@/api/serverStpg.js'

export default {
  data() {
    return {
      olderInfoData: {
        oldPeople: '王老人',
        sex: '男',
        idCard: '141122122211234441',
        communityName:
          '辽宁省沈阳市沈河区大西路335-1号沈河区风雨坛银星院339号楼',
      },
      serviceHeaderData: [
        {
          id: 0,
          name: '未完成',
        },
        {
          id: 1,
          name: '已完成',
        },
      ],
      activeHeader: 0,
      wwcData: [
        {
          title: '老年人身体评估',
          time: '2022-08-24  15:16:16',
          id: 1,
        },
        {
          title: '老年人身体评估',
          time: '2022-08-24  15:16:16',
          id: 2,
        },
        {
          title: '老年人身体评估',
          time: '2022-08-24  15:16:16',
          id: 3,
        },
        {
          title: '老年人身体评估',
          time: '2022-08-24  15:16:16',
          id: 4,
        },
        {
          title: '老年人身体评估',
          time: '2022-08-24  15:16:16',
          id: 5,
        },
        {
          title: '老年人身体评估',
          time: '2022-08-24  15:16:16',
          id: 6,
        },
      ],
      ywcData: [
        {
          title: '老年人身体评估',
          time: '2022-08-24  15:16:16',
          id: 1,
        },
        {
          title: '老年人身体评估',
          time: '2022-08-24  15:16:16',
          id: 2,
        },
        {
          title: '老年人身体评估',
          time: '2022-08-24  15:16:16',
          id: 3,
        },
        {
          title: '老年人身体评估',
          time: '2022-08-24  15:16:16',
          id: 4,
        },
        {
          title: '老年人身体评估',
          time: '2022-08-24  15:16:16',
          id: 5,
        },
        {
          title: '老年人身体评估',
          time: '2022-08-24  15:16:16',
          id: 6,
        },
      ],
    }
  },
  components: {
    BoxHeader,
    WWC,
    YWC,
  },
  created() {},
  mounted() {
    this.idCard = this.$route.query.idCard

    this.getData()
  },
  methods: {
    getData() {
      getAssessorData({ idCard: this.idCard })
        .then((res) => {
          console.log(res)
          return
          if (res && res.code == 200) {
            this.serviceContentData = res.data
          } else {
            this.serviceContentData = []
          }
        })
        .catch((err) => {})
    },
    handelCreate() {
      this.$router.push({
        path: '/serveStpg-assessmentOne',
      })
    },
    servicehandelActive(n) {
      this.activeHeader = n
    },
  },
}
</script>

<style scoped lang="less">
.olderInfo {
  height: calc(100vh - 68px);
  display: flex;
  flex-direction: column;

  .info {
    background: #fff;
    padding: 12px 16px;

    .name {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      margin-bottom: 11px;
      font-weight: 600;
      color: #000000;
      text-align: left;
    }
    .infobox {
      display: flex;
      flex-direction: column;
      text-align: left;
      justify-content: space-between;
      font-family: PingFangSC-Regular, PingFang SC;
      p {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: normal;
        color: #a3a3a6;
        margin-bottom: 6px;
        display: flex;
        span {
          flex: 1;
          color: #000;
          display: inline-block;
        }
      }
    }
  }
  .olderData {
    margin-top: 16px;
    background: #fff;
    flex: 1;
    position: relative;
    padding-bottom: 150px;
    .btn {
      position: absolute;
      bottom: 10px;
      width: 100%;
      div {
        margin: 0 16px;
        height: 44px;
        line-height: 44px;
        border-radius: 4px;
        box-shadow: 0 0 4px 0 rgba(6, 122, 84, 0.1);
        text-align: center;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        border: 1px solid rgba(12, 186, 128, 1);
        box-sizing: border-box;
        color: rgba(12, 186, 128, 1);
        &:first-child {
          background: linear-gradient(
            269.22deg,
            rgba(11, 185, 127, 1) 0%,
            rgba(21, 216, 151, 1) 100%
          );
          color: rgba(255, 255, 255, 1);
          margin-bottom: 26px;
        }
      }
    }
  }
}
</style>
