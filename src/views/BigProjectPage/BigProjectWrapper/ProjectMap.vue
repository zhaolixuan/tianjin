<template>
  <div class="map-box">
    <div class="map-bg" ></div>
    <div class="map-num">
      <p>
        <span>项目总数：</span>
        <span class="map-num-number map-project-number">{{projectNumber||0}}</span>
        <span class="map-num-unit">个</span>
      </p>
      <p>
        <span>告警数量：</span>
        <span class="map-num-number map-warning-number">{{warningNumber||0}}</span>
        <span class="map-num-unit">个</span>
      </p>
    </div>
    <div id="map_EC"></div>
    <div class="top-left"></div>
    <div class="top-right"></div>
    <div class="bottom-left"></div>
    <div class="bottom-right"></div>
  </div>
</template>

<script>
import myTooltipC from './myTooltip'
import api from '@/api/api'
import {clearInterval} from 'timers'

export default {
  data () {
    return {
      // 地图标注用色
      legendColor: ['#FC9E50', '#FFC26D', '#03F1C3', '#FFF3A3', '#ADFBFF', '#ADFBFD', '#ADFBFB'], // this.$store.state.bigproject.legendColor,
      // 存储告警项目id
      warningIds: [],
      // 地图JSON
      // newGeoJson: {"type": "FeatureCollection", "features": [{"type":"Feature","properties":{"name":"冷水江市","id":"431381"},"geometry":{"type":"MultiPolygon","coordinates":[[[[116.685115,36.99168],[116.873688,36.722787],[117.216337,36.732506],[117.313498,37.081559],[116.685115,36.99168]]]]}}]},
      newGeoJson: this.$store.state.bigproject.mapJson,
      // 请求告警数据定时器
      warningTimer: null,
      EC: null,
      myTooltip: null
    }
  },
  computed: {
    projectNumber: function () {
      return this.$store.state.bigproject.projectNumber
    },
    warningNumber: function () {
      return this.$store.state.bigproject.warningNumber
    },
    listData: function () {
      return this.$store.state.bigproject.listData
    },
    // 存储地图展示节点的数据
    pointData: function () {
      return this.$store.state.bigproject.pointData
    },
    geoCoordMap: function () {
			console.log(this.$store.state.bigproject.geoCoordMap)
      return this.$store.state.bigproject.geoCoordMap
    },
    checkedProjectId: function () {
      if (this.$store.state.bigproject.checkedProjectId) {
        return this.$store.state.bigproject.checkedProjectId
      } else {
        if (this.$store.state.bigproject.pointData[0]) {
          return this.$store.state.bigproject.pointData[0].id
        }
      }
    },
    // 获取地图标注
    legendData: function () {
      let data = this.$store.state.bigproject.listData[0] ? this.$store.state.bigproject.listData[0].data : []
      let legendData = []
      for (let i = 0; i < data.length; i++) {
        legendData.push({
          name: data[i].stageName,
          color: this.legendColor[i]
        })
      }
      return legendData
    }
  },
  created () {
    // api.getZsProjectPoints().then(res=>{
    //     this.$store.commit('setGeoCoordMap',res.geoCoordMap || {})
    //     this.$store.commit('setPointData',res.pointData || [])
    //     this.$store.commit('setProjectNumber',res.size)
    // }).catch(error=>{
    //     console.log(error)
    // });
    // this.getWarningData()
    // if(this.warningTimer){
    //     clearInterval(this.warningTimer);
    //     this.warningTimer = null;
    // }
    // this.warningTimer = setInterval(this.getWarningData,1800000);
  },
  watch: {
    '$store.state.bigproject.checkedProjectId': function (nextValue, oldValue) {
      // console.log('监听到id发生改变！！！')
      // console.log(this.pointData)
      this.showToolTip(nextValue)
    },
    listData: function (nextValue, oldValue) {
      api.getZsProjectPoints().then(res => {
				console.log(res.pointData)
        this.$store.commit('setGeoCoordMap', res.geoCoordMap || {})
        this.$store.commit('setPointData', res.pointData || [])
        this.$store.commit('setProjectNumber', res.size)
      })
      this.getWarningData()
      if (this.warningTimer) {
        clearInterval(this.warningTimer)
        this.warningTimer = null
      }
      this.warningTimer = setInterval(this.getWarningData, 1800000)
    }
  },
  mounted () {
    let box = document.getElementById('map_EC')
    this.EC = this.$echarts.init(box)
    this.myTooltip = new myTooltipC('map_EC')
    this.$echarts.registerMap('jinan', this.newGeoJson)
    let mapOption = this.getMapOption(this.pointData, this.geoCoordMap)
    this.EC.setOption(mapOption, true)
    this.showToolTip(this.checkedProjectId)
    this.echartClickListening()
  },
  updated () {
    // console.log('updated')
    let box = document.getElementById('map_EC')
    this.EC = this.$echarts.init(box)
    this.myTooltip = new myTooltipC('map_EC')
    this.$echarts.registerMap('jinan', this.newGeoJson)
    let mapOption = this.getMapOption(this.pointData, this.geoCoordMap)
    this.EC.setOption(mapOption, true)
    this.showToolTip(this.checkedProjectId)
    this.echartClickListening()
  },
  methods: {
    // 地图数据初始化
    getMapOption: function (data, geoCoordMap) {
      let mapboxWidth = $('.map-box').eq(0).width()
      let mapboxHeight = $('.map-box').eq(0).height()
      // 根据屏幕分辨率设置地图左边距离
      let wH = window.innerHeight// 当前窗口的高度
      let wW = window.innerWidth// 当前窗口的宽度
      console.log(wH / wW)
      let mapbgWidth = $('.map-bg').eq(0).width() // 地图图片width
      let mapbgHeight = $('.map-bg').eq(0).height() // 地图图片left
      // 地图偏移left(居中)
      let mapbgLeft = (mapboxWidth - mapbgWidth) / 2
      // 根据业务情况微调
      let geoLeft = mapbgLeft * 1
      if (wH / wW > 0.5) { // 0.5625
        geoLeft = mapbgLeft * 1.4
      }
      // 地图偏移top
      let geoTop = (mapboxHeight - mapbgHeight) / 8
      let self = this
      return {
        title: {},
        tooltip: {
          trigger: 'item',
          triggerOn: 'click',
          backgroundColor: 'transparent',
          position (pos) { // pos为选中点在画布上的坐标
            // console.log('选中节点的坐标')
            // console.log(pos)
            let newpos = [pos[0] * 2, pos[1] * 2] // 为解决画布内容模糊问题，像素值增大两倍
            let position = self.myTooltip.getPosOrSize('pos', newpos) // 弹出框上连接点的位置
            return [-mapboxWidth / 2 + 40, -mapboxHeight / 2 + 20] // 弹出框画布的位置
          },
          formatter (params) {
            // let text = `${params.data.project?params.data.project:''}\n${params.data.money?params.data.money:0}亿元\n\n当前进展：${params.data.areaStatus?params.data.areaStatus:''}\n开工时间：${params.data.startTime?params.data.startTime:''}\n预计投产时间：${params.data.endTime?params.data.endTime:''}\n责任人：${params.data.person?params.data.person:''}`
            let textarr = [`${params.data.project ? params.data.project : '-'}`, `${params.data.money ? params.data.money : '-'}`, `亿元`, `当前进展：${params.data.areaStatus ? params.data.areaStatus : '-'}\n开工时间：${params.data.startTime ? params.data.startTime : '-'}\n预计投产时间：${params.data.endTime ? params.data.endTime : '-'}\n责任人：${params.data.person ? params.data.person : '-'}`]
            let tooltipDom = self.myTooltip.getTooltipDom(textarr)
            return tooltipDom
          }
        },
        legend: {
          width: 10,
          height: 10,
          itemWidth: 10,
          itemHeight: 10,
          right: 20,
          bottom: 20,
          data: self.legendData.map(function (i) {
            return i.name
          }),
          textStyle: {
            color: '#A5DCFF'
          }
        },
        geo: {
          map: 'jinan',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: 'rgba(0,0,0,0)',
              borderColor: 'rgba(0,0,0,0)',
              // borderWidth:1,
            },
            emphasis: {
              areaColor: 'rgba(0,0,0,0)'
            }
          },
          left: geoLeft,
          top: geoTop
        },
        series: self.getMapSeries(data, geoCoordMap)
      }
    },
    // 请求告警项目, 待修改：告警项目是否拼接到其他项目的数据中？
    getWarningData: function () {
      let self = this
      api.getZsProjectPoints({warn: 'warn'}).then(res => {
        // console.log(res)
        // this.$store.commit('setGeoCoordMap',res.geoCoordMap || {})
        // this.$store.commit('setPointData',res.pointData || [])
        this.$store.commit('setWarningNumber', res.size)
      })
    },
    /**
     * 处理地图上节点数据
     * @param {Array[Object]} data 地图展示节点的业务数据pointData
     * @param {Array[Object]} geoCoordMap 地图所有节点的坐标数据
     * @param {String} stageStr 当前项目的进度（地图展示的维度）
     */
    convertData: function (data, geoCoordMap, stageStr) {
      let res = []
      for (let i = 0; i < data.length; i++) {
        let geoCoord = geoCoordMap[data[i].name]
        if (geoCoord) {
          // console.log('地图节点坐标：')
          // console.log(geoCoord)
          if (stageStr === data[i].stageStr) {
            res.push({
              name: data[i].name,
              value: geoCoord, // 节点坐标
              id: data[i].id,
              project: data[i].project,
              money: data[i].money,
              startTime: data[i].startTime,
              endTime: data[i].endTime,
              stage: data[i].stageStr,
              areaStatus: data[i].areaStatus,
              person: data[i].person
            })
          }
        }
      }
      return res
    },
    // 处理地图series数据
    getMapSeries: function (data, geoCoordMap) {
      let series = []
      let legendData = this.legendData
      for (let i = 0; i < legendData.length; i++) {
        series.push(
          {
            name: legendData[i].name,
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: this.convertData(data, geoCoordMap, legendData[i].name),
            symbol: 'rect',
            showEffectOn: false,
            rippleEffect: false,
            hoverAnimation: false,
            markPoint: {
              data: this.getImportsData(data, geoCoordMap, legendData[i].name),
              symbolSize: [14, 14], // 宽高
              symbolOffset: [0, -14], // 偏移
              silent: true // 不触发点击事件
            },
            label: { // 文字
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              }
            },
            itemStyle: { // 标志
              normal: {
                color: legendData[i].color
              }
            },
            zlevel: 1
          }
        )
      }
      return series
    },
    // 获取告警项目和重点项目坐标数据
    getImportsData: function (data, geoCoordMap, stageStr) {
      let res = []
      let ids = [] // 保存已标记的项目id（同一个项目只标记一次）
      let importSvg = 'path://M6.69552368,0.43986143 C6.98016799,-0.146620477 7.44534174,-0.146620477 7.72998605,0.43986143 L9.09923979,3.26338013 C9.38388411,3.84986204 10.1370453,4.40673328 10.7731967,4.50081872 L13.8350333,4.95357509 C14.4711847,5.04766055 14.6149397,5.49850657 14.1545418,5.95508368 L11.9389966,8.15248042 C11.4785987,8.60905753 11.1910889,9.51027198 11.2995021,10.1545424 L11.8224644,13.2579295 C11.9313551,13.9026775 11.5545357,14.1811131 10.9857247,13.87641 L8.24673964,12.4111605 C7.67792861,12.1069349 6.74662593,12.1069349 6.1778149,12.4111605 L3.43882982,13.87641 C2.87001879,14.1811131 2.4931994,13.9026775 2.60209017,13.2579295 L3.12505245,10.1545424 C3.23394323,9.51027198 2.94595577,8.60905753 2.48555794,8.15248042 L0.26953513,5.95508368 C-0.19086271,5.49850657 -0.0466301919,5.04813814 0.589043584,4.95357509 L3.65135785,4.50081872 C4.28750921,4.40673326 5.04067043,3.84986202 5.32531473,3.26338013 L6.69552368,0.43986143 Z'
      let warnSvg = 'path://M15.842724,11.5642563 L8.96058129,0.507699055 C8.50929324,-0.169233018 7.49389513,-0.169233018 7.04260708,0.507699055 L0.160464326,11.5642563 C-0.290823723,12.3540103 0.273286339,13.2565864 1.06304042,13.2565864 L14.7145039,13.2565864 C15.729902,13.2565864 16.2940121,12.3540103 15.842724,11.5642563 Z M8.05800519,11.2257902 C7.71953915,11.2257902 7.49389513,11.0001462 7.49389513,10.6616802 C7.49389513,10.3232141 7.71953915,10.0975701 8.05800519,10.0975701 C8.39647122,10.0975701 8.62211525,10.3232141 8.62211525,10.6616802 C8.62211525,11.0001462 8.39647122,11.2257902 8.05800519,11.2257902 Z M8.62211525,8.63088394 C8.62211525,8.96934998 8.39647122,9.194994 8.05800519,9.194994 C7.71953915,9.194994 7.49389513,8.96934998 7.49389513,8.63088394 L7.49389513,5.24622357 C7.49389513,4.90775754 7.71953915,4.68211351 8.05800519,4.68211351 C8.39647122,4.68211351 8.62211525,4.90775754 8.62211525,5.24622357 L8.62211525,8.63088394 Z'
      for (let i = 0; i < data.length; i++) {
        let geoCoord = geoCoordMap[data[i].name]
        if (geoCoord) {
          if (stageStr === data[i].stageStr && !ids.includes(data[i].id)) {
            if (this.warningIds.includes(data[i].id)) {
              // console.log('该项目是告警项目')
              res.push({
                name: '告警项目',
                coord: geoCoord, // 项目坐标
                symbol: warnSvg,
                itemStyle: {
                  color: 'rgb(198, 0, 0)'
                }
              })
              ids.push(data[i].id)
            } else if (data[i].imports) {
              // console.log('该项目是重点项目')
              res.push({
                name: '重点项目',
                coord: geoCoord, // 项目坐标
                symbol: importSvg,
                itemStyle: {
                  color: 'rgb(255, 254, 0)'
                }
              })
              ids.push(data[i].id)
            }
          }
        }
      }
      return res
    },
    // 根据id展示地图某一节点信息
    showToolTip: function (id) {
      // console.log('展示节点id为：'+id)
      let index = 0
      let seriesIndex = 0
      let name = ''
      for (let i = 0; i < this.pointData.length; i++) {
        if (this.pointData[i].id === id) {
          name = this.pointData[i].stageStr
        }
      }
      seriesIndex = this.legendData.map(function (l) {
        return l.name
      }).indexOf(name)
      let projectsForName = []
      for (let i = 0; i < this.pointData.length; i++) {
        if (name === this.pointData[i].stageStr) {
          projectsForName.push(this.pointData[i])
        }
      }
      for (let j = 0; j < projectsForName.length; j++) {
        if (projectsForName[j].id === id) {
          index = j
        }
      }
      this.EC.dispatchAction({
        type: 'showTip',
        seriesIndex: seriesIndex,
        dataIndex: index
      })
    },

    // 选中地图上节点时同步选中项目列表中的该项目
    echartClickListening: function () {
      // console.log('在该map组件中，1.负责获取id并调用showToolTip方法，展示弹窗；2.监听点击地块事件，更新vuex中的projectId数据')
      let self = this
      this.EC.on('click', function (params) {
        // console.log('选中地图上的节点：')
        // console.log(params)
        if (params.data) {
          if (params.data.project) {
            let projectId = params.data.id
            // console.log('选中的id为：'+projectId)
            self.showToolTip(projectId)
            // 修改vuex中的projectId
            self.$store.commit('changeCheckedId', projectId)
          }
        }
      })
    }
  }
}
</script>

