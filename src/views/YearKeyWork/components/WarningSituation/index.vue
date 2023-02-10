<template>
  <norm-layout icon="warning" title="预警情况" :more="true" :half=false>
    <div class="table-container">
      <el-table
      :data="tableData"
      stripe
      fit
      style="width: 100%">
      <el-table-column
        prop="index"
        label="序号"
        :show-overflow-tooltip="true"
        min-width="13%"
        >
      </el-table-column>
      <el-table-column
        prop="taskDetail"
        label="任务详情"
        :show-overflow-tooltip="true"
        min-width="20%"
        >
      </el-table-column>
      <el-table-column
        prop="currentState"
        :show-overflow-tooltip="true"
        label="当前状况"
        min-width="18%">
      </el-table-column>
      <el-table-column
        prop="abnormalExplain"
        :show-overflow-tooltip="true"
        label="异常说明"
        min-width="18%"
        >
        <template slot-scope="scope">
          <font v-if="scope.row.abnormalExplain === '临期'" color="skyblue">临期</font>
          <font v-else-if="scope.row.abnormalExplain === '超期'" color="red">超期</font>
          <font v-else-if="scope.row.abnormalExplain === '委办局已退回'" color="goldenrod">委办局已退回</font>
       </template>
      </el-table-column>
      <el-table-column
        prop="dutyUnit"
        :show-overflow-tooltip="true"
        label="责任单位"
        min-width="20%">
      </el-table-column>
    </el-table>
    </div>
  </norm-layout>
</template>

<script>
import NormLayout from '@/views/ProvideAged/components/NormLayout.vue'

export default {
  name: 'WraningSituation',
  components: {
    NormLayout
  },
  data () {
    return {
      pageSize: 5,
      currentPage: 1,
      flag: false,
      detial: '',
      timer: null,
      newData: this.warningData,
      warningDatas: '',
      indexMethod: 1
    }
  },
  props: {
    warningData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    tableData () {
      return this.newData.slice(0, 5)
    }
  },
  created () {
    this.newData.map(item => {
      item.index = this.indexMethod++
    })
    this.timer = setInterval(() => {
      this.newData = this.newData.concat(this.newData.splice(0, 5))
    }, 3000)
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.table-container {
  border: 1px solid rgba(16, 140, 255, 0.3);
  box-shadow: 0px 0px 10px rgba(16, 140, 255, 0.3) inset;
  overflow: hidden;
}
.table-container >>> .el-table__header{
  width: 100% !important;
  font-size: 0.13rem;
}
.table-container >>> .el-table{
  border: 1px solid rgba(16, 140, 255, 0.3);
  box-shadow: 0px 0px 10px rgba(16, 140, 255, 0.3) inset;
  background-color: RGBA(5, 19, 65, 1);

}
.table-container >>> .el-table::before{
  background-color: RGBA(8, 28, 85, 1);
}
.has-gutter{
  width: 100%;
}
.table-container >>> .el-table__header-wrapper, .el-table__header, .has-gutter{
  height: auto;
}
.table-container >>> .el-table th{
  padding: 0;
  text-align: center;
  height: 0.39rem;
  font-size: 0.13rem;
  font-weight: 100;
  background: RGBA(7, 28, 87, 1);
  color: rgba(201, 238, 255, 1);
}
.table-container >>>  .el-table__body-wrapper {
  overflow: hidden !important;
}
.table-container >>> .el-table__body .el-table__row{
  background-color: RGBA(5, 19, 65, 1);
  color: rgba(201, 238, 255, 1);
}
.table-container >>>  .el-table--striped .el-table__body tr.el-table__row--striped td{
  background-color: RGBA(8, 28, 85, 1)
}
.table-container >>>  .el-table td{
  padding: 0;
  border-bottom: 0;
  font-weight: 100;
  height: 0.39rem;
  font-size: 0.13rem;
  text-align: center;
}
.table-container >>>  .el-table .el-table__row--striped{
  background-color: RGBA(7, 28, 87, 1);
}
.table-container >>> .el-table__body tr:hover>td {
	background: RGBA(5, 19, 65, 1) !important;
}
.table-container >>>  .el-table th.is-leaf{
  border-bottom: 0;
}
</style>
