<template>
  <div class="details">
    <div v-if="subjectShow == 'subject'">
      <nav class="box">
        <p class="title">{{activeData.type}}</p>

      </nav>
      <nav class="info">
        <p class="name">
          {{activeIndex}}.{{activeData.title}}
        </p>
        <span class="describe"
              v-if="activeData.describe">{{activeData.describe}}</span>
        <van-radio-group v-model="questionOptions">
          <van-radio v-for="i in activeData.optionsList"
                     :key="i.id"
                     :name="i.options"
                     checked-color="#0CBA80">{{i.options}}</van-radio>
        </van-radio-group>
      </nav>

    </div>

    <div v-if="subjectShow == 'score'"
         class="result">
      <div class="result_item defen">
        <p class="title">{{moduleName}}得分</p>
        <p class="content">
          {{resultData.score || 0}}
        </p>
      </div>
      <div class="result_item fenji">
        <p class="title">{{moduleName}}分级</p>
        <p class="content">
          {{resultData.result}}

        </p>
      </div>
      <div class="result_item biaozhun">
        <p class="title">分级标准</p>
        <div class="content">
          <p v-for="(i,index) in fenjiData"
             :key="index">{{i}}</p>
          <p></p>
          <p></p>
          <p> </p>
        </div>
      </div>

    </div>

    <div class="home-cj">
      <el-button @click="upperStep"
                 class="home-butt-upper">上一步</el-button>
      <el-button @click="nextStep"
                 class="home-butt">下一步</el-button>
    </div>
  </div>
</template>

<script>
import {
  getTitleData,
  answerQuestions,
  moduleScore,
  answerQuestionsHisList,
} from '@/api/serverStpg.js'
export default {
  data() {
    return {
      detailData: {
        idCard: '',
        questionType: '题目类型',
        questionTitle: '题目',
        questionNum: '题目编号',
        questionOptions: '答案选项',
        questionScore: '选项分数',
      },
      questionOptions: '',
      subjectShow: 'subject',
      moduleName: '',
      subjectData: [],
      activeIndex: 1,
      resultData: {},
      hisSubjectData: [],
    }
  },
  computed: {
    activeData() {
      return this.subjectData[this.activeIndex - 1] || {}
    },
    fenjiData() {
      let data
      console.log(this.moduleName)
      switch (this.moduleName) {
        case '日常生活活动评估':
          data = [
            '0 能力完好：总分 100 分',
            '1 轻度受损：总分 65-95 分',
            '2 中度受损：总分 45-60 分',
            '3 重度受损：总分≤40 分',
          ]
          break
        case '精神状态评估':
          data = [
            '0 能力完好：总分 0 分',
            '1 轻度受损：总分 1 分',
            '2 中度受损：总分 2-3 分',
            '3 重度受损：总分 4-6 分',
          ]
          break

        case '感知觉与沟通评估':
          data = [
            '0 能力完好：意识清醒，且视力和听力评为 0 或 1，沟通评为 0',
            '1 轻度受损：意识清醒，但视力或听力中至少一项评为 2，或沟通评为 1',
            '2 中度受损：意识清醒，但视力或听力中至少一项评为 3，或沟通评为 2；',
            '3 重度受损：意识清醒或嗜睡，但视力或听力中至少一项评为 4，或沟通评为 3；',
            '或昏睡/昏迷',
          ]
          break

        case '社会参与评估':
          data = [
            '0 能力完好：总分 0-2 分',
            '1 轻度受损：总分 3-7 分',
            '2 中度受损：总分 8-13 分',
            '3 重度受损：总分 14-20 分',
          ]
          break

        default:
          break
      }
      return data
    },
  },
  watch: {
    activeIndex() {
      if (this.hisSubjectData.length >= this.activeIndex) {
        this.questionOptions = this.hisSubjectData.filter(
          (i) => i.questionNum == this.activeIndex
        )[0].questionOptions
      }
    },
  },
  created() {},
  mounted() {
    this.detailData.idCard = this.$route.query.idcardNumber
    this.getData()
    this.getHisList()
  },
  methods: {
    getHisList() {
      answerQuestionsHisList({ idCard: this.detailData.idCard }).then((res) => {
        if (res.data && res.data.length) {
          this.hisSubjectData = res.data
          this.activeIndex =
            res.data.length > 21 ? res.data.length : res.data.length + 1
          this.moduleName = res.data[res.data.length - 1].questionType
        }
      })
    },
    getData() {
      getTitleData().then((res) => {
        this.subjectData = res.data
      })
    },
    nextStep() {
      if (this.subjectShow == 'score') {
        if (this.activeIndex == 22) {
          // 当前是评分页面，判断是否为最后一题 是则跳转页面 否则改变页面类型
          this.$router.push({
            path: '/autograph',
            query: { idcardNumber: this.detailData.idCard },
          })
        } else {
          this.activeIndex++
          this.subjectShow = 'subject'
        }
        return
      }
      let item = this.activeData.optionsList.filter(
        (i) => i.options == this.questionOptions
      )[0]
      if (!item) {
        return this.$dialog
          .alert({
            message: '当前还未作答，请选择答案后在点击下一步',
            theme: 'round-button',
          })
          .then(() => {
            // on close
          })
      }
      // 根据题号判断是否到评估阶段
      if ([10, 13, 17, 22].includes(this.activeIndex)) {
        this.detailData.questionType = this.activeData.type
        this.detailData.questionTitle = this.activeData.title
        this.detailData.questionNum = this.activeData.titleNum
        this.detailData.questionOptions = item.options || ''
        this.detailData.questionScore = item.score || ''
        console.log(1)
        answerQuestions(this.detailData).then((res) => {
          console.log(2)

          if (res.code == 200) {
            this.moduleName = this.activeData.type
            this.hisSubjectData[this.activeIndex - 1] = {
              questionOptions: item.options,
              questionNum: this.activeData.titleNum,
              questionTitle: this.activeData.title,
              questionType: this.activeData.type,
            }
            // 把类型改为评估页面
            this.subjectShow = 'score'
            moduleScore({
              idCard: this.detailData.idCard,
              moduleName: this.moduleName,
            }).then((res) => {
              this.resultData = res.data
            })
          }
        })
      } else {
        // 否则就还是答题
        this.subjectShow = 'subject'
      }
      // 判断是否是答题
      if (this.subjectShow == 'subject') {
        this.detailData.questionType = this.activeData.type
        this.detailData.questionTitle = this.activeData.title
        this.detailData.questionNum = this.activeData.titleNum
        this.detailData.questionOptions = item.options || ''
        this.detailData.questionScore = item.score || ''
        answerQuestions(this.detailData).then((res) => {
          if (res.code == 200) {
            this.moduleName = this.activeData.type
            this.hisSubjectData[this.activeIndex - 1] = {
              questionOptions: item.options,
              questionNum: this.activeData.titleNum,
              questionTitle: this.activeData.title,
              questionType: this.activeData.type,
            }

            this.activeIndex++
          }
        })
      } else {
        console.log(3)

        // 反之就是评估
        console.log(this.detailData.idCard)

        moduleScore({
          idCard: this.detailData.idCard,
          moduleName: this.moduleName,
        }).then((res) => {
          this.resultData = res.data
        })
      }
    },
    upperStep() {
      if (this.activeIndex == 1) {
        this.$router.go(-1)
      } else {
        if (this.subjectShow == 'score') {
          this.subjectShow = 'subject'
          this.activeIndex--
        } else {
          if ([11, 14, 18, 22].includes(this.activeIndex)) {
            // 把类型改为评估页面
            this.subjectShow = 'score'
            console.log(this.detailData.idCard)
            moduleScore({
              idCard: this.detailData.idCard,
              moduleName: this.moduleName,
            }).then((res) => {
              this.resultData = res.data
            })
          } else {
            // 否则就还是答题
            this.subjectShow = 'subject'
            this.activeIndex--
          }
        }
      }
    },
  },
}
</script>

