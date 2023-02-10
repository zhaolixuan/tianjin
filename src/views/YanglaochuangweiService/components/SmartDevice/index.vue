<template>
  <div class="older-content">
    <norm-layout text="智能设备监测"></norm-layout>
    <message-item :ServiceData="ServiceData" lineNumber="three"></message-item>
  </div>
</template>

<script>
import NormLayout from "../NormLayout";
import MessageItem from "../MessageItem/index";
import { mapGetters } from "vuex";

export default {
  name: "SmartDevice",
  props: {
    deviceopenMap: {
      type: Object,
      default: () => {}
    },
    equipmentMap: {
      type: Object,
      default: () => {}
    },
    intelligentRobot: {
      type: String,
      default: () => '',
    }
  },

  computed: {
    ...mapGetters(["breadCrumbCodes"]),
    ServiceData() {
      let data = [];
      if (this.breadCrumbCodes.length > 1) {
        data = [
          {
            title: "一键呼叫设备",
            number: this.deviceopenMap.deviceopenTotal || 0,
            text: "个",
            line: true,
            // path: {
            //   path: 'SmartdeviceStatistics',
            //   query: { code: this.breadCrumbCodes }
            // },
            path: {
              path: "EquipmentList",
              query: {
                code: this.breadCrumbCodes,
                title: "智能设备监测大数据统计分析"
              }
            }
          },
          {
            title: "门磁设备",
            number: this.equipmentMap.equipmentTotal || 0,
            line: true,
            text: "人",
            path: {
              path: "TheagedGateList",
              query: {
                code: this.breadCrumbCodes,
                title: "智能设备监测大数据统计分析"
              }
            }
          },
          {
            title: "智能外呼机器人",
            number: this.intelligentRobot || 0,
            line: true,
            flag: true,
            text: "人",
            // path: {
            //   path: "TheagedGateList",
            //   query: {
            //     code: this.breadCrumbCodes,
            //     title: "智能设备监测大数据统计分析"
            //   }
            // }
          }
        ];
      } else {
        data = [
          {
            title: "一键呼叫设备",
            number: this.deviceopenMap.deviceopenTotal || 0,
            text: "个",
            line: true,
            // path: {
            //   path: 'SmartdeviceStatistics',
            //   query: { code: this.breadCrumbCodes }
            // }
            path: {
              path: "EquipmentList",
              query: {
                code: this.breadCrumbCodes,
                title: "智能设备监测大数据统计分析"
              }
            }
          },
          {
            title: "烟感设备",
            number: 130,
            flag: true,
            line: true,
            text: "个"
          },
          {
            title: "智能外呼机器人",
            number: this.intelligentRobot,
            flag: true,
            line: false,
            text: "人"
          },
          // {
          //   title: '门磁设备',
          //   number: this.equipmentMap.equipmentTotal || 0,
          //   flag: true,
          //   line: true,
          //   text: '人'
          // }
          {
            title: "门磁设备",
            number: this.equipmentMap.equipmentTotal || 0,
            line: true,
            text: "人",
            path: {
              path: "TheagedGateList",
              query: {
                code: this.breadCrumbCodes,
                title: "智能设备监测大数据统计分析"
              }
            }
          }
        ];
      }
      return data;
    }
  },

  components: {
    NormLayout,
    MessageItem
  }
};
</script>

<style lang="less" scoped>
.older-content {
  height: 2.1rem;
}
</style>
