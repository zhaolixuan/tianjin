/**
 * @author liang
 * @param {String} boxId为必传生成EC的ID
 * @param {Object} config为配置项
 * @description
 *      引入JS，init图表之后 new myTooltip()，此时可传递config覆盖样式
 *      getPosOrSize('pos', pos)获取tooltip生成位置
 *      getTooltipDom(text)传递需要展示text，获取tooltipDom
 *      text大小需要根据内容进行微调
 */

import createjs from 'createjs-cmd'
import { TimelineMax } from 'gsap'
export default class myTooltipC {
  constructor (boxId, config = {}) {
    if (!boxId) throw Error('boxId为必传项')
    this.boxId = boxId
    let mapboxWidth = $('.map-box').eq(0).width()
    let mapboxHeight = $('.map-box').eq(0).height()
    let offsetX = 80 / 1020 * mapboxWidth
    let offsetY = 200 / 740 * mapboxHeight

    this.config = {
      priority: 'top', // 默认在点上方OR下方（top/bottom）
      partition: 1.4, // 左右分割比例
      lineColor: 'rgba(0,157,255,0.6)', // 引导线颜色
      shadowOffset: [80, 160], // 弹出框距离画布的left,top
      offset: [offsetX, offsetY], // 弹出框距离画布的left,top ；为解决画布内容模糊问题，像素值增大两倍
      L1: {
        time: 0.3, // L1动画时长(单位s)
        long: 20 // L1长度 ；为解决画布内容模糊问题，像素值增大两倍
      },
      L2: {
        time: 0.3,
        long: 80 // L2 ; 为解决画布内容模糊问题，像素值增大两倍
      },
      rowline: { // 渐变分割线(缩小到0.8倍) ；为解决画布内容模糊问题，像素值增大两倍
        start: [32, 134.4],
        end: [320, 134.4],
        width: 2,
        colors: ['rgba(0,107,223,0)', 'rgba(0,107,223,1)', 'rgba(0,107,223,0)'] // 渐变的颜色数组
      },
      text: { // 弹出框里文本样式(缩小到0.8倍) ；为解决画布内容模糊问题，像素值增大两倍
        time: 0.5,
        font: ['22.4px Arial', '25.6px Arial', '19.2px Arial', '19.2px Arial'], // 与传入的text数组相对应的样式
        color: '#fff',
        padding: [48, 48],
        width: 352,
        height: 356,
        lineHeight: 35.2,
        backgroundColor: 'rgba(15,126,255,0.01)',
        borderColor: 'rgba(0,157,255,0.6)',
        shadowColor: 'rgba(0,157,255,0.6)',
        borderWidth: 2,
        angle: {
          width: 0,
          long: 0
        }
      }
    }
    $.merge(this.config, config, {
      left: false,
      top: false
    })
  }
  getPosOrSize (type, point) { // 弹出框的位置
    // let x1 = this.config.L1.long * Math.sin(Math.PI / 4)
    let width = this.config.offset[0] + this.config.L2.long + this.config.text.width // 弹出框连接点距离画布左边界的距离
    let height = this.config.offset[1] + this.config.text.height / 4 // 弹出框连接点距离画布顶端的距离
    if (type === 'size') {
      this.config.width = width
      this.config.height = height
      return {
        width,
        height
      }
    } else {
      this.config.point = point
      let map = document.getElementById(this.boxId) // 地图画布
      let mapWidth = map.offsetWidth
      let mapHeight = map.offsetHeight
      let x = point[0]
      let y = point[1]
      this.config.left = true
      /**
       if (x + width >= mapWidth / this.config.partition) {
                x = x - width - this.config.offset[0]
                this.config.left = true
            }
       */
      if (this.config.priority === 'top') {
        // L1向上
        this.config.top = true
        y = y - height - this.config.offset[0]
        if (y <= 0) {
          y = point[1]
          this.config.top = false
        }
        return [x, y]
      } else {
        this.config.top = false
        if (y + height >= mapHeight) {
          y = y - height - this.config.offset[0]
          this.config.top = true
        }
        return [x, y]
      }
    }
  }
  getTooltipDom (text) {
    if (!text) throw Error('text为必传项')
    return this.clickTrigger(text)
  }
  createTooltip (text) {
    let me = this
    setTimeout(_ => {
      me.t = new createTooltip('tCanvas', me.config, text)
    }, 0)
  }
  clickTrigger (text) {
    this.createTooltip(text)
    let size = this.getPosOrSize('size')
    // 设置弹出框canvas的宽高和位置
    let boxWidth = $('.map-box')[0].clientWidth * 0.9 * 2 // 为解决画布内容模糊问题，像素值增大两倍
    let boxHeight = $('.map-box')[0].clientHeight * 0.9 * 2 // 为解决画布内容模糊问题，像素值增大两倍
    return `<canvas id="tCanvas" width=${boxWidth} height=${boxHeight}></canvas>`
  }
}

