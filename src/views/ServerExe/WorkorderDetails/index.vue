<template>
  <div class="workorderDetails">
    <!-- 工单详情 -->
    <nav class="box details">
      <p class="title">工单详情</p>
      <van-cell-group>
        <van-field label="订单编号"
                   :value="detailData.orderNumber"
                   readonly />
        <van-field label="服务对象"
                   :value="detailData.servicePersonal"
                   readonly />
        <van-field label="联系方式"
                   :value="detailData.phone"
                   readonly />
        <van-field label="派单时间"
                   :value="detailData.createTime"
                   readonly />
      </van-cell-group>
    </nav>

    <!-- 用户信息 -->
    <nav class="box info">
      <p class="title">用户信息</p>
      <div class="infobox">
        <div class="left">
          <img :src="detailData.avatar"
               alt="" />
        </div>
        <div class="right">
          <p class="name">{{ detailData.servicePersonal }}</p>
          <p class="data">
            <span>性别：{{ detailData.sex }}</span>
            <span>年龄：{{ detailData.age }}</span>
            <span>身体状况：{{ detailData.healthStatus }}</span>
          </p>
          <p class="data">
            <span>服务次数：{{ detailData.serviceNum || 0 }}次</span>
            <!-- <span>服务时长：{{ detailData.totalTime || 0 }}</span> -->
          </p>
          <p class="data">
            <span @click="checkrecord">服务记录 ></span>
          </p>
        </div>
      </div>
    </nav>

    <!-- 服务项目 -->
    <nav class="box service">
      <p class="title">服务项目</p>
      <div class="servicebox">
        <div class="left">
          <img :src="detailData.mealsServicePicture"
               alt="" />
        </div>
        <div class="right">
          <p class="name">{{ detailData.mealsName }}</p>
          <p class="data">{{ detailData.serviceProject }}</p>
          <p class="munprice">
            <span class="mun">X{{ detailData.number }}</span>
            <span class="price">￥{{ detailData.countPrice }}</span>
          </p>
        </div>
      </div>
    </nav>

    <!-- 没开始服务之前 -->
    <nav class="box"
         v-if="servertext == '开始服务' || servertext == '我要接单'">
      <p class="title">详细地址</p>
      <van-cell-group>
        <van-field label="上门时间"
                   :value="detailData.serviceTime"
                   readonly />
        <van-field label="服务地址"
                   :value="detailData.serviceAddress"
                   readonly />
      </van-cell-group>
      <p class="navigation"
         @click="daohang">前往导航 ></p>
    </nav>

    <!-- 开始服务之后 -->
    <nav class="box"
         v-if="servertext == '结束服务'">
      <p class="title">服务明细</p>
      <van-cell-group>
        <van-field label="开始时间"
                   :value="detailData.serviceStartTime"
                   readonly />
        <van-field label="结束时间"
                   :value="detailData.serviceEndTime"
                   readonly />
        <van-field label="服务时长"
                   :value="detailData.countServiceTime"
                   readonly />
      </van-cell-group>
      <p class="zhu">
        注：结束时间为当前时间，服务时长为开始时间截止当前时间算出的值
      </p>
      <p class="title">上传凭证</p>
      <div class="uploaderbox">
        <SmUpload @beforeDelete="beforeDelete"
                  :maxCount="2"
                  @postImg="postImg" />
      </div>
      <p class="title">服务内容</p>
      <p class="text">
        <van-form>
          <van-field v-model="detailData.serviceRemarks"
                     rows="2"
                     autosize
                     type="textarea"
                     maxlength="50"
                     placeholder="请输入服务内容"
                     show-word-limit
                     :rules="[{ required: true }]" />
        </van-form>
      </p>
    </nav>

    <van-notice-bar class="notice"
                    color="#ed6a0c"
                    background="#fffbe8"
                    left-icon="info-o"
                    v-if="noticeShow">
      请填写服务内容
    </van-notice-bar>
    <Footer v-if="
                servertext == '开始服务' ||
                servertext == '结束服务' ||
                servertext == '我要接单'
            "
            @handelOrder="handelOrder"
            :servertext="servertext" />
  </div>
