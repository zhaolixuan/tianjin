<template>
  <div class="breadcrumb-container">
    <template v-for="(item, index) in breadCrumbData">
      <router-link
        v-if="index < breadCrumbData.length - 1"
        class="bread-crumb-item"
        :to="{ path: item.url || '', query: { code: $route.query.code } }"
        :key="'breadcrumb_' + index"
      >
        {{ item.title }}
        <span>/</span>
      </router-link>
      <a v-else :key="'breadcrumb_' + index" class="bread-crumb-item">{{
        item.title
      }}</a>
    </template>
  </div>
</template>

<script>
export default {
  name: "BreadCrumb", // 养老系统用面包屑
  props: {
    crumbData: {
      type: Array,
      default: () => []
    },
    homeUrl: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {//|| "/provideAged"
      baseData: [
        {
          title: "首页",
          url: this.homeUrl 
        }
      ]
    };
  },
  computed: {
    breadCrumbData() {
      return this.baseData.concat(this.crumbData);
    },
    breadCrumbCodes() {
      let codeList = [];
      let len = 1;
      if (typeof this.$route.query.code !== "string") {
        codeList.push(
          this.$route.query.code[this.$route.query.code.length - 1]
        );
        codeList.push(
          this.$route.query.code[this.$route.query.code.length - 2]
        );
        len = this.$route.query.code.length;
      } else {
        codeList = [this.$route.query.code, "120100000000"];
      }
      return codeList;
    }
  }
};
</script>

<style lang="less" scoped>
.breadcrumb-container {
  margin: 0.05rem auto 0.1rem 0.3rem;
  line-height: 0.18rem;
  font-size: 0.16rem;
  font-weight: 400;
  .bread-crumb-item {
    color: rgba(166, 197, 253, 1);
    cursor: pointer;
    &:nth-last-child(1) {
      cursor: default;
    }
    span {
      margin: 0 0.05rem;
    }
  }
}
</style>
