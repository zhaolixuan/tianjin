<template>
  <div>
    <column-norms :norms="populationNorms" />
    <column-norms :norms="healthNorms" />
    <!-- <column-norms :norms="serviceNorms" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBaseServiceOrderCountInfo } from '@/views/ProvideAged/apis/index.js'
import ColumnNorms from './columnNorms.vue'
export default {
  name: 'Population',
  components: {
    ColumnNorms
  },
  data () {
    return {
      timer: null,
      orderCountInfo: {}
    }
  },
  computed: {
    ...mapGetters(['type', 'code', 'baseInfo', 'breadCrumbCodes']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.type - 1]] = this.code[0]

      return params
    },
    populationNorms () {
      const baseNormInfo = this.baseInfo.returnBaseTotalmap
      return [
        {
          label: '参与调查问卷老年人',
          value: this.breadCrumbCodes.length <= 1 ? 192137 : baseNormInfo.sixtyOldTotal,
          path: {
            path: 'olderPage',
            query: { startAge: '60', code: this.breadCrumbCodes }
          }
        },
        {
          label: '高龄',
          value: baseNormInfo.eightUnderTotal,
          tooltip: '80岁以上',
          path: {
            path: 'olderPage',
            query: { startAge: '80', code: this.breadCrumbCodes }
          }
        },
        {
          label: '独居',
          value: baseNormInfo.isAloneTotal,
          path: {
            path: 'olderPage',
            query: { isLone: '1', code: this.breadCrumbCodes }
          }
        },
        {
          label: '失独',
          value: baseNormInfo.isLiveAlonelTotal,
          path: {
            path: 'olderPage',
            query: { isLiveAlone: '1', code: this.breadCrumbCodes }
          }
        },
        {
          label: '失能',
          value: baseNormInfo.disabilityTotal,
          path: {
            path: 'olderPage',
            query: { personbody: '3', code: this.breadCrumbCodes }
          }
        }
      ]
    },
    healthNorms () {
      const baseNormInfo = this.baseInfo.returnBaseTotalmap
      const date = new Date()
      const year = date.getFullYear()
      const month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1)
      const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()

      return [
        // {
        //   label: '有健康档案',
        //   value: baseNormInfo.haveHealthRecordsTotal,
        //   path: {
        //     path: 'olderPage',
        //     query: { haveWeijian: '1', code: this.breadCrumbCodes }
        //   }
        // },
        {
          label: '低收入',
          value: baseNormInfo.lowIncome,
          tooltip: '社保待遇三千元以下',
          path: {
            path: 'olderPage',
            query: {
              haveShebao: '1',
              endMonthlyIncomeShe: '3000',
              code: this.breadCrumbCodes
            }
          }
        },
        {
          label: '残疾',
          value: baseNormInfo.disabledTotal,
          path: {
            path: 'disabledPage',
            query: {
              code: this.breadCrumbCodes,
              label: '残疾人'
            }
          }
        },
        {
          label: '领取补贴',
          value: baseNormInfo.allowanceTotal,
          path: {
            path: 'olderSubsidy',
            query: { code: this.breadCrumbCodes }
          }
        },
        {
          label: '今日生日',
          value: baseNormInfo.currentBirthdayTotal,
          path: {
            path: 'olderPage',
            query: {
              birthday: `${year}${month}${day}`,
              code: this.breadCrumbCodes
            }
          }
        }
      ]
    }
    // serviceNorms () {
    //   return [
    //     {
    //       label: '服务商家',
    //       value: this.orderCountInfo.merchantNameTotal,
    //       unit: '家',
    //       path: {
    //         path: '/ServiceBusiness',
    //         query: { code: this.breadCrumbCodes }
    //       }
    //     },
    //     {
    //       label: '服务老人',
    //       value: this.orderCountInfo.oldPersonTotal,
    //       unit: '人',
    //       path: {
    //         path: 'olderService',
    //         query: { code: this.breadCrumbCodes }
    //       }
    //     },
    //     {
    //       label: '服务工单',
    //       value: this.orderCountInfo.ordeCardTotal,
    //       unit: '单',
    //       path: {
    //         path: 'ServiceWork',
    //         query: {
    //           code: this.breadCrumbCodes,
    //           label: '服务工单'
    //         }
    //       }
    //     },
    //     {
    //       label: '本月服务工单',
    //       value: this.orderCountInfo.mongthTotal,
    //       unit: '单',
    //       path: {
    //         path: 'ServiceWork',
    //         query: {
    //           startTime: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    //           endTime: new Date(),
    //           label: '本月服务工单',
    //           code: this.breadCrumbCodes
    //         }
    //       }
    //     }, {
    //       label: '本日服务订单',
    //       value: this.orderCountInfo.dayTotal,
    //       unit: '单',
    //       path: {
    //         path: 'ServiceWork',
    //         query: {
    //           startTime: new Date(),
    //           endTime: new Date(),
    //           label: '本日服务订单',
    //           code: this.breadCrumbCodes
    //         }
    //       }
    //     }
    //   ]
    // }
  },
  watch: {
    type () {
      getBaseServiceOrderCountInfo(this.params).then(
        res => (this.orderCountInfo = res.data)

      )
    }
  },
  created () {
    getBaseServiceOrderCountInfo(this.params).then(
      res => (this.orderCountInfo = res.data)
    )
    this.handleGetServiceOrderCountInfo()
  },
  methods: {
    handleGetServiceOrderCountInfo () {
      this.timer = setInterval(() => {
        getBaseServiceOrderCountInfo(this.params).then(
          res => (this.orderCountInfo = res.data)
        )
      }, 30000)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
