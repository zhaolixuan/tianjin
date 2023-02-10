import request from "@/api/request";
import { getCookie } from "@/utils/storage";

/* 
  get 请求样例
*/
export const getRequest = (params) => {
  return request({
    method: "GET",
    url: "",
    params,
  });
};

/* 
  post 请求样例
*/
export const postRequest = (data) => {
  return request({
    method: "POST",
    url: "",
    data,
  });
};

/* 
    1 获取子女账号列表 getChildUserList
*/
export function getChildUserList(params) {
  return request({
    method: "GET",
    url: "${process.env.VUE_APP_API_URL}/childUser/getChildUserList",
    params,
  });
}

/* 
    2 判断子女账户数量
*/
export function judgeAmount(params) {
  return request({
    method: "GET",
    url: "${process.env.VUE_APP_API_URL}/childUser/judgeAmount",
    params,
  });
}

/* 
    3 新增子女账户 字段1 status 值 字符串 1
*/
export function childrenAccountAdd(data) {
  return request({
    method: "POST",
    url: "${process.env.VUE_APP_API_URL}/childUser/childAdd",
    data,
  });
}

/* 
    4 解绑子女账户
*/
export function childRemove(params) {
  return request({
    method: "GET",
    url: "${process.env.VUE_APP_API_URL}/childUser/childRemove",
    params,
  });
}

/* 
    旧版已评价列表
*/
// export function getOrderCompleteAppreiseList() {
//   return request({
//     method: "GET",
//     url: "${process.env.VUE_APP_API_URL}/orderAppraise/getOrderCompleteAppreiseList",
//     headers: {
//       gunsToken: getCookie("gunsToken"),
//     },
//   });
// }

// 最新的已评价列表接口
export function getFinishedAppreiseList(params) {
  return request({
    method: "GET",
    url: "${process.env.VUE_APP_API_URL}/orderAppraise/getFinishedAppreiseList",
    headers: {
      gunsToken: getCookie("gunsToken"),
    },
    params,
  });
}

/* 
    旧版待评价列表
*/
// export function getOrderUnFinishedAppreiseList() {
//   return request({
//     method: "GET",
//     url: "${process.env.VUE_APP_API_URL}/orderAppraise/getOrderUnFinishedAppreiseList",
//     headers: {
//       gunsToken: getCookie("gunsToken"),
//     },
//   });
// }

export function getFinishOrderNotEvaluatedList(params) {
  return request({
    method: "GET",
    url: "${process.env.VUE_APP_API_URL}/orderAppraise/getFinishOrderNotEvaluatedList",
    headers: {
      gunsToken: getCookie("gunsToken"),
    },
    params,
  });
}

/* 
  7 根据 id 获取待评论服务 get
*/
export function getNotEvaluatedListByid(params) {
  return request({
    method: "GET",
    url: "${process.env.VUE_APP_API_URL}/orderAppraise/getNotEvaluatedList",
    params,
  });
}

/* 
  8 发布评价时候 信息回显
*/
export function getOrderAppreise(params) {
  return request({
    method: "GET",
    url: "${process.env.VUE_APP_API_URL}/orderAppraise/getOrderAppreise",
    params,
  });
}

/* 
  9 根据 本次评价 id 获取评价详情 
  参数1 接收字段 gunsToken   值 cookie 里面存的  gunsToken
	参数2 接收字段 appraiseId  传值为 getFinishedAppreiseList 接口返回的data中每一项
	的 id 值  不是orderId(订单orderId)
*/
export function getAppraiseDetailById(params) {
  return request({
    method: "GET",
    url: "${process.env.VUE_APP_API_URL}/orderAppraise/getAppraiseDetailById",
    params,
    headers: {
      gunsToken: getCookie("gunsToken"),
    },
  });
}

/* 
  10 评论文件上传接口地址 评论文件上传地址 /orderAppraiseFile/upload
  参数 files 文件
  orderServiceProjectId  服务项目id  
  idCard 老人身份号
  评论新增接口 增加参数 List<String>orderAppraiseFileIds
  保存评论的文件的时候json格式传回来
*/
export function upload(data) {
  return request({
    method: "POST",
    url: "${process.env.VUE_APP_API_URL}/orderAppraiseFile/upload",
    data,
  });
}

/* 
  11 发布评价
*/
export function addItem(data) {
  return request({
    method: "POST",
    url: "${process.env.VUE_APP_API_URL}/orderAppraise/addItem",
    data,
  });
}

/* 
  12 收藏列表
*/
export function conllectionList(params) {
  return request({
    method: "GET",
    url: "${process.env.VUE_APP_API_URL}/mealsServiceProjectCollection/conllectionList",
    params,
  });
}

/* 
  12 添加收藏(收藏保存) 字段=>type 商品(0) / 活动(1)
*/
export function conllectionAddItem(data) {
  return request({
    method: "POST",
    url: "${process.env.VUE_APP_API_URL}/mealsServiceProjectCollection/addItem",
    data,
  });
}

/* 
  13 取消收藏
*/
export function conllectionDeleteItem(params) {
  return request({
    method: "GET",
    url: "${process.env.VUE_APP_API_URL}/mealsServiceProjectCollection/delete",
    params,
  });
}

/* 
  13 删除审核记录
*/
export function physicallyDeleted(params) {
  return request({
    method: "GET",
    url: "${process.env.VUE_APP_API_URL}/childUser/physicallyDeleted",
    params,
  });
}
