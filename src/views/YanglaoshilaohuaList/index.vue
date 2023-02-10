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
      :header="'适老化场景场景展示'"
      backPath="YanglaoshilaohuaService"
      title="适老化改造场景展示————适老化入户名单改造"
    >
      <el-form :inline="true" :model="formData">
        <el-form-item label="老年人姓名" class="search_select">
          <el-input
            class="head_left"
            placeholder="请输入老年人姓名"
            v-model.trim="formData.name"
            clearable
          >
          </el-input>
        </el-form-item>

        <el-form-item label="身份证号" class="search_select">
          <el-input
            class="head_left"
            placeholder="请输入身份证号码"
            v-model.trim="formData.idCardnumber"
            clearable
          ></el-input>
          <!-- @keyup.enter.native="getSearchValue" -->
        </el-form-item>

        <el-form-item label="地区筛选" class="search_select">
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
        </el-form-item>
        <el-form-item label="改造类型" class="search_select">
          <el-select
            v-model="formData.projectType"
            clearable
            @change="changeProjectTypeValue()"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in volunteerTypeList"
              :key="index"
              :label="item.projectType"
              :value="item.projectType"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="改造项目" class="search_select">
          <el-select
            v-model="formData.projectName"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in projectList"
              :key="index"
              :label="item.projectName"
              :value="item.projectName"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="评估类型" class="search_select">
          <el-select
            v-model="formData.appraisalConclusion"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in appraisalConclusionList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="改造价格" class="search_select">
          <el-input
            class="input_num"
            placeholder="起始金额"
            v-model="formData.totalPriceStart"
          />
          <span>-</span>
          <el-input
            class="input_num"
            placeholder="截止金额"
            v-model="formData.totalPriceEnd"
          />
        </el-form-item>

        <el-form-item label="人员类型" class="search_select">
          <el-select
            v-model="formData.peopleType"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in PersonnelTypeList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
import DetialTip from "@/views/YanglaoshilaohuaService/components/OlderMap/DetialTip/index.vue";
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
      columns: [
        //   { label: "序号", prop: "id" },
        { label: "老年人姓名", prop: "name" },
        { label: "评估结论", prop: "appraisalConclusion" },
        { label: "人员类型", prop: "peopleType"},
        { label: "联系电话", prop: "phone" },
        // { label: "年龄", prop: "age" },
        { label: "身份证号", prop: "idCardnumber" },
        { label: "所属街道", prop: "street" },
        { label: "所属社区", prop: "community" },

        { label: "详细地址", prop: "address" },
        { label: "改造内容", prop: "modifyContent" },
        { label: "总价", prop: "totalPrice" },
        
        { label: "补贴金额", prop: "subsidiesPrice" },
        // { label: "改造状态", prop: "reformSatae" },
        { label: "操作", prop: "chakan" },
      ],
      tableData: [],
      volunteerTypeList: [],
      projectList: [],
      appraisalConclusionList: [
        { label: "全部", value: "" },
        { label: "部分失能", value: "部分失能" },
        { label: "失能", value: "失能" },
        { label: "自理", value: "自理" },
        { label: "瘫痪", value: "瘫痪" },
      ],
      visitObjectTypeList: [
        // { label: "残疾人员", value: "残疾人员" },
        { label: "空巢", value: "空巢" },
        { label: "独居", value: "独居" },
        { label: "失独", value: "失独" },
        { label: "孤老", value: "孤老" },
        { label: "残疾", value: "残疾" },
        { label: "孤寡", value: "孤寡" },
        { label: "失能", value: "失能" },
        { label: "半失能", value: "半失能" },
      ],
      PersonnelTypeList: [
        { label: "全部", value: "" },
        { label: "普通失能", value: "普通失能" },
        { label: "兜底保障", value: "兜底保障" },
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
        streetCode: this.initCodeFromQuery(2),
        communityCode: this.initCodeFromQuery(3),
        projectType: "",
        projectName: "",
        appraisalConclusion: "",
        totalPriceStart: "",
        totalPriceEnd: "",
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
      api
        .getModifyPlanList(form)
        .then((res) => {
          this.isSearchLoading = false;

          this.tableData = res.data;
          this.total = res.count;
        })
        .catch(() => {
          this.isSearchLoading = false;
        });

      // this.tableData = datas;
      // this.formData.pageSize = 10;
      //  this.total = 10;
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
