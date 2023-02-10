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
      <div class="video_player" v-if="videoOptions">
        <p class="tip">视频监控:</p>
        <el-checkbox-group v-model="checkList" size="medium">
          <el-checkbox
            v-for="(item, index) in checkData"
            :key="index"
            :label="item"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="btn">
        <el-button type="primary" @click="handleDetial">查看</el-button>
      </div>
    </div>
    <el-dialog
      :title="detailObject.name + '视频监控'"
      :visible.sync="dialogVisible"
      :modal="false"
      :destroy-on-close="true"
      center
      v-if="dialogVisible"
    >
      <div :class="[videoOptions.length > 1 ? 'video_content tip_video' : 'video_all tip_video']"
      v-for="(option, index) in videoOptions"
        :key="index">
      <object
        type="application/x-vlc-plugin"
        id="vlcs"
        events="True"
        width="100%"
        height="150px"
        pluginspage="http://www.videolan.org"
        codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.2.2/npapi-vlc-2.2.2.tar.xz"
      >
        <param name="mrl" :value="option.url" />
        <param name="volume" value="50" />
        <param name="autoplay" value="true" />
        <param name="loop" value="false" />
        <param name="fullscreen" value="true" />
      </object>
        <span>{{option.name}}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import EZUIPlayer from './ezuikit'

import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-flash'
import api from '@/api/api'
export default {
  name: 'Detail',
  props: {
    detailObject: [Object]
  },

  data () {
    return {
      dialogVisible: false,
      checkList: [],
      checkData: [],
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
      videoList: [],
      videoOptions: [],
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
    api.getVideoMonitorRtmpInfo(params).then(res => {
      const { videoMonitorRtmpMap } = res.data
      this.videoList = videoMonitorRtmpMap
      this.checkData = Object.keys(videoMonitorRtmpMap).sort()
    })
  },
  // mounted () {
  //   this.url.map((item, index) => {
  //     // eslint-disable-next-line no-new
  //     new EZUIPlayer('myPlayer' + index)
  //   })
  // },
  methods: {
    handleDetial () {
      this.dialogVisible = true
      this.videoShow = false
      this.videoOptions = []
      console.log(this.checkList)
      if (this.videoList) {
        this.checkList.forEach((key, index) => {
          this.videoOptions.push({
            name: key,
            url: this.videoList[key]
          })
        })
      }
      console.log(this.videoOptions)
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
  background-image: url('~@/views/BuffetPage/assets/detial_tip_bg.png');
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
  .tip {
    font-size: 0.2rem;
    font-weight: 700;
  }
  /deep/ .el-checkbox{
    width: 36%;
  }
  /deep/ .el-button--primary a{
    color: #ffffff !important;
  }
  /deep/ .el-checkbox-group {
    display: flex;
    flex-wrap: wrap;
  }
  /deep/ .el-checkbox {
    margin-top: 0.18rem;
  }
  /deep/ .el-checkbox__label {
    color: #fff;
    font-weight: 700;
  }
  /deep/ .el-dialog {
    width: auto;
    max-width: 67%;
    // margin-top: 20vh !important;
    background: #243e63;
    z-index: 99999;
  }
  /deep/ .el-dialog__body {
    min-width: 9.2rem;
    max-height: 7.5rem;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0.8rem;
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
  /deep/ .el-dialog__footer{
    margin-top: .2rem;

  }
}
.video_player {
  width: 100%;
  min-height: 1.2rem;
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
#vlcs{
  height: 100%;
  border: 1px solid #fff;

}
.tip_video{
  margin: 0 .3rem .4rem .3rem;
  text-align: center;
  height: 2.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  span{
    margin-top: .1rem;
    font-size: .2rem;
    color: #ffffff;
  }
}
.video_content {
  height: 2rem;
  width: 3.6rem;
}
.video_all {
  height: 4rem;
  width: 100%;
}
.videoPlayer {
  width: 100%;
  height: 100%;
}
</style>
