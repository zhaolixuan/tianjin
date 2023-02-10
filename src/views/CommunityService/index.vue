<template>
  <list-layout
    :crumbData="[{ title: this.$route.query.label, url: '' }]"
    :columns="scope === '1' ? allColumns : columns"
    :tableData="streeDataAll"
    unit="个"
    :pageSize="pageSize"
    header="街道社区服务率排名"
    :currentPage="currentPage"
    v-on:getSearchValue="handleGetSearchValue"
    backPath="FiveService"
    :objectSpanMethod="scope === '1' ? objectSpanMethod : () => {}"
    title="五大服务类别数据综合分析————街道社区服务率排名"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="起始时间：" class="search_select search_time">
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
      <el-form-item label="街道" class="search_select">
        <el-select
          v-model="formData.streetCode"
          clearable
          :disabled="disabled"
          placeholder="请选择街道"
        >
          <el-option
            v-for="(option, index) in streetData"
            :key="index"
            :label="option.name"
            :value="option.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="社区" class="search_select">
        <el-select
          v-model="formData.communityCode"
          clearable
          :disabled="disabledCom"
          placeholder="请选择社区"
        >
          <el-option
            v-for="(option, index) in communityDatas"
            :key="index"
            :label="option.name"
            :value="option.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="范围" class="search_select">
        <el-select v-model="scope" clearable placeholder="请选择范围">
          <el-option label="全部" value="1"></el-option>
          <el-option label="街道" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄区间段" class="search_select">
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
    <Menu></Menu>
  </list-layout>
</template>

<script
  for="softphonecontrol"
  event="OnLogRingUp(param1，param2)"
  language="javascript"
>
alert("param1:" + param1 + " " + "param2:" + param2);
</script>

