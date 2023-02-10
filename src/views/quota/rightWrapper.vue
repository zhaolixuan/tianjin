<template>
  <div class="right-wrapper">
    <section class="head">
      <div class="head-left">
        <el-input
          placeholder="请输入搜索内容"
          v-model.trim="searchValue"
          clearable
          @clear="cancelRadio"
          @keyup.enter.native="getSearchValue"
        >
          <el-button slot="append" icon="el-icon-search" @click="getSearchValue"></el-button>
        </el-input>
      </div>
      <div class="head-right">
        <el-radio-group v-model="hotWord" @change="getHotWordValue">
          <el-radio-button
            v-for="(word,index) in hotWords"
            :key="index"
            :label="word"
            :title="word"
          ></el-radio-button>
        </el-radio-group>
      </div>
    </section>
    <section>
      <div class="term">
        <div @click.prevent="sortByDefault" :class=" sortProperty===''? 'active':''">
          <i class="iconfont iconmorenpaixu"></i>
          <span class="cantchoose">默认排序</span>
        </div>
        <div @click.prevent="sortByFinish" :class=" sortProperty==='finishDegree'? 'active':''">
          <i
            :class="['iconfont',sortFinishType === 0?'iconanwanchengdupaixu':'iconanwanchengdupaixu1']"
          ></i>
          <span class="cantchoose">按完成度排序</span>
        </div>
        <div @click.prevent="sortByName" :class="sortProperty==='issuesName'? 'active':''">
          <i
            :class="['iconfont',sortNameType === 0?'iconanmingchengpaixu':'iconanmingchengpaixu1']"
          ></i>
          <span class="cantchoose">按名称排序</span>
        </div>
      </div>
      <div class="center">
        <div class="tab-content">
          <el-tabs v-model="activeName" type="border-card" @tab-click="queryData" :stretch="true">
            <el-tab-pane
              v-for="(items,index) in typeList"
              :key="index"
              :name="items.typeName"
              :label="items.typeName"
            >
              <!--<vue-scroll :ops="ops">-->
              <!--</vue-scroll>-->
              <ul class="data-wrapper">
                <li
                  v-for="(item,index) in listInfo"
                  :key="index"
                  @click="openResultDialog(item)"
                  :class="[(item.ctype === 1 )? 'one' : 'two']"
                >
                  <!-- <div v-if="item.showType === 0" class="content1">
                    <div class="data-content" >
                      <div class="first">
                        <div class="title">
                          <el-badge :is-dot="item.unread" class="item">
                            <img src="../../assets/img/invalidName@3x.png"/>
                          </el-badge>
                        </div>
                        <div class="name">{{item.indexName}}</div>
                      </div>
                      <div class="second">
                        <P>
                          <span style="color: #ff5601;font-weight: bold;font-size: .24rem"
                                v-if="item.currentValue!== '' && item.currentValue!== null">{{item.currentValue}}</span>
                          <span style="color: #ff5601;font-weight: bold;font-size: .24rem"
                                v-else-if="item.currentValue=== '' || item.currentValue=== null">0</span>
                          <span>/</span>
                          <span v-if="item.goalValue!== '' && item.goalValue !==null">{{item.goalValue}}</span>
                          <span v-else-if="item.goalValue === '' || item.goalValue ===null">0</span>
                        </P>
                        <p v-if="item.chainRatio !== '' && item.chainRatio !== null && item.chainRatio >0 " style="color: #59e9fa;line-height: .3rem" >环比{{item.chainRatio}}%
                          <img style="width: .11rem;height: .11rem" src="../../assets/img/newTop.png"/>
                        </p>
                        <p v-else-if="item.chainRatio !== '' && item.chainRatio !== null && item.chainRatio < 0" style="color: #59e9fa;line-height: .3rem">环比{{item.chainRatio}}%
                          <img style="width: .11rem;height: .11rem" src="../../assets/img/newDown.png"/>
                        </p>
                        <p v-else style="color: #59e9fa;line-height: .3rem">环比0%&nbsp;一
                          <img style="width: .1rem;height: .02rem;padding-bottom: .04rem " src="../../assets/img/newLine.png"/>
                        </p>
                        <p style="line-height: .3rem">{{item.time}}</p>
                      </div>
                      <div class="third" v-if="item.indexStatus === '0' || item.indexStatus === '4'">
                        <div class="up" v-if="item.finishDegree!=='' && item.finishDegree!==null">
                          <el-progress :text-inside="true" :stroke-width="5" :percentage="Number(item.finishDegree)" :show-text="false"></el-progress>
                        </div>
                        <div class="up" v-else-if="item.finishDegree==='' || item.finishDegree===null">
                          <el-progress :text-inside="true" :stroke-width="5" :percentage="0" :show-text="false"></el-progress>
                        </div>
                        <div class="middle" v-if="item.planDegree!=='' && item.planDegree!==null">
                          <el-progress :text-inside="true" :stroke-width="5" :percentage="Number(item.planDegree)" :show-text="false"></el-progress>
                        </div>
                        <div class="middle" v-else-if="item.planDegree==='' || item.planDegree===null">
                          <el-progress :text-inside="true" :stroke-width="5" :percentage="0" :show-text="false"></el-progress>
                        </div>
                      </div>
                      <div class="thirdError" v-if="item.indexStatus === '1' || item.indexStatus === '2'||item.indexStatus === '3'">
                        <div class="up" v-if="item.finishDegree!=='' && item.finishDegree!==null">
                          <el-progress :text-inside="true" :stroke-width="5"  :percentage="Number(item.finishDegree)" :show-text="false"></el-progress>
                        </div>
                        <div class="up" v-else-if="item.planDegree!=='' || item.planDegree!==null">
                          <el-progress :text-inside="true" :stroke-width="5"  :percentage="0" :show-text="false"></el-progress>
                        </div>
                        <div class="middle" v-if="item.finishDegree!=='' && item.finishDegree!==null">
                          <el-progress :text-inside="true" :stroke-width="5" :percentage="Number(item.planDegree)" :show-text="false"></el-progress>
                        </div>
                        <div class="middle" v-else-if="item.planDegree!=='' || item.planDegree!==null">
                          <el-progress :text-inside="true" :stroke-width="5" :percentage="0" :show-text="false"></el-progress>
                        </div>
                      </div>
                    </div>
                    <div class="two" v-if="item.indexStatus === '0' &&(((item.finishDegree/item.planDegree)>=0.2) && ((item.finishDegree/item.planDegree)<0.4))"></div>
                    <div class="three" v-if="item.indexStatus === '0' &&(((item.finishDegree/item.planDegree)>=0.4) && ((item.finishDegree/item.planDegree)<0.6))"></div>
                    <div class="four" v-if="item.indexStatus === '0' &&(((item.finishDegree/item.planDegree)>=0.6) && ((item.finishDegree/item.planDegree)<0.8))"></div>
                    <div class="success" v-if="item.indexStatus === '0' &&(((item.finishDegree/item.planDegree)>=0.8) && ((item.finishDegree/item.planDegree)<=1))"></div>
                    <div class="success" v-if="item.indexStatus === '4'"></div>
                    <div class="error" v-if="item.indexStatus === '1'||item.indexStatus === '2'||item.indexStatus === '3'"></div>
                  </div>-->
                  <div class="content2">
                    <div :class="['data-content',item.restTime === '超期'?'warning':'nomral']">
                      <div class="first">
                        <div class="title">
                          <img src="../../assets/img/invalidName@3x.png" />
                          <!-- <el-badge :is-dot="item.unread" class="item">
                            <img src="../../assets/img/invalidName@3x.png" />
                          </el-badge>-->
                        </div>
                        <p>{{timeFormatting(item.fillTime?item.fillTime:item.createTime)}}</p>
                      </div>
                      <div class="second">
                        <p class="des">{{item.issuesName}}</p>
                      </div>
                      <div class="third" v-if="item.restTime !== '超期'">
                        <div class="up" v-if="item.finishDegree!=='' && item.finishDegree!==null">
                          <el-progress
                            :text-inside="true"
                            :stroke-width="5"
                            :percentage="Number(item.finishDegree.split('%')[0])"
                            :show-text="false"
                          ></el-progress>
                        </div>
                        <!-- <div
                          class="up"
                          v-else-if="item.finishDegree==='' || item.finishDegree===null"
                        >
                          <el-progress
                            :text-inside="true"
                            :stroke-width="5"
                            :percentage="0"
                            :show-text="false"
                          ></el-progress>
                        </div>-->
                        <!-- <div class="middle" v-if="item.planDegree!=='' && item.planDegree!==null">
                          <el-progress
                            :text-inside="true"
                            :stroke-width="5"
                            :percentage="Number(item.planDegree)"
                            :show-text="false"
                          ></el-progress>
                        </div>
                        <div
                          class="middle"
                          v-else-if="item.planDegree==='' || item.planDegree===null"
                        >
                          <el-progress
                            :text-inside="true"
                            :stroke-width="5"
                            :percentage="0"
                            :show-text="false"
                          ></el-progress>
                        </div>-->
                      </div>
                      <div class="thirdError" v-else>
                        <div class="up" v-if="item.finishDegree!=='' && item.finishDegree!==null">
                          <el-progress
                            :text-inside="true"
                            :stroke-width="5"
                            :percentage="Number(item.finishDegree)"
                            :show-text="false"
                          ></el-progress>
                        </div>
                        <!-- <div
                          class="up"
                          v-else-if="item.finishDegree==='' || item.finishDegree===null"
                        >
                          <el-progress
                            :text-inside="true"
                            :stroke-width="5"
                            :percentage="0"
                            :show-text="false"
                          ></el-progress>
                        </div>
                        <div class="middle" v-if="item.planDegree!=='' && item.planDegree!==null">
                          <el-progress
                            :text-inside="true"
                            :stroke-width="5"
                            :percentage="Number(item.planDegree)"
                            :show-text="false"
                          ></el-progress>
                        </div>
                        <div
                          class="middle"
                          v-else-if="item.planDegree==='' || item.planDegree===null"
                        >
                          <el-progress
                            :text-inside="true"
                            :stroke-width="5"
                            :percentage="0"
                            :show-text="false"
                          ></el-progress>
                        </div>-->
                      </div>
                    </div>
                    <!-- <div
                      class="two"
                      v-if="item.indexStatus === '0' &&(((item.finishDegree/item.planDegree)>=0.2) && ((item.finishDegree/item.planDegree)<0.4))"
                    ></div>
                    <div
                      class="three"
                      v-if="item.indexStatus === '0' &&(((item.finishDegree/item.planDegree)>=0.4) && ((item.finishDegree/item.planDegree)<0.6))"
                    ></div>
                    <div
                      class="four"
                      v-if="item.indexStatus === '0' &&(((item.finishDegree/item.planDegree)>=0.6) && ((item.finishDegree/item.planDegree)<0.8))"
                    ></div>
                    <div
                      class="success"
                      v-if="item.indexStatus === '0' &&(((item.finishDegree/item.planDegree)>=0.8) && ((item.finishDegree/item.planDegree)<=1))"
                    ></div>
                    <div class="success" v-if="item.indexStatus === '4'"></div>-->
                    <!-- <div class="error" v-if="item.restTime === '超期'"></div> -->
                  </div>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </section>
    <section>
      <div class="page">
        <p class="des">进行中</p>
        <p class="num">{{searchData && searchData.underwayCount}}</p>
        <p>/</p>
        <p class="des">共计{{searchData && searchData.totalCount}}</p>
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="12"
          :current-page.sync="currentPage"
          background
          layout="prev, pager, next"
          :total="searchData && searchData.totalCount"
        ></el-pagination>
      </div>
    </section>
    <resultDialog ref="rDialog" @watchchild="handleCurrentChange"></resultDialog>
  </div>
