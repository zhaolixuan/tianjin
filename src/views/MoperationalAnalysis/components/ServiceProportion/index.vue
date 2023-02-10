<template>
  <div class="service_proportion">
    <JdCard>
      <Commontitle :title="title" flag="2" />
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
      title: "服务类别占比",
      pieConfig: {
        tooltip: tooltipItem,
        legend: {
          data: [],
          orient: "vertical",
          icon: "circle",
          itemHeight: 8,
          itemGap: 2,
          right: 20,
          top: "center"
        },
        series: {
          type: "pie",
          radius: ["50%", "75%"],
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
        this.getServiceType();
      },
      deep: true
    },
    seviceName: {
      handler(newVal, oldVal) {
        this.getServiceType();
      }
    }
  },

  mounted() {
    this.getServiceType();
    // this.getSimulationData();
  },

  methods: {
    getServiceType() {
      let params = {
        startTime: this.formData.beginTime,
        endTime: this.formData.endTime,
        name: this.seviceName
      };
      api.serviceType(params).then(res => {
        // console.log(res);
        if (res.code && res.code == 200) {
          let data = res.data;
          this.pieConfig.series.data = [];
          this.pieConfig.legend.data = [];
          data.forEach(item => {
            this.pieConfig.series.data.push({
              name: item.type,
              value: item.count
            });
            this.pieConfig.legend.data.push(item.type);
          });
        }
      });
    },

    getSimulationData() {
      // 模拟的数据
      this.pieConfig.series.data.push(
        {
          name: "aaa",
          value: 123
        },
        {
          name: "bbb",
          value: 456
        }
      );
      this.pieConfig.legend.data.push("aaa", "bbb");
    }
  }
};
</script>

<style lang="less" scoped>
// .service_proportion {
//   height: 3.8rem;
// }
</style>
