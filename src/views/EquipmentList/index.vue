<template>
  <list-layout
    :crumbData="[{ title: this.$route.query.label, url: '' }]"
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :pageSize="pageSize"
    :currentPage="currentPage"
    backPath="SmartdeviceStatistics"
    v-on:getSearchValue="handleGetSearchValue"
    title="智能设备监测大数据统计分析————一键通设备安装老人"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="设备类型ID" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入设备类型ID"
          v-model.trim="formData.markid"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="用户姓名" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入用户姓名"
          v-model.trim="formData.oldname"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="身份证号码" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入身份证号码"
          v-model.trim="formData.oldcard"
          clearable
          @keyup.enter.native="getSearchValue"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="联系方式" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入联系方式"
          v-model.trim="formData.phone"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="发放方式" class="search_select">
        <el-select
          v-model="formData.releaseway"
          clearable
          placeholder="请选择发放方式"
        >
          <el-option
            v-for="(option, index) in payList"
            :key="index"
            :label="option"
            :value="option"
            @change="handleServiceClass"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="btns_box">
      <div class="btns_right">
        <el-button @click="clearSearchValue" class="btn">重置</el-button>
        <el-button
          class="btn"
          icon="el-icon-search"
          :loading="isSearchLoading"
          @click="handleGetSearchValue"
          >查询</el-button
        >
        <!-- <a :href="downloadExcel" target="_blank">
          <el-button class="btn" >导出</el-button>
        </a> -->
      </div>
    </div>
  </list-layout>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/api.js";
import ListLayout from "@/components/TablerList/layout.vue";

export default {
  data() {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false
        },
        bar: {
          background: "#eee"
        }
      },
      isSearchLoading: false,
      columns: [
        { label: "序号", prop: "index", width: "150" },
        { label: "设备ID", prop: "markid" },
        { label: "设备类型", prop: "type" },
        { label: "设备属性", prop: "simnum" },
        { label: "SIM卡号", prop: "simnum" },
        { label: "用户姓名", prop: "oldname" },
        { label: "身份证号", prop: "oldcard" },
        { label: "联系方式", prop: "phone" },
        { label: "发放方式", prop: "releaseway" },
        { label: "开通时间", prop: "opentime" }
      ],
      tableData: [],
      serviceOrderItemlist: ["普通老年人", "享受补贴老人"],
      payList: ["全部", "购买", "租用", "免费"],
      fullscreen: true,
      index: 1,
      locationProps: {
        value: "code",
        label: "name",
        children: "childs"
      },
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页数
      total: 0, // 总条数
      formData: {
        oldname: "",
        phone: "",
        oldcard: "",
        markid: "",
        releaseway: ""
      },
      params: {},
      streetCode: "",
      zoneCode: "",
      communityCode: "",
      paramsCode: {}
    };
  },

  computed: {
    ...mapGetters(["userType", "code"]),
    userAuthCodeParams() {
      let params = {
        streetCode: "",
        zoneCode: "",
        communityCode: ""
      };
      let urlCodeParams = {};
      if (this.userType === 2) {
        urlCodeParams = { zoneCode: this.initCodeFromQuery(1) };
      }
      if (this.userType === 3) {
        urlCodeParams = { streetCode: this.initCodeFromQuery(2) };
      }
      if (this.userType === 4) {
        urlCodeParams = { communityCode: this.initCodeFromQuery(3) };
      }
      return Object.assign({}, params, urlCodeParams);
    }
    // downloadExcel () {
    //   const Api = process.env.NODE_ENV === 'development' ? 'http://tianjin.aioc.dev.xjoycity.com:8204' : ''
    //   let data = `${Api}/yanglao-api/serviceOrderInfo/downloadExcel?`
    //   const formData = Object.assign({}, this.requestParams(), {
    //     page: '',
    //     pageSize: ''
    //   })
    //   let keys = Object.keys(formData)

    //   keys.forEach((item, index) => {
    //     data += formData[item] ? `${item}=${formData[item]}&` : ''
    //   })
    //   return data.slice(0, -1)
    // }
  },

  created() {
    this.$store
      .dispatch("getUserAuthInfo")
      .then(() => {
        this.handleGetSearchValue();
      })
      .catch(err => {
        console.log("获取用户权限失败", err);
      });
    console.log(this.$route.query); // code 是 array
    // 10月27日新增 区分全部和街道片区
    if (typeof this.$route.query.code === "string") {
      this.paramsCode = {};
    } else if (typeof this.$route.query.code === "object") {
      this.streetCode = this.$route.query.code[2]; // url 地址栏中第三个code
      this.zoneCode = this.$route.query.code[1]; // url 地址栏中第二个code
      this.communityCode = this.$route.query.code[3]; // url 地址栏中第四个code社区
      this.paramsCode = {
        streetCode: this.streetCode,
        zoneCode: this.zoneCode,
        communityCode: this.communityCode
      };
    }
    this.handleGetSearchValue();
  },

  methods: {
    initCodeFromQuery(codeIndex) {
      return this.$route.query.code &&
        typeof this.$route.query.code !== "string"
        ? this.$route.query.code[codeIndex] || ""
        : "";
    },

    requestParams(page) {
      var params = {};
      const codeParams = this.userAuthCodeParams;
      params = Object.assign(
        {},
        this.formData,
        {
          page: typeof page === "number" ? page : 1,
          pageSize: this.pageSize
        },
        codeParams
      );
      return params;
    },

    handleGetSearchValue(page) {
      this.isSearchLoading = true;
      api
        .getDeviceopenPage(
          Object.assign(this.requestParams(page), this.paramsCode)
        )
        .then(res => {
          this.isSearchLoading = false;
          const { records, total, size, current } = res && res.obj;
          this.tableData = records;
          this.pageSize = size;
          this.currentPage = current;
          this.total = total;
        })
        .catch(() => {
          this.isSearchLoading = false;
        });
    },

    handleServiceClass() {
      this.currentPage = 1;
    },

    clearSearchValue() {
      this.formData = Object.assign({}, this.formData, {
        oldname: "",
        phone: "",
        oldcard: "",
        markid: "",
        releaseway: ""
      });
      this.searchService = "";
    }
  },

  components: {
    ListLayout
  }
};
</script>

<style lang="less" scoped>
//
</style>
