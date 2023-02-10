<template>
  <div class="bg_gif">
    <div class="nav_bg">
      <div class="nav_main">
        <div class="head_tit">
          <div class="date_box">
            <div id="time">{{time}}</div>
            <div id="dayTime">{{date}}{{week}}</div>
          </div>
          <h2><a href="/">{{title}}</a></h2>
        </div>
        <div class="list">
          <dl :key="itemIdx" v-for="(item,itemIdx) in items">
            <dt><i :class="item.class"></i><b></b>{{item.title}}</dt>
            <!--@click="changeActiveKey(itemIdx+1)"-->
            <dd v-if="item.children && item.children.length > 0" >
              <div class="dd_bg">
                <div :key="elIdx" v-for="(el ,elIdx) in item.children">
                  <p :class="el.class" v-if="el.type && el.type == 'goto' && el.url!==null ">
                    <i></i>
                    <a @click="closed(el.key,el.title)" :href="el.url">{{el.title}}</a>
                  </p>
                  <p :class="el.class" v-else-if="el.type && el.url!==null">
                    <i></i>
                    <a @click="closed(el.key,el.title)">
                      <router-link v-if="el.title !== '经济运行态势监测'" :to="{ path: el.type, query:{'url':el.url,'titleName':el.title, 'key': el.key } }">{{el.title}}</router-link>

                      <a v-else href="#/frame?titleName=经济运行态势监测&key=3&url=https://www.maicedata.com/#/?tk=nRmJz4CO1Ex2Ax9JZSr7BK4tF8KZuQ5mlvdCzla6N90ZjZI961MBltVyTdg08psl">经济运行态势监测</a>
                    </a>
                  </p>
                  <p :class="el.class" v-else-if="el.url!==null">
                    <i></i>
                    <a @click="closed(el.key,el.title)"><router-link :to="{ path: el.url  }">{{el.title}}</router-link></a>
                  </p>
                  <p :class="el.class" v-else><i></i><a href="javascript:void(0);">{{el.title}}</a></p>
                  <div v-if="el.children && el.children.length > 0">
                    <span :key="sIdx" v-for="(sEl,sIdx) in el.children" :class="sEl.class">
                      <router-link v-if="sEl.url!==null && sEl.title !=='经济运行态势监测'" :to="{ path: sEl.type, query:{'url':sEl.url,'titleName':sEl.title} }">{{sEl.title}}</router-link>
                      <router-link v-else :to="{ path: '' }">{{sEl.title}}</router-link>
                    </span>
                  </div>
                </div>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  data () {
    return {
      title: this.$store.state.title,
      items: this.$store.state.menuStore.navMenu,
      time: '',
      week: '',
      date: ''
    }
  },
  mounted () {
    var _this = this
    this.timer = setInterval(function () {
      let wholeDate = new Date()
      let year = wholeDate.getFullYear()
      let mounth =
        wholeDate.getMonth() + 1 < 10
          ? '0' + (wholeDate.getMonth() + 1)
          : wholeDate.getMonth() + 1
      let date =
        wholeDate.getDate() < 10 ? '0' + wholeDate.getDate() : wholeDate.getDate()
      _this.date = year + '-' + mounth + '-' + date
      let hour =
        wholeDate.getHours() < 10 ? '0' + wholeDate.getHours() : wholeDate.getHours()
      let minute =
        wholeDate.getMinutes() < 10
          ? '0' + wholeDate.getMinutes()
          : wholeDate.getMinutes()
      // let second = wholeDate.getSeconds()
      _this.time = hour + ':' + minute
      let weekNum = wholeDate.getDay()
      switch (weekNum) {
        case 0:
          _this.week = '星期天'
          break
        case 1:
          _this.week = '星期一'
          break
        case 2:
          _this.week = '星期二'
          break
        case 3:
          _this.week = '星期三'
          break
        case 4:
          _this.week = '星期四'
          break
        case 5:
          _this.week = '星期五'
          break
        case 6:
          _this.week = '星期六'
          break
      }
    }, 1000)
  },
  beforeDestroy: function () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    closed (key, name) {
      this.$store.commit('setActiveKey', key)
      this.$store.commit('setActiveName', name)
      this.$store.commit('setNavDialogVisible', false)
    },
    changeActiveKey (key) {
      this.$store.commit('setActiveKey', key)
    }
  }
}
</script>

