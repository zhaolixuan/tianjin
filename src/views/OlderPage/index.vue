<template>
  <div>
    <div class="older_box">
      <vue-scroll :ops="ops">
        <div class="nav_btn" @click="openDialog"></div>
        <el-dialog
          :fullscreen="fullscreen"
          :visible.sync="$store.state.navDialogVisible"
        >
          <Navigation></Navigation>
        </el-dialog>
        <page-header></page-header>
        <bread-crumb :crumbData="crumbData"></bread-crumb>
        <div class="search_head">
          <div class="head_box">
            <el-form :inline="true" :model="formData">
              <el-form-item label="性别" class="search_select">
                <el-select
                  v-model="formData.sex"
                  clearable
                  placeholder="请选择性别"
                >
                  <el-option label="男性" value="1"></el-option>
                  <el-option label="女性" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年龄段" class="search_select">
                <el-input
                  class="input_num"
                  placeholder="起始年龄"
                  v-model="formData.startAge"
                  @change="handleChangeStartAge"
                />
                <span>-</span>
                <el-input
                  class="input_num"
                  placeholder="截止年龄"
                  v-model="formData.endAge"
                  @change="handleChangeEndAge"
                />
              </el-form-item>
              <!-- <el-form-item label="出生日期" class="search_select">
              <el-date-picker
                v-model="formData.birthday"
                type="date"
                value-format="yyyyMMdd"
                placeholder="选择出生日期">
              </el-date-picker>
            </el-form-item>-->
              <el-form-item label="出生日期" class="search_select">
                <el-select
                  v-model="birthdayMonth"
                  clearable
                  placeholder="月份"
                  class="input_num"
                  @change="handleChangeMonth"
                >
                  <template v-for="i in 12">
                    <el-option
                      :label="i"
                      :value="i < 9 ? '0' + i : i"
                      :key="'month_' + i"
                    ></el-option>
                  </template>
                </el-select>
                <span>-</span>
                <el-select
                  v-model="birthdayDay"
                  clearable
                  placeholder="日期"
                  class="input_num"
                  @change="handleChangeDay"
                >
                  <template v-for="i in monthLength">
                    <el-option
                      :label="i"
                      :value="i < 9 ? '0' + i : i"
                      :key="'day_' + i"
                    ></el-option>
                  </template>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="类别" class="search_select">
              <el-select v-model="formData.type" clearable collapse-tags multiple placeholder="请选择类别">
                <el-option label="残疾人" value="1"></el-option>
                <el-option label="党员" value="2"></el-option>
                <el-option label="低保" value="3"></el-option>
                <el-option label="失独" value="4"></el-option>
                <el-option label="特种病" value="5"></el-option>
                <el-option label="肇事肇祸" value="6"></el-option>
              </el-select>
            </el-form-item>-->
              <el-form-item label="是否独居" class="search_select">
                <el-select
                  v-model="formData.isLone"
                  clearable
                  placeholder="请选择是否独居"
                >
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="是否失独" class="search_select">
              <el-select v-model="formData.isLiveAlone" clearable placeholder="请选择是否失独">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item> -->
              <el-form-item label="是否有社保" class="search_select">
                <el-select
                  v-model="formData.haveShebao"
                  clearable
                  placeholder="请选择是否有社保"
                >
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="健康档案" class="search_select">
                <el-select
                  v-model="formData.haveWeijian"
                  clearable
                  placeholder="请选择是否有健康档案"
                >
                  <el-option label="有" value="1"></el-option>
                  <el-option label="无" value="0"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="是否困难" class="search_select">
              <el-select v-model="formData.isHardpeople" clearable placeholder="请选择是否困难">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>-->
              <!-- <el-form-item label="教育程度" class="search_select">
              <el-select
                v-model="formData.education"
                clearable
                collapse-tags
                multiple
                placeholder="请选择教育程度"
              >
                <el-option label="不认识字" value="1"></el-option>
                <el-option label="小学" value="2"></el-option>
                <el-option label="初中" value="3"></el-option>
                <el-option label="高中/中专" value="4"></el-option>
                <el-option label="大专及以上" value="5"></el-option>
              </el-select>
            </el-form-item> -->
              <el-form-item label="身体状况" class="search_select">
                <el-select
                  v-model="formData.personbody"
                  clearable
                  collapse-tags
                  multiple
                  placeholder="请选择身体状况"
                >
                  <el-option label="完全自理" value="1"></el-option>
                  <el-option label="半失能" value="2"></el-option>
                  <el-option label="失能" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否残疾" class="search_select">
                <el-select
                  v-model="formData.isDisabled"
                  clearable
                  collapse-tags
                  placeholder="请选择是否残疾"
                >
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="养老待遇" class="search_select">
                <el-input
                  class="input_num"
                  placeholder="起始金额"
                  v-model="formData.startMonthlyIncomeShe"
                  @change="handleChangeStartIncome"
                />
                <span>-</span>
                <el-input
                  class="input_num"
                  placeholder="截止金额"
                  v-model="formData.endMonthlyIncomeShe"
                  @change="handleChangeEndIncome"
                />
              </el-form-item>
              <!-- <el-form-item label="调查月收入" class="search_select">
                <el-select
                  v-model="formData.monthlyIncome"
                  clearable
                  collapse-tags
                  multiple
                  placeholder="请选择调查月收入"
                >
                  <el-option label="无收入" value="1"></el-option>
                  <el-option label="1000元以下" value="2"></el-option>
                  <el-option label="1001-2000元" value="3"></el-option>
                  <el-option label="2001-3000元" value="4"></el-option>
                  <el-option label="3001-4000元" value="5"></el-option>
                  <el-option label="4001-5000元" value="6"></el-option>
                  <el-option label="5000元以上" value="7"></el-option>
                </el-select>
              </el-form-item> -->
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
              <el-form-item label="关键词" class="search_select">
                <el-input
                  class="head_left"
                  placeholder="姓名/身份证/联系方式"
                  v-model.trim="searchValue"
                  clearable
                  @keyup.enter.native="getSearchValue"
                >
                  <!-- <el-button slot="append" icon="el-icon-search" @click="getSearchValue"></el-button> -->
                </el-input>
              </el-form-item>
              <el-form-item label="领取补贴" class="search_select">
                <el-select
                  v-model="formData.isSubsidy"
                  clearable
                  placeholder="请选择是否领取补贴"
                >
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="补贴类别" class="search_select">
                <el-select
                  v-model="formData.allowanceType"
                  clearable
                  placeholder="请选择级别"
                >
                  <el-option
                    v-for="(option, index) in optionLIstanbul"
                    :key="index"
                    :label="option"
                    :value="option"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="一键通设备" class="search_select">
                <el-select
                  v-model="formData.deviceFlag"
                  clearable
                  placeholder="请选择"
                >
                  <el-option label="全部" value=""></el-option>
                  <el-option label="已安装" value="1"></el-option>
                  <el-option label="未安装" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否退役军人" class="search_select">
                <el-select
                  v-model="formData.isExserviceman"
                  clearable
                  placeholder="请选择"
                >
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="养老方式" class="search_select">
                <el-select
                  v-model="formData.isOldage"
                  clearable
                  placeholder="请选择"
                >
                  <el-option label="机构" value="1"></el-option>
                  <el-option label="居家" value="0"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="是否常驻河西" class="search_select">
              <el-select v-model="formData.isLivinghx" clearable placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item> -->
              <el-form-item label="疫苗接种情况" class="search_select">
                <el-select
                  v-model="formData.vaccinesDetail"
                  clearable
                  placeholder="请选择"
                >
                  <!-- <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option> -->
                  <el-option
                    label="两针及康希诺接种已完成"
                    value="两针及康希诺接种已完成"
                  ></el-option>
                  <el-option
                    label="两针及康希诺接种已完成且已完成加强针接种"
                    value="两针及康希诺接种已完成且已完成加强针接种"
                  ></el-option>
                  <el-option label="首针已接种" value="首针已接种"></el-option>
                  <el-option label="未接种" value="未接种"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否户籍河西" class="search_select">
                <el-select
                  v-model="formData.isHousehx"
                  clearable
                  placeholder="请选择"
                >
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="是否开卡" class="search_select">
              <el-select v-model="formData.isOpened" clearable placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item> -->
              <!-- 2021年12月15日新增 是否接口疫苗 -->
              <!-- <el-form-item label="是否接种疫苗" class="search_select">
              <el-select v-model="formData.isVaccination" clearable placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item> -->
              <!-- 12月21日 新增需求 是否接种疫苗和是否常驻河西交换位置 -->
              <el-form-item label="是否常驻河西" class="search_select">
                <el-select
                  v-model="formData.isLivinghx"
                  clearable
                  placeholder="请选择"
                >
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" class="search_select">
                <el-select
                  v-model="formData.deathType"
                  clearable
                  placeholder="请选择"
                >
                  <el-option label="正常" value="0"></el-option>
                  <el-option label="死亡" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="btns_box">
              <div class="btns_right">
                <el-button @click="clearSearchValue" class="btn"
                  >重置</el-button
                >
                <el-button
                  icon="el-icon-search"
                  class="btn"
                  :loading="getDataLoading"
                  @click="getSearchValue"
                  >查询</el-button
                >
              </div>
            </div>
          </div>
        </div>
        <div class="table_box">
          <el-table :data="tableData" stripe @row-click="handleClickRow">
            <el-table-column
              v-for="(item, index) in columns"
              :key="index"
              align="center"
              :show-overflow-tooltip="true"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
            >
              <template slot-scope="scope">
                <span v-if="['状态'].includes(item.label)">{{
                  dyType(scope.row[item.prop])
                }}</span>
                <span v-else>{{
                  item.label == "序号"
                    ? scope.$index + (currentPage - 1) * pageSize + 1
                    : scope.row[item.prop] === "NULL"
                    ? ""
                    : scope.row[item.prop]
                }}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="table_page">
            <!-- 12月21日 需求 先注释掉 共计 -->
            <!-- <span class="total_num">共计 {{total}} 人</span> -->
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="handleChangePage"
              :current-page="currentPage"
              :page-size="pageSize"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </vue-scroll>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import api from "@/api/api";