</template>

<script>
import resultDialog from "./resultDialog";
export default {
  name: "rightWrapper",
  props: ["searchData", "hotWordList", "typeList"],
  data() {
    return {
      listInfo: [],
      hotWords: [],
      searchValue: "",
      hotWord: "全部",
      activeName: "全类别",
      currentPage: 1,
      sortProperty: "", //排序方式：finishDegree按完成度，issuesName按名称，空为默认
      sortFinishType: 0, //完成度排序顺序：0升序，1降序
      sortNameType: 0 //名称排序顺序：0升序，1降序
      // ops: {
      //   vuescroll: {
      //     sizeStrategy: 100,
      //     detectResize: false
      //   },
      //   scrollPanel: {
      //     scrollingX: false
      //   },
      //   rail: {
      //     background: "#01a99a",
      //     opacity: 0,
      //     size: "6px",
      //     specifyBorderRadius: false,
      //     gutterOfEnds: null,
      //     gutterOfSide: "0px",
      //     keepShow: false
      //   },
      //   bar: {
      //     showDelay: 500,
      //     onlyShowBarOnScroll: false,
      //     keepShow: false,
      //     background: "#6bb8fe",
      //     opacity: 0.3,
      //     hoverStyle: false,
      //     specifyBorderRadius: "6px",
      //     minSize: false,
      //     size: "6px",
      //     disable: false
      //   }
      // }
    };
  },
  components: {
    resultDialog
  },
  watch: {
    searchData(value) {
      if (value && value.listInfo) {
        this.listInfo = value.listInfo.records;
      }
    },
    hotWordList(value) {
      if (value) {
        this.hotWords = ["全部", ...value];
      }
    }
  },
  methods: {
    timeFormatting(time) {
      return time.split("T")[0];
    },
    // 清空radio
    cancelRadio() {
      this.$store.commit("setKeyword", this.searchValue);
      this.$store.commit("setPageNo", 1);
      this.currentPage = 1;
      this.$emit("right");
    },
    // 设置当前页码
    setPage() {
      this.currentPage = 1;
    },
    // 获取热词进行查询
    getHotWordValue() {
      // this.searchValue = this.hotWord;
      this.$store.commit(
        "setHotword",
        this.hotWord == "全部" ? "" : this.hotWord
      );
      this.$store.commit("setPageNo", 1);
      this.currentPage = 1;
      this.$emit("right");
    },
    // 获取input框值进行查询
    getSearchValue() {
      this.$store.commit("setKeyword", this.searchValue);
      this.$store.commit("setPageNo", 1);
      this.currentPage = 1;
      this.$emit("right");
    },
    // 切换tab进行数据查询
    queryData() {
      // let id = 0;
      // let name = this.activeName;
      // for (let i = 0; i < this.typeList.length; i++) {
      //   if (this.typeList[i].typeName === name) {
      //     id = this.typeList[i].id;
      //   }
      // }
      this.$store.commit(
        "setTypeName",
        this.activeName == "全类别" ? -1 : this.activeName
      );
      this.$store.commit("setPageNo", 1);
      this.currentPage = 1;
      this.$emit("right");
    },
    // 按照默认值排序
    sortByDefault() {
      this.sortProperty = "";
      this.$store.commit("setSortProperty", this.sortProperty);
      this.$store.commit("setSortType", 0);
      this.currentPage = 1;
      this.$store.commit("setPageNo", this.currentPage);
      this.$emit("right");
    },
    // 按照完成度排序
    sortByFinish() {
      if (this.sortProperty == "finishDegree") {
        this.sortFinishType = this.sortFinishType ? 0 : 1;
      } else {
        this.sortProperty = "finishDegree";
      }
      this.$store.commit("setSortProperty", this.sortProperty);
      this.$store.commit("setSortType", this.sortFinishType);
      this.currentPage = 1;
      this.$store.commit("setPageNo", this.currentPage);
      this.$emit("right");
    },
    // 按照名称排序
    sortByName() {
      if (this.sortProperty == "issuesName") {
        this.sortNameType = this.sortNameType ? 0 : 1;
      } else {
        this.sortProperty = "issuesName";
      }
      this.$store.commit("setSortProperty", this.sortProperty);
      this.$store.commit("setSortType", this.sortNameType);
      this.currentPage = 1;
      this.$store.commit("setPageNo", this.currentPage);
      this.$emit("right");
    },
    // 点击下一页排序
    handleCurrentChange(val) {
      this.$store.commit("setPageNo", val);
      this.$emit("right");
    },
    // 打开dialog
    openResultDialog(req) {
      console.log("弹窗");
      console.log(req);
      console.log(req.id);
      this.$store.commit("setDialogVisible", true);
      this.$emit("right");
      this.$refs.rDialog.queryTargetData(req);
    }
  }
};
</script>

