<template>
    <div class="myRating-container">
        <van-tabs v-model="activeName" color="#49c79d" class="tabs">
            <van-tab title="待评价" name="待评价">
                <div class="content">
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        @load="onLoad"
                    >
                        <div
                            class="content-item"
                            v-for="(item, index) in ratingList"
                            :key="index"
                        >
                            <img :src="item.catoryPicture" alt="" class="img" />
                            <div class="item-left">
                                <div class="item-info">{{ item.project }}</div>
                                <div class="item-price-publish">
                                    <span class="item-price"
                                        >￥{{ item.totalPrice }}</span
                                    >
                                    <van-button
                                        plain
                                        type="primary"
                                        class="publishRating"
                                        v-on:click="
                                            handleGoCheckServiceOfNotEvaluated(
                                                item.id
                                            )
                                        "
                                        >查看服务</van-button
                                    >
                                </div>
                            </div>
                        </div>
                    </van-list>
                </div>
            </van-tab>
            <van-tab title="已评价" name="已评价">
                <div class="content">
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        @load="onLoad"
                    >
                        <div
                            class="content-item"
                            v-for="(item, index) in ratingList"
                            :key="index"
                            v-on:click="handleGoRatingById(item.id)"
                        >
                            <img :src="item.catoryPicture" alt="" class="img" />
                            <div class="item-left">
                                <div class="item-info">
                                    {{ item.projectName }}
                                </div>
                                <div class="item-price-publish">
                                    <span class="item-price"
                                        >￥{{ item.price }}</span
                                    >
                                </div>
                                <div class="rate">
                                    <van-rate
                                        v-model="item.levels"
                                        color="#ffd21e"
                                        readonly
                                    />
                                </div>
                            </div>
                        </div>
                    </van-list>
                </div>
            </van-tab>
        </van-tabs>
        <van-empty v-if="!ratingList.length" description="暂无数据"></van-empty>
    </div>
</template>

<script>
import {
    getFinishedAppreiseList,
    getFinishOrderNotEvaluatedList,
} from '@/api/mine'

export default {
    name: 'myRating',
    data() {
        return {
            activeName: '待评价',
            ratingList: [],
            limit: 10,
            page: 1,
            loading: false,
            finished: false,
        }
    },

    watch: {
        activeName() {
            this.finished = false
            this.page = 1
            this.ratingList = []
            this.getData()
        },
    },

    mounted() {
        this.getData()
    },

    methods: {
        onLoad() {
            this.page++
            this.getData()
        },
        value(item) {
            // console.log(item);
            return 1
        },

        // 这段逻辑太妙了
        getData() {
            this.loading = true
            if (this.activeName == '待评价') {
                this.fun(getFinishOrderNotEvaluatedList)
            } else {
                this.fun(getFinishedAppreiseList)
            }
        },
        fun(funname) {
            let data = {
                limit: this.limit,
                page: this.page,
            }
            funname(data)
                .then((res) => {
                    this.loading = false
                    // console.log(res);
                    if (res && res.code == 200) {
                        res.data.forEach((i) => {
                            this.ratingList.push(i)
                        })
                        if (res.data.length < 10) {
                            this.finished = true
                        }
                    } else {
                        this.finished = true
                    }
                })
                .catch((err) => {})
        },

        handleGoCheckServiceOfNotEvaluated(id) {
            this.$router.push({
                path: '/myRatingItem',
                query: {
                    // 把订单 id 159 放到地址栏参数中
                    id: id,
                },
            })
        },

        // handleGoRatingDetails(id) {
        //   this.$router.push({ path: "/RatingDetails", query: { id: id } });
        // },

        // 问了后端了 评价详情要接收的就是 item 中的 id  不是 orderId
        // 所以此处传递 id 而不是 orderId
        handleGoRatingById(id) {
            this.$router.push({ path: '/RatingDetails', query: { id: id } })
        },
    },
}
</script>

<style lang="less" scoped>
.content {
    background: #fff;
    .content-item {
        // height: 120px;
        padding: 19px 14px;
        display: flex;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        .img {
            height: 82px;
            width: 82px;
            // border: 1px solid green;
            margin-right: 18px;
        }
        .item-left {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .rate {
                display: flex;
                justify-content: flex-end;
            }
            .item-info {
                font-size: 17px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #000000;
                line-height: 24px;
                text-align: left;
            }
            .item-price-publish {
                height: 32px;
                display: flex;
                justify-content: space-between;
                .item-price {
                    font-size: 20px;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: #e62c3b;
                    line-height: 34px;
                }
                .publishRating {
                    width: 95px;
                    height: 34px;
                    background: rgba(5, 177, 120, 0.05);
                    border-radius: 17px;
                    border: 1px solid #05b178;
                }
            }
        }
    }
}
</style>