import Header from "@/components/Header/index";
import PageHeader from "../ProvideAged/components/PageHeader/index.vue";
import BreadCrumb from "@/components/BreadCrumb/index";
import Navigation from "@/components/Navigation/index";
import Menu from "@/views/OlderDistribution/components/Menu/index";

export default {
  data() {
    return {
      getDataLoading: false,
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
      crumbData: [
        {
          title: "老年人口库",
          url: ""
        }
      ],
      soldier: "",
      fullscreen: true,
      searchValue: "",
      columns: [
        {
          prop: "index",
          label: "序号"
        },
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "sex",
          label: "性别"
        },
        {
          prop: "age",
          label: "年龄"
        },
        {
          prop: "nation",
          label: "民族"
        },
        {
          prop: "idcardNumber",
          label: "身份证号"
        },
        {
          prop: "phone",
          label: "联系方式"
        },
        {
          prop: "streetName",
          label: "居住街道"
        },
        {
          prop: "communityName",
          label: "居住社区"
        },
        {
          prop: "livingAddress",
          label: "居住地址"
        },
        {
          prop: "isHousehx",
          label: "是否户籍"
        },
        {
          prop: "isOnlyHouse",
          label: "是否独居"
        },
        {
          prop: "haveShebao",
          label: "是否有社保"
        },
        {
          prop: "isSubsidy",
          label: "是否领取补贴"
        },
        {
          prop: "vaccinesDetail",
          label: "疫苗接种情况"
        },
        {
          prop: "deathType",
          label: "状态"
        }
      ],
      tableData: [],
      optionLIstanbul: [],
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
      birthdayMonth: this.$route.query.birthday
        ? this.$route.query.birthday.slice(4, 6)
        : "", // 出生月份
      birthdayDay: this.$route.query.birthday
        ? this.$route.query.birthday.slice(6)
        : "", // 出生日期
      formData: {
        isLivinghx: "",
        isHousehx: "",
        isOpened: "",
        sex: this.$route.query.sex ? this.$route.query.sex : "",
        deviceFlag: "",
        isOldage: "",
        isExserviceman: "",
        // age: null,
        startAge: this.$route.query.startAge ? this.$route.query.startAge : "",
        endAge: this.$route.query.endAge ? this.$route.query.endAge : "",
        birthday: this.$route.query.birthday ? this.$route.query.birthday : "",
        education: this.$route.query.education
          ? [this.$route.query.education]
          : "",
        personbody: this.$route.query.personbody
          ? [this.$route.query.personbody]
          : "",
        isDisabled: this.$route.query.isDisabled || "",
        // monthlyIncome: this.$route.query.monthlyIncome
        //   ? [this.$route.query.monthlyIncome]
        //   : "",
        allowanceType: null,
        startMonthlyIncomeShe: null,
        isSubsidy: null,
        endMonthlyIncomeShe: this.$route.query.endMonthlyIncomeShe
          ? this.$route.query.endMonthlyIncomeShe
          : null,
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
        isLone: this.$route.query.isLone ? this.$route.query.isLone : null,
        isLiveAlone: this.$route.query.isLiveAlone
          ? this.$route.query.isLiveAlone
          : null,
        haveWeijian: this.$route.query.haveWeijian
          ? this.$route.query.haveWeijian
          : null,
        haveShebao: this.$route.query.haveShebao || null,
        isHardpeople: null,
        isVaccination: "",
        vaccinesDetail: "",
        deathType: "0"
      },
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页数
      total: 0 // 总条数
    };
  },
  computed: {
    monthLength() {
      if (this.birthdayMonth == 2) {
        return 28;
      } else {
        return 31;
      }
    }
  },
  created() {
    this.$store.commit("setActiveName", "老年人口库");
    this.$store
      .dispatch("getUserAuthInfo")
      .then(() => {
        this.getLocation();
        this.getOlderData();
      })
      .catch(() => {
        console.log("获取用户权限失败");
      });
    this.getOptionLIstanbulData();
  },
  methods: {
    dyType(e) {
      let name;
      switch (e) {
        case "0":
          name = "正常";
          break;
        case "1":
          name = "死亡";
          break;
        default:
          break;
      }
      return name;
    },
    getOptionLIstanbulData() {
      api.findAllowanceTypeList().then(res => {
        res.data.forEach(i => {
          if (i) {
            this.optionLIstanbul.push(i);
          }
        });
      });
    },
    handleChangeMonth(value) {
      let day = this.birthdayDay || "";
      let month = value || "";
      this.formData.birthday =
        day && month ? `${new Date().getFullYear()}` + month + day : "";
    },
    handleChangeDay(value) {
      let day = value || "";
      let month = this.birthdayMonth || "";
      this.formData.birthday =
        day && month ? `${new Date().getFullYear()}` + month + day : "";
    },
    handleChangeStartAge(value) {
      this.formData.startAge = isNaN(parseInt(value)) ? "" : parseInt(value);
    },
    handleChangeEndAge(value) {
      this.formData.endAge = isNaN(parseInt(value)) ? "" : parseInt(value);
    },
    handleChangeStartIncome(value) {
      this.formData.startMonthlyIncomeShe = isNaN(parseInt(value))
        ? ""
        : parseInt(value);
    },
    handleChangeEndIncome(value) {
      this.formData.endMonthlyIncomeShe = isNaN(parseInt(value))
        ? ""
        : parseInt(value);
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

    getOlderData() {
      let zoneDefaultCode =
        this.$store.state.userType == "2" ? this.$store.state.code[0] : "";
      let streetDefaultCode =
        this.$store.state.userType == "3" ? this.$store.state.code[0] : "";
      let communityDefaultCode =
        this.$store.state.userType == "4" ? this.$store.state.code[0] : "";
      var params = {
        condition: this.searchValue,
        isLivinghx: this.formData.isLivinghx,
        isHousehx: this.formData.isHousehx,
        isOpened: this.formData.isOpened,
        sex: this.formData.sex || "",
        // age:
        //   this.formData.age && this.formData.age.length > 0
        //     ? this.formData.age.join(",")
        //     : "",
        startAge: this.formData.startAge || "",
        endAge: this.formData.endAge || "",
        birthday: this.formData.birthday || "",
        deviceFlag: this.formData.deviceFlag || "",
        // education:
        //   this.formData.education && this.formData.education.length > 0
        //     ? this.formData.education.join(',')
        //     : '',
        personbody:
          this.formData.personbody && this.formData.personbody.length > 0
            ? this.formData.personbody.join(",")
            : "",
        isDisabled: this.formData.isDisabled,
        // monthlyIncome:
        //   this.formData.monthlyIncome && this.formData.monthlyIncome.length > 0
        //     ? this.formData.monthlyIncome.join(",")
        //     : "",
        // monthlyIncomeShe: this.formData.monthlyIncomeShe || "",
        startMonthlyIncomeShe: this.formData.startMonthlyIncomeShe || "",
        endMonthlyIncomeShe: this.formData.endMonthlyIncomeShe || "",
        zoneCode: this.formData.zoneCode || zoneDefaultCode,
        streetCode: this.formData.streetCode || streetDefaultCode,
        communityCode: this.formData.communityCode || communityDefaultCode,
        isLone: this.formData.isLone,
        isHaveWeijian: this.formData.haveWeijian || "",
        isHaveShebao: this.formData.haveShebao || "",
        // isLiveAlone: this.formData.isLiveAlone || '',
        isHardpeople: this.formData.isHardpeople || "",
        isSubsidy: this.formData.isSubsidy || "",
        allowanceType: this.formData.allowanceType || "",
        isOldage: this.formData.isOldage || "",
        isExserviceman: this.formData.isExserviceman || "",
        vaccinationState: this.formData.isVaccination || "",
        vaccinesDetail : this.formData.vaccinesDetail||"",
        page: this.currentPage,
        pageSize: this.pageSize,
        deathType: this.formData.deathType
      };
      this.getDataLoading = true;
      // console.log(params.isLivinghx); // 1 参数有值  netWork中对应接口请求该字段有值
      // console.log(params.isHousehx);// 1 参数有值  netWork中对应接口请求该字段有值
      api
        .getOlderData(params)
        .then(res => {
          this.getDataLoading = false;
          var data = res.obj;
          this.tableData = this.getTableData(data.records);
          this.currentPage = data.current;
          this.pageSize = data.size;
          this.total = data.total;
          console.log(this.tableData);
        })
        .catch(() => {
          this.getDataLoading = false;
          console.log("查询老年人口库列表数据失败");
        });
    },
    // 获取table列表数据
    getTableData(data) {
      //   let monthlyIncomeTable = this.$store.state.olderStore.monthlyIncome;
      let isOnlyHouseTable = this.$store.state.olderStore.isOnlyHouse;
      let personbodyTable = this.$store.state.olderStore.personbody;
      let isPovertyTable = this.$store.state.olderStore.isPoverty;
      let isLiveAloneTable = this.$store.state.olderStore.isLiveAlone;
      let haveSheBaoTable = this.$store.state.olderStore.haveShebao;
      let haveWeijianTable = this.$store.state.olderStore.haveWeijian;
      let isSubsidyTable = this.$store.state.olderStore.isSubsidy;
      let isHousehxTable = this.$store.state.olderStore.isHousehx;
      let result = data.map((item, index) => {
        return {
          ...item,
          isHousehx: item.isHousehx ? isHousehxTable[item.isHousehx] : "",
          //   monthlyIncome: item.monthlyIncome
          //     ? monthlyIncomeTable[item.monthlyIncome]
          //     : "",
          isOnlyHouse: item.isOnlyHouse
            ? isOnlyHouseTable[item.isOnlyHouse]
            : "",
          personbody: item.personbody ? personbodyTable[item.personbody] : "",
          isPoverty: item.isPoverty ? isPovertyTable[item.isPoverty] : "",
          isLiveAlone: item.isLiveAlone
            ? isLiveAloneTable[item.isLiveAlone]
            : "",
          haveShebao: item.haveShebao ? haveSheBaoTable[item.haveShebao] : "",
          isSubsidy: item.isSubsidy ? isSubsidyTable[item.isSubsidy] : "",
          haveWeijian: item.haveWeijian
            ? haveWeijianTable[item.haveWeijian]
            : "",
          vaccinationState:
            item.vaccinationState == "" || item.vaccinationState == "0"
              ? "未接种"
              : "已接种"
        };
      });
      return result;
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
        sex: null,
        // age: null,
        startAge: "",
        endAge: "",
        birthday: "",
        education: null,
        personbody: null,
        // monthlyIncome: null,
        startMonthlyIncomeShe: null,
        endMonthlyIncomeShe: null,
        zoneCode: null,
        streetCode: null,
        communityCode: null,
        isLone: null,
        isLiveAlone: null,
        haveWeijian: null,
        haveShebao: null,
        isHardpeople: null,
        isallowance: null,
        allowanceType: null,
        isSubsidy: null,
        isLivinghx: null,
        isHousehx: null,
        isOpened: null,
        deathType: ""
      };
      this.searchValue = "";
      this.selectedLocation = [];
      this.birthdayMonth = "";
      this.birthdayDay = "";
    },
    handleChangePage(page) {
      this.currentPage = page;
      this.getOlderData();
    },
    handleClickRow(row) {
     this.$router.push({
        path: "/olderPicture",
        query: { idCard: row.idcardNumber }
      });

    }
  },
  components: {
    Header,
    PageHeader,
    BreadCrumb,
    Navigation,
    Menu
  }
};
</script>

