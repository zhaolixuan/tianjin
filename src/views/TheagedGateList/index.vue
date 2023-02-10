<template>
  <list-layout
    :crumbData="[{ title: this.$route.query.label, url: '' }]"
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :pageSize="formData.pageSize"
    :currentPage="formData.page"
    v-on:getSearchValue="handleGetSearchValue"
    :code="$route.query.code"
    backPath="SmartdeviceStatisticsNew"
    title="门磁设备监测大数据统计————安装门磁设备老人"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="老年人姓名" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入老年人姓名"
          v-model.trim="formData.userName"
          @keyup.enter.native="handleGetSearchValue"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="身份证号码" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入身份证号码"
          v-model.trim="formData.idcardNumber"
          clearable
          @keyup.enter.native="handleGetSearchValue"
        >
        </el-input>
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
        { label: "设备标识ID", prop: "identificationId", width: "150" },
        { label: "设备类型", prop: "deviceType" },
        { label: "老年人姓名", prop: "userName" },
        { label: "身份证号码", prop: "idcardNumber" },
        { label: "联系方式", prop: "phone" },
        { label: "发放方式", prop: "disbursement" },
        { label: "开通时间", prop: "openTime" },
        { label: "在线状态", prop: "onlineState" }
      ],
      tableData: [],
      fullscreen: true,
      orderAll: "",
      index: 1,
      locationProps: {
        value: "code",
        label: "name",
        children: "childs"
      },
      total: 0, // 总条数
      serviceLevel: "",
      formData: {
        userName: "",
        idcardNumber: "",
        pageSize: 10, // 每页数量
        page: 1 // 当前页数
      },
      streetCode: "",
      zoneCode: "",
      communityCode: "",
      paramsCode: {}
    };
  },

  computed: {
    ...mapGetters(["typeNew", "codeNew"]),
    params() {
      let params = {};
      const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0];
      return params;
    }
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

    // 10月27日新增 区分全部和街道片区
    if (typeof this.$route.query.code === "string") {
      this.paramsCode = {};
    } else if (typeof this.$route.query.code === "object") {
      this.streetCode = this.$route.query.code[2]; // url 地址栏中第三个code
      this.zoneCode = this.$route.query.code[1]; // url 地址栏中第二个code
      this.communityCode = this.$route.query.code[4]; // url 地址栏中第四个code
      this.paramsCode = {
        streetCode: this.streetCode,
        zoneCode: this.zoneCode
        // communityCode: this.communityCode
      };
    }
    this.handleGetSearchValue();
  },

  methods: {
    handleGetSearchValue(page) {
      this.isSearchLoading = true;
      let form = Object.assign({}, this.params, this.formData, this.paramsCode );
      this.formData.page = typeof page === "number" ? page : 1;
      api
        .getEquipmentDataPageList(form)
        .then(res => {
          this.isSearchLoading = false;
          const { records, total, size, current } = res && res.obj;
          this.tableData = records;
          // 解决 bug 45915
          this.tableData.map(item=>{
            if(item.onlineState == 'Offline') {
              item.onlineState = '离线';
            }else {
              item.onlineState = '在线';
            }
          })
          this.formData.pageSize = size;
          this.total = total;
        })
        .catch(() => {
          this.isSearchLoading = false;
        });
    },

    handleServiceClass() {
      this.formData.page = 1;
    },

    clearSearchValue() {
      this.formData = Object.assign({}, this.formData, {
        userName: "",
        idcardNumber: ""
      });
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