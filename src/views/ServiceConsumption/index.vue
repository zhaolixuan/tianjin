<template>
  <list-layout
    :columns="columns"
    :tableData="tableData"
    :pageSize="pageSize"
    header="服务载体老年人消费频率"
    :currentPage="currentPage"
    backPath="FiveService"
    title="五大服务类别数据综合分析———服务载体老年人消费频率"
    :attendanceSign="formData.attendanceSign"
    :attendNumber="attendNumber"
    :companyName="formData.companyName"
    :serviceDate="serviceDate"
    :attendanceRate="attendanceRate"
    :objectSpanMethod="objectSpanMethod"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="起始时间" class="search_select search_time">
        <el-date-picker
          v-model="formData.beginDay"
          type="date"
          :clearable="false"
          value-format="yyyy-MM-dd"
          placeholder="开始日期"
        >
        </el-date-picker>
        <el-date-picker
          v-model="formData.endDay"
          type="date"
          :clearable="false"
          value-format="yyyy-MM-dd"
          placeholder="截止日期"
        >
        </el-date-picker>
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
      <el-form-item label="服务商" class="search_select">
        <el-select
          v-model="formData.companyName"
          clearable
          :disabled="companyList.length === 1"
          placeholder="请选择服务商"
        >
          <el-option
            v-for="(option, index) in companyList"
            :key="index"
            :label="option"
            :value="option"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="载体所属街道" class="search_select">
        <el-select
          v-model="formData.streetCode"
          clearable
          :disabled="disabled"
          placeholder="请选择所属街道"
        >
          <el-option
            v-for="(option, index) in streetData"
            :key="index"
            :label="option.name"
            :value="option.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="老年人消费频率" class="search_select">
          <el-select
            v-model="attendanceRate"
            placeholder="请选择消费频率"
          >
            <el-option label="10%以上" value="10"></el-option>
            <el-option label="20%以上" value="20"></el-option>
            <el-option label="30%以上" value="30"></el-option>
            <el-option label="40%以上" value="40"></el-option>
            <el-option label="50%以上" value="50"></el-option>
            <el-option label="60%以上" value="60"></el-option>
            <el-option label="70%以上" value="70"></el-option>
            <el-option label="80%以上" value="80"></el-option>
            <el-option label="90%以上" value="90"></el-option>
            <el-option label="100%" value="100"></el-option>
          </el-select>
        </el-form-item> -->
      <!-- 6月8号修改为查询消费次数 -->
      <el-form-item label="查询消费次数" class="search_select">
        <el-input
          v-model="attendNumber"
          placeholder="请输入消费次数"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="btns_box">
      <div class="data_total">
        <span>服务老年人数：</span>{{ totalData.peopleTotal }}人
        <span>服务量：</span>{{ totalData.serviceTotal }}客次
        <span>老年人消费频率人数：</span>{{ totalData.peoTotal }}人
      </div>
      <div class="btns_right">
        <!-- <el-button @click="clearSearchValue" class="btn">重置</el-button> -->
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

<script>
import api from "@/api/api.js";
import { mapGetters } from "vuex";
import ListLayout from "@/components/TablerList/layout.vue";
import Menu from "@/views/OlderDistribution/components/Menu";
import { formatTime, getDaysBetween } from "@/utils/utils";
import dayjs from "dayjs";

