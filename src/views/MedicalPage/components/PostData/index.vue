<template>
  <div class="older-content">
    <norm-layout text="健康驿站"></norm-layout>
    <div class="post_container">
      <message-item
        :ServiceData="ServiceData"
        lineNumber="three"
      ></message-item>
    </div>
    <!-- 9月27日新增 -->
    <div class="service_time fiveService">
      <el-form>
        <el-form-item label="服务时间：" class="search_select">
          <el-date-picker
            v-model="ServiceTime[0]"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="开始日期"
          >
          </el-date-picker>
          <el-date-picker
            v-model="ServiceTime[1]"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="截止日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-button
          class="btn"
          icon="el-icon-search"
          :loading="Loading"
          @click="handleGetSearchValue"
          >查询</el-button
        >
      </el-form>
    </div>
    <div class="post_container_footer">
      <message-item
        :ServiceData="ServiceDataTwo"
        lineNumber="three"
      ></message-item>
    </div>
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import MessageItem from "@/views/OlderDistribution/components/MessageItem/index";
import { mapGetters } from "vuex";

export default {
  name: "PostData",
  data() {
    return {
      ServiceTime: [],
      timeData: [new Date(new Date() - 1000 * 60 * 60 * 24 * 30), new Date()]
    };
  },

  props: {
    healthStationMap: {
      type: Object,
      default: () => {}
    },
    Loading: {
      type: Boolean,
      default: false
    }
  },

  created() {
    this.initServiceTime();
    // this.handleGetSearchValue(); // 4 会把 handleTime 传到父组件 触发一次 getCateringerService(所以共四次)
  },

  computed: {
    ...mapGetters(["breadCrumbCodes"]),
    ServiceData() {
      let {
        haveHealthRecordsTotal,
        healthStationNum,
        insuranceToMoney,
        healthStationTotal,
        insuranceClaimsTotal,
        insuranceOutMoney,
        insuranceClaimsMoney,
        peopleTotal,
        serverTotal,
        serviceObjectTotal,
        serviceTotal,
        signHomeoctorTotal,
        insurancePaidToMap,
        insurancePaidOutMap
      } = this.healthStationMap;
      return [
        {
          title: "健康档案数",
          number: 238197,
          // number: (haveHealthRecordsTotal / 10000).toFixed(2),
          text: "人",
          flag: true
        },
        {
          title: "签约医生",
          // number: (signHomeoctorTotal / 10000).toFixed(2),
          number: 111301,
          text: "人",
          flag: true
        },
        {
          title: "健康驿站",
          number: healthStationNum,
          path: {
            name: "HealthStationList",
            query: { code: this.breadCrumbCodes }
          },
          text: "个"
        },
        {
          title: "出险次数",
          number: insuranceClaimsTotal,
          text: "人",
          // flag: true
          path: {
            name: "InsuranceClaims",
            query: {
              code: this.breadCrumbCodes,
              title: "助医服务大数据统计分析"
            }
          }
        },
        {
          title: "预估赔付金额",
          number: (insuranceToMoney / 10000).toFixed(2),
          text: "万元",
          // flag: true,
          path: {
            name: "InsuranceClaims",
            query: {
              code: this.breadCrumbCodes,
              title: "助医服务大数据统计分析"
            }
          }
        },
        {
          title: "已赔付金额",
          number: (insuranceOutMoney / 10000).toFixed(2),
          text: "万元",
          // flag: true,
          path: {
            name: "InsuranceClaims",
            query: {
              code: this.breadCrumbCodes,
              title: "助医服务大数据统计分析"
            }
          }
        }
        // {
        //   title: "依托社区站",
        //   number: healthStationTotal,
        //   path: {
        //     name: "HealthStationList",
        //     query: { code: this.breadCrumbCodes, stationType: "2" }
        //   },
        //   text: "个",
        //   flag: true
        // },
        // {
        //   title: "出险次数",
        //   number: insuranceClaimsTotal,
        //   text: "人",
        //   flag: true
        // },
        // {
        //   title: "总赔付金额",
        //   number: (insuranceClaimsMoney / 10000).toFixed(2),
        //   text: "万元",
        //   flag: true,
        //   path: {
        //     name: "InsuranceClaims",
        //     query: {
        //       code: this.breadCrumbCodes,
        //       title: "助医服务大数据统计分析"
        //     }
        //   }
        // },
        // {
        //   title: "预估赔付金额",
        //   number: (insuranceToMoney / 10000).toFixed(2),
        //   text: "万元",
        //   flag: true,
        //   path: {
        //     name: "InsuranceClaims",
        //     query: {
        //       code: this.breadCrumbCodes,
        //       title: "助医服务大数据统计分析"
        //     }
        //   }
        // },
        // {
        //   title: "已赔付金额",
        //   number: (insuranceOutMoney / 10000).toFixed(2),
        //   text: "万元",
        //   flag: true,
        //   path: {
        //     name: "InsuranceClaims",
        //     query: {
        //       code: this.breadCrumbCodes,
        //       title: "助医服务大数据统计分析"
        //     }
        //   }
        // }
        // {
        //   title: "保险已赔付",
        //   number: (insuranceOutMoney / 10000).toFixed(2),
        //   text: "万",
        //   flag: true,
        //   path: {
        //     name: "InsuranceClaims",
        //     query: {
        //       code: this.breadCrumbCodes,
        //       title: "助医服务大数据统计分析"
        //     }
        //   }
        // },
        // {
        //   title: "保险待赔付",
        //   number: (insuranceToMoney / 10000).toFixed(2),
        //   text: "万",
        //   flag: true,
        //   path: {
        //     name: "InsuranceClaims",
        //     query: {
        //       code: this.breadCrumbCodes,
        //       title: "助医服务大数据统计分析"
        //     }
        //   }
        // }
      ];
    },
    ServiceDataTwo() {
      let {
        peopleTotal,
        serverTotal,
        serviceObjectTotal
      } = this.healthStationMap;
      return [
        {
          title: "服务人数",
          number: peopleTotal,
          path: {
            name: "MedicalList",
            query: {
              code: this.breadCrumbCodes,
              beginTime: this.ServiceTime[0],
              endTime: this.ServiceTime[1]
            }
          },
          text: "人"
        },
        {
          title: "服务人次",
          // number: (serverTotal / 10000).toFixed(2),
          number: serverTotal,
          path: {
            name: "MedicalList",
            query: {
              code: this.breadCrumbCodes,
              beginTime: this.ServiceTime[0],
              endTime: this.ServiceTime[1]
            }
          },
          text: "次"
        },
        {
          title: "服务项目次",
          number: serviceObjectTotal,
          path: {
            name: "MedicalList",
            query: {
              code: this.breadCrumbCodes,
              beginTime: this.ServiceTime[0],
              endTime: this.ServiceTime[1]
            }
          },
          text: "次"
        }
      ];
    }
  },

  components: {
    NormLayout,
    MessageItem
  },

  methods: {
    initServiceTime() {
      this.ServiceTime = [
        this.getDate(this.timeData[0]),
        this.getDate(this.timeData[1])
      ];
    },

    // 格式化日期
    getDate(time) {
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let date = time.getDate();
      return year + "-" + month + "-" + date;
    },

    // 查询按钮的处理函数
    handleGetSearchValue() {
      this.$emit("handleTime", this.ServiceTime);
      this.$emit("update:loading", false);
    }
  }
};
</script>

