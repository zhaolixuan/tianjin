<template>
  <div class="container">
    <div class="order_content">
      <p class="order_item" v-for="(item,index) in ServiceData" :key="index">
        <span class="left_text">{{item.title}}：</span>
        <span class="right_text">{{item.number}}<span class="unit">单</span> </span>
      </p>
    </div>
  </div>
</template>

<script>
import MessageItem from '@/views/OlderDistribution/components/MessageItem/index'
import { mapGetters } from 'vuex'
export default {
  name: 'ServiceRun',
  props: {
    thirtyOrderMap: {
      type: Object,
      default: () => {}
    },
    allOrderMap: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['breadCrumbCodes']),
    ServiceData () {
      let { serviceOrdertotal, orderFooweekTotal } = this.allOrderMap
      let { orderFooMonthTotal, orderFooCurrentTotal } = this.thirtyOrderMap
      return [
        {
          title: '全部订单',
          number: serviceOrdertotal,
          text: '个',
          flag: true
          // path: {
          //   path: 'ServiceCarrier',
          //   query: { code: this.breadCrumbCodes }
          // }
        },
        {
          title: '近三十天订单',
          number: orderFooMonthTotal,
          text: '人',
          flag: true
          // path: {
          //   path: 'GroupPortrait',
          //   query: { code: this.breadCrumbCodes }
          // }
        },
        {
          title: '本周订单',
          number: orderFooweekTotal,
          text: '份',
          flag: true,
          line: true

          // path: {
          //   path: 'ServiceOlder',
          //   query: { code: this.breadCrumbCodes }
          // }
        },
        {
          title: '今日订单',
          number: orderFooCurrentTotal,
          text: '份',
          flag: true
          // path: {
          //   path: 'ServiceOlder',
          //   query: { code: this.breadCrumbCodes }
          // }
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
  height: 1rem;
  .order_content {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-right: .5rem;
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
        width: 1.4rem;
        text-align: right;
      }
      .right_text{
        color: #ff8400;
        font-weight: bold;
        font-size: .22rem;
        text-align: left;
        .unit{
          font-size: .18rem;
        }
      }
    }
  }
}
</style>
