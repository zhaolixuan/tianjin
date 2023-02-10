<template>
  <div class="AddEditAddress">
    <p class="zhu">
      注：老人不在默认地址期间，可选择添加地址进行服务，如在其他子女家中，或更换家庭地址，只允许添加河西区内住址
    </p>
    <van-form @submit="save">
      <div class="info">
        <van-field
          v-model="addressData.name"
          required
          label="联系人"
          placeholder="请输入"
          :rules="[{ required: true }]"
        />
        <van-field label="性别">
          <template #input>
            <div
              class="btn"
              :class="{ active: addressData.sex == '0' }"
              @click="addressData.sex = 0"
            >
              先生
            </div>
            <div
              class="btn"
              :class="{ active: addressData.sex == '1' }"
              @click="addressData.sex = 1"
            >
              女士
            </div>
          </template>
        </van-field>
        <van-field
          v-model="addressData.phone"
          required
          type="tel"
          label="联系电话"
          placeholder="请输入服务人员手机号"
          :rules="[
            { required: true },
            { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' },
          ]"
        />
      </div>

      <div class="info">
        <van-field
          readonly
          clickable
          name="area"
          :value="addressData.area"
          required
          label="地区选择"
          placeholder="点击选择省市区"
          @click="showArea = true"
          :rules="[{ required: true }]"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="onConfirm"
            @cancel="showArea = false"
          />
        </van-popup>
        <van-field
          required
          v-model="addressData.address"
          label="服务地址"
          placeholder="请输入收货地址"
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="addressData.house"
          label="楼号门牌"
          placeholder="完善楼号/单元/门牌号"
        />
        <van-field name="switch" label="默认">
          <template #input>
            <van-switch v-model="addressData.state" size="20" />
          </template>
        </van-field>
      </div>
      <van-button round class="save" block type="info" native-type="submit"
        >提交</van-button
      >
      <div class="del" v-if="$route.query && $route.query.id" @click="del">
        删除
      </div>
    </van-form>
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import {
  saveUserAddress,
  updateUserAddress,
  deleteUserAddress,
  getUserAddress,
} from "@/api/home";

import { getCookie } from "@/utils/storage";
// import { mapGetters } from "vuex";
export default {
  data() {
    return {
      addressData: {
        name: "",
        phone: "",
        sex: 0,
        area: "",
        address: "",
        house: "",
        state: false,
      },
      showArea: false,
      areaList,
    };
  },
  created() {},
  mounted() {
    if (this.$route.query && this.$route.query.id) {
      this.$route.meta.title = "编辑地址";
      this.getData();
    }
  },
  computed: {
    // ...mapGetters(["infoName"]),
    infoName: function () {
      return getCookie("idCard").split("idCard")[1] || "";
    },
  },
  methods: {
    getData() {
      getUserAddress({ id: this.$route.query.id }).then((res) => {
        this.addressData = {
          ...res.data,
          area: res.data.address.split("-")[0],
          address: res.data.address.split("-")[1],
          house: res.data.address.split("-")[2],
          state: res.data.state ? true : false,
          sex: 1,
        };
      });
    },
    save() {
      let { area, address, house, name, phone, state, sex } = this.addressData;
      let data = {
        idCard: this.infoName,
        address: area + "-" + address + "-" + house,
        name,
        phone,
        state: state ? 1 : 0,
        sex: sex ? "女" : "男",
      };
      const loading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      if (this.$route.query && this.$route.query.id) {
        data.id = this.$route.query.id;
        updateUserAddress(data).then((res) => {
          loading.clear();
          if (res && res.code == 200) {
            this.$toast.success("保存成功");
            setTimeout(() => {
              this.$router.go(-1);
            }, 300);
          } else {
            this.$toast.fail("保存失败");
          }
        });
      } else {
        saveUserAddress(data).then((res) => {
          loading.clear();
          if (res && res.code == 200) {
            this.$toast.success("保存成功");
            setTimeout(() => {
              this.$router.go(-1);
            }, 300);
          } else {
            this.$toast.fail("保存失败");
          }
        });
      }
    },
    del() {
      deleteUserAddress({ id: this.$route.query.id }).then((res) => {
        if (res && res.code == 200) {
          this.$toast.success("删除成功");
          setTimeout(() => {
            this.$router.go(-1);
          }, 300);
        } else {
          this.$toast.fail("删除失败");
        }
      });
    },
    onConfirm(values) {
      this.addressData.area = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("");
      this.showArea = false;
    },
  },
};
</script>

<style scoped lang="less">
.AddEditAddress {
  text-align: left;
  padding-bottom: 20px;
  // position: relative;
  .zhu {
    margin: 17px 12px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 27px;
  }
  .btn {
    width: 70px;
    height: 30px;
    border-radius: 25px;
    border: 1px solid #05b178;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #05b178;
    text-align: center;
    line-height: 30px;
    box-sizing: border-box;
    margin-right: 10px;
  }
  .active {
    color: #ffffff;
    background: #05b178;
  }
  .info {
    margin-bottom: 17px;
    .van-field {
      // height: 50px;
      padding: 14px;
    }
  }
  .save {
    width: 352px;
    height: 53px;
    background: #05b178;
    border-radius: 4px;
    // position: fixed;
    // bottom: 1%;
    // left: 12px;
    margin-left: 12px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 53px;
    text-align: center;
    margin-bottom: 14px;
  }
  .del {
    width: 352px;
    height: 53px;
    background: red;
    border-radius: 4px;
    margin-left: 12px;
    // position: fixed;
    // bottom: 1%;
    // left: 12px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 53px;
    text-align: center;
  }
}
</style>
