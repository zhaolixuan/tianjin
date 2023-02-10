<template>
    <div class="activity_details_container">
        <div class="activity_img_content">
            <!-- img -->
            <div class="img_box">
                <img
                    v-if="
                        activityDetailsObj.files &&
                        activityDetailsObj.files.length
                    "
                    :src="activityDetailsObj.files[0].url"
                    alt=""
                />
            </div>
            <!-- <div class="img_box" v-else>
        <img src="../../../assets/images/home-activity-img-second.jpg" alt="" />
      </div> -->

            <!-- after first chandao bug -->
            <!-- <div class="img_box">
        <img :src="activityDetailsObj.files instanceof Array &&
          JSON.stringify(activityDetailsObj.files.url) != '' &&
          activityDetailsObj.files.url" alt="" />
      </div> -->

            <!-- text-content -->
            <div class="activity_content">
                <div class="title">{{ activityDetailsObj.activeTitle }}</div>
                <div class="time">
                    报名时间：<br />
                    {{ activityDetailsObj.activeStartTime }}—{{
                        activityDetailsObj.activeEndTime
                    }}
                </div>
                <div class="address">
                    活动地点:{{ activityDetailsObj.activeSite }}
                </div>
                <div class="type">
                    报名类型：{{ activityDetailsObj.applyType }}
                </div>
                <div class="cost">
                    活动费用：{{ activityDetailsObj.activeCost || '免费' }}
                </div>
            </div>
        </div>

        <div class="activity_introduce">
            <div class="header">活动介绍</div>
            <!-- <div
        class="img"
        v-if="
          activityDetailsObj.files instanceof Array &&
          activityDetailsObj.files.url != '' &&
          activityDetailsObj.files.url
        "
      >
        <img :src="activityDetailsObj.files[0].url" alt="" />
      </div>
      <div class="img" v-else>
        <img src="../../../assets/images/home-activity-img-second.jpg" alt="" />
      </div> -->
            <!-- after first chandao bug -->
            <div
                class="detals_content"
                v-html="activityDetailsObj.activeContent"
            ></div>
        </div>

        <Footer
            class="footer"
            :isPressYuYue="isPressYuYue"
            :activityIsGoON="activityIsGoON"
            :activityDetailsObj="activityDetailsObj"
            :active="collectionState"
            v-on:appointment="appointment"
            v-on:handlePressCollect="handlePressCollect"
            :activeState="activeState"
            :appointmentState="appointmentState"
        />
    </div>
</template>

<script>
// import { getNowFormatDay } from "@/utils/time.js";
import Footer from '../component/footer.vue'
import {
    getActiveDetails,
    addActiveAddItem,
    conllectionAddItemActivity,
    conllectionDeleteItemActivity,
} from '@/api/home.js'
import { setItem, getCookie, getItem } from '@/utils/storage.js'

