import Vue from "vue";
import Router from "vue-router";
import Routers from "./router";
import { MessageBox } from "element-ui";

import { getCookie, setCookie } from "@/api/cookie";
import { getUserMenus, getUserInfo } from "@/views/ProvideAged/apis/index.js";
import { getLocalItem } from "@/utils/utils.js";
import logindomain from "@/api/domain_sso";
Vue.use(Router);

const router = new Router({
  routes: [...Routers],
});
// setCookie('gunsToken', 'd8e8046b32b5d5b69fe8dcf012b6ba9d')
router.beforeEach((to, from, next) => {
  // 页面的登录验证（除了登录页）
  if (to.query.gunsToken) {
    setCookie("gunsToken", to.query.gunsToken);
  }
  const checkedYanglao =
    window.localStorage.getItem("checkedYanglao") === "true";
  let roleid = window.localStorage.getItem("roleid");
  if (to.matched.some((res) => res.path.indexOf("sso") === -1)) {
    let gunsToken = getLocalItem("gunsToken") || getCookie("gunsToken");
    let loginStatus = getCookie("loginStatus");
    if (gunsToken) {
      if (loginStatus) {
        next();
      } else {
        to.meta.title && (document.title = to.meta.title);
        getUserInfo().then((res) => {
            console.log('1');
          if (res.data) {
            roleid = res.data.roleId;
            window.localStorage.setItem("account", res.data.account);
            window.localStorage.setItem("userId", res.data.id);
            window.localStorage.setItem("roleid", roleid);
            window.localStorage.setItem("useName", res.data.name);
            setCookie("loginStatus", true);
            const subSystem = res.data.subSystem;

            if (res.data.id === 452) {
              window.location.href = "http://10.0.7.126/hexi/";
            } else {
              if (roleid === "28") {
                next("FiveService");
              } else if (roleid === "29") {
                next("ServiceCarrierAnalysis");
              } else if (subSystem == "3") {
                next("olderDistribution");
              } else {
                next("/");
              }
            }
          }
        });
      }

      if (!checkedYanglao) {
        getUserMenus({
          menuType: "yanglao",
        })
          .then((res) => {
            window.localStorage.setItem("checkedYanglao", "true");
            if (
              res.data &&
              res.data.find((item) => item.menutype === "yanglao")
            ) {
              /**
             @roleid 28 养老服务商管理用户 默认跳转五大服务页面
             @roleid 29 养老服务商用户 默认跳转服务载体运营情况统计分析页面
            */
            //   if (roleid === "28") {
            //     next("FiveService");
            //   } else if (roleid === "29") {
            //     next("ServiceCarrierAnalysis");
            //   } else {
            //     next("olderDistribution");
            //   }
            if (roleid === "28") {
                next("FiveService");
              } else if (roleid === "29") {
                next("ServiceCarrierAnalysis");
              } else if (subSystem == "3") {
                next("olderDistribution");
              } else {
                next("/");
              }
              // 养老账户跳转小云环境
              if (window.location.href === "http://192.168.0.157/#/") {
                MessageBox.confirm(
                  '因服务器迁移系统链接修改，请您访问最新地址：<a href="http://10.0.7.126/#/">http://10.0.7.126/#/</a>',
                  "确认信息",
                  {
                    showClose: false,
                    dangerouslyUseHTMLString: true,
                    showCancelButton: false,
                    closeOnClickModal: false,
                    confirmButtonText: "确定",
                  }
                ).then(() => {
                  window.location.href = "http://10.0.7.126/#/MenuSummary";
                });
              }
            } else {
              next();
            }
          })
          .catch(() => {
            next();
          });
      } else {
        next();
      }
    } else {
      window.localStorage.removeItem("checkedYanglao");
      window.localStorage.removeItem("roleid");
      // http://192.168.0.157 默认跳转 'http://10.0.7.126/#/'
      if (process.env.IS_LOGIN) {
        let url =
          document.location.href === "http://192.168.0.157/#/"
            ? "http://10.0.7.126/#/"
            : document.location.href;
        document.location.href = logindomain + "/sso/?redirectUrl=" + url;
      }
    }
    if (to.meta.title) {
      document.title = to.meta.title;
      next();
    } else {
      document.title = "天津";
      next();
    }
  } else {
    // 设置各个页面的标题
    if (to.meta.title) {
      document.title = to.meta.title;
      next();
    } else {
      next();
    }
  }
});

export default router;