class createTooltip {
  constructor (id, config, text) {
    this.config = config
    this.text = text
    this.totalTime = 0
    this.over = false
    this.stage = new createjs.Stage(id)
    this.timeline = new TimelineMax({ repeat: 0 })
    this.g = new createjs.Graphics()
    this.lineShape = new createjs.Shape(this.g)
    this.textContainer = new createjs.Container();
    this.textShape = new createjs.Shape()
    this.textContainer.addChild(this.textShape)
    this.stage.addChild(this.lineShape, this.textContainer)
    this.init()
    this.begin()
    this.update()
  }
  init () {
    // 根据不同展示位置计算起点位置（从弹出框边缘开始）
    this.start = [0, 0]
    if (this.config.left) {
      this.start[0] = this.config.width
    }
    if (this.config.top) {
      this.start[1] = this.config.height
    } else {
      this.start[1] = this.config.height
    }
  }
  begin () {
    this.L1()
    this.L2()
    this.addText()
  }
  L1 () {
    let me = this
    let c = me.config
    let tl = new TimelineMax()
    let scale = { s: 0 }
    let x = c.L1.long * Math.sin(Math.PI / 4)
    this.L1End = [c.point[0] - x, c.point[1] - x]

    tl.to(scale, c.L1.time, {
      s: 1,
      onUpdate () {
        let s = scale.s
        me.g.c().s(c.lineColor).mt(c.point[0] - x * s,c.point[1] - x * s).lt(...me.start)
        me.update()
      }
    })
    this.timeline.add(tl, this.totalTime)
    this.totalTime += c.L1.time
  }
  L2 () {
    // 只跟左右有关，只判断this.config.left
    let me = this
    let c = me.config
    let tl = new TimelineMax()
    let scale = { s: 0 }
    tl.to(scale, c.L2.time, {
      s: 1,
      onUpdate () {
        let s = scale.s
        me.g.c().s(c.lineColor).mt(...me.L1End).lt(...me.start).lt(me.start[0] - c.L2.long * s, me.start[1])
        me.update()
      }
    })
    this.timeline.add(tl, this.totalTime)
    this.totalTime += c.L2.time
  }
  hiddenText (text) { // 对超长项目名称进行截取
    if (text.length >= 12) {
      return text.slice(0, 12).concat('...')
    }
    return text
  }
  addText () { // 弹出框和引导线
    // text框只与L2end有关，只需判断left即可，top不影响
    let me = this
    let c = me.config
    let tl = new TimelineMax()
    let scale = { s: 0 }
    let L2End = [me.L1End[0] + c.L2.long, me.L1End[1]]
    if (me.config.left) {
      L2End = [me.L1End[0] - c.L2.long, me.L1End[1]]
    }
    tl.to(scale, c.text.time, {
      s: 1,
      onStart () {
        let x = 0
        if (me.config.left) {
          x = L2End[0] - c.text.width
        } else {
          x = L2End[0]
        }
        // me.g.c().s(c.lineColor).mt(...me.start).lt(...me.L1End).lt(...L2End)
        // 容器定位
        // me.textContainer.x = x
        // me.textContainer.y = L2End[1] - c.text.height / 2
        me.textContainer.x = c.offset[0]
        me.textContainer.y = c.offset[1]

        me.textBorder(c.text.width, c.text.height - 2)
        // 单独调整每个text的样式
        me.textA = new createjs.Text(me.hiddenText(me.text[0]), c.text.font[0], c.text.color)
        me.textB = new createjs.Text(me.text[1], c.text.font[1], c.text.color)
        me.textC = new createjs.Text(me.text[2], c.text.font[2], c.text.color)
        me.textD = new createjs.Text(me.text[3], c.text.font[3], c.text.color)

        me.textA.lineHeight = c.text.lineHeight
        me.textA.x = c.text.padding[0]
        me.textA.y = c.text.padding[1]

        me.textB.lineHeight = c.text.lineHeight
        me.textB.x = c.text.padding[0]
        me.textB.y = c.text.padding[1] + c.text.lineHeight

        let textBLen = parseInt(me.text[1].length) * parseInt(c.text.font[1]) / 1.8 + 5
        me.textC.lineHeight = c.text.lineHeight
        me.textC.x = c.text.padding[0] + textBLen
        me.textC.y = c.text.padding[1] + c.text.lineHeight + 3

        me.textD.lineHeight = c.text.lineHeight
        me.textD.x = c.text.padding[0]
        me.textD.y = c.text.padding[1] + c.text.lineHeight * 3.5

        me.textContainer.addChild(me.textA, me.textB, me.textC, me.textD)
        me.textShape.graphics.c().f(c.text.backgroundColor)
          .r(c.text.angle.width, c.text.angle.width, c.text.width - c.text.angle.width * 2, c.text.height - c.text.angle.width * 2)
        me.textShape.alpha = 0
        me.update()
      },
      onUpdate () {
        if (!me.textC) return
        me.textC.alpha = scale.s
        me.textShape.alpha = Math.sin(scale.s * Math.PI * 2.5)
        me.update()
      },
      onComplete () {
        me.over = true
      }
    })
    this.timeline.add(tl, this.totalTime)
  }
  textBorder (w, h) {
    let me = this
    let borderWidth = 1
    let borderAngle = new createjs.Shape()
    let border = new createjs.Shape()
    let rowline = new createjs.Shape()
    let rowStyle = this.config.rowline
    let shadowFillRight = new createjs.Shape()
    let shadowFillLeft = new createjs.Shape()
    let shadowFillTop = new createjs.Shape()
    let shadowFillBottom = new createjs.Shape()
    let backgroundColor = this.config.text.backgroundColor
    let boxOffsetX = this.config.shadowOffset[0]
    let boxOffsetY = this.config.shadowOffset[1]
    let boxWidth = this.config.text.width
    let boxHeight = this.config.text.height
    let color = this.config.text.borderColor
    let shadowColor = this.config.text.shadowColor
    this.textContainer.addChild(borderAngle, border, rowline, shadowFillRight, shadowFillLeft, shadowFillTop, shadowFillBottom)
    let angle = this.config.text.angle
    // 偏移量
    let skew = angle.width / 2

    let tl = new TimelineMax()
    let scale = { s: 0 }
    // 渐变背景色实现阴影效果  shadowRowFill: 横向渐变效果，从边框颜色渐变到背景色再渐变到边框颜色
    shadowFillRight.graphics.c().ss(0).lf([backgroundColor, shadowColor], [0.7, 1], boxOffsetX, boxOffsetY, boxOffsetX + boxWidth, boxOffsetY).drawRect(0, 0, boxWidth - 1, boxHeight - 1)
    shadowFillLeft.graphics.c().ss(0).lf([backgroundColor, shadowColor], [0.7, 1], boxOffsetX, boxOffsetY, boxOffsetX + boxWidth, boxOffsetY).drawRect(0, 0, boxWidth - 1, boxHeight - 1)
    shadowFillTop.graphics.c().ss(0).lf([backgroundColor, shadowColor], [0.7, 1], boxOffsetX, boxOffsetY, boxOffsetX + boxWidth, boxOffsetY).drawRect(0, 0, boxWidth - 1, boxHeight - 1)
    shadowFillBottom.graphics.c().ss(0).lf([backgroundColor, shadowColor], [0.7, 1], boxOffsetX, boxOffsetY, boxOffsetX + boxWidth, boxOffsetY).drawRect(0, 0, boxWidth - 1, boxHeight - 1)
    shadowFillLeft.setTransform(boxWidth, boxHeight, 1, 1, 180)
    shadowFillBottom.setTransform(boxWidth, 4, 1, 1, 90)
    shadowFillTop.setTransform(0, boxHeight - 4, 1, 1, 270)
    // 分割线
    rowline.graphics.c().ss(rowStyle.width).ls(rowStyle.colors,[0,0.5,1],rowStyle.start[0],rowStyle.start[1],rowStyle.end[0],rowStyle.end[1]).mt(rowStyle.start[0],rowStyle.start[1]).lt(rowStyle.end[0],rowStyle.end[1])
    // 四角
    borderAngle.graphics.c().s(color).ss(angle.width)
      .mt(skew, angle.long).lt(skew, skew).lt(angle.long, skew)
      .mt(skew, h - angle.long).lt(skew, h - skew).lt(angle.long, h - skew)
      .mt(w - angle.long, 0).lt(w - skew, skew).lt(w - skew, angle.long)
      .mt(w - angle.long, h).lt(w - skew, h - skew).lt(w - skew, h - angle.long)
    tl.to(scale, this.config.text.time / 4, {
      s: 1,
      onUpdate () {
        let s = scale.s
        border.graphics.c().s(color).ss(borderWidth).mt(skew, skew).lt((w - skew) * s, skew)
      }
    }).to(scale, this.config.text.time / 4, {
      s: 0,
      onUpdate () {
        let s = 1 - scale.s
        border.graphics.c().s(color).ss(borderWidth).mt(skew, skew)
          .lt(w - skew, skew).lt(w - skew, (h - skew) * s)
      }
    }).to(scale, this.config.text.time / 4, {
      s: 1,
      onUpdate () {
        let s = scale.s
        border.graphics.c().s(color).ss(borderWidth).mt(skew, skew)
          .lt(w - skew, skew).lt(w - skew, h - skew).lt(w - skew - (w - 2 * skew) * s, h - skew)
      }
    }).to(scale, this.config.text.time / 4, {
      s: 0,
      onUpdate () {
        let s = 1 - scale.s
        border.graphics.c().s(color).ss(borderWidth).mt(skew, skew)
          .lt(w - skew, skew).lt(w - skew, h - skew).lt(skew, h - skew).lt(skew, skew)
      }
    })
    this.timeline.add(tl, this.totalTime)
  }
  update () {
    this.stage.update()
  }
}
