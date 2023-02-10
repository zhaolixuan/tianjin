<template>
  <div class="table_box">
    <el-table :data="tableData" stripe style="width: 100%;">
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        align="center"
        :show-overflow-tooltip="true"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope"
          ><span
            >{{
              item.label == "序号" || item.label == "排名"
                ? scope.$index + (currentPage - 1) * pageSize + 1
                : scope.row[item.prop] === "NULL"
                ? ""
                : scope.row[item.prop]
            }}
          </span>
          <!-- 12月30日应测试要求 MedicalPage 路由 助医服务记录改序号 所做 -->
          <span v-if="item.label == '排.序'">{{ item.index }}</span>
          <span v-if="item.label == '排序'">{{ item.id }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="table_page" v-if="total">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        prev-text="上一页"
        next-text="下一页"
        @current-change="handleChangePage"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "smallLayout",
  props: {
    crumbData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    total: [Number],
    pageSize: [Number],
    currentPage: [Number]
  },

  methods: {
    handleChangePage(page) {
      this.$emit("getSmallValue", page);
    }
  }
};
</script>

<style>

</style>
