<template>
  <div class="menu_content">
    <div
      :class="['menu_btn', hoverBtn ? 'hover' : '']"
      @click="handleShowMenu"
      @mouseenter="handleEnterBtn"
      @mouseleave="handleLeaveBtn"
    >
      <div class="btn_inside"></div>
      <div class="btn_bg"></div>
    </div>
    <div :class="['menu_wrapper', showMenu ? 'show' : '']">
      <div class="circle">
        <div
          v-for="(item, index) in menuDataConcat"
          :key="'menu_' + index"
          :class="[
            'menu_cell_box',
            `position${menuType}-${positionList[index]}`,
            hoverKey == index ? 'menu_cell_hover' : '',
            positionList[index] == centerKey ? 'center_cell' : ''
          ]"
          @mouseenter="handleEnterMenu(index)"
          @mouseleave="handleLeaveMenu"
          @click="handleCheckMenu(index, item.href)"
        >
          <div class="menu_cell"></div>
          <!-- <i :class="item.class"></i> -->
          <img
            :src="
              require(`@/views/OlderDistribution/components/Menu/img/${
                positionList[index] == centerKey ? item.activeIcon : item.icon
              }.png`)
            "
            class="icon"
            alt="norm-icon"
          />
          <span class="menu_title">{{ item.alias || item.title }}</span>
          <div class="child_con">
            <ul class="child_box" v-if="item.children">
              <div
                v-for="(child, cindex) in item.children"
                :key="'child_' + cindex"
              >
                <li
                  v-if="
                    (child.isShowId.indexOf(roleid) !== -1 ||
                      (roleid !== '28' && roleid !== '29' ? true : false)) &&
                      (child.heXi.indexOf('河西区') !== -1 ||
                        child.heXi.indexOf(userName) !== -1)
                  "
                >
                  <!-- 路由跳转组件 -->
                  <MenuLink
                    :menu="child"
                    @mouseenter="handleShowTips"
                    @mouseleave="handleHideTips"
                    @click="handleChangeMenu(child.title)"
                  ></MenuLink>
                </li>
              </div>
            </ul>
            <div class="right_bg"></div>
          </div>
        </div>
        <div
          v-for="num in menuType"
          :key="'point_' + num"
          :class="['circle_point', `point${menuType}-${num}`]"
        >
          <div
            :class="[num == centerKey ? 'point_center' : 'point_inside']"
          ></div>
        </div>
      </div>
      <div class="back_btn" @click="handleShowMenu">
        <i class="iconfont iconback"></i>
      </div>
      <transition name="fade">
        <div v-if="showTips" class="menu_tips">
          {{ menuTips }}
          <div></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import MenuLink from "./components/MenuLink";
import iframeClickListener from "./components/iframeClickListener.js";
import { getCookie } from "@/api/cookie";
import { mapGetters } from "vuex";
import api from "@/api/api";
import md5 from "js-md5";
import userNumber from "../../../../../static/json/userNumber";

