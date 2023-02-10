<template>
  <div class="older-content">
    <norm-layout
      text="养老补贴政策覆盖人群"
    ></norm-layout>
    <subsidy-item :SubsidyData="SubsidyData"></subsidy-item>
  </div>
</template>

<script>
import NormLayout from "../NormLayout";
import SubsidyItem from "./components/SubsidyItem";
import { getAllowanceIndexInfo } from "@/views/OlderDistribution/apis/index.js";
import { mapGetters } from "vuex";
export default {
  name: "OlderSubsidy",
  data() {
    return {
      SubsidyData: [],
      SubsidyAll: 0
    };
  },
  computed: {
    ...mapGetters(["typeNew", "codeNew", "baseInfo", "breadCrumbCodes"]),
    params() {
      let params = {};
      const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0];

      return params;
    },
    path() {
      return {
        path: "ProvideSubsidy"
      };
    }
  },
  watch: {
    codeNew(val) {
      if (!val) {
        return false;
      }
      this.getAllowanceIndexInfo();
    }
  },
  created() {
    // this.getAllowanceIndexInfo();
  },
  methods: {
    getAllowanceIndexInfo() {
      let streetCode =
        window.localStorage.getItem("account") === "admin" ||
        window.localStorage.getItem("account") === "hexi"
          ? ""
          : window.localStorage.getItem("account");
      // this.params.streetCode = streetCode;
      getAllowanceIndexInfo({streetCode,...this.params}).then(res => {
        let Data = res.data.allowanceTypeList[0];
        this.SubsidyData = [
          {
            allowType: "意外保险",
            allowanceTypeTotal: Data.allowanceTypeTotal9
          },
          {
            allowType: "助餐补贴",
            allowanceTypeTotal: Data.allowanceTypeTotal10
          },
          {
            allowType: "居家养老护理补贴",
            allowanceTypeTotal:
              Data.allowanceTypeTotal12 + Data.allowanceTypeTotal11,
            path: {
              path: "olderSubsidy",
              query: {
                allowancePolicy: "2",
                code: this.breadCrumbCodes
              }
            }
          },
          {
            allowType: "百岁老人营养补贴",
            allowanceTypeTotal: Data.allowanceTypeTotal8,
            path: {
              path: "olderSubsidy",
              query: {
                allowanceType: "8",
                code: this.breadCrumbCodes
              }
            }
          }
        ];
      });
    }
  },
  components: {
    NormLayout,
    SubsidyItem
  }
};
</script>

<style lang="less" scoped>
.older-content {
  height: 3rem;
}
</style>
