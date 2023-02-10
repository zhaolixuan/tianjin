<!--
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑     永不宕机     永无BUG
 * 
 * @Author: ZhangFengYuan
 * @Date: 2022-12-09 10:16:26
 * @LastEditTime: 2022-12-09 16:52:47
 * @LastEditors: ZhangFengYuan
 * @Description: 
 * @FilePath: \tianjin\src\views\YanglaoshilaohuaService\components\OlderMap\DetialTip\parkDetails copy.vue
 * 
 -->

 <template>
  <div>
    <div class="detial_content" v-if="detailsVisible">
      <div class="title">适老化改造公园详情</div>
      <div class="tip_main">
        <div class="btn">
          <el-button type="primary" @click="handleDetial">查看</el-button>
        </div>
      </div>
    </div>
    <div class="detial-el-dialog">
      <el-dialog
        :title="'适老化改造详情'"
        :visible.sync="dialogVisible"
        :modal="false"
        :destroy-on-close="true"
        center
      >
        <vue-scroll :ops="ops">
          <div class="item">
            <li class="detial_item">
              <div class="item_contnet">
                <span class="item_label">公园名称：</span>
                <span class="item_value">{{ serviceData.parkName }}</span>
              </div>
              <div class="item_contnet">
                <span class="item_label">绿化面积(万m2)：</span>
                <span class="item_value">{{ serviceData.afforestedArea }}</span>
              </div>
            </li>
            <li class="detial_item">
              <div class="item_contnet">
                <span class="item_label">所在街道：</span>
                <span class="item_value">{{ serviceData.streetName }}</span>
              </div>
              <div class="item_contnet">
                <span class="item_label">所在社区：</span>
                <span class="item_value">{{ serviceData.communityName }}</span>
              </div>
            </li>

            <li class="detial_item">
              <div class="item_contnet">
                <span class="item_label">具体位置：</span>
                <span class="item_value-phone">{{
                  serviceData.parkAddress
                }}</span>
              </div>
            </li>
            <!-- 
            <li class="detial_item">
              <div class="item_contnet">
                <span class="item_label">改造内容：</span>
                <span class="item_value-phone">{{
                  ''
                }}</span>
              </div>
            </li>

            <li class="detial_item">
              <div class="item_contnet">
                <span class="item_label">改造总价：</span>
                <span class="item_value-phone">{{
                '' + "元"
                }}</span>
              </div>
            </li>

            <li class="detial_item">
              <div class="item_contnet">
                <span class="item_label">改造清单：</span>
                <span class="item_contnet_list">改造项目 </span>
                <span class="item_contnet_list">数量</span>
                <span class="item_contnet_list">单价</span>
              </div>
            </li> -->

            <!-- <li class="detial_item" v-for="item in imgeData">
              <div class="item_contnet">
                <span class="item_label"></span>
                <span class="item_contnet_list">{{ item.projectName||'' }}</span>
                <span class="item_contnet_list">{{
                  item.num + item.unit
                }}</span>
                <span class="item_contnet_list">{{ item.unitPrice ||''}}</span>
              </div>
            </li> -->

            <li class="detial_item">
              <div class="item_contnet">
                <span class="item_label"></span>
                <span class="item_value-project">改造前照片 </span>
                <span class="item_value-project">改造后照片</span>
              </div>
            </li>

            <li class="detial_item" v-for="item in imgeData">
              <div class="item_contnet">
                <span class="item_label-list">{{
                  item.projectName || ""
                }}</span>
                <div class="item_value-list">
                  <el-image
                    :src="item.photoBeforeJd"
                    :preview-src-list="beforeList"
                    class="item_value-img"
                  >
                  </el-image>
                  <!-- <img :src="item.photoBeforeJd" class="item_value-img" /> -->
                </div>
                <div class="item_value-list">
                  <el-image
                    :src="item.photoAfterJd"
                    :preview-src-list="afterList"
                    class="item_value-img"
                  >
                  </el-image>
                  <!-- <img :src="item.photoAfterJd" class="item_value-img" /> -->
                </div>
              </div>
            </li>
          </div>
        </vue-scroll>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import videojs from "video.js";