export default {
  data() {
    return {
      showMenu: false,
      hoverBtn: false,
      hoverKey: null,
      positionList: [8, 0, 1, 2, 3, 4, 5, 6, 7], // 位置顺序数组（从0开始）
      showTips: false,
      menuTips: "",
      roleid: "",
      data: ""
    };
  },
  components: {
    MenuLink
  },
  created() {
    this.roleid = window.localStorage.getItem("roleid");
  },
  computed: {
    ...mapGetters(["useName", "activeMenu"]),
    getMenu() {
      return this.$store.state.activeMenu;
    },
    userName() {
      return this.useName || "河西";
    },
    menuData() {
      let gunsToken = getCookie("gunsToken");
      let roleid = window.localStorage.getItem("roleid");
      return this.$store.state.menuData.filter(item => {
        let isShow = false;
        if (roleid === "28" || roleid === "29") {
          if (item.isShowId.indexOf(roleid) !== -1 && gunsToken) {
            isShow = true;
          }
        } else {
          if (gunsToken) {
            isShow = true;
          }
        }
        return isShow;
      });
    },
    // 菜单类型，控制一级菜单展示的个数：3,5
    menuType() {
      if (this.menuData) {
        return this.menuData.length >= 5 ? 5 : 3;
      }
    },
    // 中心点的位置
    centerKey() {
      if (this.menuData) {
        let key = this.menuData.length < 5 ? 2 : 3;
        return key;
      }
    },
    // 菜单数据处理，前面拼上尾部的两个元素，后面拼上剩余元素
    menuDataConcat() {
      let length = this.menuData.length;
      let roleid = window.localStorage.getItem("roleid");
      let num = (roleid === "28" || roleid === "29") ? 3 : 2
      return length
        ? this.menuData
            .slice(length - num)
            .concat(this.menuData)
            .concat(this.menuData.slice(0, length - num))
        : [];
    }
  },
  mounted() {
    let posLength = 1;
    if (this.menuData.length >= 5) {
      posLength = 9;
    } else if (this.menuData.length >= 3) {
      posLength = 9;
    }
    if (
      posLength === this.positionList.length &&
      this.$store.state.positionList
    ) {
      this.positionList = this.$store.state.positionList;
    } else {
      this.initPositionList();
    }
    if (this.newPositionList) {
      this.positionList = this.newPositionList;
    }
    // 菜单目录定位右侧菜单
    if (this.activeMenu) {
      let data = this.menuDataConcat.findIndex(
        v => v.label === this.activeMenu || v.labelTwo === this.activeMenu
      );
      this.getNewPositionByCenterKey(data, this.positionList, this.centerKey);
    }
    this.closeMenuByOutClick();
    this.closeMenuByClickIframe();
  },
  methods: {
    handleChangeMenu(menu) {
      if (menu === "居家养老服务卡") {
        let information = userNumber.filter(user => user.name === this.useName);
        let { value } = information[0] || {};
        api
          .getloginUser({
            name: value,
            value: "FFA43B5C35BCA889"
          })
          .then(result => {
            if (result) {
              window.open(result);
            }
          })
          .error(e => {
            console.log(e);
          });
      }
      if (menu === "养老互助") {
        // window.open('https://test.dosion.cc/jiashicang/?token=view')
        api
          .getSphoneLogin({
            userName: "jukang",
            password: md5("123456"),
            "tenant.loginName": "tianjin"
          })
          .then(res => {
            if (res.token) {
              window.open(
                "https://www.youaizhilin.com/jiashicang/?token=" + res.token
              );
            }
          });
      }
      this.handleShowMenu();
      iframeClickListener.removeListener();
      this.closeMenuByClickIframe();
      // 暴露给上级组件的回调方法，在改变菜单时触发，参数为当前选中菜单的数据
      this.$emit("changeMenu", menu);
    },
    handleShowTips(menu) {
      if (menu.tips) {
        this.showTips = true;
        this.menuTips = menu.tips;
      }
    },
    handleHideTips() {
      this.showTips = false;
    },
    handleEnterBtn() {
      this.hoverBtn = true;
    },
    handleLeaveBtn() {
      this.hoverBtn = false;
    },
    handleShowMenu() {
      this.showMenu = !this.showMenu;
    },
    handleEnterMenu(index) {
      this.hoverKey = index;
    },
    handleLeaveMenu() {
      this.hoverKey = null;
    },
    handleCheckMenu(index, href) {
      this.getNewPositionByCenterKey(index, this.positionList, this.centerKey);
      if (this.activeMenu) {
        this.$store.commit("setActiveMenu", "");
      }
      // this.$router.push({name: href})
    },
    // 菜单位置数组初始化
    initPositionList() {
      let length = this.menuData.length;
      let positionList = [];
      if (length >= 5) {
        positionList = [8, 0, 1, 2, 3, 4, 5, 6, 7]; // （显示的位置为1~5，0、8为顶部隐藏位置，6、7为底部隐藏位置）
      } else if (length >= 3) {
        positionList = [0, 1, 2, 3, 7]; // （显示的位置为1~3，0为顶部隐藏位置，7为底部隐藏位置）
      } else {
        positionList = [2];
      }
      let copyTime = this.menuDataConcat.length - positionList.length;
      // console.log(this.menuData, this.menuDataConcat, '初始数据')
      for (let j = copyTime; j > 0; j--) {
        positionList.push(7);
      }
      // console.log(positionList, '初始数据')
      this.positionList = positionList;
      // this.$store.commit('setPositionList', this.positionList)
    },
    // 点击空白区域关闭菜单
    closeMenuByOutClick() {
      let _this = this;
      $("#app").on("click", e => {
        let target = e.target;
        let clickOutSide =
          !$(target).hasClass("btn_inside") &&
          !$(target).hasClass("menu_wrapper") &&
          $(target).parents(".menu_wrapper").length == 0;
        if (clickOutSide) {
          _this.showMenu = false;
        }
      });
    },
    // 点击iframe内部区域关闭菜单
    closeMenuByClickIframe() {
      let _this = this;
      iframeClickListener.click(function() {
        _this.showMenu = false;
      });
    },
    // 根据选中菜单项的index，重新排序原菜单的位置，将选中项放在中间，其余项按原顺序排列
    getNewPositionByCenterKey(index, positionList, centerKey) {
      let selectIndex =
        index < positionList.length ? index : index - positionList.length;
      let longList = positionList.concat(positionList);
      let centerIndex = positionList.indexOf(centerKey);
      let startIndex =
        centerIndex - selectIndex > 0
          ? centerIndex - selectIndex
          : centerIndex - selectIndex + positionList.length;
      let finialList = longList.splice(startIndex, positionList.length);
      this.positionList = finialList;
      this.newPositionList = finialList;
      this.$store.commit("setPositionList", this.positionList);
    }
  },
  watch: {
    "$store.state.positionList": {
      handler(val, oldval) {
        this.positionList = val;
      }
    }
  },
  destroyed() {
    iframeClickListener.removeListener();
  }
};
</script>

