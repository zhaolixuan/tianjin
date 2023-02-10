<template>
  <div class="details">
    <div id="pdfDom">
      <nav class="box">
        <p class="title">一级指标分级</p>
        <div class="zbfj">
          <div class="img img1">
            <p>日常生活活动</p>
            <img v-if="LevelData[0]&&LevelData[0].dailyLevel.includes( '能力完好')"
                 src="~@a/images/rcshhd.png"
                 alt="">
            <img v-if="LevelData[0]&&LevelData[0].dailyLevel.includes('轻度') "
                 src="~@a/images/rcshhd-qd.png"
                 alt="">
            <img v-if="LevelData[0]&&LevelData[0].dailyLevel.includes('中度') "
                 src="~@a/images/rcshhd-zd.png"
                 alt="">
            <img v-if="LevelData[0]&&LevelData[0].dailyLevel.includes( '重度')"
                 src="~@a/images/rcshhd-zd1.png"
                 alt="">
          </div>
          <div class="img img2">
            <p>精神状态</p>
            <img v-if="LevelData[0]&&LevelData[0].spiritLevel.includes( '能力完好')"
                 src="~@a/images/spirit.png"
                 alt="">
            <img v-if="LevelData[0]&&LevelData[0].spiritLevel.includes('轻度') "
                 src="~@a/images/spirit-qd.png"
                 alt="">
            <img v-if="LevelData[0]&&LevelData[0].spiritLevel.includes('中度') "
                 src="~@a/images/spirit-zd.png"
                 alt="">
            <img v-if="LevelData[0]&&LevelData[0].spiritLevel.includes( '重度')"
                 src="~@a/images/spirit-zd1.png"
                 alt="">
          </div>
          <div class="img img3">
            <p>感知觉与沟通</p>
            <img v-if="LevelData[0]&&LevelData[0].communicationLevel.includes( '能力完好')"
                 src="~@a/images/communication.png"
                 alt="">
            <img v-if="LevelData[0]&&LevelData[0].communicationLevel.includes('轻度') "
                 src="~@a/images/communication-qd.png"
                 alt="">
            <img v-if="LevelData[0]&&LevelData[0].communicationLevel.includes('中度') "
                 src="~@a/images/communication-zd.png"
                 alt="">
            <img v-if="LevelData[0]&&LevelData[0].communicationLevel.includes('重度') "
                 src="~@a/images/communication-zd1.png"
                 alt="">
          </div>
          <div class="img img4">
            <p>社会参与</p>
            <img v-if="LevelData[0]&&LevelData[0].socialLevel.includes( '能力完好')"
                 src="~@a/images/social.png"
                 alt="">
            <img v-if="LevelData[0]&&LevelData[0].socialLevel.includes('轻度') "
                 src="~@a/images/social-qd.png"
                 alt="">
            <img v-if="LevelData[0]&&LevelData[0].socialLevel.includes('中度') "
                 src="~@a/images/social-zd.png"
                 alt="">
            <img v-if="LevelData[0]&&LevelData[0].socialLevel.includes('重度') "
                 src="~@a/images/social-zd1.png"
                 alt="">
          </div>
        </div>
      </nav>

      <nav class="box">
        <p class="title">老年人能力初步等级</p>
        <div class="lnrnlcbdj">

          <img v-if="LevelData[1]&&LevelData[1].preliminaryGrade.includes( '能力完好')"
               src="~@a/images/lnrnlcbdj.png"
               alt="">
          <img v-if="LevelData[1]&&LevelData[1].preliminaryGrade.includes('轻度') "
               src="~@a/images/lnrnlcbdj-qd.png"
               alt="">
          <img v-if="LevelData[1]&&LevelData[1].preliminaryGrade.includes('中度') "
               src="~@a/images/lnrnlcbdj-zd.png"
               alt="">
          <img v-if="LevelData[1]&&LevelData[1].preliminaryGrade.includes('重度') "
               src="~@a/images/lnrnlcbdj-zd1.png"
               alt="">
        </div>
      </nav>

      <nav class="box">
        <p class="title">等级变更条款</p>
        <div class="djbgtk">
          {{LevelData[2]&&LevelData[2].rules}}
        </div>
      </nav>

      <nav class="box">
        <p class="title">老年人能力最终等级</p>
        <div class="lnrnlcbdj">
          <img v-if="LevelData[2]&&LevelData[2].levelChange.includes( '能力完好')"
               src="~@a/images/lnrnlzzdj.png"
               alt="">
          <img v-if="LevelData[2]&&LevelData[2].levelChange.includes('轻度') "
               src="~@a/images/lnrnlzzdj-qd.png"
               alt="">
          <img v-if="LevelData[2]&&LevelData[2].levelChange.includes('中度') "
               src="~@a/images/lnrnlzzdj-zd.png"
               alt="">
          <img v-if="LevelData[2]&&LevelData[2].levelChange.includes('重度') "
               src="~@a/images/lnrnlzzdj-zd1.png"
               alt="">
        </div>
      </nav>

      <nav class="box"
           v-for="item in dataObj"
           :key="item.title">
        <p class="title">{{item.title}}</p>
        <van-cell-group>
          <div class="dataitem"
               v-for="j in item.data"
               :key="j.name">
            <p class="label">{{j.name}}</p>
            <p class="value">{{infoData[j.value]}}</p>
          </div>

        </van-cell-group>

      </nav>

      <nav class="box">
        <p class="title">被评估者近照</p>
        <div class="lnrnlcbdj">
          <img v-for="i in recentPhoto"
               :key="i.id"
               :src="i.url"
               alt="">
        </div>
      </nav>

      <nav class="box">
        <p class="title">信息提供者签名</p>
        <div class="lnrnlcbdj">
          <img v-for="i in providerPhoto"
               :key="i.id"
               :src="i.url"
               alt="">
        </div>
      </nav>

      <nav class="box">
        <p class="title">主评估员签名</p>
        <div class="lnrnlcbdj">
          <img v-for="i in principalAssessor"
               :key="i.id"
               :src="i.url"
               alt="">
        </div>
      </nav>

      <nav class="box">
        <p class="title">辅助评估员签名</p>
        <div class="lnrnlcbdj">
          <img v-for="i in assistantAssessor"
               :key="i.id"
               :src="i.url"
               alt="">
        </div>
      </nav>

    </div>
    <div class="btn"
         @click="getPdf()">下载评估报告</div>
  </div>
