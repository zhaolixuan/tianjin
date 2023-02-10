<template>
  <list-layout
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :pageSize="pageSize"
    :currentPage="currentPage"
    v-on:getSearchValue="handleGetSearchValue"
    :dialogVisible.sync="dialogVisible"
    :checkData.sync="checkData"
    backPath="ServiceVolunteer"
    header="志愿者服务数据统计"
    title="志愿者服务大数据统计————志愿者入户探访服务记录"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="街道社区" class="search_select">
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
      <el-form-item label="姓名" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入姓名"
          v-model.trim="formData.intervieweeName"
          clearable
          @keyup.enter.native="getSearchValue"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="身份证号码" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入身份证号码"
          v-model.trim="formData.intervieweeCard"
          clearable
          @keyup.enter.native="getSearchValue"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="联系电话" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入联系电话"
          v-model.trim="formData.phone"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="探访人员" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入探访人员"
          v-model.trim="formData.greetStaff"
          clearable
          @keyup.enter.native="getSearchValue"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="探访时间" class="search_select">
        <el-date-picker
          v-model="mealTime"
          type="daterange"
          range-separator="-"
          clearable
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="是否回访" class="search_select">
        <el-select
          v-model="formData.returnState"
          clearable
          placeholder="请选择"
        >
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回访真实性" class="search_select">
        <el-select v-model="formData.isGreet" clearable placeholder="请选择">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item> -->
    </el-form>
    <div class="btns_box">
      <div class="btns_right">
        <el-button class="btn" @click="clearSearchValue">重置</el-button>
        <el-button
          class="btn"
          icon="el-icon-search"
          :loading="isSearchLoading"
          @click="handleGetSearchValue"
          >查询</el-button
        >
      </div>
    </div>
    <el-dialog title="查看入户探访服务记录表" :visible.sync="dialogVisible">
      <ol class="detial_content">
        <div class="tit">基本信息</div>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">所属街道社区：</span>
            <span class="item_value">{{ checkData.streetName }}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">被访姓名：</span>
            <span class="item_value">{{ checkData.intervieweeName }}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">被访人身份证号：</span>
            <span class="item_value">{{ checkData.intervieweeCard }}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">电话：</span>
            <span class="item_value">{{ checkData.phone }}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">住址：</span>
            <span class="item_value">{{ checkData.address }}</span>
          </div>
        </li>
        <small-layout
          :columns="columnsPro"
          :tableData="smallTabData"
          :pageSize="5"
          :currentPage="currentPage || 1"
          v-on:getSmallValue="handleGetSmallValue"
          :total="smallTotal"
        ></small-layout>
      </ol>
    </el-dialog>
  </list-layout>
</template>

<script>
import api from "@/api/api";
import ListLayout from "@/components/TablerList/layout.vue";
import smallLayout from "@/components/TablerList/smallLayout";
import { mapGetters } from "vuex";
import { formatTime } from "@/utils/utils";

