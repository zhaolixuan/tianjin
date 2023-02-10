<template>
  <list-layout
    :crumbData="[{ title: this.$route.query.label, url: '' }]"
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :pageSize="pageSize"
    :currentPage="currentPage"
    v-on:getSearchValue="handleGetSearchValue"
    :copies="!$route.query.key ? copies : 0"
    unit="单"
    :dialogVisible.sync="dialogVisible"
    :backPath="path"
    :title="title"
    :header="$route.query.header"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="服务商" class="search_select">
        <el-select
          v-model="formData.companyName"
          clearable
          :disabled="companyLists.length === 1"
          placeholder="请选择服务商"
        >
          <el-option
            v-for="(option, index) in companyLists"
            :key="index"
            :label="option"
            :value="option"
          ></el-option>
        </el-select>
      </el-form-item>
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
      <el-form-item label="服务载体级别" class="search_select">
        <el-select
          v-model="serviceLevel"
          clearable
          multiple
          placeholder="请选择载体级别"
        >
          <el-option label="街级" value="街级"></el-option>
          <el-option label="社区级" value="社区级"></el-option>
          <el-option label="服务站" value="服务站"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付单号" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入支付单号"
          v-model.trim="formData.payOrderNo"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="订单人姓名" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入订单人姓名"
          v-model.trim="formData.orderName"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="订单人身份证号码" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入身份证号码"
          v-model.trim="formData.orderCard"
          clearable
          @keyup.enter.native="getSearchValue"
        ></el-input>
      </el-form-item>
      <el-form-item label="订单人手机号" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入订单人手机号"
          v-model.trim="formData.orderPhone"
          clearable
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="订单人类别" class="search_select">
        <el-select v-model="formData.orderPersonType" clearable placeholder="请选择订单人类别">
          <el-option
            v-for="(option,index) in  serviceOrderItemlist"
            :key="index"
            :label="option"
            :value="option"
          ></el-option>
        </el-select>
      </el-form-item>-->
      <!-- <el-form-item label="支付方式" class="search_select">
        <el-select v-model="formData.payStyle" clearable placeholder="请选择支付方式">
          <el-option
            v-for="(option,index) in  payList"
            :key="index"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="服务时间" class="search_select">
        <el-date-picker
          v-model="mealTime"
          type="daterange"
          range-separator="-"
          clearable
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="支付时间" class="search_select">
        <el-date-picker
          v-model="payTime"
          type="daterange"
          range-separator="-"
          clearable
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="订单状态" class="search_select">
        <el-select
          v-model="allStatus"
          multiple
          clearable
          placeholder="请选择订单状态"
        >
          <el-option
            v-for="(option, index) in serviceOrderStatus"
            :key="index"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下单方式" class="search_select">
        <el-select
          v-model="orderFroms"
          clearable
          multiple
          placeholder="请选择下单方式"
        >
          <el-option
            v-for="(option, index) in orderList"
            :key="index"
            :label="option"
            :value="option"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务方式" class="search_select">
        <el-select
          v-model="formData.mealStyle"
          clearable
          placeholder="请选择服务方式"
        >
          <el-option
            v-for="(option, index) in ServiceData"
            :key="index"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务类别" class="search_select">
        <el-select
          v-model="formData.requirementBig"
          clearable
          placeholder="请选择服务类别"
          :disabled="!$route.query.key"
          @change="handleTypeChange"
        >
          <el-option
            v-for="(option, index) in ClasstypeData"
            :key="index"
            :label="option"
            :value="option"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 2022年1月5日新增 -->
      <el-form-item label="服务项目" class="search_select">
        <el-select
          v-model="formData.mealType"
          clearable
          placeholder="请选择服务类别"
          :disabled="!$route.query.key"
        >
          <el-option
            v-for="(option, index) in contentList"
            :key="index"
            :label="option.name"
            :value="option.name"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="btns_box">
      <div class="total_num">
        <p>
          服务人次:
          <span>{{ total }}</span
          >次
        </p>
        <p v-if="!$route.query.key">
          就餐份数:
          <span>{{ copies }}</span
          >份
        </p>
      </div>
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

    <el-dialog title="服务记录详情" :visible.sync="dialogVisible">
      <ol class="detial_content">
        <!-- type 类型 -->
        <li
          class="detial_item"
          v-for="(item, index) in totalRowItemList"
          :key="index"
        >
          <div class="item_contnet" v-for="(ite, ind) in item" :key="ind">
            <span class="item_label">{{ ite.itmeType }}:&nbsp;</span>
            <span class="item_value">{{ ite.itemValue }}</span>
          </div>
        </li>
        <!-- 服务流程 -->
        <li class="detial_item">
          <div class="item_contnet">
            <span class="flow_tit">服务记录服务流程:&nbsp;</span>
          </div>
        </li>
        <li class="detial_item" v-for="i in 3" :key="i + '1'">
          <div class="item_contnet">
            <img
              class="flow_icon"
              :src="require('@/assets/img/flow.png')"
              alt=""
              srcset=""
            />
            <span class="item_flow">人工接单:&nbsp;</span>
            <span class="item_flow">2021-04-05</span>
            <span class="item_flow">接单人:&nbsp;王奶奶</span>
          </div>
        </li>
      </ol>
    </el-dialog>
  </list-layout>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/api.js";
