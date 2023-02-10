const serverRoutes = [{
        path: '/server-home',
        component: () =>
            import ('@/views/ServerExe/ServerHome/index.vue'),
        name: 'ServerHome',
        meta: {
            // needLogin: true,
            title: '服务人员',
            titleiconhide: true,
        },
    },
    {
        path: '/server-model',
        component: () =>
            import ('@/views/ServerExe/ServerModel/index.vue'),
        name: 'ServerModel',
        meta: {
            // needLogin: true,
            title: '养老中心派单服务',
            pathName: 'ServerHome',
        },
    },
    {
        path: '/server-CwfwModel',
        component: () =>
            import ('@/views/ServerExe/ServerCwfwModel/index.vue'),
        name: 'ServerCwfwModel',
        meta: {
            // needLogin: true,
            title: '家庭养老床位服务计划',
            keepAlive: false,
            pathName: 'ServerHome',
        },
    },

    {
        path: '/plan-details',
        component: () =>
            import ('@/views/ServerExe/PlanDetails/index.vue'),
        name: 'PlanDetails',
        meta: {
            // needLogin: true,
            title: '服务计划详情',
        },
    },
    {
        path: '/yyfw-details',
        component: () =>
            import ('@/views/ServerExe/PlanDetails/YyfwDetails.vue'),
        name: 'YyfwDetails',
        meta: {
            // needLogin: true,
            title: '服务工单详情',
        },
    },
    {
        path: '/workorder-details',
        component: () =>
            import ('@/views/ServerExe/WorkorderDetails/index.vue'),
        name: 'WorkorderDetails',
        meta: {
            // needLogin: true,
            title: '工单详情',
        },
    },
    {
        path: '/service-record',
        component: () =>
            import ('@/views/ServerExe/ServiceRecord/index.vue'),
        name: 'ServiceRecord',
        meta: {
            // needLogin: true,
            title: '服务记录',
        },
    },
    {
        path: '/server-record',
        name: 'serverRecord',
        component: () =>
            import ('@/views/ServerExe/ServerRecord/index.vue'),
        meta: {
            // needLogin: true,
            title: '服务记录',
            pathName: 'ServerModel',
        },
    },
    {
        path: '/server-mine',
        name: 'ServerMine',
        component: () =>
            import ('@/views/ServerExe/ServerMine/index.vue'),
        meta: {
            // needLogin: true,
            title: '我的',
        },
    },
    {
        path: '/server-baseinfo',
        name: 'server-baseinfo',
        component: () =>
            import ('@/views/ServerExe/ServerInfo/index.vue'),
        meta: {
            // needLogin: true,
            title: '基本信息',
        },
    },
    {
        path: '/server-recordStatistics',
        name: 'serverRecordStatistics',
        component: () =>
            import ('@/views/ServerExe/recordStatistics/index.vue'),
        meta: {
            // needLogin: true,
            title: '服务记录',
        },
    },
    {
        path: '/server-recordDetails',
        name: 'server-recordDetails',
        component: () =>
            import (
                '@/views/ServerExe/recordStatistics/serviceDetail/index.vue'
            ),
        meta: {
            // needLogin: true,
            title: '服务记录',
        },
    },
    {
        path: '/server-changePassword',
        name: 'ServerChangePassword',
        component: () =>
            import (
                '@/views/ServerExe/ChangePassword/index.vue'
            ),
        meta: {
            // needLogin: true,
            title: '修改密码',
        },
    },

    {
        path: '/slhgz-home',
        name: 'Slhgzhome',
        component: () =>
            import (
                '@/views/Slhgz/home/index.vue'
            ),
        meta: {
            // // needLogin: true,
            title: '适老化改造',
        },
    },
    {
        path: '/slhgz-details',
        name: 'SlhgzDetails',
        component: () =>
            import (
                '@/views/Slhgz/SlhgzDetails/index.vue'
            ),
        meta: {
            // // needLogin: true,
            title: '适老化改造详情',
        },
    }, {
        path: '/slhgz-add',
        name: 'SlhgzAdd',
        component: () =>
            import (
                '@/views/Slhgz/SlhgzAdd/index.vue'
            ),
        meta: {
            // // needLogin: true,
            title: '添加适老化改造名单',
        },
    },
    {
        path: '/slhgz-repertoire',
        name: 'SlhgzRepertoire',
        component: () =>
            import (
                '@/views/Slhgz/SlhgzRepertoire/index.vue'
            ),
        meta: {
            // // needLogin: true,
            title: '适老化改造清单',
        },
    },

    ,
]

export { serverRoutes }