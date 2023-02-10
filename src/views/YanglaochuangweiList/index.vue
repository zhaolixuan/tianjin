<template>
  <div>
    <div v-if="isShowDetail">
      <detial-tip :serviceData="serviceData"></detial-tip>
    </div>
    <!-- :dialogVisible.sync="dialogVisible" -->
    <list-layout
      :crumbData="[{ title: this.$route.query.label, url: '' }]"
      :columns="columns"
      :tableData="tableData"
      :total="total"
      :pageSize="formData.pageSize"
      :currentPage="formData.currentPage"
      :checkData.sync="checkData"
      unit="个"
      v-on:getSearchValue="handleGetSearchValueTo"
      :header="'家庭养老床位服务数据统计分析'"
      backPath="YanglaochuangweiService"
      title="家庭养老床位服务数据统计分析————养老床位服务记录"
    >
      <el-form :inline="true" :model="formData">
        <el-form-item label="工单编号" class="search_select">
          <el-input
            class="head_left"
            placeholder="请输入工单编号"
            v-model.trim="formData.number"
            clearable
          >
          </el-input>
        </el-form-item>

        <el-form-item label="老年人姓名" class="search_select">
          <el-input
            class="head_left"
            placeholder="请输入老年人姓名"
            v-model.trim="formData.oldPeople"
            clearable
          >
          </el-input>
        </el-form-item>

        <el-form-item label="身份证号" class="search_select">
          <el-input
            class="head_left"
            placeholder="请输入身份证号码"
            v-model.trim="formData.idcardNumber"
            clearable
          ></el-input>
          <!-- @keyup.enter.native="getSearchValue" -->
        </el-form-item>

        <el-form-item label="联系方式" class="search_select">
          <el-input
            class="head_left"
            placeholder="请输入联系方式"
            v-model.trim="formData.phone"
            clearable
          ></el-input>
          <!-- @keyup.enter.native="getSearchValue" -->
        </el-form-item>
        <!-- <el-form-item label="地区筛选" class="search_select">
          <el-cascader
            placeholder="选择地区"
            v-model="selectedLocation"
            :options="locationOptions"
            @change="handleChangeLocation"
            :show-all-levels="false"
            change-on-select
            filterable
            clearable
            :props="locationProps"
          ></el-cascader>
        </el-form-item> -->
        <el-form-item label="服务商" class="search_select">
          <!-- <el-select
            v-model="formData.projectType"
            clearable
            @change="changeProjectTypeValue()"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in volunteerTypeList"
              :key="index"
              :lable="item.projectType"
              :value="item.projectType"
            ></el-option>
          </el-select> -->

          <el-input
            class="head_left"
            placeholder="请输入服务商"
            v-model.trim="formData.companyName"
            clearable
          >
          </el-input>
        </el-form-item>

        <el-form-item label="服务载体" class="search_select">
          <el-select
            v-model="formData.mealsInfoName"
            clearable
            @change="changeProjectNameValue()"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in companyList"
              :key="index"
              :lable="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否享受补贴" class="search_select">
          <el-select
            v-model="formData.nursing"
            clearable
            @change="changeProjectNameValue()"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in visitObjectTypeList"
              :key="index"
              :lable="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- @change="changeProjectNameValue()" -->
        <el-form-item label="状态" class="search_select">
          <el-select
            v-model="formData.status"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in statusObjectTypeList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="服务时间：" class="search_select search_time">
          <el-date-picker
            v-model="formData.beginDay"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="开始日期"
          >
          </el-date-picker>
          <el-date-picker
            v-model="formData.endDay"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="截止日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div class="btns_box">
        <div class="btns_right">
          <el-button @click="clearSearchValue" class="btn">新增</el-button>
          <el-button
            class="btn"
            icon="el-icon-search"
            :loading="isSearchLoading"
            @click="handleGetSearchValue"
            >查询</el-button
          >
        </div>
      </div>
      <Menu />
    </list-layout>
  </div>
</template>

