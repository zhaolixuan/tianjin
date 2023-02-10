/**
 * 本地存储封装模块
 */
export const getItem = (name) => {
    const data = window.localStorage.getItem(name);
    try {
        return JSON.parse(data);
    } catch (err) {
        return data;
    }
};

export const setItem = (name, value) => {
    if (typeof value === "object") {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(name, value);
};

export const removeItem = (name) => {
    window.localStorage.removeItem(name);
};

export function getSessionItem(name) {
    const data = window.localStorage.getItem(name);
    try {
        return JSON.parse(data);
    } catch (err) {
        return data;
    }
}

export function setSessionItem(name, value) {
    if (typeof value === "object") {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(name, value);
}

export const removeSessionItem = (name) => {
    window.localStorage.removeItem(name);
};

// 获取指定名称的cookie值
export function getCookie(name) {
    const arr = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    );
    if (arr != null) {
        return unescape(arr[2]);
    }
    return null;
}

// 删除指定名称的cookie值
export function delCookie(name) {
    const date = new Date();
    date.setTime(date.getTime() - 10 * 24 * 3600 * 1000);
    document.cookie = name + "=a; expires=" + date.toGMTString() + "; path = /";
}

// 存储cookie值并且设置cookie过期时间
export function setCookie(name, value, time) {
    if (time && time > 0) {
        const date = new Date();
        date.setTime(date.getTime() + time * 24 * 3600 * 1000);
        document.cookie =
            name +
            "=" +
            escape(value) +
            "; expires=" +
            date.toGMTString() +
            "; path = /";
    } else {
        document.cookie = name + "=" + escape(value) + "; path = /";
    }
}