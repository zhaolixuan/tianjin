<template>
    <div class="details-container">
        <div class="details-header">
            <div class="servicer-center-name">
                {{ companyNameObj && companyNameObj.mealsInfoName }}
            </div>
            <!-- <div class="servicer-center-time">营业时间：8:00-22:00</div> -->
            <!-- <div class="servicer-center-nearby">
                {{ companyNameObj.address }}
            </div>
            <div
                class="servicer-center-phone"
                v-if="
                    companyNameObj.mealsPhone &&
                    companyNameObj.mealsPhone.split('').length > 0
                "
            >
                电话：{{ companyNameObj.mealsPhone }}
            </div>
            <div class="servicer-center-phone" v-else></div> -->
            <span class="servicer-center-status">营业中</span>
            <p>
                <span @click="daohang">
                    <img src="../../../assets/images/daohang.png" alt="" />
                    导航</span
                >
                <span
                    style="background: rgba(255, 125, 16, 0.1); color: #ce6309"
                >
                    <img src="../../../assets/images/dianhua.png" alt="" />
                    <a
                        style="color: #000"
                        :href="`tel:${companyNameObj.mealsPhone}`"
                        >电话</a
                    ></span
                >
            </p>
        </div>
        <div class="details_content">
            <div class="details_content_tab">
                <p
                    v-for="i in tabList"
                    :key="i.id"
                    :class="tabActive == i.projectName ? 'active' : ''"
                    @click="handeltabClick(i)"
                >
                    {{ i.projectName }}
                </p>
            </div>
            <div class="details_content_centent">
                <div
                    class="details_content_centent_item"
                    v-for="i in commodityList"
                    :key="i.id"
                    @click="serviceDetails(i)"
                >
                    <div class="left_img">
                        <img
                            v-if="i.catoryPicture"
                            :src="i.catoryPicture"
                            alt=""
                        />
                        <div v-else class="imgBox">{{i.name}}</div>
                    </div>
                    <div class="right_content">
                        <p class="title">
                            {{ i.name }}
                        </p>
                        <div class="price">
                            <span>￥{{ i.price }}</span>
                            <van-icon
                                name="add"
                                class="addbtn"
                                v-if="i.number == 0"
                                @click.stop="add(i)"
                            />
                            <div class="stepper" v-else>
                                <div class="sub" @click.stop="sub(i)">-</div>
                                <div class="num">{{ i.number }}</div>
                                <div class="add" @click.stop="add(i)">+</div>
                            </div>
                        </div>
                    </div>
                </div>
                <van-empty
                    v-if="!commodityList.length"
                    description="暂无商品"
                />
            </div>
        </div>
        <Footer
            @handelOrder="handelOrder"
            :footerInfo="footerInfo"
            :shopData="shopData"
            @add="add"
            @sub="sub"
        />
        <!-- <van-notice-bar class="shopCatShow" v-if="shopCatShow" mode="closeable"
      ></van-notice-bar
    > -->
    </div>
</template>

