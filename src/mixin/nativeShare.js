import NativeShare from "nativeshare";
export default {
  data() {
    return {
      nativeShare: null,
    };
  },
  mounted() {
    this.nativeShare = new NativeShare();
    var shareData = {
      title: window.document.title,
      desc: (this.detailsListData && this.detailsListData.articleTitle) || "",
      // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
      link: window.location.href,
      icon: "",
      // 不要过于依赖以下两个回调，很多浏览器是不支持的
      // success: function () {
      //   alert("success");
      // },
      // fail: function () {
      //   alert("fail");
      // },
    };
    this.nativeShare.setShareData(shareData);
  },
  methods: {
    share() {
      try {
        this.nativeShare.call();
      } catch (err) {
        // 如果不支持，你可以在这里做降级处理
        console.log(res);
      }
    },
  },
};