import "videojs-contrib-hls";
import api from "@/api/api.js";
import { getAccesToken, getVideo } from "../../../apis/index";
export default {
  name: "Detail",
  props: {
    detailObject: [Object],

    street: {
      type: String,
      default: "",
    },
    community: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      dialogVisible: true,
      detailsVisible: false,
      checkList: [],
      checkData: [],
      beforeList: [],
      afterList: [],
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false,
        },
        rail: {},
        bar: {
          background: "#eee",
        },
      },

      imgeData: [],
      serviceData: {},
    };
  },
  computed: {
    Show() {
      return !this.dialogVisible;
    },
  },
  watch: {
    // street:function(){
    //   if (this.street != '') {
    //     this.getStatisticsPList();
    //   }
    // }
  },
  created() {
    this.getStatisticsPList();
    // let params = {
    //   merchantName: this.detailObject.name
    // }
    // api.getVideoMonitorRtmpInfo(params).then(res => {
    //   const { videoMonitorRtmpMap } = res.data
    //   this.videoList = videoMonitorRtmpMap
    //   this.checkData = Object.keys(videoMonitorRtmpMap).sort()
    // })
    // getAccesToken(this.params).then(res => {
    //   this.accessToken = res.data.accessToken
    // })
  },
  methods: {
    getStatisticsPList() {
      let params = {
        streetName: this.street,
        communityName: this.community,
      };
      api
        .getParkDetail(params)
        .then((res) => {
          this.serviceData = res.data;

          res.data.reformBerFiles.forEach((it) => {
            this.beforeList.push(it.url);
          });
          res.data.reformEndFiles.forEach((it) => {
            this.afterList.push(it.url);
          });

          for (let index = 0; index < res.data.reformBerFiles.length; index++) {
            this.imgeData.push({
              photoBeforeJd: res.data.reformBerFiles[index].url,
              photoAfterJd: res.data.reformEndFiles[index].url,
            });
          }
          console.log(this.imgeData);
          // this.imgeData = res.data;
          //console.log( this.beforeList);
        })
        .catch(() => {});
    },
    handleDetial() {
      this.dialogVisible = true;
      this.videoShow = false;
      this.videoOptions = [];
      if (this.videoList) {
        this.checkList.forEach((key, index) => {
          this.videoOptions.push({
            name: key,
            url: this.videoList[key],
          });
        });
      }
      console.log(this.videoOptions);
    },
    handleClose(done) {
      // this.$emit('update:dialogVisible', false)
    },
  },
};
</script>

<style lang="less" scoped>
.detial-el-dialog {
  /deep/ .el-checkbox {
    width: 36%;
  }
  /deep/ .el-button--primary a {
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
    max-height: 70%;
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
    padding: 0.8rem 1rem;
    justify-content: space-between;
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
  /deep/ .el-dialog__footer {
    margin-top: 0.2rem;
  }
}
.detial_content {
  width: 2.9rem;
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
  .video-js {
    width: 100%;
    height: 100%;
  }
  .tip {
    font-size: 0.2rem;
    font-weight: 700;
  }
  /deep/ .el-checkbox {
    width: 36%;
  }
  /deep/ .el-button--primary a {
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
    padding: 0.8rem 1rem;
    justify-content: space-between;
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
  /deep/ .el-dialog__footer {
    margin-top: 0.2rem;
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
#vlcs {
  height: 100%;
  border: 1px solid #fff;
}
.tip_video {
  margin: 0 0.3rem 0.4rem 0.3rem;
  text-align: center;
  height: 2.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    margin-top: 0.1rem;
    font-size: 0.2rem;
    color: #ffffff;
  }
}
.video_content {
  height: 3rem;
  width: 40%;
}
.video_all {
  height: 4rem;
  width: 100%;
}
.videoPlayer {
  width: 100%;
  height: 100%;
}
.detial_item {
  margin: 0 auto;
  width: 100%;
  border-bottom: 0px;
  // border: 1px solid rgba(0, 76, 147);
  display: flex;
}
.item_contnet {
  font-size: 0.15rem;
  display: flex;
  text-align: center;
  align-items: flex-end;
  box-sizing: border-box;
}
.item_value {
  color: #27f2ff;
  display: inline-block;
  width: 3rem;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  max-width: 81%;
  border: 1px solid rgba(0, 76, 147);
}
.item_label {
  color: #ffffff;
  width: 2rem;
  line-height: 0.5rem;
  height: 0.5rem;
  text-align: center;

  border: 1px solid rgba(0, 76, 147);
}
.item_value-phone {
  color: #27f2ff;
  display: inline-block;
  width: 8.04rem;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  max-width: 81%;
  border: 1px solid rgba(0, 76, 147);
}
.item_value-project {
  color: #27f2ff;
  display: inline-block;
  width: 4.01rem;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  max-width: 81%;
  border: 1px solid rgba(0, 76, 147);
}
.item_label-list {
  color: #ffffff;
  width: 2rem;
  line-height: 2rem;
  height: 2rem;
  text-align: center;

  border: 1px solid rgba(0, 76, 147);
}
.item_value-list {
  color: #27f2ff;
  display: inline-block;
  width: 4.01rem;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  max-width: 81%;
  border: 1px solid rgba(0, 76, 147);
}
.item_value-img {
  color: #27f2ff;
  display: inline-block;
  width: 2rem;
  height: 1.7rem;
  text-align: center;
  margin-top: 0.1rem;
  border: 1px solid rgba(0, 76, 147);
  /deep/.el-image-viewer__canvas {
    height: 80%;
  }
}

.item_contnet_list {
  color: #ffffff;
  width: 2.666rem;
  line-height: 0.5rem;
  height: 0.5rem;
  text-align: center;

  border: 1px solid rgba(0, 76, 147);
}
.item {
  height: 5.5rem;
}
</style>
