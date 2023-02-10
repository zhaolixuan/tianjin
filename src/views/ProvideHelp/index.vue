<template>
  <div class="older-page_bg">

    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from '@/views/OlderDistribution/components/PageHeader/header'
import { mapGetters } from 'vuex'
import Menu from '@/views/OlderDistribution/components/Menu'
export default {
  name: 'ProvideHelp',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['typeNew', 'codeNew']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0]

      return params
    }
  },
  created () {
    this.getCateringerServiceToday()
    if (
      this.$route.query.code ||
      (this.$route.query.code && this.$route.query.code.length > 0)
    ) {
      this.initCodeFromUrlQuery()
    } else {
      this.initChartInfo()
    }
  },
  methods: {
    initCodeFromUrlQuery () {
      let code = []
      let len = 1
      if (typeof this.$route.query.code !== 'string') {
        code[0] = this.$route.query.code[this.$route.query.code.length - 1]
        code[1] = this.$route.query.code[this.$route.query.code.length - 2]
        len = this.$route.query.code.length
      } else {
        code = [this.$route.query.code, '120100000000']
      }
      this.$store.commit('setCodeNew', code)
      this.$store.commit('setTypeNew', len)
    },
    initChartInfo () {
      this.$store.dispatch('getUserAuthInfo').then(res => {
      })
    },
    handelSearch (index) {
      console.log(index)
    },
    getCateringerServiceToday () {

    }
  },
  components: {
    PageHeader,
    Menu
  }
}
</script>

<style lang="less" scoped>
.older-page_bg {
  min-height: 100%;
  font-size: initial;
  user-select: none;
  // background-image: url("~@/views/OlderDistribution/assets/img/older-page_bg.png");
  background-image: url("~@/views/ProvideHelp/assets/Older.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
// .older-container {
//   display: flex;
//   height: 100%;
//   margin: 0 1.58%;
//   .left-panels,
//   .right-panels {
//     width: 5.5rem;
//     height: 10.1rem;
//     // background-color: #ffffff;
//     margin-top: -0.4rem;
//     padding: 1% 1% 0 1%;
//     box-sizing: border-box;
//     z-index: 3;
//   }
//   .centre-panels {
//     flex: 1;
//     height: 10.1rem;
//     .top_panels {
//       height: 63%;
//     }
//     .bottom_panels {
//       height: 37%;
//     }
//   }
//   .bread {
//     position: fixed;
//     top: 5%;
//     left: 2%;
//   }
// }
</style>
