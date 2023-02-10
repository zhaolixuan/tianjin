/** 接口统一管理 */
// import fetch from './fetch'
import fetches from './fetches'

export default {
  /** 重大项目页面接口----start */
  // 六条数据加三个比率表
  getZsTbDto(params) {
    return fetches('get', '/aioc-api/zs/getZsTbDto', params)
    // return fetches('get', '../static/data/topdata.json')
  },
  // 轮播告警项目数据
  getZsWarnDtos(params) {
    return fetches('get', '/aioc-api/zs/getZsWarnDtos', params)
    // return fetches('get', '../static/data/warndata.json')
  },
  // 项目列表数据
  getProjectZs(params) {
    return fetches('get', '/aioc-api/zs/getProjectZs', params)
    // return fetches('get', '../static/data/listdata.json')
  },
  // 获取某个阶段数据
  getZsJieduans({
    id,
    name
  }) {
    let url = '/aioc-api/zs/getZsJieduans' + '/' + id + '/' + name
    // let url = '../static/data/stagedata.json'
    return fetches('get', url)
  },
  // 获取地图标注数据、或告警项目数据
  getZsProjectPoints(params) {
    return fetches('get', '/aioc-api/zs/getZsProjectPoints', params)
    // return fetches('get', '../static/data/data.json')
  },
  /** 重大项目页面接口----end */
  /** 招商接口----start */
  getEntList(params) {
    return fetches('get', '/bi/ent/entList', params)
  },
  getBasicQuery(params) {
    return fetches('get', '/bi/ent/basicQuery', params)
  },
  getEntScoreQuery(params) {
    return fetches('get', '/bi/ent/entscoreQuery', params)
  },
  getEntFuzzyQuery(params) {
    return fetches('post', '/bi/ent/fuzzyQuery', params)
  },
  /** 招商接口----end */

  /** 指标墙接口----start */
  getEnumList(params) {
    return fetches('get', '/inspection-api/baseInfo/indexWall/page', params)
  },
  getPoinerDataList(params) {
    return fetches('get', '/inspection-api/inspectionIssues/indexWall/search', params)
  },
  getPoinerDetialData(params) {
    return fetches('get', '/inspection-api/inspectionIssues/indexWall/getIssuesDetail', params)
  },
  getDepNameList(params) {
    return fetches('get', '/inspection-api/inspectionIssues/relativeDepts', params)
  },
  setNewOptions(params) {
    return fetches('post', '/inspection-api/inspectionIssues/comment', params, 'json')
  },
  /** 指标墙接口----end */
  /** 产业链招商----start */
  getProductTypeList(params) {
    return fetches('get', '/aioc-api/industry/getIndustryClassifys', params)
  },
  getPicList(params) {
    return fetches('get', '/aioc-api/industry/getIndustryDirections', params)
  },
  getFirstDimensionListData(params) {
    return fetches('get', '/aioc-api/industry/getIndustryFinances', params)
  },
  getSecondDimensionListData(params) {
    return fetches('get', '/aioc-api/industry/getIndustryCompanys', params)
  },
  getThirdDimensionListData(params) {
    return fetches('get', '/aioc-api/industry/getIndustryOrgs', params)
  },
  /** 产业链招商----end */

  // 老年人口库
  getOlderData(params) {
    return fetches('post', '/yanglao-api/baseperson/getBasePersonInfo', params, 'json')
  },
  // 老年人口画像
  getOlderDetail(params) {
    return fetches('get', '/yanglao-api/baseperson/getBasePersonInfoDetail', params)
  },
  // 老年人补贴
  getOlderSubsidy(params) {
    return fetches('post', '/yanglao-api/baseperson/getallowancePageListInfo', params, 'json')
  },
  // 片区级联数据
  getLocationList(params) {
    return fetches('get', '/yanglao-api/baseperson/baseCommunityInfo', params)
  },
  getLocationListByParent(params) {
    return fetches('get', '/yanglao-api/baseperson/getbyParentId', params)
  },

  /** Consume **/
  getPoi() {
    return fetches('get', '../../static/data/index_poi.json')
  },
  getHhIndex() {
    return fetches('get', '/aioc-api/hhIndex/getHhIndex')
  },
  getHhIndexIndustryIncr() {
    return fetches('get', '/aioc-api/hhIndexIndustryIncr/getHhIndexIndustryIncr')
  },
  getIndustryStruct() {
    return fetches('get', '/aioc-api/hhIndexIndustryStruct/getIndustryStruct')
  },
  getTjIndexHumanSocial() {
    return fetches('get', '/aioc-api/tjIndexHumanSocial/getTjIndexHumanSocial')
  },
  getTjIndexImportExpend() {
    return fetches('get', '/aioc-api/tjIndexImportExpend/getTjIndexImportExpend')
  },

  // 服务老人查询数据
  getOlderServies(params) {
    return fetches('post', '/yanglao-api/basePersonSecond/servicePersonPage', params, 'json')
  },
  // 服务工单查询数据
  getOrderPage(params) {
    return fetches('post', '/yanglao-api/serviceOrderInfo/serviceOrderPage', params, 'json')
  },
  // 网格员查询数据
  getPersonInfo(params) {
    return fetches('post', '/yanglao-api/baseCollectionPerson/getbaseCollectionPersonInfo', params, 'json')
  },

  // 年度重点工作数据
  getYearWork() {
    return fetches('get', '/inspection-api/bigScreen/info')
  },

  // 招商态势列表数据
  getProjectList(page, pageSize) {
    return fetches('get', `/aioc-api/merchantsSituational/getMerchantsSituationals?page=${page}&pageSize=${pageSize}`)
  },

  // 招商态势图表数据
  getMerchants() {
    return fetches('get', '/aioc-api/merchantsSituational/getEssential')
  },

  // 残疾人列表数据
  getDisabledInfo(params) {
    return fetches('post', '/yanglao-api/baseDisabledPerson/getbaseDisabledPersonInfo', params, 'json')
  },

  // 服务订单列表
  getFreeOrderPage(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/serviceFreeOrderPage', params, 'json')
  },
  getFreeOrderPage1(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/serviceFreeOrderPage1', params, 'json')
  },
  getFreeOrderPage2(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/serviceFreeOrderPage2', params, 'json')
  },
  getFreeOrderPage3(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/serviceFreeOrderPage3', params, 'json')
  },
  getFreeOrderPage4(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/serviceFreeOrderPage4', params, 'json')
  },
  getFreeOrderPage5(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/serviceFreeOrderPage5', params, 'json')
  },

  // 服务订单份数总数
  getFoodeOrderPage(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/serviceFoodOrderPage', params, 'json')
  },

  // 服务商家列表
  getOtherPageList(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/companyOtherPageList', params, 'json')
  },
  // 服务商家列表
  getCompanyOtherPageListSecond(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/companyOtherPageListSecond', params, 'json')
  },
  // 服务老人列表
  getSecondPageList(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/personSecondPageList', params, 'json')
  },
  // 服务载体列表
  getServicesPageList(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/merchantServicesPageList', params, 'json')
  },
  // 服务载体列表 - 养老院
  getServices4NursingHome(params) {
    return fetches('post', '/yanglao-api/healthStationInfo/baseNursingHomeInfoDtoPageList', params, 'json')
  },
  // 一键通设备列表
  getDeviceopenPage(params) {
    return fetches('post', '/yanglao-api/deviceopenSecond/serviceDeviceopenPage', params, 'json')
  },
  // 健康驿站服务列表
  getRecordsPage(params) {
    return fetches('post', '/yanglao-api/healthStationInfo/healthPostServiceRecordsPage', params, 'json')
  },
  // 健康讲座列表
  getTalkRecordPage(params) {
    return fetches('post', '/yanglao-api/healthStationInfo/healthTalkRecordPageList', params, 'json')
  },
  // 健康驿站列表
  gethealthStation(params) {
    return fetches('post', '/yanglao-api/healthStationInfo/healthStationPageList', params, 'json')
  },
  // 一键通预警记录列表
  getminfoPageList(params) {
    return fetches('post', '/yanglao-api/deviceopenSecond/alarminfoPageList', params, 'json')
  },
  // 保险赔付列表
  getPaymentPageList(params) {
    return fetches('post', '/yanglao-api/healthStationInfo/basePersonInsurancePaymentPageList', params, 'json')
  },
  // 五大服务 - 消费金额统计
  getServerOrderInfo(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/getServerOrderInfo', params, 'json')
  },
  // 五大服务 - 服务载体服务量统计
  getMerchantServerOrderInfo(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/getMerchantServerOrderInfo', params, 'json')
  },
  // 五大服务 - 服务商服务量统计
  getMerchantOrderInfo(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/getMerchantOrderInfo', params, 'json')
  },
  // 视频监控
  getVideoMonitorInfo(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/getVideoMonitorInfo', params, 'json')
  },
  // 视频监控
  getVideoMonitorRtmpInfo(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/getVideoMonitorRtmpInfo', params, 'json')
  },
  // 获取载体列表
  getmerchantServicesList(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/merchantServicesList', params, 'json')
  },
  // 轮询服务老人列表
  getpersonSecondPageTime(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/personSecondPageTime', params, 'json')
  },
  // 街道服务情况统计
  getStreetServiceInfo(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/getStreetServiceInfo', params, 'json')
  },
  // 社区服务情况统计
  getCommunityServiceInfo(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/getCommunityServiceInfo', params, 'json')
  },
  // 获取各街道
  getStreetInfo(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/getStreetInfo', params, 'json')
  },
  // 获取对应街道下的社区
  getCommunityInfo(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/getCommunityInfo', params, 'json')
  },
  // 服务商下属载体服务运营统计 7月中旬时候改成 服务商下属载体服务量统计
  // 这个也是 服务商下属载体消费金额统计 接口
  getServiceCarrierInfo(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/getServiceCarrierInfo', params, 'json')
  },
  // 服务载体服务情况排名
  getServiceConditionInfo(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/getServiceConditionInfo', params, 'json')
  },
  // 门磁老年人列表
  getEquipmentDataPageList(params) {
    return fetches('post', '/yanglao-api/deviceopenSecond/equipmentDataPageList ', params, 'json')
  },
  // 门磁预警记录
  getAlarmInfoPageList(params) {
    return fetches('post', '/yanglao-api/deviceopenSecond/alarmInfoPageList ', params, 'json')
  },
  // 志愿者列表
  getVolunteerInfoPageList(params) {
    return fetches('post', '/yanglao-api/freeOrderInfo/getVolunteerInfoPageList', params, 'json')
  },
  // 居家养老服务卡登录
  getloginUser(params) {
    return fetches('post', '/business/loginUser/jingdong', params, 'json')
    // 2021年 7月23 日 还是500错误 调用这个接口的组件是 MenuSummary/index.vue
  },
  // 老年人出勤率列表
  getServiceConsumeInfo(params) {
    return fetches('post', '/yanglao-api/deviceopenSecond/getServiceConsumeInfo', params, 'json')
  },
  // 获取养老互助token
  getSphoneLogin(params) {
    return fetches('get', '/pension/system/login/login', params, 'json')
  },
  // 获取出勤率老年人基本信息
  getConsumePeopleInfo(params) {
    return fetches('post', '/yanglao-api/deviceopenSecond/getConsumePeoplePageInfo', params, 'json')
  },
  // 获取驿站服务激励统计表
  getHealthServiceRecord(params) {
    return fetches('post', '/yanglao-api/healthStationInfo/getHealthServiceRecord', params, 'json')
  },
  // 探访服务记录分页
  getVisitServicePageInfo(params) {
    return fetches('post', '/yanglao-api/baseVolunteerTeam/getVisitServicePageInfo', params, 'json')
  },
  // 探访服务记录排名
  getStreetVisitInfo(params) {
    return fetches('post', '/yanglao-api/baseVolunteerTeam/getStreetVisitInfo', params, 'json')
  },
  // 志愿者组织架构
  getVolunteerTeamInfo(params) {
    return fetches('post', '/yanglao-api/baseVolunteerTeam/getVolunteerTeamInfo', params, 'json')
  },
  // 志愿者组织架构列表
  getVolunteerTeamListInfo(params) {
    return fetches('post', '/yanglao-api/baseVolunteerTeam/getVolunteerTeamListInfo', params, 'json')
  },
  // 探访记录详情
  getVisitServiceDetailPageInfo(params) {
    return fetches('post', '/yanglao-api/baseVolunteerTeam/getVisitServiceDetailPageInfo', params, 'json')
  },

  // 6月22日 新增
  // getServicePoint 服务载体补贴分析页面获取服务商
  getServicePoint(params) {
    return fetches('post', '/yanglao-api/serviceCarrierAllowance/getServicePoint', params, 'json')
  },

  // 6月23日 新增
  // getServiceCarrierList 服务载体补贴分析页面获取表格数据
  getServiceCarrierList(params) {
    return fetches('post', '/yanglao-api/serviceCarrierAllowance/getServiceCarrierList', params, 'json')
  },

  // 6月23日 补贴明细表
  getCarrierDetailList(params) {
    return fetches('post', '/yanglao-api/serviceCarrierDetail/getCarrierDetailList', params, 'json')
  },

  // 7月13日 ServiceConditionGather files 获取服务商下拉菜单
  getServicePointList(params) {
    return fetches('post', '/yanglao-api/serviceCarrierAllowance/getServicePoint', params, 'json')
  },

  // 7月13日 getMerchantNameList
  getMerchantNameList(params) {
    return fetches('get', '/yanglao-api/serviceSummarizing/getMerchantNameList', params, 'json')
  },

  // 7月13日 getServiceSummarizingMap 汇总
  getServiceSummarizingMap(params) {
    return fetches('post', '/yanglao-api/serviceSummarizing/getServiceSummarizingMap', params, 'json')
  },

  // 7月14日 getSummarizingAvgMap 日均
  getSummarizingAvgMap(params) {
    return fetches('post', '/yanglao-api/serviceSummarizingAvg/getSummarizingAvgMap', params, 'json')
  },

  // 8月17日 老年人消费群体消费次数消费金额统计 post
  getConsumptionList(params) {
    return fetches('post', '/yanglao-api/consumptionAnalysis/getConsumptionList', params, 'json')
  },

  // 8月18日 老年人年龄分布 post sex字段 传值 男 得到男的数据 传值 女 得到女的数据
  getAgeTotalMap(params) {
    return fetches('post', '/yanglao-api/consumptionAnalysis/getAgeTotalMap', params, 'json')
  },

  // 8月18日 老年人分布 post
  getConsumeDistributionList(params) {
    return fetches('post', '/yanglao-api/consumptionAnalysis/getConsumeDistributionList', params, 'json')
  },

  // 8月19日 社保待遇 post
  getOldIncomeMap(params) {
    return fetches('post', '/yanglao-api/consumptionAnalysis/getOldIncomeMap', params, 'json')
  },

  // 8月19日 身体状况 post
  getPhysicalConditionMap(params) {
    return fetches('post', '/yanglao-api/consumptionAnalysis/getPhysicalConditionMap', params, 'json')
  },

  // 9月13日 服务项目 post
  getServiceTypeMap(params) {
    return fetches('post', `/yanglao-api/consumptionAnalysis/getServiceTypeMap`, params, 'json')
  },

  // 9月13日 中间面板 middleTotal/index.vue 接口
  getPeopleTotalNum(params) {
    return fetches('post', `/yanglao-api/consumptionAnalysis/getPeopleTotalNum`, params, 'json')
  },

  // 2021年10月9号新增 给 HealthCareService 中排除表格外所有模块使用
  getHealthStatistics(params) {
    return fetches('post', `/yanglao-api/healthStatistics/getHealthStatistics`, params, 'json')
  },

  // 10月9号新增 给 健康档案信息 使用
  healthRecordNewList(params) {
    return fetches('post', `/yanglao-api/healthStatistics/healthRecordNewList`, params, 'json')
  },

  // 10月9号新增 给 家庭床位明细 使用
  familySickbedList(params) {
    return fetches('post', `/yanglao-api/healthStatistics/familySickbedList`, params, 'json')
  },

  // 10月9号新增 给 医护一体化病床统计表 使用
  integratedMedicalWardList(params) {
    return fetches('post', `/yanglao-api/healthStatistics/integratedMedicalWardList`, params, 'json')
  },

  // 12月28日新增 给 MoperationalAnalysis 六个top使用
  sixTopCount(params) {
    return fetches('get', '/yanglao-api/statisticalAnalysis/count', params, 'json')
  },

  // 12月28日新增 给 MoperationalAnalysis 服务客次使用
  serviceTime(params) {
    return fetches('get', '/yanglao-api/statisticalAnalysis/chart', params, 'json')
  },

  // 12月28日新增 给 MoperationalAnalysis 服务类别占比使用
  serviceType(params) {
    return fetches('get', '/yanglao-api/statisticalAnalysis/serviceProportion', params, 'json')
  },

  // 12月28日新增 给 MoperationalAnalysis 服务项目占比使用
  serviceProject(params) {
    return fetches('get', '/yanglao-api/statisticalAnalysis/projectProportion', params, 'json')
  },

  // 12月28日新增 给 MoperationalAnalysis 服务项目占比 下拉框 使用
  serviceProjectSelect(params) {
    return fetches('get', '/yanglao-api/pointMachine/getDict', params, 'json')
  },

  // 12月28日新增 给 MoperationalAnalysis 服务内容排名使用
  serviceContent(params) {
    return fetches('get', '/yanglao-api/statisticalAnalysis/projectSort', params, 'json')
  },

  // 12月28日新增 给 MoperationalAnalysis 服务内容排名下拉框使用
  serviceContentSelect(params) {
    return fetches('get', '/yanglao-api/pointMachine/getServiceProject', params, 'json')
  },

  // 2022年01月06日 给 MoperationalAnalysis 服务载体使用
  serviceCenter(params) {
    return fetches('get', '/yanglao-api/statisticalAnalysis/serviceCenter', params, 'json')
  },

  // 2022年01月06日 给 ServiceOlder 路由 服务项目下拉框使用
  getDictList(params) {
    return fetches('get', '/yanglao-api/freeOrderInfo/getDictList', params, 'json')
  },

  // 2022年03月24日 给 olderPage 补贴类别接口
  findAllowanceTypeList(params) {
    return fetches('get', '/yanglao-api/pensionOccupyHome/findAllowanceTypeList', params, 'json')
  },
  // 2022年07月4日  获取适老化 服务列表
  getModifyPlanList(params) {
    return fetches('get', '/yanglao-api/tjAdaptOldModifyPlanStatistics/list', params, 'json')
  },
  // 2022年07月20日  获取适老化 改造类型条件值
  getProjectTypesList(params) {
    return fetches('get', '/yanglao-api/tjAdaptOldModifyPlanStatistics/projectTypes', params, 'json')
  },
  // 2022年07月20日  获取适老化 改造名称条件值
  getProjectNamesList(params) {
    return fetches('get', '/yanglao-api/tjAdaptOldModifyPlanStatistics/projectNames', params, 'json')
  },
  // 2022年07月20日  获取项目列表（改造前后图片等
  getStatisticsPList(params) {
    return fetches('get', '/yanglao-api/tjAdaptOldModifyPlanStatisticsPList/list', params, 'json')
  },
  // 2022年08月26日  老年人签约信息（列表
  getOrderFamilyList(params) {
    return fetches('get', '/yanglao-api/orderFamily/familyDataList', params, 'json')
  },
  // 2022年08月26日  老年人签约信息详情页
  getOrderFamilyDetail(params) {
    return fetches('get', '/yanglao-api/orderFamily/detail', params, 'json')
  },

  // 2022年08月26日  老年人签约信息详情页
  getParkDetail(params) {
    return fetches('post', '/yanglao-api/tjAdaptOldModifyPlanStatistics/getParkDetail', params, 'json')
  },
  //福一把详情：tjAdaptOldModifyPlanStatistics
  getChairDetail(params) {
    return fetches('post', '/yanglao-api/tjAdaptOldModifyPlanStatistics/getChairDetail', params, 'json')
  },

  //公园改造
  getParkList(params) {
    return fetches('get', '/yanglao-api/tjAdaptOldPark/list', params, 'json')
  }, //福一把详情：tjAdaptOldModifyPlanStatistics
  getParkListDetail(params) {
    return fetches('get', '/yanglao-api/tjAdaptOldPark/detail', params, 'json')
  },

}
