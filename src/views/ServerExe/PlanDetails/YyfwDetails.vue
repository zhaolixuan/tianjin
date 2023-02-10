<template>
  <div class="workorderDetails">
    <!-- 工单详情 -->
    <div id="map-container"></div>
    <nav class="box details">
      <p class="title">工单详情</p>
      <van-cell-group>
        <van-field label="服务编号"
                   :value="detailData.number"
                   readonly />
        <van-field label="服务状态"
                   :value="detailData.serveStatus"
                   readonly />
        <van-field label="下单方式"
                   :value="detailData.method"
                   readonly />
        <van-field label="上门时间"
                   :value="detailData.serviceTime"
                   readonly />
      </van-cell-group>
    </nav>

    <!-- 用户信息 -->
    <nav class="box info">
      <p class="title">用户信息</p>
      <van-cell-group>
        <van-field label="姓名"
                   :value="detailData.name"
                   readonly />
        <van-field label="年龄"
                   :value="detailData.age"
                   readonly />
        <van-field label="性别"
                   :value="detailData.sex"
                   readonly />
        <van-field label="服务地址"
                   :value="detailData.streetName+detailData.communityName+detailData.address"
                   readonly />
      </van-cell-group>
    </nav>

    <!-- 服务项目 -->
    <nav class="box service">
      <p class="title">服务项目</p>
      <div class="servicebox"
           v-for="(i, index) in detailData.orderServiceProjects"
           :key="index">
        <div class="left">
          <img v-if="i.catoryPicture"
               :src="i.catoryPicture"
               alt="" />
          <div v-else
               class="imgBox">{{ i.name }}</div>
        </div>
        <div class="right">
          <p class="name">{{ i.projectName }}</p>
          <p class="data">{{ i.name }}</p>
          <p class="munprice">
            <span class="mun">X{{ i.number }}</span>
            <span class="price">￥{{ i.totalPrice }}</span>
          </p>
          <p class="money">
            应收金额：<span class="price">￥{{i.charges || 0}}</span>
          </p>
        </div>
      </div>
    </nav>

    <!-- 没开始服务之前 -->
    <!-- <nav class="box"
         v-if="servertext == '开始服务'">
      <p class="title">详细地址</p>
      <van-cell-group>
        <van-field label="上门时间"
                   :value="detailData.serviceTime"
                   readonly />
        <van-field label="服务地址"
                   :value="detailData.address"
                   readonly /> 
      </van-cell-group>
      <p class="navigation"
         @click="daohang">前往导航 ></p>
    </nav>-->

    <!-- 开始服务之后 -->
    <nav class="box"
         v-if="servertext != '开始服务'">
      <p class="title">服务明细</p>
      <van-cell-group>
        <van-field label="开始时间"
                   :value="detailData.startTime"
                   readonly />
        <van-field label="结束时间"
                   :value="detailData.endTime"
                   readonly />
        <van-field label="服务时长"
                   :value="detailData.countServiceTime"
                   readonly />
      </van-cell-group>
      <p class="zhu">
        注：结束时间为当前时间，服务时长为开始时间截止当前时间算出的值
      </p>
      <p class="title">服务开始照片</p>
      <div class="uploaderbox">
        <div v-if="servertext == '3'">
          <img class="img"
               v-for="i in startServiceFilesList"
               :key="i.id"
               :src="i.url"
               alt="" />
        </div>
        <SmUpload v-if="servertext == '结束服务'"
                  @beforeDelete="beforeDeleteStart"
                  :maxCount="2"
                  @postImg="postImg1"
                  @updataFilesList="updataStartFilesList"
                  :list="startServiceFilesList" />
      </div>
      <p class="title">服务结束照片</p>
      <div class="uploaderbox">
        <div v-if="servertext == '3'">
          <img class="img"
               v-for="i in endServiceFilesList"
               :key="i.id"
               :src="i.url"
               alt="" />
        </div>

        <SmUpload v-if="servertext == '结束服务'"
                  @beforeDelete="beforeDeleteEnd"
                  :maxCount="2"
                  @postImg="postImg2"
                  @updataFilesList="updataEndFilesList"
                  :list="endServiceFilesList" />
      </div>
    </nav>

    <van-notice-bar class="notice"
                    color="#ed6a0c"
                    background="#fffbe8"
                    left-icon="info-o"
                    v-if="noticeShow">
      请填写服务内容
    </van-notice-bar>
    <Footer v-if="servertext == '开始服务' || servertext == '结束服务'"
            @handelOrder="handelOrder"
            :servertext="servertext" />

    <van-dialog v-model="show"
                @confirm="handerconfirm"
                @cancel="handercancel"
                :title="dialogText"
                show-cancel-button>
      <div class="dialog_content">
        <p>是否确定{{ dialogText }}</p>
        <span>备注：</span>
        <el-input type="textarea"
                  rows="4"
                  v-model="remarks"
                  :placeholder="`请填写${dialogText}原因。`"></el-input>
        <!-- <el-input v-if="dialogText == '改派订单'"
                  type="textarea"
                  :rows="2"
                  v-model="appoint"
                  placeholder="是否有指定服务人员？"></el-input> -->
      </div>
    </van-dialog>
  </div>
