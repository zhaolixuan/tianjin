<template>
  <div class="woker_box">
    <div class="worker_container">
      <!-- 加图标导航的 -->
      <dl v-for="item in ServiceData" :key="item.title" :class="lineWidth">
        <dt v-if="item.icon">
          <img
            :src="require(`@/views/OlderDistribution/assets/icons/${item.icon}.png`)"
            class="icon"
            alt="norm-icon"
          />
        </dt>

        <!-- 2021年12月31日 解决bug 45958 改动 -->
        <dd v-if="flag == 'BuiltService'">
          <p class="service_item">{{item.title || ''}}</p>
            <p class="service_val" v-if="item.number >= 0">
              <span v-if="!item.animation">{{item.number || 0}}</span>
              <countTo v-if="item.animation" :startVal="0" :endVal="item.number" :duration="3000" separator=""></countTo>
              <b>{{item.text || ''}}</b>
            </p>
        </dd>
        
        <dd v-else>
          <!-- 路由跳转 -->
          <router-link :to='item.path || ""' :target=" item.flag ? '_parent' :'_blank'">
            <p class="service_item">{{item.title || ''}}</p>
            <p class="service_val" v-if="item.number >= 0">
              <span v-if="!item.animation">{{item.number || 0}}</span>
              <countTo v-if="item.animation" :startVal="0" :endVal="item.number" :duration="3000" separator=""></countTo>
              <b>{{item.text || ''}}</b>
            </p>
          </router-link>
        </dd>

        <!-- 加分割图标的 -->
        <img
          v-show="item.line"
          class="column-split"
          src="@/views/ProvideAged/assets/column-split.png"
          alt
        />
      </dl>
    </div>
  </div>
</template>

<script>
// vue-count-to 数字滚动插件
import countTo from 'vue-count-to'
export default {
  name: 'MessageItem',
  computed: {
    lineWidth () {
      return ['service_box', this.lineNumber ? this.lineNumber : '']
    }
  },
  props: {
    ServiceData: {
      type: Array,
      default: () => []
    },
    lineNumber: {
      type: String,
      default: () => ''
    },
    flag: {
      type: String,
      default: () => {
        return '';
      }
    }
  },
  components: {
    countTo
  }
}
</script>
<style lang="less" scoped>
.woker_box{
  height: 80%;
  display: flex;
  align-items: center;
}
.worker_container {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .service_box {
    box-sizing: border-box;
    display: flex;
    width: 50%;
    padding-left: 10%;
    min-height: 0.6rem;
    margin-bottom: 0.2rem;
    position: relative;
    &.two{
      width: 50%;
      justify-content: center;
      padding-left: 0;
    }
    &.three {
      width: 33%;
      justify-content: center;
      padding-left: 0;
    }
    &.four {
      width: 25%;
      justify-content: center;
      padding-left: 0;
    }
    &.one {
      width: 100%;
      padding-left: 0;
      display: flex;
      dt{
        margin-left: .5rem;
      }
      a{
        display: flex;
        align-items: center;
      }
      p{
        text-align: left;
        display: inline-block;
        padding-left: .1rem;
      }
      dd{
        padding-bottom: 0;
        width: 2rem;
        height: .54rem;
        display: flex;
        justify-content:flex-start;
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
      width:100%;
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
    .column-split {
      position: absolute;
      right: 0;
    }
  }
}
</style>
