<template>
  <div class="service_record_detail_container">
    <div class="detail_header_tab">
      <div
        v-on:click="handleChangeItem('全部')"
        :class="['tab_item', activeTabItem == '全部' ? 'isActive' : '']"
      >
        全部
      </div>
      <div
        v-for="(item, index) in detailsTabList"
        :key="index"
        :class="[
          'tab_item',
          activeTabItem == item.projectName ? 'isActive' : '',
        ]"
        v-on:click="handleChangeItem(item.projectName)"
      >
        {{ item.projectName }}
      </div>
    </div>
    <div class="detail_content">
      <div class="detail_middle_show_total">
        <span>共计 {{ showItemList.length || 0 }} 条</span>
      </div>
      <div class="show_container">
        <div
          class="show_item"
          v-for="(item, index) in showItemList"
          :key="index"
        >
          <div class="img_cont">
            <img :src="item.avatar" alt="" />
          </div>
          <div class="info_cont">
            <div class="info_name">{{ item.servicePersonal }}</div>
            <div class="info_sex_age">
              <span class="sex">性别：{{ item.sex }}</span>
              <span class="age">年龄：{{ item.age }}</span>
            </div>
            <div class="health">身体状况：{{ item.healthStatus }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStatisticalRecordsByCategory } from "@/api/serviceExe";

export default {
  data() {
    return {
      activeTabItem: "全部",
      detailsTabList: ["全部"],
      total: "23",
      showItemList: [],
    };
  },
  watch: {
    activeTabItem(n) {
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      let data = {
        projectName: this.$route.query.name,
        projectTypeName: this.activeTabItem == "全部" ? "" : this.activeTabItem,
      };
      getStatisticalRecordsByCategory(data)
        .then((res) => {
          if (res && res.code == 200) {
            this.detailsTabList = res.data.mealsServiceProjectList;
            this.showItemList = res.data.orderPersonalResultList;
          }
        })
        .catch((err) => {});
    },
    handleChangeItem(item) {
      // console.log(item);
      this.activeTabItem = item;
      // item 作为参数进行接口请求
    },
  },
};
</script>

<style lang="less" scoped>
.service_record_detail_container {
  background-color: #f6f6f6;
  .detail_header_tab {
    padding: 0px 0.34667rem;
    padding-top: 0.21333rem;
    width: 100%;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    &&::-webkit-scrollbar {
      display: none;
    }
    .tab_item {
      // width: 72px;
      // height: 34px;

      padding: 4px 10px;
      margin-right: 14px;
      margin-bottom: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 17px;
      border: 1px solid rgba(0, 0, 0, 0.3);
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #040404;
      background: #ffffff;
    }
    .isActive {
      border: 1px solid #05b178;
      color: #05b178;
      background: rgba(5, 177, 120, 0.05);
    }
  }
  .detail_content {
    .detail_middle_show_total {
      height: 48px;
      padding: 0px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 20px;
      }
    }
    .show_container {
      background-color: #fff;
      .show_item {
        height: 135px;
        padding: 0px 14px;
        border: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .img_cont {
          width: 84px;
          height: 84px;
          margin-right: 17px;
          border: 1px solid #eee;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info_cont {
          flex: 1;
          height: 84px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          text-align: left;
          .info_name {
            height: 25px;
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #000000;
            line-height: 25px;
          }
          .info_sex_age,
          .health {
            height: 22px;
            margin-top: 10px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.5);
            line-height: 22px;
          }
          .info_sex_age {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .sex {
              margin-right: 67px;
            }
          }
          .health {
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>
