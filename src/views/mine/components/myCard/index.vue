<template>
  <div>
    <p class="title">居家养老服务卡支付二维码</p>
    <div class="box">
      <div id="qrcode" ref="qrcode"></div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.qrCode(window.location.href.replace("myCard", "bindCard"));
  },
  methods: {
    qrCode(url) {
      let qrcode = new QRCode("qrcode", {
        width: 150, //图像宽度
        height: 150, //图像高度
        colorDark: "#000000", //前景色
        colorLight: "#ffffff", //背景色
        typeNumber: 4,
        correctLevel: QRCode.CorrectLevel.H, //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
      });
      qrcode.clear(); //清除二维码
      qrcode.makeCode(url); //生成另一个新的二维码
    },
  },
};
</script>

<style scoped lang="less">
.title {
  text-align: center;
  font-size: 18px;
  margin-top: 22px;
}
.box {
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
