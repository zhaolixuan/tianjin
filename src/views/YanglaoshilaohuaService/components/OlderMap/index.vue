<!--
 * @Description:
 * @Author: tangjuncheng
 * @Date: 2019-12-11 09:51:24
 * @LastEditTime: 2022-12-19 10:23:30
 * @LastEditors: ZhangFengYuan
 -->

<template>
  <div style="height: 100%; width: 100% top: 5%;">
    <!-- <ChangeMapTab
      ref="changeMapTab"
      @changeLevel1="loadChart"
      @setLegendShow="setLegendShow"
      class="MonitorDataCenter"
    ></ChangeMapTab> -->
    <!-- :ztCode="myZtCode"
      :detailObject="myDetailObject" -->
    <!-- <detial-tip
     
    
    ></detial-tip> -->
    <!-- <DetialTip v-if="isShowDetail"  :ztCode="myZtCode"
      :detailObject="myDetailObject"></DetialTip> -->
    <!-- <detial-tip v-if="isShowDetail"></detial-tip> -->
    <park-details
      :street="street"
      :community="community"
      v-if="isShowDetail"
    ></park-details>
    <chair-derails
      :street="street"
      :community="community"
      v-if="isShowChairDetail"
    ></chair-derails>
    <CheckLegend
      ref="myCheckLegend"
      v-show="isShowLegend"
      @checkShowHexiQu="hideShowLegendHexiQu"
      @addPieChart="addPieChart"
    ></CheckLegend>

    <div ref="myMapChart" style="height: 100%; width: 100%"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import echarts from "echarts";
