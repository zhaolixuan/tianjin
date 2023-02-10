<template>
    <div class="paymentSuccessful">
        <div class="top_container">
            <div class="icon_container">
                <span class="el-icon-check"></span>
            </div>
            <div class="notice">提交成功</div>
            <div class="info">已派单至服务商，请注意查看来电消息</div>
        </div>
        <div class="balance">
            <p>本次消费：{{ info.totalPrice }}元</p>
            <p>补贴金额：{{ info.subsidyPrice }}元</p>
            <p>卡内余额：{{ info.balancePrice }}元</p>
        </div>
        <div class="opertor">
            <span class="goHome" @click="Back">回到首页</span>
            <span class="checkOrder" @click="seeOrder">查看订单</span>
        </div>
    </div>
</template>

<script>
import { getBalancePrice } from '@/api/home.js'
export default {
    data() {
        return {
            info: {},
        }
    },
    created() {},
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            let data = {
                orderNumber: this.$route.query.orderNumber,
            }
            getBalancePrice(data)
                .then((res) => {
                    if (res && res.code == 200) {
                        this.info = { ...res.data }
                    } else {
                        this.$toast.fail(res.message)
                    }
                })
                .catch((err) => {
                    this.$toast.fail(err)
                })
        },
        Back() {
            // 命名路由 结合 params 关键字
            this.$router.push({ name: 'Home' })
        },
        seeOrder() {
            this.$router.push({
                path: '/orderDetails',
                query: {
                    orderNumber: this.$route.query.orderNumber,
                    // pathName: "Home",
                },
            })
        },
    },
}
</script>

<style scoped lang="less">
.paymentSuccessful {
    .top_container {
        display: flex;
        height: 173px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-image: url('../../../assets/images/personal-bg-yasuo@2x.jpg');
        background-size: auto 173px;
        .icon_container {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            span {
                height: 53px;
                width: 53px;
                background-color: #07c160;
                border-radius: 26px;
                line-height: 53px;
                color: #fff;
            }
        }
        .notice {
            margin-top: 12px;
            height: 37px;
            font-size: 26px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #018a5d;
            line-height: 37px;
            letter-spacing: 2px;
        }
        .info {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #000000;
        }
    }
    .balance {
        font-size: 16px;
        margin-top: 16px;
    }
    .opertor {
        height: 50px;
        margin-top: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            width: 145px;
            height: 50px;
            background: #05b178;
            border-radius: 25px;
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 50px;
            letter-spacing: 2px;
        }
        .goHome {
            margin-right: 30px;
        }
        .checkOrder {
            background-color: #fff;
            color: #05b178;
            border: 1px solid #05b178;
        }
    }
}
</style>
