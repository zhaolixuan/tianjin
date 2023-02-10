<template>
  <div class="details">

    <nav class="box details">
      <div class="title">基本信息</div>
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field label="老年人姓名"
                     placeholder="请输入姓名"
                     v-model="detailData.name"
                     :rules="rules.name"
                     right-icon="" />

          <van-field label="性别"
                     :rules='rules.sex'
                     v-model="detailData.sex"
                     @click="handleShow('picker','性别',sexData)"
                     right-icon="arrow-down"
                     placeholder="请选择性别"
                     readonly></van-field>

          <van-field label="身份证号"
                     placeholder="请输入身份证号"
                     :rules='rules.idcardNumber'
                     v-model="detailData.idcardNumber" />

          <van-field label="社保卡号"
                     placeholder="请输入社保卡号"
                     :rules='rules.pensioncardNumber'
                     v-model="detailData.pensioncardNumber" />

          <van-field label="出生日期"
                     :rules='rules.brithday'
                     v-model="detailData.brithday"
                     right-icon="arrow-down"
                     @click="handleShow('time','出生日期')"
                     placeholder="请选择出生日期"
                     readonly></van-field>

          <van-field label="民族"
                     :rules='rules.national'
                     v-model="detailData.national"
                     @click="handleShow('picker','民族',minzuData)"
                     right-icon="arrow-down"
                     placeholder="请选择民族"
                     readonly></van-field>

          <van-field label="文化程度"
                     :rules='rules.levelEducation'
                     v-model="detailData.levelEducation"
                     @click="handleShow('picker','文化程度',wenhuaData)"
                     right-icon="arrow-down"
                     placeholder="请选择文化程度"
                     readonly></van-field>

          <van-field label="宗教信仰"
                     placeholder="请填写无或者宗教名称"
                     :rules='rules.religiousBeliefs'
                     v-model="detailData.religiousBeliefs" />

          <van-field label="婚姻状况"
                     :rules='rules.maritalStatus'
                     v-model="detailData.maritalStatus"
                     @click="handleShow('picker','婚姻状况',hunyinData)"
                     right-icon="arrow-down"
                     placeholder="请选择婚姻状况"
                     readonly></van-field>

          <van-field label="居住情况"
                     :rules='rules.livingSituation'
                     v-model="detailData.livingSituation"
                     @click="handleShow('picker','居住情况',juzhuData)"
                     right-icon="arrow-down"
                     placeholder="请选择居住情况"
                     readonly></van-field>
          <van-field label="医疗费用支付方式"
                     :rules='rules.medicalPayment'
                     v-model="detailData.medicalPayment"
                     @click="handleShow('Checkbox','支付方式',zhifuData)"
                     right-icon="arrow-down"
                     placeholder="请选择支付方式"
                     readonly></van-field>
          <van-field label="经济来源"
                     :rules='rules.economicSources'
                     v-model="detailData.economicSources"
                     @click="handleShow('Checkbox','经济来源',laiyuanData)"
                     right-icon="arrow-down"
                     placeholder="请选择经济来源"
                     readonly></van-field>
        </van-cell-group>
        <div class="home-cj">
          <van-button round
                      block
                      type="primary"
                      class="home-butt"
                      native-type="submit">
            下一步
          </van-button>
          <!-- <el-button @click="onSubmit"
                 class="home-butt">下一步</el-button> -->
        </div>
      </van-form>

    </nav>

    <van-popup v-model="popupShow"
               position="bottom"
               :style="{ height: '40%' }">

      <!-- 出生日期     -->
      <van-datetime-picker v-if="typeShow == 'time'"
                           :title="popupTitle"
                           type="date"
                           :min-date="minDate"
                           @confirm="onConfirm"
                           @cancel="popupShow = false" />

      <van-picker v-if="typeShow == 'picker'"
                  show-toolbar
                  :title="popupTitle"
                  :columns="columns"
                  @confirm="onConfirm"
                  @cancel="popupShow = false" />

      <van-picker v-if="typeShow == 'Checkbox'"
                  show-toolbar
                  :columns="columns"
                  :title="popupTitle"
                  @confirm="onConfirm"
                  @cancel="popupShow = false">
        <template #option="option">
          <van-checkbox-group v-model="checked">
            <van-checkbox :name="option"
                          shape="square">{{option}}</van-checkbox>
          </van-checkbox-group>
        </template>
      </van-picker>

    </van-popup>
  </div>
