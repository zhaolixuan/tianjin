<template>
  <div class="details">
    <nav class="box">
      <p class="title">老人近照上传</p>
      <p class="tips">为了更客观准确评估，需要收集老人最近照片</p>
      <van-uploader :max-size="5000 * 1024"
                    :after-read="handelUpload"
                    @delete="handelRemove"
                    v-model="olderFileList"
                    @oversize="onOversize">
        <div class="uploaderBox">
          <van-icon name="plus" />
          <p>添加照片</p>
          <span>图片大小需保证在5M内</span>
        </div>
      </van-uploader>
    </nav>
    <nav class="box">
      <p class="title">信息提供者签名</p>
      <p class="tips">签名确认身份</p>
      <div class="van-uploader">
        <div class="uploaderBox"
             v-if="!resultImg.url"
             @click="popupShow = true">
          <van-icon name="edit" />
          <p>签名</p>
        </div>

        <div class="imgBox"
             v-if="resultImg.url">
          <img :src="resultImg.url"
               alt="">
          <div class="van-uploader__preview-delete"
               @click="delectImg">
            <i class="van-icon van-icon-cross van-uploader__preview-delete-icon"></i>
          </div>
        </div>
      </div>
    </nav>

    <div class="btn"
         @click="nextStep">评估员签名</div>

    <van-popup v-model="popupShow"
               round
               position="bottom"
               :style="{ height: '50%' }">

      <div class="popupBox">
        <div class="van-picker__toolbar">
          <span class="van-cancel"
                @click="popupShow = false">取消</span>
          <span class="title">签名</span>
          <span class="confirm"
                @click="onConfirm">确定</span>
        </div>
        <div class="qianming">
          <vue-esign ref="esign"
                     :width="600"
                     :height="400"
                     :lineWidth="4"
                     lineColor="#000"
                     bgColor="#fff"
                     :isCrop="false"></vue-esign>
        </div>
        <div @click="handleReset"
             class="btn">清除</div>
      </div>
    </van-popup>

  </div>
</template>

<script>
import { upload, deleteFile } from '@/api/serverStpg.js'
export default {
  data() {
    return {
      olderFileList: [],
      popupShow: false,
      resultImg: {},
      idcardNumber: '',
    }
  },
  created() {},
  mounted() {
    this.idcardNumber = this.$route.query.idcardNumber
  },
  methods: {
    handelRemove(file) {
      console.log(file)
      deleteFile({ urlName: file.urlName, filesId: file.filesId })
    },
    delectImg() {
      deleteFile({
        urlName: this.resultImg.urlName,
        filesId: this.resultImg.filesId,
      })
      this.resultImg = {}
    },
    nextStep() {
      this.$router.push({
        path: '/assessor',
        query: { idcardNumber: this.idcardNumber },
      })
    },
    handleReset() {
      this.$refs['esign'].reset() //清空画布
    },
    handelUpload(file) {
      var forms = new FormData()
      forms.append('files', file.file)
      forms.append('fileType', '0')
      forms.append('idCard', this.idcardNumber)
      upload(forms).then((res) => {
        let item = res.data[0]
        let pop = this.olderFileList.pop()
        pop.url = item.url
        pop.urlName = item.urlName
        pop.name = item.name
        this.olderFileList.push(pop)
      })
    },
    onConfirm() {
      this.$refs['esign']
        .generate()
        .then((res) => {
          let newFile = this.base64ImgtoFile(res)
          var forms = new FormData()
          forms.append('files', newFile)
          forms.append('fileType', '1')
          forms.append('idCard', this.idcardNumber)
          upload(forms).then((res) => {
            this.popupShow = false
            this.resultImg = res.data[0] // 得到了签字生成的base64图片
          })
        })
        .catch((err) => {
          console.log(err)
          //   this.$refs['esign'].reset() //清空画布
          //   this.popupShow = false
        })
      this.$refs['esign'].reset() //清空画布
    },
    // 将base64，转换成图片

    base64ImgtoFile(dataurl, filename = 'file') {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const suffix = mime.split('/')[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime,
      })
    },
    onOversize(file) {
      this.$toast('文件大小不能超过5M')
    },
  },
}
</script>

<style scoped lang="less">
.details {
  padding-bottom: 70px;
  position: relative;

  .box {
    background: #fff;
    padding: 10px 10px;
    margin-bottom: 10px;
    text-align: left;
    line-height: 1;
    .title {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #000000;
    }
    .tips {
      padding: 15px 0;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      border-bottom: 1px solid #ebeef1;
    }
    .van-uploader {
      margin-top: 20px;
    }
    .uploaderBox {
      width: 150px;
      height: 113px;
      border: 1px dashed rgba(204, 204, 204, 1);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #9f9f9f;
      .van-icon {
        font-size: 38px;
      }
      p {
        margin: 5px 0;
      }
    }
    .imgBox {
      width: 150px;
      height: 113px;
      position: relative;
      img {
        width: 100%;
      }
      .van-uploader__preview-delete {
        // position: absolute;
        // right: 0px;
        // top: 0px;
        // width: 10px;
        // height: 10px;
        // transform: translate(50%, -50%);
        // background: rgba(0, 0, 0, 0.3);
        // text-align: center;
        // line-height: 10px;
        // cursor: pointer;
      }
    }
  }
}
.popupBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .van-picker__toolbar {
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    height: 44px;
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    font-size: 14px;
    align-items: center;
    .cancel {
      color: #969799;
    }
    .confirm {
      color: #576b95;
    }
    .title {
      font-weight: 500;
      font-size: 16px;
    }
  }
  .qianming {
    margin: 10px;
    border: 1px solid #ccc;
  }
}
.btn {
  margin: 10px 17px;
  color: #fff;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  text-align: center;
  height: 44px;
  line-height: 44px;
  background: linear-gradient(
    269.22deg,
    rgba(11, 185, 127, 1) 0%,
    rgba(21, 216, 151, 1) 100%
  );
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(6, 122, 84, 0.1);
}
</style>
