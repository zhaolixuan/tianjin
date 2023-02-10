<template>
  <div class="current_time">{{ current }}</div>
</template>

<script>
function currentTime() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var second = date.getSeconds();
  if (month < 10) {
    month = "0" + month;
  } else if (day < 10) {
    day = "0" + day;
  } else if (hour < 10) {
    hour = "0" + hour;
  } else if (min < 10) {
    min = "0" + min;
  }
  second = second < 10 ? '0' + second : second;
  return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + second;
}

export default {
  data() {
    return {
      current: currentTime()
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      setInterval(() => {
        this.current = currentTime();
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.current_time {
  background-color: #f6f6f6;
}
</style>