</template>
<script>
import minzu from '@a/js/minzuData.json'
import { getDictData, oldPeopAddItem } from '@/api/serverStpg.js'

export default {
  data() {
    return {
      detailData: {
        name: '',
        sex: '',
        idcardNumber: '',
        pensioncardNumber: '',
        brithday: '',
        national: '',
        levelEducation: '',
        religiousBeliefs: '',
        maritalStatus: '',
        livingSituation: '',
        medicalPayment: '',
        economicSources: '',
      },
      minDate: new Date(1900, 0, 1),
      rules: {
        name: [{ required: true, message: '请输入姓名' }],
        sex: [{ required: true, message: '请选择性别' }],
        idcardNumber: [{ required: true, message: '请输入身份证号' }],
        pensioncardNumber: [{ required: true, message: '请输入社保卡号' }],
        brithday: [{ required: true, message: '请选择出生日期' }],
        national: [{ required: true, message: '请选择民族' }],
        levelEducation: [{ required: true, message: '请选择文化程度' }],
        religiousBeliefs: [{ required: true, message: '请输入宗教信仰' }],
        maritalStatus: [{ required: true, message: '请选择婚姻状况' }],
        livingSituation: [{ required: true, message: '请选择居住情况' }],
        medicalPayment: [{ required: true, message: '请选择医疗费用支付方式' }],
        economicSources: [{ required: true, message: '请选择经济来源' }],
      },
      popupShow: false, // 用来显示弹出层
      typeShow: '', // 弹出层内容显示类型
      popupTitle: '', // 弹出层标题
      columns: [],
      checked: [],
      sexData: ['男', '女'],
      minzuData: minzu,
      wenhuaData: [],
      hunyinData: [],
      juzhuData: [],
      zhifuData: [],
      laiyuanData: [],
    }
  },
  mounted() {
    this.getDate()
  },
  methods: {
    handleShow(type, name, data) {
      this.popupShow = true
      this.typeShow = type
      this.popupTitle = name
      this.columns = data

      switch (this.popupTitle) {
        case '支付方式':
          this.checked =
            (this.detailData.medicalPayment &&
              this.detailData.medicalPayment.split(',')) ||
            []
          break
        case '经济来源':
          this.checked =
            (this.detailData.economicSources &&
              this.detailData.economicSources.split(',')) ||
            []
          break
      }
    },
    onConfirm(value) {
      this.popupShow = false
      switch (this.popupTitle) {
        case '性别':
          this.detailData.sex = value
          break
        case '出生日期':
          this.detailData.brithday = this.timeFormat(value)
          break
        case '民族':
          this.detailData.national = value
          break
        case '文化程度':
          this.detailData.levelEducation = value
          break
        case '婚姻状况':
          this.detailData.maritalStatus = value
          break
        case '居住情况':
          this.detailData.livingSituation = value
          break
        case '支付方式':
          this.detailData.medicalPayment = this.checked.join(',')
          break
        case '经济来源':
          this.detailData.economicSources = this.checked.join(',')
          break

        default:
          break
      }
    },

    onSubmit() {
      oldPeopAddItem(this.detailData).then((res) => {
        if (res && res.code == 200) {
          this.$router.push({
            path: '/serveStpg-assessmentTwo',
            query: {
              idcardNumber: this.detailData.idcardNumber,
              id: res.data.id,
            },
          })
        }
      })
    },
    getDate() {
      let obj = [
        // 文化程度
        {
          code: 'education',
          data: 'wenhuaData',
        },
        //婚姻状况
        {
          code: 'hyzk',
          data: 'hunyinData',
        },
        //居住情况
        {
          code: 'jzqk',
          data: 'juzhuData',
        },
        //支付方式
        {
          code: 'zffs',
          data: 'zhifuData',
        },
        //经济来源
        {
          code: 'jjly',
          data: 'laiyuanData',
        },
      ]
      obj.forEach((item) => {
        getDictData({ code: item.code }).then((res) => {
          this[item.data] = res.data.map((i) => {
            return i.name
          })
          console.log(this[item.data])
        })
      })
    },
    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      return year + '年' + month + '月' + day + '日'
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
      padding: 6px 0;
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
    .home-butt {
      background: linear-gradient(
        269.22deg,
        rgba(11, 185, 127, 1) 0%,
        rgba(21, 216, 151, 1) 100%
      );
      height: 44px;
      width: 100%;
      border-radius: 4px;
      box-shadow: 0 0 4px 0 rgba(6, 122, 84, 0.1);
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
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
