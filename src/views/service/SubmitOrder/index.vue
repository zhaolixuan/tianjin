<template>
    <div class="submitOrder">
        <nav class="Serverinfo">
            <p class="title">服务人信息</p>
            <div class="address">
                <div class="left">
                    <img src="../../../assets/images/address.png" alt="" />
                    <div class="info">
                        <p>{{ infoData.address }}</p>
                        <span>{{ infoData.name }} {{ infoData.phone }}</span>
                    </div>
                </div>
                <div class="right" @click="selectAddress">
                    <p>
                        <span v-if="!($route.query && $route.query.id)"
                            >默认</span
                        >
                        <i class="el-icon-arrow-right"></i>
                    </p>
                </div>
            </div>
            <div class="address time">
                <div class="left">
                    <img src="../../../assets/images/time.png" alt="" />
                    <div class="info">
                        <p>上门时间</p>
                    </div>
                </div>
                <div class="right">
                    <p @click="show = true">
                        {{ currentDate || '请选择上门服务时间' }}
                    </p>
                </div>
            </div>
        </nav>

        <nav class="Serverinfo" style="margin-top: 15px">
            <p class="title">服务信息</p>
            <BoxContect :shoppingCat="shoppingCat" />
            <nav class="remarks">
                <van-field
                    v-model="remarks"
                    label="备注信息"
                    placeholder="输入备注信息"
                    input-align="right"
                    :border="false"
                />
                <van-field
                    class="total"
                    label="商品总额"
                    input-align="right"
                    :value="`￥${footInfo.price}`"
                    :border="false"
                    readonly
                />
            </nav>
        </nav>

        <!-- <nav class="Serverinfo" style="margin-top: 8px">
      <p class="title">支付方式</p>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell
            title="养老服务卡（余额 ￥100.00）"
            clickable
            @click="radio = '2'"
          >
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </nav> -->

        <van-notice-bar
            class="notice"
            color="#ed6a0c"
            background="#fffbe8"
            left-icon="info-o"
            v-if="noticeShow"
        >
            请选择上门时间
        </van-notice-bar>
        <Footer @handelOrder="handelOrder" :footInfo="footInfo" />

        <van-popup
            v-model="show"
            round
            position="bottom"
            :style="{ height: '300px' }"
        >
            <div class="popup_box">
                <div class="details_content">
                    <div class="details_content_tab">
                        <p
                            v-for="i in tabList"
                            :key="i.date"
                            :class="tabActive == i.date ? 'active' : ''"
                            @click="handeltabClick(i)"
                        >
                            {{ i.date }}({{ i.weeks }})
                        </p>
                    </div>
                    <div class="details_content_centent">
                        <div
                            class="details_content_centent_item"
                            v-for="i in timeList - hours"
                            :key="i"
                            @click="selectTime = i"
                        >
                            <p :class="selectTime == i ? 'active' : ''">
                                {{ `${i - 1 + hours}:00-${i + hours}:00` }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import Footer from './component/footer.vue'
import BoxContect from './component/BoxContect.vue'
import { mapGetters } from 'vuex'
import { submitOrder } from '@/api/service'
import { getUserAddress, getAddressList } from '@/api/home'
import { removeSessionItem, getCookie } from '@/utils/storage'
import { getNowFormatTime } from '@/utils/time'

export default {
    data() {
        return {
            radio: '2',
            remarks: '',
            show: false,
            tabList: [],
            tabActive: '',
            timeList: 24,
            selectTime: 0,
            noticeShow: false,
            infoData: {},
            hours: 0,
        }
    },
    components: {
        Footer,
        BoxContect,
    },
    created() {},
    mounted() {
        this.getTabData()
        this.tabActive = this.fun_date(0)
        this.getAddressData()
    },
    activated() {
        this.getAddressData()
    },
    beforeRouteLeave(to, from, next) {
        if (to.path === '/addressList') {
            from.meta.keepAlive = true
        } else {
            from.meta.keepAlive = false
            // this.$destroy()
        }
        next()
    },
    watch: {
        tabActive(n) {
            if (n == this.tabList[0].date) {
                this.hours = new Date().getHours() + 1
            } else {
                this.hours = 0
            }
        },
        selectTime(n) {
            if (n) {
                // console.log(this.tabActive);
                this.show = false
            }
        },
    },
    computed: {
        ...mapGetters(['shoppingCat', 'footInfo']),
        currentDate: function () {
            if (this.selectTime) {
                return `${this.tabActive} ${
                    this.selectTime + this.hours - 1 >= 10
                        ? this.selectTime + this.hours - 1
                        : '0' + '' + (this.selectTime + this.hours - 1)
                }:00-${
                    this.selectTime + this.hours >= 10
                        ? this.selectTime + this.hours
                        : '0' + '' + (this.selectTime + this.hours * 1)
                }:00`
            } else {
                return ''
            }
        },
    },
    methods: {
        getAddressData() {
            let id = this.$route.query && this.$route.query.id
            if (id) {
                getUserAddress({ id: id }).then((res) => {
                    if (res && res.code == 200) {
                        this.infoData = {
                            ...res.data,
                        }
                    }
                })
            } else {
                getAddressList({
                    idCard: getCookie('idCard').split('idCard')[1],
                }).then((res) => {
                    if (res && res.code == 200) {
                        res.data.forEach((i) => {
                            if (i.state == 1) {
                                this.infoData = {
                                    ...i,
                                }
                            }
                        })
                    }
                })
            }
        },
        selectAddress() {
            this.$router.push({
                path: 'addressList',
                query: {
                    id: this.$route.query.id,
                },
            })
        },
        handeltabClick(i) {
            this.tabActive = i.date
        },
        getTabData() {
            for (let index = 0; index < 7; index++) {
                this.tabList.push({
                    weeks: this.fun_week(index),
                    date: this.fun_date(index),
                })
            }
        },
        fun_week(num) {
            var date1 = new Date()
            var date2 = new Date(date1)
            date2.setDate(date1.getDate() + num)
            var day = date2.getDay()
            var weeks = new Array(
                '周日',
                '周一',
                '周二',
                '周三',
                '周四',
                '周五',
                '周六'
            )
            return weeks[day]
        },
        fun_date(num) {
            var date1 = new Date()
            //今天时间
            var time1 =
                date1.getFullYear() +
                '-' +
                (date1.getMonth() + 1) +
                '-' +
                date1.getDate()
            var date2 = new Date(date1)
            date2.setDate(date1.getDate() + num)
            let a =
                date2.getMonth() + 1 >= 10
                    ? date2.getMonth() + 1
                    : `0${date2.getMonth() + 1}`

            var time2 =
                date2.getFullYear() +
                '-' +
                a +
                '-' +
                (date2.getDate() >= 10
                    ? date2.getDate()
                    : `0${date2.getDate()}`)

            return time2
        },

        handelOrder() {
            if (this.currentDate === '') {
                this.noticeShow = true
                return
            } else {
                this.noticeShow = false
            }
            this.$dialog.confirm({
                title: '确定支付',
                message: '确认使用居家养老服务卡购买当前订单？',
            })
                .then(() => {
                    this.$toast.loading({
                        duration: 0, // 持续展示 toast
                        forbidClick: true,
                        message: '加载中',
                    })
                    let {
                        typeCode,
                        projectName,
                        projectCode,
                        mealsInfoId,
                        mealsInfoName,
                        mealsPhone,
                        companyName,
                    } = this.shoppingCat[0]
                    let data = {
                        oldPeople: this.infoData.name,
                        address: this.infoData.address,
                        phone: this.infoData.phone,
                        type: this.shoppingCat[0].typeName,
                        typeCode,
                        project: projectName,
                        projectCode,
                        serviceDate: getNowFormatTime(),
                        startTime: `${this.tabActive} ${
                            this.selectTime + this.hours - 1 >= 10
                                ? this.selectTime + this.hours - 1
                                : '0' + (this.selectTime + this.hours - 1)
                        }:00:00`,
                        endTime: `${this.tabActive} ${
                            this.selectTime + this.hours >= 10
                                ? this.selectTime + this.hours
                                : '0' + '' + (this.selectTime + this.hours * 1)
                        }:00:00`,
                        mealsInfoId,
                        mealsInfoName,
                        mealsPhone,
                        companyName,
                        totalPrice: this.footInfo.price,
                        remarks: this.remarks,
                        projects: this.shoppingCat,
                        userAddressId: this.infoData.id,
                    }
                    submitOrder(data).then((res) => {
                        if (res && res.code == 200) {
                            this.$toast.clear()
                            removeSessionItem('shopData')
                            setTimeout(() => {
                                this.$router.push({
                                    path: '/paymentSuccessful',
                                    query: { orderNumber: res.data },
                                })
                            }, 300)
                        } else {
                            this.$notify({ type: 'danger', message: res.message })
                        }
                    })
                })
        },
    },
}
</script>

<style scoped lang="less">
.submitOrder {
    padding-bottom: 110px;
    .Serverinfo {
        background: #fff;
        padding: 20px 13px;
        text-align: left;
        .title {
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 600;
            color: #000000;
        }
        .address {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #ccc;
            padding: 10px 0;
            .left {
                display: flex;

                img {
                    width: 24px;
                    height: 24px;
                    margin-right: 10px;
                }
                .info {
                    p {
                        font-size: 16px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 600;
                        color: #000000;
                        line-height: 25px;
                        margin-bottom: 3px;
                    }
                    span {
                        font-size: 16px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(0, 0, 0, 0.5);
                    }
                }
            }
            .right {
                p {
                    font-size: 14px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #05b279;
                    i {
                        color: #000000;
                        opacity: 0.3;
                        margin-left: 12px;
                    }
                }
            }
        }
        .time {
            border-bottom: none;
            padding: 18px 0;
        }
        /deep/ .van-radio-group {
            margin-top: 16px;
            .van-cell__title {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #000000;
            }
            .van-icon-success {
                background-color: green;
                border-color: green;
            }
        }
        /deep/ .remarks {
            .van-cell__title {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 600;
                color: #000000;
            }
            .van-field {
                margin-top: 12px;
            }
            .total {
                .van-field__control {
                    font-size: 20px;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: #e62c3b;
                }
            }
        }
    }
    .popup_box {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .title {
            line-height: 30px;
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #000000;
        }
        .details_content {
            display: flex;
            justify-content: space-between;
            height: 100%;
            .details_content_tab {
                width: 130px;
                height: 100%;
                background: #ccc;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                p {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    color: #000;
                }
                .active {
                    background: #fff;
                    color: rgb(245, 108, 108);
                }
            }
            .details_content_centent {
                flex: 1;
                height: 100%;
                overflow-y: auto;
                overflow-x: hidden;
                .details_content_centent_item {
                    font-size: 14px;
                    line-height: 39px;
                    height: 39px;
                    p {
                        color: #000;
                    }
                    .active {
                        color: rgb(245, 108, 108);
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
