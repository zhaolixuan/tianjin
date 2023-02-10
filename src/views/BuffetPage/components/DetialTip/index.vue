<template>
  <div class="detial_content">
    <div class="title">{{detailObject.name}}({{detailObject.canteenlevel}})</div>
    <div class="tip_main">
      <p class="tip_item">
        <span class="item_left">牌匾号：</span>
        <span class="item_right">{{detailObject.ztCode}}</span>
      </p>
      <p class="tip_item">
        <span class="item_left">服务商：</span>
        <span class="item_right">{{detailObject.companyname}}</span>
      </p>
      <p class="tip_item">
        <span class="item_left">供餐区域：</span>
        <span class="item_right">{{detailObject.serviceArea}}</span>
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
      <div class="tip_video">
        <div class="video_content" v-for="(item,index) in videoOptions" :key="index">
          <video-player
            ref="videoPlayer"
            :options="item"
            class="vjs-custom-skin videoPlayer"
            :playsinline="true"
          ></video-player>
        </div>
      </div>
    </div>
    <div class="tip_footer"></div>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-flash'
import SWF_URL from 'videojs-swf/dist/video-js.swf'
import api from '@/api/api'
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
      videoUrl: '',
      videoOptions: []
    }
  },
  created () {
    let params = {
      merchantName: this.detailObject.name
    }
    api.getVideoMonitorRtmpInfo(params).then(res => {
      res.data.videoMonitorRtmpMap.map(item => {
        let arrs = {
          live: true,
          autoplay: true,
          fluid: true,
          notSupportedMessage: '暂时无法播放',
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true // 全屏按钮
          },
          techOrder: ['flash'],
          flash: {
            hls: { withCredentials: false },
            swf: SWF_URL // 引入静态文件swf
          },
          sources: [{ // 流配置，数组形式，会根据兼容顺序自动切换
            type: 'rtmp/mp4', // 视频格式
            src: item // 视频路径
          }]
        }
        this.videoOptions.push(arrs)
      })
      // this.videoOptions.sources[0].src = 'rtmp://58.200.131.2:1935/livetv/cctv1'
    })
  },
  components: {
    videoPlayer
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
.tip_video {
  width: 100%;
  display: flex/9;
  flex-direction: column/9;
  .video_content {
    height: .8rem;
    width: 1.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.15rem;
    margin: 0 auto;
  }
}
.videoPlayer {
  width: 100%;
  height: 100%;
}
</style>
