<template>
  <div class="older-page_bg">
    <page-header title="智能设备监测大数据统计分析"></page-header>
    <div class="older-container">
      <div class="left-panels">
        <equipment-type :equipmentData="equipmentTypeMap"></equipment-type>
        <install-type :installData="installWayMap"></install-type>
        <oldtype-install
          :chartsData="devicesSexMap"
          :equipmentSexMap="equipmentSexMap"
        ></oldtype-install>
      </div>
      <div class="centre-panels">
        <install-device></install-device>
        <equipment-warning :warningMap="warningMap"></equipment-warning>
        <gate-warning :warningMap="equipmentWarningMap"></gate-warning>
      </div>
      <div class="right-panels">
        <warning-type :warnTypeMap="warnInfoMap"></warning-type>
        <warning-time :warnTimeMap="warnTimeMap" :equipmentWarnTimeMap="equipmentWarnTimeMap"></warning-time>
        <equipment-record></equipment-record>
      </div>
    </div>
    <Menu></Menu>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :modal="false"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      center
    >
      <span class="textare" v-html="warningText"></span>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="stateText"
        maxlength="30"
        show-word-limit
        v-if="stateVisible"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleState" v-if="!stateVisible"
          >催 办</el-button
        >
        <el-button type="primary" @click="handleSuccess" v-if="stateVisible"
          >确 定</el-button
        >
        <el-button
          type="primary"
          @click="dialogVisible = false"
          v-if="stateVisible"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PageHeader from "@/views/OlderDistribution/components/PageHeader/header";
import EquipmentType from "./components/EquipmentType/index";
import OldtypeInstall from "./components/OldtypeInstall/index";
import InstallType from "./components/InstallType/index";
import EquipmentWarning from "./components/EquipmentWarning/index";
import GateWarning from "./components/GateWarning/index";
import WarningType from "./components/WarningType/index";
import WarningTime from "./components/WarningTime/index";
import EquipmentRecord from "./components/EquipmentRecord/index";
import InstallDevice from "./components/InstallDevice/index";
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import { mapGetters } from "vuex";
import Menu from "@/views/OlderDistribution/components/Menu";
import {
  getSmartDevicesEquipmentService,
  getSmartDevicesEquipmentServiceSecond,
  getAlarmPopoverInfo,
  getRemindersService
} from "./apis/index";

