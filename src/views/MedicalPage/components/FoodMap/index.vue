<!--
 * @Description:
 * @Author: tangjuncheng
 * @Date: 2019-12-11 09:51:24
 * @LastEditTime : 2020-01-13 11:25:28
 * @LastEditors  : tangjuncheng
 -->

<template>
  <div style=" height: 100%;width: 100%;">
    <check-legend v-show="isShowLegend"></check-legend>
    <detial-tip
      v-if="isShowDetail"
      :ztCode="myZtCode"
      :detailObject="myDetailObject"
    ></detial-tip>
    <div ref="myMapChart" style=" height: 100%;width: 100%;"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import echarts from 'echarts'
import coordtransform from './coordtransform.js'

// import shequpoints from '../../../../../static/data/region/street/hexi_shequ_points.js'
import {
  getbyZoneCode,
  getByParentId
} from '@/views/OlderDistribution/apis/index.js'
import { getHealthStation } from '../../apis/index.js'
import * as turf from '@turf/turf'
import streetData from './streetData.js'
import hexiPianquStreet from '../../../../../static/data/region/street/hexi_pianqu_street_new.json'
import foodServicePosition from '../../../../../static/data/region/street/hexi_street_food_type_point.json'
import hexiShequPolygon from '../../../../../static/data/region/street/hexi_shequ_polygon.json'
// import singelFwPointData from './shequFwPoints'
import CheckLegend from './CheckLegend.vue'
import DetialTip from '../DetialTip/index'
import iconJJ from '@/views/OlderDistribution/assets/icons/street.png'
import iconSQJ from '@/views/OlderDistribution/assets/icons/med.png'
import iconFWD from '@/views/OlderDistribution/assets/icons/services.png'

