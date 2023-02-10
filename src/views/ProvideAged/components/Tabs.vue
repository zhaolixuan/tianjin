<template>
  <div>
    <div class="tab-pane-container">
      <span class="tab-container-before"></span>
      <div class="tab-panes">
        <span
          :class="active === item.label ? 'tab-pane active' : 'tab-pane'"
          v-for="item in tanPanels"
          :key="item.label"
          @click="handelClick(item)"
        >
          <span class="tab-pane-before"></span>
          <span class="tab-pane-label">{{ item.label }}</span>
          <span class="tab-pane-after"></span>
        </span>
      </div>
      <span class="tab-container-after"></span>
    </div>
    <div class="tab-pane-content">
      <component :is="name"></component>
    </div>
    <div class="tab-pane-content-bottom"></div>
  </div>
</template>

<script>
import OldAge from "./TabAll/OldAge.vue";
import MedicalTab from "./TabAll/MedicalTab";
import BufferTab from "./TabAll/BufferTab";
import ProvsionTab from "./TabAll/ProvsionTab";
import ServiceDay from "./TabAll/ServiceDayTab";
import ServiceTab from "./TabAll/ServiceTab.vue";

export default {
  name: "Tabs",
  data() {
    return {
      name: OldAge,
      active: "老年人信息",
      tanPanels: [
        { label: "老年人信息", component: OldAge },
        { label: "助餐需求", component: BufferTab },
        { label: "医疗需求", component: MedicalTab },
        { label: "家政需求", component: ProvsionTab }
        // { label: '实时运营服务数据', component: ServiceTab },
        // { label: '本日运营服务数据', component: ServiceDay }
      ]
    };
  },

  methods: {
    handelClick(item) {
      this.active = item.label;
      this.name = item.component;
      this.$emit("update:label", this.active);
    }
  }
};
</script>

<style lang="less" scoped>
.tab-pane-container {
  display: flex;
  height: 0.45rem;
  background-size: 100% 100%;
  .tab-container-before,
  .tab-container-after {
    height: 100%;
    background-size: 100% 100%;
  }
  .tab-container-before {
    width: 0.45rem;
    background-image: url("../assets/tab-container-before.png");
  }
  .tab-container-after {
    width: 1.52rem;
    background-image: url("../assets/tab-container-after.png");
  }
  .tab-panes {
    display: flex;
    width: calc(100% - 1.97rem);
    background-size: 100% 100%;
    background-image: url("../assets/tab-panes_bg.png");
  }
  .tab-pane {
    display: flex;
    position: relative;
    margin-left: -0.45rem;
    line-height: 0.45rem;
    font-size: 0.166rem;
    color: rgba(1, 106, 255, 1);
    cursor: pointer;
    .tab-pane-before,
    .tab-pane-label,
    .tab-pane-after {
      height: 100%;
      background-size: 100% 100%;
    }
    .tab-pane-before {
      width: 0.45rem;
      background-image: url("../assets/tab-pane-before_bg.png");
    }
    .tab-pane-label {
      padding: 0 0.1rem;
      background-size: 100% 100%;
      background-image: url("../assets/tab-pane_bg.png");
    }
    .tab-pane-after {
      width: 0.44rem;
      background-size: 100% 110%;
      background-image: url("../assets/tab-pane_bg.png");
    }
    &:first-child {
      margin-left: -0.45rem;
    }
    &:last-child {
      .tab-pane-after {
        background-size: 100% 100%;
        background-image: url("../assets/tab-pane-after_bg.png");
      }
    }
    &.active {
      color: rgba(201, 238, 255, 1);
      .tab-pane-before {
        background-image: url("../assets/tab-pane-before-active_bg.png");
      }
      .tab-pane-label {
        background-image: url("../assets/tab-pane-active_bg.png");
      }
      .tab-pane-after {
        background-size: 100% 100%;
        background-image: url("../assets/tab-pane-after-active_bg.png");
      }
    }
  }
}
.tab-pane-content {
  min-height: 8.626rem;
  background-size: 100% 100%;
  background-image: url("../assets/tab-pane-content_bg.png");
}
.tab-pane-content-bottom {
  width: 100%;
  height: 0.3rem;
  background-size: 100% 100%;
  background-image: url("../assets/tab-pane-content-bottom_bg.png");
}
</style>
