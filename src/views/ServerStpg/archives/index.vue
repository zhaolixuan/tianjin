<template>
  <div class="serverHome">

    <div class="search_input">
      <van-search shape="round"
                  v-model="value"
                  placeholder="请输入搜索关键词"
                  @search="search" />
    </div>

    <Box-header :headerData="serviceHeaderData"
                @handelActive="servicehandelActive"
                :activeHeader="activeHeader" />
    <Box-contect :serviceContentData="serviceContentData"
                 :activeHeader="activeHeader" />
    <div class="btn">
      <div class="create"
           @click="handelCreate">创建新的评估</div>
    </div>

  </div>
</template>
<script>
import BoxHeader from './component/BoxHeader.vue'
import BoxContect from './component/BoxContect.vue'
import { getAssessorData } from '@/api/serverStpg.js'

export default {
  data() {
    return {
      serviceHeaderData: [
        {
          id: 2,
          name: '待评估老人',
        },
        {
          id: 6,
          name: '已评估老人',
        },
      ],
      activeHeader: '2',
      serviceContentData: [
        // {
        //   age: '男',
        //   serviceStatue: '2',
        //   IdCard: '11025659122326516',
        //   serviceAddress:
        //     '辽宁省沈阳市沈河区大西路335-1号沈河区风雨坛银星院339号楼',
        //   status: 1,
        // },
        // {
        //   age: '男',
        //   serviceStatue: '2',
        //   IdCard: '11025659122326516',
        //   serviceAddress:
        //     '辽宁省沈阳市沈河区大西路335-1号沈河区风雨坛银星院339号楼',
        //   status: 0,
        // },
      ],
      assessmentList: [],
      noAssessmentList: [],
      value: '',
    }
  },
  components: {
    BoxHeader,
    BoxContect,
  },
  mounted() {
    this.getData()
  },
  methods: {
    handelCreate() {
      this.$router.push({
        path: '/serveStpg-assessmentOne',
      })
    },
    search(n) {},
    getData() {
      getAssessorData()
        .then((res) => {
          if (res && res.code == 200) {
            this.serviceContentData = this.assessmentList =
              res.data.assessmentList
            this.noAssessmentList = res.data.assessmentList
          } else {
            this.assessmentList = []
            this.noAssessmentList = []
            this.serviceContentData = []
          }
        })
        .catch((err) => {})
    },
    servicehandelActive(n) {
      this.activeHeader = n
      switch (n) {
        case '2':
          this.serviceContentData = this.assessmentList
          break
        case '6':
          this.serviceContentData = this.noAssessmentList
          break
        default:
          break
      }
    },
  },
}
</script>
<style lang="less" scoped>
.serverHome {
  padding-bottom: 70px;
  .search_input {
    border-bottom: 1px solid #ccc;
    /deep/ .van-field__control {
      background: transparent;
    }
  }
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
</style>