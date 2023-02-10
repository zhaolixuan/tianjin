<template>
  <div>
    <div class="serveType">
      <div class="time">
        <span>日期</span>
        <div class="startTime" @click="setTime('startTime')">
          <van-icon name="notes-o" /> {{ startTime || "开始时间" }}
        </div>
        至
        <div class="endTime" @click="setTime('endTime')">
          <van-icon name="notes-o" />{{ endTime || "结束时间" }}
        </div>
      </div>

      <div class="titles" v-if="isShow">
        <p>载体级别</p>
        <el-select
          style="left: 10px"
          size="mini"
          clearable
          v-model="mealsInfo"
          v-on:change="handleChangeCompany"
        >
          <el-option
            v-for="(i, index) in mealsInfoList"
            :key="index"
            :label="i.canteenlevel"
            :value="i.canteenlevel"
          ></el-option>
        </el-select>
      </div>

      <div class="titles" v-if="isShow">
        <p>服 务 商</p>
        <el-select
          style="left: 14px"
          size="mini"
          clearable
          v-model="project"
          v-on:change="handleChangeCompany"
        >
          <el-option
            v-for="(i, index) in selectList"
            :key="index"
            :label="i.companyname"
            :value="i.companyname"
          ></el-option>
        </el-select>
      </div>

      <div class="chartDiv">
        <div
          class="itemprog"
          v-for="(i, index) in serviceprovider"
          :key="index"
        >
          <span class="itemprogName">{{ i.name }}</span>
          <div class="ranking">
            <div class="rankingitem">
              <el-progress
                style="width: 60%"
                :stroke-width="20"
                :text-inside="true"
                :show-text="false"
                :percentage="i.numpercentage"
              ></el-progress>
              <span class="itemprogValue">{{ i.num }}客次 </span>
            </div>
            <div class="rankingitem">
              <el-progress
                style="width: 60%"
                :stroke-width="20"
                :text-inside="true"
                status="success"
                :show-text="false"
                :percentage="i.moneypercentage"
              ></el-progress>
              <span class="itemprogValue">{{ i.money }}元 </span>
            </div>
          </div>
        </div>
        <span v-if="!serviceprovider.length">暂无数据</span>
      </div>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        @confirm="pickerconfirm"
        @cancel="pickercancel"
        type="date"
        title="选择年月日"
      />
    </van-popup>
  </div>
</template>

<script>
import { getNowFormatDay } from "@/utils/time";
import * as api from "@/api/ksh";

export default {
  data() {
    return {
      showPicker: false,
      currentDate: new Date(),
      startTime: this.$route.query.startTime,
      endTime: this.$route.query.endTime,
      type: this.$route.query.type,
      activetime: "",
      serviceprovider: [],
      project: "",
      mealsInfo: "",
      selectList: [],
      mealsInfoList: [],
      isShow:false
    };
  },
  created() {},
  watch: {
    startTime() {
      if (this.endTime) {
        this.initData();
      }
    },
    endTime() {
      if (this.startTime) {
        this.initData();
      }
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      if (this.type == "服务商") {
        this.isShow = false
        this.serviceCompanyNameRanking();
      } else {
          this.isShow = true
        this.serviceCompanyNameDict();
        this.serviceMealsInfoNameRanking();
      }
    },
    handleChangeCompany() {
      this.initData();
    },
    //  服务载体服务情况排名
    serviceMealsInfoNameRanking() {
      let data = {
        startTime: this.startTime,
        endTime: this.endTime,
        companyName: this.project,
        canteenlevel: this.mealsInfo,
      };
      api.serviceMealsInfoNameRanking(data).then((res) => {
        this.serviceprovider = [];
        res.forEach((i) => {
          this.serviceprovider.push({
            name: i.mealsInfoName,
            num: i.serviceCount,
            money: i.consumePrice,
            numpercentage: 100,
            moneypercentage: 100,
          });
        });
        this.handerServiceprovider();
      });
    },
    //  服务商服务情况排名
    serviceCompanyNameRanking() {
      let data = {
        startTime: this.startTime,
        endTime: this.endTime,
      };
      api.serviceCompanyNameRanking(data).then((res) => {
        this.serviceprovider = [];
        res.forEach((i) => {
          this.serviceprovider.push({
            name: i.companyName,
            num: i.serviceCount,
            money: i.consumePrice,
            numpercentage: 100,
            moneypercentage: 100,
          });
        });
        this.handerServiceprovider();
      });
    },

    serviceCompanyNameDict() {
      api.serviceCompanyNameDict({}).then((res) => {
        this.selectList = res;
      });

      api.serviceMealsInfoDict({}).then((res) => {
        this.mealsInfoList = res;
      });
    },

    setTime(name) {
      this.currentDate = new Date(this[name])
      this.activetime = name;
      this.showPicker = true;
    },
    pickerconfirm(n) {
      this[this.activetime] = getNowFormatDay(n);
      this.showPicker = false;
    },
    pickercancel(n) {},
    handerServiceprovider() {
      this.serviceprovider.forEach((i) => {
        if (i.num > i.money) {
          i.moneypercentage = ((i.money / i.num) * 100).toFixed(0) * 1;
        } else {
          i.numpercentage = ((i.num / i.money) * 100).toFixed(0) * 1;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.serveType {
  background: rgba(255, 255, 255, 1);

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
