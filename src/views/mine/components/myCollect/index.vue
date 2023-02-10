<template>
  <div class="collect-container">
    <van-tabs v-model="activeName" color="#49c79d" class="tabs">
      <van-tab title="商品" name="0">
        <div class="" v-for="(item, index) in collectList" :key="index">
          <van-swipe-cell>
            <div class="collect-item" @click="checkdeils(item)">
              <div class="img">
                <img :src="item.photoUrl" alt="" />
              </div>
              <div class="collect-info">
                <div class="collect-info-name">{{ item.name }}</div>
                <div class="collect-info-price">￥{{ item.price }}</div>
              </div>
            </div>
            <template #right>
              <van-button
                square
                @click="beforeClose(item)"
                text="删除收藏"
                type="danger"
                class="delete-button"
              />
            </template>
          </van-swipe-cell>
        </div>
      </van-tab>
      <van-tab title="活动" name="1">
        <div class="" v-for="(item, index) in collectList" :key="index">
          <van-swipe-cell>
            <div class="collect-item" @click="checkdeils(item)">
              <div class="img">
                <img :src="item.files && item.files[0].url" alt="" />
              </div>
              <div class="collect-info">
                <div class="collect-info-name">{{ item.activeTitle }}</div>
                <!-- <div class="collect-info-price">￥{{ item.price }}</div> -->
                <div class="collect-info-name">{{ item.applyType }}</div>
                <div class="collect-info-name">{{ item.publishTime }}</div>
              </div>
            </div>
            <template #right>
              <van-button
                square
                @click="beforeClose(item)"
                text="删除收藏"
                type="danger"
                class="delete-button"
              />
            </template>
          </van-swipe-cell>
        </div>
      </van-tab>
    </van-tabs>

    <van-empty v-if="!collectList.length" description="暂无收藏" />
  </div>
</template>

<script>
import { conllectionList, conllectionDeleteItem } from "@/api/mine";
import { getCookie } from "@/utils/storage.js";

export default {
  name: "myCollect",
  data() {
    return {
      collectList: [],
      activeName: "0",
      limit: 10,
      page: 1,
      loading: false,
      finished: false,
    };
  },
  watch: {
    activeName() {
      this.finished = false;
      this.page = 1;
      this.collectList = [];
      this.getData();
    },
  },
  methods: {
    checkdeils(i) {
      let { typeCode, projectCode, serviceMealsId, projectName, name, id } = i;
      if (this.activeName == "0") {
        //商品
        this.$router.push({
          path: "/serviceDetails",
          query: {
            typeCode,
            projectCode,
            mealsInfoId: serviceMealsId,
            projectName,
            name,
          },
        });
      } else {
        //活动
        this.$router.push({
          path: "/activityDetails",
          query: {
            id,
          },
        });
      }
    },
    onLoad() {
      this.page++;
      this.getData();
    },
    beforeClose(i) {
      this.$dialog
        .confirm({
          message: "确定删除收藏吗？",
        })
        .then(() => {
          conllectionDeleteItem({ collectionId: i.id })
            .then((res) => {
              if (res && res.code == 200) {
                this.getData();
              }
            })
            .catch((err) => {});
        });
    },
    getData() {
      let data = {
        idCard: getCookie("idCard").split("idCard")[1],
        type: this.activeName,
        limit: this.limit,
        page: this.page,
      };
      conllectionList(data)
        .then((res) => {
          if (res && res.code == 200) {
            res.data.forEach((i) => {
              this.collectList.push(i);
            });
            if (res.data.length < 10) {
              this.finished = true;
            }
          } else {
            this.collectList = [];
            this.finished = true;
          }
        })
        .catch((err) => {});
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.collect-container {
  background: #fff;
}
.collect-item {
  height: 120px;
  box-sizing: border-box;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 18px 32px 20px 14px;
  display: flex;
  .img {
    height: 82px;
    width: 82px;
    // border: 1px solid green;
    margin-right: 18px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .collect-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .collect-info-name {
      // height: 48px;
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 24px;
      text-align: left;
    }
    .collect-info-price {
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #e62c3b;
      line-height: 28px;
      text-align: left;
      margin-top: 6px;
    }
  }
}
</style>
