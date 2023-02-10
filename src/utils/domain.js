import { delCookie } from "@/utils/storage";

export function logOut () {
    window.localStorage.clear();
    delCookie("gunsToken")
    const host = window.location.host
    const protocol = window.location.protocol
    document.location.replace(`${protocol}//${host}${process.env.VUE_APP_BASE_URL}/login`)
}