import {
  getbyZoneCode,
  getByParentId,
  getBasePersonInfoNumber,
  getBasePersonInfoNumberEmphasis,
  getStreetMapCount,
  getCommunityMapCount,
  getCommunityMapCountDetail,
} from "@/views/OlderDistribution/apis/index.js";
import * as turf from "@turf/turf";
import streetData from "./streetData.js";
import ChangeMapTab from "../ChangeMapTab/index";
import hexiPianquStreet from "../../../../../static/data/region/street/hexi_pianqu_street_new.json";
import oldManPosition from "../../../../../static/data/region/street/hexi_street_older_point6.json";
import CheckLegend from "./CheckLegend.vue";
import { jianshan, youyi, xiuyue } from "./communityData.js";
import DetialTip from "./DetialTip/index.vue";
import ParkDetails from "./DetialTip/parkDetails.vue";
import ChairDerails from "./DetialTip/chairDerails.vue";
export default {
  name: "chartMap",
  props: {},
  components: {
    ChangeMapTab,
    CheckLegend,
    DetialTip,
    ParkDetails,
    ChairDerails,
  },

  data() {
    return {
      isShowLegend: true,
      isShowDetail: false,
      isShowChairDetail: false,
      myChart: null,
      regionName: "",
      myClickLevel: 1,
      bussinesType: 2, // 业务类型 老年人分布为1 ；重点关注老年人分布为2
      scatterSingleStreetData: null, // 单个街道重点关注老年人分布
      street: "",
      community: "",
    };
  },

  computed: {
    ...mapGetters(["typeNew", "userType", "userName", "codeNew"]),
  },

  watch: {
    typeNew(newType) {
      this.loadChart(this.bussinesType);
    },
  },

  mounted() {
    this.initChart();
  },

  methods: {
    initChart() {
      this.myChart = echarts.init(this.$refs.myMapChart);
      this.loadChart(this.bussinesType);
      this.clickEvent();
    },

    // 加载图表 接收业务类型 老年人分布情况为1 重点关注老年人分布为2
    loadChart(bussinesType) {
      var _self = this;
      this.isShowDetail = false;
      this.isShowChairDetail = false;
      this.bussinesType = bussinesType;
      let myCode = this.codeNew[0]; // 120103002000  code 为空表示查全部
      let parentCode = this.codeNew[1];
      // console.log(this.userName, this.codeNew);

      if (this.typeNew == 1) {
        // 1：河西区  2：街道 3：社区
        this.getAllStreetMap("", "120103000000", bussinesType);
      } else if (this.typeNew == 3) {
        this.getSingleStreetMap(
          myCode,
          parentCode,
          bussinesType,
          this.userName
        );
      } else if (this.typeNew == 4) {
        this.getSingleShequMap(myCode, parentCode, bussinesType);
      }
      _self.myChart.on("georoam", function (params) {
        var option = _self.myChart.getOption(); // 获得option对象
        if (params.zoom != null && params.zoom !== undefined) {
          // 捕捉到缩放时
          option.series[0].zoom = option.geo[0].zoom; // 下层geo的缩放等级跟着上层的geo一起改变
          option.series[0].center = option.geo[0].center; // 下层的geo的中心位置随着上层geo一起改变
        } else {
          // 捕捉到拖曳时
          option.series[0].center = option.geo[0].center; // 下层的geo的中心位置随着上层geo一起改变
        }
        _self.myChart.setOption(option); // 设置option
      });
    },

    // 控制图例显示与否
    setLegendShow(bussinesType) {
      if (this.bussinesType === 1) {
        this.isShowLegend = false;
      } else {
        this.isShowLegend = true;
      }
    },

    // 点击事件
    clickEvent() {
      var _self = this;
      _self.myChart.on("click", function (params) {
        let param = {
          area: params.name,
          typeNew: params.data.level,
        };
        _self.$emit("handelMap", param);
        let name = params.name;
        if (this.bussinesType === 1) {
          // this.$refs['changeMapTab'].changeHover(1)
          this.isShowLegend = false;
        } else {
          this.isShowLegend = true;
          // this.$refs['changeMapTab'].changeHover(1)
        }

        try {
          let level = params.data.level;
          let myparentCode = params.data.parent_code;
          let myCode = params.data.code;
          console.log(params);
          //let myName =
          // if (enableClick === 'true') {
          // console.log(level);

          switch (level) {
            case 3:
              _self.street = name;
              _self.community = "";
              _self.getSingleStreetMap(
                myCode,
                myparentCode,
                _self.bussinesType,
                name
              );
              _self.$store.commit("setCodeNew", [
                params.data.code,
                params.data.parent_code,
              ]);
              _self.$store.commit("setClickName", name);
              _self.$store.commit("setUserName", name);
              _self.$store.commit("setTypeNew", level);

              break;
            // 点击居委会
            case 4:
              _self.community = name;
              //   _self.isShowDetail = false
              // _self.timer = setTimeout(() => {
              //   _self.isShowDetail = true
              // }, 100)
              _self.getSingleShequMap(myCode, myparentCode, _self.bussinesType);
              _self.$store.commit("setCodeNew", [
                params.data.code,
                params.data.parent_code,
              ]);
              _self.$store.commit("setClickName", name);
              _self.$store.commit("setUserName", name);
              _self.$store.commit("setTypeNew", level);

              break;
            // 点击街道
          }

          if (params.seriesType == "pie") {
            //饼形图点击事件

            switch (params.dataIndex) {
              case 0:
                //公园
                _self.community = name;
                _self.isShowDetail = false;
                _self.timer = setTimeout(() => {
                  _self.isShowDetail = true;
                }, 100);
                // console.log( this.community);
                break;
              case 1:
                //扶一把
                //公园
                _self.community = name;
                _self.isShowChairDetail = false;
                _self.timer = setTimeout(() => {
                  _self.isShowChairDetail = true;
                }, 100);
                break;
              case 2:
                //楼道

                break;
              default:
                break;
            }
          }
        } catch (error) {
          //
        } finally {
          //
        }
      });
    },

    // 封装成新得 json 数据
    getNewGeojson(features, parentName) {
      let featureCollection = {
        name: parentName + Date.now.toString(),
        type: "FeatureCollection",
        features: [],
      };
      features.forEach((feature) => {
        featureCollection.features.push(feature);
      });
      return JSON.parse(JSON.stringify(featureCollection));
    },

    // 设置区域颜色
    setAreaColor(country, value, color, code, parentCode, level) {
      return {
        name: country,
        value: value,
        code: code,
        parent_code: parentCode,
        level: level,
        itemStyle: {
          borderColor: "rgb(249, 249, 249,0.5)",
          areaColor: color,
        },
        label: {
          // show: true,
          formatter: function (params) {
            return params.data.name.replace("社区居委会", "");
          },
          color: "#f5f5f5",
          fontSize: 18,
        },

        emphasis: {
          // itemStyle: {
          //   areaColor: '#2585a6'
          // },
          label: {
            show: false,
            color: "#fff",
          },
        },
      };
    },

    /**
     * 查询河西区所有街道中心点，及计算数据
     */
    getStreetPoints(code, parentCode, registerMapName) {
      var _self = this;
      getbyZoneCode().then((res) => {
        // 显示所有街道中心点
        let streetPoints = res;
        let streetPointsJson = JSON.parse(JSON.stringify(streetPoints));
        let filteredGeoPoint;
        if (code === "") {
          filteredGeoPoint = streetPointsJson.data.filter(
            (item) => item.code !== code
          );
        } else {
          filteredGeoPoint = streetPointsJson.data.filter(
            (item) => item.code === code
          );
        }

        var countryData = [];
        // 查询全部街道行政边界
        if (code === "") {
          for (var i = 0; i < streetData.data.length; i++) {
            var newFilter = filteredGeoPoint.filter(
              (item) => item.name === streetData.data[i].name
            );
            if (newFilter.length > 0) {
              countryData.push(
                _self.setAreaColor(
                  streetData.data[i].name,
                  streetData.data[i].value,
                  streetData.data[i].color,
                  newFilter[0].code,
                  newFilter[0].parentCode,
                  3
                )
              );
            }
          }
        } else {
          // 查询某个街道行政边界
          var singleStreetData = streetData.data.filter(
            (item) => item.code === code
          );
          var newFilter2 = filteredGeoPoint.filter(
            (item) => item.code === code
          );
          if (newFilter2.length > 0) {
            countryData.push(
              _self.setAreaColor(
                singleStreetData[0].name,
                singleStreetData[0].value,
                singleStreetData[0].color,
                newFilter2[0].code,
                newFilter2[0].parentCode,
                3
              )
            );
          }
        }

        let option = {
          tooltip: {
            trigger: "item",
            backgroundColor: "#09bdb1",
            borderColor: "#FFFFCC",
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: "z-index:100",
            formatter: function (params, ticket, callback) {
              // 根据业务自己拓展要显示的内容
              var res = "";
              // if (params.seriesType === 'effectScatter') {
              //   res = '<span style=\'color:#fff;\'>' + params.data.kind + ':' + params.data.value[2] + '人' + '</span>'
              // } else {
              var name = params.name;
              // var value = params.value
              res = "<span style='color:#fff;'>" + name + "</span>";
              // }
              return res;
            },
          },
          geo: {
            map: registerMapName,
            roam: true, // 是否开启鼠标缩放和平移漫游
            top: "5%",
            left: "14%",
            zoom: 1.02,
            itemStyle: {
              // 地图区域的多边形 图形样式
              normal: {
                // 是图形在默认状态下的样式
                areaColor: "rgba(26,137,212,0.1)",
                label: {
                  show: false, // 是否显示标签
                  textStyle: {
                    color: "#ff0",
                  },
                },
                borderWidth: 8,
                borderColor: "rgba(72,165,199)",
                // shadowColor: 'rgba(47,120,157,1)',
                shadowOffsetY: 15,
                shadowOffsetX: 8,
                shadowColor: "rgba(3,221,255,1)",
                shadowBlur: 10,
              },
              emphasis: {
                areaColor: "#22587e",
                borderWidth: 3,
                label: {
                  show: false, // 是否显示标签
                  textStyle: {
                    color: "transparent",
                  },
                },
              },
            },
          },
          series: [
            {
              type: "map",
              mapType: registerMapName,
              top: "5%",
              left: "14%",
              zoom: 1.0,
              // aspectScale: 0.75,
              roam: true, // 是否开启鼠标缩放和平移漫游
              itemStyle: {
                normal: {
                  label: {
                    show: true, // 是否显示标签
                    textStyle: {
                      color: "rgb(249, 249, 249)",
                      fontSize: 40,
                    },
                  },
                  // areaColor: '#031525',
                  borderWidth: 3,
                  borderColor: "#00FEFF",
                  shadowColor: "rgba(3,221,255,1)",
                  shadowBlur: 30,
                },
                emphasis: {
                  areaColor: "#389BB7",
                  shadowBlur: 20,
                  label: {
                    show: true, // 是否显示标签
                    textStyle: {
                      color: "rgb(249, 249, 249)",
                    },
                  },
                },
              },
              data: countryData,
            },
          ],
        };
        _self.myChart.clear(); // 清空ECharts
        _self.myChart.setOption(option);

        getStreetMapCount().then((res) => {
          //   {
          //   tag: "0",
          //   code: code,
          //   parentcode: parentCode,
          // }
          var scatterData = filteredGeoPoint.map(function (feature) {
            var _code = feature.code;
            var value = 0;
            var values = res.filter((item) => item.zcode === _code);
            if (values.length > 0) {
              value = parseInt(values[0].num);
            }
            // let newCoor = coordtransform.gcj02towgs84(feature.longitude, feature.latitude)
            let newCoor = [feature.longitude, feature.latitude];
            return {
              code: feature.code,
              parent_code: feature.parentCode,
              name: feature.name,
              level: 3,
              value: newCoor.concat(value),
            };
          });
          var scatterSeries = {
            type: "effectScatter",
            coordinateSystem: "geo",
            color: "#FF5500",
            avoidLabelOverlap: true,
            // top: '22%',
            // left: '22%',
            showEffectOn: "render",
            rippleEffect: {
              period: 15,
              scale: 3,
              brushType: "fill",
            },
            symbolSize: function (val) {
              var value;
              if (val[2] < 6000) {
                value = 10;
              } else {
                value = val[2] >= 20000 ? 30 : parseInt(val[2] / 600);
              }
              // var value = parseInt(val[2] / 200) > 4000 ? 40 : parseInt(val[2] / 200)
              return value;
            },
            tooltip: {
              show: false,
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: "#FF5500", // 标志颜色
                shadowBlur: 10,
                shadowColor: "#333",
                label: {
                  show: true, // 是否显示标签
                  formatter: function (params) {
                    return params.data.value[2];
                  },
                  textStyle: {
                    color: "rgb(249, 249, 249)",
                    fontSize: 25,
                  },
                },
              },
            },

            data: scatterData,
          };
          //  console.log(scatterData)
          option.series.push(scatterSeries);

          _self.myChart.setOption(option);
        });

        setTimeout(function () {
          window.onresize = function () {
            _self.myChart.resize();
          };
        }, 10);
      });
    },

    /**
     *获取数据分布数据
     * type 1适老化公园福一把 2楼道休息椅 3入户改造
     */
    getImportantOldMan(filteredGeoPoints, dataList, type) {
      console.log(dataList);
      var scatterData = filteredGeoPoints.map(function (feature) {
        if (feature.properties.type === type) {
          var filterData = dataList.filter(
            (item) => item.zcode === feature.properties.code
          );
          if (filterData.length > 0) {
            let value;
            let kind;
            switch (type) {
              case 1: // 适老化公园福一把
                kind = "适老化公园福一把";
                value = parseInt(filterData[0].parkStreetNum);
                break;
              case 2: // 楼道休息椅
                kind = "楼道休息椅";
                value = parseInt(filterData[0].buildingChairStreetNum);
                break;
              case 3: // 入户改造
                kind = "入户改造";
                value = parseInt(filterData[0].fuChairStreetNum);
                break;
            }

            let newCoor = [
              feature.geometry.coordinates[0],
              feature.geometry.coordinates[1],
            ];
            var _color;
            switch (feature.properties.type) {
              case 1:
                _color = "#FDC400";
                break;
              case 2:
                _color = "#00FA9A";
                break;
              case 3:
                _color = "#FF4000";
                break;
            }
            return {
              code: feature.properties.code,
              parent_code: feature.properties.parentcode,
              name: feature.properties.name,
              level: 10,
              kind: kind,
              itemStyle: {
                normal: {
                  color: _color, // 标志颜色
                },
              },
              label: {
                normal: {
                  backgroundColor: _color,
                },
              },

              value: newCoor.concat(value),
            };
          }
        }
      });
      return scatterData;
    },

    getImportantOldManSeries(scatterData) {
      var series = {
        type: "effectScatter",
        coordinateSystem: "geo",
        color: "#FF5500",
        roam: true, // 是否开启鼠标缩放和平移漫游
        // top: '22%',
        // left: '22%',
        avoidLabelOverlap: true,
        showEffectOn: "render",
        rippleEffect: {
          period: 15,
          scale: 3,
          brushType: "fill",
        },
        symbolSize: 10,
        // symbolSize: function (val) {
        //   var value = 10// parseInt(val[2] / 500)
        //   return value
        // },
        tooltip: {
          show: true,
        },
        hoverAnimation: true,
        itemStyle: {
          normal: {
            color: "#FF5500", // 标志颜色
            shadowBlur: 10,
            shadowColor: "#333",
            label: {
              show: true, // 是否显示标签
              // position: 'top',
              // backgroundColor: 'red',
              formatter: function (params) {
                if (
                  params.data.kind == "楼道休息椅" ||
                  params.data.kind == "适老化公园福一把"
                ) {
                  return params.data.value[2] + "个";
                } else {
                  return params.data.value[2] + "人";
                }
                // return params.data.value[2] + "人人";
              },
              textStyle: {
                color: "rgb(249, 249, 249)",
                fontSize: 10,
              },
              position: "right",
              padding: [4, 5],
              borderRadius: 3,
              borderWidth: 1,
              // borderColor: '',
              color: "#777",
            },
          },
        },
        emphasis: {
          label: {
            show: true, // 是否显示标签
            position: "right",
            // backgroundColor: 'red',
            formatter: function (params) {
              //  console.log(params);
              if (
                params.data.kind == "楼道休息椅" ||
                params.data.kind == "适老化公园福一把"
              ) {
                return params.data.value[2] + "个";
              } else {
                return params.data.value[2] + "人";
              }
            },
            textStyle: {
              color: "rgb(249, 249, 249)",
              fontSize: 12,
            },
          },
        },
        data: scatterData,
      };
      return series;
    },

    /**
     * 获取 河西 适老化公园福一把楼道休息椅入户改造 数据
     */
    getOldManPoints(code, parentCode, registerMapName) {
      var _self = this;
      let filteredGeoPoint;
      if (code === "") {
        filteredGeoPoint = oldManPosition.features.filter(
          (feature) => feature.properties.code !== code
        );
      } else {
        filteredGeoPoint = oldManPosition.features.filter(
          (feature) => feature.properties.code === code
        );
      }
      getStreetMapCount({
        // tag: "0",
        // code: "",
        // parentcode: "",
      }).then((res) => {
        var list = res;
        console.log(filteredGeoPoint);
        var scatterDataUp = this.getImportantOldMan(filteredGeoPoint, list, 1); // 适老化公园福一把
        var scatterDataAloneTotal = this.getImportantOldMan(
          filteredGeoPoint,
          list,
          2
        ); // 楼道休息椅
        var scatterDataLiveAlonelTotal = this.getImportantOldMan(
          filteredGeoPoint,
          list,
          3
        ); //入户改造

        var countryData = [];

        // 查询全部街道行政边界
        if (code === "") {
          var allStreetData = streetData.data.filter(
            (item) => item.code !== code
          );
          for (var i = 0; i < allStreetData.length; i++) {
            countryData.push(
              _self.setAreaColor(
                allStreetData[i].name,
                allStreetData[i].value,
                allStreetData[i].color,
                allStreetData[i].code,
                allStreetData[i].parentCode,
                3
              )
            );
          }
        } else {
          // 查询某个街道行政边界
          var singleStreetData = streetData.data.filter(
            (item) => item.code === code
          );

          countryData.push(
            _self.setAreaColor(
              singleStreetData[0].name,
              singleStreetData[0].value,
              singleStreetData[0].color,
              singleStreetData[0].code,
              singleStreetData[0].parentCode,
              3
            )
          );
        }
        let option = {
          // backgroundColor: 'rgba(128, 128, 128, 0.1)',
          tooltip: {
            trigger: "item",
            backgroundColor: "#09bdb1",
            borderColor: "#FFFFCC",
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: "z-index:100",
            formatter: function (params, ticket, callback) {
              // 根据业务自己拓展要显示的内容
              var res = "";
              if (params.seriesType === "effectScatter") {
                res =
                  "<span style='color:#fff;'>" +
                  params.data.kind +
                  ":" +
                  params.data.value[2] +
                  (params.data.kind == "楼道休息椅" ||
                  params.data.kind == "适老化公园福一把"
                    ? "个"
                    : "人") +
                  "</span>";
              } else {
                var name = params.name;
                // var value = params.value
                res = "<span style='color:#fff;'>" + name + "</span>";
              }

              return res;
            },
          },
          geo: {
            map: registerMapName,
            top: "5%",
            left: "14%",
            zoom: 1.02,
            roam: true, // 是否开启鼠标缩放和平移漫游

            itemStyle: {
              // 地图区域的多边形 图形样式
              normal: {
                // 是图形在默认状态下的样式
                areaColor: "rgba(26,137,212,0.1)",
                label: {
                  show: false, // 是否显示标签
                  textStyle: {
                    color: "#ff0",
                  },
                },
                borderWidth: 8,
                borderColor: "rgba(72,165,199)",
                // shadowColor: 'rgba(47,120,157,1)',
                shadowOffsetY: 15,
                shadowOffsetX: 8,
                shadowColor: "rgba(3,221,255,1)",
                shadowBlur: 10,
              },
              emphasis: {
                areaColor: "#22587e",
                borderWidth: 30,
                label: {
                  show: false, // 是否显示标签
                  textStyle: {
                    color: "transparent",
                  },
                },
              },
            },
          },
          series: [
            {
              type: "map",
              mapType: registerMapName,
              roam: true, // 是否开启鼠标缩放和平移漫游
              top: "5%",
              left: "14%",
              zoom: 1,
              avoidLabelOverlap: true,
              // aspectScale: 0.75,
              itemStyle: {
                normal: {
                  label: {
                    show: true, // 是否显示标签
                    textStyle: {
                      color: "rgb(249, 249, 249)",
                      fontSize: 14,
                    },
                  },
                  // areaColor: '#031525',
                  borderWidth: 3,
                  borderColor: "#00FEFF",
                  shadowColor: "rgba(3,221,255,1)",
                  shadowBlur: 30,
                },
                emphasis: {
                  areaColor: "#389BB7",
                  shadowBlur: 20,
                  label: {
                    show: true, // 是否显示标签
                    textStyle: {
                      color: "rgb(249, 249, 249)",
                    },
                  },
                },
              },
              data: countryData,
            },
          ],
        };

        var seriesUp = this.getImportantOldManSeries(scatterDataUp);
        var seriesDisabledTotal = this.getImportantOldManSeries(
          scatterDataAloneTotal
        );
        var seriesPensionTotal = this.getImportantOldManSeries(
          scatterDataLiveAlonelTotal
        );

        option.series.push(seriesUp);
        option.series.push(seriesDisabledTotal);
        option.series.push(seriesPensionTotal);

        // option.series.push(seriesPhysicallyDisabledTotal)
        console.log(option.series);
        _self.myChart.clear(); // 清空ECharts
        _self.myChart.setOption(option);
        // 根据图例显示初始数据
        var legendData = _self.$refs["myCheckLegend"].getLegendData();
        for (let index = 0; index < legendData.length; index++) {
          const element = legendData[index];
          console.log(element.show);
          this.hideShowLegendHexiQu(index + 1, element.show);
        }
        setTimeout(function () {
          window.onresize = function () {
            _self.myChart.resize();
          };
        }, 10);
        // })
      });
    },

    /**
     * 控制河西区级别 重点关注老人图例
     */
    hideShowLegendHexiQu(index, isVisible) {
      var option = this.myChart.getOption();
      if (isVisible === true) {
        option.series[index].symbolSize = 10;
      } else {
        option.series[index].symbolSize = 0;
      }
      this.myChart.setOption(option);
    },

    /**
     * 获取河西区所有街道形状
     * code 如果为空 ,则表示查询全部。否则查询全部
     * parentCode 为河西区
     * bussinesType 业务类型 老年人分布为1 ；重点关注老年人分布为2
     */
    getAllStreetMap(code, parentCode, bussinesType) {
      var _self = this;
      var myJson = hexiPianquStreet;
      // 显示某个街道底图层
      let hexigeojson = JSON.parse(JSON.stringify(myJson));
      let filterGeoPolygon;
      if (code === "") {
        filterGeoPolygon = hexigeojson.features;
      } else {
        filterGeoPolygon = hexigeojson.features.filter(
          (item) => item.properties.code === code
        );
      }
      let registerMapName = "tianjin_hexi_streetmap" + new Date().valueOf();

      let newGeojson = _self.getNewGeojson(filterGeoPolygon, "registerMapName");
      // 街道行政区图形
      echarts.registerMap(registerMapName, newGeojson);

      _self.getOldManPoints(code, parentCode, registerMapName);

      // if (bussinesType === 1) {
      //   _self.getStreetPoints(code, parentCode, registerMapName);
      // } else {
      //   _self.getOldManPoints(code, parentCode, registerMapName);
      // }
      // })
    },

    /**
     * 获取单个街道图形及街道中的所有社区
     * code 街道code
     * parentCode 河西区code
     */
    getSingleStreetMap(code, parentCode, bussinesType, name) {
      var _self = this;
      var myJson = hexiPianquStreet;
      // 显示某个街道底图层
      let geojson = JSON.parse(JSON.stringify(myJson));
      const filterGeo = geojson.features.filter(
        (item) => item.properties.code === code
      );
      let registerMapName = "tianjin_hexi_streetmap" + new Date().valueOf();
      let newGeojson = _self.getNewGeojson(filterGeo, "registerMapName");
      echarts.registerMap(registerMapName, newGeojson);
      // 显示街道上的所有社区
      getByParentId({
        parentId: code,
      }).then((res) => {
        var countryData = [];
        // 需要修改为真实值
        var _areaColor = streetData.data.filter(
          (item) => item.name === filterGeo[0].properties.name
        )[0].color;
        countryData.push(
          _self.setAreaColor(
            filterGeo[0].properties.name,
            30000,
            _areaColor,
            filterGeo[0].properties.code,
            filterGeo[0].properties.parentCode,
            20
          )
        );
        let option = {
          tooltip: {
            trigger: "item",
            backgroundColor: "#09bdb1",
            borderColor: "#FFFFCC",
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: "z-index:100",
            formatter: function (params, ticket, callback) {
              // 根据业务自己拓展要显示的内容
              var res = "";
              console.log(params);
              if (bussinesType === 2) {
                if (params.seriesType === "effectScatter") {
                  var name = params.name;
                  res = "<span style='color:#fff;'>" + name + "</span>";
                } else if (params.seriesType === "map") {
                  var name2 = params.name;
                  res = "<span style='color:#fff;'>" + name2 + "</span>";
                } else {
                  var kind = params.data.data.value;
                  var value2 = params.value;
                  // var value = params.value
                  res =
                    "<span style='color:#fff;'>" +
                    kind +
                    "</span>" +
                    value2 +
                    (kind == "楼道休息椅：" || kind == "适老化公园福一把："
                      ? "个"
                      : "人");
                }
                // }
              }
              return res;
            },
          },
          geo: {
            map: registerMapName,
            zoom: 1.02,
            roam: false, // 是否开启鼠标缩放和平移漫游

            itemStyle: {
              // 地图区域的多边形 图形样式
              normal: {
                // 是图形在默认状态下的样式
                areaColor: "rgba(26,137,212,0.1)",
                label: {
                  show: false, // 是否显示标签
                  textStyle: {
                    color: "#ff0",
                  },
                },
                borderWidth: 8,
                borderColor: "rgba(72,165,199,0.5)",
                // shadowColor: 'rgba(47,120,157,1)',
                shadowOffsetY: 15,
                shadowOffsetX: 8,
                shadowColor: "rgba(3,221,255,1)",
                shadowBlur: 10,
              },
              emphasis: {
                show: true,
                areaColor: "rgb(249, 249, 249,0.4)",
                shadowBlur: 20,
                label: {
                  show: false, // 是否显示标签
                  textStyle: {
                    color: "rgb(249, 249, 249)",
                  },
                },
              },
            },
          },
          series: [
            {
              type: "map",
              mapType: registerMapName,
              roam: false, // 是否开启鼠标缩放和平移漫游

              zoom: 1,
              itemStyle: {
                normal: {
                  label: {
                    show: true, // 是否显示标签
                    textStyle: {
                      color: "rgb(249, 249, 249)",
                      fontSize: 20,
                    },
                  },
                  // areaColor: '#031525',
                  borderWidth: 3,
                  borderColor: "#00FEFF",
                  shadowColor: "rgba(3,221,255,1)",
                  shadowBlur: 30,
                },
                emphasis: {
                  show: true,
                  areaColor: "rgb(249, 249, 249,0.4)",
                  shadowBlur: 20,
                  label: {
                    show: true, // 是否显示标签
                    textStyle: {
                      color: "rgb(249, 249, 249)",
                    },
                  },
                },
              },
              data: countryData,
            },
          ],
        };
        _self.myChart.clear(); // 清空ECharts
        //  console.log(option);
        _self.myChart.setOption(option);
        let shequPoints = res;
        let shequPointsJson = JSON.parse(JSON.stringify(shequPoints)).data;
        const filteredGeoPoints = shequPointsJson.filter(
          (item) => item.parentCode === code
        );

        getCommunityMapCount({
          street: name,
        }).then((res) => {
          this.scatterSingleStreetData = filteredGeoPoints.map(function (
            feature
          ) {
            var _code = feature.code;
            var values = res.filter((item) => item.zcode === _code);
            if (values.length > 0) {
              let value = [];
              let importantOldManValue = {
                typeUp80: parseInt(values[0].parkCommunityNum), // 80岁以上
                typeAloneTotal: parseInt(values[0].buildingChairCommunityNum), // 独居
                typeIsLiveAlonelTotal: parseInt(values[0].fuChairCommunityNum), // 失独
              };
              value.push(
                feature.longitude,
                feature.latitude,
                importantOldManValue
              );
              return {
                code: feature.code,
                parent_code: feature.parentCode,
                name: feature.name,
                value: value,
                level: 4,
              };
            }
          });

          // 加载重点老年人位置点
          var seriesSheQuZDLNR = {
            type: "effectScatter",
            coordinateSystem: "geo",
            roam: false, // 是否开启鼠标缩放和平移漫游
            color: "#FF5500",
            // top: '22%',
            // left: '22%',
            avoidLabelOverlap: false,
            zoom: 1.02,
            showEffectOn: "render",
            rippleEffect: {
              period: 15,
              scale: 3,
              brushType: "fill",
            },
            symbolSize: function (val) {
              var value = 10; // parseInt(val[2] / 2)
              return value;
            },
            tooltip: {
              show: true,
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: "#FF5500", // 标志颜色
                shadowBlur: 10,
                shadowColor: "#333",
                label: {
                  show: true, // 是否显示标签
                  position: "bottom",
                  padding: [0, 0],
                  borderRadius: 3,
                  borderWidth: 1,
                  // backgroundColor: '#FF7000',
                  color: "#777",
                  borderColor: "",
                  formatter: function (params) {
                    return params.data.name.replace("居委会", "");
                  },
                  textStyle: {
                    color: "rgb(249, 249, 249)",
                    fontSize: 14,
                  },
                },
              },
            },
            data: this.scatterSingleStreetData,
          };
          option.series.push(seriesSheQuZDLNR);
          _self.myChart.setOption(option);

          var legendData = _self.$refs["myCheckLegend"].getLegendData();
          this.addPieChart(legendData);
        });

        setTimeout(function () {
          window.onresize = function () {
            _self.myChart.resize();
          };
        }, 200);
      });
      //  })
    },

    addPieChart(legendData) {
      var option = this.myChart.getOption();
      var series = option.series;
      // 定义新的series
      var newSeries = [];
      series.forEach((element) => {
        if (element.type !== "pie") {
          newSeries.push(element);
        }
      });
      console.log(this.scatterSingleStreetData);
      var data = this.scatterSingleStreetData;
      for (var i = 0; i < data.length; i++) {
        if (data[i] !== undefined) {
          let longitude = parseFloat(data[i].value[0]);
          let latitude = parseFloat(data[i].value[1]);
          var geoCoord = [longitude, latitude]; // geoCoordMap[data[i].name]
          if (geoCoord) {
            var pCenter = this.myChart.convertToPixel(
              {
                seriesIndex: 0,
              },
              geoCoord
            );
            var dataList = [];
            var itemData;

            for (let index = 0; index < legendData.length; index++) {
              const element = legendData[index];
              if (element.show) {
                var itemValue;
                var itemColor;
                switch (element.text) {
                  case "适老化公园福一把":
                    itemValue = data[i].value[2].typeUp80;
                    itemColor = "#FDC400";
                    break;
                  case "楼道休息椅":
                    itemValue = data[i].value[2].typeAloneTotal;
                    itemColor = "#00FA9A";
                    break;
                  case "入户改造":
                    itemColor = "#FF4000";
                    itemValue = data[i].value[2].typeIsLiveAlonelTotal;
                    break;
                }
                itemData = {
                  name: data[i].name,
                  value: itemValue, // data[i].value[1].value,
                  data: {
                    value: element.text + "：",
                  },

                  itemStyle: {
                    normal: {
                      color: itemColor,
                      shadowColor: "#2c6cc4",
                      shadowBlur: 20,
                    },
                    label: {
                      normal: {
                        formatter: "{c}\n{d}%",
                        position: "center",
                        show: false,
                        textStyle: {
                          fontSize: "14",
                          fontWeight: "normal",
                          color: "#fff",
                        },
                      },
                    },
                  },
                };
                dataList.push(itemData);
              }
            }
            newSeries.push({
              name: data[i].name,
              type: "pie",
              // roseType: 'radius',
              roam: true, // 是否开启鼠标缩放和平移漫游
              radius: "8%",
              hoverAnimation: true,
              center: pCenter,
              label: {
                // formatter: '{b}{c}\n{hr|}',
                formatter: function (params) {
                  console.log(params);
                  return params.data.data.value + params.data.value; //+ "人111"; // 80岁以上：100人
                },
                rich: {
                  hr: {
                    backgroundColor: "t",
                    borderRadius: 3,
                    width: 3,
                    height: 3,
                    padding: [3, 3, 0, 0],
                  },
                  a: {
                    padding: [-30, 15, -20, 15],
                  },
                },
                // normal: {
                //   formatter: '{c}',
                //   position: 'outside'
                // },
                // fontSize: 15,
                // fontWeight: 'bold'
              },
              data: dataList,
            });
          }
        }
        option.series = newSeries;
        this.myChart.clear(); // 清空ECharts
        this.myChart.setOption(option);
      }
    },

    /**
     * 获取单个街道上的单个社区坐标
     * code 社区code
     * parentCode 街道code
     */
    getSingleShequMap(code, parentCode, bussinesType) {
      var _self = this;
      var myJson = hexiPianquStreet;
      // 显示某个街道底图层
      let geojson = JSON.parse(JSON.stringify(myJson));
      const filterGeo = geojson.features.filter(
        (item) => item.properties.code === parentCode
      );
      let registerMapName = "tianjin_hexi_streetmap" + new Date().valueOf();
      let newGeojson = _self.getNewGeojson(filterGeo, "registerMapName");
      echarts.registerMap(registerMapName, newGeojson);
      // let center = _self.getPolygonCenter(newGeojson)
      // 显示街道上的所有社区
      getByParentId({
        parentId: parentCode,
      }).then((res) => {
        let shequPoints = res;
        let shequPointsJson = JSON.parse(JSON.stringify(shequPoints)).data;
        const filteredGeoPoints = shequPointsJson.filter(
          (item) => item.code === code
        );

        var countryData = [];
        // 需要修改为真实值
        var _areaColor = streetData.data.filter(
          (item) => item.name === filterGeo[0].properties.name
        )[0].color;
        countryData.push(
          _self.setAreaColor(
            filterGeo[0].properties.name,
            30000,
            _areaColor,
            filterGeo[0].properties.code,
            filterGeo[0].properties.parentCode,
            40
          )
        );
        let option = {
          tooltip: {
            trigger: "item",
            backgroundColor: "#09bdb1",
            borderColor: "#FFFFCC",
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: "z-index:100",
            formatter: function (params, ticket, callback) {
              // 根据业务自己拓展要显示的内容
              console.log(params);
              var res = "";
              if (bussinesType === 2) {
                if (params.seriesType === "effectScatter") {
                  var name = params.name;
                  res = "<span style='color:#fff;'>" + name + "</span>";
                } else if (params.seriesType === "map") {
                  var name2 = params.name;
                  res = "<span style='color:#fff;'>" + name2 + "</span>";
                } else {
                  var kind = params.data.data.value;
                  var value2 = params.value;
                  // var value = params.value
                  res =
                    "<span style='color:#fff;'>" +
                    kind +
                    "</span>" +
                    value2 +
                    (kind == "楼道休息椅：" || kind == "适老化公园福一把："
                      ? "个"
                      : "人");
                }
                // }
              }
              return res;
            },
          },
          geo: {
            map: registerMapName,
            zoom: 1.02,
            roam: false, // 是否开启鼠标缩放和平移漫游
            itemStyle: {
              // 地图区域的多边形 图形样式
              normal: {
                // 是图形在默认状态下的样式
                areaColor: "rgba(26,137,212,0.1)",
                label: {
                  show: false, // 是否显示标签
                  textStyle: {
                    color: "#ff0",
                  },
                },
                borderWidth: 8,
                borderColor: "rgba(72,165,199)",
                // shadowColor: 'rgba(47,120,157,1)',
                shadowOffsetY: 15,
                shadowOffsetX: 8,
                shadowColor: "rgba(3,221,255,0.1)",
                shadowBlur: 10,
              },
              emphasis: {
                areaColor: "rgb(249, 249, 249,0.4)",
                borderWidth: 3,
                label: {
                  show: false, // 是否显示标签
                  textStyle: {
                    color: "transparent",
                  },
                },
              },
            },
          },
          series: [
            {
              type: "map",
              mapType: registerMapName,
              zoom: 1.0,
              // aspectScale: 0.75,
              roam: false, // 是否开启鼠标缩放和平移漫游
              itemStyle: {
                normal: {
                  label: {
                    show: true, // 是否显示标签
                    textStyle: {
                      color: "rgb(249, 249, 249)",
                      fontSize: 20,
                    },
                  },
                  areaColor: "#031525",
                  borderWidth: 3,
                  borderColor: "#00FEFF",
                  shadowColor: "rgba(3,221,255,1)",
                  shadowBlur: 10,
                },
                emphasis: {
                  show: false,
                  areaColor: "rgb(249, 249, 249,0.4)",
                  shadowBlur: 20,
                  label: {
                    show: false, // 是否显示标签
                    textStyle: {
                      color: "rgb(249, 249, 249)",
                    },
                  },
                },
              },
              data: countryData,
            },
          ],
        };
        _self.myChart.clear(); // 清空ECharts
        _self.myChart.setOption(option);

        getCommunityMapCountDetail({
          communityCode: code,
        }).then((res) => {
          // 重点老年人分布情况
          this.scatterSingleStreetData = filteredGeoPoints.map(function (
            feature
          ) {
            var _code = feature.code;
            var values = res.filter((item) => item.zcode === _code);
            if (values.length > 0) {
              let value = [];
              let importantOldManValue = {
                typeUp80: parseInt(values[0].parkCommunityDetail),
                typeAloneTotal: parseInt(values[0].buildingChairCommunityNum),
                typeIsLiveAlonelTotal: parseInt(values[0].fuChairCommunityNum),
              };

              value.push(
                feature.longitude,
                feature.latitude,
                importantOldManValue
              );
              return {
                code: feature.code,
                parent_code: feature.parentCode,
                name: feature.name,
                value: value,
                level: 4,
              };
            }
          });
          // 加载重点老年人位置点
          var seriesSheQuZDLNR = {
            type: "effectScatter",
            coordinateSystem: "geo",
            color: "#FF5500",
            roam: false, // 是否开启鼠标缩放和平移漫游
            avoidLabelOverlap: true,
            zoom: 1.02,
            showEffectOn: "render",
            rippleEffect: {
              period: 15,
              scale: 3,
              brushType: "fill",
            },
            symbolSize: function (val) {
              var value = 10; // parseInt(val[2] / 2)
              return value;
            },
            tooltip: {
              show: true,
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: "#FF5500", // 标志颜色
                shadowBlur: 10,
                shadowColor: "#333",
                label: {
                  show: true, // 是否显示标签
                  position: "bottom",
                  padding: [0, 0],
                  borderRadius: 3,
                  borderWidth: 1,
                  // backgroundColor: '#FF7000',
                  color: "#777",
                  borderColor: "",
                  formatter: function (params) {
                    return params.data.name.replace("居委会", "");
                  },
                  textStyle: {
                    color: "rgb(249, 249, 249)",
                    fontSize: 14,
                  },
                },
              },
            },
            data: this.scatterSingleStreetData,
          };
          option.series.push(seriesSheQuZDLNR);
          _self.myChart.setOption(option);
          var legendData = _self.$refs["myCheckLegend"].getLegendData();
          this.addPieChart(legendData);
        });

        setTimeout(function () {
          window.onresize = function () {
            _self.myChart.resize();
          };
        }, 200);
      });
      // })
    },

    getPolygonCenter(geojson) {
      let center;
      if (geojson !== "") {
        center = turf.center(geojson);
      }
      return center;
    },
  },
};
</script>

<style lang="less" scoped>
.map {
  height: 100%;
  width: 100%;
}
.MonitorDataCenter {
  height: 14.5rem;
  width: 4rem;
  position: relative;
  // background: #47091b;
  margin-left: 30%;
  margin-right: 30%;
  pointer-events: none;
}
</style>