import ListLayout from "@/components/TablerList/layout.vue";

let formatTime = date => {
  let formatData = "";
  if (date) {
    let month =
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1);
    let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    formatData = date.getFullYear() + "-" + month + "-" + day;
  }
  return formatData;
};

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
      dialogVisible: false,
      isSearchLoading: false,
      companyList: [],
      companyLists: [],
      columns: [
        { label: "序号", prop: "index", width: "60" },
        { label: "载体名称", prop: "merchantName", width: "220" },
        { label: "支付订单号", prop: "payOrderNo", detial: true },
        { label: "订单人姓名", prop: "orderName" },
        { label: "订单人身份证号", prop: "orderCard", width: "150" },
        { label: "养老卡号", prop: "pensioncardNumber", width: "150" },
        { label: "订单人手机号", prop: "orderPhone" },
        { label: "服务时间", prop: "mealTime" },
        { label: "消费金额(元)", prop: "consumerMoney" },
        { label: "补贴金额(元)", prop: "allowanceMoney" },
        { label: "实收金额(元)", prop: "amountCollected" },
        { label: "服务类别", prop: "requirementBig" },
        { label: "支付时间", prop: "payTime" },
        { label: "下单方式", prop: "orderFrom" },
        { label: "服务方式", prop: "mealStyle" }
      ],
      tableData: [],
      serviceOrderItemlist: ["普通老年人", "享受补贴老人"],
      ClasstypeData: [
        "助餐服务类",
        "生活照料类",
        "助医服务类",
        "托养床位类",
        "其他服务类"
      ],
      contentList: [],
      serviceOrderStatus: [
        { label: "未领", value: "未领" },
        { label: "已领", value: "已领" },
        { label: "退单", value: "退单" },
        { label: "逾期", value: "逾期" }
      ],
      payList: [
        { label: "全部", value: "" },
        { label: "微信", value: "微信" },
        { label: "支付宝", value: "支付宝" },
        { label: "现金", value: "现金" },
        { label: "饭卡", value: "饭卡" }
      ],
      fullscreen: true,
      ServiceData: [
        {
          label: "现场服务",
          value: "现场服务"
        },
        {
          label: "入户服务",
          value: "入户服务"
        }
      ],
      orderList: ["居家养老服务卡", "商家APP", "电话下单"],
      index: 1,
      copies: 0,
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
      mealTime: [
        this.$route.query.startTime
          ? new Date(JSON.parse(this.$route.query.startTime))
          : "",
        this.$route.query.endTime
          ? new Date(JSON.parse(this.$route.query.endTime))
          : ""
      ],
      payTime: [
        this.$route.query.startPayTime
          ? new Date(JSON.parse(this.$route.query.startPayTime))
          : "",
        this.$route.query.endPayTime
          ? new Date(JSON.parse(this.$route.query.endPayTime))
          : ""
      ],
      allStatus: this.$route.query.allStatus || [], // 订单状态
      orderFroms: this.$route.query.orderFrom || [],
      serviceLevel: [],
      roleid: "",
      formData: {
        merchantName: this.$route.query.merchantName || "",
        orderName: "",
        orderPhone: "",
        orderCard: this.$route.query.idCard || "",
        payOrderNo: "",
        orderPersonType: "",
        merchantFlag: "1",
        payStyle: "",
        payTimeStart: "",
        payTimeEnd: "",
        mealTimeStart: "",
        mealTimeEnd: "",
        orderStatus: "",
        orderFrom: [],
        companyName: "",
        canteenlevel: "",
        mealStyle: this.$route.query.mealStyle || "",
        requirementBig: !this.$route.query.key ? "膳食供应" : "",
        mealType: ""
      },
      params: {},
      selectedType: "",
      totalRowItemList: [
        [
          {
            itmeType: "订单号",
            itemValue: "213"
          },
          {
            itmeType: "老人姓名",
            itemValue: "213"
          },
          {
            itmeType: "联系电话",
            itemValue: "213"
          }
        ],
        [
          {
            itmeType: "服务地址",
            itemValue: "213"
          },
          {
            itmeType: "服务项目",
            itemValue: "213"
          },
          {
            itmeType: "消费金额",
            itemValue: "213"
          }
        ],
        [
          {
            itmeType: "支付方式",
            itemValue: "213"
          },
          {
            itmeType: "下单时间",
            itemValue: "213"
          },
          {
            itmeType: "预约时间",
            itemValue: "213"
          }
        ],
        [
          {
            itmeType: "服务状态",
            itemValue: "213"
          },
          {
            itmeType: "完成时间",
            itemValue: "213"
          },
          {
            itmeType: "服务商家",
            itemValue: "213"
          }
        ]
      ],
    };
  },

  components: {
    ListLayout
  },

  computed: {
    ...mapGetters(["userType", "code", "useName"]),
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

  watch: {
    useName(val) {
      this.getOtherPageList(this.useName, this.roleid);
    },
    selectedType: {
      handler(newVal, oldVal) {
        this.getContentData();
      }
    }
  },

  created() {
    this.roleid = window.localStorage.getItem("roleid");
    api.getmerchantServicesList().then(res => {
      this.companyList = res.data.merchantMap.map(item => item.MerchantName);
    });
    this.$store
      .dispatch("getUserAuthInfo")
      .then(() => {
        // this.handleGetSearchValue()
      })
      .catch(err => {
        console.log("获取用户权限失败", err);
      });
    this.getOtherPageList(this.useName, this.roleid);
    switch (this.$route.query.key) {
      case "1":
        // this.columns = this.columns2
        this.path = "FiveService";
        this.title = "五大服务大数据统计分析————服务记录";
        break;
      case "3":
        // this.columns = this.columns1
        this.path = "HomeDistribution";
        break;
      case "4":
        // this.columns = this.columns1
        this.path = "olderDistribution";
        this.title = "河西区居家养老服务管理平台————服务记录";
        break;
      case "5":
        // this.columns = this.columns1
        this.path = "olderDistribution";
        this.title = "服务载体运营情况统计分析————服务记录";
        break;
      default:
        // this.columns = this.columns1
        this.path = "buffetPage";
        this.title = "助餐服务监管大数据统计分析————助餐记录";
        break;
    }
  },

  methods: {
    getOtherPageList(userName, roleid) {
      this.companyLists = [];
      api
        .getOtherPageList({
          page: 1,
          pageSize: 12,
          companyName: userName,
          roleId: roleid
        })
        .then(res => {
          if (res.obj) {
            res.obj.records.map(item =>
              this.companyLists.push(item.companyName)
            );
            this.formData.companyName =
              this.companyLists.length > 1 ? "" : this.companyLists[0];
            this.handleGetSearchValue();
          }
        });
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
      this.formData.payTimeStart = this.payTime
        ? formatTime(this.payTime[0])
        : "";
      this.formData.payTimeEnd = this.payTime
        ? formatTime(this.payTime[1])
        : "";
      this.formData.mealTimeStart = this.mealTime
        ? formatTime(this.mealTime[0])
        : "";
      this.formData.mealTimeEnd = this.mealTime
        ? formatTime(this.mealTime[1])
        : "";
      this.formData.orderFrom =
        this.orderFroms.length > 0 ? this.orderFroms.join(",") : "";
      this.formData.orderStatus =
        this.allStatus.length > 0 ? this.allStatus.join(",") : "";
      this.formData.canteenlevel =
        this.serviceLevel.length > 0 ? this.serviceLevel.join(",") : "";
      this.$route.query.allowanceMoneyZero
        ? (this.formData.allowanceMoneyZero = "1")
        : (this.formData.allowanceMoneyZero = "");
      this.isSearchLoading = true;
      api
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
        });
      let params = this.requestParams(page);
      delete params.page;
      delete params.pageSize;
      api.getFoodeOrderPage(params).then(res => {
        this.copies = parseInt(res.data.foodNumTotal);
      });
    },

    // 重置表单
    clearSearchValue() {
      this.formData = Object.assign({}, this.formData, {
        merchantName: "",
        orderName: "",
        orderPhone: "",
        orderCard: "",
        payOrderNo: "",
        orderPersonType: "",
        payStyle: "",
        zoneCode: "",
        streetCode: "",
        communityCode: "",
        payTimeStart: "",
        payTimeEnd: "",
        mealTimeStart: "",
        mealTimeEnd: "",
        mealStyle: "",
        orderFrom: "",
        mealType: "",
        requirementBig: "",
        canteenlevel: "",
        companyName: ""
      });
      this.searchService = "";
      this.selectedLocation = [];
      this.mealTime = "";
      this.payTime = "";
      this.allStatus = [];
      this.serviceLevel = [];
      this.orderFroms = [];
    },

    // 2022年01日06日 服务类型 变化
    handleTypeChange(val) {
      this.selectedType = val;
      this.getContentData();
    },

    getContentData() {
      let params = {
        name: this.selectedType
      };
      api.getDictList(params).then(res => {
        if (res) {
          this.contentList = res;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.total_num {
  font-size: 0.18rem;
  color: #05e6ff;
  height: 0.5rem;
  line-height: 0.5rem;
  p {
    display: inline-block;
    margin-left: 0.6rem;
  }
}
</style>
