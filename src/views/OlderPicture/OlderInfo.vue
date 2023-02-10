<template>
  <div class="olderwrapper">
    <ListTable
      :title="title"
      :icon="icon"
      :infoData="infoData"
      :listData="listData"
      :row="true"
    ></ListTable>
  </div>
</template>

<script>
import ListTable from "./common/ListTable";

export default {
  props: {
    listData: {
      type: Object,
      default: {}
    },
    serviceList: {
      type: Array,
      default: []
    },
    jiezhongxinxi: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  components: {
    ListTable
  },

  data() {
    return {
      title: "疫苗接种情况",
      icon: "iconyanglaofuwu",
      newListData: {},
      infoData: [
        [
          {
            title: "一针疫苗名称",
            key: "vaccinessNameOne"
          },
          {
            title: "二针疫苗名称",
            key: "vaccinessNameTwo"
          },
          {
            title: "三针疫苗名称",
            key: "vaccinessNameThree"
          }
        ],
        [
          {
            title: "一针接种点",
            key: "vaccinessLocalOne"
          },
          {
            title: "二针接种点",
            key: "vaccinessLocalTwo"
          },
          {
            title: "三针接种点",
            key: "vaccinessLocalThree"
          }
        ],
        // [
        //   {title:"最近服务1", key:"service1"},
        //   {title:"最近服务2", key:"service2"},
        //   {title:"最近服务3", key:"service3"}
        // ],
        // 2021年12月15日 删最近服务 新增疫苗接种信息
        [
          { title: "一针接种时间", key: "vaccinessTimeOne" },
          { title: "二针接种时间", key: "vaccinessTimeTwo" },
          { title: "三针接种时间", key: "vaccinessTimeThree" }
          //   { title: "接种单位", key: "vaccinationUnit" }
        ]
      ]
    };
  },

  // 原有的代码结构 注释了
  watch: {
    listData: {
      handler: function(value) {
        // console.log(value);
        let vaccinessTimeOne = value.vaccinessTimeOne.split(" ");
        this.listData.vaccinessTimeOne = vaccinessTimeOne[0];

        let vaccinessTimeTwo = value.vaccinessTimeTwo.split(" ");
        this.listData.vaccinessTimeTwo = vaccinessTimeTwo[0];

        let vaccinessTimeThree = value.vaccinessTimeThree.split(" ");
        this.listData.vaccinessTimeThree = vaccinessTimeThree[0];
        // let newValues = {};
        // for (let key in value) {
        //   let valueArr = value[key] ? value[key].split(",") : [];
        //   let valueStr = valueArr
        //     .map((item, index) => {
        //       if (item.indexOf("其它") != -1) {
        //         return "其它";
        //       } else {
        //         return item;
        //       }
        //     })
        //     .join(",");
        //   newValues[key] = valueStr;
        // }
        // if (newValues && newValues.serviceTop3) {
        //   let top3List = newValues.serviceTop3.split(",");
        //   this.newListData = {
        //     ...newValues,
        //     top1: top3List[0] || "",
        //     top2: top3List[1] || "",
        //     top3: top3List[2] || ""
        //   };
        // }
      },
      deep: true
    }

    // serviceList: {
    //   handler: function(value) {
    //     if (value && value.length > 0) {
    //       this.newListData = {
    //         ...this.newListData,
    //         service1: (value[0] && value[0].serviceOrderItem) || "",
    //         service2: (value[1] && value[1].serviceOrderItem) || "",
    //         service3: (value[2] && value[2].serviceOrderItem) || ""
    //       };
    //     }
    //   },
    //   deep: true
    // }
  }
};
</script>

<style scoped>
.olderwrapper {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 9rem;
}
</style>