<script>
import Menu from "@/views/OlderDistribution/components/Menu";
import ListLayout from "@/components/TablerList/layout.vue";
import { mapGetters } from "vuex";
import api from "@/api/api.js";
import { datas } from "./communityData.js";
import DetialTip from "./components/DetialTip/index.vue";
export default {
  name: "YanglaoshilaohuaList",
  data() {
    return {
      isShowDetail: false,
      serviceData: {},
      dialogVisible: false,
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false,
        },
        bar: {
          background: "#eee",
        },
      },
      isSearchLoading: false,
      companyList: [],
      columns: [
        //   { label: "序号", prop: "id" },
        { label: "工单编号", prop: "number" },
        { label: "服务商", prop: "companyName" },
        { label: "居家养老服务中心", prop: "mealsInfoName" },
        // { label: "年龄", prop: "age" },
        { label: "老年人姓名", prop: "oldPeople" },
        // { label: "身体评估", prop: "approvalStataus" },
        { label: "预约时间", prop: "createTime" },

        { label: "服务时间", prop: "serviceDate" },
        { label: "服务项目", prop: "type" },
        { label: "服务内容", prop: "project" },
        { label: "状态", prop: "status" },
        // { label: "是否享回访", prop: "visitType" },
        // { label: "改造状态", prop: "reformSatae" },
        { label: "操作", prop: "chakan" },
      ],
      tableData: [],
      volunteerTypeList: [],
      projectList: [],
      visitObjectTypeList: [
        { label: "是", value: "是" },
        { label: "否", value: "否" },
      ],
      statusObjectTypeList: [
        { label: "未开始", value: "1" },
        { label: "服务中", value: "2" },
        { label: "已完成", value: "3" },
        { label: "已评价", value: "4" },
        { label: "已取消", value: "5" },
        { label: "待改派", value: "6" },
        { label: "已回访", value: "7" },
      ],
      fullscreen: true,
      checkData: [],
      index: 1,
      total: 0, // 总条数
      selectedLocation:
        this.$route.query.code && typeof this.$route.query.code !== "string"
          ? this.$route.query.code.slice(1)
          : [],
      locationOptions: [],
      locationProps: {
        value: "code",
        label: "name",
        children: "childs",
      },

      formData: {
        limit: 10, // 每页数量
        page: 1, // 当前页数
        name: "",
        idCardnumber: "",
        projectType: "",
        projectName: "",
        status: '',
        mealsInfoName: "",
        companyName: "",
      },
    };
  },

  computed: {
    // ...mapGetters(["typeNew", "codeNew", "breadCrumbCodes"]),
    // params() {
    //   let params = {};
    //   const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
    //   params[typeCodes[this.typeNew - 1]] = this.codeNew[0];
    //   return params;
    // },
  },

  created() {
    this.$store
      .dispatch("getUserAuthInfo")
      .then(() => {
        //  console.log(this.selectedLocation);
        this.handleGetSearchValue();
        this.getLocation();
        this.getProjectTypesList();
        this.getCompanyList();
      })
      .catch((err) => {
        console.log("获取用户权限失败", err);
      });
  },
  watch: {
    checkData(val) {
      // console.log(val);
      this.isShowDetail = false;
      this.serviceData = val;
      this.timer = setTimeout(() => {
        this.isShowDetail = true;
      }, 100);

      //console.log(1111);
      // this.getVisitServiceDetailPageInfo(val.intervieweeCard);
    },
  },
  methods: {
    getCompanyList() {
      api.getmerchantServicesList().then((res) => {
        this.companyList = res.data.merchantMap.map(
          (item) => item.MerchantName
        );
      });
    },
    initCodeFromQuery(codeIndex) {
      return this.$route.query.code &&
        typeof this.$route.query.code !== "string"
        ? this.$route.query.code[codeIndex] || ""
        : "";
    },
    handleGetSearchValueTo(val) {
      this.formData.page = val;
      this.handleGetSearchValue();
    },
    changeProjectTypeValue() {
      this.getProjectNamesList();
    },
    changeProjectNameValue() {
      if (this.formData.projectType == "") {
        // this.t
      }
    },
    getProjectTypesList() {
      api
        .getProjectTypesList()
        .then((res) => {
          this.volunteerTypeList = res;
        })
        .catch(() => {});
    },
    getProjectNamesList() {
      let params = {
        projectType: this.formData.projectType || "",
      };
      api
        .getProjectNamesList(params)
        .then((res) => {
          this.projectList = res;
        })
        .catch(() => {});
    },
    handleGetSearchValue() {
      //this.isSearchLoading = true;
      this.formData.page = this.formData.page || 1;
      
      let form = Object.assign({}, this.formData, this.params);
      form.status =  this.formData.status||3
      api
        .getOrderFamilyList(form)
        .then((res) => {
          this.isSearchLoading = false;
          res.data.forEach((element) => {
            element.approvalStataus = this.approvaData(element.approvalStataus); //身体评估状态
            element.status = this.stateData(element.status); //状态
            element.visitType = this.visitData(element.visitType); //是否回访状态
          });
          this.tableData = res.data;
          this.total = res.count;
        })
        .catch(() => {
          this.isSearchLoading = false;
        });
    },
    approvaData(state) {
      //身体评估状态
      let stat = "";
      switch (state) {
        case "0":
          stat = "待评估";
          break;
        case "1":
          stat = "评估通过";
          break;
        case "2":
          stat = "评估未通过";
          break;
      }

      return stat;
    },
    visitData(state) {
      //是否回访
      let stat = "";
      switch (state) {
        case "0":
          stat = "未回访";
          break;
        case "1":
          stat = "已回访";
          break;
      }

      return stat;
    },
    stateData(state) {
      //状态
      let stat = "";
      switch (state) {
        case 1:
          stat = "未开始";
          break;
        case 2:
          stat = "服务中";
          break;
        case 3:
          stat = "已完成";
          break;
        case 4:
          stat = "已评价";
          break;
        case 5:
          stat = "已取消";
          break;
        case 6:
          stat = "待改派";
          break;
        case 7:
          stat = "已回访";
          break;
      }

      return stat;
    },
    handleChangeLocation(value) {
      // console.log(value);
      this.formData.streetCode = value[1] || null;
      this.formData.communityCode = value[2] || null;
    },
    getLocation() {
      // 由于组件功能限制，片区级联选择器采用查询全量地区数据后前端处理的方式
      api
        .getLocationList()
        .then((res) => {
          let data = res.data;
          let code = this.$store.state.code[0] || "";
          if (data && data.length > 0) {
            let allLocalList = data.filter((item) => {
              return item.name == "河西区";
            })[0].childs;
            let localListByCode = code
              ? this.getLocalListByCode(allLocalList, code)
              : [];
            this.locationOptions =
              localListByCode.length > 0 ? localListByCode : allLocalList;
          }
        })
        .catch(() => {
          console.log("查询片区数据失败");
        });
    },
    // 根据code筛选层级数据
    getLocalListByCode(localList, code) {
      let list = [];
      function loopFilter(loopList) {
        let newList = [];
        if (loopList) {
          newList = loopList.filter((item) => {
            if (item.code == code) {
              return true;
            } else {
              if (item.childs && item.childs.length > 0) {
                loopFilter(item.childs);
              } else {
                return false;
              }
            }
          });
          if (newList.length > 0) {
            list = newList;
            return false;
          }
        }
      }
      loopFilter(localList);
      return list;
    },

    handleServiceClass() {
      this.currentPage = 1;
    },

    clearSearchValue() {
      this.formData = Object.assign({}, this.formData, {
        projectType: "",
        name: "",
        projectName: "",
        volunteerPhone: "",
        visitObjectName: "",
        idCardnumber: "",
        visitObjectPhone: "",
      });
    },
  },

  components: {
    ListLayout,
    Menu,
    DetialTip,
  },
};
</script>

<style lang="less" scoped>
//
</style>
