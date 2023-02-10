<template>
  <marquee class="service-order_marquee" v-if="lastOrder">
    最新的订单：
    <span>老人姓名：{{ formatName(lastOrder.serviceOrderName) }}，</span>
    <span>下单时间：{{ lastOrder.serviceOrderTime }}，</span>
    <span>预约时间：{{ lastOrder.appointmentsTime }}，</span>
    <span>服务项目：{{ lastOrder.serviceOrderItem }}，</span>
    <span>家庭地址：{{ formatNumber(lastOrder.serviceOrderAddress) }}</span>
  </marquee>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBaseServiceOrderInfo } from '@/views/ProvideAged/apis/index.js'

export default {
  name: 'ServiceOrder',
  data () {
    return {
      orderInfo: [],
      timer: null
    }
  },
  computed: {
    ...mapGetters(['type', 'code']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.type - 1]] = this.code[0]

      return params
    },
    lastOrder () {
      return this.orderInfo[0] && this.orderInfo[0].serviceOrderCard ? this.orderInfo[0] : null
    }
  },
  created () {
    // this.getOrderInfo()
  },
  methods: {
    getOrderInfo () {
      this.timer = setInterval(() => {
        getBaseServiceOrderInfo(this.params).then(
          res => (this.orderInfo = res.data)
        )
      }, 5000)
    },
    formatName (name) {
      return name
        ? name
          .split('')
          .map((item, index) => (index > 0 ? '*' : item))
          .join('')
        : ''
    },
    formatNumber (number) {
      return number
        ? number
          .split('')
          .map((item, index) => (!isNaN(item) || item == '-' ? '*' : item))
          .join('')
        : ''
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.service-order_marquee {
  float: right;
  width: 60%;
  font-size: 0.214rem;
  color: rgba(140, 255, 254, 1);
}
</style>
