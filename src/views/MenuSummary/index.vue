<template>
  <div class="page_container">
    <header class="page_header">
      <p class="ch_tit">居家养老服务管理平台</p>
      <p class="en_tit">HOME CARE SERVICE MANAGEMENT PLATFORM</p>
    </header>
    <div class="page_content">
      <div class="menu_box">
        <div :class="[activeIndex === index ? 'menu_item active' : 'menu_item']"
             v-for="(menu, index) in menuData"
             :key="index"
             @click="handleActive(index, menu.label)">
          <router-link class="menu"
                       :to="{
              path: '/' + menu.path ? menu.path : '',
              query: { flag: menu.flag }
            }">
            <img :src="
                require(`./assets/${
                  activeIndex === index ? menu.active : menu.icon
                }.png`)
              "
                 alt="" />
            <p class="menu_lab">{{ menu.label }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import userNumber from '../../../static/json/userNumber'
import menuData from '../../../static/json/menu'
import md5 from 'js-md5'
import { mapGetters } from 'vuex'

export default {
  name: 'MenuSummary',
  data() {
    return {
      menuData: [
        {
          label: '首页',
          icon: 'Home',
          active: 'home_active',
          path: 'olderDistribution',
        },
        {
          label: '三维地图可视化',
          icon: '3DMap',
          active: '3DMap_active',
          path: '#',
        },
        {
          label: '老年人基本信息',
          icon: 'oldPeople',
          active: 'oldPeople_active',
          path: 'OlderInformation',
          flag: 'true',
        },
        // {
        //   label: '居家养老服务\r载体',
        //   icon: 'carrier',
        //   active: 'carrier_active',
        //   path: 'HomeDistribution'
        // },
        {
          label: '居家养老服务\r运营统计分析',
          icon: 'analysis',
          active: 'analysis_active',
          path: 'FiveService',
          //   path: "OrderStatisticalAnalysis" // 2021年12月21日修改为这个
        },
        {
          label: '街道社区居家养老服务情况统计',
          icon: 'statistics',
          active: 'statistics_active',
          path: 'CommunityService',
        },
        {
          label: '适老化改造场景情况统计',
          icon: 'reform',
          active: 'reform',
          path: 'YanglaoshilaohuaService',
          // flag: "true"
        },
        {
          label: '家庭养老床位\r服务情况统计',
          icon: 'Homebed',
          active: 'Homebed',
          path: 'YanglaochuangweiService',
          flag: 'true',
        },
        {
          label: '健康驿站服务\r情况统计分析',
          icon: 'postCount',
          active: 'postCount_active',
          path: 'MedicalPage',
        },
        {
          label: '智能设备检测',
          icon: 'monitoring',
          active: 'monitoring_active',
          path: 'SmartdeviceStatisticsNew',
        },
        {
          label: '志愿者服务大数据统计',
          icon: 'volunteer',
          active: 'volunteer_active',
          path: 'ServiceVolunteer',
        },
        {
          label: '志愿者服务积分银行',
          icon: 'PointsBank',
          active: 'PointsBank_active',
          path: '#',
        },
        // {
        //   label: '养老补贴落实',
        //   icon: 'subsidies',
        //   active: 'subsidies_active',
        //   path: 'ProvideSubsidy'
        // },
        {
          label: '居家养老服务卡',
          icon: 'serviceCard',
          active: 'serviceCard_active',
          path: '#',
        },
        // 2021年10月26日需求 将 居家养老服务\r运营管理 隐藏
        // 2021年10月27日需求 将 居家养老服务\r运营管理 改为呼叫中心 主要更换图标和名称
        // {
        //   label: '居家养老服务\r运营管理',
        //   icon: 'operation',
        //   active: 'operation_active',
        //   path: '#'
        // },
        // 2021年10月27日需求 将 居家养老服务\r运营管理 改为呼叫中心 主要更换图标和名称
        {
          label: '呼叫中心',
          icon: 'callCenter',
          active: 'callCenter_active',
          path: '#',
        },
        // 2021年10月27日需求 将 呼叫中心 隐藏
        // {
        //   label: '呼叫中心',
        //   icon: 'callCenter',
        //   active: 'callCenter_active',
        //   path: '#'
        // },
        {
          label: '养老服务场景',
          icon: 'carrier',
          active: 'carrier_active',
          path: '#',
        },
      ],
      activeIndexs: -1,
    }
  },

  computed: {
    ...mapGetters(['useName', 'activeIndex']),
    userName() {
      return this.useName || '河西'
    },
  },

  methods: {
    handleActive(ind, menu) {
      this.$store.commit('setActiveIndex', ind)
      this.$store.commit('setActiveMenu', menu) // 根据点击得菜单名字定位右侧菜单
      let id = window.localStorage.getItem('userId')
      console.log('居家养老服务卡')
      switch (menu) {
        case '居家养老服务卡':
          let information = userNumber.filter(
            (user) => user.name === this.userName
          )
          let { value } = information[0] || {}
          api
            .getloginUser({
              name: value,
              value: 'FFA43B5C35BCA889',
            })
            .then((result) => {
              console.log(result)
              if (result) {
                // window.open('http://124.60.218.167:29838/index.html?jingdongyun=hexiAdminGL&value=FFA43B5C35BCA889')
                window.open(result)
                // window.open('http://124.71.239.138:29836/business/loginUser/jingdong')
              }
            })
          break
        // case '居家养老服务\r运营管理':
        // 2021年10月27日 将 居家养老服务\r运营管理 更改为 呼叫中心 并使用 呼叫中心 的图标之后 case 值判断如下
        case '呼叫中心': // 结构中循环的 menuData 是本组件data中的 menuData
          menuData.forEach((item, index) => {
            // 这个 menuData 是 import 进来的 menuData
            // console.log(item);
            if (item.title === '居家养老运营管理模块') {
              item.children.forEach((child, ind) => {
                if (
                  child.heXi.indexOf('河西区') !== -1 ||
                  child.heXi.indexOf(this.userName) !== -1
                ) {
                  console.log(this.userName, 'userName')
                  window.open(child.href)
                }
              })
            }
          })
          break
        case '志愿者服务积分银行':
          if (this.userName === '河西') {
            api
              .getSphoneLogin({
                userName: 'jukang',
                password: md5('123456'),
                'tenant.loginName': 'tianjin',
              })
              .then((res) => {
                if (res.token) {
                  window.open(
                    'https://www.youaizhilin.com/jiashicang/?token=' + res.token
                  )
                }
              })
          } else {
            console.log(this.userName)
            const information = userNumber.filter(
              (user) => user.name === this.userName
            )
            const { jfUser } = information[0] || {}
            window.open(
              `https://www.youaizhilin.com/#/login?userName=${jfUser}&password=123456&tenant.loginName=tianjin`
            )
          }
          break
        case '三维地图可视化':
          window.open(`http://10.0.7.220:8026/?id=${id}&type=1`)
          break
        // 2021年10月27日将之前的呼叫中心判断 注释
        // case "呼叫中心":
        //   // window.open('http://218.69.106.194:6655/Authed/CAllCenter/Index?UserToken=6b1c7c0a1ac38f375b6af973bf6b60b6')
        //   // 2021年10月26日需求将链接更改为如下
        //   window.open(
        //     "http://218.69.106.194:6655/Authed/CAllCenter/Index?UserToken=a0118b0940cf1590235597254bb3c0c9"
        //   );
        //   break;
        case '养老服务场景':
          window.open(`http://10.0.7.220:8026/?id=${id}&type=3`)
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>
.page_container {
  min-height: 100%;
  font-size: initial;
  user-select: none;
  background-image: url('~@/views/OlderDistribution/assets/img/older-page_bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  padding: 1.4rem;
  .page_header {
    width: 12rem;
    height: 1.1rem;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    .ch_tit {
      font-size: 0.6rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      background: linear-gradient(180deg, #dbfdfc 0%, #8adbe2 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .en_tit {
      font-size: 0.2rem;
      font-family: ArialMT;
      background: linear-gradient(180deg, #dbfdfc 0%, #8adbe2 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }
  .page_content {
    width: 13rem;
    height: 6rem;
    background-image: url('./assets/content_bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0 auto;
    .menu_box {
      width: 10.8rem;
      margin: 0 auto;
      padding: 0.6rem 1rem;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      .menu_item {
        width: 1.6rem;
        height: 1.6rem;
        margin-bottom: 0.2rem;
        background-image: url('./assets/menu_bg.png');
        background-repeat: no-repeat;
        background-size: contain;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.16rem;
        box-sizing: border-box;
        .menu {
          width: 1.26rem;
          height: 80%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          img {
            width: 0.4rem;
            height: 0.4rem;
            margin-bottom: 0.1rem;
          }
          .menu_lab {
            height: 30%;
            font-family: PingFangSC-Regular, PingFang SC;
            font-size: 0.18rem;
            color: #1fc4fe;
            text-align: center;
          }
        }
      }
      .active {
        background-image: url('./assets/menu_active.png');
        color: #fff !important;
      }
    }
  }
  .btn {
    background: transparent;
    border: 0;
  }
}
</style>
