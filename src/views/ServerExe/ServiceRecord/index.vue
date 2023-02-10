<template>
    <div class="serviceRecord">
        <nav class="box info">
            <p class="title">用户信息</p>
            <div class="infobox">
                <div class="left">
                    <img :src="infoData.avatar" alt="" />
                </div>
                <div class="right">
                    <p class="name">{{ infoData.servicePersonal }}</p>
                    <p class="data">
                        <span>性别：{{ infoData.sex }}</span>
                        <span>年龄：{{ infoData.age }}</span>
                    </p>
                    <p class="data">
                        <span>身体状况：{{ infoData.healthStatus }}</span>
                    </p>
                    <p class="data" style="flex-direction: column">
                        <span>服务次数：{{ infoData.serviceNum }}次</span>
                        <!-- <span>服务时长：{{ infoData.totalTime }}</span> -->
                    </p>
                </div>
            </div>
        </nav>
        <nav class="dataList">
            <p class="select">
                筛选
                <el-select
                    v-model="value"
                    placeholder="请选择"
                    v-on:change="handleChangeTime"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </p>
            <div>
                <p class="time">{{ infoData.serviceEndTime }}</p>
                <van-list
                    v-model="loading"
                    :finished="finished"
                    v-on:load="onLoad"
                >
                    <Box-contect :serviceContentData="serviceContentData" />
                </van-list>
            </div>
        </nav>
    </div>
</template>

<script>
import BoxContect from './component/BoxContect.vue'
import { historyList } from '@/api/service'

export default {
    data() {
        return {
            infoData: {},
            serviceContentData: [],
            value: '1',
            options: [
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '半年',
                    value: '3',
                },
                {
                    label: '三个月',
                    value: '2',
                },
                {
                    label: '一个月',
                    value: '1',
                },
            ],
            loading: false,
            finished: false,
            limit: 10,
            page: 1,
        }
    },

    components: {
        BoxContect,
    },
    created() {},

    mounted() {
        this.getData()
    },

    methods: {
        getData() {
            this.loading = true
            let params = {
                orderId: this.$route.query.orderId,
                type: this.value,
                limit: this.limit,
                page: this.page,
            }
            historyList(params)
                .then((res) => {
                    this.loading = false
                    if (res.code && res.code == 200) {
                        this.infoData = res.data
                        let a = this.infoData.totalTime
                        let day = 0,
                            hour = 0
                        if (a.indexOf('天') != -1) {
                            day = a.split('天')[0]
                            a = a.split('天')[1]
                            if (a.indexOf('小时') != -1) {
                                hour = a.split('小时')[0]
                                a = a.split('小时')[1]
                            }
                            this.infoData.totalTime = `${
                                day * 12 + hour * 1
                            }小时${a}`
                        }
                        res.data.ordersList.forEach((i) => {
                            this.serviceContentData.push(i)
                        })
                        if (
                            res.data.ordersList.length &&
                            res.data.ordersList.length < 10
                        ) {
                            this.finished = true
                        } else {
                            this.loading = false
                            this.finished = false
                        }
                    } else {
                        this.loading = false
                        this.finished = true
                    }
                })
                .catch((err) => {})
        },

        handleChangeTime(val) {
            this.finished = false
            this.page = 1
            this.value = val
            this.serviceContentData = []
            this.getData()
        },

        onLoad() {
            this.page++
            this.getData()
        },
    },
}
</script>

<style scoped lang="less">
.serviceRecord {
    .box {
        background: #fff;
        padding: 11px 14px;
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
    }
    .info {
        .infobox {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
                width: 84px;
                height: 100px;
                img {
                    width: 100%;
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
                    // align-items: center;
                    font-size: 14px;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    // justify-content: space-between;
                    flex-wrap: wrap;
                    span {
                        margin-right: 6px;
                        flex: 1;
                    }
                }
            }
        }
    }
    .dataList {
        position: relative;
    }
    .select {
        position: absolute;
        right: 0;
        // top: 10px;
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        .el-select {
            margin-left: 10px;
            width: 100px;
            /deep/ .el-input__inner {
                border: none;
                background: transparent;
            }
        }
    }
    .time {
        padding: 15px 14px;
        text-align: left;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
    }
}
</style>
