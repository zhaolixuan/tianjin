/**
 * iframe增加点击监听事件
 * 引入文件后调用：iframeClickListener.click(callback)
 */
export default {
  interval: null,
  Iframe (element, cb) {
    this.element = element;
    this.cb = cb;
    this.hasTracked = false;
  },
  // 触发iframe监听
  click (callback) {
    let _this = this;
    setTimeout(function () { // 等待页面iframe元素挂载
      let iframeElements = document.getElementsByTagName('iframe');
      if (iframeElements && iframeElements.length > 0) {
        _this.listener(iframeElements[0], callback);
      }
    }, 1000)
  },
  // 监听：(监听元素，回调方法)
  listener (element, cb) {
    let iframeElement = new this.Iframe(element, cb);
    if (!this.interval) {
      this.interval = setInterval(function () {
        let activeElement = document.activeElement;
        if (activeElement) {
          if (activeElement === iframeElement.element) {
            if (!iframeElement.hasTracked) {
              // iframeElement.cb.apply(window);
              iframeElement.cb();
              iframeElement.hasTracked = true;
            }
          } else {
            iframeElement.hasTracked = false;
          }
        }
      }, 200);
    }
  },
  // 移除监听
  removeListener () {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}