<template>
  <div class="record_statistics_container">
    <div class="service_statistics">
      <div class="left_chart" id="left_chart"></div>
      <div class="right">
        <p class="tongji">统计</p>
        <div>
          <p>
            服务中 <span>{{ serviceData.inService }}</span
            >单
          </p>
          <p>
            已完成 <span>{{ serviceData.endService }}</span
            >单
          </p>
        </div>
        <div>
          <p>
            服务总时长 <span>{{ serviceData.countTime }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="service_detail">
      <div class="detail_header">服务类型</div>
      <div id="service_type"></div>
    </div>
    <div class="service_detail">
      <div class="detail_header">{{ detailHeaderName }}</div>
      <div
        class="detail_type"
        v-for="(item, index) in detailList"
        :key="index"
        v-on:click="handleGoItemDetails(item.name)"
      >
        <span class="type_name">{{ item.name }}</span>
        <span class="el-icon-arrow-right"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { getStatisticalRecords } from "@/api/serviceExe";
export default {
  data() {
    return {
      detailHeaderName: "服务明细",
      detailList: [
        {
          value: 0,
          name: "助餐服务类",
        },
        {
          value: 1,
          name: "生活照料类",
        },
        {
          value: 2,
          name: "助医服务类",
        },
        {
          value: 3,
          name: "托养床位类",
        },
        {
          value: 4,
          name: "其他服务类",
        },
        // {
        //   value: 5,
        //   name: "取消订单",
        // },
      ],
      serviceData: {
        endService: 0,
        inService: 0,
      },
      myChartText: "",
      typeData: [],
    };
  },
  computed: {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getStatisticalRecords()
        .then((res) => {
          if (res && res.code == 200) {
            this.serviceData = {
              ...res.data,
            };
            let a = this.serviceData.endService + this.serviceData.inService;
            let num = 100 / (a / this.serviceData.endService) || 0;
            this.myChartText = num.toFixed() + "%";
            let { qtfw, shzl, tycw, zcfw, zyfw } = res.data;
            this.typeData = [
              { value: zcfw, name: " 助餐服务类 " },
              { value: shzl, name: " 生活照料类 " },
              { value: zyfw, name: " 助医服务类 " },
              { value: tycw, name: " 托养床位类 " },
              { value: qtfw, name: " 其他服务类 " },
            ];

            this.initSerEcharts();
            this.initTongjiEcharts();
          }
        })
        .catch((err) => {});
    },
    initSerEcharts() {
      let num = 0;
      this.typeData.forEach((i) => {
        num += i.value;
      });
      // console.log(this.typeData, num);
      var chartDom = document.getElementById("service_type");
      var myChart = echarts.init(chartDom);
      let option = {
        tooltip: {
          trigger: "item",
          show: false,
        },
        legend: {
          icon: "circle",
          orient: "vertical",
          left: "20",
          top: "20%",
          itemStyle: {
            opacity: 0.7,
          },
          textStyle: {
            color: "#8C8C8C",
            fontSize: 12,
            fontWeight: 400,
          },
          formatter: (params) => {
            let a = "";
            this.typeData.forEach((i) => {
              if (i.name.trim() == params.trim()) {
                if (!i.value) {
                  a = 0;
                } else {
                  a = ((i.value / num).toFixed(2) * 100).toFixed();
                }
              }
            });
            return params + " " + a + "%";
          },
        },

        series: [
          {
            name: "访问来源",
            type: "pie",
            legendHoverLink: false,
            radius: "50%",
            top: "-45px",
            left: "30%",
            width: "300px",
            height: "300px",
            data: this.typeData,
            label: {
              formatter: (params) => {
                if (!params.value) return "";
                // return params.name + ":" + (params.value || "");
                return params.value;
              },
              position: "inside",

              color: "#595959",
              fontSize: "11p",
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              opacity: 0.7,
            },
            emphasis: {
              scale: false,
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    initTongjiEcharts() {
      var chartDom = document.getElementById("left_chart");
      var myChart = echarts.init(chartDom);
      let option = {
        title: {
          text: this.myChartText,
          textStyle: {
            fontSize: "20",
            color: "#4C96F5",
          },
          bottom: "38%",
          left: "34%",
          // subtext: "服务完成",
          subtextStyle: {
            fontSize: "10",
            color: "#2986DA",
            lineHeight: "15",
          },
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            emphasis: {
              scale: false,
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 13, name: "0" },
              { value: 13, name: "1" },
              { value: 2, name: "2" },
              { value: 17, name: "3" },
              { value: 2, name: "4" },
              { value: 9, name: "5" },
              { value: 9, name: "6" },
              { value: 9, name: "7" },
            ],
            itemStyle: {
              color: (seriesIndex) => {
                if (seriesIndex.dataIndex === 0) {
                  return {
                    type: "linear",
                    x: 0,
                    y: 1,
                    x2: 0,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#3F77E4", // 0% 处的颜色
                      },

                      {
                        offset: 1,
                        color: "#535FFE", // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  };
                } else if (
                  seriesIndex.dataIndex === 1 ||
                  seriesIndex.dataIndex === 3
                ) {
                  return {
                    type: "linear",
                    x: 0,
                    y: 1,
                    x2: 0,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#D5EBFF", // 0% 处的颜色
                      },

                      {
                        offset: 1,
                        color: "#D5EBFF", // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  };
                } else if (seriesIndex.dataIndex === 5) {
                  return {
                    type: "linear",
                    x: 0,
                    y: 1,
                    x2: 0,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#53DFFD", // 0% 处的颜色
                      },

                      {
                        offset: 1,
                        color: "#2F97FF", // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  };
                } else if (seriesIndex.dataIndex === 6) {
                  return {
                    type: "linear",
                    x: 0,
                    y: 1,
                    x2: 0,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#69ADFE", // 0% 处的颜色
                      },

                      {
                        offset: 1,
                        color: "#3F77E3", // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  };
                } else if (seriesIndex.dataIndex === 7) {
                  return {
                    type: "linear",
                    x: 0,
                    y: 1,
                    x2: 0,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#3F77E3", // 0% 处的颜色
                      },

                      {
                        offset: 1,
                        color: "#535EFD", // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  };
                } else {
                  return "#fff";
                }
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
    handleGoItemDetails(val) {
      this.$router.push({
        path: "/server-recordDetails",
        query: { name: val },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.record_statistics_container {
  background-color: #f6f6f6;
  .service_statistics {
    height: 186px;
    background-color: #fff;
    border: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .left_chart {
      width: 130px;
      height: 130px;
    }
    .right {
      height: 130px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: left;
      p {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
      }
      div {
        display: flex;
        flex: 1;
        // justify-content: ;
        p {
          font-size: 14px;
          margin-right: 14px;
          span {
            color: #4c96f5;
            font-size: 18px;
          }
        }
      }
    }
  }
  #service_type {
    height: 210px;
    margin-top: 10px;
    background-color: #fff;
  }
  .service_detail {
    // height: 312px;
    margin-top: 10px;
    padding: 0px 14px;
    background-color: #fff;
    .detail_header {
      height: 55px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 55px;
      text-align: left;
    }
    .detail_type {
      height: 42px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .type_name {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 20px;
      }
      .el-icon-arrow-right {
        font-size: 12px;
      }
    }
  }
}
</style>
