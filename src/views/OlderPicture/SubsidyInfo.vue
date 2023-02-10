<template>
  <div class="subsidywrapper">
    <ListTable :title="title" :icon="icon" :infoData="infoData" :listData="listData||{}"></ListTable>
  </div>
</template>

<script>
import ListTable from "./common/ListTable";
export default {
  props: {
    listData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      title: "补贴信息",
      icon: "iconbutiexinxi",
      infoData: [
        {
          title: "补贴类型",
          key: "allowanceType"
        },
        {
          title: "补贴标准",
          key: "allowanceProd"
        },
        {
          title: "补贴政策",
          key: "allowancePolicy"
        }
      ]
    };
  },
  components: {
    ListTable
  }
};
</script>

<style scoped>
.subsidywrapper {
  position: absolute;
  bottom: 0.5rem;
  left: 0.77rem;
  width: 4rem;
}
</style>