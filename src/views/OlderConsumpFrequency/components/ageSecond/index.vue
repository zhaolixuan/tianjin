<template>
  <div class="older-content">
    <service-type :MedircalData="ServiceData" path="olderPage"></service-type>
  </div>
</template>

<script>
import ServiceType from "../ageSecondType/index.vue";
import api from "@/api/api.js";

export default {
  data() {
    return {
      ServiceData: {},
      service: {
        title: [],
        data: [],
        label: true,
        labelWidth: 30
      }
    };
  },

  props: {
    ageMap: {
      type: Object,
      default: () => {}
    },
    statisticsForm: {
      type: Object,
      default: () => {
        return {};
      }
    },
    count: {
      type: String
    },

    ispressSearchButton: {
      type: Number
    }
  },

  watch: {
    ispressSearchButton() {
      // this.getConsumeDistributionList();
      this.getConsumeDistributionListTwo();
    }
  },

  mounted() {
    // this.getConsumeDistributionList();
    this.getConsumeDistributionListTwo();
  },

  components: {
    ServiceType
  },

  methods: {
    getConsumeDistributionList() {
      let params = {
        beginDay: this.statisticsForm.beginDay,
        endDay: this.statisticsForm.endDay,
        MinNum: this.statisticsForm.count,
        MaxNum: this.statisticsForm.MaxNum
      };
      api.getAgeTotalMap(params).then(res => {
        console.log(res);
        if (res.code && res.code == 200) {
          var resData = res.data;
          this.service.title = [];
          this.service.data = [];
          for (var k in resData) {
            this.service.title.push(k);
            this.service.data.push(resData[k]);
          }
          // 删除最后一个 nineTotal
          var last = this.service.title.pop();
          // 将 nineTotal 插入到第一
          this.service.title.splice(0, 0, last);
          // this.swap(this.service.title,1,2)

          // 改变 data 数组元素中的数据
          var lastData = this.service.data.pop();
          this.service.data.splice(0, 0, lastData);
          // this.swap(this.service.data,1,2)

          console.log(this.service.data);
          for (var i = 0; i < this.service.title.length; i++) {
            if (this.service.title[i] == "sixTotal") {
              this.service.title[i] = "60-69 岁";
            } else if (this.service.title[i] == "sevenTotal") {
              this.service.title[i] = "70-79 岁";
            } else if (this.service.title[i] == "eightTotal") {
              this.service.title[i] = "80-89 岁";
            } else if (this.service.title[i] == "nineTotal") {
              this.service.title[i] = "90岁以上";
            }
          }
          this.ServiceData = this.service;
        }
      });
    },

    // 数组交换位置
    swap(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },

    // 2022年01月20日新做 上面写法太 low
    getConsumeDistributionListTwo() {
      let params = {
        beginDay: this.statisticsForm.beginDay,
        endDay: this.statisticsForm.endDay,
        MinNum: this.statisticsForm.count,
        MaxNum: this.statisticsForm.MaxNum
      };
      api.getAgeTotalMap(params).then(res => {
        if (res.code && res.code == 200) {
          let { sixTotal, sevenTotal, eightTotal, nineTotal } = res.data;
          this.service.title = [];
          this.service.data = [];
          this.ServiceData = {
            title: ["60-69 岁", "70-79 岁", "80-89 岁", "90岁以上"].reverse(),
            data: [sixTotal, sevenTotal, eightTotal, nineTotal].reverse(),
            label: true,
            labelWidth: 30
          };
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.older-content {
  // 嵌到 OlderConsumpFrequency/index.vue(主组件)的子组件
  // 控制 在主组件的高度为 1.9rem
  height: 1.9rem;
}
</style>
