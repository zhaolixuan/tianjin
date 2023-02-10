/*
 * @Description: fileContent
 * @Author: diaolili
 * @Date: 2021-04-27 15:30:21
 */

export default [{
        path: '/',
        component: () =>
            import ('@/views/Consume/index')
    },
    {
        path: '/FrameConsume',
        name: 'FrameConsume',
        // redirect:'olderDistribution',
        component: () =>
            import ('@/views/Consume/index')
    },
    {
        path: '/provideAged',
        name: 'ProvideAged',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ProvideAged/index.vue')
    },
    {
        path: '/frame',
        name: 'Frame',
        component: () =>
            import ('@/views/FramePage/index.vue')
    },
    {
        path: '/echartmap',
        name: 'EchartMap',
        component: () =>
            import ('@/views/ProvideAged/components/Map/index')
    },
    {
        path: '/bigproject',
        name: 'BigProject',
        component: () =>
            import ('@/views/BigProjectPage/index.vue')
    },
    {
        path: '/Industry',
        name: 'Industry',
        component: () =>
            import ('@/views/Industry/index.vue')
    },
    {
        path: '/industryinfo',
        name: 'IndustryInfo',
        component: () =>
            import ('@/views/IndustryInfo/index.vue')
    },
    {
        path: '/Quota',
        name: 'Quota',
        component: () =>
            import ('@/views/quota/index.vue')
    },
    {
        path: '/industryInvestment',
        name: 'industryInvestment',
        component: () =>
            import ('@/views/IndustryInvestment/index.vue')
    },
    {
        path: '/olderPage',
        name: 'olderPage',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/OlderPage/index.vue')
    }, {
        path: '/olderPicture',
        name: 'olderPicture',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/OlderPicture/index.vue')
    }, {
        path: '/olderSubsidy',
        name: 'olderSubsidy',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/OlderSubsidy/index.vue')
    }, {
        path: '/olderDfs',
        name: 'olderDfs',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/Distribution/index.vue')
    },
    {
        path: '/serviceBusiness',
        name: 'ServiceBusiness',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceBusiness/index.vue')
    }, {
        path: '/olderService',
        name: 'olderService',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/OlderServices/index.vue')
    },
    {
        path: '/serviceWork',
        name: 'ServiceWork',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceWork/index.vue')
    },
    {
        path: '/yearWork',
        name: 'yearWork',
        component: () =>
            import ('@/views/YearKeyWork/index.vue')
    },
    {
        path: '/Merchants',
        name: 'Merchants',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/MerchantsPage/index.vue')
    },
    {
        path: '/reseauPage',
        name: 'reseauPage',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ReseauPage/index.vue')
    },
    {
        path: '/disabledPage',
        name: 'disabledPage',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/DisabledPage/index.vue')
    },
    {
        path: '/olderDistribution',
        name: 'olderDistribution',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/OlderDistribution/index.vue' /* 居家养老首页 */ )
    },
    {
        path: '/buffetPage',
        name: 'buffetPage',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/BuffetPage/index.vue' /* 养老助餐页面 */ )
    },
    {
        path: '/olderPortrait',
        name: 'olderPortrait',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/OlderPortrait/index.vue' /* 老年人画像页面 */ )
    },
    {
        path: '/ProvideSubsidy',
        name: 'ProvideSubsidy',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ProvideSubsidy/index.vue' /* 养老补贴页面 */ )
    },
    {
        path: '/MedicalPage',
        name: 'MedicalPage',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/MedicalPage/index.vue' /* 养老医疗页面 */ )
    },
    {
        path: '/CallingDevice',
        name: 'CallingDevice',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/CallingDevice/index.vue' /* 呼叫中心统计页面 */ )
    },
    {
        path: '/ServiceOlder',
        name: 'ServiceOlder',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceOlder/index.vue' /* 助餐记录列表页 */ )
    },
    {
        path: '/ServiceMerchant',
        name: 'ServiceMerchant',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceMerchant/index.vue' /* 服务商列表页 */ )
    },
    {
        path: '/ServiceoldMan',
        name: 'ServiceoldMan',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceoldMan/index.vue' /* 服务老人列表页 */ )
    },
    {
        path: '/ServiceCarrier',
        name: 'ServiceCarrier',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceCarrier/index.vue' /* 服务载体列表页 */ )
    },
    {
        path: '/NursingHome',
        name: 'NursingHome',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceCarrier/nursingHome.vue' /* 服务载体列表页-养老院 */ )
    },
    {
        path: '/EquipmentList',
        name: 'EquipmentList',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/EquipmentList/index.vue' /* 一键通设备安装老年人 */ )
    },
    {
        path: '/NewReseau',
        name: 'NewReseau',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/NewReseau/index.vue' /* 网格员列表页 */ )
    },
    {
        path: '/HomeDistribution',
        name: 'HomeDistribution',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/HomeDistribution/index.vue' /* 服务载体分布页面 */ )
    },
    {
        path: '/MedicalList',
        name: 'MedicalList',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/MedicalList/index.vue' /* 医疗列表页面 */ )
    },
    {
        path: '/RecordList',
        name: 'RecordList',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/RecordList/index.vue' /* 健康讲座记录列表页面 */ )
    },
    {
        path: '/HealthStationList',
        name: 'HealthStationList',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/HealthStationList/index.vue' /* 健康驿站列表页面 */ )
    },
    {
        path: '/GroupPortrait',
        name: 'GroupPortrait',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/GroupPortrait/index.vue' /* 服务老人消费群体画像页面 */ )
    },
    {
        path: '/OlderInformation',
        name: 'OlderInformation',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/OlderInformation/index.vue' /* 老年人基本信息统计页面 */ )
    },
    {
        path: '/SmartdeviceStatistics',
        name: 'SmartdeviceStatistics',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/SmartdeviceStatistics/index.vue' /* 旧智能设备监测页面 */ )
    },
    {
        path: '/WarningRecordList',
        name: 'WarningRecordList',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/WarningRecordList/index.vue' /* 一键通预警记录列表页 */ )
    },
    {
        path: '/FiveService',
        name: 'FiveService',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/FiveService/index.vue' /* 五大服务页面 */ )
    },
    {
        path: '/FacilitatorAnalytical',
        name: 'FacilitatorAnalytical',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/FacilitatorAnalytical/index.vue' /* 服务商运营大统计分析页面 */ )
    },
    {
        path: '/DifferentGroups',
        name: 'DifferentGroups',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/DifferentGroups/index.vue' /* 消费金额消费群体画像 */ )
    }, {
        path: '/InsuranceClaims',
        name: 'InsuranceClaims',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/InsuranceClaims/index.vue' /* 保险赔付情况列表页面 */ )
    },
    {
        path: '/OrderStatisticalAnalysis',
        name: 'OrderStatisticalAnalysis',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/OrderStatisticalAnalysis/index.vue' /* 全区居家养老服务情况统计分析页面 */ )
    },
    {
        path: '/ServiceProvidersAnalysis',
        name: 'ServiceProvidersAnalysis',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceProvidersAnalysis/index.vue' /* 服务商运营服务统计页面 */ )
    },
    {
        path: '/ServiceCarrierOperation',
        name: 'ServiceCarrierOperation',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceCarrierOperation/index.vue' /* 服务载体经营情况页面 */ )
    },
    {
        path: '/HomeServiceOperation',
        name: 'HomeServiceOperation',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/HomeServiceOperation/index.vue' /* 服务载体统计 */ )
    },
    {
        path: '/FacilitatorRun',
        name: 'FacilitatorRun',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/FacilitatorRun/index.vue' /* 服务运营大数据统计分析页面 */ )
    },
    {
        path: '/ServiceCarrierAnalysis',
        name: 'ServiceCarrierAnalysis',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceCarrierAnalysis/index.vue' /* 服务载体运营情况统计分析页面 */ )
    },
    {
        path: '/StreetServices',
        name: 'StreetServices',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/StreetServices/index.vue' /* 街道服务情况统计分析 */ )
    },
    {
        path: '/CommunityService',
        name: 'CommunityService',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/CommunityService/index.vue' /* 街道社区服务率排名列表页 */ )
    },
    {
        path: '/ServiceOperation',
        name: 'ServiceOperation',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceOperation/index.vue' /* 服务下属服务载体运营统计页面 */ )
    },
    // 7月20日新增下面路由
    {
        path: '/ServiceConsumptionStatistic',
        name: 'ServiceConsumptionStatistic',
        component: () =>
            import ('@/views/ServiceOperation/consumption.vue'), // 服务商下属载体消费金额统计
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台',
        }
    },
    {
        path: '/ServiceCarrierRank',
        name: 'ServiceCarrierRank',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceCarrierRank/index.vue' /* 服务载体情况排名列表页 */ )
    },
    // 6月21日 新增 ServiceZaiTiButieStatistics
    {
        path: '/ServiceZaiTiButieStatistics',
        name: 'ServiceZaiTiButieStatistics',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceZaiTiButieStatistics/index.vue' /* 服务载体流量补贴统计表页页面 */ )
    },
    // 6月21 新增 butieDetails
    {
        path: '/butieDetails',
        name: 'butieDetails',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceZaiTiButieStatistics/butieDetails.vue' /* 服务载体流量补贴统计表页页面 */ )
    },
    // 2021年07月07日
    {
        path: '/ServiceConditionGather',
        name: 'ServiceConditionGather',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceConditionGather/index.vue' /* 服务情况汇总统计表页面 */ )
    },
    // 2021年07月07日
    {
        path: '/DailyServiceStatistics',
        name: 'DailyServiceStatistics',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceConditionGather/dailyService.vue' /* 服务情况汇总统计表页面 */ )
    },
    {
        path: '/SmartdeviceStatisticsNew',
        name: 'SmartdeviceStatisticsNew',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/SmartdeviceStatisticsNew/index.vue' /* 新智能设备监测页面 */ )
    },
    {
        path: '/TheagedGateList',
        name: 'TheagedGateList',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/TheagedGateList/index.vue' /* 安装门磁设备老人列表页 */ )
    },
    {
        path: '/WarningGateList',
        name: 'WarningGateList',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/WarningGateList/index.vue' /* 门磁预警记录页 */ )
    },
    {
        path: '/VolunteerList',
        name: 'VolunteerList',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/VolunteerList/index.vue' /* 志愿者名单列表页 */ )
    },
    {
        path: '/ServiceLeague',
        name: 'ServiceLeague',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceLeague/index.vue' /* 居家养老服务联盟库列表页 */ )
    },
    {
        path: '/MenuSummary',
        name: 'MenuSummary',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/MenuSummary/index.vue' /* 养老菜单页面 */ )
    },
    {
        path: '/ServiceConsumption',
        name: 'ServiceConsumption',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceConsumption/index.vue' /* 服务载体老年人消费频率 */ )
    },
    {
        path: '/AgedDetial',
        name: 'AgedDetial',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/AgedDetial/index.vue' /* 消费老年人基本信息 */ )
    },
    {
        path: '/ServiceVolunteer',
        name: 'ServiceVolunteer',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/ServiceVolunteer/index.vue' /* 志愿者服务数据统计 */ )
    },
    {
        path: '/PoststationRecord',
        name: 'PoststationRecord',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/PoststationRecord/index.vue' /* 健康驿站服务记录表 */ )
    },
    {
        path: '/VisitService',
        name: 'VisitService',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/VisitService/index.vue' /* 志愿者入户探访记录 */ )
    },
    {
        path: '/VisitingRecords',
        name: 'VisitingRecords',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/VisitingRecords/index.vue' /* 街道探访记录排名 */ )
    },
    {
        path: '/VisitingTeam',
        name: 'VisitingTeam',
        meta: {
            checkedYanglao: true,
            title: '河西区居家养老服务管理平台'
        },
        component: () =>
            import ('@/views/VisitingTeam/index.vue' /* 志愿者组织架构 */ )
    },
    // 8月11日新增路由
    {
        path: '/OlderConsumpFrequency',
        name: 'OlderConsumpFrequency',
        component: () =>
            import ("@/views/OlderConsumpFrequency/index.vue"), // 老年人消费频率分析
        meta: {
            title: '河西区居家养老服务管理平台',
        }
    },
    // 2021年8月13日新增
    {
        path: '/OlderConsumpTimesAndAmount',
        name: 'OlderConsumpTimesAndAmount',
        component: () =>
            import ("@/views/OlderConsumpTimesAndAmount/index.vue"), // 页面级老年人消费群体次数和金额统计表
        meta: {
            title: '河西区居家养老服务管理平台',
        }
    },
    // 2021年8月13日新增
    {
        path: '/OlderConsumeStreetDistribution',
        name: 'OlderConsumeStreetDistribution',
        component: () =>
            import ("@/views/OlderConsumeStreetDistribution/index.vue"), // 页面级老年人消费人群街道分布
        meta: {
            title: '河西区居家养老服务管理平台',
        }
    },
    // 2021年8月16日新增
    {
        path: '/OlderConsumeServerDistribution',
        name: 'OlderConsumeServerDistribution',
        component: () =>
            import ("@/views/OlderConsumeServerDistribution/index.vue"), // 页面级老年人消费人群服务商分布
        meta: {
            title: '河西区居家养老服务管理平台',
        }
    },
    // 2021年8月16日新增
    {
        path: '/OlderConsumeServerCarrierDistribution',
        name: 'OlderConsumeServerCarrierDistribution',
        component: () =>
            import ("@/views/OlderConsumeServerCarrierDistribution/index.vue"), // 页面级老年人消费人群服务载体分布
        meta: {
            title: '河西区居家养老服务管理平台',
        }
    },
    // 9月23日新增
    {
        path: '/MedicalCareSickbed',
        name: 'MedicalCareSickbed',
        component: () =>
            import ("@/views/MedicalCareSickbed/index.vue"),
        meta: {
            title: '河西区居家养老服务管理平台'
        }
    },
    // 10月08日新增
    {
        path: '/HealthCareService',
        name: 'HealthCareService',
        component: () =>
            import ("@/views/HealthCareService/index.vue"),
        meta: {
            title: '河西区居家养老服务管理平台'
        }
    },
    // 10月11日新增 健康档案信息表
    {
        path: '/HealthRecordInfoSheet',
        name: 'HealthRecordInfoSheet',
        component: () =>
            import ("@/views/HealthRecordInfoSheet/index.vue"),
        meta: {
            title: '河西区居家养老服务管理平台'
        }
    },
    // 10月11日新增 页面级 家庭床位明细
    {
        path: '/HealthHomeBedDetails',
        name: 'HealthHomeBedDetails',
        component: () =>
            import ("@/views/HealthHomeBedDetails/index.vue"),
        meta: {
            title: '河西区居家养老服务管理平台'
        }
    },
    // 10月11日新增 页面级 医护一体化病床统计
    {
        path: '/HealthMedicalSickBedStatistics',
        name: 'HealthMedicalSickBedStatistics',
        component: () =>
            import ("@/views/HealthMedicalSickBedStatistics/index.vue"),
        meta: {
            title: '河西区居家养老服务管理平台'
        }
    },
    // 2021年12月24日 新增
    {
        path: '/MoperationalAnalysis',
        name: 'MoperationalAnalysis',
        component: () =>
            import ("@/views/MoperationalAnalysis/index.vue"),
        meta: {
            title: '河西区居家养老服务管理平台',
        }
    },
    // 养老床位
    {
        path: '/YanglaochuangweiService',
        name: 'YanglaochuangweiService',
        component: () =>
            import ("@/views/YanglaochuangweiService/index.vue"),
        meta: {
            title: '河西区居家养老服务管理平台',
        }
    },
    // 养老适老化
    {
        path: '/YanglaoshilaohuaService',
        name: 'YanglaoshilaohuaService',
        component: () =>
            import ("@/views/YanglaoshilaohuaService/index.vue"),
        meta: {
            title: '河西区居家养老服务管理平台',
        }
    },
    // 养老适老化 入户改造名单
    {
        path: '/YanglaoshilaohuaList',
        name: 'YanglaoshilaohuaList',
        component: () =>
            import ("@/views/YanglaoshilaohuaList/index.vue"),
        meta: {
            title: '河西区居家养老服务管理平台',
        }
    },{
        path: '/YanglaoshilaohuaParkList',
        name: 'YanglaoshilaohuaParkList',
        component: () =>
            import ("@/views/YanglaoshilaohuaParkList/index.vue"),
        meta: {
            title: '河西区居家养老服务管理平台',
        }
    },
    // 养老床位改造名单
    {
        path: '/YanglaochuangweiList',
        name: 'YanglaochuangweiList',
        component: () =>
            import ("@/views/YanglaochuangweiList/index.vue"),
        meta: {
            title: '河西区居家养老服务管理平台',
        }
    }

]