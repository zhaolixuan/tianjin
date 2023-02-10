<template>
  <div class="service_times">
    <JdCard>
      <Commontitle
        :title="title"
        flag="1"
        @formDateFromTitle="formDateFromTitle"
      />
      <ve-histogram
        :extend="lineBarOption.extend"
        :series="lineBarOption.series"
        :yAxis="lineBarOption.extend.yAxis"
        :colors="colors"
        height="270px"
      ></ve-histogram>
    </JdCard>
  </div>
</template>

<script>
import JdCard from "../jdCard/index";
import Commontitle from "../commonTitle/index";
import { yAxis, tooltip } from "../echartsConfig/index.js";
import api from "@/api/api.js";
import { formatTime } from "@/utils/utils.js";

export default {
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    seviceName: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  data() {
    return {
      title: "服务客次消费金额趋势图",
      colors: [
        "#4B66FE",
        "#EE6C65",
        "#FFC932",
        "#00DCF0",
        "#997EFF",
        "#CED3EB"
      ],
      number: 6,
      lineBarOption: {
        extend: {
          xAxis: {
            type: "category",
            boundaryGap: true,
            data: [],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#999FC0"
              }
            },
            axisLabel: {
              interval: 0
            }
          },
          yAxis: [
            {
              ...yAxis,
              name: "客次"
            },
            {
              ...yAxis,
              name: "金额"
            }
          ],
          tooltip,
          dataZoom: {
            show: true,
            type: "slider", // slider 滑动器
            height: 10, // 滑动器高度
            start: 0, // 数据窗口范围的 起始 百分比 表示 0%
            end: 70 // 数据窗口范围的 结束 百分比 表示 5%
          },
          legend: {
            data: ["服务客次", "消费金额"],
            icon: "circle",
            left: 0
            // itemGap: 480,
          },
          series: [
            {
              barWidth: 16,
              name: "服务客次",
              type: "bar",
              data: [],
              showBackground: true,
              backgroundStyle: {
                color: "#EDF0FD",
                barBorderRadius: [10, 10, 0, 0]
              },
              itemStyle: {
                normal: {
                  barBorderRadius: [10, 10, 0, 0]
                }
              }
            },
            {
              barWidth: 16,
              name: "消费金额",
              type: "line",
              yAxisIndex: 1,
              data: [],
              showBackground: true,
              backgroundStyle: {
                color: "#EDF0FD",
                barBorderRadius: [10, 10, 0, 0]
              },
              itemStyle: {
                normal: {
                  barBorderRadius: [10, 10, 0, 0]
                }
              }
            }
          ]
        }
      },

      formDateSecond: {
        beginTime: formatTime(new Date()),
        endTime: formatTime(new Date())
      }
    };
  },

  components: {
    JdCard,
    Commontitle
  },

  watch: {
    formData: {
      handler(newVal) {
        this.getServiceTimeData();
      },
      deep: true
    },

    formDateSecond: {
      handler(newVal) {
        this.getServiceTimeDataTwo();
      },
      deep: true
    },

    seviceName: {
      handler(newVal, oldVal) {
        this.getServiceTimeDataTwo();
      }
    }
  },

  // computed: {
  //   datazoomShow() {
  //     return this.number > 7 ? true : false;
  //   }
  // },

  mounted() {
    // this.getServiceTimeData();
    this.getServiceTimeDataTwo();
    this.getSimulationData();
  },

  methods: {
    getServiceTimeData() {
      let params = {
        startTime: this.formData.beginTime,
        endTime: this.formData.endTime
      };
      api.serviceTime(params).then(res => {
        // console.log(res);
        if (res.code && res.code == 200) {
          let xname = [];
          let counArr = [];
          let moneyArr = [];
          let data = res.data;
          data.forEach(item => {
            xname.push(formatTime(new Date(item.date)));
            counArr.push(item.count);
            moneyArr.push(item.money);
          });
          this.lineBarOption.extend.xAxis.data = xname;
          this.lineBarOption.extend.series[0].data = counArr;
          this.lineBarOption.extend.series[1].data = moneyArr;
        }
      });
    },

    getServiceTimeDataTwo() {
      let params = {
        startTime: this.formDateSecond.beginTime,
        endTime: this.formDateSecond.endTime,
        name: this.seviceName
      };
      api.serviceTime(params).then(res => {
        // console.log(res);
        if (res.code && res.code == 200) {
          let xname = [];
          let counArr = [];
          let moneyArr = [];
          let data = res.data;
          data.forEach(item => {
            xname.push(formatTime(new Date(item.date)));
            counArr.push(item.count);
            moneyArr.push(item.money);
          });
          this.lineBarOption.extend.xAxis.data = xname;
          this.lineBarOption.extend.series[0].data = counArr;
          this.lineBarOption.extend.series[1].data = moneyArr;
          this.lineBarOption.extend.dataZoom.end =
            this.lineBarOption.extend.xAxis.data.length > 7
              ? (7 / this.lineBarOption.extend.xAxis.data.length) * 100
              : 100;
        }
      });
    },

    formDateFromTitle(val) {
      // console.log(val);
      this.formDateSecond.beginTime = val.beginTime;
      this.formDateSecond.endTime = val.endTime;
    },

    getSimulationData() {
      this.lineBarOption.extend.xAxis.data.push(
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六",
        "周日",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "日"
      );
      this.lineBarOption.extend.series[0].data.push(
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900"
      );
      this.lineBarOption.extend.series[0].data.push(
        "900",
        "800",
        "700",
        "600",
        "500",
        "400",
        "300",
        "200",
        "100"
      );
      this.lineBarOption.extend.dataZoom.end =
        this.lineBarOption.extend.xAxis.data.length > 6
          ? (6 / this.lineBarOption.extend.xAxis.data.length) * 100
          : 100;
    }
  }
};
</script>

<style lang="less" scoped>
// .service_times {
//   height: 3.8rem;
// }
</style>