<style scoped lang="less">
.details {
  position: relative;
  height: calc(100vh - 68px);
  background: #fff;

  .box {
    padding: 10px;
    text-align: left;
    .title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #000000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ebeef1;
      line-height: 48px;
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }
    }
  }
  .info {
    line-height: 1;
    padding: 10px;
    text-align: left;

    .name {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(59, 61, 61, 1);
    }
    .describe {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: normal;
      margin-left: 20px;
      color: rgba(102, 102, 102, 1);
    }
    /deep/ .van-radio-group {
      font-size: 16px;
      margin-top: 10px;
      .van-radio {
        padding: 10px;
        border-bottom: 1px solid #ebeef1;
      }
      .van-radio__label {
        line-height: 22px;
      }
    }
  }

  .result {
    padding: 10px;
    .result_item {
      border: 1px solid #ebeef1;
      margin-top: 20px;
      .title {
        padding-left: 10px;
        border-bottom: 1px solid #ebeef1;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #000000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 48px;
      }
      .content {
        padding: 20px 10px;
        text-align: center;
        line-height: 40px;
        font-size: 36px;
        color: #000;
        font-weight: bold;
      }
    }
    .biaozhun {
      .content {
        font-size: 16px;
        line-height: 24px;
        text-align: left;
        padding-left: 40px;
        font-weight: 500;
      }
    }
  }

  .home-cj {
    padding: 15px;
    width: 100%;
    position: absolute;
    bottom: 100px;
    .home-butt {
      background: linear-gradient(
        269.22deg,
        rgba(11, 185, 127, 1) 0%,
        rgba(21, 216, 151, 1) 100%
      );
      height: 44px;
      width: 40%;
      border-radius: 4px;
      box-shadow: 0 0 4px 0 rgba(6, 122, 84, 0.1);
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    .home-butt-upper {
      // background: linear-gradient(
      //   269.22deg,
      //   rgba(11, 185, 127, 1) 0%,
      //   rgba(21, 216, 151, 1) 100%
      // );
      height: 44px;
      width: 40%;
      box-shadow: 0 0 4px 0 rgba(6, 122, 84, 0.1);
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #0cba80;

      border: 1px solid rgba(12, 186, 128, 1);
      border-radius: 4px;
    }
  }
}
</style>
