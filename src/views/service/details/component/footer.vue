<template>
    <footer>
        <div class="footer">
            <div class="left">
                <p class="shopCat">
                    <!-- <img src="../../../../assets/images/cat.png" alt="" /> -->
                    <van-goods-action-icon
                        v-on:click="togglePopup"
                        icon="cart-o"
                        text="购物车"
                        :badge="footerInfo.num || null"
                        color="#05B178"
                    />
                    <!-- 购物车 -->
                </p>
                <p class="price">￥{{ price }}</p>
            </div>
            <div class="right">
                <!-- 立即结算{{ `（${footerInfo.num}）` }} -->
                <van-goods-action-button
                    type="danger"
                    text="立即购买"
                    @click="handelOrder"
                    :disabled="this.footerInfo.num === 0"
                />
            </div>
        </div>
        <!-- 弹出层 -->
        <div class="popup">
            <van-popup
                v-model="show"
                position="bottom"
                :style="{ height: '368px' }"
            >
                <div class="details_content">
                    <div class="details_content_centent">
                        <div
                            class="details_content_centent_item"
                            v-for="i in shopData"
                            :key="i.id"
                        >
                            <div class="left_img">
                                <img :src="i.catoryPicture" alt="" />
                            </div>
                            <div class="right_content">
                                <p class="title">
                                    {{ i.name }}
                                </p>
                                <p class="type">
                                    {{ i.projectName }}
                                </p>
                                <div class="price">
                                    <span>￥{{ i.price }}</span>
                                    <van-icon
                                        name="add"
                                        class="addbtn"
                                        v-if="i.number == 0"
                                        @click="add(i)"
                                    />
                                    <div class="stepper" v-else>
                                        <div class="add" @click="add(i)">+</div>
                                        <div class="num">{{ i.number }}</div>
                                        <div class="sub" @click="sub(i)">-</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <van-empty
                            v-if="!shopData.length"
                            description="暂无商品"
                        />
                    </div>
                </div>
            </van-popup>
        </div>
    </footer>
</template>

<script>
export default {
    props: ['footerInfo', 'shopData'],
    name: '',
    data() {
        return {
            active: false,
            show: false,
            numValue: 0,
        }
    },
    computed: {
        price() {
            return (this.footerInfo.price*1).toFixed(1)
        },
    },
    methods: {
        serviceDetails() {
            this.$router.push({ path: '/serviceDetails' })
        },
        handelOrder() {
            // if (this.footerInfo.num === 0) return;
            this.$emit('handelOrder', true)
        },

        togglePopup() {
            this.show = !this.show
        },
        add(i) {
            this.$emit('add', i)
        },
        sub(i) {
            this.$emit('sub', i)
        },
    },
    mounted() {},
}
</script>

<style lang="less" scoped>
footer {
    position: fixed;
    bottom: -1px;
    left: 0;
    width: 100%;
    display: flex;
    height: 65px;
    align-items: center;
    justify-content: space-between;
    .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        width: 100%;
        z-index: 9999;
    }
    .left {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 16px;
        height: 100%;
        .shopCat {
            padding-left: 19px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.5);
            height: 100%;
            img {
                width: 30px;
                height: 28px;
            }
        }
        .price {
            font-size: 28px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #e62c3b;
        }
    }
    .right {
        width: 150px;
        height: 65px;
        position: relative;
        // background: linear-gradient(135deg, #ff9c7b 0%, #ff254c 100%);
        // font-size: 20px;
        // font-family: PingFangSC-Medium, PingFang SC;
        // font-weight: 500;
        // color: #ffffff;
        // text-align: center;
        // line-height: 65px;
        .van-button {
            width: 150px;
            height: 65px;
            border-radius: 0;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
    .popup {
        .van-popup {
            padding-bottom: 65px;
            overflow: hidden;
            overflow-y: auto;
            border-radius: 20px 20px 0px 0px;
            .details_content {
                display: flex;
                .details_content_centent {
                    flex: 1;
                    background: #fff;
                    .details_content_centent_item {
                        padding: 14px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .left_img {
                            width: 104px;
                            height: 104px;
                            background: #ccc;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .right_content {
                            width: 230px;
                            height: 104px;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            text-align: left;

                            .title {
                                font-size: 16px;
                                font-family: PingFangSC-Medium, PingFang SC;
                                font-weight: 600;
                                color: #000000;
                            }
                            .type {
                                font-size: 14px;
                                font-family: PingFangSC-Regular, PingFang SC;
                                font-weight: 400;
                                color: rgba(0, 0, 0, 0.5);
                            }
                            .price {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                span {
                                    font-size: 20px;
                                    font-family: PingFangSC-Semibold,
                                        PingFang SC;
                                    font-weight: 600;
                                    color: #e62c3b;
                                }
                                .addbtn {
                                    color: #0fb77f;
                                    font-size: 24px;
                                }
                                .stepper {
                                    display: flex;
                                    align-items: center;
                                    font-size: 20px;
                                    font-family: PingFangSC-Medium, PingFang SC;
                                    font-weight: 500;
                                    color: #05b178;
                                    margin-left: 8px;
                                    div {
                                        width: 26px;
                                        height: 23px;
                                        text-align: center;
                                        line-height: 23px;
                                        font-size: 13px;
                                        box-sizing: border-box;
                                    }
                                    .add {
                                        background: rgba(5, 177, 120, 0.05);
                                        border-radius: 17px 0px 0px 17px;
                                        border: 1px solid #05b178;
                                    }
                                    .num {
                                        background: rgba(255, 255, 255, 0.05);
                                        border: 1px solid #05b178;
                                    }
                                    .sub {
                                        border-radius: 0px 17px 17px 0px;
                                        border: 1px solid #05b178;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
