<template>
  <div class="Page-left">
    <div class="main-conntainer">
      <norm-layout text="养老补贴标准" :flag="false"></norm-layout>
      <div class="top_content">
        <service-chart :ServiceData="ServiceData"></service-chart>
      </div>
      <norm-layout text="养老补贴缴清记录" :flag="false"></norm-layout>
      <div class="bottom_content">
        <div class="case-list">
          <div class="case_left">
            <img class="left-bg" src="../../assets/money_bg.png" alt />
          </div>
          <div class="case_right">
            <div class="text_top">满足条件未享受养老补贴</div>
            <div class="split_line"></div>
            <div class="text_bottom">
              补偿人数：
              <span class="num">0</span>
              <span class="unit">人</span>
            </div>
          </div>
        </div>
        <div class="case-list">
          <div class="case_left">
            <img class="left-bg" src="../../assets/task_bg.png" alt />
          </div>
          <div class="case_right">
            <div class="text_top">未满足条件享受养老补贴</div>
            <div class="split_line"></div>
            <div class="text_bottom">
              清退人数：
              <span class="num">0</span>
              <span class="unit">人</span>
            </div>
          </div>
        </div>
        <a :href="href" target="_blank"><div class="bottom_link">大数查询 补贴政策匹配 》</div></a>
      </div>
    </div>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '@/views/BuffetPage/components/ServiceChart/index'
import { mapGetters } from 'vuex'
export default {
  name: 'SubsidyCaseNorm',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['breadCrumbCodes']),
    ServiceData () {
      this.allowanceProdMap.map((item, index) => {
        item.value = item.allowanceProdTotal
        item.name = item.allowProd + '元'
      })
      return {
        data: this.allowanceProdMap,
        radius: ['75%', '65%'],
        center: ['50%', '60%'],
        itemStyle: {
          borderWidth: 5,
          borderColor: 'rgb(3, 29, 58)'
        },
        labelLine: {
          length: 20
        },
        legend: {
          left: 10,
          top: 10,
          data: this.allowanceProdMap.filter(item => item.name),
          icon: 'rect',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: '#C9EEFF',
            fontSize: 14 / window.devicePixelRatio,
            padding: [0, 40, 0, 5]
          }
        },
        colors: [
          { start: '#FF876C', end: '#CC4E32' },
          { start: '#18E7FE', end: '#1887FE' },
          { start: '#45EB9D', end: '#62FEEF' }
        ],
        formatter: '{b|{b}：}{c|{c}人}\n\n'
      }
    },
    code () {
      return this.$store.state.code[0]
    },
    type () {
      return this.$store.state.type
    },
    href () {
      // console.log(breadCrumbCodes)
      const codesParam = `&code=${this.breadCrumbCodes.join('&code=')}`
      return `/#/olderPage?key=2${codesParam}&type=${this.type}`
    }
  },
  methods: {
    // handleLink () {
    //   this.$router.push({name: 'olderPage', query: { key: 2, code: this.breadCrumbCodes, type: 1 }})
    // }
  },
  props: {
    allowanceProdMap: {
      type: Array,
      default: () => []
    }
  },
  components: {
    NormLayout,
    ServiceChart
  }
}
</script>

<style lang="less" scoped>
.Page-left {
  width: 100%;
  height: 100%;
  .main-conntainer {
    width: 93%;
    height: 100%;
    padding: 0 0.3rem;
    .top_content {
      height: 35%;
      box-sizing: border-box;
    }
    .bottom_content {
      height: 65%;
      padding-left: 0.5rem;
      .case-list {
        // width: 5.8rem;
        height: 1.8rem;
        background-color: rgba(24, 138, 254, 0.2);
        display: flex;
        margin-top: 0.2rem;
      }
    }
  }
}
.case_left {
  display: flex;
  width: 27%;
  height: 100%;
  align-items: center;
  .left-bg {
    width: 0.9rem;
    height: 0.9rem;
    margin-left: 0.25rem;
  }
}
.split_line {
  width: 70%;
  height: 0.008rem;
  background-image: linear-gradient(
    90deg,
    rgba(24, 136, 254, 0.08) 0%,
    #00e4ff 30%,
    rgba(24, 231, 254, 0.16) 100%
  );
}
.case_right {
  width: 70%;
  height: 100%;
  font-size: 0.16rem;
  .text_top {
    height: 52%;
    color: #ffffff;
    line-height: 1.3rem;
  }
  .text_bottom {
    height: 30%;
    line-height: 0.5rem;
    color: #ffffff;
    .num {
      color: #ff8400;
      font-size: 0.18rem;
    }
    .unit {
      color: #28e1fe;
      font-size: 0.13rem;
    }
  }
}
.bottom_link {
  width: 97%;
  height: 0.3rem;
  background: url("../../assets/older_tab.png") no-repeat;
  background-size: 100% 100%;
  color: #16fff1;
  font-size: 0.14rem;
  margin-top: 0.2rem;
  text-align: center;
  line-height: 0.3rem;
}
</style>
