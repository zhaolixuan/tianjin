<template>
  <div class="dialog-wrapper">
    <el-dialog
      :title="docNameList"
      :visible.sync="$store.state.quota.dialogVisible"
      :modal="false"
      center
      @close="closeDialog"
    >
      <div class="tipWrapper">
        <div class="org" :title="deptNameStr">
          <span class="org_cell" v-for="(item,index) in deptNameList" :key="index">{{item}}</span>
        </div>
        <div class="des">
          <p class="des_title">
            <span class="title_icon"></span>
            <span>责任领导：</span>
            <span class="title_text">{{responsibleLeader}}</span>
          </p>
          <p class="des_title">
            <span class="title_icon"></span>
            <span>原文描述</span>
          </p>
          <p class="des_content">{{originalDesc}}</p>
        </div>
        <div class="des bordertop">
          <p class="des_title">
            <span class="title_icon"></span>
            <span>完成趋势</span>
          </p>
          <div class="charts">
            <MyLines :id="line.id" :clazz="line.class" :option="line.option" :dataObj="dataObj"></MyLines>
          </div>
        </div>
        <div class="des bordertop">
          <p class="des_title">
            <span class="title_icon"></span>
            <span>完成情况</span>
          </p>
          <!-- <p class="des_content">{{description}}</p> -->
          <div class="finish_cell" v-for="(item,index) in fillRecords" :key="index">
            <p class="finish_title">
              <span>{{item.deptName}}</span>
              <span class="time_txt">{{item.createTime.split('T')[0]}}</span>
            </p>
            <p class="finish_content">{{item.achievement}}</p>
          </div>
        </div>
        <div class="option bordertop">
          <ul>
            <li v-for="(item,index) in commentRecords" :key="index">
              <div v-if="item.isCurrentUser">
                <div class="time">
                  <span>{{timeFormatting(item.createTime)}}</span>
                  <!-- <span v-if="item.indexValue">指标值{{item.indexValue}}</span> -->
                </div>
                <div style="display: flex;float: left">
                  <div class="icon">
                    <img src="../../assets/img/usericon1.png" />
                  </div>
                  <div class="othertips">
                    <p class="user">{{item.leaderName}}</p>
                    <p class="tips">{{item.content}}</p>
                  </div>
                </div>
              </div>
              <div style="clear: both"></div>
              <div v-if="!item.isCurrentUser">
                <div class="time">
                  <span>{{timeFormatting(item.createTime)}}</span>
                  <!-- <span v-if="item.indexValue">指标值:{{item.indexValue}}</span> -->
                </div>
                <div style="display: flex; float: right">
                  <div class="ownertips">
                    <span class="triangle"></span>
                    <p class="user">{{item.leaderName}}</p>
                    <p class="tips">{{item.content}}</p>
                  </div>
                  <div class="icon">
                    <img src="../../assets/img/usericon1.png" />
                  </div>
                </div>
              </div>
              <div style="clear: both"></div>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="footer_select">
          <el-checkbox-group v-model="sendTypeChecks" class="dialog-checkbox">
            <el-checkbox label="1">站内提醒</el-checkbox>
            <el-checkbox label="2">邮件提醒</el-checkbox>
            <el-checkbox label="3">短信提醒</el-checkbox>
          </el-checkbox-group>
          <el-select
            v-model="selectPerson"
            collapse-tags
            multiple
            placeholder="请选择抄送人"
            class="dialog-select"
          >
            <el-option
              v-for="(item,index) in personOptions"
              :key="index"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <el-input placeholder="请输入内容" v-model="msgValue">
          <el-button slot="append" @click="sendMessages">发送</el-button>
        </el-input>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as jdChart from '@/components/Echarts/index.js'
