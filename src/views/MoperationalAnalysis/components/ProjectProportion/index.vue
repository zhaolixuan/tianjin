<template>
  <div class="project">
    <JdCard>
      <Commontitle
        :title="title"
        flag="3"
        type="1"
        :OptionsList="ProjectList"
        @selectCode="selectCode"
      />
      <div class="ring">
        <ve-ring :extend="pieConfig" height="270px" :colors="colors"></ve-ring>
      </div>
    </JdCard>
  </div>
</template>

<script>
import JdCard from "../jdCard/index";
import Commontitle from "../commonTitle/index";
import { colors, tooltipItem } from "../echartsConfig/index";
import api from "@/api/api.js";

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
      title: "服务项目占比",
      ProjectList: [],
      selectCoded: "01", // 服务项目占比图表默认传值
      zbSelectName: "",
      pieConfig: {
        tooltip: tooltipItem,
        legend: {
          data: [],
          orient: "vertical",
          icon: "circle",
          itemHeight: 8,
          itemGap: 20,
          right: 20,
          top: "center"
        },
        series: {
          type: "pie",
          radius: ["0%", "75%"],
          center: ["50%", "50%"],
          data: [],
          label: {
            normal: {
              show: true,
              formatter: "{b}\n{d}%",
              position: "bottom"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "26"
              }
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetY: 5,
              shadowOffsetX: 5,
              shadowColor: "rgba(20, 94, 84, 0.12)"
            }
          }
        }
      },
      colors: colors
    };
  },

  components: {
    JdCard,
    Commontitle
  },

  watch: {
    formData: {
      handler(newVal) {
        // 解开切换时间会报错 Duplicate keys detected: '01'. This may cause an update error.
        // this.getSelectData();
        this.getserviceProjectData();
      },
      deep: true
    },
    seviceName: {
      handler(newVal, oldVal) {
        this.getserviceProjectData();
      }
    }
  },

  mounted() {
    this.getSelectData();
    this.getserviceProjectData();
    // this.getSimulationData();
  },

  methods: {
    getSelectData() {
      let params = {};
      api.serviceProjectSelect(params).then(res => {
        // console.log(res);
        if (res.code && res.code == 200) {
          let data = res.data;
          data.forEach(item => {
            this.ProjectList.push({
              label: item.name,
              value: item.code
            });
          });
        }
      });
    },

    selectCode(val) {
      // console.log(val);
      this.selectCoded = val;
      switch (val) {
        case "01":
          this.zbSelectName = "助餐服务类";
          break;
        case "02":
          this.zbSelectName = "生活照料类";
          break;
        case "03":
          this.zbSelectName = "助医服务类";
          break;
        case "01":
          this.zbSelectName = "托养床位类";
          break;
        case "01":
          this.zbSelectName = "其他服务类";
          break;
      }
      // console.log(this.zbSelectName);
      this.$emit("zbSelectName", this.zbSelectName);
      this.getserviceProjectData();
    },

    getserviceProjectData() {
      let params = {
        startTime: this.formData.beginTime,
        endTime: this.formData.endTime,
        typeCode: this.selectCoded,
        name: this.seviceName
      };
      api.serviceProject(params).then(res => {
        // console.log(res);
        if (res.code && res.code == 200) {
          this.pieConfig.legend.data = [];
          this.pieConfig.series.data = [];
          let data = res.data;
          data.forEach(item => {
            this.pieConfig.legend.data.push(item.project);
            this.pieConfig.series.data.push({
              name: item.project,
              value: item.count
            });
          });
        }
      });
    },

    getSimulationData() {
      this.pieConfig.legend.data.push("早餐", "中餐", "晚餐");
      this.pieConfig.series.data.push(
        {
          name: "早餐",
          value: 123
        },
        {
          name: "中餐",
          value: 456
        },
        {
          name: "晚餐",
          value: 789
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
// .project {
//   height: 3.8rem;
// }
</style>
