<template>
    <div class="bindcard-container">
        <!-- 表单区域 -->
        <van-form class="bindCard-form">
            <div class="username">
                <van-field
                    readonly
                    v-model="bindCardForm.name"
                    name="用户名"
                    label="用户名"
                    placeholder="请输入用户名"
                    class="username-field username"
                    :rules="[{ required: true }]"
                />
            </div>
            <!-- 这里类名取 username 为了省略再写样式  -->
            <div class="username">
                <van-field
                    readonly
                    v-model="bindCardForm.phone"
                    name="手机"
                    label="手机"
                    placeholder="请输入手机号"
                    class="username-field username"
                    :rules="[{ required: true }]"
                />
            </div>
            <!-- 年龄 -->
            <div class="username">
                <van-field
                    readonly
                    v-model="bindCardForm.age"
                    name="年龄"
                    label="年龄"
                    placeholder="请输入年龄"
                    class="username-field username"
                    :rules="[{ required: true }]"
                />
            </div>
            <!-- 身份证 -->
            <div class="username">
                <van-field
                    readonly
                    v-model="bindCardForm.idcardNumber"
                    name="身份证号"
                    label="身份证号"
                    placeholder="请输入身份证号"
                    class="username-field username"
                    :rules="[{ required: true }]"
                />
            </div>

            <!-- 服务卡 -->
            <div class="username">
                <van-field
                    readonly
                    v-model="bindCardForm.pensioncardNumber"
                    name="服务卡号"
                    label="服务卡号"
                    placeholder="请输入服务卡号"
                    class="username-field username borderbottom"
                    :rules="[{ required: true }]"
                />
            </div>
            <div style="margin: 16px">
                <van-button
                    round
                    block
                    @click="relievebind"
                    type="primary"
                    native-type="submit"
                >
                    解除绑定
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { getPeopleInfomation, removeBinding } from '@/api/home'
import { delCookie, getCookie, getSessionItem } from '@/utils/storage'

export default {
    name: 'bindCard',
    data() {
        return {
            fileList: {},
            bindCardForm: {
                name: '',
                phone: '',
                nickName: '',
                age: '',
                idcardNumber: '',
                pensioncardNumber: '',
            },
            idNumberFileList: [],
            serviceFileList: [],
        }
    },
    components: {},
    mounted() {
        this.getData()
    },
    methods: {
        relievebind() {
            this.$dialog
                .confirm({
                    title: '是否确认解绑居家养老服务卡',
                    message:
                        '解绑后，您将不能通过手机使用居家养老服务卡预订服务',
                })
                .then(() => {
                    // on confirm
                    let { pensioncardNumber, phone } = this.bindCardForm
                    let data = {
                        pensioncardNumber,
                        phone,
                    }
                    removeBinding(data).then((res) => {
                        if (res && res.code == 200) {
                            this.$toast.success('解绑成功，请重新登录')
                            setTimeout(() => {

                                this.$router.push({ name: 'login' })
                            }, 1000)
                        } else {
                            this.$toast.fail(res.message)
                        }
                    })
                })
                .catch(() => {
                    // on cancel
                    console.log('解绑取消')
                })
        },
        getData() {
            let data = {
                createUser: getSessionItem('username'),
                phone: getSessionItem('phone'),
                idcardNumber: getCookie('idCard').split('idCard')[1],
                pensionCardNumber: getSessionItem('cardNumber'),
            }
            getPeopleInfomation(data)
                .then((res) => {
                    if (res && res.code == 200) {
                        this.bindCardForm = { ...res.data }
                    }
                })
                .catch((err) => {})
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
