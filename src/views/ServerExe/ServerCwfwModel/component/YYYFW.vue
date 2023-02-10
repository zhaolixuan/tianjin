<template>
  <div class="service_content">
    <nav class="service_content_item"
         v-for="i in serviceContentData"
         :key="i.id">
      <nav class="content">
        <p class="gdh">工单号：{{ i.number }}</p>
        <div class="flex">
          <!-- <img src="../../../../assets/images/touxiang.jpg" alt="" /> -->
          <van-cell-group>
            <!-- <p class="info">
                            <span>{{i.oldPeople}}</span> <span>{{i.sex}}</span> <span>{{i.age}}</span>
                        </p> -->
            <van-field v-for="j in contentLabel"
                       :key="j.label"
                       :label="j.label"
                       :value="i[j.value]"
                       readonly />
            <p class="status">
              <span>服务状态</span>
              <span>{{ status(i.status) }}</span>
            </p>
          </van-cell-group>
        </div>
      </nav>
      <nav class="btn"
           @click="checkDetail(i)">查看详情</nav>
    </nav>
    <van-empty v-if="!serviceContentData.length"
               description="暂无数据" />
  </div>
</template>

<script>
export default {
  props: {
    serviceContentData: {
      Type: Array,
      default: () => {
        return []
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
          label: '服务老人',
          value: 'oldPeople',
        },
        {
          label: '联系方式',
          value: 'phone',
        },
        {
          label: '上门地址',
          value: 'address',
        },
        {
          label: '上门时间',
          value: 'serviceDate',
        },
        {
          label: '服务项目',
          value: 'type',
        },
        // {
        //     label: '服务状态',
        //     value: 'communityName',
        // },
      ],
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    status(n) {
      let name
      switch (n) {
        case 1:
          name = '未开始'
          break
        case 2:
          name = '服务中'
          break
        case 3:
          name = '已完成'
          break
        case 4:
          name = '已评价'
          break
        case 5:
          name = '已取消'
          break
        case 6:
          name = '待改派'
          break
        default:
          name = '已预约'
          break
      }
      return name
    },
    checkDetail(i) {
      this.$router.push({
        path: '/yyfw-details',
        query: { id: i.id },
      })
    },
  },
}
</script>

<style scoped lang="less">
.service_content {
  .select {
    justify-content: end;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    .el-select {
      margin-left: 10px;
      width: 100px;
      /deep/ .el-input__inner {
        border: none;
        background: transparent;
      }
    }
  }
  .server_info {
    display: flex;
    background: #fff;
    padding: 9px;
    height: 91px;
    position: relative;
    // margin: 0 9px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      // justify-content: space-evenly;
      align-items: center;
      padding: 10px 0;

      p {
        font-size: 20px;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: #000000;
      }
      span {
        font-size: 13px;
        font-family: PingFangSC-Medium, PingFang SC;
        color: #000000;
      }
    }
    .num {
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
  .service_content_item {
    background: #fff;
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
    // border-bottom: 1px solid #ccc;
    margin-bottom: 11px;
    .content {
      .gdh {
        font-size: 14px;
        font-weight: 600;
        text-align: left;
        margin-bottom: 4px;
      }
      .flex {
        display: flex;
        justify-content: space-between;
        img {
          width: 84px;
          height: 100px;
          margin-right: 6px;
          padding-top: 6px;
        }
        .van-cell-group {
          flex: 1;
          .van-cell::after {
            border: none !important;
          }
        }
      }
      .info {
        display: flex;
        font-size: 13px;
        font-weight: 600;
        margin-top: 4px;
        span {
          margin-right: 50px;
        }
      }
      .status {
        padding: 0.16rem 0;
        display: flex;
        font-size: 12px;
        font-weight: 500;
        span {
          margin-right: 40px;
        }
      }
    }
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
