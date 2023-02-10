<template>
  <div class="project-list">
    <div class="project-scroll">
      <div v-for="(data,index) in listData" :key="index" class="project-ratio" :class="{checked:projectChecked(data.id)}" :projectid="data.id"  @click="handleCheckProject(data.id)">
        <div class="project-ratio-title">
                    <span class="project-title-name">
                        <i class="iconfont iconiconxiangmu"></i>
                        <span class="project-name">{{data.projectName}}</span>
                    </span>
          <span class="project-title-person" hidden>
                            <i class="iconfont iconiconzerenren"></i>
                            <span>责任人：</span>
                            <span class="project-person">{{data.chargePerson}}</span>
                    </span>
        </div>
        <div class="project-ratio-content">
          <div v-for="(stageData,i) in data.data" :key="i" class="project-content-stage">
            <div v-if="stageData.nextDay" class="stage-next">{{stageData.nextDay}}天</div>
            <div class="stage-base" @click="handleClickStage(data.id,stageData.stageName)">
              <transition
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
              >
                <div class="stage-mask" v-if="showStage(data.id,stageData.stageName)">
                  <div class="stage-middlecircle"></div>
                  <div class="stage-items">
                    <div v-for="(item,index) in subStages" :key="index" class="stage-subitem" :class="[{light:item.finish},item.positionClass]" >
                      <div class="stage-outcirle"></div>
                      <div class="stage-subtext" :title="item.name">{{item.name.slice(0,4)}}</div>
                    </div>
                  </div>
                </div>
              </transition>
              <div class="stage-rate" :rate="stageData.stageRate||0"></div>
              <div class="stage-point"></div>
            </div>
            <div class="stage-name">{{stageData.stageName}}</div>
            <div class="stage-time">{{stageData.stageTime}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      // checkedIndex: 0,
      checkTimer: null,
      checkedStageName: null
    }
  },
  created () {
    api.getProjectZs().then(res => {
      this.$store.commit('setListData', res || [])
    }).catch(error => {
      console.log(error)
    })
  },
  mounted () {
    this.handleCheckProject(this.firstDataId)
    this.renderStage()
  },
  updated () {
    // console.log('list updated')
    // this.handleCheckProject(this.firstDataId)
    this.renderStage()
  },
  destroyed () {
    if (this.checkTimer) { // 关闭自动选中功能
      clearInterval(this.checkTimer)
      this.checkTimer = null
    }
  },
  computed: {
    listData () {
      return this.$store.state.bigproject.listData
    },
    firstDataId () {
      if (this.$store.state.bigproject.listData && this.$store.state.bigproject.listData[0]) {
        return this.$store.state.bigproject.listData[0].id
      }
      return 0
    },
    checkedId: {
      get () {
        if (this.$store.state.bigproject.checkedProjectId) {
          return this.$store.state.bigproject.checkedProjectId
        } else if (this.$store.state.bigproject.listData && this.$store.state.bigproject.listData[0]) {
          return this.$store.state.bigproject.listData[0].id
        }
      },
      set (value) {
        return value
      }
    },
    subStages: function () {
      let datas = this.$store.state.bigproject.subStages
      let length = datas.length
      let newData = []
      datas.map((item, index) => {
        let className = 'position' + length + '-' + (index + 1)
        newData.push(item)
        newData[index]['positionClass'] = className
      })
      return newData
    }
  },
  watch: {
    '$store.state.bigproject.checkedProjectId': function (nextValue, oldValue) {
      // console.log('List监听到id发生改变！！！')
      this.checkedId = nextValue
      this.handleCheckProject(nextValue)
    }
  },
  directives: { // 自定义指令
  },
  methods: {
    // 判断项目是否是选中状态
    projectChecked: function (id) {
      if (id === this.checkedId) {
        return true
      }
      return false
    },
    // 判断阶段节点是否是选中状态
    showStage: function (projectId, stageName) {
      if (this.checkedId === projectId && this.checkedStageName === stageName) {
        return true
      }
      return false
    },
    // 渲染阶段节点环形进度
    renderStage: function () {
      let self = this
      $('.stage-rate').each(function (i) {
        self.$echarts.init($(this)[0]).setOption(self.getOption($(this).attr('rate')))
        if ($(this).attr('rate') !== '0') {
          $(this).next().css('opacity', 1)
        }
      })
    },
    // 手动选中项目
    handleCheckProject: function (id) {
      this.checkedId = id // 当前选中的project：id
      this.$store.commit('changeCheckedId', id) // 将选中的projectId存入vuex，以便map组件获取
      if (this.checkTimer) { // 关闭自动选中功能
        clearInterval(this.checkTimer)
        this.checkTimer = null
      }
      let self = this
      let index = 0 // 当前选中的index：'+index
      $('.project-ratio').each(function (i) {
        if ($('.project-ratio').eq(i).attr('projectid') === id) {
          index = i
        }
      })
      this.getScrollTop(false, $('.project-ratio').eq(index)[0]) // 滚动条自动定位
      this.checkTimer = setInterval(function () { // 开启自动选中功能
        if (index < self.listData.length - 1) {
          index++
          self.checkedStageName = null
          self.getScrollTop(false, $('.project-ratio').eq(index)[0]) // 滚动条自动定位
        } else {
          index = 0
          self.checkedStageName = null
          self.getScrollTop(true, $('.project-ratio').eq(index)[0]) // 滚动条自动定位
        }
        self.$store.commit('changeCheckedId', $('.project-ratio').eq(index).attr('projectid')) // 将选中的projectId存入vuex，以便map组件获取
      }, 5000)
    },

    // 点击阶段节点
    handleClickStage: function (projectId, stageName) {
      if (this.checkedId === projectId && this.checkedStageName === stageName) {
        this.checkedId = null
        this.checkedStageName = null
      } else {
        this.checkedId = null
        this.checkedStageName = null
        api.getZsJieduans({id: projectId, name: stageName}).then(res => {
          if (res.subStageData.length) {
            this.$store.commit('setSubStages', res.subStageData)
            this.checkedId = projectId
            this.checkedStageName = stageName
          } else {
            this.checkedId = null
            this.checkedStageName = null
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },

    /**
       * 环形进度条初始化
       * @param {num/str} tips 完成进度(0~100)
       */
    getOption: function (tips) {
      return {
        series: [{
          name: 'stage',
          type: 'pie',
          radius: ['100%', '85%'],
          hoverAnimation: false,
          label: {
            normal: {
              show: false
            }
          },
          data: [{
            value: tips,
            itemStyle: {
              normal: {
                color: {
                  colorStops: [{
                    offset: 0,
                    color: '#00FFF4'
                  }, {
                    offset: 1,
                    color: '#0083FF'
                  }]
                }
              }
            }
          }, {
            value: 100 - tips,
            itemStyle: {
              color: '#0C2C5D'
            }
          }],
        }]
      }
    },

    /**
       * 滚动条自动滚动
       * @param {bool} gotop true：回到顶部，false：往下一屏
       * @param {dom} target 当前选中的元素
       */
    getScrollTop: function (gotop, target) {
      if (gotop) {
        // console.log('回到顶部')
        $('.project-scroll').animate({scrollTop: 0}, 1000)
      } else {
        var screenHight = parseInt($('.project-list')[0].clientHeight) // 可视窗口高度
        var firstHeight = $('.project-ratio').eq(0)[0] ? parseInt($('.project-ratio').eq(0)[0].offsetTop) : 0 // 第一个元素距离顶部的距离
        var topHeight = target ? parseInt(target.offsetTop) : 0 // 当前元素距离父容器顶部的距离
        var thisHeight = target ? parseInt(target.offsetHeight) : 0 // 当前元素的高度
        var scrollHight = parseInt($('.project-scroll').scrollTop()) // 滚动条已经滚动的距离
        if ((screenHight + 2 < topHeight - firstHeight - scrollHight + thisHeight) || (scrollHight > topHeight - firstHeight)) {
          // console.log('不在可视范围内,定位到当前选中元素的位置')
          $('.project-scroll').animate({scrollTop: topHeight - firstHeight}, 1000);
        }
      }
    }
  }
}
</script>

<style scoped>
.project-list{
    height: 80%;
    overflow: hidden;
}
.project-scroll{
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
.project-scroll::-webkit-scrollbar{
    width:0;
}
.project-ratio{
    height: 33.3%;
    box-sizing: border-box;
    padding: .25rem .35rem .35rem .20rem;
    border: .01rem solid rgba(15,126,255,0);
    overflow: hidden;
}
.project-list .checked{
    border: .01rem solid rgba(0,117,255,0.5);
    box-shadow: 0rem 0rem .20rem rgba(0,87,154,0.72) inset;
    background: -moz-linear-gradient(top, rgba(0,117,255,0.2) 0%, rgba(0,117,255,0.05) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,117,255,0.2)), color-stop(100%,rgba(0,117,255,0.05)));
    background: -webkit-linear-gradient(top, rgba(0,117,255,0.2) 0%,rgba(0,117,255,0.05) 100%);
    background: -o-linear-gradient(top, rgba(0,117,255,0.2) 0%,rgba(0,117,255,0.05) 100%);
    background: -ms-linear-gradient(top, rgba(0,117,255,0.2) 0%,rgba(0,117,255,0.05) 100%);
    background: linear-gradient(to bottom, rgba(0,117,255,0.2) 0%,rgba(0,117,255,0.05) 100%);
}
.project-ratio .project-ratio-title{
    color: #A5DCFF;
    font-size: .18rem;
    line-height: .22rem;
}
.project-ratio .project-title-name{
    margin-right: .20rem;
}
.project-ratio .project-title-name i{
    font-size: .18rem;
}
.project-ratio .project-title-right{
    float: right;
}
.project-ratio .project-ratio-content{
    display: flex;
    margin-top: .52rem;
    margin-left: .20rem;
}
.project-ratio .project-content-stage{
    flex: 1;
    position: relative;
    font-size: .14rem;
    text-align: center;
}
.project-ratio .stage-base{
    width: .26rem;
    height: .26rem;
    position: relative;
    margin-bottom: .15rem;
    left: 50%;
    top: 10%;
    transform: translate(-50%);
    cursor: pointer;
}
.project-ratio .stage-mask{
    width: 2.25rem;
    height: 1.15rem;
    background: -moz-linear-gradient(top, rgba(13,37,77,1) 0%, rgba(13,37,77,0.2) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(13,37,77,1)), color-stop(100%,rgba(13,37,77,0.2)));
    background: -webkit-linear-gradient(top, rgba(13,37,77,1) 0%,rgba(13,37,77,0.2) 100%);
    background: -o-linear-gradient(top, rgba(13,37,77,1) 0%,rgba(13,37,77,0.2) 100%);
    background: -ms-linear-gradient(top, rgba(13,37,77,1) 0%,rgba(13,37,77,0.2) 100%);
    background: linear-gradient(to bottom, rgba(13,37,77,1) 0%,rgba(13,37,77,0.2) 100%);
    position: absolute;
    left: 50%;
    bottom: 60%;
    transform: translate(-50%);
    border-radius: 1.15rem 1.15rem 0rem 0rem;
    border-top: .01rem solid rgba(124,255,249,0.3);
}
.project-ratio .stage-middlecircle{
    width: .54rem;
    height: .54rem;
    background: rgba(112,125,255,0.1);
    border-radius: 100%;
    position: absolute;
    left: 50%;
    bottom: -25%;
    transform: translate(-50%);
}
.project-ratio .stage-subitem{
    width: .40rem;
    height: .40rem;
    padding: .04rem;
    border-radius: 100%;
    border: .01rem solid rgba(255,255,255,0.5);
    box-shadow: 0rem 0rem .10rem rgba(255,255,255,0.5) inset;
    position: absolute;
    transform: translate(-50%,-50%);
}
.project-ratio .stage-outcirle{
    width: .55rem;
    height: .55rem;
    border-radius: 100%;
    border: .01rem solid rgba(255,255,255,0.2);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.project-ratio .stage-subtext{
    width: .40rem;
    font-size: .14rem;
    line-height: .18rem;
    color: rgba(255,255,255,0.5);
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    overflow: hidden;
}
.project-ratio .stage-subitem.light{
    border: .01rem solid rgba(0,243,228,0.8);
    box-shadow: 0rem 0rem .10rem rgba(0,243,228,0.6) inset;
}
.project-ratio .stage-subitem.light .stage-outcirle{
    border: .01rem solid rgba(0,243,228,0.2);
}
.project-ratio .stage-subitem.light .stage-subtext{
    color: rgba(0,243,228,0.8);
}

.project-ratio .stage-subitem.position2-1{
    left: 30%;
    top: 45%;
}
.project-ratio .stage-subitem.position2-2{
    left: 70%;
    top: 45%;
}

.project-ratio .stage-subitem.position3-1{
    left: 50%;
    top: 25%;
}
.project-ratio .stage-subitem.position3-2{
    left: 22%;
    top: 55%;
}
.project-ratio .stage-subitem.position3-3{
    left: 78%;
    top: 55%;
}

.project-ratio .stage-subitem.position4-1{
    left: 18.5%;
    top: 63.5%;
}
.project-ratio .stage-subitem.position4-2{
    left: 37.5%;
    top: 30%;
}
.project-ratio .stage-subitem.position4-3{
    left: 62.5%;
    top: 30%;
}
.project-ratio .stage-subitem.position4-4{
    left: 81.5%;
    top: 63.5%;
}

.project-ratio .stage-rate{
    width: .26rem;
    height: .26rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
}
.project-ratio .stage-point{
    width: .10rem;
    height: .10rem;
    background: #00E4F2;
    opacity: 0.23;
    border-radius: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.project-ratio .stage-point.latest-stage{
    background: #FFA600;
}
.project-ratio .stage-next{
    position: absolute;
    font-size: .14rem;
    color: #A2CEFD;
    border-bottom: .01rem solid #063393;
    width: 75%;
    right: -38%;
    line-height: .18rem;
}
.project-ratio .stage-name{
    color:#EAF1FF;
    margin-bottom: .05rem;
}
.project-ratio .stage-time{
    color: rgba(165,220,255,0.8);
}
</style>
