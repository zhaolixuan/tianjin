<template>
  <div class="older-content">
    <norm-layout text="志愿者服务队伍组织架构" :routerPath="path"></norm-layout>
    <div class="content">
    <el-tree :data="TeamInfo" :props="defaultProps" @node-click="handleNodeClick" node-key="id" :default-expanded-keys="[0, 1]"></el-tree>
    </div>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import api from '@/api/api'
import { mapGetters } from 'vuex'
export default {
  name: 'VisitisRegister',
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'address'
      },
      TeamInfo: []
    }
  },
  computed: {
    ...mapGetters(['breadCrumbCodes', 'typeNew', 'codeNew']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0]

      return params
    },
    path () {
      return {
        path: 'VisitingTeam',
        query: {
          // code: this.breadCrumbCodes,
          // title: '助医运营监管大数据统计分析'
        }
      }
    }
  },
  created () {
    this.$store
      .dispatch('getUserAuthInfo')
      .then(() => {
      })
      .catch(err => {
        console.log('获取用户权限失败', err)
      })
    this.hanleGetValue()
  },
  methods: {
    hanleGetValue () {
      api.getVolunteerTeamInfo().then(res => {
        res.data.map((v, id) => {
          v.id = id
        })
        this.TeamInfo = res.data || []
      })
    },
    handleNodeClick () {

    }
  },
  components: {
    NormLayout
  }
}
</script>

<style lang="less" scoped>
.older-content {
  height: 4rem;
  .content{
    width: 90%;
    margin: 0 auto;
    height: 100%;
  }
}
.content /deep/ .el-tree{
  background: transparent;
  color:#28e1fe !important;
}
.content /deep/ .el-tree-node__content:hover,
.content /deep/ .el-tree-node:focus>.el-tree-node__content{
  background: transparent;
}
.content /deep/ .el-tree-node__label{
  font-size: .22rem;
}
</style>
