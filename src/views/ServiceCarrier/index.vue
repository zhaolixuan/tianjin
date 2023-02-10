<template>
  <list-layout
    :crumbData="[{ title: this.$route.query.label, url: '' }]"
    :columns="$route.query.type ? serviceColums : columns"
    :tableData="tableData"
    :total="total"
    :pageSize="pageSize"
    :currentPage="currentPage"
    unit="个"
    v-on:getSearchValue="handleGetSearchValue"
    :header="$route.query.header || '居家养老服务载体分布'"
    :backPath="path"
    :title="title + '————服务载体' + ($route.query.type ? '补贴' : '')"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="载体名称" class="search_select">
        <el-select
          v-model.trim="formData.merchantName"
          clearable
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in companyList"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="级别" class="search_select">
        <el-select
          v-model="service"
          clearable
          multiple
          placeholder="请选择级别"
          @change="changeLevel"
        >
          <el-option
            v-for="(option, index) in serviceOrderItemlist"
            :key="index"
            :label="option.label"
            :value="option.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务商" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入服务商"
          v-model.trim="formData.companyName"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="供餐企业" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入供餐企业"
          v-model.trim="formData.enterprisename"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="服务区域" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入服务区域"
          v-model.trim="formData.serviceArea"
          clearable
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
      </div>
    </div>
  </list-layout>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/api.js";
import ListLayout from "@/components/TablerList/layout.vue";