<script>
import Footer from './component/footer.vue'
// 引入接口
import { getBusinessDetails, getCatrogyByBusiness } from '@/api/service.js'
import { mapMutations } from 'vuex'
import { navigation } from '@/utils/index'
export default {
    name: '',
    data() {
        return {
            tabList: [],
            tabActive: '',
            // 初始化详情表头渲染对象
            companyNameObj: {},
            commodityList: [],
            projectCode: null,
            footerInfo: {
                price: 0,
                num: 0,
            },
            shopData: [],
            shopCatShow: false,
        }
    },

    watch: {
        tabActive() {
            this.getCatrogyByBusiness()
        },
    },

    computed: {},

    mounted() {
        this.getBusinessDetails()
        // this.shopData = getSessionItem("shopData") || [];
        for (let i = 0; i < this.shopData.length; i++) {
            let selectItem = this.shopData[i]
            this.footerInfo.num += selectItem.number
            this.footerInfo.price += selectItem.price
        }
    },

    components: {
        Footer,
    },
    methods: {
        ...mapMutations(['SET_SHOPPING_CAT', 'SET_FOOT_INFI']),
        daohang() {
            let { longitude, latitude, mealsInfoName, address } =
                this.companyNameObj
            let url
            if (window.lng) {
                url = `https://m.amap.com/navigation/carmap/saddr=${window.lng},${window.lat}&daddr=${longitude},${latitude}&sort=dist`
            } else {
                url = `https://uri.amap.com/marker?position=${longitude},${latitude}&name=${mealsInfoName}&content=${address}&output=html`
            }

            navigation(url)
        },
        add(i) {
            i.number++
            // this.shopCatShow = false;
            this.footerInfo.price += i.price
            this.footerInfo.num++
            if (!this.shopData.filter((item) => item.id == i.id).length) {
                this.shopData.push(i)
            }
            // setSessionItem("shopData", this.shopData);
        },

        sub(i) {
            i.number > 0 && i.number--
            this.footerInfo.price -= i.price
            this.footerInfo.num--
            for (let index = 0; index < this.shopData.length; index++) {
                let item = this.shopData[index]
                if (i.id === item.id) {
                    if (item.number == 0) {
                        this.shopData.splice(index, 1)
                        // setSessionItem("shopData", this.shopData);
                        return
                    }
                }
            }
            // console.log(this.shopData);
        },

        handeltabClick(i) {
            this.projectCode = i.projectCode
            this.tabActive = i.projectName
        },

        serviceDetails(i) {
            this.$router.push({
                path: '/serviceDetails',
                query: {
                    typeCode: i.typeCode,
                    projectCode: i.projectCode,
                    mealsInfoId: this.$route.query.id,
                    projectName: i.projectName,
                    name: i.name,
                },
            })
        },

        handelOrder() {
            // if (this.footerInfo.num === 0) return (this.shopCatShow = true);
            let data = []
            this.shopData.forEach((i) => {
                if (i.number > 0) {
                    data.push({
                        ...i,
                        totalPrice: i.number * i.price,
                    })
                }
            })
            this.SET_SHOPPING_CAT(data)
            this.SET_FOOT_INFI(this.footerInfo)
            this.$router.push({ path: '/submitOrder' })
        },

        // 根据 id 和 category 获取二级分类
        getBusinessDetails() {
            let params = {
                category: this.$route.query.category,
                businessId: this.$route.query.id,
            }
            getBusinessDetails(params).then((res) => {
                if (res.code == 200) {
                    let item = res.data[0]
                    this.tabList = res.data
                    this.projectCode = item.projectCode
                    this.tabActive = item.projectName
                    this.companyNameObj = item || {}
                }
            })
        },

        // 根据 id和大类名称、二级类别code 调用接口(txt文档接口4)
        getCatrogyByBusiness() {
            let params = {
                category: this.$route.query.category,
                businessId: this.$route.query.id,
                projectCode: this.projectCode,
            }
            getCatrogyByBusiness(params).then((res) => {
                if (res && res.code == '200') {
                    res.data.forEach((i) => {
                        i.number = 0
                    })
                    // this.shopData = getSessionItem("shopData") || [];
                    // for (let i = 0; i < this.shopData.length; i++) {
                    //   let selectItem = this.shopData[i];
                    //   for (let j = 0; j < res.data.length; j++) {
                    //     let originalItem = res.data[j];
                    //     if (selectItem.id == originalItem.id) {
                    //       originalItem.number = selectItem.number;
                    //     }
                    //   }
                    // }
                    this.commodityList = res.data
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.details-container {
    padding-bottom: 65px;
    .details-header {
        background: #fff;
        height: 100px;
        padding: 10px 14px;
        position: relative;
        border-bottom: 1px solid #eee;
        .servicer-center-name {
            width: 281px;
            font-size: 20px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.8);
            text-align: left;
        }
        .servicer-center-time {
            //   border: 1px solid green;
            width: 281px;
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.6);
            line-height: 20px;
            text-align: left;
        }
        .servicer-center-nearby {
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.6);
            line-height: 20px;
            text-align: left;
        }
        .servicer-center-phone {
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.6);
            line-height: 20px;
            text-align: left;
        }
        .servicer-center-status {
            position: absolute;
            right: 14px;
            top: 10px;
            display: block;
            padding: 3px 5px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(5, 177, 120, 0.61);
            line-height: 20px;
            border: 1px solid rgba(5, 177, 120, 0.61);
            border-radius: 4px;
        }
        p {
            position: absolute;
            right: 14px;
            bottom: 12px;
            span {
                margin-left: 30px;
                display: inline-block;
                width: 53px;
                height: 23px;
                background: rgba(5, 177, 120, 0.1);
                border-radius: 0 16px 16px 0;
                font-size: 12px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #03855a;
                letter-spacing: 2px;
                position: relative;
                line-height: 23px;
                img {
                    position: absolute;
                    width: 23px;
                    height: 23px;
                    left: -12px;
                }
            }
        }
    }
    .details_content {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 65px;
        top: 175px;
        width: 100%;
        display: flex;
        .details_content_tab {
            width: 101px;
            display: flex;
            flex-direction: column;
            p {
                height: 52px;
                font-size: 17px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #000000;
                line-height: 24px;
                letter-spacing: 2px;
                text-align: center;
                line-height: 52px;
                // 返回的数据 typeName 名字太长 所以 overflow:hidden;
                // 后面再调整下吧
                overflow: hidden;
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
                .left_img {
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
                .right_content {
                    width: 152px;
                    height: 85px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .title {
                        font-size: 16px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: #000000;
                        text-align: left;
                    }
                    .price {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        span {
                            font-size: 20px;
                            font-family: PingFangSC-Semibold, PingFang SC;
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
                            .sub {
                                background: rgba(5, 177, 120, 0.05);
                                border-radius: 17px 0px 0px 17px;
                                border: 1px solid #05b178;
                            }
                            .num {
                                background: rgba(255, 255, 255, 0.05);
                                border: 1px solid #05b178;
                            }
                            .add {
                                border-radius: 0px 17px 17px 0px;
                                border: 1px solid #05b178;
                            }
                        }
                    }
                }
            }
        }
    }
    .shopCatShow {
        position: fixed;
        bottom: 64px;
        left: 0;
        width: 100%;
    }
}
</style>
