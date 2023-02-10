import request from "@/api/request";
import { getCookie } from '@/utils/storage'

/**
 * get 请求样例
 */
export function getRequest (params) {
    return request({
        method: `GET`,
        url: ``,
        params,
    })
}

/**
 * post 请求样例
 */
export function postRequest (data) {
    return request({
        method: `POST`,
        url: ``,
        data,
        headers: {
            gunsToken: getCookie('gunsToken'),
        },
    })
}

/**
 * 字典
 */

export function getDictData (params) {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/PhysicalAssessment/getDictData`,
        params, headers: {
            gunsToken: getCookie('gunsToken'),
        },
    });
}

/**
 * 老年人信息添加：
 */

export function oldPeopAddItem (data) {
    return request({
        method: `POST`,
        url: `${process.env.VUE_APP_API_URL}/PhysicalAssessment/oldPeopAddItem`,
        data,
        headers: {
            gunsToken: getCookie('gunsToken'),
        },

    });
}


/**
 * 老年人信息提供者
 */

export function assessmentAddItem (data) {
    return request({
        method: `POST`,
        url: `${process.env.VUE_APP_API_URL}/PhysicalAssessment/assessmentAddItem`,
        data,
        headers: {
            gunsToken: getCookie('gunsToken'),
        },
    });
}


/**
 * 获取题目
 */
export function getTitleData (params) {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/PhysicalAssessment/getTitleData`,
        params,
    });
}

/**
 * 答题
 */

export function answerQuestions (data) {
    return request({
        method: `POST`,
        url: `${process.env.VUE_APP_API_URL}/PhysicalAssessment/answerQuestions`,
        data,
        headers: {
            gunsToken: getCookie('gunsToken'),
        },
    });
}



/**
 * 获取题目
 */
export function moduleScore (params) {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/PhysicalAssessment/moduleScore`,
        params, headers: {
            gunsToken: getCookie('gunsToken'),
        },
    });
}


/**
 * 图片上传
 */

export function upload (data) {
    return request({
        method: `post`,
        url: `${process.env.VUE_APP_API_URL}/PhysicalAssessment/upload`,
        data,
        headers: {
            gunsToken: getCookie('gunsToken'),
        },
    });
}

/**
 * 图片删除
 */

export function deleteFile (data) {
    return request({
        method: `post`,
        url: `${process.env.VUE_APP_API_URL}/PhysicalAssessment/delete`,
        data,
        headers: {
            gunsToken: getCookie('gunsToken'),
        },
    });
}

/**
 * 获取题目
 */
export function answerQuestionsHisList (params) {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/PhysicalAssessment/answerQuestionsHisList`,
        params, headers: {
            gunsToken: getCookie('gunsToken'),
        },
    });
}


/**
 * 评估报告数据
 */
export function evaluationEeport (params) {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/PhysicalAssessment/evaluationEeport`,
        params, 
        headers: {
            gunsToken: getCookie('gunsToken'),
        },
    });
}

/**
 * 评估员统计页面
 */
export function assessorCount () {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/PhysicalAssessment/assessorCount`,
        headers: {
            gunsToken: getCookie('gunsToken'),
        },
    });
}


/**
 * 评估员信息,未评估老人，已评估老人
 */
export function getAssessorData (params) {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/PhysicalAssessment/getAssessorData`,
        params,
        headers: {
            gunsToken: getCookie('gunsToken'),
        },
    });
}

/**
 * 评估员信息
 */
export function getAssessorInfo (params) {
    return request({
        method: `GET`,
        url: `${process.env.VUE_APP_API_URL}/PhysicalAssessment/getAssessorInfo`,
        params,
        headers: {
            gunsToken: getCookie('gunsToken'),
        },
    });
}





