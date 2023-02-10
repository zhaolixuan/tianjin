<template>
  <div class="addressList">
    <p class="zhu">
      注：最多设置三个固定地址，如不符合服务事项，服务人员有权拒绝服务。
    </p>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @edit-disabled="onEdit"
    />
    <van-empty
      v-if="!list.length"
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无地址"
    />
  </div>
</template>

<script>
import { getAddressList } from "@/api/home";
import { getCookie } from "@/utils/storage";
export default {
  data() {
    return {
      chosenAddressId: "",
      list: [],
      unClick: false,
      first: true,
    };
  },
  computed: {
    // ...mapGetters(["infoName"]),
    infoName: function () {
      return getCookie("idCard").split("idCard")[1] || "";
    },
  },
  watch: {
    chosenAddressId(n) {
      if (this.first) return (this.first = false);
      if (this.unClick) return;
      this.$router.push({ path: "/submitOrder", query: { id: n } });
    },
  },
  mounted() {
    this.getData();

    if (this.$route.query && this.$route.query.unClick) {
      this.unClick = true;
    }
  },
  methods: {
    getData() {
      let data = {
        idCard: this.infoName,
      };
      getAddressList(data).then((res) => {
        if (res && res.code == 200) {
          res.data.forEach((i) => {
            if (i.state == 1) {
              if (this.$route.query && this.$route.query.id) {
                this.chosenAddressId = this.$route.query.id * 1;
              } else {
                this.chosenAddressId = i.id;
              }
              this.list.unshift({
                id: i.id,
                name: i.name,
                tel: i.phone,
                address: i.address,
                isDefault: i.state == 1 ? true : false,
              });
            } else {
              this.list.push({
                id: i.id,
                name: i.name,
                tel: i.phone,
                address: i.address,
                isDefault: i.state == 1 ? true : false,
              });
            }
          });
        }
      });
    },
    onAdd() {
      //   Toast("新增地址");
      this.$router.push({ name: "AddEditAddress" });
    },
    onEdit(item, index) {
      this.$router.push({ path: "/addEditAddress", query: { id: item.id } });
      //   Toast("编辑地址:" + index);
    },
  },
};
</script>

<style scoped lang="less">
.addressList {
  text-align: left;
  .zhu {
    margin: 17px 12px 0;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 27px;
  }
}
</style>
