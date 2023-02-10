<template>
  <div class="container">
    <div class="order_content">
      <p class="order_item" v-for="(item,index) in ServiceData" :key="index">
        <span class="left_text">{{item.title}}：</span>
        <span class="right_text">{{item.number}}<span class="unit">{{item.text}}</span> </span>
      </p>
    </div>
  </div>
</template>

<script>
import MessageItem from '@/views/OlderDistribution/components/MessageItem/index'
export default {
  name: 'ServiceRun',
  props: {
    allOrderMap: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ServiceData () {
      let { consumerMoney, orderCardMonthTotal } = this.allOrderMap
      return [
        {
          title: '服务总量',
          number: orderCardMonthTotal || 0,
          text: '客次',
          flag: true
        },
        {
          title: '消费金额',
          number: consumerMoney ? consumerMoney.toFixed(0) : 0,
          text: '元',
          flag: true
        }
      ]
    }
  },
  components: {
    MessageItem
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: .5rem;
  .order_content {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .order_item:nth-child(2){
      box-sizing: border-box;
      float: right;
    }
    .order_item {
      width: 50%;
      height: 50%;
      display: flex;
      // align-items: center;
      justify-content: center;
      font-size: .2rem;
      .left_text{
        color: #68f4ff;
        display: inline-block;
        text-align: left;
      }
      .right_text{
        color: #ff8400;
        font-weight: bold;
        font-size: .22rem;
        .unit{
          font-size: .18rem;
        }
      }
    }
  }
}
</style>