</template>

<script>
import Footer from './component/footer.vue'
import {
  uploadFill,
  getDetail,
  getServiceStart,
  finishService,
  deleteFill,
  acceptOrder,
} from '@/api/service'
import { getNowFormatTime, intervalTime } from '@/utils/time'
import { removeAaary, navigation } from '@/utils/index'
import axios from 'axios'
import SmUpload from '@/components/common/SmUpload'
export default {
  data() {
    return {
      servertext: '',
      fileList: [],
      id: '',
      detailData: {
        serviceRemarks: '',
      },
      noticeShow: false,
      // 给服务记录使用的 orderId
      orderId: '',
    }
  },
  components: {
    Footer,
    SmUpload,
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    daohang() {
      var key = process.env.VUE_APP_DITU_SDK
      var address = this.detailData.serviceAddress
      axios
        .get(
          `https://restapi.amap.com/v3/geocode/geo?key=${key}&s=rsv3&city=35&address=${address}`
        )
        .then((res) => {
          let location = res.data.geocodes[0].location
          let url
          if (window.lng) {
            url = `https://m.amap.com/navigation/carmap/saddr=${window.lng},${window.lat}&daddr=${location}&sort=dist`
          } else {
            url = `https://uri.amap.com/marker?position=${location}&content=${address}&output=html`
          }
          navigation(url)
        })
    },

    getData() {
      getDetail({ orderMealsPersonalId: this.id })
        .then((res) => {
          if (res && res.code == 200) {
            this.detailData = res.data
            // 给服务记录使用
            let { orderId } = res.data
            this.orderId = orderId
            let a = this.detailData.totalTime
            let day = 0,
              hour = 0
            if (a.indexOf('天') != -1) {
              day = a.split('天')[0]
              a = a.split('天')[1]
              if (a.indexOf('小时') != -1) {
                hour = a.split('小时')[0]
                a = a.split('小时')[1]
              }
              this.detailData.totalTime = `${day * 12 + hour * 1}小时${a}`
            }
            /*
            0:订单取消   
            1:新建
            2:接单
            3:拒单
            4:接受派单
            5:拒绝派单
            6:开始服务
            7:结束服务
            8:评价
            9:回访
            */
            if ([2].includes(res.data.serviceStatue * 1)) {
              this.servertext = '我要接单'
            } else if ([4].includes(res.data.serviceStatue * 1)) {
              this.servertext = '开始服务'
            } else if ([6].includes(res.data.serviceStatue * 1)) {
              this.servertext = '结束服务'
            } else if ([0].includes(res.data.serviceStatue * 1)) {
              //用户取消订单提示
              this.$dialog
                .alert({
                  title: '温馨提示',
                  message:
                    '后台反馈此服务订单用户已自行取消，如有疑问，请联系服务商。',
                })
                .then(() => {
                  this.$router.push({
                    path: '/server-record',
                    query: { id: this.id },
                  })
                })
            } else if ([7].includes(res.data.serviceStatue * 1)) {
              //用户取消订单提示
              this.$dialog
                .alert({
                  title: '温馨提示',
                  message: '后台反馈此服务订单已完成，如有疑问，请联系服务商。',
                })
                .then(() => {
                  this.$router.push({
                    path: '/server-record',
                    query: { id: this.id },
                  })
                })
            } else {
              this.servertext = res.data.serviceStatue
            }
          } else {
            this.detailData = {}
          }
        })
        .catch((err) => {})
    },

    // 查看服务记录
    checkrecord() {
      // this.$router.push({ name: "ServiceRecord" });
      this.$router.push({
        path: '/service-record',
        query: { orderId: this.orderId },
      })
    },

    handelOrder(n) {
      if (n === '开始服务') {
        getServiceStart({ orderMealsPersonalId: this.id })
          .then((res) => {
            this.detailData = {
              ...res.data,
            }
            this.servertext = '结束服务'
          })
          .catch((err) => {
            this.$toast.fail('网络异常')
          })
      } else if (n === '结束服务') {
        if (this.detailData.serviceRemarks.trim() == '')
          return (this.noticeShow = true)
        this.noticeShow = false
        let loading = this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
        })
        // 结束服务
        this.detailData.serviceEndTime = getNowFormatTime()
        this.detailData.countServiceTime = intervalTime(
          new Date(this.detailData.serviceStartTime) * 1,
          new Date(this.detailData.serviceEndTime) * 1
        )
        let countServiceTime =
          (new Date(this.detailData.serviceEndTime) * 1 -
            new Date(this.detailData.serviceStartTime) * 1) /
          1000
        let { serviceEndTime, serviceRemarks } = this.detailData
        let data = {
          serviceEndTime,
          countServiceTime,
          serviceRemarks,
          id: this.id,
        }
        finishService(data)
          .then((res) => {
            loading.clear()
            if (res && res.code == 200) {
              this.$toast.success('服务已完成')
              setTimeout(() => {
                this.$router.push({
                  path: '/server-record',
                  query: { id: this.id },
                })
              }, 500)
            } else {
              this.$toast.fail('结束服务失败')
            }
          })
          .catch((err) => {
            this.$toast.fail('结束服务失败')
          })
      } else if (n === '我要接单') {
        let { orderId } = this.detailData

        let data = {
          // orderId: this.id,
          orderId,
        }
        acceptOrder(data)
          .then((res) => {
            if (res && res.code == 200) {
              this.getData()
              document.querySelector('#revoke').style.width = 0
            }
          })
          .catch((err) => {
            this.$toast.fail('结束服务失败')
          })
      } else {
        //   撤销服务
        this.$dialog
          .confirm({
            title: '温馨提示',
            message: '确认是否撤销服务，撤销后该订单退回至服务中心',
          })
          .then(() => {
            this.$router.push({
              path: '/cancelOrder',
              query: {
                id: this.id,
                type: 1,
              },
            })
          })
          .catch(() => {
            // on cancel
          })
      }
    },
    beforeDelete(i) {
      deleteFill({ urlName: i.urlName, id: this.id }).then((res) => {
        if (res && res.code == 200) {
          removeAaary(this.fileList, i)
        } else {
          this.$toast.fail('图片删除失败')
        }
      })
    },
    postImg(data) {
      let { orderId, orderMealsPersonalId, mealsInfoId } = this.detailData
      var forms = new FormData()
      forms.append('files', data.file)
      forms.append('orderId', orderId)
      forms.append('orderMealsPersonalId', orderMealsPersonalId)
      forms.append('mealsInfoId', mealsInfoId)
      uploadFill(forms)
        .then((res) => {
          for (let index = 0; index < data.fileList.length; index++) {
            if (data.fileList[index].id == '') {
              if (res.code && res.code == 200) {
                data.fileList[index].urlName = res.data.urlName
                data.fileList[index].id = res.data.id
                data.fileList[index].status = 'done'
                data.fileList[index].message = '上传成功'
              } else {
                data.fileList[index].status = 'failed'
                data.fileList[index].message = '上传失败'
              }
              break
            }
          }
          this.fileList = data.fileList
        })
        .catch((err) => {})
      // 此时可以自行将文件上传至服务器
    },
  },
}
</script>

<style scoped lang="less">
.workorderDetails {
  padding-bottom: 70px;
  .box {
    background: #fff;
    padding: 11px 14px;
    margin-bottom: 10px;
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
        width: 84px;
        img {
          width: 100%;
          height: 100%;
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
            margin-right: 1px;
          }
        }
      }
    }
  }
  .service {
    .servicebox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        width: 104px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        width: 230px;
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
          color: #000000;
          flex-wrap: wrap;
        }
        .munprice {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .mun {
            font-size: 14px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.5);
          }
          .price {
            font-size: 20px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #e62c3b;
          }
        }
      }
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