export default {
  name: "ServiceCarrier",
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
        // { label: '编号', prop: 'canteenNumber' },
        { label: "服务载体", prop: "merchantName" },
        { label: "级别", prop: "canteenlevel" },
        { label: "服务商", prop: "companyname" },
        { label: "所属街道", prop: "street" },
        { label: "所属社区", prop: "community" },
        { label: "具体位置", prop: "address" },
        { label: "建设规模", prop: "constructionScale" },
        { label: "服务人员情况", prop: "servicePeople" },
        { label: "服务辐射范围", prop: "serviceRadiationRange" }
        // { label: '订单量', prop: 'orderNum' }
      ],
      serviceColums: [
        { label: "序号", prop: "index", width: "150" },
        { label: "编号", prop: "canteenNumber" },
        { label: "载体名称", prop: "merchantName" },
        { label: "载体级别", prop: "canteenlevel" },
        { label: "服务商", prop: "companyname" },
        { label: "供餐企业", prop: "enterprisename" },
        { label: "补贴订单", prop: "payOrdertotal" },
        { label: "补贴金额（元）", prop: "allowancetotal" }
      ],
      companyList: [],
      tableData: [],
      serviceOrderItemlist: [
        { label: "全部", value: "" },
        { label: "街级", value: "街级" },
        { label: "社区", value: "社区" },
        { label: "服务站", value: "服务站" }
      ],
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
      path: "",
      title: "",
      service: this.$route.query.canteenlevel
        ? [this.$route.query.canteenlevel]
        : [],
      formData: {
        merchantName: "",
        companyName: this.$route.query.companyName || "",
        serviceArea: "",
        canteenlevel: "",
        enterprisename: ""
      },
      params: {},
      streetCode: "",
      zoneCode: "",
      communityCode: "",
      paramsCode: {},
      pageForChange: 0,
      levelSelect: false, // 初始化判断是否在街机下拉框选了值
      requestParamsForSelect: false // 为true则去掉requestParams方法里的 canteenlevel 属性
    };
  },

  components: {
    ListLayout
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
      if (this.userType === 1) {
        urlCodeParams = {
          zoneCode: this.initCodeFromQuery(1),
          streetCode: this.initCodeFromQuery(2),
          communityCode: this.initCodeFromQuery(3)
        };
      }
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

  created() {
    this.getCompanyList();
    this.judgeType();

    this.$store
      .dispatch("getUserAuthInfo")
      .then(() => {
        this.handleGetSearchValue();
      })
      .catch(err => {
        console.log("获取用户权限失败", err);
      });

    this.getParamsCode();
  },

  methods: {
    getCompanyList() {
      api.getmerchantServicesList().then(res => {
        this.companyList = res.data.merchantMap.map(item => item.MerchantName);
      });
    },

    judgeType() {
      switch (this.$route.query.key) {
        case "1":
          this.path = "FiveService";
          this.title = "五大服务大数据统计分析";
          break;
        case "3":
          this.path = "HomeDistribution";
          this.title = "居家养老服务载体分布";
          break;
        case "4":
          this.path = "ProvideSubsidy";
          this.title = "养老补贴落实大数据统计";
          break;
        default:
          this.path = "buffetPage";
          this.title = "助餐服务监管大数据统计分析";
          break;
      }
    },

    getParamsCode() {
      // 10月27日新增 区分全部和街道片区
      if (typeof this.$route.query.code === "string") {
        this.paramsCode = {
          code: this.$route.query.code // 10月25日新增 解决从HomeDistribution左侧 居家养老服务载体 模块到 ServiceCarrier
        };
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
    },

    initCodeFromQuery(codeIndex) {
      return this.$route.query.code &&
        typeof this.$route.query.code !== "string"
        ? this.$route.query.code[codeIndex] || ""
        : "";
    },

    requestParams(page) {
      var params = {};
      const codeParams = this.userAuthCodeParams;
      this.$route.query.type
        ? (codeParams.allowanceMoney = 1)
        : (codeParams.merchantFlag = 1);
      if (this.requestParamsForSelect) {
        params = Object.assign(
          {},
          this.formData,
          {
            page: typeof page === "number" ? page : 1,
            pageSize: this.pageSize,
          },
          codeParams
        );
      } else {
        params = Object.assign(
          {},
          this.formData,
          {
            page: typeof page === "number" ? page : 1,
            pageSize: this.pageSize,
            canteenlevel: this.$route.query.canteenlevel
            // 22年01月11日分析 每次请求只要 Object.assign 这个方法 canteenlevel 永远只取地址栏的值了
          },
          codeParams
        );
      }
      return params;
    },

    requestParamsTwo(page) {
      var params = {};
      const codeParams = this.userAuthCodeParams;
      this.$route.query.type
        ? (codeParams.allowanceMoney = 1)
        : (codeParams.merchantFlag = 1);
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
      this.pageForChange = page;
      this.isSearchLoading = true;
      // this.formData.canteenlevel = this.service || "";
      this.$route.query.type
        ? api
            .getFreeOrderPage(this.requestParams(page))
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
            })
        : api
            .getServicesPageList(
              Object.assign(this.requestParams(page), this.paramsCode)
            )
            .then(res => {
              console.log(this.requestParams(page));
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

    // 2022年01月11日 监听街级别下拉框选中事件 重新给 canteenlevel赋值 并重新发请求
    // 上面逻辑有点乱 调用 requestParamsTwo(page) 并传入 page 是为了保证下拉框改变
    // 立刻请求的时候 和 改变之后点击查询按钮 的请求 参数保持一致
    changeLevel(val) {
      if (val.length == 1) {
        this.formData.canteenlevel = val[0];
      } else {
        this.formData.canteenlevel = val.join(",");
      }
      if (!this.levelSelect) {
        this.requestParamsForSelect = true;
      } else {
        this.requestParamsForSelect = false;
      }
      return;

      let page = this.pageForChange;
      setTimeout(() => {
        api
          .getServicesPageList(
            Object.assign(
              this.paramsCode,
              this.requestParamsTwo(page),
              this.formData
            )
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
      }, 1000);
    },

    clearSearchValue() {
      this.formData = Object.assign({}, this.formData, {
        merchantName: "",
        companyName: "",
        serviceArea: "",
        canteenlevel: "",
        enterprisename: "",
        zoneCode: "",
        streetCode: "",
        communityCode: ""
      });
      this.searchService = "";
      this.selectedLocation = [];
    }
  }
};
</script>

<style lang="less" scoped>
//
</style>
