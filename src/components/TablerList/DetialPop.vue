<template>
  <div>
    <el-dialog title="健康驿站服务记录" :visible.sync="dialogVisible" :before-close="handleClose" v-if="propShow === 'medical'">
      <ol class="detial_content">
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">老人姓名：</span>
            <span class="item_value">{{detialData.name}}</span>
          </div>
          <div class="item_contnet">
            <span class="item_label">老人身份证号：</span>
            <span class="item_value">{{detialData.idCard}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">性别：</span>
            <span class="item_value">{{detialData.sex}}</span>
          </div>
          <!-- <div class="item_contnet">
            <span class="item_label">出生日期：</span>
            <span class="item_value">{{detialData.brithday}}</span>
          </div> -->
          <div class="item_contnet">
            <span class="item_label">联系电话：</span>
            <span class="item_value">{{detialData.phone}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">家庭住址：</span>
            <span class="item_value">{{detialData.healthStation}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">是否新建档案：</span>
            <span class="item_value">
              <el-radio v-model="isdangan" :disabled="true" label="1">是</el-radio>
              <el-radio v-model="isdangan" :disabled="true" label="0">否</el-radio>
            </span>
          </div>
          <div class="item_contnet">
            <span class="item_label">是否签约家庭医生：</span>
            <span class="item_value">
              <el-radio v-model="isdoc" :disabled="true" label="1">是</el-radio>
              <el-radio v-model="isdoc" :disabled="true" label="0">否</el-radio>
            </span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnets">
            <span class="item_label">服务内容：</span>
            <span class="item_value">
              <el-checkbox-group v-model="checkedContent" :disabled="true">
                <el-checkbox v-for="serv in serviceContent" :label="serv" :key="serv">{{serv}}</el-checkbox>
              </el-checkbox-group>
            </span>
            <div class="content_bot">
              <span class="item_label">血压值：</span>
              <span class="item_value">{{detialData.bloodPressure}}</span>
              <span class="item_label">血糖值：</span>
              <span class="item_value">{{detialData.bloodGlucose}}</span>
              <!-- 2021年9月28日新增 显示取药金额 medicineMoney -->
              <span class="item_label">取药金额：</span>
              <span class="item_value">{{detialData.medicineMoney}}</span>
            </div>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">60岁以上失能半失能服务：</span>
            <span class="item_value">
              <el-checkbox-group v-model="checkedData" :disabled="true">
                <el-checkbox v-for="serv in serviceData" :label="serv" :key="serv">{{serv}}</el-checkbox>
              </el-checkbox-group>
            </span>
          </div>
        </li>
        <div class="content_fot">
          <div class="fot_item">
            <span class="item_label">备注：</span>
            <span class="item_value">{{detialData.healthStation}}</span>
          </div>
          <div class="fot_item">
            <span class="item_label">服务时间：</span>
            <span class="item_value">{{detialData.serviceTime}}</span>
          </div>
        </div>
      </ol>
    </el-dialog>
    <el-dialog title="一键通预警记录" :visible.sync="dialogVisible" :before-close="handleClose" v-if="propShow === 'warning'">
      <ol class="detial_content">
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">姓名：</span>
            <span class="item_value">{{detialData.name}}</span>
          </div>
          <div class="item_contnet">
            <span class="item_label">性别：</span>
            <span class="item_value">{{detialData.sex}}</span>
          </div>
          <div class="item_contnet">
            <span class="item_label">联系电话：</span>
            <span class="item_value">{{detialData.oldPhone}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">预警类型：</span>
            <span class="item_value">{{detialData.eventType}}</span>
          </div>
          <div class="item_contnet">
            <span class="item_label">预警时间：</span>
            <span class="item_value">{{detialData.alarmTime}}</span>
          </div>
          <div class="item_contnet">
            <span class="item_label">处理状态：</span>
            <span class="item_value">{{detialData.state}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">预警内容：</span>
            <span class="item_value">{{detialData.alarmContent}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">处理结果：</span>
            <span class="item_value">{{detialData.dealContent}}</span>
          </div>
        </li>
      </ol>
    </el-dialog>
    <el-dialog title="老年人保险赔付详情" :visible.sync="dialogVisible" :before-close="handleClose" v-if="propShow === 'InsuranceClaims'">
      <ol class="detial_content">
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">老人姓名：</span>
            <span class="item_value">{{detialData.name}}</span>
          </div>
          <div class="item_contnet">
            <span class="item_label">老人身份证号：</span>
            <span class="item_value">{{detialData.idcardNumber}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">联系电话：</span>
            <span class="item_value">{{detialData.remark}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">事故时间：</span>
            <span class="item_value">{{detialData.accidentTime}}</span>
          </div>
          <div class="item_contnet">
            <span class="item_label">报案时间：</span>
            <span class="item_value">{{detialData.reportTime}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">事故经过：</span>
            <span class="item_value">
              {{detialData.accidentPass}}
            </span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">出险地点：</span>
            <span class="item_value">
              {{detialData.dangerPlace}}
            </span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">是否赔付完毕：</span>
            <span class="item_value">{{detialData.isCompensate}}</span>
          </div>
          <div class="item_contnet">
            <span class="item_label">预估金额：</span>
            <span class="item_value">{{detialData.estimatedAmount}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">已赔付金额（元）：</span>
            <span class="item_value">{{detialData.compensationAmount}}</span>
          </div>
          <div class="item_contnet">
            <span class="item_label">赔付日期：</span>
            <span class="item_value">{{detialData.compensationTime}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">已赔付狂犬疫苗：</span>
            <span class="item_value">{{detialData.compensateVaccine}}</span>
          </div>
          <div class="item_contnet">
            <span class="item_label">已赔付免疫球蛋白：</span>
            <span class="item_value">{{detialData.compensateImmune}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">已赔付救护车费用：</span>
            <span class="item_value">{{detialData.compensateAmbulance}}</span>
          </div>
          <div class="item_contnet">
            <span class="item_label">医疗费用：</span>
            <span class="item_value">{{detialData.reimbursement}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">伤残：</span>
            <span class="item_value">{{detialData.maim}}</span>
          </div>
          <div class="item_contnet">
            <span class="item_label">死亡赔付：</span>
            <span class="item_value">{{detialData.deathCompensation}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">总计赔付费用：</span>
            <span class="item_value">{{detialData.amountCompensate}}</span>
          </div>
        </li>
      </ol>
    </el-dialog>
    <el-dialog title="一键通预警记录" :visible.sync="dialogVisible" :before-close="handleClose" v-if="propShow === 'gateWarning'">
      <ol class="detial_content">
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">老人姓名：</span>
            <span class="item_value">{{detialData.userName}}</span>
          </div>
          <div class="item_contnet">
            <span class="item_label">联系电话：</span>
            <span class="item_value">{{detialData.userPhone}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">网格员姓名：</span>
            <span class="item_value">{{detialData.gridMember}}</span>
          </div>
          <div class="item_contnet">
            <span class="item_label">网格员电话：</span>
            <span class="item_value">{{detialData.gridPhone}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">紧急联系电话：</span>
            <span class="item_value">{{detialData.emergencyPhone}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">报警时间：</span>
            <span class="item_value">
              {{detialData.alarmTime}}
            </span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">报警内容：</span>
            <span class="item_value">
              {{detialData.alarmContent}}
            </span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">处理状态：</span>
            <span class="item_value">{{detialData.disposeState}}</span>
          </div>
          <div class="item_contnet">
            <span class="item_label">处理时间：</span>
            <span class="item_value">{{detialData.disposeTime}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">处理结果：</span>
            <span class="item_value">{{detialData.disposeResult}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">超时状态：</span>
            <span class="item_value">{{detialData.overtimeState}}</span>
          </div>
        </li>
        <li class="detial_item">
          <div class="item_contnet">
            <span class="item_label">催办记录：</span>
            <span class="item_value">{{detialData.expediteRecord}}</span>
          </div>
        </li>
      </ol>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DetialPop',
  data () {
    return {
      isdoc: '1',
      isdangan: '1',
      checked: true,
      serviceData: ['入户查体', '入户随访', '特需服务', '家床'],
      checkedData: [],
      serviceContent: [
        '血压测量',
        '血糖测量',
        '用药指导',
        '健康宣教',
        '社区康复管理'
      ],
      checkedContent: []
    }
  },
  props: {
    detialData: {
      type: Object,
      default: () => {}
    },
    dialogVisible: {
      type: Boolean,
      default: () => false
    },
    propShow: {
      type: String,
      default: () => ''
    }
  },
  watch: {
    detialData: {
      handler (newData, old) {
        this.isdoc = newData.isdoc || ''
        this.isdangan = newData.isdangan || ''
        this.checkedData = newData.incapacitatedService ? newData.incapacitatedService.split(',') : newData.incapacitatedService
        this.checkedContent = newData.serviceContent ? newData.serviceContent.split(',') : newData.serviceContent
      }
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style>
.el-dialog {
  width: 11.89rem;
  height: 9.5rem;
  margin-top: 8vh !important;
  background: #00294c;
}
.el-dialog__header {
  height: 0.53rem;
  background-color: rgba(0, 95, 182);
  display: flex;
  font-family: MicrosoftYaHeiUI-Bold;
}
.el-dialog__title {
  color: #ffffff;
  font-size: 0.18rem;
  line-height: 0.53rem;
  font-weight: bold;
  padding-left: 0.3rem;
}
.el-dialog__headerbtn {
  font-size: 0.33rem;
  top: 9px;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
}
.detial_content {
  padding: 0.53rem 3%;
}
.detial_item {
  width: 100%;
  border-bottom: 1px solid rgba(0, 76, 147);
  display: flex;
}
.item_contnet {
  /* min-height: 0.76rem; */
  font-size: 0.15rem;
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  /* padding-bottom: .1rem; */
}
.item_contnets {
  box-sizing: border-box;
  height: 1.3rem;
  line-height: 0.5rem;
  font-size: 0.15rem;
  padding-top: 0.3rem;
}
.item_label {
  color: #ffffff;
  width: 2rem;
  text-align: right;
  display: inline-block;
}
.flow_tit {
  color: #ffffff;
  width: 2rem;
  font-size: .2rem;
  text-align: right;
  display: inline-block;
}
.item_value {
  color: #27f2ff;
  display: inline-block;
  min-width: 1.6rem;
  max-width: 81%;
}
.flow_icon{
  width: .3rem;
  height: .3rem;
  margin-left: 1rem;
  margin-right: .3rem;
}
.item_flow {
  color: #27f2ff;
  display: inline-block;
  min-width: 1.3rem;
  max-width: 81%;
  font-size: .18rem;
}
.item_value .el-radio__input.is-checked .el-radio__inner {
  background-color: transparent;
}
.el-radio__input.is-disabled .el-radio__inner, .el-radio__input.is-disabled.is-checked .el-radio__inner,
.el-checkbox__input.is-disabled .el-checkbox__inner {
  border: 2px solid rgba(39, 242, 255, 0.5);
  background-color: transparent;
  width: 0.2rem;
  height: 0.2rem;
}
.el-radio__input.is-disabled.is-checked .el-radio__inner::after {
  width: 0.1rem;
  height: 0.1rem;
  background-color: #27f2ff;
}
.el-radio__label,
.el-checkbox {
  color: #27f2ff;
}
.el-checkbox {
  margin-right: .9rem;
}
.el-radio__input.is-disabled+span.el-radio__label,
.el-checkbox__input.is-disabled+span.el-checkbox__label {
  color: #27f2ff;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #27f2ff;
  border-color: transparent;
}
.item_value  /deep/ .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  border-color: #000;
}
.fot_item {
  display: flex;
  margin-top: 0.5rem;
}
.el-message-box{
  background-color: rgba(0, 95, 182);

}
.el-message-box__message{
  color: #ffffff;
}
.el-button{
  background-color: rgba(0, 76, 147);
  color: #ffffff;
}
</style>
