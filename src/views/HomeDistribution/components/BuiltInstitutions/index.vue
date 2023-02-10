<template>
  <div class="older-content">
    <norm-layout text="居家养老服务载体"></norm-layout>
    <div :class="['left_content',`list${classCode}`]">
      <span class="kaling"></span>
      <template v-for="item in ServiceData">
      <dl class='service_box one' :key="item.title" v-if="item.title !== '养老院' || (breadCrumbCodes && breadCrumbCodes.length === 1) ">
        <dt v-if="item.icon">
          <img :src="require(`@/views/OlderDistribution/assets/icons/${item.icon}.png`)" class="icon" alt="norm-icon"/>
        </dt>
        <dd>
          <router-link :to='item.path || ""' :target=" item.flag ? '_parent' :'_blank'">
            <p class="service_item">{{ item.title }}</p>
            <p class="service_val" v-if="item.number >= 0">
              <span v-if="!item.animation">{{ item.number || 0 }}</span>
              <b>{{ item.text || "" }}</b>
            </p>
          </router-link>
        </dd>
      </dl>
      </template>
    </div>
    <div class="right_content">
      <dl class="service_box one">
        <dt>
          <img
            :src="require(`@/views/OlderDistribution/assets/icons/all.png`)"
            class="icon"
            alt="norm-icon"
          />
        </dt>
        <dd>
          <div class="content">
            <p class="service_item">居家养老服务载体</p>
            <p class="service_val">
              <span>{{ (activeBuilt.canteenCount1+ activeBuilt.canteenCount3) || 0 }}</span>
              <b>个</b>
            </p>
            </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import MessageItem from '@/views/OlderDistribution/components/MessageItem/index'

import { mapGetters } from 'vuex'
export default {
  name: 'BuiltInstitutions',
  props: {
    activeBuilt: {
      type: Object,
      default: () => {}
    }
  },

  data(){
    return {
      canteenlevelOne: '街级',
      canteenlevelTwo: '社区级',
      canteenlevelThree: '服务站',
    }
  },

  computed: {
    ...mapGetters(['breadCrumbCodes']),
    classCode () {
      if (this.breadCrumbCodes && this.breadCrumbCodes.length === 1) {
        return 4
      } else {
        return 3
      }
    },
    ServiceData () {
      return [
        {
          title: '街级',
          number: this.activeBuilt.canteenCount1,
          text: '个',
          icon: 'street',
          path: {
            name: 'ServiceCarrier',
            query: {
              code: this.breadCrumbCodes,
              // canteenlevel: JSON.stringify(['街级']),
              canteenlevel: this.canteenlevelOne,
              key: '3'
            }
          }
        },
        {
          title: '社区级',
          number: this.activeBuilt.canteenCount3,
          text: '个',
          icon: 'community',
          path: {
            name: 'ServiceCarrier',
            query: {
              code: this.breadCrumbCodes,
              // canteenlevel: JSON.stringify(['社区级']),
              canteenlevel: this.canteenlevelTwo,
              key: '3'
            }
          }
        },
        {
          title: '服务站',
          number: this.activeBuilt.canteenCount2,
          text: '个',
          icon: 'services',
          path: {
            name: 'ServiceCarrier',
            query: {
              code: this.breadCrumbCodes,
              // canteenlevel: JSON.stringify(['服务站']),
              canteenlevel: this.canteenlevelThree,
              key: '3'
            }
          }
        },
        {
          title: '养老院',
          number: this.activeBuilt.nursingHomeTotal,
          text: '个',
          icon: 'raise',
          path: {
            name: 'NursingHome',
            query: {}
          }
        }
      ]
    }
  },
  components: {
    NormLayout,
    MessageItem
  }
}
</script>

<style lang="less" scoped>
.older-content {
  height: 4rem;
  .left_content {
    width: 43%;
    height: 70%;
    display: inline-block;
  }
  .right_content {
    width: 46%;
    height: 70%;
    float: right;
    padding-top: 0.55rem;
    dt {
      margin-left: 0 !important;
    }
  }
  .left_content::after {
    content: "";
    display: inline-block;
    width: 0.65rem;
    height: 0.55rem;
    position: relative;
    left: 2.2rem;
    border-top: 1px solid #68f4ff;
    border-right: 1px solid #68f4ff;
    transform: rotate(47deg); /*旋转角度*/
    -webkit-transform: rotate(47deg);
  }
  .service_box {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    padding-left: 10%;
    min-height: 0.6rem;
    position: relative;
    &.three {
      width: 33%;
      justify-content: center;
      padding-left: 0;
    }
    &.one {
      width: 100%;
      padding-left: 0;
      display: flex;
      dt {
        margin-left: 0.5rem;
      }
      a,
      .conten{
        display: flex;
        align-items: center;
      }
      p {
        text-align: left;
        display: inline-block;
        padding-left: 0.1rem;
      }
      dd {
        padding-bottom: 0;
        width: 2rem;
        height: 0.54rem;
        display: flex;
        justify-content: flex-start;
      }
    }
    dt {
      width: 0.54rem;
      height: 0.54rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: left;
      img {
        height: 100%;
      }
    }
    dd {
      height: 0.47em;
      margin-left: 12px;
      padding-bottom: 10px;
      color: #ff8400;
      justify-content: center;
      width: 100%;
      p {
        font-size: 0.24rem;
        padding-bottom: 0.05rem;
        text-align: center;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: #ff8400;
        span {
          font-size: 0.24rem;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          color: #ff8400;
        }
        b {
          font-size: 0.14rem;
          color: #28e1fe;
          font-weight: 100;
        }
      }
      .service_item {
        font-size: 0.17rem;
        color: #ffffff;
        text-align: center;
        font-family: MicrosoftYaHei;
        font-weight: 200;
      }
    }
  }
  .list3{
    &::after {
      bottom: 2.5rem;
    }
    .service_box{margin-bottom: 0.4rem;}
  }
  .list4{
    &::after {
      bottom: 2.8rem;
    }
    .service_box{margin-bottom: 0.2rem;}
  }
}
</style>
