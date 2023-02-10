<template>
  <list-layout
    :crumbData="[{ title: this.$route.query.label, url: '' }]"
    :columns="columns"
    :tableData="tableData"
    unit="个"
    :pageSize="pageSize"
    header="街道社区服务率排名"
    :currentPage="currentPage"
    v-on:getSearchValue="handleGetSearchValue"
    backPath="FiveService"
    :objectSpanMethod="objectSpanMethod"
    title="五大服务类别数据综合分析————街道社区服务率排名"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="起始时间：" class="search_select search_time">
        <el-date-picker
          v-model="formData.beginDay"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="开始日期"
        >
        </el-date-picker>
        <el-date-picker
          v-model="formData.endDay"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="截止日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="街道" class="search_select">
        <el-select
          v-model="formData.streetCode"
          clearable
          placeholder="请选择街道"
        >
          <el-option
            v-for="(option, index) in streetData"
            :key="index"
            :label="option.name"
            :value="option.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="社区" class="search_select">
        <el-select
          v-model="formData.communityCode"
          clearable
          placeholder="请选择社区"
        >
          <el-option
            v-for="(option, index) in communityData"
            :key="index"
            :label="option.name"
            :value="option.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄区间段" class="search_select">
        <el-input
          class="input_num"
          placeholder="起始年龄"
          v-model="formData.beginEge"
        />
        <span>-</span>
        <el-input
          class="input_num"
          placeholder="截止年龄"
          v-model="formData.endEge"
        />
      </el-form-item>
    </el-form>
    <div class="btns_box">
      <div class="btns_right">
        <el-button @click="clearSearchValue" class="btn">重置</el-button>
        <el-button
          class="btn"
          icon="el-icon-search"
          :loading="isSearchLoading"
          @click="handleGetSearchValue"
          >查询</el-button
        >
        <!-- <a :href="downloadExcel" target="_blank">
          <el-button class="btn" >导出</el-button>
        </a> -->
      </div>
    </div>
    <Menu></Menu>
  </list-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/api/api.js'
import ListLayout from '@/components/TablerList/layout.vue'
import Menu from '@/views/OlderDistribution/components/Menu'

