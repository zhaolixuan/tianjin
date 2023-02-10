<template>
  <div class="serverHome">
    <Box-header :headerData="serviceHeaderData"
                @handelActive="servicehandelActive"
                :activeHeader="activeHeader" />
    <FWJH v-if="activeHeader == 2"
          :serviceContentData="FWJHserviceContentData"
          :activeHeader="activeHeader" />
    <YYYFW v-else-if="activeHeader == 6"
           :serviceContentData="YYYFWserviceContentData"
           :activeHeader="activeHeader" />
    <FWWC v-else
          :serviceContentData="FWWCserviceContentData"
          :activeHeader="activeHeader"
          @handleChangeTime="handleChangeTime"
          :infoData="infoData" />
  </div>
</template>

<script>
import BoxHeader from './component/BoxHeader.vue'
import FWJH from './component/FWJH.vue'
import YYYFW from './component/YYYFW.vue'
import FWWC from './component/FWWC.vue'
import {
  findServicePlanList,
  searchAppointmentList,
  searchCompleteList,
  statisticalData,
} from '@/api/serviceExe'
import { getSessionItem } from '@/utils/storage'
import { getNowFormatDay } from '@/utils/time'
export default {
  data() {
    return {
      serviceHeaderData: [
        {
          id: 2,
          name: '服务计划',
        },
        {
          id: 6,
          name: '已预约服务',
        },
        {
          id: 8,
          name: '服务完成',
        },
      ],
      activeHeader: 2,
      FWJHserviceContentData: [],
      YYYFWserviceContentData: [],
      FWWCserviceContentData: [],

      infoData: {},
    }
  },
  components: {
    BoxHeader,
    FWJH,
    YYYFW,
    FWWC,
  },
  created() {
    if (this.$route.query.type) {
      this.activeHeader = this.$route.query.type * 1
    }
  },

  watch: {
    activeHeader(n) {
      switch (n) {
        case 2:
          this.getFWJHData()
          break
        case 6:
          this.getYYYFWData()
          break
        case 8:
          break

        default:
          break
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === '/server-home') {
      from.meta.keepAlive = false
    } else {
      from.meta.keepAlive = true
    }
    next()
  },
  activated() {
    if (this.$route.query.type) {
      this.activeHeader = this.$route.query.type * 1
    }
  },
  mounted() {
    switch (this.activeHeader) {
      case 2:
        this.getFWJHData()
        break
      case 6:
        this.getYYYFWData()
        break
      default:
        break
    }
    this.$route.meta.keepAlive = true
  },
  methods: {
    handleChangeTime(value) {
      var dt = new Date()
      dt.setMonth(dt.getMonth() - value)
      let startTime = getNowFormatDay(new Date(dt))
      let data = {
        endTime: value ? getNowFormatDay(new Date()) : null,
        startTime: value ? startTime : null,
        account: getSessionItem('account'),
      }
      statisticalData(data)
        .then((res) => {
          if (res && res.code == 200) {
            this.FWWCserviceContentData = res.data.orderList
            this.infoData = {
              serviceOrderCount: res.data.serviceOrderCount,
              servicePeopleCount: res.data.servicePeopleCount,
              serviceTimeCount: res.data.serviceTimeCount,
            }
          } else {
            this.FWWCserviceContentData = []
            this.infoData = {}
          }
        })
        .catch((err) => {})
    },
    getFWJHData() {
      findServicePlanList({ account: getSessionItem('account') })
        .then((res) => {
          if (res && res.code == 200) {
            res.data.forEach((i) => {
              i.serviceTime = i.serviceStartTime + '-' + i.serviceEndTime
            })

            this.FWJHserviceContentData = res.data
          } else {
            this.FWJHserviceContentData = []
          }
        })
        .catch((err) => {})
    },
    getYYYFWData() {
      searchAppointmentList({ account: getSessionItem('account') })
        .then((res) => {
          if (res && res.code == 200) {
            res.data.forEach((i) => {
              i.address = i.street + i.community + i.address
            })
            this.YYYFWserviceContentData = res.data
          } else {
            this.YYYFWserviceContentData = []
          }
        })
        .catch((err) => {})
    },
    servicehandelActive(n) {
      this.activeHeader = n
    },
  },
}
</script>

<style scoped lang="less">
.serverHome {
  // padding-bottom: 70px;
}
</style>