<style scoped>
  .bg_gif{
    background:url("../../assets/img/bggif.gif") no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100% auto;
    position: relative;
  }
  .nav_bg{
    background: rgba(0,42,128,0.4);
    height: 100%;

  }
  .head_tit{
    position: relative;
    padding-top:3%;
  }
  .head_tit .date_box{
    position: absolute;
    right: 6%;
    top: 40%;
  }
  .nav_main h2{
    background: url("../../assets/img/titbg.png") no-repeat;
    width: 6.33rem;
    height: .98rem;
    background-size: 6.33rem .98rem ;
    line-height: .98rem;
    font-size: .32rem;
    text-align: center;
    font-weight: normal;
    margin: 0 auto;
  }
  .nav_main h2 a{
    color: #fff;
    text-decoration: none;
    text-align: center;
    padding-top: 10%;
  }
  .nav_main .list{
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 65%;
    width:90%;
    text-align:center;
    transform: translate(-65%, -40%);
  }
  .nav_main .list dl{
    float: left;
    font-size: .2rem;
    width: 15%;
    margin-right: 1.5%;
  }
  .nav_main .list dl:last-child{
    margin-right: 0;
  }
  .nav_main .list dl a{
    text-decoration: none;
    color:#fff;
  }
  .nav_main .list dl dt{
    background-image: radial-gradient(50% 130%, rgba(115,161,255,0.00) 35%, rgba(115,161,255,0.19) 100%);
    border-radius: 4px 4px 0px 4px 4px;
    height: 2.4rem;
    color: #fff;
    position: relative;
  }
  .nav_main .list dl dt i{
    display: block;
    font-size: .38rem;
    padding-top: 30%;
    padding-bottom: 10%;
  }
  .nav_main .list dl dt b{
    background: url("../../assets/img/dt_line.png") no-repeat;
    width: 100%;
    height: .02rem;
    display:block;
    position: absolute;
    bottom:0;
    left: 50%;
    margin-left: -40%;
  }
  .nav_main .list dl dd{
    background: rgba(82,133,236,0.20);
    border-radius: 4px;
    height: 4.6rem;
    width: 100%;
    position: relative;
  }
  .nav_main .list dl dd p{
    height:.3rem;
    line-height: .3rem;
    padding-bottom: .2rem;
    background: url("../../assets/img/title_line.png") no-repeat center .4rem;
    text-align: left;
    padding-left: .7rem;
  }
  .nav_main .list dl dd p.notclick a{
    color:rgba(255,255,255,0.5);
    cursor: not-allowed

  }
  .nav_main .list dl dd p i{
    display: inline-block;
    width: .06rem;
    height: .06rem;
    background: #D8D8D8;
    border-radius: .06rem;
    margin-right: .1rem;
  }
  .nav_main .list dl dd .dd_bg{
    position: absolute;
    background: rgba(255,255,255,0.06);
    border-radius: 4px;
    height: 4rem;
    top: .2rem;
    width: 100%;
    padding-top: .3rem;
  }
  .nav_main .list dl dd .dd_bg span{
    display: block;
    font-size: .16rem;
    text-align: left;
    padding-left: .9rem;
    height:.3rem;
    line-height: .3rem;
  }
  .nav_main .list dl dd .dd_bg span.notclick a{
    color:rgba(255,255,255,0.5);
    cursor: not-allowed
  }
  .date_box{
    color: #fff;
    position: absolute;
    right: 0;
  }
  .date_box #time{
    font-size: .42rem;
  }
  .date_box #dayTime{
    font-size: .16rem;
  }
</style>
