<!--
 * @Description:
 * @Author: tangjuncheng
 * @Date: 2019-12-11 09:51:24
 * @LastEditTime : 2020-01-13 11:25:28
 * @LastEditors  : tangjuncheng
 -->

<template>
  <div ref="myMapChart"
       style=" height: 100%;width: 100%;"></div>
</template>

<script>
import { mapGetters } from 'vuex'
import echarts from 'echarts'
import 'echarts-gl'
// import shequpoints from '../../../../../static/data/region/street/hexi_shequ_points.js'
import {
  getByParentId
} from '@/views/ProvideAged/apis/index.js'
import coordtransform from './coordtransform.js'
import * as turf from '@turf/turf'
export default {
  name: 'chartMap',
  props: {
  },
  data () {
    return {
      myChart: null,
      regionName: '',
      myClickLevel: 1
    }
  },
  computed: {
    ...mapGetters(['type', 'userType', 'userName', 'code'])
  },
  watch: {
    type (newType) {
      this.loadChart()
    }
  },
  methods: {
    initChart () {
      this.myChart = echarts.init(this.$refs.myMapChart)
      this.loadChart()
      this.clickEvent()
    },
    loadChart () {
      let myCode = this.code[0]
      let parentCode = this.code[1]
      if (this.type === 1) { // 1：河西区 2：片区 3：街道 4：社区
        this.getRegionChart()
      } else if (this.type === 2) {
        this.getPianQuMap(myCode)
      } else if (this.type === 3) {
        this.getStreetMap(myCode, parentCode)
      } else if (this.type === 4) {
        this.getSingleShequ(myCode, parentCode)
      }
    },
    clickEvent () {
      var _self = this
      _self.myChart.on('click', function (params) {
        let name = params.name
        let level = params.data.level
        let myparentCode = params.data.parent_code
        let myCode = params.data.code
        // if (enableClick === 'true') {
        _self.$store.commit('setCode', [params.data.code, params.data.parent_code])
        _self.$store.commit('setClickName', name)
        _self.$store.commit('setUserName', name)
        switch (level) {
          case 2:
            _self.getPianQuMap(myCode)
            // _self.$store.commit('setType', 1)
            break
          case 3:
            _self.getStreetMap(myCode, myparentCode)
            // _self.$store.commit('setType', 2)

            break
          case 4:
            _self.getSingleShequ(myCode, myparentCode)
            // _self.$store.commit('setType', 2)

            break
        }
        _self.$store.commit('setType', level)
      })
    },
    getOldMan (parentCode, code) {

    },
    /**
     * 获取片区地图
     */
    getRegionChart () {
      var _self = this
      fetch('../../../../../static/data/region/hexi_pianqu.json')
        .then(function (response) {
          return response.json()
        })
        .then(function (myJson) {
          let hexigeojson = JSON.parse(JSON.stringify(myJson))
          let registerMapName = 'tianjin_hexi_region' + Date.now.toString()
          echarts.registerMap(registerMapName, hexigeojson)
          var regionData = hexigeojson.features.map(function (feature) {
            var value = feature.properties.height
            return {
              enable_click: feature.properties.enableclick,
              code: feature.properties.code,
              level: 2,
              parent_code: feature.properties.parent_code,
              name: feature.properties.name,
              value: value * 10,
              height: Math.max(Math.sqrt(feature.properties.height), 0.1)
            }
          })
          let option = {
            visualMap: {
              show: false,
              min: 10,
              max: 30,
              left: '2%',
              // left: 'center',
              top: 'bottom',
              right: 'auto',
              bottom: 'auto',
              itemWidth: 25,
              itemHeight: 200,
              text: ['人口数量'],
              // calculable: true,
              inRange: {
                color: ['#59A4FB', '#4BBFEF', '#47ACF8', '#388FF5']
                // symbolSize: [25, 200]
              },
              backgroundColor: 'transparent',
              borderColor: '#ccc',
              textStyle: {
                fontSize: 28,
                color: '#388FF5'
              },
              formatter: function (value) {
                return value + '万人'
              }
            },
            series: [{
              type: 'map3D',
              map: registerMapName,
              viewControl: {
                // 投影方式，默认为透视投影'perspective'，也支持设置为正交投影'orthographic'。
                projection: 'perspective',
                // 是否开启视角绕物体的自动旋转查看。[ default: false ]
                autoRotate: false,
                // 物体自传的方向。默认是 'cw' 也就是从上往下看是顺时针方向，也可以取 'ccw'，既从上往下看为逆时针方向。
                autoRotateDirection: 'cw',
                // 物体自传的速度。单位为角度 / 秒，默认为10 ，也就是36秒转一圈。
                autoRotateSpeed: 10,
                // 在鼠标静止操作后恢复自动旋转的时间间隔。在开启 autoRotate 后有效。[ default: 3 ]
                autoRotateAfterStill: 3,
                // 鼠标进行旋转，缩放等操作时的迟滞因子，在大于等于 1 的时候鼠标在停止操作后，视角仍会因为一定的惯性继续运动（旋转和缩放）。[ default: 0.8 ]
                damping: 0,
                // 旋转操作的灵敏度，值越大越灵敏。支持使用数组分别设置横向和纵向的旋转灵敏度。默认为1, 设置为0后无法旋转。	rotateSensitivity: [1, 0]——只能横向旋转； rotateSensitivity: [0, 1]——只能纵向旋转。
                zoomSensitivity: 1,
                // 缩放操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法缩放。
                rotateSensitivity: 1,
                // 平移操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法平移。支持使用数组分别设置横向和纵向的平移灵敏度
                panSensitivity: 1,
                // 平移操作使用的鼠标按键，支持：'left' 鼠标左键（默认）;'middle' 鼠标中键 ;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)
                panMouseButton: 'left',
                // 旋转操作使用的鼠标按键，支持：'left' 鼠标左键;'middle' 鼠标中键（默认）;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)

                rotateMouseButton: 'left',
                // [ default: 100 ] 默认视角距离主体的距离，对于 grid3D 和 geo3D 等其它组件来说是距离中心原点的距离,对于 globe 来说是距离地球表面的距离。在 projection 为'perspective'的时候有效。
                distance: 100,
                // [ default: 40 ] 视角通过鼠标控制能拉近到主体的最小距离。在 projection 为'perspective'的时候有效。

                minDistance: 40,
                // [ default: 400 ] 视角通过鼠标控制能拉远到主体的最大距离。在 projection 为'perspective'的时候有效。

                maxDistance: 400,
                // 视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向。[ default: 40 ]
                alpha: 40,
                // 视角绕 y 轴，即左右旋转的角度。[ default: 0 ]
                beta: 15,
                // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
                minAlpha: 5,
                // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
                maxAlpha: 90,
                // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
                minBeta: -360,
                // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]
                maxBeta: 360,
                // 视角中心点，旋转也会围绕这个中心点旋转，默认为[0,0,0]。
                center: [0, 0, 10],
                // 是否开启动画。[ default: true ]
                animation: true,
                // 过渡动画的时长。[ default: 1000 ]
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut'
              },
              scaleLimit: { // 所属组件的z分层，z值小的图形会被z值大的图形覆盖
                min: 1.5, // 最小的缩放值
                max: 4 // 最大的缩放值
              },
              emphasis: { // 当鼠标放上去  地区区域是否显示名称
                itemStyle: {
                  areaColor: '#7db41b'// 鼠标移入地图配色
                }
              },
              label: {
                show: true,
                position: 'top',
                distance: 150,
                textStyle: {
                  color: '#000',
                  fontWeight: 'bolder',
                  fontSize: 16,
                  textBorderColor: '#fff',
                  textBorderWidth: 0,
                  backgroundColor: 'rgba(255,255,255,0.7)'
                },
                formatter: function (params) {
                  return params.name
                }
              },
              light: {
                main: {
                  intensity: 1,
                  shadow: true,
                  shadowQuality: 'low',
                  alpha: 40,
                  beta: 40
                },
                ambient: {
                  intensity: 0.4
                }
                // ambientCubemap: {
                //   diffuseIntensity: 1,
                //   texture: '/asset/get/s/data-1491896094618-H1DmP-5px.hdr'
                // }
              },
              groundPlane: {
                show: false
              },
              data: regionData,
              postEffect: {
                enable: false
              },
              itemStyle: {
                borderColor: '#051D5D',
                borderWidth: 1
              }
            }]
          }
          _self.myChart.clear()// 清空ECharts
          _self.myChart.setOption(option)
          setTimeout(function () {
            window.onresize = function () {
              _self.myChart.resize()
            }
          }, 200)
        })
    },
    getNewGeojson (features, parentName) {
      let featureCollection = {
        name: parentName + Date.now.toString(),
        type: 'FeatureCollection',
        features: []
      }
      features.forEach(feature => {
        featureCollection.features.push(feature)
      })
      return JSON.parse(JSON.stringify(featureCollection))
    },
    /**
     * 加载片区地图
     * parentCode 父级code
     */
    getPianQuMap (parentCode) {
      var _self = this
      let dataUrl = '../../../../../static/data/region/street/hexi_pianqu_street.json'
      fetch(dataUrl)
        .then(function (response) {
          return response.json()
        })
        .then(function (myJson) {
          let hexigeojson = JSON.parse(JSON.stringify(myJson))
          const filteredGeo = hexigeojson.features.filter(item => item.properties.parentCode === parentCode)
          let registerMapName = 'tianjin_hexi_streetmap' + Date.now.toString()
          let newGeojson = _self.getNewGeojson(filteredGeo, 'registerMapName')
          echarts.registerMap(registerMapName, newGeojson)
          var regionData = filteredGeo.map(function (feature) {
            return {
              code: feature.properties.code,
              parent_code: feature.properties.parentCode,
              name: feature.properties.name,
              value: feature.properties.height,
              level: 3,
              height: Math.max(Math.sqrt(feature.properties.height), 0.1)
            }
          })
          let option = {
            visualMap: {
              show: false,
              min: 1,
              max: 15,
              inRange: {// 由低到高
                color: ['#4BBFEF', '#47ACF8', '#388FF5']
              }
            },
            series: [{
              type: 'map3D',
              map: registerMapName,
              viewControl: {
                // 投影方式，默认为透视投影'perspective'，也支持设置为正交投影'orthographic'。
                projection: 'perspective',
                // 是否开启视角绕物体的自动旋转查看。[ default: false ]
                autoRotate: false,
                // 物体自传的方向。默认是 'cw' 也就是从上往下看是顺时针方向，也可以取 'ccw'，既从上往下看为逆时针方向。
                autoRotateDirection: 'cw',
                // 物体自传的速度。单位为角度 / 秒，默认为10 ，也就是36秒转一圈。
                autoRotateSpeed: 10,
                // 在鼠标静止操作后恢复自动旋转的时间间隔。在开启 autoRotate 后有效。[ default: 3 ]
                autoRotateAfterStill: 3,
                // 鼠标进行旋转，缩放等操作时的迟滞因子，在大于等于 1 的时候鼠标在停止操作后，视角仍会因为一定的惯性继续运动（旋转和缩放）。[ default: 0.8 ]
                damping: 0,
                // 旋转操作的灵敏度，值越大越灵敏。支持使用数组分别设置横向和纵向的旋转灵敏度。默认为1, 设置为0后无法旋转。	rotateSensitivity: [1, 0]——只能横向旋转； rotateSensitivity: [0, 1]——只能纵向旋转。
                zoomSensitivity: 1,
                // 缩放操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法缩放。
                rotateSensitivity: 1,
                // 平移操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法平移。支持使用数组分别设置横向和纵向的平移灵敏度
                panSensitivity: 1,
                // 平移操作使用的鼠标按键，支持：'left' 鼠标左键（默认）;'middle' 鼠标中键 ;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)
                panMouseButton: 'left',
                // 旋转操作使用的鼠标按键，支持：'left' 鼠标左键;'middle' 鼠标中键（默认）;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)

                rotateMouseButton: 'left',
                // [ default: 100 ] 默认视角距离主体的距离，对于 grid3D 和 geo3D 等其它组件来说是距离中心原点的距离,对于 globe 来说是距离地球表面的距离。在 projection 为'perspective'的时候有效。
                distance: 100,
                // [ default: 40 ] 视角通过鼠标控制能拉近到主体的最小距离。在 projection 为'perspective'的时候有效。

                minDistance: 40,
                // [ default: 400 ] 视角通过鼠标控制能拉远到主体的最大距离。在 projection 为'perspective'的时候有效。

                maxDistance: 400,
                // 视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向。[ default: 40 ]
                alpha: 40,
                // 视角绕 y 轴，即左右旋转的角度。[ default: 0 ]
                beta: 15,
                // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
                minAlpha: -360,
                // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
                maxAlpha: 360,
                // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
                minBeta: -360,
                // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]
                maxBeta: 360,
                // 视角中心点，旋转也会围绕这个中心点旋转，默认为[0,0,0]。
                center: [0, 0, 0],
                // 是否开启动画。[ default: true ]
                animation: true,
                // 过渡动画的时长。[ default: 1000 ]
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut'
              },
              legend: {
                show: false
              },
              label: {
                show: true,
                position: 'top',
                distance: 350,
                textStyle: {
                  color: '#000',
                  fontWeight: 'bolder',
                  fontSize: 20,
                  textBorderColor: '#fff',
                  textBorderWidth: 0,
                  backgroundColor: 'rgba(255,255,255,0.7)'
                },
                formatter: function (params) {
                  return params.name
                }
              },
              light: {
                main: {
                  intensity: 1,
                  shadow: true,
                  shadowQuality: 'low',
                  alpha: 40,
                  beta: 40
                },
                ambient: {
                  intensity: 0.4
                }
                // ambientCubemap: {
                //   diffuseIntensity: 1,
                //   texture: '/asset/get/s/data-1491896094618-H1DmP-5px.hdr'
                // }
              },
              groundPlane: {
                show: false
              },
              data: regionData,
              postEffect: {
                enable: false
              },
              itemStyle: {
                borderColor: 'rgb(62,215,213)',
                borderWidth: 1
              }
            }]
          }
          _self.myChart.clear()// 清空ECharts
          _self.myChart.setOption(option)
          setTimeout(function () {
            window.onresize = function () {
              _self.myChart.resize()
            }
          }, 200)
        })
    },
    /**
     * 加载街道及社区点位
     */
    getStreetMap (code, parentCode) {
      var _self = this
      let streetDataUrl = '../../../../../static/data/region/street/hexi_pianqu_street.json'
      fetch(streetDataUrl)
        .then(function (response) {
          return response.json()
        })
        .then(function (myJson) {
          // 显示某个街道底图层
          let hexigeojson = JSON.parse(JSON.stringify(myJson))
          const filterGeo = hexigeojson.features.filter(item => item.properties.code === code)
          let registerMapName = 'tianjin_hexi_streetmap' + Date.now.toString()
          let newGeojson = _self.getNewGeojson(filterGeo, 'registerMapName')
          echarts.registerMap(registerMapName, newGeojson)
          getByParentId({
            parentId: code
          }).then(res => {
            // 显示街道上的所有社区
            let shequPoints = res
            let shequPointsJson = JSON.parse(JSON.stringify(shequPoints))
            const filteredGeo = shequPointsJson.data.filter(item => item.parentCode === code)

            var scatterData = filteredGeo.map(function (feature) {
              let value = []

              let newCoor = coordtransform.gcj02towgs84(feature.longitude, feature.latitude)
              value.push(feature.longitude, feature.latitude, 1)
              return {
                code: feature.code,
                parent_code: feature.parentCode,
                name: feature.name,
                level: 4,
                value: value
              }
            })

            let option = {
              visualMap: {
                show: false,
                min: 10,
                max: 15,
                inRange: {// 由低到高
                  color: ['#4BBFEF', '#47ACF8', '#388FF5']
                }
              },
              geo3D: {
                map: registerMapName,
                regionHeight: 2,
                viewControl: {
                  center: [10, 15, 22],
                  autoRotate: false,
                  alpha: 45,
                  beta: 45
                },
                itemStyle: {
                  color: 'rgba(10, 133, 171, 0.5)',
                  opacity: 1,
                  borderWidth: 0.4,
                  borderColor: '#00FFF8' // 地图边配色
                },
                shading: 'lambert',
                light: { // 光照阴影
                  main: {
                    color: '#fff', // 光照颜色
                    intensity: 1, // 光照强度
                    shadowQuality: 'height',
                    shadow: false, // 是否显示阴影
                    alpha: 45,
                    beta: 45
                  },
                  ambient: {
                    intensity: 0.6
                  }
                }
              },
              series: [
                {
                  type: 'scatter3D',
                  coordinateSystem: 'geo3D',
                  data: scatterData,
                  symbol: 'pin',
                  symbolSize: 30,
                  itemStyle: {
                    color: '#00FFFF',
                    borderColor: '#fff',
                    borderWidth: 0.1
                  },
                  emphasis: {
                    itemStyle: {
                      color: '#DC143C'
                    }
                  },
                  label: {
                    show: true,
                    formatter: '{b}',
                    position: 'right',
                    textStyle: {
                      color: '#000',
                      backgroundColor: '#fff'
                    }
                  }
                }

              ]
            }
            _self.myChart.clear()// 清空ECharts
            _self.myChart.setOption(option)
            setTimeout(function () {
              window.onresize = function () {
                _self.myChart.resize()
              }
            }, 200)
          })
        })
    },
    /**
     * 获取当个社区坐标
     */
    getSingleShequ (code, parentCode) {
      var _self = this
      let streetDataUrl = '../../../../../static/data/region/street/hexi_pianqu_street.json'
      fetch(streetDataUrl)
        .then(function (response) {
          return response.json()
        })
        .then(function (myJson) {
          // 显示某个街道底图层
          let geojson = JSON.parse(JSON.stringify(myJson))
          const filterGeo = geojson.features.filter(item => item.properties.code === parentCode)
          let registerMapName = 'tianjin_hexi_streetmap' + Date.now.toString()
          let newGeojson = _self.getNewGeojson(filterGeo, 'registerMapName')
          echarts.registerMap(registerMapName, newGeojson)
          // let center = _self.getPolygonCenter(newGeojson)
          // 显示街道上的所有社区
          getByParentId({
            parentId: parentCode
          }).then(res => {
            let shequPoints = res
            let shequPointsJson = JSON.parse(JSON.stringify(shequPoints)).data
            const filteredGeoPoints = shequPointsJson.filter(item => item.code === code)
            var scatterData = filteredGeoPoints.map(function (feature) {
              let value = []
              // let newCoor = coordtransform.gcj02towgs84(feature.longitude, feature.latitude)
              value.push(feature.longitude, feature.latitude, 10)
              return {
                code: feature.code,
                parent_code: feature.parentCode,
                name: feature.name,
                value: value,
                level: 4
              }
            })
            let option = {
              geo3D: {
                map: registerMapName,
                regionHeight: 2,
                viewControl: {
                  center: [0, 0, 0],
                  autoRotate: false,
                  alpha: 10,
                  beta: 15
                },
                itemStyle: {
                  color: 'rgba(10, 133, 171, 0.5)',
                  opacity: 1,
                  borderWidth: 0.4,
                  borderColor: '#00FFF8' // 地图边配色
                },
                shading: 'lambert',
                light: { // 光照阴影
                  main: {
                    color: '#fff', // 光照颜色
                    intensity: 1, // 光照强度
                    shadowQuality: 'height',
                    shadow: false, // 是否显示阴影
                    alpha: 45,
                    beta: 45
                  },
                  ambient: {
                    intensity: 0.7
                  }
                }
              },
              series: [
                {
                  type: 'scatter3D',
                  coordinateSystem: 'geo3D',
                  data: scatterData,
                  symbol: 'pin',
                  symbolSize: 40,
                  itemStyle: {
                    color: '#00FFFF',
                    borderColor: '#fff',
                    borderWidth: 0.1
                  },
                  emphasis: {
                    itemStyle: {
                      color: '#DC143C'
                    }

                  },
                  label: {
                    show: true,
                    formatter: '{b}',
                    position: 'right',
                    textStyle: {
                      color: '#000',
                      backgroundColor: '#fff'
                    }
                  }
                }

              ]
            }
            _self.myChart.clear()// 清空ECharts
            _self.myChart.setOption(option)
            setTimeout(function () {
              window.onresize = function () {
                _self.myChart.resize()
              }
            }, 200)
          })
        })
    },
    getPolygonCenter (geojson) {
      let center
      if (geojson !== '') {
        center = turf.center(geojson)
      }
      return center
    }
  },
  mounted () {
    this.initChart()
  }

}
</script>

<style>
.map {
  height: 100%;
  width: 100%;
}
</style>
