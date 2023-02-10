<template>
  <div class="content">
    <JdCard>
      <Commontitle
        :title="title"
        flag="4"
        :OptionsList="ContentList"
        type="2"
        @selectCode="selectCode"
      />
      <ve-histogram
        :extend="barOptions"
        :yAxis="barOptions.yAxis"
        height="270px"
        :color="['#4B66FE']"
      ></ve-histogram>
    </JdCard>
  </div>
</template>

<script>
import JdCard from "../jdCard/index";
import Commontitle from "../commonTitle/index";
import { tooltip } from "../echartsConfig/index.js";
import api from "@/api/api.js";

export default {
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    zbSelectNamed: {
      type: String,
      default: () => {
        return "";
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
      title: "服务内容排名",
      ContentList: [],
      contentSortSelectCode: "0101", // 服务内容排名图表默认传值
      barOptions: {
        tooltip,
        grid: {
          right: "12%",
          top: "5%",
          bottom: "5%"
        },
        legend: {
          show: false,
          icon: "circle",
          left: 0
        },
        xAxis: {
          type: "value",
          axisTick: {
            // 坐标轴刻度线
            show: false
          },
          axisLine: {
            // 坐标轴 轴线
            show: false,
            lineStyle: {
              color: "#999FC0"
            }
          },
          boundaryGap: false, // 边界的差距
          splitLine: {
            //分割线
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#EDF0FD"
            }
          }
        },
        yAxis: {
          type: "category",
          data: [],
          boundaryGap: true,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#999FC0"
            }
          }
        },
        dataZoom: [
          // 使镜头或摄影机 推近或拉远
          {
            show: true,
            backgroundColor: "rgb(236, 239, 253, .5)",
            fillerColor: "rgb(216, 221, 253, .5)",
            yAxisIndex: 0,
            filterMode: "empty",
            width: 11,
            height: "80%",
            showDataShadow: false,
            start: 1,
            end: 100,
            top: "center",
            right: "3%"
          }
        ],
        series: {
          name: "",
          barWidth: 16,
          data: [],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "#EDF0FD",
            barBorderRadius: [10, 10, 10, 10]
          },
          itemStyle: {
            normal: {
              barBorderRadius: [10, 10, 10, 10]
            }
          },
          // 显示具体的数值用
          label: {
            show: true,
            position: "right"
          }
        }
      }
    };
  },

  components: {
    JdCard,
    Commontitle
  },

  watch: {
    zbSelectNamed: {
      handler(newVal) {
        this.ContentList = [];
        this.getSelectData();
      }
    },

    formData: {
      handler: function(newVal) {
        // console.log(newVal);
        this.getSelectData();
        this.getContentSortData();
      },
      deep: true
    },
    
    seviceName: {
      handler(newVal, oldVal) {
        this.getContentSortData();
      }
    }
  },

  mounted() {
    this.getSelectData();
    this.getContentSortData();
    // console.log(this.zbSelectNamed);
    // this.getSimulationData();
  },

  methods: {
    getSelectData() {
      let params = {
        name: this.zbSelectNamed ? this.zbSelectNamed : "助餐服务类"
      };
      api.serviceContentSelect(params).then(res => {
        // console.log(res);
        if (res.code && res.code == 200) {
          this.ContentList = [];
          let data = res.data;
          data.forEach(item => {
            this.ContentList.push({
              label: item.name,
              value: item.code
            });
          });
        }
      });
    },

    selectCode(val) {
      // console.log(val);
      this.contentSortSelectCode = val;
      this.getContentSortData();
    },

    getContentSortData() {
      let params = {
        startTime: this.formData.beginTime,
        endTime: this.formData.endTime,
        projectCode: this.contentSortSelectCode,
        name: this.seviceName
      };
      api.serviceContent(params).then(res => {
        // console.log(res);
        if (res.code && res.code == 200) {
          this.barOptions.yAxis.data = [];
          this.barOptions.series.data = [];
          let data = res.data || [];
          data.forEach(item => {
            this.barOptions.yAxis.data.push(item.project);
            this.barOptions.series.data.push(item.count);
          });
        }
      });
    },

    getSimulationData() {
      this.barOptions.yAxis.data.push("豆浆和油条");
      this.barOptions.series.data.push("16");
    }
  }
};
</script>

<style lang="less" scoped>
// .content {
//   height: 3.8rem;
// }
</style>