<style>
.older_box {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/big_project_bg.gif") 50% 100% no-repeat;
  background-size: cover;
  overflow: auto;
}
.search_head {
  padding: 0 0.5rem;
  /* padding-left: 1rem; */
  /* margin-top: 0.2rem; */
  margin-bottom: 0.1rem;
}
.search_head .head_box {
  width: 100%;
  overflow: hidden;
  position: relative;
  /* margin-bottom: 0.1rem; */
}
.search_head .head_box .el-form {
  width: 100%;
  float: left;
}
.search_select {
  /* border: 2px solid #7dbaf9;
  box-shadow: 0px 0px 0.08rem 0.04rem rgba(39, 145, 248, 0.5);
  border-radius: 4px; */
  margin: 0.1rem 0.3rem;
  color: #a5dcff;
  /* width: 3.5rem; */
}
.search_select .el-form-item__label {
  font-size: 0.19rem;
  color: #a5dcff;
  width: 1.3rem;
  float: left;
}
.el-form-item__content {
  float: left;
}
.el-form--inline {
  /* float: left; */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-left: 5px;
}
.el-form-item {
  width: 3.6rem;
  margin-left: 5px;
}
.input_num {
  width: 1rem;
}
/* .el-form--inline .el-form-item {
  margin-right: 0.3rem;
  margin-bottom: 0.1rem;
} */
/* .input_select .el-form-item__content {
  width: 215px;
  margin-right: 0;
}
.small_select .el-form-item__content {
  min-width: 180px;
  width: 2rem;
}
.mini_select .el-form-item__content {
  width: 1.4rem;
} */
.btns_box {
  /* position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%); */
  width: 100%;
}
.btns_right {
  float: right;
}
.btns_box .btn {
  padding: 0.15rem 0.5rem;
  background-color: #0e3a8d;
  text-align: center;
  border: 0;
  color: #87b7eb;
  margin-right: 0.1rem;
  /* margin-top: 2rem; */
  float: left;
}
.btns_box .btn:focus,
.btns_box .btn:hover {
  background-color: #0e3a8d;
  border: 0;
  color: #87b7eb;
}

