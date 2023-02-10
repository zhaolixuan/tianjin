<template>
  <div class="service_content">
    <!-- v-show="i.serviceStatue == activeHeader" -->
    <nav
      class="service_content_item"
      v-for="i in serviceContentData"
      :key="i.id"
    >
      <nav class="content">
        <van-cell-group>
          <van-field
            v-for="j in contentLabel"
            :key="j.label"
            :label="j.label"
            :value="i[j.value]"
            readonly
          />
        </van-cell-group>
      </nav>
      <nav class="btn" @click="checkDetail(i)">{{ checkStatus(i.status) }}</nav>
    </nav>
    <van-empty v-if="!serviceContentData.length" description="暂无数据" />
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
    activeHeader: {
      Type: String,
    },
  },
  data() {
    return {
      contentLabel: [
        {
          label: "老年人姓名",
          value: "name",
        },
        {
          label: "性别",
          value: "sex",
        },
        {
          label: "年龄",
          value: "age",
        },

        {
          label: "联系方式",
          value: "phoneNumber",
        },
        {
          label: "所属街道社区",
          value: "community",
        },
        {
          label: "详细地址",
          value: "adress",
        },
        {
          label: "改造状态",
          value: "status",
        },
      ],
    };
  },
  created() {},
  mounted() {
    // console.log(this.activeHeader);
  },
  methods: {
    checkDetail(i) {
      this.$router.push({
        path: "/slhgz-details",
        query: { id: i.id },
      });
    },
    checkStatus(status) {
      let str = "";
      if (status == "待改造") {
        str = "开始改造";
      } else if (status == "改造中") {
        str = "完成改造";
      } else if (status == "改造完成") {
        str = "申请验收";
      } else {
        str = "查看详情";
      }
      return str;
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
