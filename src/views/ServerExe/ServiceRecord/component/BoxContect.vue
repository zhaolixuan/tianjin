<template>
  <div class="service_content">
    <nav
      class="service_content_item"
      @click="checkDetail(i)"
      v-for="i in serviceContentData"
      :key="i.orderMealsPersonalId"
    >
      <nav class="content">
        <van-cell-group>
          <van-field
            v-for="j in contentLabel"
            :key="j.value"
            :label="j.label"
            :value="i[j.value]"
            readonly
          />
        </van-cell-group>
      </nav>
      <nav class="btn">查看详情</nav>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    serviceContentData: {
      Type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      contentLabel: [
        {
          label: "订单编号",
          // value: "Ordernumber",
          value: "number",
        },
        {
          label: "服务项目",
          // value: "ServiceItem",
          value: "project",
        },
        {
          label: "服务地址",
          // value: "Serviceaddress",
          value: "address",
        },
        {
          label: "联系对象",
          // value: "Contactobject",
          value: "oldPeople",
        },
        {
          label: "联系方式",
          // value: "Contactinformation",
          value: "phone",
        },
        {
          label: "上门时间",
          // value: "Visitingtime",
          value: "serviceDate",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    checkDetail(i) {
      this.$router.push({
        path: "/server-record",
        query: { id: i.orderMealsPersonalId },
      });
    },
  },
};
</script>

<style scoped lang="less">
.service_content {
  .service_content_item {
    background: #fff;
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
    // border-bottom: 1px solid #ccc;
    margin-bottom: 11px;
    .van-field {
      padding: 6px 0;
    }
    .btn {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #049464;
      padding: 10px 0 0px;
    }
  }
}
</style>