/* .search_head .head_left {
  margin-right: 0.3rem;
} */
.search_head .head_left,
.search_head .head_right {
  float: left;
}
.el-input__inner {
  background-color: transparent;
  font-size: 0.17rem;
  border: 0;
  border-bottom: 0.01rem solid #043a6f;
  color: #56a4f7;
  max-width: 2.15rem;
  padding-left: 0.13rem;
  padding-right: 0;
}
.el-select .el-input .el-select__caret {
  font-size: 0.18rem;
}
.el-input__inner::-webkit-input-placeholder {
  color: #436fd2;
}
.el-input__inner:hover,
.el-select:hover .el-input__inner,
.el-cascader .el-input:hover .el-input__inner {
  border-color: #043a6f;
}
.el-input-group__append,
.el-input-group__prepend {
  background-color: #2e5096;
  border: 0;
  color: #87b7eb;
}
.head_left.el-input .el-input__clear,
.head_left.el-input .el-input__clear:hover {
  color: #409eff;
}
.el-radio-button__inner {
  color: #8fc0f3;
  background-color: transparent;
  border: 0;
  border-right: 0.01rem solid #8fc0f3;
  padding: 0.02rem 0.2rem;
  margin: 0.1rem 0;
}
.el-radio-button:first-child .el-radio-button__inner {
  border-left: 0;
  border-right: 0.01rem solid #8fc0f3;
}
.el-radio-button:last-child .el-radio-button__inner {
  border-right: 0;
}
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: transparent;
  color: #436fd2;
}
.table_box {
  padding: 0 0.5rem;
  position: relative;
}
.el-table {
  color: #a5dcff;
  background: transparent;
}
/* .el-table__body-wrapper{
  height: 9rem;
  overflow: auto;
} */
.el-table::before {
  height: 0;
}
.el-table thead {
  color: #eee;
  background-color: #05173d;
}
.el-table th,
.el-table tr {
  background-color: transparent;
}
.el-table__row {
  cursor: pointer;
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: rgba(255, 255, 255, 0.1);
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(255, 255, 255, 0.2);
}
.el-table td,
.el-table th {
  padding: 0.15rem 0;
}
.el-table td,
.el-table th.is-leaf {
  border: 0;
}
.table_page {
  position: absolute;
  right: 1rem;
  bottom: -1.2rem;
}
.table_page .el-pagination {
  float: left;
  height: 0.3rem;
}
.table_page .total_num {
  float: left;
  font-size: 0.2rem;
  color: #56a4f7;
  line-height: 0.34rem;
  margin-right: 0.2rem;
  font-weight: 600;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: transparent;
  color: #416fc4;
}
.el-pagination.is-background .btn-next.disabled,
.el-pagination.is-background .btn-next:disabled,
.el-pagination.is-background .btn-prev.disabled,
.el-pagination.is-background .btn-prev:disabled,
.el-pagination.is-background .el-pager li.disabled {
  color: #416fc4;
}
.el-select .el-input .el-select__caret,
.el-cascader .el-input .el-icon-arrow-down {
  color: #409eff;
}
.el-cascader-node.is-selectable.in-active-path {
  color: #409eff;
}
.el-select-dropdown,
.el-picker-panel,
.el-cascader__dropdown {
  background-color: #032995;
  border: 0;
}
.el-popper[x-placement^="bottom"] .popper__arrow,
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #032995;
}
.el-date-picker__header--bordered {
  border-bottom: 1px solid #436fd2;
}
.el-date-table th {
  color: #436fd2;
  border-bottom: 1px solid #436fd2;
}
.el-date-table td.next-month,
.el-date-table td.prev-month {
  color: #436fd2;
}
.el-select-dropdown__item,
.el-date-picker__header-label,
.el-date-table td,
.el-month-table td .cell,
.el-year-table td .cell,
.el-picker-panel__icon-btn {
  color: #8fc0f3;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.el-cascader-menu {
  color: #436fd2;
  border-right: 1px solid #436fd2;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  background-color: #032995;
  color: #409eff;
  font-weight: 700;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover,
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover,
.el-cascader-node:not(.is-disabled):focus,
.el-cascader-node:not(.is-disabled):hover {
  background-color: #0148cb;
  color: #8fc0f3;
}
.el-tag.el-tag--info {
  background-color: #0e3a8d;
  border: 0;
  color: #8fc0f3;
}
.el-tag.el-tag--info .el-tag__close {
  background-color: #3b6fd1;
  color: #8fc0f3;
}
.el-tag.el-tag--info .el-tag__close:hover {
  background-color: #3b6fd1;
  color: #8fc0f3;
}
</style>
