<template>
  <div class="look_container">
    <div class="tip_item" v-for="(item, index) in legendData" :key="index">
      <img
        :src="require(`@/views/OlderDistribution/assets/img/${item.icon}.png`)"
        class="tip_img"
        alt=""
      />
      <span>{{ item.text }}</span>
      <div class="tip_look">
        <img
          :src="
            require(`@/views/OlderDistribution/assets/img/${
              item.show ? 'look_true' : 'look_false'
            }.png`)
          "
          alt=""
          @click="changeStatus(item, index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CheckLegend",
  data() {
    return {
      legendData: [
        { text: "适老化公园福一把", icon: "tip_yellow", show: true },
        // { text: "独居", icon: "tip_blue", show: true },
        // { text: '失独', icon: 'tip_green', show: false },
        { text: "楼道休息椅", icon: "tip_green", show: false },
        { text: "入户改造", icon: "tip_red", show: false }
        // { text: '残疾人', icon: 'tip_pink', show: false }
      ]
    };
  },

  mounted() {
    this.initLegend();
  },

  watch: {
    typeNew(newType) {
      return newType;
    }
  },

  computed: {
    ...mapGetters(["typeNew"])
  },
  
  methods: {
    // 获取图例数据
    getLegendData() {
      return this.legendData;
    },
    initLegend() {
      for (let index = 0; index < this.legendData.length; index++) {
        const item = this.legendData[index];
        this.$emit("checkShow", index + 1, item.show);
      }
    },
    changeStatus(item, index) {
      if (item.show) {
        item.show = false;
      } else {
        item.show = true;
      }
      // 如果是街道或者社区级别
      if (this.typeNew >= 2) {
        this.$emit("addPieChart", this.legendData);
      } else {
        // 如果是河西区级别
        this.$emit("checkShowHexiQu", index + 1, item.show);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.look_container {
  width: 1.9rem;
  height: 1.7rem;
  background: url("~@/views/OlderDistribution/assets/img/look-legend_bg.png");
  background-repeat: round;
  background-size: contain;
  position: absolute;
  top: 10%;
  right: 7%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 0.13rem;
  padding-top: 0.13rem;
  z-index: 999;
  padding-left: 0.33rem;
  .tip_item {
    font-size: 0.15rem;
    color: #ffffff;
    margin-bottom: 0.15rem;
    display: flex;
    line-height: 0.15rem;
    align-items: center;
    .tip_img {
      width: 0.24rem;
      height: 0.24rem;
      margin-right: 0.14rem;
    }
    .tip_look {
      width: 0.22rem;
      height: 0.15rem;
      margin-left: 0.1rem;
      img {
        width: 100%;
        height: 100%;
      }
      :hover {
        cursor: pointer;
      }
    }
  }
}
</style>