export default {
  data () {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false
        },
        bar: {
          background: '#eee'
        }
      },
      isSearchLoading: false,
      columns: [
        { label: '街道', prop: 'name' },
        { label: '社区', prop: 'communityName' },
        { label: '老年人口数', prop: 'peopleTotal' },
        { label: '享受服务老年人口数', prop: 'orderPeopleTotal' },
        { label: '服务量（客次）', prop: 'serviceTotal' },
        { label: '服务率', prop: 'serviceRatio' }
      ],
      tableData: [],
      streetData: [],
      communityData: [],
      fullscreen: true,
      index: 1,
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页数
      formData: {
        beginDay: new Date(),
        endDay: new Date(),
        streetCode: '',
        communityCode: '',
        beginEge: '',
        endEge: ''
      },
      params: {},
      spanArr: [],
      position: 0,
      colArr: []
    }
  },
  computed: {
    ...mapGetters(['userType', 'code'])
  },
  watch: {
    'formData.streetCode': {
      handler () {
        this.getCommunityInfo()
      }
    },
    tableData () {
      this.rowspan()
    }
  },
  created () {
    this.$store
      .dispatch('getUserAuthInfo')
      .then(() => {
        this.handleGetSearchValue()
        this.getStreet()
      })
      .catch((err) => {
        console.log('获取用户权限失败', err)
      })
  },

  methods: {
    handleGetSearchValue (page) {
      this.isSearchLoading = true
      api
        .getCommunityServiceInfo(this.formData)
        .then((res) => {
          this.isSearchLoading = false
          const { communityEatPeopleMap, communityEatPeopleAllMap } = res && res.data
          this.tableData = communityEatPeopleMap || []
          let AllData = communityEatPeopleMap || []
          this.tableData.unshift(
            {
              streetName: '总计',
              name: '总计',
              peopleTotal: communityEatPeopleAllMap[0].peopleTotal,
              orderPeopleTotal: communityEatPeopleAllMap[0].orderPeopleTotal,
              serviceTotal: communityEatPeopleAllMap[0].serviceTotal,
              serviceRatio: Math.round(communityEatPeopleAllMap[0].orderPeopleTotal / communityEatPeopleAllMap[0].peopleTotal * 10000) / 100 + '%'
            }
          )
          this.tableData.map((item, index) => {
            if (item.streetName.indexOf('合计') === -1 && item.streetName.indexOf('总计') === -1) {
              let daTH = AllData.filter(ite => ite.streetName === item.streetName)
              item.name = item.streetName + '(共计' + daTH.length + '个社区)'
            }
            let allData = []
            if (
              this.tableData[index].streetName !==
                  this.tableData[index + 1].streetName
            ) {
              let data = []
              let topData = this.tableData.slice(0, index + 1)
              if (this.tableData[index].streetName.indexOf('合计') === -1 && item.streetName.indexOf('总计') === -1) {
                allData = this.tableData.filter(
                  (old) => old.streetName === this.tableData[index].streetName
                )
                topData.push({
                  streetName: this.tableData[index].streetName + '合计',
                  name: this.tableData[index].streetName + '合计',
                  peopleTotal: allData.reduce((preVal, curVal) => {
                    return Number(preVal) + Number(curVal.peopleTotal || 0)
                  }, 0),
                  orderPeopleTotal: allData.reduce((preVal, curVal) => {
                    return (
                      Number(preVal) + Number(curVal.orderPeopleTotal || 0)
                    )
                  }, 0),
                  serviceTotal: allData.reduce((preVal, curVal) => {
                    return Number(preVal) + Number(curVal.serviceTotal || 0)
                  }, 0)
                })
              }
              let botData = this.tableData.slice(index + 1)
              data = topData.concat(botData)
              this.tableData = data
            }
            if (index === AllData.length - 1) {
              let botTotal = this.tableData.filter(
                (old) => old.streetName === AllData[index].streetName
              )
              let streeTotal = this.tableData.filter(
                (old) => old.streetName === '陈塘庄街道'
              )
              let indx = this.tableData.findIndex(item => item.streetName === '马场街道')
              let topData = this.tableData.slice(0, indx)
              topData.push(
                {
                  streetName: '陈塘庄街道合计',
                  name: '陈塘庄街道合计',
                  peopleTotal: streeTotal.reduce((preVal, curVal) => {
                    return Number(preVal) + Number(curVal.peopleTotal || 0)
                  }, 0),
                  orderPeopleTotal: streeTotal.reduce((preVal, curVal) => {
                    return (
                      Number(preVal) + Number(curVal.orderPeopleTotal || 0)
                    )
                  }, 0),
                  serviceTotal: streeTotal.reduce((preVal, curVal) => {
                    return Number(preVal) + Number(curVal.serviceTotal || 0)
                  }, 0)
                }
              )
              let botData = this.tableData.slice(indx)
              let data = topData.concat(botData)
              this.tableData = data
              this.tableData.push(
                {
                  streetName: AllData[index].streetName + '合计',
                  name: AllData[index].streetName + '合计',
                  peopleTotal: botTotal.reduce((preVal, curVal) => {
                    return Number(preVal) + Number(curVal.peopleTotal || 0)
                  }, 0),
                  orderPeopleTotal: botTotal.reduce((preVal, curVal) => {
                    return (
                      Number(preVal) + Number(curVal.orderPeopleTotal || 0)
                    )
                  }, 0),
                  serviceTotal: botTotal.reduce((preVal, curVal) => {
                    return Number(preVal) + Number(curVal.serviceTotal || 0)
                  }, 0)
                }
              )
            }
          })
          this.rowspan()
        })
        .catch(() => {
          this.isSearchLoading = false
        })
    },
    getStreet () {
      api.getStreetInfo().then((res) => {
        this.streetData = res || []
      })
    },
    getCommunityInfo () {
      api.getCommunityInfo({ code: this.formData.streetCode }).then((res) => {
        this.communityData = res || []
      })
    },
    clearSearchValue () {
      this.formData = Object.assign({}, this.formData, {
        beginDay: '',
        endDay: '',
        streetCode: '',
        communityCode: ''
      })
    },
    rowspan () {
      this.spanArr = []
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1)
          this.position = 0
        } else {
          if (
            this.tableData[index].streetName ===
            this.tableData[index - 1].streetName
          ) {
            this.spanArr[this.position] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.position = index
          }
        }
      })
    },

    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (row.streetName.indexOf('合计') !== -1 || row.streetName.indexOf('总计') !== -1) {
        const _row = [2, 0, 1, 1, 1, 1]
        return {
          rowspan: 1,
          colspan: _row[columnIndex]
        }
      }
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  },
  components: {
    ListLayout,
    Menu
  }
}
</script>
<style scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 1.6rem;
  margin-right: 0.2rem;
}
</style>
