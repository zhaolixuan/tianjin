<template>
  <list-layout
    :crumbData="[{ title: this.$route.query.label, url: '' }]"
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :pageSize="formData.pageSize"
    :currentPage="formData.currentPage"
    unit="个"
    v-on:getSearchValue="handleGetSearchValueTo"
    :header="'志愿者服务数据统计'"
    backPath="ServiceVolunteer "
    title="志愿者服务数据统计————志愿者服务入户探访服务花名册"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="志愿者姓名" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入探访对象姓名"
          v-model.trim="formData.volunteerName"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="志愿者联系电话" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入联系电话"
          v-model.trim="formData.volunteerPhone"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="志愿者类型" class="search_select">
        <el-select
          v-model="formData.volunteerType"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in volunteerTypeList"
            :key="index"
            :lable="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="探访对象姓名" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入探访对象姓名"
          v-model.trim="formData.visitObjectName"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="探访对象联系电话" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入联系电话"
          v-model.trim="formData.visitObjectPhone"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="探访对象身份证号" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入身份证号码"
          v-model.trim="formData.visitObjectIdcard"
          clearable
          @keyup.enter.native="getSearchValue"
        ></el-input>
      </el-form-item>
      <el-form-item label="探访对象类型" class="search_select">
        <el-select
          v-model="formData.visitObjectType"
          clearable
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
      </div>
    </div>
    <Menu />
  </list-layout>
</template>

<script>
import Menu from "@/views/OlderDistribution/components/Menu";
import ListLayout from "@/components/TablerList/layout.vue";
import { mapGetters } from "vuex";
import api from "@/api/api.js";

export default {
  name: "VolunteerList",
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
        { label: "分组", prop: "grouping" },
        { label: "志愿者姓名", prop: "volunteerName" },
        { label: "志愿者类型", prop: "volunteerType" },
        { label: "联系电话", prop: "volunteerPhone" },
        { label: "探访对象姓名", prop: "visitObjectName" },
        { label: "探访对象身份证号", prop: "visitObjectIdcard" },
        { label: "探访对象年龄", prop: "visitObjectAge" },
        { label: "探访对象联系电话", prop: "visitObjectPhone" },
        { label: "探访对象家庭住址", prop: "visitObjectAddress" },
        { label: "探访对象所属类型", prop: "visitObjectType" },
        { label: "所属街道", prop: "streetName" },
        { label: "所属社区", prop: "communityName" }
      ],
      tableData: [],
      volunteerTypeList: [
        { label: "党员", value: "党员" },
        { label: "志愿者", value: "志愿者" },
        { label: "社区党员", value: "社区党员" },
        { label: "网格员", value: "网格员" },
        { label: "老协会长", value: "老协会长" }
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
        { label: "半失能", value: "半失能" }
      ],
      fullscreen: true,
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
        children: "childs"
      },
      formData: {
        pageSize: 10, // 每页数量
        currentPage: 1, // 当前页数
        zoneCode:
          this.$route.query.code && typeof this.$route.query.code !== "string"
            ? this.$route.query.code[1] || ""
            : null,
        streetCode:
          this.$route.query.code && typeof this.$route.query.code !== "string"
            ? this.$route.query.code[2] || ""
            : null,
        communityCode:
          this.$route.query.code && typeof this.$route.query.code !== "string"
            ? this.$route.query.code[3] || ""
            : null,
        volunteerType: this.$route.query.volunteerType || "",
        volunteerName: "",
        volunteerPhone: "",
        visitObjectName: "",
        visitObjectIdcard: "",
        visitObjectPhone: ""
      }
    };
  },

  computed: {
    ...mapGetters(["typeNew", "codeNew", "breadCrumbCodes"]),
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
        this.getLocation();
      })
      .catch(err => {
        console.log("获取用户权限失败", err);
      });
  },

  methods: {
    handleGetSearchValueTo(val) {
      this.formData.page = val;
      this.handleGetSearchValue();
    },
    handleGetSearchValue() {
      this.isSearchLoading = true;
      this.formData.page = this.formData.page || 1;
      let form = Object.assign({}, this.formData, this.params);
      api
        .getVolunteerInfoPageList(form)
        .then(res => {
          this.isSearchLoading = false;
          const { records, total, size, current } = res && res.obj;
          this.tableData = records;
          this.formData.pageSize = size;
          this.total = total;
        })
        .catch(() => {
          this.isSearchLoading = false;
        });
    },
    handleChangeLocation(value) {
      if (this.$store.state.userType == "3") {
        this.formData.streetCode = value[0] || null;
        this.formData.communityCode = value[1] || null;
      } else if (this.$store.state.userType == "4") {
        this.formData.communityCode = value[0] || null;
      } else {
        this.formData.zoneCode = value[0];
        this.formData.streetCode = value[1] || null;
        this.formData.communityCode = value[2] || null;
      }
    },
    getLocation() {
      // 由于组件功能限制，片区级联选择器采用查询全量地区数据后前端处理的方式
      api
        .getLocationList()
        .then(res => {
          let data = res.data;
          let code = this.$store.state.code[0] || "";
          if (data && data.length > 0) {
            let allLocalList = data.filter(item => {
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
          newList = loopList.filter(item => {
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
        volunteerType: "",
        volunteerName: "",
        volunteerPhone: "",
        visitObjectName: "",
        visitObjectIdcard: "",
        visitObjectPhone: ""
      });
    }
  },

  components: {
    ListLayout,
    Menu
  }
};
</script>

<style lang="less" scoped>
//
</style>