export default {
  data() {
    return {
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页数
      isSearchLoading: false,
      columns: [
        { label: "序号 ", prop: "key", width: 100 },
        { label: "载体名称", prop: "merchantName", width: 400 },
        { label: "载体级别", prop: "canteenLevel", width: 150 },
        { label: "服务商", prop: "companyName" },
        { label: "服务老年人数（人）", prop: "peopleTotal", width: 200 },
        { label: "服务量（客次）", prop: "serviceTotal", width: 120 },
        { label: "老年人消费频率人数（人）", value: "peoTotal", width: 220 }
      ],
      streetData: [],
      attendanceRate: "10",
      formData: {
        beginDay: dayjs(new Date(new Date() - 1000 * 60 * 60 * 24 * 28)).format(
          "YYYY-MM-DD"
        ),
        endDay: dayjs(new Date()).format("YYYY-MM-DD"),
        companyName: "",
        streetCode: "",
        attendanceSign: "",
        canteenLevel: "",
        // 消费次数入参字段
        attendanceSign: "1"
      },
      // 初始化消费次数
      attendNumber: 1,
      serviceLevel: "",
      serviceDate: {},
      companyList: [],
      tableData: [],
      totalData: {},
      streetCode: "",
      disabled: false
    };
  },

  computed: {
    ...mapGetters(["useName", "type", "code", "typeNew", "codeNew"]),
    paramss() {
      let params = {};
      const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0];
      return params;
    }
  },

  watch: {
    useName(val) {
      this.getOtherPageList(this.useName, this.roleid);
    }
  },

  created() {
    // console.log(this.paramss);
    // console.log(this.code);
    this.roleid = window.localStorage.getItem("roleid");
    this.$store
      .dispatch("getUserAuthInfo")
      .then(() => {
        this.streetCode = this.code[1];
        this.getServiceConditionInfo();
      })
      .catch(err => {
        console.log("获取用户权限失败", err);
      });

    api.getStreetInfo().then(res => {
      if (res) {
        this.streetData = res;
      }
    });
    this.getOtherPageList(this.useName, this.roleid);
    this.formData.beginDay = formatTime(this.formData.beginDay);
    this.formData.endDay = formatTime(this.formData.endDay);
  },

  methods: {
    getOtherPageList(userName, roleid) {
      this.companyList = [];
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
              this.companyList.push(item.companyName)
            );
            this.formData.companyName =
              this.companyList.length > 1 ? "" : this.companyList[0];
          }
        });
    },

    getServiceConditionInfo() {
      this.isSearchLoading = true;
      this.formData.attendanceSign = String(
        getDaysBetween(this.formData.beginDay, this.formData.endDay) *
          (this.attendanceRate / 100)
      ).substring(0, 4);
      this.serviceDate = Object.assign(
        {},
        {
          attendanceSign: this.formData.attendanceSign,
          beginDay: this.formData.beginDay,
          endDay: this.formData.endDay
        }
      );
      this.formData.canteenLevel =
        this.serviceLevel && this.serviceLevel.join(",");

      this.formData.attendanceSign = this.attendNumber.toString();
      // console.log(this.formData.attendanceSign);

      if (this.type == "1") {
        let streetCode = {
          code: ""
        };
        this.streetCodeObj = streetCode;
      } else if (this.type == "3") {
        let streetCode = {
          streetCode: this.code[1],
          communityCode: ""
        };
        this.streetCodeObj = streetCode;
      } else {
        let streetCode = {
          streetCode: this.streetCode,
          communityCode: this.code[0]
        };
        this.streetCodeObj = streetCode;
      }
      // console.log(this.formData);

      api
        .getServiceConsumeInfo(
          Object.assign(this.formData, this.streetCodeObj, this.paramss)
        )
        .then(res => {
          if (res && res.code === 200 && res.data) {
            this.isSearchLoading = false;
            if (this.type == "1") {
              this.disabled = false;
            } else if (this.type == "3") {
              this.disabled = true;
            } else {
              this.disabled = true;
            }
            let {
              serviceConsumeAttendanceMap,
              serviceConsumeMap,
              allServiceConsumeMap,
              allServiceConsumeAttendanceMap
            } = res.data;
            serviceConsumeMap &&
              serviceConsumeMap.forEach((item, index) => {
                if (serviceConsumeAttendanceMap.length > 0) {
                  serviceConsumeAttendanceMap.some(ele => {
                    if (ele.canteenNumberb === item.canteenNumbera) {
                      serviceConsumeMap[index].peoTotal = ele.peoTotal;
                    }
                  });
                }
              });
            this.tableData = serviceConsumeMap || [];
            this.tableData.map((item, index) => {
              item.key = index + 1;
            });
            let allTotal = Object.assign(
              {},
              ...allServiceConsumeAttendanceMap,
              ...allServiceConsumeMap,
              { merchantName: "合计" }
            );
            this.totalData = allTotal;
            // console.log(this.totalData)
            // this.tableData.unshift(allTotal)
          }
        });
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.merchantName && row.merchantName.indexOf("合计") !== -1) {
        const _row = [0, 4, 0, 0, 1, 1, 1];
        const _col = 1;
        return {
          rowspan: _col,
          colspan: _row[columnIndex]
        };
      }
    },
    handleGetSearchValue() {
      this.getServiceConditionInfo();
    }
  },

  components: {
    ListLayout,
    Menu
  }
};
</script>

<style scoped>
.btns_box {
  display: table;
}
.data_total {
  display: table-cell;
  text-align: left;
  font-size: 0.16rem;
  color: #a5dcff;
}
.data_total span {
  font-weight: bolder;
  color: #05e6ff;
  margin-left: 30px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 1.6rem;
  margin-right: 0.2rem;
}
</style>
