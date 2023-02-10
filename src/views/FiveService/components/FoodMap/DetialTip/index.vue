<template>
  <div class="detial_content">
    <div class="title">
      {{ detailObject.name }}({{ detailObject.canteenlevel }})
    </div>
    <div class="tip_main">
      <!-- <p class="tip_item">
        <span class="item_left">牌匾号：</span>
        <span class="item_right">{{detailObject.ztCode}}</span>
      </p> -->
      <p class="tip_item">
        <span class="item_left">服务商：</span>
        <span class="item_right">{{ detailObject.companyname }}</span>
      </p>
      <p class="tip_item">
        <span class="item_left">建设规模：</span>
        <span class="item_right">{{ detailObject.constructionScale }}</span>
      </p>
      <p class="tip_item">
        <span class="item_left">详细地址：</span>
        <span class="item_right">{{ detailObject.address }}</span>
      </p>
      <p class="tip_item">
        <span class="item_left">服务人员情况：</span>
        <span class="item_right">{{ detailObject.servicePeople }}</span>
      </p>
      <p class="tip_item">
        <span class="item_left">服务辐射范围：</span>
        <span class="item_right">{{ detailObject.serviceRadiationRange }}</span>
      </p>
      <div class="video_player" v-if="videoOptions.length > 0 && Show">
        <object
          type="application/x-vlc-plugin"
          id="vlc"
          events="True"
          width="100%"
          height="150px"
          pluginspage="http://www.videolan.org"
          codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.2.2/npapi-vlc-2.2.2.tar.xz"
        >
          <param
            name="mrl"
            :value=" videoOptions.length > 0 ? videoOptions[1] : ''"
          />
          <param name="volume" value="50" />
          <param name="autoplay" value="true" />
          <param name="loop" value="false" />
          <param name="fullscreen" value="true" />
        </object>
      </div>
      <div class="btn">
        <el-button type="primary" v-if="videoOptions.length > 0" @click="handleDetial">查看更多</el-button>
      </div>
    </div>
    <el-dialog
      title="视频监控"
      :visible.sync="dialogVisible"
      :modal="false"
      :destroy-on-close="true"
      center
    >
      <div class="tip_video">
        <object
          type="application/x-vlc-plugin"
          id="vlcs"
          class="video_content"
          v-for="(item, index) in videoOptions"
          :key="index"
          events="True"
          width="100%"
          height="150px"
          pluginspage="http://www.videolan.org"
          codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.2.2/npapi-vlc-2.2.2.tar.xz"
        >
          <param
            name="mrl"
            :value="item"
          />
          <param name="volume" value="50" />
          <param name="autoplay" value="true" />
          <param name="loop" value="false" />
          <param name="fullscreen" value="true" />
        </object>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
      dialogVisible: false,
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
      videoOptions: [

      ],
      videoShow: true
    }
  },
  computed: {
    Show () {
      return !this.dialogVisible
    }
  },
  created () {
    let params = {
      merchantName: this.detailObject.name
    }
    api.getVideoMonitorRtmpInfo(params).then((res) => {
      const { videoMonitorRtmpMap } = res.data
      this.videoOptions = videoMonitorRtmpMap
    })
  },
  methods: {
    handleDetial () {
      this.dialogVisible = true
      this.videoShow = false
    },
    handleClose (done) {
      // this.$emit('update:dialogVisible', false)
    }
  },
  components: {
    videoPlayer
  }
}
</script>

<style lang="less" scoped>
.detial_content {
  width: 3rem;
  min-height: 3.3rem;
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
      width: 42%;
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
  .btn {
    width: 100%;
    text-align: center;
    .el-button--primary {
      width: 2rem;
      margin-top: 0.2rem;
      background-size: 100% 100%;
      color: #ffffff;
    }
  }
  /deep/ .el-dialog {
    width: 12rem;
    height: 5.5rem;
    margin-top: 20vh !important;
    background: #243e63;
    z-index: 99999;
  }
  /deep/ .el-dialog__header {
    height: 0.53rem;
    background-color: #80b5ff;
    display: flex;
    font-family: MicrosoftYaHeiUI-Bold;
  }
  /deep/ .el-dialog__title {
    color: #ffffff;
    font-size: 0.18rem;
    line-height: 0.53rem;
    font-weight: bold;
    padding-left: 0.3rem;
  }
  /deep/ .el-dialog__headerbtn {
    font-size: 0.33rem;
    top: 9px;
  }
  /deep/ .el-dialog__headerbtn .el-dialog__close {
    color: #ffffff;
  }
  /deep/ .detial_content {
    padding: 0.53rem 3%;
  }
}
.video_player {
  width: 100%;
  height: 2rem;
  margin-top: 0.3rem;
  z-index: 99;
  .video-js {
    width: 100% !important;
    height: 100%;
  }
}
#myPlayer {
  position: relative;
  z-index: 999;
}
.tip_video {
  width: 100%;
  height: 88%;
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  z-index: 99999;
  .video_content {
    height: 2rem;
    width: 2.6rem;
    border: 1px solid #fff;
    margin-right: 0.1rem;
  }
}
.videoPlayer {
  width: 100%;
  height: 100%;
}
</style>