<style scoped>
.menu_content {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
}
.menu_btn {
  width: 0.48rem;
  height: 1.44rem;
  position: fixed;
  top: 49%;
  right: 0;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1001;
}
.menu_btn .btn_inside {
  width: 0.48rem;
  height: 1.44rem;
  background: url("./img/menu_btn.png") 100% 100% no-repeat;
  background-size: contain;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
.menu_btn .btn_bg {
  width: 1.44rem;
  height: 1.5rem;
  border-radius: 100%;
  background: rgba(44, 191, 250, 0.5);
  opacity: 0.5;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%) scale(1);
  transition: all 0.5s ease-in-out;
  z-index: 1;
}
.menu_btn.hover .btn_bg {
  transform: translateY(-50%) scale(1.3);
  opacity: 0;
}
.menu_wrapper {
  width: 5.5rem;
  height: 100%;
  position: fixed;
  top: 0%;
  right: -5.8rem;
  background: rgba(3, 22, 39, 0.9);
  z-index: 1000;
  transition: all 1s ease-in-out;
}
.menu_wrapper.show {
  right: 0;
}
.menu_wrapper .circle {
  width: 7rem;
  height: 10rem;
  border-radius: 100%;
  border: 1px solid #00b1ec;
  position: absolute;
  top: 50%;
  right: -5.6rem;
  transform: translateY(-50%);
}
.circle_point {
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 100%;
  background: rgba(3, 22, 39, 0.9);
  position: absolute;
}
.circle_point .point_inside {
  width: 0.06rem;
  height: 0.06rem;
  border-radius: 100%;
  background: #00b1ec;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.circle_point .point_center {
  width: 0;
  height: 0;
  border: 5px solid;
  border-color: transparent #43dded transparent transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-70%, -50%);
}
.point3-1 {
  top: 17%;
  left: 9%;
}
.point3-2 {
  top: 48%;
  left: -2%;
}
.point3-3 {
  top: 80%;
  left: 9%;
}
.point5-1 {
  top: 17%;
  left: 9%;
}
.point5-2 {
  top: 32%;
  left: 1.2%;
}
.point5-3 {
  top: 48%;
  left: -2%;
}
.point5-4 {
  top: 65%;
  left: 1%;
}
.point5-5 {
  top: 80%;
  left: 9%;
}
.menu_wrapper .circle .menu_cell_box {
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -0.45rem;
  cursor: pointer;
  transition: all 1.2s ease-in-out;
  transform: scale(0.82);
}
.menu_wrapper .circle .menu_cell_box.center_cell {
  transform: scale(1);
  /* left: -14%; */
}
.menu_cell_box .icon {
  /* font-size: .3rem;
  line-height: .3rem;
  text-align: center; */
  width: 0.6rem;
  height: 0.6rem;
  color: #00c0ff;
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
}
.menu_wrapper .circle .menu_cell_box .menu_cell {
  width: 0.9rem;
  height: 0.9rem;
}
/* menu_cell_hover 控制hover的一级菜单动画及样式 */
/* .menu_wrapper .circle .menu_cell_hover .menu_cell{
  animation: rotateCircle 3s linear infinite;
  background: url('./img/menu_checked.png') 100% 100% no-repeat;
  background-size: cover;
}
.menu_wrapper .circle .center_cell .menu_cell{
  animation: rotateCircle 3s linear infinite;
  background: url('./img/menu_checked.png') 100% 100% no-repeat;
  background-size: cover;
} */
@keyframes rotateCircle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
.menu_cell_box .menu_title {
  font-size: 0.14rem;
  color: #00c0ff;
  position: absolute;
  min-width: 0.7rem;
  text-align: center;
}
.menu_cell_hover .menu_title,
.menu_cell_hover .iconfont {
  color: #43dded;
}
.center_cell .menu_title,
.center_cell .iconfont {
  color: #43dded;
}
.show .circle .position5-0 {
  top: -10%;
  left: 16%;
}
.show .circle .position5-1 {
  top: 15%;
  left: -2%;
}
/* .position5-1 .icon{
  width: .9rem;
  height: .9rem;
} */
.show .circle .position5-2 {
  top: 32%;
  left: -12%;
}
.show .circle .position5-3 {
  top: 50%;
  left: -15%;
}
.show .circle .position5-4 {
  top: 67%;
  left: -11%;
}
.show .circle .position5-5 {
  top: 84%;
  left: -2%;
}
.show .circle .position5-6 {
  top: 106%;
  left: 16%;
}
.show .circle .position5-7,
.show .circle .position3-7 {
  top: 115%;
  left: 35%;
}
.show .circle .position5-8,
.show .circle .position3-0 {
  top: -20%;
  left: 35%;
}
.show .circle .position3-1 {
  top: 10%;
  left: -5%;
}
.show .circle .position3-2 {
  top: 50%;
  left: -20%;
}
.show .circle .position3-3 {
  top: 90%;
  left: -5%;
}

