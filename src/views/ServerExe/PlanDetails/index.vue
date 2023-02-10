<template>
  <div class="PlanDetails">
    <nav class="box info">
      <p class="title">用户信息</p>
      <div class="infobox">
        <div class="left">
          <img v-if="detailData.avatar"
               :src="detailData.avatar"
               alt="" />
          <div v-else
               class="imgBox">{{ detailData.oldPeople }}</div>
        </div>
        <div class="right">
          <p class="name">{{ detailData.oldPeople }}</p>
          <p class="data">
            <span>性别：{{ detailData.sex }}</span>
            <span>年龄：{{ detailData.age }}</span>
            <!-- <span>身体状况：{{ detailData.healthStatus }}</span> -->
            <span>具体服务地址：{{ detailData.communityName }}</span>
            <span></span>
            <span>
              <a style=" color: rgba(0, 0, 0, 0.5);"
                 :href="`tel:${detailData.phone}`">联系方式：{{ detailData.telephone }}</a>
            </span>
            <span :title=" detailData.serviceStartTime +'-' + detailData.serviceEndTime">具体时间范围：{{ detailData.serviceStartTime }} -
              {{ detailData.serviceEndTime }}</span>
          </p>
        </div>
      </div>
    </nav>
    <div class="details_content">
      <div class="details_content_tab">
        <p v-for="i in tabList"
           :key="i.projectName"
           :class="tabActive == i.projectName ? 'active' : ''"
           @click="handeltabClick(i)">
          {{ i.projectName }}
        </p>
      </div>
      <div class="details_content_centent">
        <div class="details_content_centent_item"
             v-for="i in commodityList"
             :key="i.id">
          <div class="commodity_item">
            <van-checkbox class="checkbox"
                          checked-color="#05B279"
                          v-model="i.checked"
                          @change="handerChecked(i)">复选框</van-checkbox>
            <p>
              <label for=""> 服务项目</label>{{ i.projectClass }}
            </p>
            <p><label for=""> 服务类别</label>{{ i.className }}</p>
            <p>
              <label for=""> 需服务次数</label>{{ i.serviceNum }}次
            </p>
            <p>
              <label for=""> 已服务次数</label>{{ i.timedServed || 0 }}次
            </p>
            <p>
              <label for=""> 收费金额</label>{{ i.charges || 0 }}元
            </p>
            <span>￥{{ i.price }}</span>
          </div>
        </div>
        <van-empty v-if="!commodityList.length"
                   description="暂无服务计划" />
      </div>
    </div>
    <div class="footer">
      <div class="footer_item">
        <p>总价</p>
        <p class="money">￥{{ price }}</p>
      </div>
       <div class="footer_item">
        <p>收费总金额</p>
        <p class="money">￥{{ chargesprice }}</p>
      </div>
      <div class="footer_item">
        <p>选择上门时间</p>
        <p class="time"
           @click="handerPoroShow">
          {{ currentDate || '请选择上门服务时间' }}
        </p>
      </div>
      <van-button @click="submite"
                  type="primary"
                  color="#05B279"
                  round
                  size="large"
                  :loading="loading">预约服务下单</van-button>
    </div>
    <TimeSelect ref="timeSelect"
                @handelShow="handelShow" />
    <van-notice-bar class="notice"
                    color="#ed6a0c"
                    background="#fffbe8"
                    left-icon="info-o"
                    v-if="noticeShow">
      请选择{{ notice }}
    </van-notice-bar>
  </div>
</template>

<script>
import TimeSelect from './component/timeSelect.vue'
import {
  familyType,
  familyPlanDetail,
  saveServiceOrder,
} from '@/api/serviceExe'
import { getSessionItem } from '@/utils/storage'

