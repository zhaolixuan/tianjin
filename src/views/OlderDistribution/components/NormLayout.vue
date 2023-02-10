<template>
  <div class="page-header">
    <div class="top_text">
      <div class="link">
        <p v-if="linkArr">
          <router-link :to="item.path || '#'" v-for="(item,index) in linkArr" :key="index">
            <!-- <span>{{item.label + (index < linkArr.length-1 ? '——' : '')}}</span> -->
            <!-- &lt; 代替 -->
            <span>{{item.label + (index &lt; linkArr.length-1 ? '——' : '')}}</span>
          </router-link>
        </p>
        <router-link :to="path || (addPath || '')" :target="target">
          <span>{{text}}</span><span class="describution">{{ describution }}</span>
        </router-link>
        <span class="top_title" v-if="subhead">{{subhead}}</span>
      </div>
      <p v-if="unit" class="top_unit">单位: {{unit}}</p>
      <div class="older-tab" v-if="tab_item">
        <p
          :class="[activeIndex === index ? 'tab_item active' : 'tab_item']"
          v-for="(item,index) in tab_item"
          :key="index"
          @click="handleTab(index)"
        >{{item}}</p>
      </div>
      <router-link v-if="routerPath" :to="routerPath" target="_blank">
        <p class="top_link">{{routerPath.query.text || '更多 》'}}</p>
      </router-link>
      <!-- 8月24新增 -->
      <span v-if="routeToFromFrequency">
        <p class="top_link FromFre" v-on:click="handleAdd">{{'更多 》'}}</p>
      </span>
    </div>
    <img
      v-if="flag && flag !== null"
      src="@/views/OlderDistribution/assets/img/header-bottom_bg.png"
      alt
    />
    <img
      v-if="!flag && flag !== null"
      src="@/views/OlderDistribution/assets/img/header_max_bg.png"
      alt
    />
  </div>
</template>

<script>
export default {
  name: 'Normlayout',
  data () {
    return {
      tabData: ['天', '周', '月'],
      activeIndex: 0,
      timer: null,
      acitveBol: false,
      routeToFromFrequencyData:null,
    }
  },
  props: {
    text: {
      type: String,
      default: () => ''
    },
    unit: {
      type: String,
      default: () => ''
    },
    subhead: {
      type: String,
      default: () => ''
    },
    path: {
      type: String,
      default: () => ''
    },
    flag: {
      type: Boolean,
      default: () => true
    },
    routerPath: {
      type: Object,
      default: () => {}
    },
    addPath: {
      type: Object,
      default: () => {}
    },
    tab_item: {
      type: Array,
      default: () => []
    },
    target: {
      type: String,
      default: () => '_parent'
    },
    intever: {
      type: Boolean,
      default: () => false
    },
    linkArr: {
      type: Array,
      default: () => []
    },
    routeToFromFrequency:{
      type:Number,
    },
    describution:{
      type:String,
    }
  },
  methods: {
    // tab切换
    handleTab (index) {
      this.activeIndex = index
      this.$emit('getActiveIndex', this.activeIndex)
    },
    handleAdd(){
      this.routeToFromFrequencyData++;
      this.$emit('routeToFromFrequency',this.routeToFromFrequencyData)
    }
  },
  mounted () {
    /**
     * @this.intever: 间隔三秒循环切换tab按钮 为@true tab循环切换
     */
    this.intever
      ? (this.timer = setInterval(() => {
        this.acitveBol ? this.activeIndex-- : this.activeIndex++
        if (this.activeIndex === 2) {
          this.acitveBol = true
        }
        if (this.activeIndex === 0) {
          this.acitveBol = false
        }
        this.handleTab(this.activeIndex)
      }, 3000))
      : (this.timer = null);

    // 8月24日新增
    this.routeToFromFrequencyData = this.routeToFromFrequency
  },
  destroyed () {
    clearInterval(this.timer)
  },
}
</script>

<style lang="less" scoped>
.page-header {
  width: 100%;
  min-height: 0.4rem;
  display: flex;
  flex-direction: column;
  .top_text {
    height: 0.2rem;
    font-family: MicrosoftYaHei-Bold;
    a {
        color: #68f4ff;
      }
    .link {
      color: #68f4ff;
      font-size: 0.2rem;
      font-weight: bold;
      padding-left: 0.4rem;
      float: left;
      position: relative;
      .top_title {
        font-size: 0.15rem;
        font-weight: 400;
        margin-left: 0.5rem;
      }
      .describution{
        position: absolute;
        display: block;
        width: 2.5rem;
        left: 3.0rem;
        bottom: 0rem;
      }
    }
    img {
      width: 100%;
    }
    .top_unit {
      float: right;
      font-size: 0.13rem;
      margin-top: 0.1rem;
      margin-right: 0.1rem;
      color: #28e1fe;
      opacity: 0.7;
      font-weight: 100;
    }
    .top_link {
      float: right;
      background: url("~@/assets/img/oldMan_tab.png") no-repeat;
      background-size: 100% 100%;
      width: 1.2rem;
      height: 0.33rem;
      font-size: 0.13rem;
      text-align: center;
      line-height: 0.33rem;
      padding-left: 0;
      margin-top: -0.1rem;
      font-weight: 400;
      position: relative;
      z-index: 99;
    }
    // 8月24日新增
    .FromFre{
      color: #28e1fe;
      cursor: pointer;
    }
    .older-tab {
      margin-left: 0.5rem;
      float: left;
      display: flex;
      .tab_item {
        font-weight: 400;
        height: 0.25rem;
        min-width: 0.5rem;
        padding: 1.5px 5px;
        border: 1px solid #00cefe;
        text-align: center;
        line-height: 0.25rem;
        color: rgba(104, 244, 255, 0.7);
        font-size: 0.15rem;
        opacity: 0.7;
      }
      .active {
        border: 1px solid #68f4ff;
        color: #68f4ff;
        opacity: 1;
      }
      a {
        color: #68f4ff;
      }
    }
  }
}
</style>
