import echarts from "echarts";
import Vue from "vue";
import { debounce } from "lodash";
import elementResizeDetectorMaker from "element-resize-detector";

const HANDLER = "_vue_echarts_handler";

function bind(el) {
  unbind(el);
  el[HANDLER] = debounce(() => {
    if (el.firstElementChild.getAttribute("_echarts_instance_")) {
      const chart = echarts.getInstanceByDom(el.firstElementChild);
      if (!chart) {
        return;
      }
      chart.resize();
    }
  }, 50);
  // window.addEventListener('resize', el[HANDLER])
  elementResizeDetectorMaker().listenTo(el, el[HANDLER]);
}
function unbind(el) {
  // window.removeEventListener('resize', el[HANDLER])
  elementResizeDetectorMaker().removeListener(el, el[HANDLER]);
  delete el[HANDLER];
}
var directive = {
  bind: bind,
  unbind: unbind,
};
Vue.directive("on-echart", directive);