<style>
.map-box{
    width: 100%;
    height: 100%;
    /* background: rgba(15,126,255,0.05); */
    /* background: url(../../../assets/img/big_project_bg.gif) center 100% no-repeat; */
    /* background: url(../../../assets/img/big_project_mapbg.png) center 100% no-repeat; */
    background-size: 100% 100%;
    position: relative;
}
.map-box .top-left{
    width: .12rem;
    height: .10rem;
    border-top: .02rem solid #00B2FF;
    border-left: .02rem solid #00B2FF;
    position: absolute;
    top: 0;
    left: 0;
}
.map-box .top-right{
    width: .12rem;
    height: .10rem;
    border-top: .02rem solid #00B2FF;
    border-right: .02rem solid #00B2FF;
    position: absolute;
    top: 0;
    right: 0;
}
.map-box .bottom-left{
    width: .12rem;
    height: .10rem;
    border-bottom: .02rem solid #00B2FF;
    border-left: .02rem solid #00B2FF;
    position: absolute;
    bottom: 0;
    left: 0;
}
.map-box .bottom-right{
    width: .12rem;
    height: .10rem;
    border-bottom: .02rem solid #00B2FF;
    border-right: .02rem solid #00B2FF;
    position: absolute;
    bottom: 0;
    right: 0;
}
.map-box .map-bg{
    width: 8rem;
    height: 6.76rem;
    background: url(../../../assets/img/tianjinNewMap.png) 50% 40% no-repeat;
    background-size: cover;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%) scale(1.1);
}
.map-box .map-num{
    position: absolute;
    top: .46rem;
    left: .46rem;
    font-size: .18rem;
    color: #A5DCFF;
    margin-bottom: .10rem;
}
.map-num-number{
    font-size: .20rem;
    color: #ECF4FF;
}
.map-num-unit{
    font-size: .14rem;
}
.map-tooltip{
    width: 2.22rem;
    height: 2.23rem;
    font-size: .14rem;
    color: #ECF4FF;
    border: .01rem solid rgba(0,157,255,0.6);
    box-shadow: 0rem 0rem .30rem rgba(0,144,255,0.72) inset;
    background: rgba(15,126,255,0.1);
    position: absolute;
    top: 1.80rem;
    left: .97rem;
    padding: .24rem .30rem;
}
.map-tootip-title{
    font-size: .16rem;
    line-height: .20rem;
    margin-bottom: .05rem;
}
.map-tootip-money{
    font-size: .18rem;
    line-height: .22rem;
}
.map-tootip-unit{
    font-size: .14rem;
}
.map-tooltip-top{
    padding-bottom: .15rem;
    position: relative;
}
.map-tooltip-top .row-line{
    width: 100%;
    height: .02rem;
    background-image: url(../../../assets/img/row_line.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
    left: 0;
}
.map-tooltip-bottom p{
    margin-top: .15rem;
}
#map_EC{
    width: 90%;
    height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%) scale(1.1);
}
#tCanvas{
    transform:scale(0.5)
}
</style>
