<template>
  <div class="kshserve">
    <div class="banner">
      <img src="../../assets/images/kshbanner.png"
           alt="" />
    </div>
    <div class="Statistics">
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
      <div class="data">
        <div class="num">
          <span class="value">
            {{ countAndPrice.serviceCount }}
          </span>
          <span class="name">
            <img src="../../assets/images/numicon.png"
                 alt="" />
            服务量/客次
          </span>
        </div>
        <div class="money">
          <span class="value">
            {{ countAndPrice.consumePrice }}
          </span>
          <span class="name">
            <img src="../../assets/images/moneyicon.png"
                 alt="" />
            消费金额/元
          </span>
        </div>
      </div>
    </div>
    <div class="chartBox">
      <div class="serveType">
        <div class="title">
          <p>服务类别统计</p>
        </div>
        <div class="chartDiv"
             id="serveTypeChart"></div>
      </div>
      <div class="serveType">
        <div class="title">
          <p>服务项目统计</p>
          <el-select size="mini"
                     clearable
                     v-model="project">
            <el-option v-for="(i, index) in selectList"
                       :key="index"
                       :label="i"
                       :value="i"></el-option>
          </el-select>
        </div>
        <div class="chartDiv">
          <div class="itemprog"
               v-for="i in serveproject"
               :key="i.name">
            <span class="itemprogName">{{ i.name }}</span>
            <el-progress style="width: 60%"
                         :stroke-width="24"
                         :text-inside="true"
                         :color="customColorMethod"
                         :show-text="false"
                         :percentage="i.percentage"></el-progress>
            <span class="itemprogValue">{{ i.value }}客次 </span>
          </div>
          <span v-cloak
                v-if="!serveproject.length">暂无数据</span>
        </div>
      </div>

      <div class="serveType">
        <div class="title">
          <p>服务商服务情况排名</p>
        </div>
        <div class="chartDiv">
          <div class="itemprog"
               v-for="i in serviceprovider"
               :key="i.name">
            <span class="itemprogName">{{ i.name }}</span>
            <div class="ranking">
              <div class="rankingitem">
                <el-progress style="width: 60%"
                             :stroke-width="20"
                             :text-inside="true"
                             :show-text="false"
                             :percentage="i.numpercentage"></el-progress>
                <span class="itemprogValue">{{ i.num }}客次 </span>
              </div>
              <div class="rankingitem">
                <el-progress style="width: 60%"
                             :stroke-width="20"
                             :text-inside="true"
                             status="success"
                             :show-text="false"
                             :percentage="i.moneypercentage"></el-progress>
                <span class="itemprogValue">{{ i.money }}元 </span>
              </div>
            </div>
          </div>
          <div class="footBtn">
            <p v-cloak
               v-if="serviceprovider.length"
               @click="Seemore('服务商')">
              查看更多
            </p>
            <span v-cloak
                  v-else>暂无数据</span>
          </div>
        </div>
      </div>

      <div class="serveType">
        <div class="title">
          <p>服务载体服务情况排名</p>
        </div>
        <div class="chartDiv">
          <div class="itemprog"
               v-for="i in servicecarrier"
               :key="i.name">
            <span class="itemprogName">{{ i.name }}</span>
            <div class="ranking">
              <div class="rankingitem">
                <el-progress style="width: 60%"
                             :stroke-width="20"
                             :text-inside="true"
                             :show-text="false"
                             :percentage="i.numpercentage"></el-progress>
                <span class="itemprogValue">{{ i.num }}客次 </span>
              </div>
              <div class="rankingitem">
                <el-progress style="width: 60%"
                             :stroke-width="20"
                             :text-inside="true"
                             status="success"
                             :show-text="false"
                             :percentage="i.moneypercentage"></el-progress>
                <span class="itemprogValue">{{ i.money }}元 </span>
              </div>
            </div>
          </div>
          <div class="footBtn">
            <p v-if="servicecarrier.length"
               @click="Seemore('服务载体')">
              查看更多
            </p>
            <span v-else>暂无数据</span>
          </div>
        </div>
      </div>

      <div class="serveType">
        <div class="title">
          <p>服务情况趋势图</p>
        </div>
        <div class="chartDiv"
             id="serveTypeChart1"></div>
        <div class="footBtn">
          <p @click="Seemore('服务情况趋势图')">
            查看更多
          </p>

        </div>
      </div>
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
      startTime: getNowFormatDay(new Date()),
      endTime: getNowFormatDay(new Date()),
      activetime: '',
      serveproject: [],
      serviceprovider: [],
      servicecarrier: [],
      project: '助餐服务类',
      selectList: [
        '助餐服务类',
        '生活照料类',
        '托养床位类',
        '助医服务类',
        '其他服务类',
      ],
      countAndPrice: {},
      timer: null,
    }
  },
  created() {
    this.initData()
    this.serviceConditionTendency()
  },
  mounted() {
      // 每隔5分钟定时刷新
    this.timer = setInterval(() => {
      this.initData()
      this.serviceConditionTendency()
    }, 300000)
  },
  beforeDestroy() {
    this.timer = null
  },
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
    project() {
      this.serviceProject()
    },
  },
  methods: {
    initData() {
      this.serviceCountAndPrice()
      this.serviceType()
      this.serviceProject()
      this.serviceCompanyNameRanking()
      this.serviceMealsInfoNameRanking()
    },
    //  服务量、金额
    serviceCountAndPrice() {
      let data = {
        startTime: this.startTime,
        endTime: this.endTime,
      }
      api.serviceCountAndPrice(data).then((res) => {
        this.countAndPrice = res
      })
    },
    //  服务类别统计
    serviceType() {
      let data = {
        startTime: this.startTime,
        endTime: this.endTime,
      }
      api.serviceType(data).then((res) => {
        let data = []
        res.forEach((i) => {
          data.push({ value: i.count, name: i.type })
        })
        var chartDom = document.getElementById('serveTypeChart')
        var myChart = echarts.init(chartDom)
        let option = {
          // 全局调色盘。
          color: [
            '#249EFF',
            '#21D7FF',
            '#846BCE',
            '#86DF6C',
            '#0E42D2',
            '#FAC509',
            '#FA6009',
            '#FA1809',
          ],
          tooltip: {
            trigger: 'item',
            show: false,
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            icon: 'circle',
            orient: 'vertical',
            right: '20',
            top: '20%',
            itemStyle: {
              opacity: 0.7,
            },
            textStyle: {
              color: '#8C8C8C',
              fontSize: 12,
              fontWeight: 400,
            },
          },

          series: [
            {
              name: '',
              type: 'pie',
              radius: [40, 60],
              top: '10%',
              left: '-8%',
              data: data,
              label: {
                formatter: '{b}\n{c}客次 \n{d}%',
                fontSize: '14',
              },
            },
          ],
        }
        option && myChart.setOption(option)
      })
    },
    //  服务项目统计
    serviceProject() {
      let data = {
        startTime: this.startTime,
        endTime: this.endTime,
        project: this.project
      }
      api.serviceProject(data).then((res) => {
        this.serveproject = []
        res.forEach((i) => {
          this.serveproject.push({
            name: i.projectName,
            value: i.count,
            percentage: 100,
          })
        })
        this.handerServeproject()
      })
    },
    //  服务商服务情况排名
    serviceCompanyNameRanking() {
      let data = {
        startTime: this.startTime,
        endTime: this.endTime,
        page: 1,
        size: 5,
      }
      api.serviceCompanyNameRanking(data).then((res) => {
        this.serviceprovider = []
        res.forEach((i) => {
          this.serviceprovider.push({
            name: i.companyName,
            num: i.serviceCount,
            money: i.consumePrice,
            numpercentage: 100,
            moneypercentage: 100,
          })
        })
        this.handerServiceprovider()
      })
    },
    //  服务载体服务情况排名
    serviceMealsInfoNameRanking() {
      let data = {
        startTime: this.startTime,
        endTime: this.endTime,
        page: 1,
        size: 5,
        companyName: '',
      }
      api.serviceMealsInfoNameRanking(data).then((res) => {
        this.servicecarrier = []
        res.forEach((i) => {
          this.servicecarrier.push({
            name: i.mealsInfoName,
            num: i.serviceCount,
            money: i.consumePrice,
            numpercentage: 100,
            moneypercentage: 100,
          })
        })
        this.handerServiceprovider()
      })
    },
    //  服务情况趋势图
    serviceConditionTendency() {
      let data = {
        startTime: getNowFormatDay(new Date(new Date() - 604800000)),
        endTime: getNowFormatDay(new Date()),
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
        var chartDom = document.getElementById('serveTypeChart1')
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

    Seemore(name) {
      if (name == '服务情况趋势图') {
        this.$router.push({
          path: '/serveKsh-trend',
          query: {
            type: name,
            startTime: this.startTime,
            endTime: this.endTime,
          },
        })
      } else {
        this.$router.push({
          path: '/serveKsh-ranking',
          query: {
            type: name,
            startTime: this.startTime,
            endTime: this.endTime,
          },
        })
      }
    },
    handerServeproject() {
      let arr = JSON.parse(JSON.stringify(this.serveproject))
      let maxnum = arr.sort((a, b) => b.value - a.value)[0].value
      this.serveproject.forEach((i) => {
        i.percentage = ((i.value / maxnum) * 100).toFixed(0) * 1
      })
    },
    handerServiceprovider() {
      this.serviceprovider.forEach((i) => {
        if (i.num > i.money) {
          i.moneypercentage = ((i.money / i.num) * 100).toFixed(0) * 1
        } else {
          i.numpercentage = ((i.num / i.money) * 100).toFixed(0) * 1
        }
      })
      this.servicecarrier.forEach((i) => {
        if (i.num > i.money) {
          i.moneypercentage = ((i.money / i.num) * 100).toFixed(0) * 1
        } else {
          i.numpercentage = ((i.num / i.money) * 100).toFixed(0) * 1
        }
      })
    },
    customColorMethod(percentage) {
      if (percentage < 17) {
        return 'rgba(255,121,64,1)'
      } else if (percentage < 60) {
        return 'rgba(255,213,64,1)'
      } else {
        return 'rgba(28,221,105,1)'
      }
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
.kshserve {
  position: relative;
  background: rgba(246, 246, 251, 1);
  .banner {
    width: 100%;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .Statistics {
    width: 347px;
    height: 169px;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    margin-top: -90px;
    margin-left: 14px;
    z-index: auto;
    position: absolute;

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
    .data {
      padding: 20px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        width: 150px;
        height: 88px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: rgba(255, 255, 255, 1);
        background-size: 100% 100%;
        justify-content: space-evenly;
        .value {
          font-size: 28px;
          font-family: DIN Condensed;
          font-weight: bold;
        }
        .name {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 600;
          img {
            width: 15%;
          }
        }
      }
      .num {
        background-image: url('../../assets/images/numbg.png');
      }
      .money {
        background-image: url('../../assets/images/moneybg.png');
      }
    }
  }
  .chartBox {
    margin-top: 70px;
    padding: 12px;
    .title {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 12px 0 8px 0;
    }
    .chartDiv {
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
    }
    #serveTypeChart {
      height: 186px;
    }
    #serveTypeChart1 {
      height: 282px;
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
        margin-left: 4px;
        white-space: nowrap;
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
    .footBtn {
      height: 44px;
      background: rgba(255, 255, 255, 1);
      border-radius: 0 0 4px 4px;
      box-shadow: inset 0 1px 0 0 rgba(235, 238, 241, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        width: 121px;
        height: 32px;
        background: rgba(26, 102, 255, 1);
        border-radius: 16px;
        cursor: pointer;
        font-size: 14px;
        font-family: PingFang SC;
        text-align: center;
        line-height: 32px;
        color: #fff;
      }
    }
  }
}
</style>
