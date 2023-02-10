<template>
  <div>
    <div class="serveType">
      <div class="time">
        <span>日期</span>
        <div class="startTime"
             @click="setTime('startTime')">
          <van-icon name="notes-o" /> {{ startTime || "开始时间" }}
        </div>
        至
        <div class="endTime"
             @click="setTime('endTime')">
          <van-icon name="notes-o" />{{ endTime || "结束时间" }}
        </div>
      </div>
      <div class="titles">
        <p>服 务 商</p>
        <el-select style="left: 14px"
                   size="mini"
                   clearable
                   v-model="project"
                   v-on:change="handleChangeCompany">
          <el-option v-for="(i, index) in selectList"
                     :key="index"
                     :label="i.companyname"
                     :value="i.companyname"></el-option>
        </el-select>
      </div>
      <div class="titles">
        <p>载体名称</p>
        <el-select style="left: 10px"
                   size="mini"
                   clearable
                   v-model="mealsInfo"
                   v-on:change="handleChangeCompany1">
          <el-option v-for="(i, index) in mealsInfoList"
                     :key="index"
                     :label="i.MerchantName"
                     :value="i.MerchantName"></el-option>
        </el-select>
      </div>

      <div class="chartDiv"
           id="serveTypeChart2"></div>
    </div>
    <van-popup v-model="showPicker"
               position="bottom">
      <van-datetime-picker v-model="currentDate"
                           @confirm="pickerconfirm"
                           @cancel="pickercancel"
                           type="date"
                           title="选择年月日" />
    </van-popup>
  </div>
</template>

<script>
import { getNowFormatDay } from '@/utils/time'
import * as api from '@/api/ksh'

export default {
  data() {
    return {
      showPicker: false,
      currentDate: new Date(),
      startTime: getNowFormatDay(new Date(new Date() - 604800000)),
      endTime: getNowFormatDay(new Date()),
      type: this.$route.query.type,
      activetime: '',
      serviceprovider: [],
      project: '',
      mealsInfo: '',
      selectList: [],
      mealsInfoList: [],
    }
  },
  created() {},
  watch: {
    startTime() {
      if (this.endTime) {
        this.initData()
      }
    },
    endTime() {
      if (this.startTime) {
        this.initData()
      }
    },
  },
  mounted() {
    this.initData()
    this.serviceCompanyNameDict()
  },
  methods: {
    initData() {
      this.serviceConditionTendency()
    },
    handleChangeCompany() {
      this.servicecompanyChildMealsInfoDict()
      this.initData()
    },
    handleChangeCompany1() {
      this.initData()
    },
    //  服务载体服务情况排名
    serviceConditionTendency() {
      let data = {
        startTime: this.startTime,
        endTime: this.endTime,
        companyName: this.project,
        canteenlevel: this.mealsInfo,
      }
      api.serviceConditionTendency(data).then((res) => {
        let lineData = [],
          barData = [],
          xData = []
        res.forEach((i) => {
          barData.push(i.serviceCount)
          lineData.push(i.consumePrice)
          xData.push(i.formatDate)
        })
        var chartDom = document.getElementById('serveTypeChart2')
        var myChart = echarts.init(chartDom)
        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            },
          },
          grid: {
            right: '15%',
          },

          legend: {
            top: '5%',
            data: ['服务量', '金额'],
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(229,230,235,1)',
                },
              },
              axisLabel: {
                color: '#000',
                //   formatter: '{value} ml',
              },
              // prettier-ignore
              data: xData,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '',
              position: 'right',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(229,230,235,1)',
                },
              },
              axisLabel: {
                color: '#000',
                //   formatter: '{value} °C',
              },
            },
            {
              type: 'value',
              name: '',
              position: 'left',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(229,230,235,1)',
                },
              },
              axisLabel: {
                color: '#000',
                //   formatter: '{value} ml',
              },
            },
          ],
          dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 100,
            },
            {
              start: 0,
              end: 100,
            },
          ],
          series: [
            {
              name: '服务量',
              type: 'bar',
              data: barData,
              yAxisIndex: 1,
              itemStyle: {
                color: ' rgba(129,226,255,1)',
                borderRadius: 50,
              },
            },

            {
              name: '金额',
              type: 'line',
              yAxisIndex: 0,
              data: lineData,
              showSymbol: false,
              smooth: true,
              areaStyle: {
                //覆盖区域的渐变色
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgba(58,132,255, 0.4)', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(58,132,255, 0)', // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  },
                },
              },
              lineStyle: {
                normal: {
                  width: 3,
                  color: {
                    type: 'linear',

                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgba(255,201,30,1)', // 0% 处的颜色
                      },
                      {
                        offset: 0.6,
                        color: 'rgba(255,152,35,1)', // 100% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(251,110,66,1)', // 100% 处的颜色
                      },
                    ],
                    globalCoord: false, // 缺省为 false
                  },
                },
              },
            },
          ],
        }
        option && myChart.setOption(option)
      })
    },

    serviceCompanyNameDict() {
      api.serviceCompanyNameDict({}).then((res) => {
        this.selectList = res
      })
    },
    servicecompanyChildMealsInfoDict() {
      api
        .servicecompanyChildMealsInfoDict({ companyName: this.project })
        .then((res) => {
          this.mealsInfoList = res
        })
    },
    setTime(name) {
      this.currentDate = new Date(this[name])
      this.activetime = name
      this.showPicker = true
    },
    pickerconfirm(n) {
      this[this.activetime] = getNowFormatDay(n)
      this.showPicker = false
    },
    pickercancel(n) {},
  },
}
</script>

<style scoped lang="less">
.serveType {
  background: rgba(255, 255, 255, 1);
  #serveTypeChart2 {
    height: 282px;
  }
  .time {
    white-space: nowrap;
    padding: 11px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    div {
      width: 115px;
      height: 32px;
      background: rgba(249, 249, 249, 1);
      border: 1px solid rgba(236, 236, 236, 1);
      border-radius: 12px;
      line-height: 30px;
      color: rgba(3, 134, 255, 1);
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      .van-icon {
        margin-right: 9px;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  .title {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    text-align: left;
  }

  .titles {
    margin-top: 10px;
    font-size: 15px;
    font-family: PingFang SC;
    color: rgba(51, 51, 51, 1);
    text-align: left;
    display: flex;
    margin-left: 12px;
  }
  .chartDiv {
    border-radius: 4px;
  }

  .itemprog {
    padding: 12px 8px 12px 12px;
    display: flex;
    align-items: center;
    .itemprogName {
      font-size: 14px;
      font-family: PingFang SC;
      width: 110px;
    }
    .itemprogValue {
      font-size: 16px;
      font-family: PingFang SC;
      margin-left: 14px;
    }
    .ranking {
      flex: 1;
      display: flex;
      flex-direction: column;
      .rankingitem {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
