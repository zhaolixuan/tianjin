<template>
  <div class="details">
    <van-form @submit="onSubmit">
      <nav class="box details">
        <p class="title">信息提供者及联系人信息表</p>
        <van-cell-group>
          <van-field label="信息提供者的姓名"
                     placeholder="请输入姓名"
                     :rules="rules.informationProvidedName"
                     v-model="detailData.informationProvidedName"
                     right-icon="" />

          <van-field label="与老人的关系"
                     @click="handleShow('Checkbox','关系类型',guanxiData)"
                     :rules="rules.relationElderly"
                     v-model="detailData.relationElderly"
                     right-icon="arrow-down"
                     placeholder="请选择关系"
                     readonly></van-field>

          <van-field label="联系人的姓名"
                     placeholder="请输入联系人姓名"
                     :rules="rules.contactName"
                     v-model="detailData.contactName" />

          <van-field label="联系人的电话"
                     placeholder="请输入联系人电话"
                     :rules="rules.contactPhone"
                     v-model="detailData.contactPhone" />

        </van-cell-group>
      </nav>

      <nav class="box details">
        <p class="title">评估原因</p>
        <van-cell-group>
          <van-field label="评估原因"
                     :rules="rules.evaluationReason"
                     v-model="detailData.evaluationReason"
                     @click="handleShow('picker','评估原因',pinguData)"
                     right-icon="arrow-down"
                     placeholder="请选择评估原因"
                     readonly></van-field>

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
import { getDictData, assessmentAddItem } from '@/api/serverStpg.js'
export default {
  data() {
    return {
      detailData: {
        informationProvidedName: '',
        relationElderly: '',
        contactName: '',
        contactPhone: '',
        evaluationReason: '',
        idcardNumber: '',
      },
      rules: {
        informationProvidedName: [{ required: true, message: '' }],
        relationElderly: [{ required: true, message: '' }],
        contactName: [{ required: true, message: '' }],
        contactPhone: [{ required: true, message: '' }],
        evaluationReason: [{ required: true, message: '' }],
      },
      popupShow: false, // 用来显示弹出层
      typeShow: '', // 弹出层内容显示类型
      popupTitle: '', // 弹出层标题
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华'],
      checked: [],
      guanxiData: [],
      pinguData: [],
    }
  },
  mounted() {
    this.detailData.idcardNumber = this.$route.query.idcardNumber
    this.getDate()
  },
  methods: {
    handleShow(type, name, data) {
      this.popupShow = true
      this.typeShow = type
      this.popupTitle = name
      this.columns = data

      switch (this.popupTitle) {
        case '关系类型':
          this.checked =
            (this.detailData.relationElderly &&
              this.detailData.relationElderly.split(',')) ||
            []
          break
      }
    },
    onConfirm(value) {
      this.popupShow = false

      switch (this.popupTitle) {
        case '关系类型':
          this.detailData.relationElderly = this.checked.join(',')
          break
        case '评估原因':
          this.detailData.evaluationReason = value
          break

        default:
          break
      }
    },
    onSubmit() {
      assessmentAddItem(this.detailData).then((res) => {
        if (res && res.code == 200) {
          this.$router.push({
            path: '/ServeStpg-assessmentFour',
            query: { idcardNumber: this.detailData.idcardNumber },
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
          code: 'RelationshipWithTheElderly',
          data: 'guanxiData',
        },
        //发生频率
        {
          code: 'EvaluationReason',
          data: 'pinguData',
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
  /deep/.van-cell {
    // height: 44px;
    // line-height: 44px;
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
