<template>
  <div class="main-bg-color">
    <div class="nav_btn" @click="openDialog"></div>
    <el-dialog :fullscreen="fullscreen" :visible.sync="$store.state.navDialogVisible" >
      <Navigation></Navigation>
    </el-dialog>
    <Header></Header>
    <div id="ifmPages"></div>
  </div>
</template>

<script>
import $ from 'jquery'
import Navigation from '@/components/Navigation/index'
import Header from '@/components/Header/index'
export default {
  name: 'Frame',
  data () {
    return {
      // navDialogVisible: false,
      fullscreen: true,
      headerTitle: '',
      url: 'https://ultrav-console.jdcloud.com/previewScreen?id=2EF3JUWH9_20190618151316',
      name: '智慧河西综合管理平台'
    }
  },
  mounted () {
    if (this.$route.query.url) { this.url = this.$route.query.url }
    this.initScreenPage()
  },
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      if (to.query.url !== from.query.url) {
        this.url = this.$route.query.url
        this.initScreenPage() // 重新加载数据
      }
      this.$store.commit('setActiveKey', -1)
    }
  },
  methods: {
    initScreenPage () {
      this.createIfeame()
    },
    openDialog () {
      this.$store.commit('setNavDialogVisible', true)
    },
    createIfeame () {
      const currId = this.url
      if (this.$route.query.titleName) {
        this.$store.commit('setActiveName', this.$route.query.titleName)
      } else {
        this.$store.commit('setActiveName', this.name)
      }
      if (!currId) return
      const iframe = document.createElement('iframe')
      iframe.id = 'bgFrame'
      iframe.width = '100%'
      iframe.height = '100%'
      iframe.src = currId

      const oFragmeng = document.createDocumentFragment()
      oFragmeng.appendChild(iframe)
      $('#ifmPages').empty().append(oFragmeng)
    }
  },
  components: {
    Header,
    Navigation
  }
}
</script>

<style scoped>
  .main-bg-color{
    background:#010B30;
    height: 100%;
    overflow: hidden;
  }
  #ifmPages{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    position: absolute;
    z-index: 0;
    top:0;
  }
</style>