export default {
    data() {
        return {
            activityDetailsObj: {},
            // 是否点了预约
            isPressYuYue: false,
            // init collectionState
            collectionState: 0,
            // 活动结束时间
            activeEndTime: '',
            // 活动结束的标志
            activityIsGoON: false,
            // 初始化活动状态 后端返回字符串 已过期 / 活动中
            activeState: '',
            // 判断 bookingDetails 是否点击了预约 点击了 可以拿到 字符串 已预约
            isYuyue: '',
            // 活动是否预约过 0(没有) / 1(预约过) 活动详情接口返回
            appointmentState: 0,
        }
    },

    components: {
        Footer,
    },

    mounted() {
        this.getActiveDetailsData()

        // 但是这种做法会让 footer 中 已过期 也变成了 已预约
        // this.isYuyue = getItem("isYuyue");
        // if (this.isYuyue == "已预约") {
        //   this.isPressYuYue = true;
        // }
    },

    methods: {
        // 活动详情
        getActiveDetailsData() {
            let params = {
                id: this.$route.query.id,
                idCar: getCookie('idCard').split('idCard')[1],
            }
            getActiveDetails(params).then((res) => {
                if (res.code && res.code == 200 && res.data) {
                    // console.log(res);
                    this.activityDetailsObj = res.data

                    // 1 根据返回数据中的活动结束时间 前端来做 是否过期
                    // let { activeEndTime } = res.data;
                    // this.activeEndTime = activeEndTime;
                    // console.log(this.activeEndTime);
                    // var nowDate = new Date();
                    // var nowTime = nowDate.getTime();
                    // console.log(nowTime);
                    // var activityEnd = new Date(this.activeEndTime);
                    // var activityEndTime = activityEnd.getTime();
                    // console.log(activityEndTime);
                    // if (nowTime > activityEndTime) {
                    //   this.activityIsGoON = true;
                    //   this.$message.error("活动已经结束不可预约");
                    // }

                    // 2 返回接口给出活动过期状态的做法
                    let { activeState } = res.data
                    this.activeState = activeState
                    // 模拟 活动中/已过期
                    // this.activeState = '活动中';
                    // this.activeState = '已过期';

                    // 预约状态 后端返回的 appointmentState
                    let { appointmentState } = res.data
                    // 模拟后端返回 appointmentState 值为 未预约过0/已经预约过1
                    // var appointmentState = 0;
                    // var appointmentState = 1;
                    this.appointmentState = appointmentState

                    // 点了立即预约 下面的步骤 要跳转到 bookingDetails 所以先存 留着回显使用
                    setItem('activityDetails', this.activityDetailsObj)

                    this.collectionState = res.data.state * 1
                }
            })
        },

        // 立即预约
        appointment() {
            // 之前的业务逻辑
            // let params = {
            //   activeId: this.activityDetailsObj.id,
            //   name: window.sessionStorage.getItem("username"),
            //   idCard: window.sessionStorage.getItem("idCard"),
            //   contactPhone: "13122223333",
            // };
            // addActiveAddItem(params).then((res) => {
            //   // console.log(res);
            //   if (res.code && res.code == 200) {
            //     this.isPressYuYue = true;
            //   }
            // });

            // 结合 activityEndTime 前端来做活动是否过期 时跳转到预约详情的逻辑
            // if (this.activityIsGoON) {
            //   return false;
            // } else {
            //   this.$router.push({ path: "/bookingDetails" });
            // }

            // 3 接口返回活动状态的做法
            if (this.activeState === '已过期' || this.appointmentState == '1') {
                this.$message.error(
                    `抱歉, 活动${
                        this.activeState === '已过期' ? '已过期' : ''
                    } ！`
                )
                return false
            } else {
                this.$router.push({ path: '/bookingDetails' })
            }
        },

        // 点击收藏
        handlePressCollect() {
            // 添加收藏
            let data
            if (!this.collectionState) {
                data = {
                    serviceMealsId: this.$route.query.id,
                    createTime: new Date() * 1,
                    idCard: getCookie('idCard').split('idCard')[1],
                    // 1 表示活动收藏
                    type: '1',
                }
                this.fun(conllectionAddItemActivity, data)
            } else {
                // 取消收藏
                data = {
                    idCard: getCookie('idCard').split('idCard')[1],
                    serviceMealsId: this.activityDetailsObj.id,
                    type: '1',
                }
                this.fun(conllectionDeleteItemActivity, data)
            }
        },

        fun(fun_Name, data) {
            fun_Name(data).then((res) => {
                if (res.code && res.code == 200) {
                    this.$message.success(
                        `${this.collectionState == 0 ? '收藏' : '取消收藏'}成功`
                    )
                    this.getActiveDetailsData()
                } else {
                    this.$message.error('操作失败')
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.activity_details_container {
    background-color: #fff;
    height: 100vh;
    .activity_img_content {
        .img_box {
            height: 214px;
            padding: 0px 12px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .activity_content {
            padding: 0px 17px;
            height: 172px;
            margin-top: 16px;
            text-align: left;
            .title {
                height: 28px;
                font-size: 20px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: rgba(0, 0, 0, 0.8);
                line-height: 28px;
            }
            .time {
                // height: 20px;
                margin-top: 14px;
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: rgba(0, 0, 0, 0.6);
                line-height: 20px;
                text-align: left;
            }
            .address {
                height: 20px;
                margin-top: 4px;
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: rgba(0, 0, 0, 0.6);
                line-height: 20px;
            }
            .type {
                height: 20px;
                margin-top: 4px;
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: rgba(0, 0, 0, 0.6);
                line-height: 20px;
            }
            .cost {
                margin-top: 4px;
                height: 20px;
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: rgba(0, 0, 0, 0.6);
                line-height: 20px;
            }
        }
    }
    .activity_introduce {
        padding: 0px 18px 0px 17px;
        .header {
            height: 28px;
            margin-top: 17px;
            font-size: 20px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.8);
            line-height: 28px;
            text-align: left;
        }
        .img {
            width: 340px;
            height: 226px;
            margin-top: 17px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .detals_content {
            margin-top: 10px;
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.6);
            line-height: 20px;
            text-align: left;
        }
    }
}
</style>
