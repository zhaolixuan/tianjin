<template>
    <div class="search">
        <div class="search_input">
            <van-search
                shape="round"
                v-model="value"
                placeholder="请输入搜索关键词"
                @search="search"
            />
        </div>
        <div class="search_record" v-show="!searchResult">
            <div class="title">
                <p>搜索历史</p>
                <span v-if="recordList.length" @click="deleteQuery">
                    <van-icon name="delete-o" /> 清除</span
                >
            </div>
            <div class="search_record_list">
                <div
                    class="record_item"
                    v-for="i in recordList"
                    @click="recordSearch(i.keyWord)"
                    :key="i.id"
                >
                    {{ i.keyWord }}
                </div>
                <div v-if="!recordList.length">暂无搜索记录</div>
            </div>
        </div>

        <div class="searchresult" v-if="searchResult">
            <Box-header
                :headerData="serviceHeaderData"
                @handelActive="servicehandelActive"
                :activeHeader="activeHeader1"
            />
            <div class="content">
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                    <div class="service" v-if="activeHeader1 == '服务'">
                        <div
                            class="service_content_item"
                            @click="checkDetail(i)"
                            v-for="i in searchresultData"
                            :key="i.id"
                        >
                            <div class="left-img">
                                <img :src="i.mealsProjectPicture" alt="" />
                            </div>
                            <div class="right-box">
                                <div>
                                    <p class="title">{{ i.mealsInfoName }}</p>
                                    <p class="info_price">￥{{ i.price }}</p>
                                </div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="consult padbox"
                        v-else-if="activeHeader1 == '养老资讯'"
                    >
                        <div
                            class="consult_con"
                            v-for="(item, index) in searchresultData"
                            :key="index"
                            v-on:click="handleGoDetails(i.articleId)"
                        >
                            <div class="imgbox">
                                <!-- 存在数据用返回的真实数据渲染 -->
                                <div v-if="item.files.length">
                                    <img
                                        :src="
                                            item.files instanceof Array &&
                                            item.files[0].url != '' &&
                                            item.files[0].url
                                        "
                                        alt=""
                                    />
                                </div>
                                <!-- 某个tab返回的数据中没有图片链接 那就本地图片补充 -->
                                <div v-else>
                                    <img
                                        src="~@/assets/images/home-activity-img-second.jpg"
                                        alt=""
                                    />
                                </div>
                                <span class="readingNum" v-if="item.numberRead"
                                    >{{ item.numberRead }}人读过</span
                                >
                                <span class="readingNum" v-else>33人读过</span>
                                <span class="time">{{ item.createTime }}</span>
                            </div>
                            <div class="text">
                                <p>{{ item.articleTitle }}</p>
                                <img
                                    src="~@/assets/images/fenxiang.png"
                                    @click.stop="share"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div class="consult padbox" v-else>
                        <div
                            class="consult_con"
                            v-for="(item, index) in searchresultData"
                            :key="index"
                            v-on:click="handleGoActivityDetails(item.id)"
                        >
                            <!-- have img -->
                            <div class="imgbox" v-if="item.files.length">
                                <img
                                    :src="
                                        item.files instanceof Array &&
                                        item.files[0].url != '' &&
                                        item.files[0].url
                                    "
                                    alt=""
                                />
                                <span class="readingNum"
                                    >{{
                                        item.numberRead ? item.numberRead : '0'
                                    }}人读过</span
                                >
                                <span class="time">{{ item.publishTime }}</span>
                            </div>
                            <!-- not exist img use default img instead -->
                            <div class="imgbox" v-else>
                                <img
                                    src="~@/assets/images/home-activity-img-second.jpg"
                                    alt=""
                                />
                                <span class="readingNum">99人读过</span>
                                <span class="time">2021-05-06</span>
                            </div>
                            <!-- content for text -->
                            <div class="text">
                                <p>{{ item.activeTitle }}</p>
                            </div>
                            <div class="information">
                                <p>报名时间：{{ item.activeStartTime }}</p>
                                <p>活动地点：{{ item.activeSite }}</p>
                            </div>
                        </div>
                    </div>
                </van-list>

                <van-empty
                    v-if="!searchresultData.length"
                    description="暂无内容"
                />
            </div>
        </div>
    </div>
</template>

