<template>
  <div>
    <norm-layout icon="项目清单" title="引进项目清单" :more="false" :half="false" id="norm-layout-style"></norm-layout>
    <div class="table-container">
      <el-table :data="ProjectList" stripe fit style="width: 100%">
        <el-table-column prop="entName" label="企业名称" :show-overflow-tooltip="true" min-width="20%"></el-table-column>
        <el-table-column
          prop="amount"
          :label="'注册资本或投资总额(元)'"
          :show-overflow-tooltip="true"
          min-width="14%"
          align="left"
        ></el-table-column>
        <el-table-column prop="industry" :show-overflow-tooltip="true" label="所属行业" min-width="18%"></el-table-column>
        <el-table-column
          prop="mainBusiness"
          :show-overflow-tooltip="true"
          label="主营业务"
          min-width="25%"
        ></el-table-column>
        <el-table-column prop="entType" :show-overflow-tooltip="true" label="企业类型" min-width="12%"></el-table-column>
        <el-table-column
          prop="investorsSource"
          :show-overflow-tooltip="true"
          label="投资方来源"
          min-width="15%"
        ></el-table-column>
        <el-table-column
          prop="introductionUnit"
          :show-overflow-tooltip="true"
          label="引进单位"
          min-width="15%"
        ></el-table-column>
        <el-table-column prop="highQuality" :show-overflow-tooltip="true" label="优质" min-width="8%"></el-table-column>
      </el-table>
      <el-pagination background
      layout="prev, pager, next"
      :total="count"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import NormLayout from '@/views/ProvideAged/components/NormLayout.vue'

export default {
  name: 'WraningSituation',
  data () {
    return {
      currentPage: 1
    }
  },
  components: {
    NormLayout
  },
  methods: {
    handleCurrentChange (val) {
      this.$emit('handleChange', val)
    }
  },
  props: {
    ProjectList: {
      type: Array,
      default: () => []
    },
    count: {
      type: Number,
      default: () => 0
    }
  }
}
</script>

<style scoped>
#norm-layout-style {
  padding: 0.2rem 0.3rem;
  height: 0.3rem;
}
.table-container {
  /* border: 1px solid rgba(16, 140, 255, 0.3);
  box-shadow: 0px 0px 10px rgba(16, 140, 255, 0.3) inset; */
  overflow: hidden;
  height: 100%;
  padding: 0 0.8%;
}
.el-pagination{
  position: absolute;
  right: 20px;
  bottom: 3%;
}
.table-container >>> .el-table__header {
  width: 100% !important;
  font-size: 0.13rem;
}
.table-container >>> .el-table {
  /* border: 1px solid rgba(16, 140, 255, 0.3);
  box-shadow: 0px 0px 10px rgba(16, 140, 255, 0.3) inset; */
  background-color: RGBA(5, 19, 65, 1);
}
.table-container >>> .el-table::before {
  background-color: RGBA(8, 28, 85, 1);
}
 .el-pagination >>> .el-pager li{
   background-color: rgba(0,78,199,0.62);
    color: #AAE2FF;
    opacity: .8;
    border:1px solid rgba(0,110,215,1);
 }
 .el-pagination.is-background >>> button{
   background:rgba(0,78,199,0.62);
   border-radius:1px;
   border:1px solid rgba(0,110,215,1);
   color: #AAE2FF;
 }
.has-gutter {
  width: 100%;
}
.table-container >>> .el-table__header-wrapper,
.el-table__header,
.has-gutter {
  height: auto;
}
.table-container >>> .el-table th {
  padding: 0;
  text-align: center;
  font-size: 0.13rem;
  font-weight: 100;
  background: RGBA(7, 28, 87, 1);
  color: rgba(201, 238, 255, 1);
}
.table-container >>> .el-table tr {
  height: 0.55rem;
}
.table-container >>> .el-table__body-wrapper {
  overflow: hidden !important;
}
.table-container >>> .el-table__body .el-table__row {
  background-color: RGBA(5, 19, 65, 1);
  color: rgba(201, 238, 255, 1);
}
.table-container
  >>> .el-table--striped
  .el-table__body
  tr.el-table__row--striped
  td {
  background-color: RGBA(8, 28, 85, 1);
  height: 0.55rem;
}
.table-container >>> .el-table td {
  padding: 0;
  border-bottom: 0;
  font-weight: 100;
  height: 0.39rem;
  font-size: 0.13rem;
  text-align: center;
}
.table-container >>> .el-table .el-table__row--striped {
  background-color: RGBA(7, 28, 87, 1);
}
.table-container >>> .el-table__body tr:hover > td {
  background: RGBA(5, 19, 65, 1) !important;
}
.table-container >>> .el-table th.is-leaf {
  border-bottom: 0;
}
</style>