export default {
  data() {
    return {
      isSearchLoading: false,
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false
        },
        rail: {},
        bar: {
          background: "#eee"
        }
      },
      tableData: [],

      columnsPro: [
        { label: "探访时间", prop: "greetTime" },
        { label: "探访人员", prop: "greetStaff" },
        { label: "情况说明", prop: "conditionPresentation" }
      ],
      columns: [
        { label: "所属街道", prop: "streetName" },
        { label: "所属社区", prop: "communityName" },
        { label: "被访姓名", prop: "intervieweeName" },
        { label: "被访身份证号", prop: "intervieweeCard" },
        { label: "年龄", prop: "age" },
        { label: "电话", prop: "phone" },
        { label: "住址", prop: "address" },
        { label: "探访次数", prop: "visitTotal" },
        { label: "操作", prop: "collectionGridName" }
      ],
      fullscreen: true,
      dialogVisible: false,
      selectedLocation:
        this.$route.query.code && typeof this.$route.query.code !== "string"
          ? this.$route.query.code.slice(1)
          : [], // 地区级联选中内容
      locationOptions: [], // 地区级联选择数据
      locationProps: {
        value: "code",
        label: "name",
        children: "childs"
      },
      smallTabData: [],
      mealTime: [],
      checkData: [],
      formData: {
        intervieweeName: "",
        intervieweeCard: "",
        phone: "",
        greetStaff: "",
        // returnState: '',
        beginTime: "",
        endTime: "",
        // isGreet: '',
        zoneCode: this.initCodeFromQuery(1),
        streetCode: this.initCodeFromQuery(2),
        communityCode: this.initCodeFromQuery(3)
      },
      pageSize: 12, // 每页数量
      currentPage: 1, // 当前页数
      total: 0, // 总条数
      smallSize: 5,
      smallPage: 1,
      smallTotal: 0,
      intervieweeCard: ""
    };
  },
  components: {
    ListLayout,
    smallLayout
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
  },
  watch: {
    checkData(val) {
      console.log(1111);
      this.getVisitServiceDetailPageInfo(val.intervieweeCard);
    }
  },
  created() {
    this.$store.commit("setActiveName", "网格员");
    this.$store
      .dispatch("getUserAuthInfo")
      .then(() => {
        this.getLocation();
        this.handleGetSearchValue();
      })
      .catch(err => {
        console.log("获取用户权限失败", err);
      });
    this.getLocation();
    this.handleGetSearchValue();
  },
  methods: {
    getVisitServiceDetailPageInfo(intervieweeCard) {
      if (intervieweeCard) {
        this.intervieweeCard = intervieweeCard;
      }
      api
        .getVisitServiceDetailPageInfo({
          intervieweeCard: this.intervieweeCard,
          page: this.smallPage,
          pageSize: this.smallSize
        })
        .then(res => {
          const { records, total } = res && res.obj;
          this.smallTabData = records;
          this.smallTotal = total;
        });
    },
    handleGetSmallValue(page) {
      this.smallPage = page;
      this.getVisitServiceDetailPageInfo();
    },
    initCodeFromQuery(codeIndex) {
      return this.$route.query.code &&
        typeof this.$route.query.code !== "string"
        ? this.$route.query.code[codeIndex] || ""
        : "";
    },
    requestParams(page) {
      var params = {};
      const codeParams =
        this.selectedLocation.length > 0
          ? Object.create(null)
          : this.userAuthCodeParams;
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
    // 分页器切换
    handleGetSearchValue(page) {
      this.isSearchLoading = true;
      this.formData.beginTime = this.mealTime ? formatTime(this.mealTime[0]) : "";
      this.formData.endTime = this.mealTime ? formatTime(this.mealTime[1]) : "";
      api
        .getVisitServicePageInfo(this.requestParams(page))
        .then(res => {
          this.isSearchLoading = false;
          const { records, total, size, current } = res && res.obj;
          records.map(v => {
            // v.ageNew = v.age.slice(0, v.age.length - 2)
            v.returnStateNew = v.returnState == 0 ? "否" : "是";
            v.isGreetNew = v.isGreet == 0 ? "否" : "是";
          });
          this.tableData = records || [];
          this.pageSize = size;
          this.currentPage = current;
          this.total = total;
        })
        .catch(() => {
          this.isSearchLoading = false;
        });
    },
    handleChangeLocation(value) {
      if (this.$store.state.userType === "3") {
        this.formData.streetCode = value[0] || "";
        this.formData.communityCode = value[1] || "";
      } else if (this.$store.state.userType === "4") {
        this.formData.communityCode = value[0] || "";
      } else {
        this.formData.zoneCode = value[0] || "";
        this.formData.streetCode = value[1] || "";
        this.formData.communityCode = value[2] || "";
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
              return item.name === "河西区";
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
            if (item.code === code) {
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
    openDialog() {
      this.$store.commit("setNavDialogVisible", true);
    },
    // 获取input框值进行查询
    getSearchValue() {
      this.currentPage = 1;
      this.getOlderData();
    },
    clearSearchValue() {
      this.formData = {
        sex: "",
        zoneCode: "",
        streetCode: "",
        communityCode: "",
        name: "",
        idCard: "",
        phone: ""
      };
      this.selectedLocation = [];
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .table_box {
  padding-bottom: 0rem;
}
</style>
