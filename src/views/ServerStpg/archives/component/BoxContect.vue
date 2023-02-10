<template>
  <div class="service_content">
    <nav class="service_content_item"
         @click="checkDetail(i)"
         v-for="i in serviceContentData"
         :key="i.id">
      <nav class="title"
           :class="{'no':i.status==0}">
        <p class="name">王大壮</p>
        <p class="status">{{i.status == 0 ?'未完成' :'New'}} <span>></span></p>
      </nav>
      <nav class="content">
        <nav class="content_item"
             v-for="j in contentLabel"
             :key="j.label">
          <span>{{j.label}}：</span>
          <p>{{i[j.value]}}</p>
        </nav>

      </nav>
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
          label: '老人性别',
          value: 'age',
        },
        {
          label: '身份证号',
          value: 'IdCard',
        },
        {
          label: '老人地址',
          value: 'serviceAddress',
        },
      ],
    }
  },
  created() {},
  mounted() {
    // console.log(this.activeHeader);
  },
  methods: {
    checkDetail(i) {
      this.$router.push({
        path: '/olderInfo',
        query: { idCard: i.idCard },
      })
    },
  },
}
</script>

<style scoped lang="less">
.service_content {
  .service_content_item {
    background: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    margin: 0 12px;
    margin-top: 12px;
    .title {
      display: flex;
      padding: 20px;
      align-items: center;
      height: 44px;
      border-bottom: 1px solid #f5f6f8;
      justify-content: space-between;
      position: relative;
      .name {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      .status {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(43, 194, 144, 1);
        span {
          color: #000;
        }
      }
      &::before {
        content: '';
        position: absolute;
        width: 3px;
        height: 20px;
        left: 0;
        top: 50%;
        margin-top: -10px;
        background: rgba(12, 186, 128, 1);
        border-radius: 2px;
      }
    }
    .no {
      &::before {
        background: #f6c103;
      }
      .status {
        color: #f6c103;
      }
    }
    .content {
      padding: 10px 20px;
      font-size: 12px;
      .content_item {
        display: flex;
        margin-bottom: 6px;
        span {
          color: #a6a6a6;
        }
        p {
          flex: 1;
          text-align: left;
          color: #000;
        }
      }
    }
  }
}
</style>