export default {
  data() {
    return {
      detailData: {},
      tabList: [],
      tabActive: '',
      tabCode: '',
      commodityList: [],
      currentDate: '',
      price: 0,
      chargesprice: 0,
      notice: '',
      noticeShow: false,
      loading: false,
    }
  },
  components: {
    TimeSelect,
  },
  watch: {
    tabActive() {
    //   this.price = 0
    //   this.chargesprice = 0
      this.getData()
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === '/server-CwfwModel') {
      to.meta.keepAlive = true
    }
    next()
  },
  computed: {},
  created() {},
  mounted() {
    this.getData()
    this.getTabListData()
  },
  methods: {
    getData() {
      let data = {
        familyPlanId: this.$route.query.id,
        familyType: this.tabActive == '全部' ? '' : this.tabActive,
      }
      familyPlanDetail(data).then((res) => {
        if (res && res.code == 200) {
          this.detailData = res.data[0].oldPeopleInfotation
          this.commodityList = res.data[0].serviceProjectList.map((i) => {
            i.checked = false
            return i
          })
          // this.commodityList
        }
      })
    },
    getTabListData() {
      familyType().then((res) => {
        if (res && res.code == 200) {
          res.data.forEach((i) => {
            this.tabList.push({ projectName: i.name, code: i.code })
            this.tabActive = this.tabList[0].projectName
            this.tabCode = this.tabList[0].code
          })
        }
      })
    },
    handerChecked(e) {
      if (e.checked) {
        this.price += e.price * 1
        this.chargesprice += e.charges * 1
      } else {
        this.price -= e.price * 1
        this.chargesprice -= e.charges * 1

      }
    },
    handerPoroShow() {
      this.$refs.timeSelect.popupShow = true
    },
    handelShow(time) {
      var arr = time.split('-')
      arr.splice(3, 1)
      this.currentDate = arr.join('-')
    },
    handeltabClick(i) {
      // this.projectCode = i.projectCode
      this.tabActive = i.projectName
      this.tabCode = i.code
    },
    submite() {
      if (!this.price) {
        this.notice = '服务项目'
        this.noticeShow = true
        return
      }
      if (this.currentDate === '') {
        this.notice = '上门时间'
        this.noticeShow = true
        return
      }
      this.loading = true
      let projects = []
      this.commodityList.forEach((i) => {
        if (i.checked) {
          projects.push({
            projectName: i.projectClass,
            projectCode: i.projectClassCode,
            name: i.projectClass,
            price: i.price,
            number: 1,
            totalPrice: i.price,
            typeName: i.className,
            typeCode: i.classCode,
            charges:i.charges
          })
        }
      })
      let {
        idCard,
        // serviceStartTime,
        // serviceEndTime,
        communityName,
        streetName,
        oldPeople,
        address,
        pensioncardNumber,
        telephone,
      } = this.detailData
      let data = {
        oldPeople,
        address,
        projects,
        totalPrice: this.price,
        totalCharges: this.chargesprice,
        serviceDate: this.currentDate,
        phone: telephone,
        idcardNumber: idCard,
        // startTime: serviceStartTime,
        // endTime: serviceEndTime,
        street: streetName,
        community: communityName,
        // typeCode: this.tabCode,
        // type: this.tabActive,
        pensioncardNumber,
        familyPlanId: this.$route.query.id,
      }
      saveServiceOrder(data)
        .then((res) => {
          if (res && res.code == 200) {
            this.noticeShow = false
            this.$toast.success('预约服务下单成功！')
            setTimeout(() => {
              this.loading = false
              this.$router.push({
                path: 'server-CwfwModel',
                query: { type: 6 },
              })
            }, 300)
          }
        })
        .catch((err) => {})
    },
  },
}
</script>

<style scoped lang="less">
.PlanDetails {
  padding-bottom: 65px;
  .box {
    background: #fff;
    padding: 11px 14px;
    border-bottom: 1px solid #ccc;
    text-align: left;
    .title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      margin-bottom: 11px;
      font-weight: 600;
      color: #000000;
    }
    .van-field {
      padding: 6px 0;
    }
    .navigation {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(5, 177, 120, 0.61);
      text-align: right;
    }
    .zhu {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.5);
      line-height: 20px;
      margin: 17px 0;
    }
    .uploaderbox {
      display: flex;
      align-items: center;
      margin-bottom: 13px;
    }
    .text {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.5);
      line-height: 20px;
    }
  }
  .info {
    .infobox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        width: 85px;
        height: 85px;
        background: #ccc;
        img {
          width: 100%;
          height: 100%;
        }
        .imgBox {
          width: 100%;
          height: 100%;
          background: #05b178;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #fff;
        }
      }
      .right {
        width: 245px;
        display: flex;
        flex-direction: column;
        text-align: left;
        justify-content: space-between;
        font-family: PingFangSC-Regular, PingFang SC;
        .name {
          font-size: 16px;
          font-weight: 500;
          color: #000000;
        }
        .data {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.5);
          flex-wrap: wrap;

          span {
            margin-right: 5px;
            word-break: keep-all;
            white-space: nowrap;
            overflow: hidden;
            overflow-x: auto;
          }
        }
      }
    }
  }
  .details_content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 225px;
    top: 235px;
    width: 100%;
    display: flex;
    .details_content_tab {
      width: 100px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      overflow-y: auto;
      p {
        padding: 5px 6px;
        // min-height: 58px;
        font-size: 17px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        letter-spacing: 2px;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
      }
      .active {
        background: #fff;
      }
    }
    .details_content_centent {
      flex: 1;
      background: #fff;
      overflow: hidden;
      overflow-y: auto;
      .details_content_centent_item {
        padding: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .commodity_item {
          width: 100%;
          height: 148px;
          background: rgba(0, 0, 0, 0.03);
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: flex-start;
          padding-left: 20px;
          .checkbox {
            position: absolute;
            top: 7px;
            right: 7px;
            width: 22px;
            height: 22px;
          }
          p {
            font-size: 14px;
            font-family: PingFangSC;
            color: rgba(0, 0, 0, 1);
            label {
              min-width: 90px;
              display: inline-block;
              font-weight: 500;
              text-align: left;
              color: rgba(0, 0, 0, 0.5);
            }
          }
          span {
            position: absolute;
            bottom: 5px;
            right: 25px;
            font-size: 18px;
            font-family: PingFangSC;
            font-weight: normal;
            color: red;
          }
        }
      }
    }
  }
  .footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px;
    padding-bottom: 12px;
    z-index: 99;
    background: #fff;
    .footer_item {
      padding: 0 12px;
      height: 50px;
      border-top: 1px solid #ccc;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        i {
          color: #000000;
          opacity: 0.3;
          margin-left: 12px;
        }
      }
      .money {
        color: red;
      }
      .time {
        color: #05b279;
      }
    }
    .van-button {
      width: 95%;
    }
  }
  .notice {
    position: fixed;
    top: 65px;
    left: 0;
    width: 100%;
    z-index: 9;
  }
}
</style>
