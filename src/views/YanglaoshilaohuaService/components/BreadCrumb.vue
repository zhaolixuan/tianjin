<template>
  <div class="breadcrumb-container">
    <span
      v-for="(item, index) in breadCrumbs"
      :key="`${item.name}-${index}`"
      :class="[index + 1 >= userType ? 'cursor' : '']"
      @click="handleSetType(index + 1, item)"
      v-show="item.name.indexOf('片区') == -1"
    >
      {{ item.name }}
      <span
        v-if="breadCrumbs.length > 0 && index + 1 !== breadCrumbs.length"
        v-show="item.name.indexOf('片区') == -1"
        >/</span
      >
    </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getOldBasePersonInfo } from "@/views/ProvideAged/apis/index.js";

export default {
  name: "BreadCrumb",
  data() {
    return {
      regions: [
        {
          name: "河西区",
          code: "120103000000",
          parentCode: null,
          type: 1,
        },
        {
          name: "东部片区",
          code: "120001",
          parentCode: "120103000000",
          type: 2,
        },
        {
          name: "陈塘庄街道",
          code: "120103010000",
          parentCode: "120001",
          type: 3,
        },
        {
          name: "天山里社区居委会",
          code: "120103010004",
          parentCode: "120103010000",
          type: 4,
        },
      ],
    };
  },

  props: {
    flagName: {
      type: String,
      default: () => "",
    },
  },

  computed: {
    ...mapGetters([
      "typeNew",
      "codeNew",
      "userType",
      "clickName",
      "userName",
      "communities",
    ]),

    breadCrumbRegions() {
      if (this.type === 4) {
        const last = this.regions.pop();
        this.regions.push(
          Object.assign({}, last, {
            name: this.clickName || this.userName,
            code: this.codeNew[0],
            parentCode: "120103010000",
          })
        );
      }
      return this.regions.slice(0, this.type || 1);
    },

    params() {
      let params = {};
      const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0];
      return params;
    },

    breadCrumbs() {
      const hexiRegion = this.communities.find(
        (item) => item.name === "河西区"
      );
      const buildFullTree = (departmentTree, code) => {
        let pathArr = [];
        const breadItem = (node) => ({
          name: node.name,
          code: node.code,
        });
        const findPath = (node, code) => {
          if (node.code === code) {
            return [breadItem(node)];
          } else {
            if (!node.childs) return null;

            for (const child of node.childs) {
              const childPath = findPath(child, code);
              if (Array.isArray(childPath) && childPath.length > 0) {
                childPath.unshift(breadItem(child));
                return childPath;
              }
            }
          }
        };
        const foundPath = findPath(departmentTree, code);
        if (Array.isArray(foundPath)) {
          pathArr.push(breadItem(departmentTree));
          pathArr.push(...foundPath);
        }
        return pathArr.filter((item, pos, arr) => {
          return arr.map((mapObj) => mapObj.name).indexOf(item.name) === pos;
        });
      };
      return hexiRegion ? buildFullTree(hexiRegion, this.codeNew[0]) : [];
    },
  },

  watch: {
    type(val) {
      this.$store.dispatch("getOldBaseInfo", this.params);
    },
    breadCrumbs: {
      deep: true,
      handler(newVal) {
        this.$store.commit(
          "SET_BREAD_CRUMB_CODES",
          newVal.map((item) => item.code)
        );
      },
    },
  },

  created() {
    this.$store.dispatch("getBaseCommunityInfo");
  },

  methods: {
    currentTypeCode(type) {
      return this.regions.find((item) => item.type === type)
        ? this.regions.find((item) => item.type === type).code
        : this.regions[0].code;
    },
    handleSetType(type, region) {
      console.log("handleSetType", type, region);
      if (type < this.userType) return;
      const parentCode = this.communities[type - 1]
        ? this.communities[type - 1].code
        : "";
      let param = {
        area: region.name,
        typeNew: type,
      };
     this.$emit("handelMap", param);
      this.$store.commit("setTypeNew", type);
      this.$store.commit("setCodeNew", [region.code, parentCode]);
      this.$store.commit("setUserName", region.name);
    },
  },
};
</script>

<style lang="less" scoped>
.breadcrumb-container {
  float: left;
  height: 0.202rem;
  margin: 0.05rem auto 0.15rem;
  line-height: 0.202rem;
  font-size: 0.214rem;
  font-weight: 400;
  color: rgba(166, 197, 253, 1);
  .cursor {
    cursor: pointer;
  }
}
</style>
