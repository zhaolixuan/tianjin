<template>
  <div class="detial_content">
    <div class="title">{{detailObject.name}}</div>
    <div class="tip_main">
      <p class="tip_item">
        <span class="item_left">地址：</span>
        <span class="item_right">{{detailObject.addres}}</span>
      </p>
      <p class="tip_item">
        <span class="item_left">服务区域：</span>
        <span class="item_right">{{detailObject.community}}</span>
      </p>
      <p class="tip_item">
        <span class="item_left">主要负责人：</span>
        <span class="item_right">{{detailObject.principal}}</span>
      </p>
      <p class="tip_item">
        <span class="item_left">联系电话：</span>
        <span class="item_right">{{detailObject.principalTelno}}</span>
      </p>
      <!-- <div class="tip_video">
          <div class="video_content" v-for="(item,index) in detailObject.videoUrl"
              :key="index">
            <video
              :id="'myPlayer'+index"
              controls
              playsinline
              webkit-playsinline
              autoplay
              width="100%"
              height="100%"
              :src="item || ''"
            ></video>
            <span v-if="detailObject.videoUrl.length<0">暂无直播源</span>
          </div>
      </div> -->
    </div>
    <div class="tip_footer"></div>
  </div>
</template>

<script>
import EZUIKit from './ezuikit'
export default {
  name: 'Detail',
  props: {
    detailObject: [Object]
  },

  data () {
    return {
      serviceData: [
        {
          ztCode: this.ztCode,
          servicer: '天津华夏科技有限公司',
          company: '华夏科技有限公司',
          serviceArea: '四信里社区',
          fzr: '四信里社区',
          phone: '15555555',
          videoUrl: ''
        }
      ],
      params: {
        appKey: '26a5e5bd4794402e9859cf65f6251cf4',
        appSecret: 'd6d3c4a30ae75ea33a4749471c8484fe'
      },
      accessToken: '',
      new: {
        accessToken: this.accessToken,
        pageStart: 0,
        pageSize: 50
      },
      vie: ''
    }
  },
  mounted () {
    this.detailObject.videoUrl.map((item, index) => {
      // eslint-disable-next-line no-new
      new EZUIPlayer('myPlayer' + index)
    })
  }
}
</script>

<style lang="less" scoped>
.detial_content {
  width: 3rem;
  min-height: 4.2rem;
  box-sizing: border-box;
  padding: 0.22rem;
  background-image: url("~@/views/BuffetPage/assets/detial_tip_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  right: 1%;
  position: absolute;
  z-index: 99;
  .title {
    width: 2.7rem;
    height: 0.3rem;
    font-size: 0.15rem;
    border-bottom: 2px solid #be8a71;
    font-weight: bold;
  }
  .tip_item {
    min-height: 0.35rem;
    font-size: 0.14rem;
    display: flex;
    .item_left {
      width: 34%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .item_right {
      display: flex;
      // align-items: center;
      width: 67%;
      box-sizing: border-box;
      padding-top: 0.1rem;
    }
  }
  .tip_footer {
    text-align: center;
    button {
      width: 1.22rem;
      height: 0.26rem;
      background-image: linear-gradient(-180deg, #ff8400 0%, #ff5500 100%);
      border-radius: 13px;
      border: 0;
      font-size: 0.13rem;
      color: #ffffff;
    }
  }
}
#myPlayer {
  position: relative;
  z-index: 999;
}
.tip_video{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .video_content{
    height: 1.1rem;
    width: 1.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: .15rem;
  }
}
</style>