<style lang="less" scoped>
.older-content {
  height: 3.5rem;
  .post_container {
    width: 104%;
    height: 1rem;
    margin-top: 0.3rem;
  }
  .post_container_footer {
    width: 104%;
    height: 0.7rem;
    margin-top: 0.3rem;
  }
}

.worker_container {
  width: 80% !important;
}

.fiveService {
  /deep/ .el-form {
    flex: 1;
    height: 0.8rem !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }

  /deep/ .el-form-item__label {
    font-size: 0.2rem;
    color: #a6c5fd;
    float: left;
  }

  /deep/ .el-input__inner {
    font-size: 0.16rem !important;
    background-color: transparent !important;
    border: 0;
    border: 0.01rem solid #043a6f;
    color: #56a4f7;
  }

  /deep/ .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 1.6rem;
    margin-right: 0.2rem;
  }

  /deep/ .el-input__inner::-webkit-input-placeholder {
    color: #436fd2;
  }

  /deep/ .btn {
    width: 3.4rem;
    height: 0.4rem;
    background: url("~@/assets/img/oldMan_tab.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    border: 0;
    color: #4fd0ff;
    margin-right: -0.7rem;
    float: right;
    font-size: 0.14rem;
    display: block;
    margin-left: 0.3rem;
  }

  /deep/ .btn:focus,
  /deep/ .btn:hover {
    color: #16fff1;
  }
}

/deep/ .service_time.fiveService .el-form .el-form-item.search_select {
  width: 4.6rem;
  display: flex !important;
  margin-bottom: 0.1rem !important;
}

/deep/
  .service_time.fiveService
  .el-form
  .el-form-item.search_select
  .el-form-item__content {
  float: left !important;
  width: 2.2rem !important;
  flex: 1 !important;
  display: flex !important;
  justify-content: flex-start !important;
}
</style>

<style>
.el-select-dropdown,
.el-picker-panel,
.el-cascader__dropdown {
  background-color: #032995;
  border: 0;
}
.el-date-picker__header--bordered {
  border-bottom: 1px solid #436fd2;
}
.el-select-dropdown__item,
.el-date-picker__header-label,
.el-date-table td,
.el-month-table td .cell,
.el-year-table td .cell,
.el-picker-panel__icon-btn {
  color: #8fc0f3;
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
.el-form-item__content .el-date-editor .el-range-input {
  background: transparent !important;
  font-size: 0.16rem;
  color: #416fc4 !important;
  width: 98%;
}
.el-date-editor .el-range-input::-webkit-input-placeholder {
  color: #416fc4;
}
.el-form-item__content .el-date-editor i {
  color: #416fc4;
}
</style>
