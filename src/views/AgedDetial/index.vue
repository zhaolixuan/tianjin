<template>
  <list-layout
    :columns="columns"
    :tableData="tableData"
    :pageSize="pageSize"
    :serviceDate="serviceDate"
    header="服务载体老年人消费情况统计"
    :currentPage="page"
    backPath="FiveService"
    v-on:getSearchValue="handleGetSearchValue"
    title="五大服务类别数据综合分析——服务载体消费老年人基本信息"
    :total="total"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="姓名" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入姓名"
          v-model.trim="formData.name"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" class="search_select">
        <el-select v-model="formData.sex" clearable placeholder="请选择性别">
          <el-option label="男性" value="男"></el-option>
          <el-option label="女性" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄段" class="search_select">
        <el-input
          class="input_num"
          placeholder="起始年龄"
          v-model="formData.beginEge"
        />
        <span>-</span>
        <el-input
          class="input_num"
          placeholder="截止年龄"
          v-model="formData.endEge"
        />
      </el-form-item>
      <el-form-item label="所属街道" class="search_select">
        <el-select
          v-model="formData.streetCode"
          clearable
          placeholder="请选择所属街道"
          @change="changeStreet"
        >
          <el-option
            v-for="(option, index) in streetData"
            :key="index"
            :label="option.name"
            :value="option.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属社区" class="search_select">
        <el-select
          v-model="formData.communityCode"
          clearable
          placeholder="请选择所属社区"
        >
          <el-option
            v-for="(option, index) in communityData"
            :key="index"
            :label="option.name"
            :value="option.code"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="btns_box">
      <div class="data_total">
        <span>服务载体：</span>{{ formData.merchantName }}
        <span>服务时间：</span>{{ formData.beginDay }}~{{ formData.endDay }}
        <!-- <span>老年人消费频率：</span>{{formData.attendanceRate}}%</div> -->
        <span>老年人消费次数：</span>{{ formData.attendNumber }}次以上
      </div>
      <div class="btns_right">
        <el-button
          class="btn"
          icon="el-icon-search"
          :loading="isSearchLoading"
          @click="handleGetSearchValue"
          >查询</el-button
        >
      </div>
    </div>
    <Menu></Menu>
  </list-layout>
</template>

<script>
import api from "@/api/api.js";
import ListLayout from "@/components/TablerList/layout.vue";
import Menu from "@/views/OlderDistribution/components/Menu";

export default {
  data() {
    return {
      isSearchLoading: false,
      columns: [
        { label: "序号", prop: "index", width: 80 },
        { label: "老年人姓名", prop: "name", width: 200 },
        { label: "身份证号", value: "idcard", width: 200 },
        { label: "性别", prop: "sex", width: 150 },
        { label: "年龄", prop: "age", width: 150 },
        { label: "养老卡号", prop: "pensioncardNumber", width: 200 },
        { label: "联系方式", prop: "phone", width: 200 },
        { label: "居住街道", prop: "streetName", width: 200 },
        { label: "居住社区", prop: "communityName", width: 200 },
        { label: "居住地址", prop: "livingAddress" }
      ],
      streetData: [],
      communityData: [],
      formData: {
        name: "",
        beginDay: "",
        endDay: "",
        sex: "",
        streetCode: "",
        communityCode: "",
        // 地址栏查到的
        merchantName: this.$route.query.merchantName,
        attendanceRate: this.$route.query.attendanceRate,
        canteenNumber: this.$route.query.canteenNumber,
        // 消费次数
        attendNumber: this.$route.query.attendNumber
      },
      serviceDate: {},
      tableData: [],
      pageSize: 10, // 每页数量
      page: 1, // 当前页数
      total: 0
    };
  },

  created() {
    this.formData = Object.assign(
      this.formData,
      JSON.parse(this.$route.query.serviceDate)
    );
    this.$store
      .dispatch("getUserAuthInfo")
      .then(() => {
        this.handleGetSearchValue();
      })
      .catch(err => {
        console.log("获取用户权限失败", err);
      });
    api.getStreetInfo().then(res => {
      if (res) {
        this.streetData = res;
      }
    });
  },

  methods: {
    changeStreet(v) {
      api.getCommunityInfo({ code: v }).then(res => {
        if (res) {
          this.communityData = res;
        }
      });
    },
    handleGetSearchValue(page) {
      this.isSearchLoading = true;
      this.form = Object.assign(
        { page: typeof page === "number" ? page : 1, pageSize: this.pageSize },
        this.formData
      );
      this.form.attendanceSign = this.formData.attendNumber; // fix:消费频率参数改变，由于需求更改后端没有新加字段导致
      this.serviceDate = Object.assign(
        {},
        {
          startTime: JSON.stringify(this.formData.beginDay.split("-")),
          endTime: JSON.stringify(this.formData.endDay.split("-"))
        }
      );
      api.getConsumePeopleInfo(this.form).then(res => {
        if (res && res.obj) {
          this.isSearchLoading = false;
          let { records, total, current, size } = res.obj;
          this.tableData = records;
          this.total = total;
          this.pageSize = size;
          this.page = current;
          this.tableData.forEach((item, index) => {
            item.index = index;
          });
        }
      });
    }
  },

  components: {
    ListLayout,
    Menu
  }
};
</script>

<style scoped>
.btns_box {
  display: table;
}
.data_total {
  display: table-cell;
  text-align: left;
  font-size: 0.16rem;
  color: #a5dcff;
}
.data_total span {
  font-weight: bolder;
  color: #05e6ff;
  margin-left: 30px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 1.6rem;
  margin-right: 0.2rem;
}
</style>
