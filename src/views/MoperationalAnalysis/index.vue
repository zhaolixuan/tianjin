<template>
  <div class="MoperationalAnalysis">
    <Header />
    <div class="content w1200">
      <div class="dateSelect">
        <div class="left">
          <el-form :inline="true" :model="formData" class="forms_left">
            <el-form-item label="日期筛选" class="form_item">
              <span>
                <el-date-picker
                  v-model="ServicesTime"
                  type="daterange"
                  range-separator="-"
                  clearable
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  @change="handleTime"
                >
                </el-date-picker>
              </span>
            </el-form-item>
            <el-form-item label="服务载体" class="form_item">
              <span>
                <el-select
                  v-model="seviceName"
                  clearable
                  placeholder="请选择"
                  @change="seviceChange"
                  :disabled="disabled"
                >
                  <el-option
                    v-for="(item, index) in seviceOptions"
                    :key="index"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </span>
            </el-form-item>
            <!-- <span class="tip">日期筛选</span> -->
          </el-form>
        </div>
        <div class="right">
          <CurrentTime />
        </div>
      </div>
      <Toptal class="total" :formData="formData" :seviceName="seviceName" />
      <el-row :gutter="20" type="flex" class="first_row">
        <el-col :span="16">
          <ServiceTimes :seviceName="seviceName" />
        </el-col>
        <el-col :span="16">
          <ServiceProportion :formData="formData" :seviceName="seviceName" />
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" class="second">
        <el-col :span="16">
          <ProjectProportion
            :formData="formData"
            @zbSelectName="zbSelectName"
            :seviceName="seviceName"
          />
        </el-col>
        <el-col :span="16">
          <ContentSort
            :formData="formData"
            :zbSelectNamed="zbSelectNamed"
            :seviceName="seviceName"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header/index";
import Toptal from "./components/TopTotal/index";
import ServiceTimes from "./components/ServiceTimes/index";
import ServiceProportion from "./components/ServiceProportion/index";
import ProjectProportion from "./components/ProjectProportion/index";
import ContentSort from "./components/ContentSort/index";
import CurrentTime from "./components/CurrentTime/index";
import { formatTime } from "@/utils/utils.js";
import api from "@/api/api.js";

export default {
  data() {
    return {
      formData: {
        beginTime: "",
        endTime: ""
      },
      ServicesTime: [],
      zbSelectNamed: "助餐服务类",
      seviceOptions: [],
      seviceName: "",
      disabled: false
    };
  },

  components: {
    Header,
    Toptal,
    ServiceTimes,
    ServiceProportion,
    ProjectProportion,
    ContentSort,
    CurrentTime
  },

  created() {
    this.initTime();
  },

  mounted() {
    this.getServiceCenterData();
  },

  methods: {
    handleTime(val) {
      // console.log(val); // ['时间1', '时间2']
      this.formData.beginTime = formatTime(new Date(val[0]));
      this.formData.endTime = formatTime(new Date(val[1]));
    },

    initTime() {
      this.ServicesTime[0] = this.$route.query.beginTime
        ? new Date(this.$route.query.beginTime)
        : formatTime(new Date(new Date() - 1000 * 60 * 60 * 24 * 0));
      this.ServicesTime[1] = this.$route.query.endTime
        ? new Date(this.$route.query.endTime)
        : formatTime(new Date());
      this.formData.beginTime = this.ServicesTime[0];
      this.formData.endTime = this.ServicesTime[1];
    },

    zbSelectName(val) {
      // console.log(val);
      this.zbSelectNamed = val;
    },

    getServiceCenterData() {
      let params = {};
      api.serviceCenter(params).then(res => {
        // console.log(res);
        if (res.code && res.code == 200) {
          let data = res.data;
          if (!Array.isArray(data)) {
            this.seviceOptions.push(data);
            this.seviceName = data;
            this.disabled = true;
          } else {
            this.seviceOptions = data;
            this.disabled = false;
          }
        }
      });
    },
    seviceChange(val) {
      this.seviceName = val;
    }
  }
};
</script>

<style lang="less" scoped>
.MoperationalAnalysis {
  background-color: #f6f6f6;
  height: auto !important;
  // margin-bottom: 0.2rem;
  .w1200 {
    width: 1360px;
    margin: 0 auto;
    .total {
      margin-top: 0.2rem;
    }
    .second {
      margin-top: 0.2rem;
    }
    .dateSelect {
      height: 0.4rem;
      border-radius: 0.1rem;
      display: flex;
      justify-content: space-between;
      font-size: 0.22rem;
      margin-top: 0.2rem;
      .left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        /deep/ .forms_left.el-form {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          // height: 0.52rem;
        }
        /deep/ .form_item.el-form-item {
          margin: 0rem !important;
          width: 4rem;
          margin-right: 0.2rem !important;
          display: flex;
          justify-content: center;
          align-items: center;
          .el-form-item__label {
            width: 1rem;
            text-align: left;
          }
          .el-form-item__content {
            width: 3rem;
            .el-input__inner {
              width: 3rem;
            }
          }
        }
        .tip {
          margin-right: 0.14rem;
          width: 0.74rem;
          height: 0.26rem;
          font-size: 0.18rem;
          font-family: PingFang SC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 0.26rem;
        }
        /deep/ .datePicker {
          width: 2.6rem;
          height: 0.38rem;
          background: #ffffff;
          border-radius: 0.03rem 0.03rem 0.03rem 0.03rem;
          opacity: 1;
          border: 0.01rem solid #eaeaea;
        }
      }
      .right {
        display: flex;
        font-size: 0.16rem;
        align-items: center;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 0.2rem;
      }
    }
  }
}
</style>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  overflow: auto !important;
  background-color: #f6f6f6;
}
</style>
