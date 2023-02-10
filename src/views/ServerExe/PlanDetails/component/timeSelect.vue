<template>
    <van-popup
        v-model="popupShow"
        round
        position="bottom"
        :style="{ height: '300px' }"
    >
        <div class="popup_box">
            <div class="details_content">
                <div class="details_content_tab">
                    <p
                        v-for="i in tabList"
                        :key="i.date"
                        :class="tabActive == i.date ? 'active' : ''"
                        @click="handeltabClick(i)"
                    >
                        {{ i.date }}({{ i.weeks }})
                    </p>
                </div>
                <div class="details_content_centent">
                    <div
                        class="details_content_centent_item"
                        v-for="i in timeList - hours"
                        :key="i"
                        @click="selectTime = i"
                    >
                        <p :class="selectTime == i ? 'active' : ''">
                            {{ `${i - 1 + hours}:00-${i + hours}:00` }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </van-popup>
</template>

<script>
export default {
    data() {
        return {
            popupShow:false,
            tabList: [],
            tabActive: '',
            timeList: 24,
            selectTime: 0,
            hours: 0,
        }
    },

    watch: {
        
        tabActive(n) {
            if (n == this.tabList[0].date) {
                this.hours = new Date().getHours() + 1
            } else {
                this.hours = 0
            }
        },
        selectTime(n) {
            if (n) {
                let time
                // console.log(this.tabActive);
                if (this.selectTime) {
                    time = `${this.tabActive} ${
                        this.selectTime + this.hours - 1 >= 10
                            ? this.selectTime + this.hours - 1
                            : '0' + '' + (this.selectTime + this.hours - 1)
                    }:00-${
                        this.selectTime + this.hours >= 10
                            ? this.selectTime + this.hours
                            : '0' + '' + (this.selectTime + this.hours * 1)
                    }:00`
                } else {
                    time = ''
                }
                this.popupShow = false
                this.$emit('handelShow', time)
            }
        },
    },
    created() {},
    mounted() {
        this.getTabData()
        this.tabActive = this.fun_date(0)
    },

    methods: {
        fun_week(num) {
            var date1 = new Date()
            var date2 = new Date(date1)
            date2.setDate(date1.getDate() + num)
            var day = date2.getDay()
            var weeks = new Array(
                '周日',
                '周一',
                '周二',
                '周三',
                '周四',
                '周五',
                '周六'
            )
            return weeks[day]
        },
        fun_date(num) {
            var date1 = new Date()
            //今天时间
            var time1 =
                date1.getFullYear() +
                '-' +
                (date1.getMonth() + 1) +
                '-' +
                date1.getDate()
            var date2 = new Date(date1)
            date2.setDate(date1.getDate() + num)
            let a =
                date2.getMonth() + 1 >= 10
                    ? date2.getMonth() + 1
                    : `0${date2.getMonth() + 1}`

            var time2 =
                date2.getFullYear() +
                '-' +
                a +
                '-' +
                (date2.getDate() >= 10
                    ? date2.getDate()
                    : `0${date2.getDate()}`)

            return time2
        },
        getTabData() {
            for (let index = 0; index < 7; index++) {
                this.tabList.push({
                    weeks: this.fun_week(index),
                    date: this.fun_date(index),
                })
            }
        },
        handeltabClick(i) {
            this.tabActive = i.date
        },
    },
}
</script>

<style scoped lang="less">
.popup_box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .title {
        line-height: 30px;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
    }
    .details_content {
        display: flex;
        justify-content: space-between;
        height: 100%;
        .details_content_tab {
            width: 130px;
            height: 100%;
            background: #ccc;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                color: #000;
            }
            .active {
                background: #fff;
                color: rgb(245, 108, 108);
            }
        }
        .details_content_centent {
            flex: 1;
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
            .details_content_centent_item {
                font-size: 14px;
                line-height: 39px;
                height: 39px;
                p {
                    color: #000;
                }
                .active {
                    color: rgb(245, 108, 108);
                }
            }
        }
    }
}
</style>
