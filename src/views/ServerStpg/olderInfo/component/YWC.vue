<template>
    <div class="list">
      <nav v-for="i in serviceContentData"
           class="list_item"
           :key="i.id">
        <div class="info">
          <p class="title">
            {{i.title}}
          </p>
          <p class="time"><span>创建时间：</span>{{i.time}}</p>
        </div>
      
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    props: ['serviceContentData'],
    data() {
      return {}
    },
    created() {},
    mounted() {},
    methods: {},
  }
  </script>
  
  <style scoped lang="less">
  .list {
    padding: 0 16px;
    .list_item {
      display: flex;
      padding: 16px 0;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      .info {
        display: flex;
        flex-direction: column;
        .title {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 15px;
          text-align: left;
        }
        .time {
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: normal;
          color: rgba(0, 0, 0, 1);
          span {
            color: #a3a3a6;
          }
        }
      }
      .continue {
        display: flex;
        cursor: pointer;
        color: #000;
        font-size: 16px;
        span {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(12, 186, 128, 1);
          margin-right: 16px;
        }
      }
    }
  }
  </style>
  