</template>

<script>
import Footer from './component/footer.vue'
import {
  getAppointmentDetail,
  startService,
  uploadFill,
  endService,
  deleteFill,
  cancelOrder,
  editOrder,
} from '@/api/serviceExe'

import { intervalTime } from '@/utils/time'
import { removeAaary, navigation } from '@/utils/index'
import axios from 'axios'
import SmUpload from '@/components/common/SmUpload'
import { logOut } from '@/utils/domain.js'

export default {
  data() {
    return {
      servertext: '',
      startServiceFilesList: [],
      endServiceFilesList: [],
      id: '',
      detailData: {},
      noticeShow: false,
      // 给服务记录使用的 orderId
      orderId: '',
      remarks: '',
      appoint: '',
      show: false,
      dialogText: '',
      local: '',
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

  beforeRouteLeave(to, from, next) {
    if (to.path === '/server-CwfwModel') {
      to.meta.keepAlive = true
    }
    next()
  },
  methods: {
    updataStartFilesList(value) {
      this.startServiceFilesList = value
    },
    updataEndFilesList(value) {
      this.endServiceFilesList = value
    },
    handerconfirm() {
      this.show = false
      if (this.dialogText == '取消订单') {
        cancelOrder({ orderId: this.id, remark: this.remarks })
          .then((res) => {
            this.$toast.success('订单取消成功')
            if (res && res.code == 200) {
              this.getData()
            } else {
              this.$toast.fail('订单取消失败')
            }
          })
          .catch((err) => {
            this.$toast.fail('订单取消失败')
          })
        console.log(this.remarks)
      } else if (this.dialogText == '改派订单') {
        editOrder({ orderId: this.id, remark: this.remarks })
          .then((res) => {
            if (res && res.code == 200) {
              this.$toast.success('改派订单成功')
              setTimeout(() => {
                this.$router.go(-1)
              }, 200)

              //  this.getData()
            } else {
              this.$toast.fail('改派订单失败')
            }
          })
          .catch((err) => {
            this.$toast.fail('改派订单失败')
          })
        console.log(this.remarks, this.appoint)
      }
    },
    handercancel() {
      this.remarks = ''
      this.appoint = ''
      this.show = false
    },
    daohang() {
      var key = process.env.VUE_APP_DITU_SDK
      var address = this.detailData.address
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
    setStatus(n) {
      let name
      switch (n) {
        case 1:
          name = '未开始'
          break
        case 2:
          name = '服务中'
          break
        case 3:
          name = '已完成'
          break
        case 4:
          name = '已评价'
          break
        case 5:
          name = '已取消'
          break
        case 6:
          name = '待改派'
          break
        default:
          break
      }
      return name
    },
    getData() {
      getAppointmentDetail({ orderId: this.id })
        .then((res) => {
          if (res && res.code == 200) {
            res.data.serveStatus = this.setStatus(res.data.status * 1)
            this.detailData = res.data
            this.startServiceFilesList =
              JSON.parse(JSON.stringify(res.data.startServiceFilesList)) || []
            this.endServiceFilesList =
              JSON.parse(JSON.stringify(res.data.endServiceFilesList)) || []
            // 给服务记录使用
            let { orderId } = res.data
            this.orderId = orderId

            if ([1].includes(res.data.status * 1)) {
              this.servertext = '开始服务'
            } else if ([2].includes(res.data.status * 1)) {
              this.servertext = '结束服务'
            } else if ([4, 5].includes(res.data.status * 1)) {
              //用户取消订单提示
              this.$dialog
                .alert({
                  title: '温馨提示',
                  message: `后台反馈此服务订单${res.data.serveStatus}，如有疑问，请联系服务商。`,
                })
                .then(() => {
                  this.$router.go(-1)
                  // this.$router.push({
                  //   path: "/yyfw-details",
                  //   query: { id: this.id },
                  // });
                })
            } else {
              this.servertext = res.data.status
              this.detailData.countServiceTime = intervalTime(
                new Date(this.detailData.startTime) * 1,
                new Date(this.detailData.endTime) * 1
              )
            }
          } else {
            this.detailData = {}
          }
        })
        .catch((err) => {})
    },

    // 查看服务记录
    checkrecord() {
      this.$router.push({
        path: '/service-record',
        query: { orderId: this.orderId },
      })
    },
    handelOrder(n) {
      if (!window.lat) {
        return this.$dialog
          .confirm({
            title: '暂时无法获取您的位置',
            message: '手机定位GPS功能没开,建议打开手机定位功能并重新登录',
          })
          .then(() => {
            logOut()
          })
          .catch(() => {
            // on cancel
          })
      } else {
        this.local = window.lng + ',' + window.lat
        if (n === '开始服务') {
          let data = { orderId: this.id, startLocal: this.local }
          startService(data)
            .then((res) => {
              if (res && res.code == 200) {
                this.getData()
              }
              // this.servertext = '结束服务'
            })
            .catch((err) => {
              this.$toast.fail('网络异常')
            })
        } else if (n === '结束服务') {
          if (this.startServiceFilesList.length == 0) {
            this.$toast.fail('请上传服务开始图片')
          } else if (this.endServiceFilesList.length == 0) {
            this.$toast.fail('请上传服务结束图片')
          } else {
            // 结束服务
            let data = {
              orderId: this.id,
              endLocal: this.local,
            }
            endService(data)
              .then((res) => {
                if (res && res.code == 200) {
                  this.$toast.success('服务已完成')
                  if (res && res.code == 200) {
                    this.getData()
                  }
                } else {
                  this.$toast.fail('结束服务失败')
                }
              })
              .catch((err) => {
                this.$toast.fail('结束服务失败')
              })
          }
        } else {
          this.dialogText = n
          this.show = true
        }
      }
    },
    beforeDeleteStart(i) {
      this.beforeDelete(i, this.startServiceFilesList)
    },
    beforeDeleteEnd(i) {
      this.beforeDelete(i, this.endServiceFilesList)
    },
    beforeDelete(i, filesList) {
      deleteFill({ urlName: i.urlName, filesId: i.id }).then((res) => {
        if (res && res.code == 200) {
          removeAaary(filesList, i)
        } else {
          this.$toast.fail('图片删除失败')
        }
      })
    },
    postImg1(data) {
      this.postImg(data, 1)
    },
    postImg2(data) {
      this.postImg(data, 2)
    },
    postImg(data, type) {
      var forms = new FormData()
      forms.append('files', data.file)
      forms.append('fileType', type)
      forms.append('orderId', this.id)
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

      .img {
        width: 80px;
        height: 80px;
      }
     
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
      margin-bottom: 8px;
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
          text-align: center;
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
        .money {
          font-size: 14px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.5);
          text-align: right;
          .price {
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
  /deep/ .van-dialog__header {
    padding: 10px 0 !important;
  }
  .dialog_content {
    padding: 14px 17px;
    text-align: left;
    font-size: 15px;
    font-size: 15px;
    border-top: 1px solid #ccc;
    span {
      font-weight: 500;
      margin: 10px 0;
    }
    /deep/ .el-textarea {
      margin-top: 10px;
      textarea {
        background: rgba(249, 249, 249, 1);
        border: 1px solid rgba(228, 228, 228, 1);
        border-radius: 5px;
      }
    }
  }
}
</style>
