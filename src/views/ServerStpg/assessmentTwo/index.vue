<template>
  <div class="details">
    <van-form @submit="onSubmit">

      <nav class="box details">
        <p class="title">疾病诊断</p>
        <van-cell-group>
          <van-field label="痴呆"
                     @click="handleShow('痴呆',chidaiData)"
                     :rules="rules.dementia"
                     v-model="detailData.dementia"
                     right-icon="arrow-down"
                     placeholder="请选择程度"
                     readonly></van-field>

          <van-field label="精神疾病"
                     @click="handleShow('精神疾病',jingshenData)"
                     :rules="rules.mentalIllness"
                     v-model="detailData.mentalIllness"
                     right-icon="arrow-down"
                     placeholder="请选择疾病"
                     readonly></van-field>

          <van-field label="慢性疾病"
                     placeholder="请输入慢性疾病"
                     v-model="detailData.chronicDiseases" />
        </van-cell-group>
      </nav>

      <nav class="box details">
        <p class="title">近30天内意外事件</p>

        <van-cell-group>
          <van-field label="跌倒"
                     @click="handleShow('跌倒',pinlvData)"
                     :rules='rules.fellto'
                     v-model="detailData.fellto"
                     right-icon="arrow-down"
                     placeholder="请选择情况"
                     readonly></van-field>

          <van-field label="走失"
                     @click="handleShow('走失',pinlvData)"
                     :rules='rules.lost'
                     v-model="detailData.lost"
                     right-icon="arrow-down"
                     placeholder="请选择情况"
                     readonly></van-field>

          <van-field label="噎食"
                     @click="handleShow('噎食',pinlvData)"
                     :rules='rules.chokeFeed'
                     v-model="detailData.chokeFeed"
                     right-icon="arrow-down"
                     placeholder="请选择情况"
                     readonly></van-field>

          <van-field label="自杀"
                     @click="handleShow('自杀',pinlvData)"
                     :rules='rules.suicide'
                     v-model="detailData.suicide"
                     right-icon="arrow-down"
                     placeholder="请选择情况"
                     readonly></van-field>

          <van-field label="其他"
                     placeholder="请填写无或者其他情况"
                     v-model="detailData.other" />
        </van-cell-group>
      </nav>

      <div class="home-cj">
        <van-button class="home-butt-upper"
                    @click="upperStep">
          上一步
        </van-button>
        <van-button round
                    block
                    type="primary"
                    class="home-butt"
                    native-type="submit">
          下一步
        </van-button>
        <!-- <el-button @click="upperStep"
                   class="home-butt-upper">上一步</el-button>
        <el-button @click="onSubmit"
                   class="home-butt">下一步</el-button> -->
      </div>
    </van-form>
    <van-popup v-model="popupShow"
               position="bottom"
               :style="{ height: '40%' }">
      <van-picker show-toolbar
                  :title="popupTitle"
                  :columns="columns"
                  @confirm="onConfirm"
                  @cancel="popupShow = false" />

    </van-popup>
  </div>
</template>
<script>
import { getDictData, oldPeopAddItem } from '@/api/serverStpg.js'
export default {
  data() {
    return {
      detailData: {
        dementia: '',
        mentalIllness: '',
        chronicDiseases: '',
        fellto: '',
        lost: '',
        chokeFeed: '',
        suicide: '',
        other: '',
        idcardNumber: '',
      },
      rules: {
        dementia: [{ required: true, message: '请选择痴呆程度' }],
        mentalIllness: [{ required: true, message: '请选择精神疾病程度' }],
        // chronicDiseases: [{ required: true, message: '请输入慢性疾病' }],
        fellto: [{ required: true, message: '请选择情况' }],
        lost: [{ required: true, message: '请选择情况' }],
        chokeFeed: [{ required: true, message: '请选择情况' }],
        suicide: [{ required: true, message: '请选择情况' }],
      },
      popupShow: false, // 用来显示弹出层
      popupTitle: '', // 弹出层标题
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华'],
      chidaiData: ['无', '轻度', '中度', '重度'],
      jingshenData: [],
      pinlvData: [],
    }
  },
  mounted() {
    this.detailData.idcardNumber = this.$route.query.idcardNumber
    this.detailData.id = this.$route.query.id
    this.getDate()
  },
  methods: {
    handleShow(name, data) {
      this.popupShow = true
      this.popupTitle = name
      this.columns = data
    },
    onConfirm(value) {
      this.popupShow = false
      switch (this.popupTitle) {
        case '痴呆':
          this.detailData.dementia = value
          break
        case '精神疾病':
          this.detailData.mentalIllness = value
          break
        case '跌倒':
          this.detailData.fellto = value
          break
        case '走失':
          this.detailData.lost = value
          break
        case '噎食':
          this.detailData.chokeFeed = value
          break
        case '自杀':
          this.detailData.suicide = value
          break
        default:
          break
      }
    },
    onSubmit() {
      oldPeopAddItem(this.detailData).then((res) => {
        if (res && res.code == 200) {
          this.$router.push({
            path: 'ServeStpg-assessmentThree',
            query: {
              idcardNumber: this.detailData.idcardNumber,
              id: res.data.id,
            },
          })
        }
      })
    },
    upperStep() {
      this.$router.go(-1)
    },
    getDate() {
      let obj = [
        // 精神疾病
        {
          code: 'jjjb',
          data: 'jingshenData',
        },
        //发生频率
        {
          code: 'frequency',
          data: 'pinlvData',
        },
      ]
      obj.forEach((item) => {
        getDictData({ code: item.code }).then((res) => {
          this[item.data] = res.data.map((i) => {
            return i.name
          })
        })
      })
    },
  },
}
</script>
<style lang="less" scoped>
.details {
  padding-bottom: 70px;
  position: relative;

  .box {
    background: #fff;
    padding: 10px 10px;
    margin-bottom: 10px;
    text-align: left;

    .title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      margin-bottom: 11px;
      font-weight: 600;
      color: #000000;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }
    }

    .van-field {
      padding: 10px 0;
    }

    .navigation {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(5, 177, 120, 0.61);
      text-align: right;
    }

    .zhu {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.5);
      line-height: 20px;
      margin: 17px 0;
    }

    .uploaderbox {
      display: flex;
      align-items: center;
      margin-bottom: 13px;
    }

    .text {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.5);
      line-height: 20px;
    }
    .six {
      height: 40px;
      display: flex;
      align-items: center;
      background: #fff;
      p {
        font-size: 14px;
        margin-right: 20px;
      }
      .van-radio {
        font-size: 14px;
      }
    }
  }

  .home-cj {
    padding: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
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
  /deep/ .van-cell {
    height: 44px;
    line-height: 44px;
    .van-field__label {
      width: 115px;
    }
    .van-field__body {
      justify-content: flex-start;
      .van-field__control {
        width: 200px;
        text-align: right;
      }
    }
  }
}
</style>
