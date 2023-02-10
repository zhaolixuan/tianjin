<template>
    <div class="bindcard-container">
        <!-- 表单区域 -->
        <van-form class="bindCard-form" show-error @submit="onSubmit">
            <div class="username">
                <van-field
                    v-model="bindCardForm.createUser"
                    name="姓名"
                    label="姓名"
                    placeholder="请输入姓名"
                    class="username-field username"
                    :rules="rules.createUser"
                />
            </div>

            <!-- 身份证 -->
            <div class="username">
                <van-field
                    v-model="bindCardForm.idcardNumber"
                    name="身份证号"
                    label="身份证号"
                    placeholder="请输入身份证号"
                    class="username-field username"
                    :rules="rules.idcardNumber"
                />
            </div>
            <div class="username">
                <van-field
                    v-model="bindCardForm.phone"
                    name="手机"
                    label="手机"
                    placeholder="请输入手机号"
                    class="username-field username"
                    :rules="rules.phone"
                />
            </div>
            <!-- 服务卡 -->
            <div class="username">
                <van-field
                    v-model="bindCardForm.pensionCardNumber"
                    name="服务卡号"
                    label="服务卡号"
                    placeholder="请输入服务卡号"
                    class="username-field username borderbottom"
                    :rules="rules.pensionCardNumber"
                />
            </div>
            <div style="margin: 16px">
                <van-button round block type="primary" native-type="submit">
                    绑定养老服务卡
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { AppBind, LoginKaptcha } from '@/api/home'
import { mapMutations } from 'vuex'
import { setCookie, setSessionItem } from '@/utils/storage'


export default {
    name: 'bindCard',
    data() {
        return {
            bindCardForm: {
                createUser: '',
                phone: '',
                idcardNumber: '',
                pensionCardNumber: '',
            },
            rules: {
                createUser: [{ required: true }],
                idcardNumber: [
                    { required: true },
                    {
                        // 自定义校验规则
                        validator: (value) => {
                            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(
                                value
                            )
                        },
                        message: '请输入正确的身份证号码',
                        trigger: 'onBlur',
                    },
                ],
                phone: [
                    { required: true },
                    {
                        // 自定义校验规则
                        validator: (value) => {
                            return /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(
                                value
                            )
                        },
                        message: '请输入正确的手机号码',
                        trigger: 'onBlur',
                    },
                ],
                pensionCardNumber: [{ required: true }],
            },
        }
    },
    components: {},
    mounted() {},
    methods: {
        ...mapMutations(['SET_INFO_NAME']),

        onSubmit() {
            AppBind(this.bindCardForm).then((res) => {
                if (res && res.code == 200) {
                    this.$toast.success('绑定养老卡成功')
                    let data = {
                        phone: this.bindCardForm.phone,
                        kaptcha: '159753',
                    }
                    LoginKaptcha(data).then((res1) => {
                        setCookie('gunsToken', res1.data.token)
                        this.SET_INFO_NAME(res1.data.userName)
                        setSessionItem('username', res1.data.userName)
                        setSessionItem('phone', res1.data.phone)
                        setSessionItem('cardNumber', res1.data.cardNumber)
                        setCookie('idCard', 'idCard' + res1.data.idcard)
                        setTimeout(() => {
                            this.$router.push({ path: '/home' })
                        }, 300)
                    })
                } else {
                    this.$toast.fail(res.message)
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.bindcard-container {
    // height: 937px;
    padding-bottom: 20px;
    background-color: #fff;
    .notice {
        height: 36px;
        line-height: 36px;
        background: #ff7927;
        padding: 4px 11px 5px 12px;
        span {
            display: block;
            width: 352px;
            height: 27px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 27px;
        }
    }

    .bindCard-form {
        .avator {
            height: 79px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
                font-size: 18px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #000000;
                line-height: 25px;
                padding: 0px 12px;
            }
            img {
                width: 54px;
                height: 54px;
                border-radius: 50%;
            }
        }
        .username {
            height: 55px;
            // border-top: 1px solid #eee;
            display: flex;
            align-items: center;
            padding: 0px 12px;
            .username-field {
                font-size: 18px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #000000;
                line-height: 25px;
                // .van-cell__label {
                //   span {
                //     font-size: 18px;
                //     font-family: PingFangSC-Medium, PingFang SC;
                //     font-weight: 500;
                //     color: #000000;
                //     line-height: 25px;
                //   }
                // }
            }
        }
        .idNumber {
            // height: 237px;
            // border: 1px solid #eee;
            .notice-card {
                font-size: 15px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #000000;
                line-height: 21px;
                text-align: left;
                margin-top: 16px;
                padding: 0 12px;
            }
            .idCard {
                height: 108px;
                width: 170px;
                // border: 1px solid #eee;
                margin-top: 15px;
            }
            .idCard-front {
                position: relative;
                background-image: url('../../../../assets/images/idCard-front@2x.png');
                background-size: auto 108px;
                margin-right: 8px;
                span {
                    position: absolute;
                    bottom: 0px;
                    left: 0px;
                    display: block;
                    height: 27px;
                    width: 170px;
                    font-size: 14px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #005a32;
                    line-height: 20px;
                }
            }
            .idCard-reverse {
                position: relative;
                background-image: url('../../../../assets/images/idCard-reverse@2x.png');
                background-size: auto 108px;
                span {
                    position: absolute;
                    bottom: 0px;
                    left: 0px;
                    display: block;
                    height: 27px;
                    width: 170px;
                    font-size: 14px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #005a32;
                    line-height: 20px;
                }
            }
            .serviceCard-front {
                position: relative;
                background-color: #ecf4f4;
                margin-right: 8px;
                span {
                    display: block;
                    height: 27px;
                    width: 170px;
                    position: absolute;
                    bottom: 0px;
                    left: 0px;
                    font-size: 14px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #005a32;
                    line-height: 20px;
                }
            }
            .serviceCard-reverse {
                position: relative;
                background-color: #ecf4f4;
                span {
                    display: block;
                    height: 27px;
                    width: 170px;
                    position: absolute;
                    bottom: 0px;
                    left: 0px;
                    font-size: 14px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #005a32;
                    line-height: 20px;
                }
            }
        }
    }
    .submitBindCard {
        margin-top: 14px;
        height: 53px;
        padding: 0px 12px;
        .submitAdd {
            font-size: 18px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ffffff;
            line-height: 25px;
        }
    }
}
</style>
