<template>
  <div class="quotaleftwrapper">
    <div class="head" v-if="allorgList.length>0">
      <el-radio-group v-model="allOrgName" @change="getAllOrgName">
        <el-radio-button :label="allorgList[0].departName"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="line_top"></div>
    <div class="content">
      <el-radio-group v-model="activeOrgName" @change="getOrgName">
        <el-radio-button
          v-for="(org,index) in otherOrgList"
          :key="index"
          :label="org.departName"
          :title="org.departName"
        ></el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "leftWrapper",
  props: ["otherOrgList", "allorgList"],
  data() {
    return {
      activeOrgName: "",
      allOrgName: "全部委办局"
    };
  },
  created() {},
  methods: {
    // 查询全部组织机构数据
    getAllOrgName() {
      this.activeOrgName = "";
      this.$store.commit("setOrgName", -1);
      this.$store.commit("setPageNo", 0);
      this.$emit("changePage");
      this.$emit("left");
    },
    // 查询某一个组织机构的接口
    getOrgName() {
      this.allOrgName = "";
      this.$store.commit("setOrgName", this.activeOrgName);
      this.$store.commit("setPageNo", 0);
      this.$emit("changePage");
      this.$emit("left");
    }
  }
};
</script>

<style lang="less">
.quotaleftwrapper {
  font-size: 0.12rem;
  width: 3.8rem;
  height: 8.1rem;
  margin-left: 0.5rem;
  background-color: #032251;
  overflow-y: auto;
  overflow-x: hidden;
  color: #436fd2;
  text-align: center;
  .head {
    .el-radio-button {
      width: 3.4rem;
      height: 0.5rem;
      border: 1px solid #1e4a8e;
      margin: 0.25rem 0.2rem 0rem 0.2rem;
    }
    .el-radio-button__inner {
      background-color: #032251;
      color: #436fd2;
      border: none;
      border-radius: 0;
      width: 3.4rem;
      font-weight: bold;
      letter-spacing: 1px;
      font-size: 0.16rem;
      text-align: center;
      line-height: 0.5rem;
      padding: 0px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
  }
  .line_top {
    background: -webkit-radial-gradient(
      rgba(31, 172, 255, 0.3),
      rgba(0, 65, 135, 0.2),
      rgba(31, 172, 255, 0.2)
    );
    background: -o-radial-gradient(
      rgba(31, 172, 255, 0.3),
      rgba(0, 65, 135, 0.2),
      rgba(31, 172, 255, 0.2)
    );
    background: -moz-radial-gradient(
      rgba(31, 172, 255, 0.3),
      rgba(0, 65, 135, 0.2),
      rgba(31, 172, 255, 0.2)
    );
    background: radial-gradient(
      rgba(31, 172, 255, 0.3),
      rgba(0, 65, 135, 0.2),
      rgba(31, 172, 255, 0.2)
    );
    width: 2.8rem;
    height: 0.01rem;
    margin: 0.14rem 0.5rem 0.1rem 0.5rem;
  }
  .content {
    font-size: 0.16rem;
    width: 3.4rem;
    height: 7.5rem;
    text-align: center;
    margin: 0.15rem 0.2rem 0.2rem 0.2rem;
    .el-radio-button {
      width: 1.6rem;
      height: 0.5rem;
      border: 1px solid #1e4a8e;
      margin-bottom: 0.1rem;
      /*float: left;*/
    }
    .el-radio-button:nth-child(odd) {
      float: left;
    }
    .el-radio-button:nth-child(even) {
      float: right;
    }
    .el-radio-button__inner {
      background-color: #032251;
      color: #436fd2;
      border: none;
      border-radius: 0;
      text-align: center;
      line-height: 0.5rem;
      padding: 0px;
      width: 1.6rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
  }
  .el-radio-button.is-active .el-radio-button__inner {
    -webkit-box-shadow: none;
    box-shadow: none;
    background: url("../../assets/img/bg1.jpg") no-repeat;
    color: #8fc0f3;
    border: 1px solid #068ff9;
    background-size: 100% 100%;
  }
  .head .el-radio-button.is-active .el-radio-button__inner {
    background-size: 3.4rem 0.5rem;
  }
  .content .el-radio-button.is-active .el-radio-button__inner {
    background-size: 1.6rem 0.5rem;
  }
}
.quotaleftwrapper::-webkit-scrollbar {
  width: 5px;
}
.quotaleftwrapper::-webkit-scrollbar-track {
  border-radius: 5px;
  background: rgba(3, 130, 248, 0.08);
}
.quotaleftwrapper::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(3, 130, 248, 0.1);
}
</style>
