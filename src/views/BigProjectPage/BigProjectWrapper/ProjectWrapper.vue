<template>
    <div class="wrapper-box">
        <!-- 企业列表组件 -->
        <CompanyList></CompanyList>
        <div class="content-box">
            <div class="content-left">
                <!-- 比率表组件 -->
                <RateList></RateList>
                <!-- 轮播组件 -->
                <ScrollTips></ScrollTips>
                <!-- 项目列表组件 -->
                <ProjectList></ProjectList>
            </div>
            <div class="content-right">
                <!-- 地图组件 -->
                <ProjectMap></ProjectMap>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import CompanyList from './ProjectCompanyList'
import RateList from './ProjectRateList'
import ScrollTips from './ProjectScrollTips'
import ProjectList from './ProjectList'
import ProjectMap from './ProjectMap'
import api from '@/api/api'
export default {
    // props:['title','checkedKey'],
    data(){
        return {
            // companyListData: this.$store.state.bigproject.companyListData,

        }
    },
    methods:{

    },
    components:{
        CompanyList,
        RateList,
        ScrollTips,
        ProjectList,
        ProjectMap
    }
}
</script>

<style scoped>
.wrapper-box{
    padding: 1%;
    padding-top: 0;
    width: 98%;
    height: 98%;
}
.content-box{
    height: 87.5%;
    width: 100%;
}
.content-left,.content-right{
    height: 98%;
    float: left;
}
.content-left{
    width: 40%;
}
.content-right{
    width: 59.9%;
    border: .01rem solid rgba(0,117,255,0.5);
    padding: 1%;
    box-sizing: border-box;
}
</style>

