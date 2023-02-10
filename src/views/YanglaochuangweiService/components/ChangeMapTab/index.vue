<template>
  <div class="tab-content">
    <div
      :class="[activeIndex === index ? 'tabMain active' : 'tabMain']"
      v-for="(item, index) in tabData"
      :key="index"
      @click="getOldManTab(index + 1)"
      @mouseover="changeHover(index)"
    >
      <p class="content">{{ item }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MapTab",
  components: {},
  data() {
    return {
      tabData: ["老年人分布情况", "重点关注老人分布"],
      activeIndex: 0
    };
  },
  
  computed: {
    ...mapGetters(["typeNew", "userType", "userName", "codeNew"])
  },

  props: {},

  methods: {
    getOldManTab(bussineType) {
      this.$emit("changeLevel1", bussineType);
      this.$emit("setLegendShow", bussineType);
    },
    changeHover(bussineType) {
      this.activeIndex = bussineType;
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.tab-content {
  display: flex;
  flex-direction: row;
  padding-top: 0.06rem;
  padding-left: 0.4rem;
  padding-right: 0.6rem;
  height: 0.5rem;
  width: 38%;
  justify-content: center;
  pointer-events: auto;
}
.tabMain {
  height: 0.5rem;
  width: 1.83rem;
  text-align: center;
  line-height: 0.3rem;
  font-family: MicrosoftYaHei;
  font-size: 0.14rem;
  color: #ffffff;
  //border-radius: 5px;
  background: url("../../../../assets/img/oldMan_tab.png") no-repeat;
  background-size: contain;
  // :hover {
  //   cursor: pointer;
  //   text-align: center;
  //   background: url("../../../../assets/img/oldMan_tab_select.png") !important;
  //   // background-size: cover;
  //   font-family: MicrosoftYaHei-Bold;
  //   font-size: 0.18rem;
  //   color: #16fff1;
  // }
}
.tabMain:nth-child(2) {
  margin: 0 0.4rem;
}
.active {
  cursor: pointer;
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.16rem;
  color: #16fff1;
  box-sizing: border-box;
  border-bottom: 2px solid #16fff1;
}
.content {
  margin-top: 0.08rem;
  margin-bottom: 0.08rem;
  font-size: .12rem;
  overflow: hidden;
}
</style>
