<template>
  <div class="common_title">
    <div class="left">{{ title }}</div>
    <div class="right">
      <div v-if="flag == '1'">
        <el-form :inline="true" :model="formDate" class="forms_left">
          <el-form-item label="" class="form_item">
            <span>
              <el-date-picker
                v-model="servicesTime"
                type="daterange"
                range-separator="-"
                clearable
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                @change="handleTime"
                class="el_service_date"
              >
              </el-date-picker>
            </span>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="flag == '3'">
        <el-select
          v-model="value2"
          placeholder="请选择"
          @change="handleChangeSelect"
        >
          <el-option
            v-for="item in OptionsList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div v-if="flag == '4'">
        <el-select
          v-model="value3"
          placeholder="请选择"
          @change="handleChangeSelect"
        >
          <el-option
            v-for="item in OptionsList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from "@/utils/utils.js";

export default {
  data() {
    return {
      value1: "",
      value2: "01", // 服务项目占比下拉框 默认值
      value3: "0101", // 服务内容排名下拉框 默认值
      formDate: {
        beginTime: "",
        endTime: ""
      },
      servicesTime: []
    };
  },

  props: {
    title: {
      type: String,
      default: () => {
        return "";
      }
    },
    flag: {
      type: String,
      default: () => {
        return "";
      }
    },
    OptionsList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    type: {
      type: String,
      default: () => {
        return "";
      }
    }
  },

  created() {
    this.initTime();
  },

  methods: {
    handleChangeSelect(val) {
      // console.log(val);
      this.$emit("selectCode", val);
    },

    initTime() {
      this.servicesTime[0] = this.$route.query.beginTime
        ? new Date(this.$route.query.beginTime)
        : formatTime(new Date(new Date() - 1000 * 60 * 60 * 24 * 7));
      this.servicesTime[1] = this.$route.query.endTime
        ? new Date(this.$route.query.endTime)
        : formatTime(new Date());
      this.formDate.beginTime = this.servicesTime[0];
      this.formDate.endTime = this.servicesTime[1];
    },

    handleTime(val) {
      this.formDate.beginTime = formatTime(new Date(val[0]));
      this.formDate.endTime = formatTime(new Date(val[1]));
      this.$emit("formDateFromTitle", this.formDate);
    }
  }
};
</script>

<style lang="less" scoped>
.common_title {
  width: 100%;
  height: 0.4rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.22rem;
  font-weight: 700;
  line-height: 0.4rem;
  .right {
    /deep/ .el-select {
      height: 0.4rem;
    }
    /deep/ .el-input.el-input--suffix {
      height: 0.4rem;
    }
    /deep/ .el-input__inner {
      height: 0.4rem;
      // width: 1.8rem;
    }
  }
}

/deep/ .forms_left.el-form {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // height: 0.52rem;
}
/deep/ .form_item.el-form-item {
  margin: 0rem !important;
  // width: 4rem;
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
    span {
      .el_service_date.el-date-editor--daterange {
        height: 0.45rem !important;
      }
    }
  }
}
</style>