.child_con {
  width: 2.9rem;
  position: absolute;
  left: -1rem;
  top: 50%;
  color: #43dded;
  transform: translateY(-50%);
  opacity: 0;
  z-index: -100;
  text-align: right;
}
.child_box {
  width: 86%;
}
.child_box li {
  line-height: 0.36rem;
  font-size: 0.16rem;
  display: none;
}
/* center_cell 控制展示二级菜单动画及样式 */
.center_cell .child_con {
  z-index: 1001;
  transition: all 1s ease-in-out 0.6s;
  left: 0.5rem;
}
.center_cell .child_con {
  left: -2.8rem;
  opacity: 1;
  display: flex;
}
.show .center_cell .child_con .right_bg {
  width: 10%;
  height: 100%;
  position: absolute;
  right: 0;
  background-image: url("~@/views/OlderDistribution/components/Menu/img/right_bg.png");
  background-repeat: no-repeat;
  background-size: contain;
}
.show .center_cell .child_box li {
  display: block;
}
/* 提示弹窗 */
.menu_tips {
  width: 2.5rem;
  font-size: 0.12rem;
  line-height: 0.24rem;
  color: #3fd3e3;
  background: rgba(3, 20, 39, 0.6);
  padding: 0.15rem;
  position: absolute;
  left: -3rem;
  top: 50%;
  transform: translateY(-50%);
}
.menu_tips::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  border-top: 2px solid #3fd3e3;
  border-left: 2px solid #3fd3e3;
  width: 0.12rem;
  height: 0.12rem;
}
.menu_tips::after {
  content: "";
  position: absolute;
  top: -1px;
  right: -1px;
  border-top: 2px solid #3fd3e3;
  border-right: 2px solid #3fd3e3;
  width: 0.12rem;
  height: 0.12rem;
}
.menu_tips div::before {
  content: "";
  position: absolute;
  bottom: -1px;
  left: -1px;
  border-bottom: 2px solid #3fd3e3;
  border-left: 2px solid #3fd3e3;
  width: 0.12rem;
  height: 0.12rem;
}
.menu_tips div::after {
  content: "";
  position: absolute;
  bottom: -1px;
  right: -1px;
  border-bottom: 2px solid #3fd3e3;
  border-right: 2px solid #3fd3e3;
  width: 0.12rem;
  height: 0.12rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
/* 返回按钮 */
.back_btn {
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  left: -0.3rem;
  opacity: 0;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  transition: all 1.5s ease-in-out;
}
.show .back_btn {
  left: 0.15rem;
  opacity: 1;
}
.back_btn .iconfont {
  display: block;
  font-size: 0.24rem;
  color: rgba(67, 221, 237, 0.5);
  transform: rotate(180deg);
}
.back_btn .iconfont:hover {
  color: rgba(67, 221, 237, 1);
}
</style>
