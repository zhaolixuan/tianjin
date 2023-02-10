<template>
  <div class="service_content">
    <nav
      class="service_content_item"
      v-for="i in serviceContentData"
      :key="i.id"
    >
      <van-swipe-cell v-if="i.status != 0">
        <nav class="content">
          <van-cell-group>
            <van-field
              v-for="j in contentLabel"
              :key="j.label"
              :label="j.label"
              :value="i[j.value]"
              v-show="i.status * 1 || !j.label.includes('审批')"
              readonly
            />
            <p class="status">
              {{ i.status * 1 ? (i.status == 1 ? "通过" : "失败") : "审核中" }}
            </p>
          </van-cell-group>
        </nav>
        <template #right>
          <van-button
            @click="beforeClose(i)"
            square
            text="删除"
            type="danger"
            class="delete-button"
          />
        </template>
      </van-swipe-cell>
      <nav class="content" v-else>
        <van-cell-group>
          <van-field
            v-for="j in contentLabel"
            :key="j.label"
            :label="j.label"
            :value="i[j.value]"
            v-show="i.status * 1 || !j.label.includes('审批')"
            readonly
          />
          <p class="status">
            {{ i.status * 1 ? (i.status == 1 ? "通过" : "失败") : "审核中" }}
          </p>
        </van-cell-group>
      </nav>
    </nav>
    <van-empty v-if="!serviceContentData.length" description="暂无数据" />
  </div>
</template>

<script>
import { getChildUserList, physicallyDeleted } from "@/api/mine";
export default {
  data() {
    return {
      contentLabel: [
        {
          label: "姓名",
          value: "childName",
        },
        {
          label: "手机号",
          value: "childAccount",
        },
        {
          label: "关系",
          value: "relationship",
        },
        {
          label: "提交时间",
          value: "createTime",
        },
        {
          label: "审批意见",
          value: "remarks",
        },
        {
          label: "审批人",
          value: "operator",
        },
        {
          label: "审批时间",
          value: "review_time",
        },
      ],
      serviceContentData: [],
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getChildUserList()
        .then((res) => {
          if (res && res.code == 200) {
            this.serviceContentData = res.data;
          }
        })
        .catch((err) => {});
    },
    beforeClose(i) {
      this.$dialog
        .confirm({
          message: "确定删除该记录吗？",
        })
        .then(() => {
          let data = {
            childId: i.id,
            status: i.status,
          };
          physicallyDeleted(data)
            .then((res) => {
              if (res && res.code == 200) {
                this.getData();
              }
            })
            .catch((err) => {});
        });
    },
    checkDetail(i) {
      this.$router.push({
        path: "/workorder-details",
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
  .content {
    position: relative;
  }
  .status {
    position: absolute;
    right: 10px;
    top: 8px;
    font-size: 15px;
    color: #169bd5;
  }
}
</style>
