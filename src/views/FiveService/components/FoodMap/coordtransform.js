/*
 * @Description:
 * @Author: tangjuncheng
 * @Date: 2019-12-20 16:48:36
 * @LastEditTime : 2019-12-20 17:14:34
 * @LastEditors  : tangjuncheng
 */
// 定义一些常量
let xPI = 3.14159265358979324 * 3000.0 / 180.0
let PI = 3.1415926535897932384626
let a = 6378245.0
let ee = 0.00669342162296594323
export default {
  /**
   * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
   * 即 百度 转 谷歌、高德
   * @param bdLon
   * @param bdLat
   * @returns {*[]}
   */
  bd09togcj02 (_bdLon, _bdLat) {
    var bdLon = +_bdLon
    var bdLat = +_bdLat
    var x = bdLon - 0.0065
    var y = bdLat - 0.006
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xPI)
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xPI)
    var ggLng = z * Math.cos(theta)
    var ggLat = z * Math.sin(theta)
    return [ggLng, ggLat]
  },
  /**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即谷歌、高德 转 百度
 * @param lng
 * @param lat
 * @returns{*[]}
 */
  gcj02tobd09 (_lng, _lat) {
    var lat = +_lat
    var lng = +_lng
    var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * xPI)
    var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * xPI)
    var bdlng = z * Math.cos(theta) + 0.0065
    var bdlat = z * Math.sin(theta) + 0.006
    return [bdlng, bdlat]
  },
  /**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*[]}
 */
  wgs84togcj02 (_lng, _lat) {
    var lat = +_lat
    var lng = +_lng
    if (this.out_of_china(lng, lat)) {
      return [lng, lat]
    } else {
      var dlat = this.transformlat(lng - 105.0, lat - 35.0)
      var dlng = this.transformlng(lng - 105.0, lat - 35.0)
      var radlat = lat / 180.0 * PI
      var magic = Math.sin(radlat)
      magic = 1 - ee * magic * magic
      var sqrtmagic = Math.sqrt(magic)
      dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI)
      dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI)
      var mglat = lat + dlat
      var mglng = lng + dlng
      return [mglng, mglat]
    }
  },
  /**
 * GCJ02 转换为 WGS84
 * @param lng
 * @param lat
 * @returns {*[]}
 */
  gcj02towgs84 (_lng, _lat) {
    var lat = +_lat
    var lng = +_lng
    if (this.out_of_china(lng, lat)) {
      return [lng, lat]
    } else {
      var dlat = this.transformlat(lng - 105.0, lat - 35.0)
      var dlng = this.transformlng(lng - 105.0, lat - 35.0)
      var radlat = lat / 180.0 * PI
      var magic = Math.sin(radlat)
      magic = 1 - ee * magic * magic
      var sqrtmagic = Math.sqrt(magic)
      dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI)
      dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI)
      var mglat = lat + dlat
      var mglng = lng + dlng
      return [lng * 2 - mglng, lat * 2 - mglat]
    }
  },
  transformlat (_lng, _lat) {
    var lat = +_lat
    var lng = +_lng
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng))
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0
    return ret
  },
  transformlng (_lng, _lat) {
    var lat = +_lat
    var lng = +_lng
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0
    return ret
  },

  /**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
  out_of_china (_lng, _lat) {
    var lat = +_lat
    var lng = +_lng
    // 纬度3.86~53.55,经度73.66~135.05
    return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55)
  }
}
