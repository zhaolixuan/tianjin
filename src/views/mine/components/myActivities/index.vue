<template>
    <div class="myActivities_container">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <div class="consult_con" v-for="i in activityList" :key="i.id">
                <div class="imgbox">
                    <img :src="j.url" v-for="j in i.files" :key="j.id" alt="" />
                    <span class="readingNum">{{ i.numberRead }}人读过</span>
                </div>
                <div class="text">
                    <p>{{ i.activeTitle }}</p>
                    <span>已预约</span>
                </div>
                <div class="information">
                    <p>
                        报名时间：{{ i.activeStartTime }} -
                        {{ i.activeEndTime }}
                    </p>
                    <p>活动地点：{{ i.activeSite }}</p>
                </div>
            </div>
        </van-list>
        <van-empty v-if="!activityList.length" description="暂无活动" />
    </div>
</template>

<script>
import { myList } from '@/api/home'
import { getCookie } from '@/utils/storage.js'
export default {
    name: 'myActivities',
    data() {
        return {
            activityList: [],
            limit: 10,
            page: 1,
            loading: false,
            finished: false,
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        onLoad() {
            this.page++
            this.getData()
        },
        getData() {
            this.loading = true
            let data = {
                idCard: getCookie('idCard').split('idCard')[1],
                limit: this.limit,
                page: this.page,
            }
            myList(data)
                .then((res) => {
                    this.loading = false
                    if (res && res.code == 200) {
                        res.data.forEach((i) => {
                            this.activityList.push(i)
                        })
                        if (res.data && res.data.length < 10) {
                            this.finished = true
                        }
                    } else {
                        this.finished = true
                    }
                })
                .catch((err) => {})
        },
    },
}
</script>

<style lang="less" scoped>
.myActivities_container {
    .consult_con {
        margin-top: 20px;
        border-bottom: 1px solid #ccc;
        padding: 0px 14px 20px;
        .imgbox {
            height: 194px;
            position: relative;
            background: #ccc;
            margin: 0px;
            img {
                width: 100%;
                height: 100%;
            }
            span {
                position: absolute;
                font-size: 16px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #ffffff;
            }
            .readingNum {
                bottom: 7px;
                left: 16px;
            }
            .time {
                bottom: 7px;
                right: 10px;
            }
        }
        .text {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            align-items: center;
            p {
                display: inline-block;
                width: 281px;
                font-size: 16px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: rgba(0, 0, 0, 0.8);
                line-height: 22px;
                text-align: left;
            }
            span {
                width: 42px;
                height: 20px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(5, 177, 120, 0.61);
                line-height: 20px;
            }
            i {
                margin-right: 5px;
            }
        }
        .information {
            margin-top: 14px;
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.6);
            text-align: left;
            line-height: 20px;
        }
    }
}
</style>