import Api from '@/api/api'
export default {
  name: 'resultDialog',
  data () {
    return {
      datatype: 1,
      name: '',
      docNameList: '',
      deptNameStr: '',
      deptNameList: [],
      msgValue: '',
      itemData: '',
      line: {
        id: 'line',
        class: '',
        option: {
          style: 'width:100%;height:100%;z-index:1'
        }
      },
      dataObj: {
        legend: [
          { name: '实际完成率', key: 'actual' },
          { name: '计划完成率', key: 'plan' }
        ],
        xAxisList: [],
        dataList: []
      },
      // optionList: [],
      commentRecords: [],
      fillRecords: [],
      originalDesc: '',
      description: '',
      responsibleLeader: '',
      sendTypeChecks: ['1'],
      selectPerson: [], // 选中的抄送部门
      personOptions: [] // 抄送人部门列表
    }
  },
  components: {
    ...jdChart
  },
  mounted () {
    console.log('dialog mounted')
  },
  methods: {
    timeFormatting (time) {
      return time.split('T')[0] + ' ' + time.split('T')[1]
    },
    // 获取页面指标详情
    queryTargetData (req) {
      this.itemData = req
      this.msgValue = ''
      this.getPoinerDetialData()
      this.getDepNameList()
    },
    // 发表意见
    sendMessages () {
      console.log(this.selectPerson)
      if (this.msgValue === '') {
        this.$message({
          message: '发送信息不能为空，请填写发送信息',
          type: 'warning'
          // duration: 0
        })
      } else if (this.sendTypeChecks.length == 0) {
        this.$message({
          message: '请选择发送方式',
          type: 'warning'
        })
      } else if (this.selectPerson.length == 0) {
        this.$message({
          message: '请选择抄送人',
          type: 'warning'
        })
      } else {
        let req = {
          content: this.msgValue,
          issuesId: this.itemData.id,
          deptIds: this.selectPerson
        }
        Api.setNewOptions(req)
          .then(res => {
            if (res.code == 200) {
              this.getPoinerDetialData()
              this.msgValue = ''
              this.sendTypeChecks = ['1']
              this.selectPerson = []
            } else {
              console.log('接口错误')
              this.$message.error('发送失败')
            }
          })
          .catch(error => {
            this.$message.error('发送失败')
            console.log(error.message)
          })
      }
    },
    // 处理echarts图表数据
    getLineChartData (data) {
      this.dataObj.xAxisList = data.timeList
      this.dataObj.dataList = [
        { key: 'actual', data: data.actualFinishDegree },
        { key: 'plan', data: data.planFinishDegree }
      ]
    },
    // 获取详细信息
    getPoinerDetialData () {
      let params = {
        issuesId: this.itemData.id
      }
      Api.getPoinerDetialData(params)
        .then(res => {
          var data = res.data
          if (data) {
            this.getLineChartData(data)
            this.docNameList = data.docNameList
            this.deptNameStr = data.deptNameList
            this.deptNameList = data.deptNameList
              ? data.deptNameList.split(',')
              : []
            this.originalDesc = data.originalDesc
            this.commentRecords = data.commentRecords
            this.fillRecords = data.fillRecords
            this.responsibleLeader = data.responsibleLeader
          } else {
            console.log('暂无数据')
          }
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 获取委办局列表
    getDepNameList () {
      let params = {
        issuesId: this.itemData.id
      }
      Api.getDepNameList(params).then(res => {
        let data = res.data
        let personOptions = []
        if (data) {
          data.map((item, index) => {
            personOptions.push({
              id: item.id,
              label: item.departName
            })
          })
        }
        console.log(personOptions)
        this.personOptions = personOptions
      })
    },
    // 关闭dialog
    closeDialog () {
      this.$store.commit('setDialogVisible', false)
      this.sendTypeChecks = ['1']
      this.selectPerson = []
    }
  }
}
</script>

<style lang="less">
.dialog-wrapper {
  .el-dialog {
    top: 0.5rem;
    width: 5.5rem;
    background: rgba(26, 79, 167, 1);
    // background: linear-gradient(rgba(50,107,226,1),rgba(50,107,226,1),rgba(1,58,127,1));
    // background: url("../../assets/img/dialogbg.png")no-repeat;
    // background-size: 100% 100%;
  }
  .el-dialog__title {
    color: #c5e2ff;
    font-size: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 0.5rem;
  }
  .el-dialog__close {
    color: rgba(143, 192, 243);
  }
  .el-dialog__body {
    height: 4.5rem !important;
    padding: 0.4rem 0.2rem 0.2rem 0.2rem;
  }
  .tipWrapper {
    height: 4.5rem;
    overflow-y: auto;
    overflow-x: hidden;
    .org {
      font-size: 0.14rem;
      height: 0.14rem;
      line-height: 0.14rem;
      text-align: center;
      color: #4ea5ff;
      margin: 0.1rem 0.15rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .org_cell {
        padding-right: 5px;
        margin-right: 5px;
        border-right: 1px solid #4ea5ff;
      }
      .org_cell:nth-last-child(1) {
        padding-right: 0;
        margin-right: 0;
        border-right: 0;
      }
    }
    .charts {
      height: 1.5rem;
      width: 100%;
      // background: url("../../assets/img/linebg.png") no-repeat;
      // background-size: 100% 100%;
    }
    .des {
      height: auto;
      min-height: 50px;
      width: 100%;
      color: #c6e2f4;
      text-align: justify;
      font-size: 0.14rem;
      // text-indent:.28rem;
      // margin: .1rem  0rem .15rem 0rem;
      padding-top: 0.1rem;
      word-break: break-all;
      border-bottom: 0.01rem solid rgba(39, 93, 184);
      .des_content {
        padding-left: 0.1rem;
        line-height: 0.2rem;
        margin-bottom: 0.1rem;
      }
    }
    .des_title {
      color: #5ea7f4;
      font-size: 0.12rem;
      margin-bottom: 0.05rem;
      overflow: hidden;
      span {
        float: left;
      }
      .title_icon {
        display: inline-block;
        width: 0.04rem;
        height: 0.14rem;
        background: rgba(78, 165, 255);
        border-radius: 0.02rem;
        margin-right: 0.06rem;
        margin-top: 0.02rem;
      }
    }
    .bordertop {
      border-top: 0.01rem solid rgba(9, 62, 151);
    }
    .option {
      li {
        width: 100%;
        height: auto;
        .time {
          height: 0.12rem;
          line-height: 0.12rem;
          text-align: center;
          font-size: 0.12rem;
          color: rgba(18, 44, 112);
          margin: 0.2rem 0 0.2rem 0;
        }
        .icon {
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 0.4rem;
          background-color: rgba(35, 105, 200);
          text-align: center;
          line-height: 0.5rem;
          img {
            width: 50%;
            height: 50%;
          }
        }
        .othertips {
          color: #8fc0f3;
          font-size: 0.14rem;
          background-image: url("../../assets/img/tips@3x.png");
          background-size: 100% 100%;
          width: 3rem;
          min-height: 0.8rem;
          margin-left: 0.1rem;
          .user {
            margin: 0.1rem 0 0 0.15rem;
          }
          .tips {
            word-break: break-all;
            font-size: 0.16rem;
            margin: 0rem 0.15rem 0.1rem 0.15rem;
          }
        }
        .ownertips {
          position: relative;
          // color: #8fc0f3;
          // font-size: .14rem;
          background-color: rgba(53, 118, 206);
          border-radius: 0.04rem;
          // background-image:url("../../assets/img/rightTips.png") ;
          // background-size: 100% 100%;
          width: 3rem;
          // min-height: .8rem;
          margin-right: 0.1rem;
          padding: 0.15rem;
          .user {
            color: rgba(18, 44, 112);
            font-size: 0.12rem;
          }
          .tips {
            word-break: break-all;
            font-size: 0.14rem;
            color: rgba(197, 226, 255);
          }
          .triangle {
            position: absolute;
            right: -0.1rem;
            top: 20%;
            width: 0;
            height: 0;
            border: 0.05rem solid;
            border-color: transparent transparent transparent rgba(53, 118, 206);
          }
        }
      }
    }
  }
  .tipWrapper::-webkit-scrollbar {
    width: 0.05rem;
  }
  .tipWrapper::-webkit-scrollbar-track {
    border-radius: 0.05rem;
    background: rgba(3, 130, 248, 0.08);
  }
  .tipWrapper::-webkit-scrollbar-thumb {
    border-radius: 0.05rem;
    background: rgba(3, 130, 248, 0.1);
  }
  .el-dialog__footer {
    background-color: rgba(53, 118, 206, 1);
    // border-top: 1rem solid rgba(0,174,255,1);
    box-shadow: 0 -0.1rem 0.2rem 0.05rem rgba(0, 0, 0, 0.15);
    padding: 0.1rem 0.15rem 0.15rem;
  }
  .dialog-footer {
    .el-input__inner {
      border: 0;
      background-color: rgba(22, 93, 190, 1);
      border-radius: 0.04rem 0 0 0.04rem;
      // background-image: url("../../assets/img/inputbg.png");
      // background-size: 100% 100%;
      color: rgba(197, 226, 255);
    }
    .el-select .el-input .el-select__caret {
      color: rgba(18, 44, 112);
    }
    .el-input__inner::-webkit-input-placeholder {
      color: rgba(18, 44, 112);
    }
    .el-input-group__append,
    .el-input-group__prepend {
      background-color: transparent;
      border: 0.01rem solid transparent;
    }
    .el-button {
      // height: 0.4rem;
      background-color: rgba(72, 139, 232);
      color: rgba(197, 226, 255);
      border-radius: 0 0.04rem 0.04rem 0;
      box-shadow: 0.01rem 0 0.1rem 0.01rem rgba(0, 0, 0, 0.1);
    }
    .footer_select {
      overflow: hidden;
      margin-bottom: 0.1rem;
      .el-input__inner {
        border-radius: 0.04rem;
      }
      .dialog-checkbox {
        float: left;
        line-height: 0.4rem;
        width: 65%;
        text-align: left;
        .el-checkbox {
          color: rgba(197, 226, 255);
          margin-right: 0.15rem;
        }
      }
      .dialog-select {
        float: left;
        width: 35%;
      }
    }
  }
}
.el-checkbox__inner {
  background-color: rgba(26, 79, 167);
  border: 0.01rem solid rgba(26, 79, 167);
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: rgba(26, 79, 167);
  border-color: rgba(26, 79, 167);
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: rgba(197, 226, 255);
}
.el-select-dropdown {
  background-color: #1750b9;
  border: 0.01rem solid rgba(26, 79, 167);
}
.el-select-dropdown__item {
  color: #8bbcf1;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #2169ca;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover {
  background-color: #2169ca;
  color: #8bbcf1;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  background-color: #1750b9;
  color: #8bbcf1;
}
.el-popper[x-placement^="bottom"] {
  margin-top: 0.06rem;
  border: 0;
}
.el-popper[x-placement^="bottom"] .popper__arrow,
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: rgba(26, 79, 167);
}
.el-popper[x-placement^="top"] .popper__arrow,
.el-popper[x-placement^="top"] .popper__arrow::after {
  border-top-color: rgba(26, 79, 167);
}
.el-select .el-tag {
  background-color: #2169ca;
  border: 0;
}
.el-select__tags-text {
  color: #8fbcf9;
}
.el-select .el-tag__close.el-icon-close,
.el-select .el-tag__close.el-icon-close:hover {
  background-color: #165dbe;
  color: rgba(197, 226, 255);
}
.el-message .el-icon-warning,
.el-message .el-icon-error {
  font-size: 0.16rem;
}
.finish_cell {
  margin-bottom: 0.1rem;
}
.finish_cell .finish_title {
  font-size: 0.14rem;
  padding-left: 0.1rem;
  line-height: 0.25rem;
}
.finish_cell .time_txt {
  color: rgb(18, 44, 112);
  font-size: 0.12rem;
  margin-left: 0.1rem;
}
.finish_cell .finish_content {
  margin-left: 0.2rem;
}
.title_text{
  color: white;
}
</style>
