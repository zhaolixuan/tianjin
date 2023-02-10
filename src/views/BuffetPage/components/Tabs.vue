<template>
  <div class="tab-content">
    <div :class="[activeIndex === index ? 'tabMain active' : 'tabMain']"
           v-for="(item,index) in tabList"
           :key="index"
           @click="getOldManTab(index+1)"
           @mouseover="changeHover(index)">
        <p class="content">{{item}}</p>

      </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  data () {
    return {
      tabList: ['全部订单', '近一个月的订单', '当日订单'],
      activeIndex: 0,
      params: {
        orderCreateTimeDay: '',
        orderCreateMonth: '',
        page: 1,
        pageSize: 5
      }
    }
  },
  methods: {
    getOldManTab (bussineType) {
      switch (bussineType) {
        case 1:
          this.clearParams()
          this.$emit('handelSearch', this.params)
          break
        case 2:
          this.clearParams()
          this.params.orderCreateMonth = new Date().getMonth() + 1
          this.$emit('handelSearch', this.params)
          break
        case 3:
          this.clearParams()
          this.params.orderCreateTimeDay = new Date().getDate()
          this.$emit('handelSearch', this.params)
          break
      }
    },
    clearParams () {
      this.params = {
        orderCreateTimeDay: '',
        orderCreateMonth: '',
        page: 1,
        pageSize: 3
      }
    },
    changeHover (bussineType) {
      this.activeIndex = bussineType
    }
  }
}
</script>

<style lang="less" scoped>
.tab-content{
  display: flex;
  flex-direction: row;
  padding-top: 0.06rem;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  height: .5rem;
  width: 80%;
  justify-content: center;
  pointer-events: auto;
}
.tabMain {
  height: 0.4rem;
  width: 1.53rem;
  //border: 1px solid rgba(39, 242, 255, 0.5);
  text-align: center;
  line-height: .3rem;
  font-family: MicrosoftYaHei;
  font-size: 0.14rem;
  color: #ffffff;
  //border-radius: 5px;
  background: url("./../../../assets/img/oldMan_tab.png") no-repeat;
  background-size: contain;
  :hover {
    cursor: pointer;
    background: url("./../../../assets/img/oldMan_tab_select.png") !important;
    // background-size: cover;
    font-family: MicrosoftYaHei-Bold;
    font-size: 0.18rem;
    color: #16fff1;
  }
}
.tabMain:nth-child(2){
    margin: 0 .4rem;
  }
.active {
  cursor: pointer;
  //background: url("../../../../assets/img/oldMan_tab_select.png") !important;
  // background-size: cover;
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.16rem;
  color: #16fff1;
  box-sizing: border-box;
  border-bottom: 2px solid #16FFF1;
}
.content {
  margin: 0.05rem;
}
</style>
