<template>
  <div class="tablewrapper">
    <p>
      <i :class="['iconfont', icon]"></i>
      <span>{{title }}</span>
    </p>
    <div v-if="row" class="tablebox">
      <ul
        v-for="(item, index) in infoData"
        :key="'box_row_' + index"
        class="content_box content_box_row"
      >
        <li v-for="(_item, _index) in item" :key="'li_' + _index">
          <span class="content_title">{{ _item.title }}</span>
         
          <span
        
            class="content_value"
            :title="listData[_item.key] ? listData[_item.key] : ''"
            >{{ listData[_item.key] ? listData[_item.key] : "-" }}</span
          >
        </li>
      </ul>
    </div>
    <ul v-else class="content_box">
      <li v-for="(item, index) in infoData" :key="index">
        <span class="content_title">{{ item.title }}</span>
        <!-- <span v-if="item.title=='高血压'">√</span> -->
        <!-- <span v-if="item.title=='高血压'">患病时间</span> -->
        <span v-if="['待遇类别','状态'].includes(item.title) ">{{
          dyType(listData[item.key])
        }}</span>
        <span
          v-else
          class="content_value"
          :title="listData[item.key] ? listData[item.key] : ''"
          >{{ listData[item.key] ? listData[item.key] : "-" }}</span
        >
      </li>
    </ul>
    <div class="samll_border lt"></div>
    <div class="samll_border rt"></div>
    <div class="samll_border lb"></div>
    <div class="samll_border rb"></div>
    <div class="light_line top"></div>
    <div class="light_line bottom"></div>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "基本情况",
    },
    icon: {
      type: String,
      default: "iconrencaiyinjin",
    },
    infoData: {
      type: Array,
    },
    listData: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    dyType(e) {
      let name;
      switch (e) {
        case "170":
          name = "城乡";
          break;
        case "110":
          name = "企业";

          break;
        case "120":
          name = "事业";
          break;
        case "0":
          name = "正常";
          break;
        case "1":
          name = "死亡";
          break;
        default:
          break;
      }
      return name;
    },
  },
};
</script>

<style scoped>
.tablewrapper {
  background-color: rgba(2, 29, 80, 0.6);
  font-size: 0.14rem;
  color: #fff;
}
.tablewrapper p {
  font-size: 0.2rem;
  color: rgba(0, 129, 253, 1);
  line-height: 0.6rem;
  padding-left: 0.3rem;
  overflow: hidden;
}
.tablewrapper p i {
  margin-right: 0.1rem;
  font-size: 0.26rem;
  float: left;
}
.tablewrapper p span {
  float: left;
}
.tablebox {
  display: flex;
}
.content_box li {
  line-height: 0.45rem;
  height: 0.45rem;
  padding-left: 0.1rem;
}
.content_box li:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.05);
}
.content_box_row {
  flex: 1;
  width: 33%;
  position: relative;
}
.content_box_row:not(:last-child)::before {
  content: "";
  background: url("../../../assets/img/light_right.png") 100% 100% no-repeat;
  position: absolute;
  width: 2px;
  height: 100%;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.content_title {
  float: left;
  color: rgba(208, 231, 255, 1);
  text-align: right;
  width: 30%;
  height: 0.45rem;
  margin-right: 5%;
}
.content_value {
  max-width: 65%;
  float: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.samll_border {
  width: 0.12rem;
  height: 0.12rem;
  border: 2px solid rgba(0, 178, 254, 1);
  position: absolute;
}
.samll_border.lt {
  border-bottom: 0;
  border-right: 0;
  top: -1px;
  left: -1px;
}
.samll_border.rt {
  border-bottom: 0;
  border-left: 0;
  right: -1px;
  top: -1px;
}
.samll_border.lb {
  border-top: 0;
  border-right: 0;
  left: -1px;
  bottom: -1px;
}
.samll_border.rb {
  border-top: 0;
  border-left: 0;
  right: -1px;
  bottom: -1px;
}
.light_line {
  width: 100%;
  height: 2px;
  background: url("../../../assets/img/bg_line.png") 100% 100% no-repeat;
  background-size: cover;
  position: absolute;
}
.light_line.top {
  top: -1px;
}
.light_line.bottom {
  bottom: -1px;
}
</style>
