import Vue from 'vue'
import VueRouter from 'vue-router'
import { serverRoutes } from './server'
import { getCookie } from '@/utils/storage'
import { Dialog } from 'vant'
Vue.use(VueRouter)

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

let routes = [{
    path: '/',
    redirect: '/home',
    // component: () => import("@/views/home/index.vue"),
},
{
    path: '/home',
    name: 'Home',
    component: () =>
        import('@/views/home/index.vue'),
    meta: {
        title: '居家养老',
        titleiconhide: true,
    },
},
{
    path: '/search',
    name: 'Search',
    component: () =>
        import('@/views/home/Search/index.vue'),
    meta: {
        title: '搜索',
    },
},
{
    path: '/search-result',
    name: 'searchresult',
    component: () =>
        import('@/views/home/searchresult/index.vue'),
    meta: {
        title: '搜索结果',
    },
},
{
    path: '/service',
    name: 'Service',
    component: () =>
        import('@/views/service/index.vue'),
    meta: {
        title: '服务类型',
        // needLogin: true,
        keepAlive: false,
        titleiconhide: true,
    },
},
{
    path: '/mine',
    name: 'Mine',
    component: () =>
        import('@/views/mine/index.vue'),
    meta: {
        title: '我的',
        titleiconhide: true,
    },
},
{
    path: '/activity',
    name: 'Activity',
    component: () =>
        import('@/views/home/activity/index.vue'),
    meta: {
        title: '养老活动',
        needLogin: true,
    },
},
{
    path: '/consult',
    name: 'Consult',
    component: () =>
        import('@/views/home/consult/index.vue'),
    meta: {
        title: '养老资讯',
        needLogin: true,
    },
},
{
    path: '/nearbyConsult',
    name: 'NearbyConsult',
    component: () =>
        import('@/views/home/nearbyConsult/index.vue'),
    meta: {
        title: '附近的养老中心',
        needLogin: true,
    },
},
{
    path: '/serviceDetails',
    name: 'ServiceDetails',
    component: () =>
        import('@/views/service/ServiceDetails/index.vue'),
    meta: {
        title: '服务详情',
        // needLogin: true,
    },
},
{
    path: '/submitOrder',
    name: 'SubmitOrder',
    component: () =>
        import('@/views/service/SubmitOrder/index.vue'),
    meta: {
        title: '提交订单',
        needLogin: true,
        keepAlive: true,
    },
},
{
    path: '/addressList',
    name: 'AddressList',
    component: () =>
        import('@/views/service/AddressList/index.vue'),
    meta: {
        title: '地址列表',
        needLogin: true,
    },
},
{
    path: '/addEditAddress',
    name: 'AddEditAddress',
    component: () =>
        import('@/views/service/AddEditAddress/index.vue'),
    meta: {
        title: '新增地址',
        needLogin: true,
    },
},
{
    path: '/paymentSuccessful',
    name: 'PaymentSuccessful',
    component: () =>
        import('@/views/service/PaymentSuccessful/index.vue'),
    meta: {
        title: '支付成功',
        needLogin: true,
    },
},

{
    path: '/orderDetails',
    name: 'OrderDetails',
    component: () =>
        import('@/views/service/OrderDetails/index.vue'),
    meta: {
        title: '订单详情',
        needLogin: true,
    },
},
{
    path: '/comments',
    name: 'Comments',
    component: () =>
        import('@/views/service/Comments/index.vue'),
    meta: {
        title: '全部评价',
        needLogin: true,
    },
},
{
    path: '/myorder',
    name: 'Myorder',
    component: () =>
        import('@/views/mine/components/myorder/index.vue'),
    meta: {
        title: '我的订单',
        needLogin: true,
    },
},
{
    path: '/myRating',
    name: 'myRating',
    component: () =>
        import('@/views/mine/components/myRating/index.vue'),
    meta: {
        title: '我的评价',
        needLogin: true,
        pathName: 'Mine',
    },
},
{
    path: '/myRatingItem',
    name: 'myRatingItem',
    component: () =>
        import('@/views/mine/components/myRating/myRatingItem.vue'),
    meta: {
        title: '我的评价',
        needLogin: true,
    },
},
{
    path: '/myCollect',
    name: 'myCollect',
    component: () =>
        import('@/views/mine/components/myCollect/index.vue'),
    meta: {
        title: '我的收藏',
        needLogin: true,
    },
},
{
    path: '/myCard',
    name: 'myCard',
    component: () =>
        import('@/views/mine/components/myCard/index.vue'),
    meta: {
        title: '养老服务卡',
        needLogin: true,
    },
},
{
    path: '/bindCard',
    name: 'bindCard',
    component: () =>
        import('@/views/mine/components/myCard/bindCard.vue'),
    meta: {
        title: '养老服务卡',
        needLogin: true,
    },
},
{
    path: '/binding',
    name: 'binding',
    component: () =>
        import('@/views/mine/components/myCard/binding.vue'),
    meta: {
        title: '绑定养老服务卡',
        needLogin: false,
    },
},
{
    path: '/childAccount',
    name: 'childAccount',
    component: () =>
        import('@/views/mine/components/childAccount/index.vue'),
    meta: {
        title: '子女账号',
        needLogin: true,
    },
},
{
    path: '/addChildAccount',
    name: 'addChildAccount',
    component: () =>
        import('@/views/mine/components/childAccount/addChildAccount.vue'),
    meta: {
        title: '亲属账号',
        needLogin: true,
    },
},
{
    path: '/login',
    name: 'login',
    component: () =>
        import('@/views/login/index.vue'),
    meta: {
        title: '选择身份',
        titleiconhide: true,
    },
},
{
    path: '/loginForm',
    name: 'loginForm',
    component: () =>
        import('@/views/login/loginForm.vue'),
    meta: {
        title: '登录',
        titleiconhide: true,
    },
},
{
    path: '/details',
    name: 'details',
    component: () =>
        import('@/views/service/details/index.vue'),
    meta: {
        title: '详情',
        // needLogin: true,
    },
},
{
    path: '/consultDetails',
    name: 'consultDetails',
    component: () =>
        import('@/views/home/nearbyConsult/ConsultDetails.vue'),
    meta: {
        title: '附近养老中心详情',
        needLogin: true,
    },
},
{
    path: '/articleDetails',
    name: 'articleDetails',
    component: () =>
        import('@/views/home/details/articleDetails.vue'),
    meta: {
        title: '养老资讯',
        needLogin: true,
    },
},
{
    path: '/activityDetails',
    name: 'activityDetails',
    component: () =>
        import('@/views/home/details/activityDetails.vue'),
    meta: {
        title: '活动详情',
        needLogin: true,
    },
},
{
    path: '/cancelOrder',
    name: 'cancelOrder',
    component: () =>
        import('@/views/service/cancelOrder/index.vue'),
    meta: {
        title: '申请取消',
    },
},
{
    path: '/paymentSuccessful',
    name: 'paymentSuccessful',
    component: () =>
        import('@/views/service/PaymentSuccessful/index.vue'),
    meta: {
        title: '支付成功',
        needLogin: true,
    },
},
{
    path: '/approvalrecord',
    name: 'approvalRecord',
    component: () =>
        import('@/views/mine/ApprovalRecord/index.vue'),
    meta: {
        title: '审核列表',
        needLogin: true,
    },
},
{
    path: '/postcomments',
    name: 'postComments',
    component: () =>
        import('@/views/mine/PostComments/index.vue'),
    meta: {
        title: '发布评价',
        needLogin: true,
    },
},
{
    path: '/RatingDetails',
    name: 'RatingDetails',
    component: () =>
        import('@/views/mine/components/myRating/RatingDetails/index.vue'),
    meta: {
        title: '评价详情',
        needLogin: true,
        pathName: 'myRating',
    },
},
{
    path: '/bookingDetails',
    name: 'bookingDetails',
    component: () =>
        import('@/views/home/bookingDetails/index.vue'),
    meta: {
        title: '预约',
        needLogin: true,
    },
},
{
    path: '/myActivities',
    name: 'myActivities',
    component: () =>
        import('@/views/mine/components/myActivities/index.vue'),
    meta: {
        title: '我的活动',
        needLogin: true,
    },
},
{
    path: '/servicerLine',
    name: 'servicerLine',
    component: () =>
        import('@/views/mine/components/servicerLine/index.vue'),
    meta: {
        title: '客服热线',
    },
},
{
    path: '/feedBack',
    name: 'feedBack',
    component: () =>
        import('@/views/mine/components/feedBack/index.vue'),
    meta: {
        title: '意见反馈',
    },
},
{
    path: '/loginAdmin',
    name: 'loginAdmin',
    component: () =>
        import('@/views/loginAdmin/index.vue'),
    meta: {
        title: '登录',
        titleiconhide: true,
    },
},

{
    path: '/serveKsh',
    name: 'ServeKsh',
    component: () =>
        import('@/views/ServeKsh/index.vue'),
    meta: {
        needLogin: true,
        loginPath: '/loginAdmin',
        title: '河西区居家养老服务',
        titleiconhide: true,
    },
},
{
    path: '/serveKsh-ranking',
    name: 'ServeKshRanking',
    component: () =>
        import('@/views/ServeKsh/ServeKshRanking.vue'),
    meta: {
        needLogin: true,
        loginPath: '/loginAdmin',
        title: '河西区居家养老服务',
    },
},
{
    path: '/serveKsh-trend',
    name: 'ServeKshTrend',
    component: () =>
        import('@/views/ServeKsh/ServeKshTrend.vue'),
    meta: {
        needLogin: true,
        loginPath: '/loginAdmin',
        title: '河西区居家养老服务',
    },
}, {
    path: '/serveStpg-home',
    name: 'ServeStpgHome',
    component: () =>
        import('@/views/ServerStpg/home/index.vue'),
    meta: {
        //  needLogin: true,
        // loginPath: '/loginAdmin',
        title: '老年人能力评估',
    },
}, {
    path: '/serveStpg-my',
    name: 'ServeStpgMy',
    component: () =>
        import('@/views/ServerStpg/my/index.vue'),
    meta: {
        //  needLogin: true,
        // loginPath: '/loginAdmin',
        title: '评估员信息',
    },
}, {
    path: '/serveStpg-people',
    name: 'ServeStpgPeople',
    component: () =>
        import('@/views/ServerStpg/people/index.vue'),
    meta: {
        //  needLogin: true,
        // loginPath: '/loginAdmin',
        title: '老人个人信息',
    },
}, {
    path: '/serveStpg-archives',
    name: 'ServeStpgArchives',
    component: () =>
        import('@/views/ServerStpg/archives/index.vue'),
    meta: {
        //  needLogin: true,
        // loginPath: '/loginAdmin',
        title: '老人年人能力评估档案库',
    },
}, {
    path: '/serveStpg-assessmentOne',
    name: 'ServeStpgAssessmentOne',
    component: () =>
        import('@/views/ServerStpg/assessmentOne/index.vue'),
    meta: {
        //  needLogin: true,
        // loginPath: '/loginAdmin',
        title: '老人能力评估档',
    },
}, {
    path: '/serveStpg-assessmentTwo',
    name: 'ServeStpgAssessmentTwo',
    component: () =>
        import('@/views/ServerStpg/assessmentTwo/index.vue'),
    meta: {
        //  needLogin: true,
        // loginPath: '/loginAdmin',
        title: '老人能力评估档',
    },
}, {
    path: '/serveStpg-assessmentThree',
    name: 'ServeStpgAssessmentThree',
    component: () =>
        import('@/views/ServerStpg/assessmentThree/index.vue'),
    meta: {
        //  needLogin: true,
        // loginPath: '/loginAdmin',
        title: '老人能力评估档',
    },
},
{
    path: '/serveStpg-assessmentFour',
    name: 'ServeStpgAssessmentFour',
    component: () =>
        import('@/views/ServerStpg/assessmentFour/index.vue'),
    meta: {
        //  needLogin: true,
        // loginPath: '/loginAdmin',
        title: '老人能力评估档',
    },
},
{
    path: '/olderInfo',
    name: 'olderInfo',
    component: () =>
        import('@/views/ServerStpg/olderInfo/index.vue'),
    meta: {
        //  needLogin: true,
        // loginPath: '/loginAdmin',
        title: '老人能力评估档',
    },
},
{
    path: '/autograph',
    name: 'autograph',
    component: () =>
        import('@/views/ServerStpg/autograph/index.vue'),
    meta: {
        //  needLogin: true,
        // loginPath: '/loginAdmin',
        title: '老人能力评估档',
    },

},
{
    path: '/assessor',
    name: 'assessor',
    component: () =>
        import('@/views/ServerStpg/autograph/assessor.vue'),
    meta: {
        //  needLogin: true,
        // loginPath: '/loginAdmin',
        title: '老人能力评估档',
    },

},
{
    path: '/report',
    name: 'report',
    component: () =>
        import('@/views/ServerStpg/autograph/report.vue'),
    meta: {
        //  needLogin: true,
        // loginPath: '/loginAdmin',
        title: '老人能力评估档',
    },

},




]
routes = routes.concat(serverRoutes)
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    // 需要登陆
    if (to.meta.needLogin) {

        // 如果有token 说明该用户已登陆
        if (getCookie('gunsToken')) {
            // 在已登陆的情况下访问登陆页会重定向到首页
            if (to.path === '/login') {
                next({ path: '/' })
            } else {
                next()
            }
        } else {
            // 没有登陆则访问任何页面都重定向到登陆页
            Dialog.alert({
                title: '您还没有登录',
                message: '请先登录再进行操作',
            }).then(() => {
                // on close
                if (to.path === '/login') {
                    next()
                } else {
                    if (to.meta.loginPath) {
                        next('/loginAdmin')
                    } else {
                        next(`/login?redirect = ${to.name}`)

                    }
                }
            })
        }
    } else {
        next()
    }
})

export default router