</template>

<script>
import { evaluationEeport } from '@/api/serverStpg.js'
export default {
  data() {
    return {
      olderFileList: [],
      popupShow: false,
      resultImg: '',
      infoData: {},
      dataObj: [
        {
          title: '评估基本信息',
          data: [
            { name: '评估编号', value: 'assessNumber' },
            { name: '评估基准日期', value: 'assessDate' },
            { name: '评估原因', value: 'assessReson' },
          ],
        },
        {
          title: '被评估者基本信息',
          data: [
            { name: '姓名', value: 'name' },
            { name: '出生日期', value: 'brithday' },
            { name: '身份证号', value: 'idcardNumner' },
            { name: '社保卡号', value: 'pensioncardNumber' },
            { name: '民族', value: 'national' },
            { name: '文化程度', value: 'levelEducation' },
            { name: '宗教信仰', value: 'religiousBeliefs' },
            { name: '婚姻状况', value: 'maritalStatus' },
            { name: '居住情况', value: 'livingSituation' },
            { name: '医疗费用支付方式', value: 'medicalPayment' },
            { name: '经济来源', value: 'economicSources' },
          ],
        },
        {
          title: '疾病诊断',
          data: [
            { name: '痴呆', value: 'dementia' },
            { name: '精神疾病', value: 'mentalIllness' },
            { name: '慢性疾病', value: 'chronicDiseases' },
          ],
        },
        {
          title: '近30天内意外事件',
          data: [
            { name: '跌倒', value: 'fellto' },
            { name: '走失', value: 'lost' },
            { name: '噎食', value: 'chokeFeed' },
            { name: '自杀', value: 'suicide' },
            { name: '其他', value: 'other' },
          ],
        },
        {
          title: '信息提供者及联系人信息',
          data: [
            { name: '信息提供者姓名', value: 'informationProvidedName' },
            { name: '信息提供者与老人的关系', value: 'relationElderly' },
            { name: '联系人姓名', value: 'contactName' },
            { name: '联系人电话', value: 'contactPhone' },
          ],
        },
      ],
      LevelData: [],
      recentPhoto: [],
      providerPhoto: [],
      principalAssessor: [],
      assistantAssessor: [],
    }
  },
  created() {},
  mounted() {
    this.idcardNumber = this.$route.query.idcardNumber
    this.getData()
  },
  methods: {
    getData() {
      evaluationEeport({ idCard: this.idcardNumber }).then((res) => {
        this.infoData = {
          assessDate: res.data[3].assessDate,
          assessNumber: res.data[3].assessNumber,
          assessReson: res.data[3].assessReson,
          ...res.data[3].assessmentInformationProvider,
          ...res.data[3].oldpeopleInfo,
        }
        this.LevelData = res.data
        this.recentPhoto = res.data[3].recentPhoto
        this.providerPhoto = res.data[3].providerPhoto
        this.principalAssessor = res.data[3].principalAssessor
        this.assistantAssessor = res.data[3].assistantAssessor
      })
    },
    nextStep() {
      this.$router.push({ path: '/' })
    },
    handleReset() {
      this.$refs['esign'].reset() //清空画布
    },
    onConfirm() {
      this.$refs['esign']
        .generate()
        .then((res) => {
          //   console.log(this.base64ImgtoFile(res))
          this.popupShow = false
          this.resultImg = res // 得到了签字生成的base64图片
        })
        .catch((err) => {
          console.log(err)
          //   this.$refs['esign'].reset() //清空画布
          //   this.popupShow = false
        })
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
    handleClick() {
      console.log(111)
    },
    onOversize(file) {
      console.log(file)
      this.$toast('文件大小不能超过5M')
    },
  },
}
</script>

<style scoped lang="less">
.details {
  position: relative;
  background: #fff;
  padding-bottom: 10px;
  .box {
    background: #fff;
    padding: 10px 16px;
    margin-bottom: 10px;
    text-align: left;
    line-height: 1;
    .title {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      margin-bottom: 10px;
    }
    .zbfj {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .img {
        width: 163px;
        height: 91px;
        margin-bottom: 16px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        p {
          position: absolute;
          top: 14px;
          left: 20px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(34, 34, 34, 0.9);
        }
      }
    }
    .lnrnlcbdj {
      img {
        width: 100%;
      }
    }
    .djbgtk {
      line-height: 24px;
      padding: 10px 0;
      border-top: 1px solid rgba(235, 238, 241, 1);
      border-bottom: 1px solid rgba(235, 238, 241, 1);
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
    }

    .dataitem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid rgba(235, 238, 241, 1);
      p {
        flex: 1;
        line-height: 24px;
      }
      .label {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(59, 61, 61, 1);
      }
      .value {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: normal;
        color: rgba(51, 51, 51, 1);
        text-align: right;
      }
    }
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
  margin-bottom: 20px;
}
</style>