<script>
import { mapGetters } from "vuex";
import api from "@/api/api.js";
import ListLayout from "@/components/TablerList/layout.vue";
import Menu from "@/views/OlderDistribution/components/Menu";

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
      allColumns: [
        { label: "排名", prop: "ranking" },
        { label: "街道", prop: "name", min: 170 },
        { label: "社区", prop: "communityName", min: 120 },
        { label: "老年人口数", prop: "peopleTotal", min: 120 },
        { label: "享受服务老年人口数", prop: "orderPeopleTotal", min: 120 },
        // { label: '服务量（客次）', prop: 'serviceTotal', min: 120 },
        { label: "服务率", prop: "serviceRate", min: 120 }
      ],
      columns: [
        { label: "排名", prop: "ranking" },
        { label: "街道", prop: "name", min: 170 },
        { label: "老年人口数", prop: "peopleTotal", min: 120 },
        { label: "享受服务老年人口数", prop: "orderPeopleTotal", min: 120 },
        { label: "服务率", prop: "serviceRate", min: 120 }
      ],
      streetDatas: [],
      tableData: [],
      streetData: [],
      communityData: [],
      communityDatas: [],
      fullscreen: true,
      index: 1,
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页数
      scope: "1",
      formData: {
        beginDay: new Date(),
        endDay: new Date(),
        streetCode: "",
        communityCode: "",
        beginEge: "",
        endEge: ""
      },
      params: {},
      spanArr: [],
      rowArr: [],
      position: 0,
      colArr: [],

      disabled: false,
      disabledCom: false,
      streetCode: "",
      totalFormDataBeforeReset: {}
    };
  },

  computed: {
    ...mapGetters(["userType", "code", "typeNew", "codeNew", "type"]),
    /**
     * scope 1 列表展示全部数据
     * scope 2 列表只展示街道合计数据
     */
    streeDataAll() {
      if (this.scope === "2") {
        let data = this.streetDatas.filter(item =>
          item.name
            ? item.name.indexOf("合计") !== -1 ||
              item.name.indexOf("总计") !== -1
            : item
        );
        return data;
      } else {
        return this.streetDatas;
      }
    },

    paramss() {
      let params = {};
      const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0];
      return params; // 如果街道账号登录 返回的是街道的账号 但是社区账号登录 返回的 没有街道账号
    }
  },

  watch: {
    "formData.streetCode": {
      handler() {
        this.getCommunityInfo();
      }
    },
    tableData() {
      this.rowspan();
    }
  },

  created() {
    this.$store
      .dispatch("getUserAuthInfo")
      .then(() => {
        this.streetCode = this.code[1];
        this.handleGetSearchValue();
        this.getStreet();
      })
      .catch(err => {
        console.log("获取用户权限失败", err);
      });

    console.log(this.code);
    // hexi ["120103000000", "120100000000"]  柳林街道(街道) ["120103011001", "120103011000"]  陈塘庄街道微山里社区(社区) ["120103011001", "120103011000"]
    console.log(this.paramss);
    // hexi { code: "120103000000" }  柳林街道(街道)  { code: '' } 陈塘庄街道微山里社区(社区) { code: '' }
  },

  methods: {
    handleGetSearchValue(page) {
      this.isSearchLoading = true;

      if (this.type == "1") {
        let streetCode = {
          code: ""
        };
        this.streetCodeObj = streetCode;
      } else if (this.type == "3") {
        let streetCode = {
          streetCode: this.code[1],
          code: ""
        };
        this.streetCodeObj = streetCode;
      } else {
        let streetCode = {
          streetCode: this.streetCode,
          communityCode: this.code[0]
        };
        this.streetCodeObj = streetCode;
      }

      api
        .getCommunityServiceInfo(
          Object.assign(this.formData, this.streetCodeObj, this.paramss)
        )
        .then(res => {
          console.log(this.formData);
          this.totalFormDataBeforeReset = this.formData;
          console.log(this.paramss);
          console.log(this.streetCodeObj);

          this.isSearchLoading = false;

          if (this.type == "1") {
            this.disabled = false;
            this.disabledCom = false;
          } else if (this.type == "3") {
            this.disabled = true;
            this.disabledCom = false;
          } else {
            this.disabled = true;
            this.disabledCom = true;
          }

          const {
            communityEatPeopleMap,
            communityEatPeopleAllMap,
            streetEatPeopleMap
          } = res && res.data;
          const {
            peopleTotal,
            orderPeopleTotal,
            serviceTotal,
            serviceRate
          } = communityEatPeopleAllMap[0];
          this.tableData = communityEatPeopleMap || [];
          this.streetDatas = streetEatPeopleMap.filter(
            item => item.streetName !== ""
          );
          // 统计社区的
          this.communityData = communityEatPeopleMap.filter(
            item => item.communityName !== ""
          );
          let allData = [];
          // 每个街道拼接 共计社区
          this.tableData.map(item => {
            allData = this.tableData.filter(
              ite => ite.streetName === item.streetName
            );
            // lenth-1 个 7月22日
            // item.name = item.streetName + '(共计' + (allData.length - 1) + '个社区)'
            // length 个  7月22日
            item.name = item.streetName + "(共计" + allData.length + "个社区)";
            item.serviceRate = item.serviceRate ? item.serviceRate : "0";
          });
          // this.streetDatas.map((item, index) => {
          //   item.ranking = index + 1
          //   item.serviceRate = item.serviceRate ? item.serviceRate + '%' : ''
          // })
          this.streetDatas.map((item, index) => {
            item.ranking = index + 1;
            item.serviceRate = item.serviceRate ? item.serviceRate + "%" : "0%";
            item.orderPeopleTotal = item.orderPeopleTotal
              ? item.orderPeopleTotal
              : "0";
          });
          // 新增的统计社区的
          this.communityData.map((item, index) => {
            item.ranking = index + 1;
            item.serviceRate = item.serviceRate ? item.serviceRate + "%" : "0%";
            item.orderPeopleTotal = item.orderPeopleTotal
              ? item.orderPeopleTotal
              : "0";
          });

          //  每个街道添加 街道总计数据
          this.streetDatas.map((item, index) => {
            item.name = item.streetName + "合计";
            let data = this.tableData.filter(
              ite => ite.streetName === item.streetName && ite.communityName
            );
            data.map(ran => {
              ran.ranking = index + 1;
            });
            let ind = this.streetDatas.findIndex(
              str => str.streetName === item.streetName
            );
            let start = this.streetDatas.slice(0, ind);
            let end = this.streetDatas.slice(ind);
            if (item.streetName === data[0].streetName) {
              start.push(...data);
              let datas = start.concat(end);
              this.streetDatas = datas;
            }
          });
          // 添加所有街道总计数据
          this.streetDatas.unshift({
            streetName: "总计",
            name: "总计",
            peopleTotal: peopleTotal || 0,
            orderPeopleTotal: orderPeopleTotal || 0,
            serviceTotal: serviceTotal || 0,
            serviceRate: (serviceRate || 0) + "%"
          });
          this.rowspan();
        })
        .catch(() => {
          this.isSearchLoading = false;
        });
    },

    // 获取街道数据
    getStreet() {
      api.getStreetInfo().then(res => {
        this.streetData = res || [];
      });
    },

    // 获取社区数据
    getCommunityInfo() {
      api.getCommunityInfo({ code: this.formData.streetCode }).then(res => {
        let communityData = [];
        res.forEach(item => {
          communityData.push({
            name: item.name,
            code: item.code
          });
        });
        this.communityDatas = communityData || [];
        this.communityData = communityData;
      });
    },

    // 重置
    clearSearchValue() {
      this.formData = Object.assign(
        {},
        this.formData,
        this.totalFormDataBeforeReset,
        {
          beginDay: "",
          endDay: "",
          // streetCode: "",
          communityCode: ""
        }
      );
    },

    getJkMonitor(serviceInfo) {
      var Shell = new ActiveXObject("WScript.Shell");
      try {
        // exe程序所在位置以及要传的参数
        var kk = "D:\\vlc\\vlc.exe";
        var aa = Shell.Run(kk, 1, false);
      } catch (e) {
        alert("该可执行文件不存在");
      }
    },

    // 计算合并表格每行数量
    rowspan() {
      this.spanArr = [];
      this.rowArr = [];
      this.streetDatas.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1);
          this.position = 0;
        } else {
          if (
            this.streetDatas[index].name === this.streetDatas[index - 1].name
          ) {
            this.spanArr[this.position] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.position = index;
          }
        }
      });
    },

    // 合并表格方法
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.name.indexOf("合计") !== -1) {
        const _row = [0, 2, 0, 1, 1, 1, 1];
        return {
          rowspan: 1,
          colspan: _row[columnIndex]
        };
      } else if (row.name.indexOf("总计") !== -1) {
        const _row = [0, 3, 0, 1, 1, 1, 1];
        return {
          rowspan: 1,
          colspan: _row[columnIndex]
        };
      }
      if (columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row + 1,
          colspan: _col
        };
      }
    }
  },
  components: {
    ListLayout,
    Menu
  }
};
</script>

<style lang="less" scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 1.6rem;
  margin-right: 0.2rem;
}

/deep/ .el-input.is-disabled .el-input__inner {
  color: #56a4f7;
}
</style>