<style lang="less">
.right-wrapper {
  font-size: 0.12rem;
  width: 14rem;
  /*height: 10rem;*/
  margin-left: 0.6rem;
  overflow: hidden;
  color: transparent;
  text-align: center;
  margin-top: 0.1rem;
  .head {
    display: flex;
    flex-direction: row;
    height: 0.45rem;
    .head-left {
      width: 3.5rem;
      .el-input__inner {
        background-color: transparent;
        border: 1px solid transparent;
        border-bottom: 1px solid #0748b6;
        color: #436fd2;
      }
      .el-input-group__append,
      .el-input-group__prepend {
        border: 1px solid transparent;
        border-bottom: 1px solid #0748b6;
        background-color: transparent;
        border-radius: 0px;
        /*position: relative;*/
        /*left: -.55rem;*/
      }
      .el-button {
        background-color: rgb(46 85 159);
        border-radius: 6px;
      }
      .el-icon-search {
        color: #8fc0f3;
      }
      input::-webkit-input-placeholder,
      textarea::-webkit-input-placeholder {
        color: #436fd2;
      }
      input:-moz-placeholder,
      textarea:-moz-placeholder {
        color: #436fd2;
      }
      input::-moz-placeholder,
      textarea::-moz-placeholder {
        color: #436fd2;
      }
      input:-ms-input-placeholder,
      textarea:-ms-input-placeholder {
        color: #436fd2;
      }
    }
    .head-right {
      margin-left: 0.2rem;
      width: 10.5rem;
      text-align: justify;
      .el-radio-button__inner {
        background-color: transparent;
        border: 1px solid transparent;
        border-right: 1px solid #8fc0f3;
        color: #8fc0f3;
        padding: 0 0.1rem;
        margin-top: 0.1rem;
        border-radius: 0px;
        max-width: 1.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }
      .el-radio-button.is-active .el-radio-button__inner {
        color: #ffffff;
      }
      .el-radio-button:nth-last-child(1) .el-radio-button__inner {
        border-right: 0;
      }
    }
  }
  .term {
    position: relative;
    display: flex;
    top: 0.75rem;
    left: 10.5rem;
    width: 4rem;
    height: 0.16rem;
    cursor: pointer;
    z-index: 99;
    div {
      display: flex;
      font-size: 0.16rem;
      margin-right: 0.15rem;
      color: #436fd2;
      height: 0.16rem;
      line-height: 0.16rem;
      .iconfont {
        margin-right: 2px;
      }
      // p {
      //   width: 0.16rem;
      //   height: 0.16rem;
      //   margin-right: 0.05rem;
      //   img {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }
    }
    .active {
      color: #8fc0f3;
    }
  }
  .center {
    height: 7rem;
    width: 14rem;
    margin-top: 0.35rem;
    background: url("../../assets/img/bg3.jpg") no-repeat;
    background-size: 100% 100%;
    .tab-content {
      .el-tabs__nav-scroll {
        width: 10.4rem;
      }
      .el-tabs__nav-next,
      .el-tabs__nav-prev {
        color: #8fc0f3;
        font-weight: bold;
        font-size: 0.2rem;
        margin-top: 0.1rem;
        font-weight: bold;
      }
      .el-tabs__nav-next {
        margin-right: 3.1rem;
      }
      .el-tabs__item {
        height: 0.7rem;
        line-height: 0.6rem;
        color: #436fd2;
        font-weight: bold;
        margin: 0;
      }
      .el-tabs--border-card {
        background-color: transparent;
        border: none;
      }
      .el-tabs--border-card > .el-tabs__header {
        background-color: transparent;
        border-bottom: 1px solid #316be2;
      }
      .el-tabs__content {
        height: 6rem;
        background: url("../../assets/img/bg6.jpg") no-repeat;
        background-size: 100% 100%;
      }
      .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        background: url("../../assets/img/activeBg.png") no-repeat;
        background-size: 100% 100%;
        color: #8fc0f3;
        font-weight: bold;
        border: 1px solid #316be2;
        border-bottom-color: #06275d;
        /*border-left-color:#316be2;*/
        /*border-right-color:#316be2;*/
      }
      .data-wrapper {
        display: flex;
        flex-flow: row wrap;
        /*justify-content: space-between;*/
        /*align-content: flex-start;*/
        /*align-items: flex-start;*/
        /*align-self: flex-start;*/
        li {
          width: 3.1rem;
          margin: 0.2rem 0.12rem;
          height: 1.4rem;
          .content1 {
            height: 1.4rem;
            .data-content {
              width: 3.1rem;
              height: 1.4rem;
              // background-size: 100% 100%;
              .first {
                display: flex;
                .title {
                  width: 0.25rem;
                  height: 0.25rem;
                  margin: 0.2rem 0.2rem 0.1rem 0.3rem;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
                .name {
                  width: 2rem;
                  height: 0.25rem;
                  margin-top: 0.15rem;
                  font-size: 0.2rem;
                  color: #ffffff;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  cursor: pointer;
                  text-align: left;
                }
              }
              .second {
                display: flex;
                justify-content: space-around;
                font-size: 0.12rem;
                color: rgb(148 173 222);
                height: 0.24rem;
                line-height: 0.24rem;
                margin: 0.1rem;
                p {
                  /*width: 1.3rem;*/
                  text-align: center;
                }
              }
              .third {
                background: url("../../assets/img/bg9.jpg") no-repeat;
                background-size: 100% 100%;
                height: 0.1rem;
                margin-top: 0.4rem;
                line-height: 0.1rem;
                .el-progress-bar__outer {
                  top: 0.03rem;
                  background-color: transparent;
                }
                .up {
                  position: relative;
                  z-index: 99;
                  .el-progress-bar__inner {
                    background-color: transparent;
                    background-image: linear-gradient(
                      to right,
                      rgb(2 132 242),
                      rgb(0 221 254)
                    );
                  }
                }
                .middle {
                  position: relative;
                  top: -0.05rem;
                  z-index: 69;
                  .el-progress-bar__inner {
                    background-color: rgb(9 89 198);
                  }
                }
              }
              .thirdError {
                background: url("../../assets/img/bgerror.png") no-repeat;
                background-size: 100% 100%;
                height: 0.1rem;
                margin-top: 0.4rem;
                line-height: 0.1rem;
                .el-progress-bar__outer {
                  top: 0.03rem;
                  background-color: transparent;
                }
                .up {
                  position: relative;
                  z-index: 99;
                  .el-progress-bar__inner {
                    background-color: transparent;
                    background-image: linear-gradient(
                      to right,
                      rgb(255 55 1),
                      rgb(248 148 51)
                    );
                  }
                }
                .middle {
                  position: relative;
                  top: -0.05rem;
                  z-index: 69;
                  .el-progress-bar__inner {
                    background-color: rgb(124 54 19);
                  }
                }
              }
            }
            .nomral {
              background: url("../../assets/img/bg8.jpg") no-repeat;
            }
            .warning {
              background: url("../../assets/img/error.png") no-repeat;
            }
            .two {
              width: 3.1rem;
              height: 1.4rem;
              background: url("../../assets/img/second.png") no-repeat;
              background-size: 100% 100%;
              position: relative;
              top: -1.4rem;
              z-index: 99;
            }
            .three {
              width: 3.1rem;
              height: 1.4rem;
              background: url("../../assets/img/third.png") no-repeat;
              background-size: 100% 100%;
              position: relative;
              top: -1.4rem;
              z-index: 99;
            }
            .four {
              width: 3.1rem;
              height: 1.4rem;
              background: url("../../assets/img/forth.png") no-repeat;
              background-size: 100% 100%;
              position: relative;
              top: -1.4rem;
              z-index: 99;
            }
            .success {
              width: 3.1rem;
              height: 1.4rem;
              background: url("../../assets/img/success.png") no-repeat;
              background-size: 100% 100%;
              position: relative;
              top: -1.4rem;
              z-index: 99;
            }
            .error {
              width: 3.1rem;
              height: 1.4rem;
              background: url("../../assets/img/error.png") no-repeat;
              background-size: 100% 100%;
              position: relative;
              top: -1.4rem;
              z-index: 99;
            }
          }
          .content2 {
            .data-content {
              width: 3.1rem;
              height: 1.4rem;
              // background: url("../../assets/img/bg8.jpg") no-repeat;
              // background-size: 100% 100%;
              .first {
                display: flex;
                justify-content: space-between;
                .title {
                  width: 0.25rem;
                  height: 0.25rem;
                  margin: 0.2rem 0.2rem 0rem 0.3rem;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
                p {
                  color: rgb(148 173 222);
                  margin: 0.2rem 0.3rem 0rem 0.3rem;
                }
              }
              .second {
                font-size: 0.16rem;
                color: #8fc0f3;
                height: 0.4rem;
                p {
                  text-align: justify;
                  margin: 0.02rem 0.2rem;
                }
                .des {
                  display: -webkit-box;
                  /*! autoprefixer: off */
                  -webkit-box-orient: vertical;
                  /* autoprefixer: on */
                  -webkit-line-clamp: 3;
                  overflow: hidden;
                  text-indent: 0.24rem;
                  height: 0.63rem;
                  padding: 0 0.06rem;
                  word-break: break-all;
                }
              }
              .third {
                background: url("../../assets/img/bg9.jpg") no-repeat;
                background-size: 100% 100%;
                height: 0.1rem;
                margin-top: 0.42rem;
                line-height: 0.1rem;
                .el-progress-bar__outer {
                  top: 0.03rem;
                  background-color: transparent;
                }
                .up {
                  position: relative;
                  z-index: 99;
                  .el-progress-bar__inner {
                    background-color: transparent;
                    background-image: linear-gradient(
                      to right,
                      rgb(2 132 242),
                      rgb(0 221 254)
                    );
                  }
                }
                .middle {
                  position: relative;
                  top: -0.05rem;
                  z-index: 69;
                  .el-progress-bar__inner {
                    background-color: rgb(9 89 198);
                  }
                }
                .down {
                  position: relative;
                  top: -0.1rem;
                  .el-progress-bar__inner {
                    background-color: red;
                  }
                }
              }
              .thirdError {
                background: url("../../assets/img/bgerror.png") no-repeat;
                background-size: 100% 100%;
                height: 0.1rem;
                margin-top: 0.42rem;
                line-height: 0.1rem;
                .el-progress-bar__outer {
                  top: 0.03rem;
                  background-color: transparent;
                }
                .up {
                  position: relative;
                  z-index: 99;
                  .el-progress-bar__inner {
                    background-color: transparent;
                    background-image: linear-gradient(
                      to right,
                      rgb(255 55 1),
                      rgb(248 148 51)
                    );
                  }
                }
                .middle {
                  position: relative;
                  top: -0.05rem;
                  z-index: 69;
                  .el-progress-bar__inner {
                    background-color: rgb(124 54 19);
                  }
                }
              }
            }
            .nomral {
              background: url("../../assets/img/bg8.jpg") no-repeat;
              background-size: 100% 100%;
            }
            .warning {
              background: url("../../assets/img/error.png") no-repeat;
              background-size: 100% 100%;
            }
            .two {
              width: 3.1rem;
              height: 1.4rem;
              background: url("../../assets/img/second.png") no-repeat;
              background-size: 100% 100%;
              position: relative;
              top: -1.4rem;
              z-index: 99;
            }
            .three {
              width: 3.1rem;
              height: 1.4rem;
              background: url("../../assets/img/third.png") no-repeat;
              background-size: 100% 100%;
              position: relative;
              top: -1.4rem;
              z-index: 99;
            }
            .four {
              width: 3.1rem;
              height: 1.4rem;
              background: url("../../assets/img/forth.png") no-repeat;
              background-size: 100% 100%;
              position: relative;
              top: -1.4rem;
              z-index: 99;
            }
            .success {
              width: 3.1rem;
              height: 1.4rem;
              background: url("../../assets/img/success.png") no-repeat;
              background-size: 100% 100%;
              position: relative;
              top: -1.4rem;
              z-index: 99;
            }
            .error {
              width: 3.1rem;
              height: 1.4rem;
              background: url("../../assets/img/error.png") no-repeat;
              background-size: 100% 100%;
              position: relative;
              top: -1.4rem;
              z-index: 99;
            }
          }
        }
      }
      data-wrapper:nth-child(4n-1) {
        padding: 0 0.2rem;
      }
    }
  }
  .page {
    display: flex;
    justify-content: flex-end;
    width: 14rem;
    height: 0.5rem;
    margin-top: 0.3rem;
    text-align: right;
    font-size: 0.18rem;
    /*line-height: .5rem;*/
    p {
      color: #436fd2;
      letter-spacing: 2px;
      line-height: 0.4rem;
      height: 0.4rem;
    }
    .num {
      color: white;
      font-size: 0.24rem;
      font-weight: bold;
    }
    .el-pagination .btn-prev,
    .btn-next,
    .el-pager li {
      background: #031338;
      color: #548df2;
      border: 1px solid #5b92f9;
    }
  }
  .el-badge__content {
    background-color: #e53416;
    border: 1px solid #e53416;
  }
  .cantchoose {
    user-select: none;
  }
}
</style>
