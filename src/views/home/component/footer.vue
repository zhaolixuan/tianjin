<template>
    <div class="activity_footer">
        <div class="left">
            <div class="collect" v-on:click="handlePressCollect">
                <div class="img_content">
                    <img
                        class="img"
                        src="../../../assets/images/xingxing.png"
                        alt=""
                        v-if="!active"
                    />
                    <img
                        class="img"
                        src="../../../assets/images/xingxing-active.png"
                        alt=""
                        v-else
                    />
                </div>
                <div class="text">收藏</div>
            </div>
            <!-- 刚开始自己想的电话弹窗 做了一半不行 现弃用 -->
            <!-- <div class="phone" v-on:click="handleCall(activityDetailsObj.phone)"> -->
            <div class="phone">
                <div class="img_content">
                    <img src="../../../assets/images/telephone@2x.png" alt="" />
                </div>
                <div class="text">
                    <a
                        style="color: #000"
                        :href="`tel:${activityDetailsObj.phone}`"
                        >电话</a
                    >
                </div>
            </div>
        </div>

        <!-- 活动过期(activeState=='已过期') 走这个 -->
        <div class="right" v-if="activeState == '已过期'">
            <div
                :class="['yuyue', this.activeState == '已过期' ? 'noGoON' : '']"
                v-on:click="handleAppointment"
                ref="yuyueTa"
            >
                {{ activeState == '已过期' ? '活动已过期' : '立即预约' }}
            </div>
        </div>
        <!-- 活动已经预约过(appointmentState==1) 走这个 -->
        <div class="right" v-else-if="appointmentState === '1'">
            <div
                :class="['yuyue', this.appointmentState == 1 ? 'noGoON' : '']"
                ref="yuyueTa"
            >
                您已预约过
            </div>
        </div>
        <!-- 没过期(activeState=='活动中') 没有预约过(appointmentState==0) 走这个 -->
        <div class="right" v-on:click="handleAppointment" v-else>
            <div class="yuyue">立即预约</div>
        </div>
        <!-- 
      上面的逻辑也不太行的话就这样 footer 组件接收的有 判断是否过期 是否预约过的状态
      那在 mounted 中进行 if else 对 是否预约过 01 以及 是否过期进行判断吧
      然后给data 中一个变量赋 已过期 已经预约 未过期 立即预约 字符串
    --></div>
</template>

<script>
// import { Dialog } from "vant";
export default {
    data() {
        return {
            isPressCollect: false,
        }
    },

    mounted() {
        // console.log(this.appointmentState);
    },

    props: {
        isPressYuYue: {
            type: Boolean,
        },

        activityIsGoON: {
            type: Boolean,
        },

        // 传递的是大对象 为了取 phone
        activityDetailsObj: {
            type: Object,
            default: () => {
                return {}
            },
        },

        // 是否点击了收藏
        active: {
            type: Number,
        },

        // 活动状态
        activeState: {
            type: String,
            default: () => {
                return ''
            },
        },

        // 预约状态
        appointmentState: {
            //   type: String,
            default: '0',
        },
    },

    methods: {
        handleAppointment() {
            this.$emit('appointment')
        },

        handlePressCollect() {
            this.$emit('handlePressCollect')
        },

        // handleCall(phone) {
        //   Dialog.confirm({
        //     title: "确认拨打电话吗",
        //     message: phone,
        //   })
        //     .then(() => {
        //       // on confirm
        //     })
        //     .catch(() => {
        //       // on cancel
        //     });
        // },
    },
}
</script>

<style lang="less" scoped>
.activity_footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 375px;
    height: 69px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .left {
        width: 174px;
        height: 69px;
        padding: 0px 13px;
        background: #ffffff;
        display: flex;
        .collect,
        .phone {
            width: 69px;
            height: 69px;
            margin-right: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .img_content {
                height: 30px;
                width: 30px;
                margin-top: 13px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .text {
                flex: 1;
                font-size: 13px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.5);
                line-height: 18px;
            }
        }
        .phone {
            margin-right: 0px;
        }
    }
    .right {
        flex: 1;
        .yuyue {
            height: 69px;
            background-color: #05b178;
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 65px;
            letter-spacing: 2px;
        }
        .noGoON {
            background-color: #7fddad;
        }
    }
}
</style>
