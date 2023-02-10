<template>
  <div class="serverHome">
    <Box-header
      :headerData="serviceHeaderData"
      @handelActive="servicehandelActive"
      :activeHeader="activeHeader"
    />
    <Box-contect
      :serviceContentData="serviceContentData"
      :activeHeader="activeHeader"
    />

  </div>
</template>

<script>
import BoxHeader from "./component/BoxHeader.vue";
import BoxContect from "./component/BoxContect.vue";
import { getOrderMealsList } from "@/api/service";

export default {
  data() {
    return {
      serviceHeaderData: [
        {
          id: 2,
          name: "已派单",
        },
        {
          id: 6,
          name: "服务中",
        },
      ],
      activeHeader: "2",
      serviceContentData: [],
    };
  },
  components: {
    BoxHeader,
    BoxContect,
  },
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getOrderMealsList()
        .then((res) => {
          if (res && res.code == 200) {
            this.serviceContentData = res.data;
          } else {
            this.serviceContentData = [];
          }
        })
        .catch((err) => {});
    },
    servicehandelActive(n) {
      this.activeHeader = n;
    },
  },
};
</script>

<style scoped lang="less">
.serverHome {
  padding-bottom: 70px;
}
</style>
