import request from "@/api/request";
import { getCookie } from "@/utils/storage";
/**
 * get 请求样例
 */
export function getRequest(params) {
  return request({
    method: `GET`,
    url: ``,
    params,
  });
}

/**
 * post 请求样例
 */
export function postRequest(data) {
  return request({
    method: `POST`,
    url: ``,
    data,
  });
}

/**
 * get 获取服务类别
 */
export function getServiceType() {
  return request({
    method: `GET`,
    url: `${process.env.VUE_APP_API_URL}/pensionOccupyHome/listDictsByCode`,
  });
}

/**
 * get 根据服务大类(膳食、生活、医疗。。) 获取商家信息
 */
export function getServiceList(params) {
  return request({
    method: `GET`,
    url: `${process.env.VUE_APP_API_URL}/pensionOccupyHome/getBusinessList`,
    params,
  });
}

/**
 * get 根据商家id和大类code获取该商家拥有的二级分类：早餐 中餐 晚餐
 */
export function getBusinessDetails(params) {
  return request({
    method: `GET`,
    url: `${process.env.VUE_APP_API_URL}/pensionOccupyHome/getSencedCatrogyByBusiness`,
    params,
  });
}

/**
 * get 根据商家id和大类code获取该商家拥有的服务类别
 */
export function getCatrogyByBusiness(params) {
  return request({
    method: `GET`,
    url: `${process.env.VUE_APP_API_URL}/pensionOccupyHome/getCatrogyByBusiness`,
    params,
  });
}

/**
 * post 提交订单
 */
export function submitOrder(data) {
  return request({
    method: `POST`,
    url: `${process.env.VUE_APP_API_URL}/pensionOccupyHome/addItem`,
    data,
    headers: {
      gunsToken: getCookie("gunsToken"),
    },
  });
}

/**
 * get 提交订单
 */
export function getOrderDetailByNumber(params) {
  return request({
    method: `GET`,
    url: `${process.env.VUE_APP_API_URL}/pensionOccupyHome/getOrderDetailByNumber`,
    params,
  });
}

// GET 我的订单
export function getOrderList(params) {
  return request({
    method: `GET`,
    url: `${process.env.VUE_APP_API_URL}/pensionOccupyHome/getOrderList`,
    params,
    headers: {
      gunsToken: getCookie("gunsToken"),
    },
  });
}

// GET 获取服务人员订单列表
export function getOrderMealsList() {
  return request({
    method: `GET`,
    url: `${process.env.VUE_APP_API_URL}/servicePsersonal/getOrderMealsList`,
    headers: {
      gunsToken: getCookie("gunsToken"),
    },
  });
}

// GET 根据服务人员id获取服务详情信息
export function getDetail(params) {
  return request({
    method: `GET`,
    url: `${process.env.VUE_APP_API_URL}/servicePsersonal/getDetail`,
    params,
  });
}

// GET 服务开始后  服务详情界面
export function getServiceStart(params) {
  return request({
    method: `GET`,
    url: `${process.env.VUE_APP_API_URL}/servicePsersonal/getServiceStart`,
    params,
  });
}

// GET 服务结束
export function finishService(data) {
  return request({
    method: `POST`,
    url: `${process.env.VUE_APP_API_URL}/servicePsersonal/finishService`,
    data,
  });
}

/**
 * post 上传文件
 */
export function uploadFill(data) {
  return request({
    method: `POST`,
    url: `${process.env.VUE_APP_API_URL}/servicePsersonal/upload`,
    headers: { "Content-Type": "multipart/form-data" },
    data,
  });
}

/**
 * post 删除文件
 */
export function deleteFill(data) {
  return request({
    method: `POST`,
    url: `${process.env.VUE_APP_API_URL}/servicePsersonal/delete`,
    data,
  });
}

// GET 老人服务记录列表
export function historyList(params) {
  return request({
    method: `GET`,
    url: `${process.env.VUE_APP_API_URL}/servicePsersonal/historyList`,
    // 天津养老H5小分组 8月4号 超哥说不让传 gunsToken 了 让传 orderId 所以先注释
    // headers: {
    //   gunsToken: getCookie("gunsToken"),
    // },
    params,
  });
}
// GET 老人服务详情
export function getDatilByMealsPersonalId(params) {
  return request({
    method: `GET`,
    url: `${process.env.VUE_APP_API_URL}/servicePsersonal/getDatilByMealsPersonalId`,
    params,
  });
}
// GET 服务人员取消订单
export function cancelServiceOrder(params) {
  return request({
    method: `GET`,
    url: `${process.env.VUE_APP_API_URL}/servicePsersonal/cancelServiceOrder`,
    params,
  });
}
// GET 保存服务人员取消订单原因
export function saveCancelServiceRemarks(data) {
  return request({
    method: `POST`,
    url: `${process.env.VUE_APP_API_URL}/servicePsersonal/saveCancelServiceRemarks`,
    data,
    headers: { "Content-Type": "application/json" },
  });
}

// GET 商品详情
export function getServiceDetails(params) {
  return request({
    method: `GET`,
    url: `${process.env.VUE_APP_API_URL}/pensionOccupyHome/getServiceDetails`,
    params,
    headers: {
      gunsToken: getCookie("gunsToken"),
    },
  });
}

// 1、服务评价列表 get
export function getFinishOrderNotEvaluatedList(params) {
  return request({
    method: "GET",
    url: "${process.env.VUE_APP_API_URL}/orderAppraise/getFinishOrderNotEvaluatedList",
    params,
    headers: {
      gunsToken: getCookie("gunsToken"),
    },
  });
}

// 老人取消订单接口
export function oldPerpleCancelOrder(params) {
  return request({
    method: "GET",
    url: "${process.env.VUE_APP_API_URL}/pensionOccupyHome/oldPerpleCancelOrder",
    params,
  });
}

// 保存老人取消原因
export function saveoldPerpleCancelOrderRemark(data) {
  return request({
    method: "POST",
    url: "${process.env.VUE_APP_API_URL}/pensionOccupyHome/saveoldPerpleCancelOrderRemark",
    data,
  });
}

// 老人结束服务
export function oldPersonalFinishOrder(params) {
  return request({
    method: "GET",
    url: "${process.env.VUE_APP_API_URL}/pensionOccupyHome/oldPersonalFinishOrder",
    params,
  });
}

// 老人删除订单
export function oldPersonalDeleteOrder(params) {
  return request({
    method: "GET",
    url: "${process.env.VUE_APP_API_URL}/pensionOccupyHome/oldPersonalDeleteOrder",
    params,
  });
}

// 服务人员接单
export function acceptOrder(params) {
  return request({
    method: "GET",
    url: "${process.env.VUE_APP_API_URL}/servicePsersonal/acceptOrder",
    params,
  });
}