<script>
// import Searchresult from "../searchresult/index";
import BoxHeader from '../searchresult/component/BoxHeader.vue'
import {
    getQueryResultList,
    getQueryHistoryList,
    deleteQueryHistoryList,
} from '@/api/home'
import nativeShare from '@/mixin/nativeShare'
export default {
    mixins: [nativeShare],
    data() {
        return {
            value: '',
            recordList: [],
            searchResult: false,
            activeHeader: 1,
            searchresultData: [],
            loading: false,
            finished: false,
            limit: 10,
            page: 1,
            serviceHeaderData: ['服务', '养老资讯', '活动'],
            activeHeader1: '服务',
            loading1: false,
        }
    },
    components: {
        // Searchresult,
        BoxHeader,
    },
    watch: {
        value(n) {
            if (n.trim() == '') {
                this.searchResult = false
            }
        },
        activeHeader() {
            this.finished = false
            this.page = 1
            this.searchresultData = []
            this.search(this.value)
        },
    },
    created() {},
    mounted() {
        this.getSearchHistory()
    },
    methods: {
        recordSearch(i) {
            this.value = i
            this.search(this.value)
        },
        getSearchHistory() {
            getQueryHistoryList()
                .then((res) => {
                    if (res && res.code == 200) {
                        this.recordList = res.data
                    }
                })
                .catch((err) => {})
        },
        // 服务跳详情
        checkDetail(i) {
            this.$router.push({
                path: '/details',
                query: { id: i.mealsInfoId, category: i.typeName },
            })
        },

        handleGoDetails(id) {
            // 模拟进行传参 分别对应 home 首页养老资讯活动 1 和 2
            // this.$router.push({ path: "/articleDetails", query: { id: i } });
            this.$router.push({
                path: '/articleDetails',
                query: { articleId: id },
            })
        },
        handleGoActivityDetails(id) {
            this.$router.push({ path: '/activityDetails', query: { id: id } })
        },
        servicehandelActive(n) {
            this.activeHeader1 = n
            switch (n) {
                case '服务':
                    this.activeHeader = 1
                    break
                case '养老资讯':
                    this.activeHeader = 2
                    break
                case '活动':
                    this.activeHeader = 3
                    break
                default:
                    break
            }
        },
        onLoad() {
            this.page++
            this.search(this.value)
        },
        deleteQuery() {
            deleteQueryHistoryList().ten((res) => {
                this.getSearchHistory()
            })
        },
        search(n) {
            if (n) {
                this.loading = true
                let data = {
                    type: this.activeHeader,
                    query: n,
                    limit: this.limit,
                    page: this.page,
                }
                getQueryResultList(data)
                    .then((res) => {
                        this.loading = false
                        if (res && res.code == 200) {
                            res.data.forEach((i) => {
                                this.searchresultData.push(i)
                            })
                            if (res.data.length < 10) {
                                this.finished = true
                            }
                        }
                    })
                    .catch((err) => {})
                this.searchResult = true
            } else {
                this.searchResult = false
            }
        },
    },
}
</script>

<style scoped lang="less">
.search {
    background: #fff;
    height: calc(100vh - 68px);
    .search_input {
        border-bottom: 1px solid #ccc;
        /deep/ .van-field__control {
            background: transparent;
        }
    }
    .search_record {
        padding: 12px;
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
                font-size: 18px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #000000;
            }
            span {
                display: flex;
                align-items: center;
                color: #e62c3b;
                font-size: 16px;
            }
        }
        .search_record_list {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 10px 0;
            &:after {
                content: '';
                width: 30%;
            }
            .record_item {
                width: 30%;
                font-size: 14px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 400;
                color: #000;
                border: 1px solid #eee;
                border-radius: 20px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 8px;
            }
        }
    }
}
.searchresult {
    .content {
        padding-top: 53px;
    }
    .service_content_item {
        padding: 24px 14px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        .left-img {
            width: 104px;
            height: 104px;
            background: #ccc;
            margin-right: 14px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .right-box {
            width: 230px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: left;
            .title {
                font-size: 17px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #000000;
            }
            .info_price {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #e62c3b;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-top: 8px;
            }
            div {
                display: flex;
                flex-direction: column;
            }
            span {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.5);
            }
        }
    }
    .consult {
        .consult_tab {
            display: flex;
            align-items: center;
            margin-top: 15px;
            padding: 0px 14px;
            p {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                margin-right: 9px;
                color: rgba(0, 0, 0, 0.5);
                margin-right: 20px;
            }
            .active {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #000000;
            }
        }
        .consult_con {
            // margin-top: 20px;
            border-bottom: 1px solid #ccc;
            padding: 0px 14px 20px;

            .imgbox {
                width: 340px;
                height: 194px;
                position: relative;
                background: #ccc;
                img {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 340px;
                    height: 194px;
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
                img {
                    width: 30px;
                    height: 30px;
                }
                p {
                    width: 281px;
                    font-size: 16px;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: rgba(0, 0, 0, 0.8);
                    line-height: 22px;
                    text-align: left;
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
}
</style>
