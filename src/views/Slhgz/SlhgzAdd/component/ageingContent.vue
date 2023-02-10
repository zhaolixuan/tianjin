<template>
  <div class="slhgzRepertoire">
    <div class="top">
      <el-table
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="30"> </el-table-column>
        <el-table-column  prop="project_type" align="center" label="类别">
        </el-table-column>
        <el-table-column label="数量" align="center" width="90">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.num"
              :min="1"
              :max="10"
              label="描述文字"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="project_name" label="名称">
        </el-table-column>
        <el-table-column align="center" label="安装方式">
          <template slot-scope="scope">
            <el-radio v-model="scope.row.installType" label="free"
              >免费</el-radio
            >
            <el-radio v-model="scope.row.installType" label="charge"
              >自费</el-radio
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <Footer @handelOrder="handelOrder" :servertext="servertext" /> -->
  </div>
</template>

<script>

import eventBus from "@/utils/eventbus";
import { getSlhProjectList, deviceprojectList } from "@/api/slhgz.js";
export default {
    props: {

    category: {
      Type: String,
        default: () => {
        
            },
    },
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      servertext: "确定选择",
    };
  },
  created() {},
  mounted() {
       this.requestData(this.category);
  },
  components: {
 
  },
  methods: {
    requestData(category) {
   
      let data = {
        category: category,
      };
      getSlhProjectList(data).then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          res.data[index].num = 1;
          res.data[index].installType = "free";
          res.data[index].oldModifyId = this.$route.query.oldModifyId;
        }
        this.tableData = res.data;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
        this.$emit("handleSelectionChange",  val);
      // console.log(JSON.stringify(this.multipleSelection));
    },
    handelOrder(n) {
      // var forms = new FormData();
      // forms.append("id", i.id);
      deviceprojectList(JSON.stringify(this.multipleSelection)).then((res) => {
        if (res && res.code == 200) {
          this.$router.go(-1);
        } else {
          this.$toast.fail("添加失败");
        }
      });

      //   this.$router.push({
      //     path: '/slhgz-details',

      //     query: { dataList:JSON.stringify(this.multipleSelection) ,category:  this.$route.query.category},
      // })
    },
  },
};
</script>

<style scoped lang="less">
.slhgzRepertoire {

  /deep/ .el-input-number {
    
    width: 100%;
    .el-input__inner {
      padding-left: 0;
      padding-right: 0;
    }
    .el-input-number__decrease,
    .el-input-number__increase {
      width: 25px;
    }
  }
}
.top {
 
}
</style>
