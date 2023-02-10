<template>
  <div class="basewrapper">
    <ListTable
      :title="title"
      :icon="icon"
      :infoData="infoData"
      :listData="listData || {}"
    ></ListTable>
  </div>
</template>

<script>
import ListTable from "./common/ListTable";
export default {
  props: {
    listData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      title: "基本情况",
      icon: "iconjibenqingkuang",
      infoData: [
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "性别",
          key: "sex",
        },
        {
          title: "年龄",
          key: "age",
        },
        {
          title: "身份证号码",
          key: "idcardNumber",
        },
        // {
        //   title: "月总收入",
        //   key: "monthlyIncome"
        // },
        {
          title: "户籍地址",
          key: "registerAddress",
        },
        {
          title: "教育程度",
          key: "schoolLevel",
        },
        // {
        //   title: "户主姓名",
        //   key: "holder"
        // },
        // {
        //   title: "婚姻状态",
        //   key: "marryStatus"
        // },
        // {
        //   title: "家庭成员",
        //   key: "memberHome"
        // },
        {
          title: "身体状况",
          key: "personbody",
        },
        // {
        //   title: "享有医保",
        //   key: "medicalInsurance"
        // },
        // {
        //   title: "上年度医疗费用",
        //   key: "yestardayMedicalInsurance"
        // },
        {
          title: "电话",
          key: "mobile",
        },
        {
          title: "街道",
          key: "communityName",
        },
        {
          title: "社区",
          key: "nativePlace",
        },
        {
          title: "现住址",
          key: "address",
        },
        {
          title: "状态",
          key: "deathType",
        },
      ],
    };
  },
  watch: {
    listData() {
      if (this.listData.deathType == 1) {
        this.infoData = this.infoData.concat([
          {
            title: "死亡时间",
            key: "deathDate",
          },
          {
            title: "死亡原因",
            key: "deathReason",
          },
        ]);
      }
    },
  },

  components: {
    ListTable,
  },
};
</script>

<style scoped>
.basewrapper {
  position: absolute;
  top: 1.25rem;
  left: 0.77rem;
  width: 4rem;
}
</style>