export default {
  name: 'chartMap',
  props: {},
  components: {
    CheckLegend,
    DetialTip
  },
  data () {
    return {
      isShowLegend: true,
      isShowDetail: false,
      myZtCode: '', // 服务点的载体编号
      myDetailObject: null,
      myChart: null,
      regionName: '',
      myClickLevel: 1,
      vidUrl: '',
      vidName: '',
      timer: ''
    }
  },
  computed: {
    ...mapGetters(['typeNew', 'userType', 'userName', 'codeNew'])
  },
  watch: {
    typeNew (newType) {
      this.loadChart()
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      this.myChart = echarts.init(this.$refs.myMapChart)

      this.loadChart()
      this.clickEvent()
    },

    loadChart () {
      var _self = this
      let myCode = this.codeNew[0] // 120103002000  code 为空表示查全部
      let parentCode = this.codeNew[1]
      this.isShowDetail = false
      if (this.typeNew == 1) {
        // 1：河西区  3：街道 4：社区
        this.getAllStreetMap('', '120103000000')
      } else if (this.typeNew == 3) {
        this.getSingleStreetMap(myCode, parentCode)
      } else if (this.typeNew == 4) {
        this.getSingleShequMap(myCode, parentCode)
      }
      _self.myChart.on('georoam', function (params) {
        var option = _self.myChart.getOption() // 获得option对象
        if (params.zoom != null && params.zoom !== undefined) {
          // 捕捉到缩放时
          option.series[0].zoom = option.geo[0].zoom // 下层geo的缩放等级跟着上层的geo一起改变
          option.series[0].center = option.geo[0].center // 下层的geo的中心位置随着上层geo一起改变
        } else {
          // 捕捉到拖曳时
          option.series[0].center = option.geo[0].center // 下层的geo的中心位置随着上层geo一起改变
        }
        _self.myChart.setOption(option) // 设置option
      })
    },

    clickEvent () {
      var _self = this
      _self.myChart.on('click', function (params) {
        let name = params.name
        _self.vidName = params.name
        this.isShowLegend = true
        try {
          let level = params.data.level
          let myparentCode = params.data.parent_code
          let myCode = params.data.code
          _self.isShowDetail = false
          switch (level) {
            case 3:
              _self.getSingleStreetMap(myCode, myparentCode)
              _self.$store.commit('setCodeNew', [
                params.data.code,
                params.data.parent_code
              ])
              _self.$store.commit('setClickName', name)
              _self.$store.commit('setUserName', name)
              _self.$store.commit('setTypeNew', level)

              break
            // 点击居委会
            case 4:
              _self.getSingleShequMap(myCode, myparentCode)
              _self.$store.commit('setCodeNew', [
                params.data.code,
                params.data.parent_code
              ])
              _self.$store.commit('setClickName', name)
              _self.$store.commit('setUserName', name)
              _self.$store.commit('setTypeNew', level)

              break
            case 10:
              _self.isShowDetail = false
              _self.timer = setTimeout(() => {
                _self.isShowDetail = true
              }, 100)
              _self.myDetailObject = {
                name: params.data.name,
                ztCode: params.data.ztCode,
                canteenlevel: params.data.canteenlevel,
                companyname: params.data.companyname,
                enterprisename: params.data.enterprisename,
                community: params.data.community,
                principal: params.data.principal,
                principalTelno: params.data.principalTelno,
                addres: params.data.addres,
                videoUrl: params.data.videoUrl ? params.data.videoUrl.split(',').map((item, index) => index !== 0 ? item.replace(/\n/g, '<br/>') : item) : []
              }
              break
            // 点击街道
          }
        } catch (error) {
        } finally {
        }
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

    setAreaColor (country, value, color, code, parentCode, level) {
      return {
        name: country,
        value: value,
        code: code,
        parent_code: parentCode,
        level: level,
        itemStyle: {
          borderColor: 'rgb(249, 249, 249,0.5)',
          areaColor: color
        },
        label: {
          // show: true,
          formatter: function (params) {
            return params.data.name
          },
          color: '#f5f5f5',
          fontSize: 18
        },

        emphasis: {
          // itemStyle: {
          //   areaColor: '#2585a6'
          // },
          label: {
            show: false,
            color: '#fff'
          }
        }
      }
    },
    /**
     * 查询河西区所有街道中心点，及计算数据
     */
    getStreetPoints (code, registerMapName) {
      var _self = this
      getbyZoneCode().then(res => {
        // 获取所有街道中心点
        let streetPoints = res
        let streetPointsJson = JSON.parse(JSON.stringify(streetPoints))
        let filteredGeoPoint
        var countryData = []

        if (code === '') {
          filteredGeoPoint = streetPointsJson.data.filter(
            item => item.code !== code
          )
        } else {
          filteredGeoPoint = streetPointsJson.data.filter(
            item => item.code === code
          )
        }
        getHealthStation({
          identify: '0',
          streetCode: '',
          communityCode: ''
        }).then(res => {
          var suborderMap = res.data.suborderMap
          var scatterData = filteredGeoPoint.map(function (feature) {
            for (var indexCode in suborderMap) {
              // 遍历json数组时，这么写p为索引，0,1
              if (indexCode === feature.code) {
                var item = suborderMap[indexCode]
                let value = item[0].serviceOrdertotal // parseInt(Math.random() * 10000)
                let newCoor = [feature.longitude, feature.latitude]
                return {
                  code: feature.code,
                  parent_code: feature.parentCode,
                  name: feature.name,
                  level: 3,
                  value: newCoor.concat(value)
                }
              }
            }
          })
          // 查询全部街道行政边界
          if (code === '') {
            for (var i = 0; i < streetData.data.length; i++) {
              var newFilter = filteredGeoPoint.filter(
                item => item.name === streetData.data[i].name
              )
              countryData.push(
                _self.setAreaColor(
                  streetData.data[i].name,
                  streetData.data[i].value,
                  streetData.data[i].color,
                  newFilter[0].code,
                  newFilter[0].parentCode,
                  3
                )
              )
            }
          } else {
            // 查询某个街道行政边界
            var singleStreetData = streetData.data.filter(
              item => item.code === code
            )
            var newFilter2 = filteredGeoPoint.filter(
              item => item.code === code
            )
            countryData.push(
              _self.setAreaColor(
                singleStreetData[0].name,
                singleStreetData[0].value,
                singleStreetData[0].color,
                newFilter2[0].code,
                newFilter2[0].parentCode,
                3
              )
            )
          }

          let option = {
            tooltip: {
              trigger: 'item',
              backgroundColor: '#09bdb1',
              borderColor: '#FFFFCC',
              showDelay: 0,
              hideDelay: 0,
              enterable: true,
              transitionDuration: 0,
              extraCssText: 'z-index:100',
              formatter: function (params, ticket, callback) {
                // 根据业务自己拓展要显示的内容
                var res = ''
                var name = params.name
                if (params.data.kind === 'jj') {
                  res =
                    '<span style=\'color:#fff;\'>' +
                    '街级：' +
                    params.value[2] +
                    '</span>'
                } else if (params.data.kind === 'sqj') {
                  res =
                    '<span style=\'color:#fff;\'>' +
                    '健康驿站：' +
                    params.value[2] +
                    '</span>'
                } else if (params.data.kind === 'fwd') {
                  res =
                    '<span style=\'color:#fff;\'>' +
                    '服务点：' +
                    params.value[2] +
                    '</span>'
                } else {
                  // var value = params.value
                  res = '<span style=\'color:#fff;\'>' + name + '</span>'
                }

                return res
              }
            },
            geo: {
              map: registerMapName,
              roam: true, // 是否开启鼠标缩放和平移漫游
              top: '3%',
              // left: '10.5%',
              zoom: 1.07,
              itemStyle: {
                // 地图区域的多边形 图形样式
                normal: {
                  // 是图形在默认状态下的样式
                  areaColor: 'rgba(26,137,212,0.2)',
                  label: {
                    show: false, // 是否显示标签
                    textStyle: {
                      color: '#ff0'
                    }
                  },
                  borderWidth: 8,
                  borderColor: 'rgba(72,165,199)',
                  // shadowColor: 'rgba(47,120,157,1)',
                  shadowOffsetY: 12,
                  shadowOffsetX: 8,
                  shadowColor: 'rgba(3,221,255,0.6)',
                  shadowBlur: 10
                },
                emphasis: {
                  areaColor: '#22587e',
                  borderWidth: 9,
                  label: {
                    show: false, // 是否显示标签
                    textStyle: {
                      color: 'transparent'
                    }
                  }
                }
              }
            },
            series: [
              {
                type: 'map',
                mapType: registerMapName,
                top: '3%',
                zoom: 1.06,
                roam: true, // 是否开启鼠标缩放和平移漫游
                itemStyle: {
                  normal: {
                    label: {
                      show: true, // 是否显示标签
                      textStyle: {
                        color: 'rgb(249, 249, 249)',
                        fontSize: 40
                      }
                    },
                    // areaColor: '#031525',
                    borderWidth: 3,
                    borderColor: 'rgba(72,165,199)',
                    shadowColor: 'rgba(3,221,255,1)',
                    shadowBlur: 30
                  },
                  emphasis: {
                    areaColor: '#389BB7',
                    shadowBlur: 20,
                    label: {
                      show: true, // 是否显示标签
                      textStyle: {
                        color: 'rgb(249, 249, 249)'
                      }
                    }
                  }
                },
                data: countryData
              },
              {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                roam: true, // 是否开启鼠标缩放和平移漫游
                color: '#FF5500',
                avoidLabelOverlap: true,
                showEffectOn: 'render',
                rippleEffect: {
                  period: 15,
                  scale: 3,
                  brushType: 'fill'
                },
                symbolSize: function (val) {
                  var value = val[2] > 100 ? 25 : parseInt(val[2] / 10)
                  if (val[2] <= 10) {
                    value = 10
                  }
                  return value
                },
                tooltip: {
                  show: false
                },
                hoverAnimation: false,
                itemStyle: {
                  normal: {
                    color: 'transparent', // 标志颜色
                    shadowBlur: 0,
                    shadowColor: '#333',
                    label: {
                      show: false, // 是否显示标签
                      formatter: function (params) {
                        return params.data.value[2]
                      },
                      textStyle: {
                        color: 'rgb(249, 249, 249)',
                        fontSize: 25
                      }
                    }
                  }
                },
                data: scatterData
              }
            ]
          }
          _self.getAllStreetFoodServicesPoints(code, suborderMap, option)

          setTimeout(function () {
            window.onresize = function () {
              _self.myChart.resize()
            }
          }, 10)
        })
      })
    },
    /**
     * 加载所有街道服务载体统计数据
     */
    addAllStreetZTSeries (
      option,
      seriesName,
      suborderMap,
      filteredGeoPoint,
      type,
      kind,
      labelColor,
      icon
    ) {
      // 街级
      var data = filteredGeoPoint.map(function (feature) {
        if (feature.properties.type === type) {
          for (var indexCode in suborderMap) {
            if (indexCode === feature.properties.code) {
              var item = suborderMap[indexCode]
              let value = item[0].healthStationTotal // parseInt(Math.random() * 10000)
              // let newCoor = coordtransform.gcj02towgs84(feature.longitude, feature.latitude)
              let newCoor = [
                feature.geometry.coordinates[0],
                feature.geometry.coordinates[1]
              ]
              var _color = labelColor // '#FF5500'
              return {
                code: feature.properties.code,
                parent_code: feature.properties.parentcode,
                name: feature.properties.name,
                level: 8,
                kind: kind,
                itemStyle: {
                  normal: {
                    color: '#FF5500', // 标志颜色
                    shadowBlur: 10,
                    shadowColor: '#333',
                    label: {
                      show: true, // 是否显示标签
                      formatter: function (params) {
                        return params.data.value[2]
                      },
                      textStyle: {
                        color: 'rgb(249, 249, 249)',
                        fontSize: 25
                      }
                    }
                  }
                },
                label: {
                  normal: {
                    // backgroundColor: _color
                  }
                },
                value: newCoor.concat(value)
              }
            }
          }
        }
      })
      var series = {
        name: seriesName,
        type: 'scatter',
        coordinateSystem: 'geo',
        data: data,
        symbol: icon,
        symbolSize: function (val) {
          return 55
        },
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              return params.value[2]
            },
            position: [25, 40], // 'insideBottom',
            color: '#fff',
            fontSize: '20'
          },
          emphasis: {
            show: true,
            position: [25, 40], // 'insideBottom',
            symbolSize: 42
          }
        }
      }
      option.series.push(series)

      return series
    },
    /**
     * 加载街级、社区级、服务点三类总数
     */
    getAllStreetFoodServicesPoints (streetCode, suborderMap, option) {
      var _self = this
      var _iconJJ = 'image://' + iconJJ
      var _iconSQJ = 'image://' + iconSQJ
      var _iconFWD = 'image://' + iconFWD
      let filteredGeoPoint
      if (streetCode === '') {
        filteredGeoPoint = foodServicePosition.features.filter(
          feature => feature.properties.code !== streetCode
        )
      } else {
        filteredGeoPoint = foodServicePosition.features.filter(
          feature => feature.properties.code === streetCode
        )
      }

      // _self.addAllStreetZTSeries(
      //   option,
      //   '街级',
      //   suborderMap,
      //   filteredGeoPoint,
      //   1,
      //   'jj',
      //   '#FF5500',
      //   _iconJJ
      // )
      _self.addAllStreetZTSeries(
        option,
        '社区级',
        suborderMap,
        filteredGeoPoint,
        2,
        'sqj',
        '#16FFF1',
        _iconSQJ
      )
      // _self.addAllStreetZTSeries(
      //   option,
      //   '服务点',
      //   suborderMap,
      //   filteredGeoPoint,
      //   3,
      //   'fwd',
      //   '#FDC400',
      //   _iconFWD
      // )
      _self.myChart.clear() // 清空ECharts
      _self.myChart.setOption(option)
    },

    /**
     * 获取河西区所有街道形状
     * code 如果为空 ,则表示查询全部。否则查询全部
     * parentCode 为河西区
     */
    getAllStreetMap (code, parentCode) {
      var _self = this
      var myJson = hexiPianquStreet
      // 显示某个街道底图层
      let hexigeojson = JSON.parse(JSON.stringify(myJson))
      let filterGeoPolygon
      if (code === '') {
        filterGeoPolygon = hexigeojson.features
      } else {
        filterGeoPolygon = hexigeojson.features.filter(
          item => item.properties.code === code
        )
      }
      let registerMapName = 'tianjin_hexi_streetmap' + new Date().valueOf()

      let newGeojson = _self.getNewGeojson(filterGeoPolygon, 'registerMapName')
      // 街道行政区图形
      echarts.registerMap(registerMapName, newGeojson)
      _self.getStreetPoints(code, registerMapName)

      // })
    },
    /**
     * 获取单个街道图形及街道中的所有社区
     * code 街道code
     * parentCode 河西区code
     */
    getSingleStreetMap (code, parentCode) {
      var _self = this
      var myJson = hexiPianquStreet
      // 显示某个街道底图层
      let geojson = JSON.parse(JSON.stringify(myJson))
      const filterGeo = geojson.features.filter(
        item => item.properties.code === code
      )
      let registerMapName = 'tianjin_hexi_streetmap' + new Date().valueOf()
      let newGeojson = _self.getNewGeojson(filterGeo, 'registerMapName')
      echarts.registerMap(registerMapName, newGeojson)
      // 显示街道上的所有社区
      getByParentId({
        parentId: code
      }).then(res => {
        let shequPoints = res
        let shequPointsJson = JSON.parse(JSON.stringify(shequPoints)).data
        const filteredGeoPoints = shequPointsJson.filter(
          item => item.parentCode === code
        )
        getHealthStation({
          identify: '1',
          streetCode: code,
          communityCode: ''
        }).then(res => {
          // 老年人分布情况
          var suborderMap = res.data.suborderMap
          var scatterData = filteredGeoPoints.map(function (feature) {
            let values = []
            for (var indexCode in suborderMap) {
              // 遍历json数组时，这么写p为索引，0,1
              if (indexCode === feature.code) {
                var item = suborderMap[indexCode]
                let value = item[0].serviceOrdertotal || 100
                values.push(feature.longitude, feature.latitude, value)
              }
            }
            // console.log(values)
            return {
              code: feature.code,
              parent_code: feature.parentCode,
              name: feature.name,
              value: values,
              level: 4
            }
          })
          var countryData = []
          // 需要修改为真实值
          var _areaColor = streetData.data.filter(
            item => item.name === filterGeo[0].properties.name
          )[0].color
          countryData.push(
            _self.setAreaColor(
              filterGeo[0].properties.name,
              30000,
              _areaColor,
              filterGeo[0].properties.code,
              filterGeo[0].properties.parentCode,
              20
            )
          )
          let option = {
            // backgroundColor: 'rgba(128, 128, 128, 0.1)',
            tooltip: {
              trigger: 'item',
              backgroundColor: '#09bdb1',
              borderColor: '#FFFFCC',
              showDelay: 0,
              hideDelay: 0,
              enterable: true,
              transitionDuration: 0,
              extraCssText: 'z-index:100',
              formatter: function (params, ticket, callback) {
                // 根据业务自己拓展要显示的内容
                var res = ''
                var name = params.name
                if (params.data.kind === 'jj') {
                  res =
                    '<span style=\'color:#fff;\'>' +
                    '街级：' +
                    params.value[2] +
                    '</span>'
                } else if (params.data.kind === 'sqj') {
                  res =
                    '<span style=\'color:#fff;\'>' +
                    '社区级：' +
                    params.value[2] +
                    '</span>'
                } else if (params.data.kind === 'fwd') {
                  res =
                    '<span style=\'color:#fff;\'>' +
                    '服务点：' +
                    params.value[2] +
                    '</span>'
                } else {
                  // var value = params.value
                  res = '<span style=\'color:#fff;\'>' + name + '</span>'
                }

                return res
              }
            },
            geo: {
              map: registerMapName,
              top: '10%',
              roam: true, // 是否开启鼠标缩放和平移漫游

              zoom: 1,
              itemStyle: {
                // 地图区域的多边形 图形样式
                normal: {
                  // 是图形在默认状态下的样式
                  areaColor: 'rgba(26,137,212,0.1)',
                  label: {
                    show: false, // 是否显示标签
                    textStyle: {
                      color: '#ff0'
                    }
                  },
                  borderWidth: 10,
                  borderColor: 'rgba(72,165,199,0.5)',
                  // shadowColor: 'rgba(47,120,157,1)',
                  shadowOffsetY: 15,
                  shadowOffsetX: 8,
                  shadowColor: 'rgba(3,221,255,1)',
                  shadowBlur: 10
                },
                emphasis: {
                  areaColor: 'rgba(72,165,199,0.5)',
                  borderWidth: 8,
                  label: {
                    show: false, // 是否显示标签
                    textStyle: {
                      color: 'transparent'
                    }
                  }
                }
              }
            },
            series: [
              {
                type: 'map',
                roam: true, // 是否开启鼠标缩放和平移漫游

                mapType: registerMapName,
                top: '10%',
                zoom: 1,
                // aspectScale: 0.75,
                roam: false, // 是否开启鼠标缩放和平移漫游
                itemStyle: {
                  normal: {
                    label: {
                      show: true, // 是否显示标签
                      textStyle: {
                        color: 'rgb(249, 249, 249)',
                        fontSize: 20
                      }
                    },
                    // areaColor: '#031525',
                    borderWidth: 3,
                    borderColor: '#00FEFF',
                    shadowColor: 'rgba(3,221,255,1)',
                    shadowBlur: 30
                  },
                  emphasis: {
                    show: false,
                    areaColor: 'rgb(249, 249, 249,0.4)',
                    shadowBlur: 20,
                    label: {
                      show: false, // 是否显示标签
                      textStyle: {
                        color: 'rgb(249, 249, 249)'
                      }
                    }
                  }
                },
                data: countryData
              }
            ]
          }
          var seriesSheQu = {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            roam: true, // 是否开启鼠标缩放和平移漫游

            color: '#FF5500',
            // top: '22%',
            // left: '22%',
            avoidLabelOverlap: true,
            // zoom: 1.02,
            showEffectOn: 'render',
            rippleEffect: {
              period: 15,
              scale: 3,
              brushType: 'fill'
            },
            symbolSize: function (val) {
              var value = val[2] > 100 ? 20 : parseInt(val[2] / 5)
              if (parseInt(val[2] / 5) <= 10) {
                value = 10
              }
              return value
            },
            tooltip: {
              show: true
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: 'transparent', // 标志颜色
                shadowBlur: 10,
                shadowColor: '#333',
                label: {
                  show: true, // 是否显示标签
                  formatter: function (params) {
                    return params.data.name
                  },
                  textStyle: {
                    color: 'rgb(249, 249, 249)',
                    fontSize: 14
                  }
                }
              }
            },
            data: scatterData
          }
          option.series.push(seriesSheQu)
          var ztData = res.data.serviceAllHealthMap
          _self.getSingleStreetFoodServicesPoints(ztData, code, option, 1)
          setTimeout(function () {
            window.onresize = function () {
              _self.myChart.resize()
            }
          }, 10)
        })
      })
    },
    /**
     * 加载单个街道街级、社区级、服务点三类全部位置
     * typeLevel  街道级别为1；社区级别为2
     */
    getSingleStreetFoodServicesPoints (ztData, code, option, typeLevel) {
      var _self = this
      // var _iconJJ = 'image://' + iconJJ
      var _iconSQJ = 'image://' + iconSQJ
      // var _iconFWD = 'image://' + iconFWD
      var iconList = [_iconSQJ]
      var ztList = ['街级', '社区级', '服务点']
      var singelFwPointDatas = [] // 服务载体集合
      for (var indexCode in ztData) {
        if (ztData[indexCode].length > 0) {
          var singelFwPointDataItem = {}
          singelFwPointDataItem.name = ztData[indexCode][0].healthStation
          singelFwPointDataItem.longitude = parseFloat(
            ztData[indexCode][0].longitude
          )
          singelFwPointDataItem.latitude = parseFloat(
            ztData[indexCode][0].latitude
          )
          singelFwPointDataItem.address = ztData[indexCode][0].site
          singelFwPointDataItem.code = ztData[indexCode][0].communityCode
          singelFwPointDataItem.parentCode = ztData[indexCode][0].streetCode
          singelFwPointDataItem.canteenlevel =
            ztData[indexCode][0].canteenlevel
          singelFwPointDataItem.ztCode = ztData[indexCode][0].canteenNumber // 牌匾号
          singelFwPointDataItem.companyname = ztData[indexCode][0].companyname // 服务商
          singelFwPointDataItem.enterprisename =
            ztData[indexCode][0].enterprisename // 供餐企业
          singelFwPointDataItem.community = ztData[indexCode][0].communityName // 服务区域
          singelFwPointDataItem.principal = ztData[indexCode][0].principal // 主要负责人
          singelFwPointDataItem.videoUrl = ztData[indexCode][0].videoaddress ? ztData[indexCode][0].videoaddress : ''
          singelFwPointDataItem.principalTelno =
            ztData[indexCode][0].phone // 联系电话
          singelFwPointDatas.push(singelFwPointDataItem)
        }
      }
      let filteredGeoPoint
      if (typeLevel === 1) {
        if (code === '') {
          filteredGeoPoint = singelFwPointDatas.filter(
            feature => feature.parentCode !== code
          )
        } else {
          filteredGeoPoint = singelFwPointDatas.filter(
            feature => feature.parentCode === code
          )
        }
      } else {
        if (code === '') {
          filteredGeoPoint = singelFwPointDatas.filter(
            feature => feature.code !== code
          )
        } else {
          filteredGeoPoint = singelFwPointDatas.filter(
            feature => feature.code === code
          )
        }
      }
      // 街级、社区级、服务点 三个级别
      for (let index = 0; index < ztList.length; index++) {
        // 服务点
        var fwztData = filteredGeoPoint
          .map(function (feature) {
            let value = parseInt(Math.random() * 10000)
            // 百度坐标转化为火星
            let bd2gcj02 = coordtransform.bd09togcj02(
              feature.longitude,
              feature.latitude
            )
            // 火星坐标转化为经纬度
            let newCoor = coordtransform.gcj02towgs84(bd2gcj02[0], bd2gcj02[1])

            // let newCoor = [feature.longitude, feature.latitude]
            var _color = '#FDC400'
            return {
              code: feature.code,
              parent_code: feature.parentCode,
              name: feature.name,
              level: 10,
              ztType: ztList[index],
              ztCode: feature.ztCode,
              addres: feature.address,
              canteenlevel: feature.canteenlevel,
              companyname: feature.companyname,
              enterprisename: feature.enterprisename,
              community: feature.community,
              principal: feature.principal,
              principalTelno: feature.principalTelno,
              videoUrl: feature.videoUrl,
              itemStyle: {
                normal: {
                  color: _color,
                  borderWidth: 2,
                  borderColor: '#f4b391'
                }
              },
              label: {
                show: false,
                normal: {
                  backgroundColor: _color
                }
              },
              value: newCoor.concat(value)
            }
          })
        var series = {
          name: '载体等级' + index,
          type: 'scatter',
          coordinateSystem: 'geo',
          data: fwztData,
          symbol: iconList[0],
          symbolSize: function (val) {
            return 55
          },
          label: {
            normal: {
              show: false,
              formatter: function (params) {
                return params.value[2]
              },
              position: 'bottom',
              color: '#fff',
              fontSize: 18
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: '#FF00FF',
              borderWidth: 2,
              borderColor: '#D33BD3'
            }
          }
        }

        option.series.push(series)
      }
      _self.myChart.clear() // 清空ECharts
      _self.myChart.setOption(option)
    },

    /**
     * 获取单个街道上的单个社区
     * code 社区code
     * parentCode 街道code
     */
    getSingleShequMap (code, parentCode) {
      var _self = this
      var myJson = hexiShequPolygon
      // 显示某个社区图层
      let geojson = JSON.parse(JSON.stringify(myJson))
      const filterGeo = geojson.features.filter(
        item => item.properties.code === code
      )
      let registerMapName = 'tianjin_hexi_shequmap' + new Date().valueOf()
      let newGeojson = _self.getNewGeojson(filterGeo, 'registerMapName')
      echarts.registerMap(registerMapName, newGeojson)
      // let center = _self.getPolygonCenter(newGeojson)
      // 显示街道上的所有社区
      getByParentId({
        parentId: parentCode
      }).then(res => {
        let shequPoints = res
        let shequPointsJson = JSON.parse(JSON.stringify(shequPoints)).data
        const filteredGeoPoints = shequPointsJson.filter(
          item => item.code === code
        )
        getHealthStation({
          identify: '2',
          streetCode: parentCode,
          communityCode: code
        }).then(res => {
          var suborderMap = res.data.suborderMap
          var scatterData = filteredGeoPoints.map(function (feature) {
            let values = []
            for (var indexCode in suborderMap) {
              // 遍历json数组时，这么写p为索引，0,1
              if (indexCode === feature.code) {
                var item = suborderMap[indexCode]
                let value = item[0].serviceOrdertotal
                values.push(feature.longitude, feature.latitude, value)
              }
            }
            return {
              code: feature.code,
              parent_code: feature.parentCode,
              name: feature.name,
              value: values,
              level: 30
            }
          })
          var countryData = []
          // 需要修改为真实值
          // var _areaColor = streetData.data.filter(item => item.name === filterGeo[0].properties.name)[0].color

          var _areaColor = streetData.data.filter(
            item => item.name === filterGeo[0].properties.name
          )
          countryData.push(
            _self.setAreaColor(
              filterGeo[0].properties.name,
              30000,
              _areaColor,
              filterGeo[0].properties.code,
              filterGeo[0].properties.parentCode,
              30
            )
          )
          let option = {
            // backgroundColor: 'rgba(128, 128, 128, 0.1)',
            tooltip: {
              trigger: 'item',
              backgroundColor: '#09bdb1',
              borderColor: '#FFFFCC',
              showDelay: 0,
              hideDelay: 0,
              enterable: true,
              transitionDuration: 0,
              extraCssText: 'z-index:100',
              formatter: function (params, ticket, callback) {
                // 根据业务自己拓展要显示的内容
                var res = ''
                var name = params.name
                if (params.data.kind === 'jj') {
                  res =
                    '<span style=\'color:#fff;\'>' +
                    '街级：' +
                    params.value[2] +
                    '</span>'
                } else if (params.data.kind === 'sqj') {
                  res =
                    '<span style=\'color:#fff;\'>' +
                    '社区级：' +
                    params.value[2] +
                    '</span>'
                } else if (params.data.kind === 'fwd') {
                  res =
                    '<span style=\'color:#fff;\'>' +
                    '服务点：' +
                    params.value[2] +
                    '</span>'
                } else {
                  // var value = params.value
                  res = '<span style=\'color:#fff;\'>' + name + '</span>'
                }
                return res
              }
            },
            geo: {
              map: registerMapName,
              top: '10%',
              zoom: 0.82,
              itemStyle: {
                // 地图区域的多边形 图形样式
                normal: {
                  // 是图形在默认状态下的样式
                  areaColor: 'rgba(26,137,212,0.2)',
                  label: {
                    show: false, // 是否显示标签
                    textStyle: {
                      color: '#ff0'
                    }
                  },
                  borderWidth: 8,
                  borderColor: 'rgba(72,165,199)',
                  // shadowColor: 'rgba(47,120,157,1)',
                  shadowOffsetY: 12,
                  shadowOffsetX: 8,
                  shadowColor: 'rgba(3,221,255,0.6)',
                  shadowBlur: 10
                },
                emphasis: {
                  areaColor: '#22587e',
                  borderWidth: 9,
                  label: {
                    show: false, // 是否显示标签
                    textStyle: {
                      color: 'transparent'
                    }
                  }
                }
              }
            },
            series: [
              {
                type: 'map',
                mapType: registerMapName,
                top: '10%',

                zoom: 0.8,
                roam: false, // 是否开启鼠标缩放和平移漫游
                itemStyle: {
                  normal: {
                    label: {
                      show: true, // 是否显示标签
                      textStyle: {
                        color: 'rgb(249, 249, 249)',
                        fontSize: 20
                      }
                    },
                    borderWidth: 3,
                    borderColor: '#00FEFF',
                    shadowColor: 'rgba(3,221,255,1)',
                    shadowBlur: 30
                  },
                  emphasis: {
                    show: false,
                    areaColor: 'rgb(249, 249, 249,0.4)',
                    shadowBlur: 20,
                    label: {
                      show: false, // 是否显示标签
                      textStyle: {
                        color: 'rgb(249, 249, 249)'
                      }
                    }
                  }
                },
                data: countryData
              }
            ]
          }
          var seriesSheQu = {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            color: '#FF5500',
            top: '22%',
            avoidLabelOverlap: true,
            zoom: 1.02,
            showEffectOn: 'render',
            rippleEffect: {
              period: 15,
              scale: 3,
              brushType: 'fill'
            },
            symbolSize: function (val) {
              var value = 40 // parseInt(val[2] / 2)
              return value
            },
            tooltip: {
              show: true
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: 'transparent', // 标志颜色
                shadowBlur: 10,
                shadowColor: '#333',
                label: {
                  show: false, // 是否显示标签
                  formatter: function (params) {
                    return params.data.value[2] // + '\r\n' + params.data.name
                  },
                  textStyle: {
                    color: 'rgb(249, 249, 249)',
                    fontSize: 14
                  }
                }
              }
            },
            data: scatterData
          }
          option.series.push(seriesSheQu)
          var ztData = res.data.serviceAllHealthMap
          _self.getSingleStreetFoodServicesPoints(ztData, code, option, 2)
          setTimeout(function () {
            window.onresize = function () {
              _self.myChart.resize()
            }
          }, 10)
        })
      })
      // })
    },
    /**
     * 加载单个社区范围内的具体服务点位置
     */
    addSingleShequFwPoint (streetCode, option) {
      var _self = this
      var _iconJJ = 'image://' + iconJJ
      var _iconSQJ = 'image://' + iconSQJ
      var _iconFWD = 'image://' + iconFWD
      let filteredGeoPoint
      if (streetCode === '') {
        filteredGeoPoint = foodServicePosition.features.filter(
          feature => feature.properties.code !== streetCode
        )
      } else {
        filteredGeoPoint = foodServicePosition.features.filter(
          feature => feature.properties.code === streetCode
        )
      }
      // 街级
      var jjData = filteredGeoPoint.map(function (feature) {
        if (feature.properties.type === 4) {
          let value = parseInt(Math.random() * 10000)
          // let newCoor = coordtransform.gcj02towgs84(feature.longitude, feature.latitude)
          let newCoor = [
            feature.geometry.coordinates[0],
            feature.geometry.coordinates[1]
          ]
          var _color = '#FF5500'
          return {
            code: feature.properties.code,
            parent_code: feature.properties.parentcode,
            name: feature.properties.name,
            level: 10,
            kind: 'jj',
            itemStyle: {
              normal: {
                color: '#FF5500', // 标志颜色
                shadowBlur: 10,
                shadowColor: '#333',
                label: {
                  show: true, // 是否显示标签
                  formatter: function (params) {
                    return params.data.value[2]
                  },
                  textStyle: {
                    color: 'rgb(249, 249, 249)',
                    fontSize: 25
                  }
                }
              }
            },
            label: {
              normal: {
                backgroundColor: _color
              }
            },
            value: newCoor.concat(value)
          }
        }
      })
      // 社区级
      var sqjData = filteredGeoPoint.map(function (feature) {
        if (feature.properties.type === 5) {
          let value = parseInt(Math.random() * 10000)
          // let newCoor = coordtransform.gcj02towgs84(feature.longitude, feature.latitude)
          let newCoor = [
            feature.geometry.coordinates[0],
            feature.geometry.coordinates[1]
          ]
          var _color = '#16FFF1'

          return {
            code: feature.properties.code,
            parent_code: feature.properties.parentcode,
            name: feature.properties.name,
            level: 10,
            kind: 'sqj',

            itemStyle: {
              normal: {
                color: '#FF5500', // 标志颜色
                shadowBlur: 10,
                shadowColor: '#333',
                label: {
                  show: true, // 是否显示标签
                  formatter: function (params) {
                    return params.data.value[2]
                  },
                  textStyle: {
                    color: 'rgb(249, 249, 249)',
                    fontSize: 25
                  }
                }
              }
            },
            label: {
              normal: {
                backgroundColor: _color
              }
            },
            value: newCoor.concat(value)
          }
        }
      })
      // 服务点
      var fwdData = filteredGeoPoint.map(function (feature) {
        if (feature.properties.type === 6) {
          let value = parseInt(Math.random() * 10000)
          // let newCoor = coordtransform.gcj02towgs84(feature.longitude, feature.latitude)
          let newCoor = [
            feature.geometry.coordinates[0],
            feature.geometry.coordinates[1]
          ]
          var _color = '#FDC400'

          return {
            code: feature.properties.code,
            parent_code: feature.properties.parentcode,
            name: feature.properties.name,
            level: 10,
            kind: 'fwd',
            itemStyle: {
              normal: {
                color: _color,
                borderWidth: 2,
                borderColor: '#f4b391'
              }
            },
            label: {
              normal: {
                backgroundColor: _color
              }
            },
            value: newCoor.concat(value)
          }
        }
      })
      var series1 = {
        name: '街级',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: jjData,
        symbol: _iconJJ,
        symbolSize: function (val) {
          return 50
        },
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              return params.value[2]
            },
            position: 'bottom',
            color: '#fff',
            fontSize: '18'
          },
          emphasis: {
            show: false
          }
        }
      }
      var series2 = {
        name: '社区级',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: sqjData,
        symbol: _iconSQJ,
        symbolSize: function (val) {
          return 50
        },
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              return params.value[2]
            },
            position: 'bottom',
            color: '#fff',
            fontSize: 18
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#FF00FF',
            borderWidth: 2,
            borderColor: '#D33BD3'
          }
        }
      }
      var series3 = {
        name: '服务点',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: fwdData,
        symbol: _iconFWD,
        symbolSize: function (val) {
          return 50
        },
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              return params.value[2]
            },
            position: 'bottom',
            color: '#fff',
            fontSize: 18
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            // color: '#FF00FF',
            // borderWidth: 2,
            // borderColor: '#D33BD3'
          }
        }
      }
      option.series.push(series1)
      option.series.push(series2)
      option.series.push(series3)
      _self.myChart.clear() // 清空ECharts
      _self.myChart.setOption(option)
    },
    getPolygonCenter (geojson) {
      let center
      if (geojson !== '') {
        center = turf.center(geojson)
      }
      return center
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
.map {
  height: 100%;
  width: 100%;
}
.MonitorDataCenter {
  height: 12.5rem;
  width: 4rem;
  position: relative;
  // background: #47091b;
  margin-left: 30%;
  margin-right: 30%;
  pointer-events: none;
}
</style>