export default {
  name: "SmartdeviceStatisticsNew",
  data() {
    return {
      dialogVisible: false,
      stateVisible: false,
      stateText: "",
      warningText: "",
      stateId: "",
      title: "预警信息超时未处理",
      equipmentTypeMap: {},
      installWayMap: {},
      devicesSexMap: [],
      warningMap: [],
      equipmentWarningMap: {},
      warnInfoMap: {},
      warnTimeMap: [],
      equipmentWarnTimeMap: [],
      equipmentSexMap: [],
      timer: null
    };
  },

  computed: {
    ...mapGetters(["typeNew", "codeNew"]),
    params() {
      let params = {};
      const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0];

      return params;
    }
  },

  watch: {
    codeNew(newVal, oldVal) {
      // console.log("111"); // 执行了两次 why?
      this.debounce(this.getDevicesService, 1000);
    }
  },

  created() {
    this.getAlarmPopoverInfo();
    this.timer = setInterval(() => {
      this.getAlarmPopoverInfo();
    }, 20000);
  },

  methods: {
    handleSuccess() {
      this.title = "预警信息超时未处理";
      this.dialogVisible = false;
      this.stateVisible = false;
      let form = {
        id: this.stateId,
        overtimeState: "已超时",
        expediteRecord: this.stateText
      };
      // 催办请求
      getRemindersService(form).then(res => {
        if (res) {
          this.$message({
            message: "催办成功",
            type: "success"
          });
        }
        this.getAlarmPopoverInfo();
      });
      this.stateText = "";
    },
    // 获取警告信息弹框信息
    getAlarmPopoverInfo() {
      getAlarmPopoverInfo().then(res => {
        if (res.data) {
          // console.log(res.data.alarmRemindInfoMap)
          const {
            userName,
            alarmTime,
            alarmContent,
            gridMember,
            gridPhone,
            id
          } = res.data.alarmRemindInfoMap && res.data.alarmRemindInfoMap;
          this.dialogVisible = true;
          this.stateId = id;
          this.warningText =
            userName +
            "&nbsp;" +
            alarmTime +
            "&nbsp;" +
            alarmContent +
            "," +
            "&nbsp;" +
            "网格员：" +
            gridMember +
            "&nbsp;" +
            "联系电话：" +
            gridPhone;
        }
        res.data.remindFalg !== ""
          ? (this.dialogVisible = false)
          : (this.dialogVisible = true);
      });
    },
    // 催办
    handleState() {
      this.title = "催办记录";
      this.stateVisible = true;
    },
    // 获取左侧数据
    getDevicesService() {
        debugger
      // console.log('111'); // watch 里面加入了防抖函数 此时只输出 1次 111
      getSmartDevicesEquipmentService(this.params).then(res => {
        if (res.data) {
          let {
            equipmentTypeMap,
            installWayMap,
            devicesSexMap,
            warningMap,
            equipmentSexMap
          } = res.data;
          this.equipmentTypeMap = equipmentTypeMap;
          this.equipmentSexMap = equipmentSexMap || [];
          this.installWayMap = installWayMap[0];
          this.devicesSexMap = devicesSexMap;
          this.warningMap = warningMap;
        }
      });
      // 获取右侧数据
      getSmartDevicesEquipmentServiceSecond(this.params).then(res => {
        if (res.data) {
          let { equipmentWarningMap, warnInfoMap, warnTimeMap, equipmentWarnTimeMap } = res.data;
          this.equipmentWarningMap = equipmentWarningMap[0];
          this.warnInfoMap = warnInfoMap[0];
          this.warnTimeMap = warnTimeMap;
          this.equipmentWarnTimeMap = equipmentWarnTimeMap;

          this.equipmentWarnTimeMap.forEach(item => {
            this.warnTimeMap.forEach(i=> {
              if(item.warnTime == i.warnTime) {
                item.warnTotal = item.warnTotal + i.warnTotal;
              }
            })
          })
        }
      });
    },

    debounce(fn, wait) {
      if (this.fn !== null) {
        clearTimeout(this.fn);
      }
      this.fn = setTimeout(fn, wait);
    }
  },

  destroyed() {
    clearInterval(this.timer);
  },

  components: {
    PageHeader,
    Menu,
    GateWarning,
    EquipmentType,
    InstallType,
    OldtypeInstall,
    EquipmentWarning,
    WarningType,
    WarningTime,
    EquipmentRecord,
    InstallDevice,
    NormLayout
  }
};
</script>

<style lang="less" scoped>
.older-page_bg {
  min-height: 100%;
  font-size: initial;
  user-select: none;
  background-image: url("~@/views/OlderDistribution/assets/img/older-page_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /deep/ .el-dialog {
    margin-top: 40vh !important;
    background: #243e63;
    z-index: 99999;
    min-height: 1.7rem;
    max-height: 3.5rem;
  }
  /deep/ .el-textarea {
    margin-top: 0.2rem;
  }
  /deep/ .el-dialog__body {
    padding-top: 0.8rem;
    color: #ffffff;
  }
  /deep/ .el-dialog__header {
    height: 0.53rem;
    background-color: #80b5ff;
    display: flex;
    font-family: MicrosoftYaHeiUI-Bold;
  }
  /deep/ .el-dialog__title {
    color: #ffffff;
    font-size: 0.18rem;
    line-height: 0.53rem;
    font-weight: bold;
    padding-left: 0.3rem;
  }
  /deep/ .el-dialog__headerbtn {
    font-size: 0.33rem;
    top: 9px;
  }
  /deep/ .el-dialog__headerbtn .el-dialog__close {
    color: #ffffff;
  }
  /deep/ .detial_content {
    padding: 0.53rem 3%;
  }
}
.older-container {
  display: flex;
  height: 100%;
  margin: 0 1.58%;
  .left-panels,
  .right-panels {
    width: 6.5rem;
    height: 10.1rem;
    padding: 1% 1% 0 1%;
    box-sizing: border-box;
    z-index: 3;
    margin-top: -0.2rem;
  }
  .left_top {
    height: 1.2rem;
    width: 100%;
    line-height: 1.2rem;
    font-size: 0.25rem;
    color: #28e1fe;
    padding-left: 0.4rem;
    font-weight: 600;
  }
  .centre-panels {
    flex: 1;
    height: 10.1rem;
    padding: 0 2%;
  }
  .bread {
    position: fixed;
    top: 6%;
    left: 1%;
  }
}
</style>

<style>
.el-message {
  min-width: 4rem;
}
.el-message__content {
  font-size: 0.18rem;
}
.el-icon-success {
  font-size: 0.3rem !important;
}
</style>
