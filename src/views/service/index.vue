<template>
  <div class="service">
    <Box-header :headerData="serviceHeaderData"
                @handelActive="servicehandelActive"
                :activeHeader="activeHeader" />
    <search-box @handleChangeText="handleChangeText"></search-box>
    <Box-contect :serviceContentData="serviceContentData"
                 :loading="loading"
                 :finished="finished"
                 @onLoad="onLoad" />
    <van-empty v-if="!serviceContentData.length"
               description="暂无数据" />
    <Footer />
  </div>
</template>

<script>
import BoxHeader from './component/BoxHeader.vue'
import SearchBox from './component/searchBox.vue'
import BoxContect from './component/BoxContect.vue'
import Footer from '@/components/common/footer.vue'

import { getServiceType, getServiceList } from '@/api/service.js'
export default {
  data() {
    return {
      serviceHeaderData: [],
      activeHeader: '',
      serviceContentData: [],
      limit: 10,
      page: 1,
      loading: false,
      finished: false,
      mealsServiceName: '',
    }
  },
  components: {
    Footer,
    BoxHeader,
    BoxContect,
    SearchBox,
  },
  watch: {
    activeHeader() {
      this.finished = false
      this.page = 1
      this.serviceContentData = []
      this.getContentData()
    },
  },
  activated() {
    if (this.$route.query.name) {
      this.activeHeader = this.$route.query.name + '类'
    }
  },
  mounted() {
    this.getHeaderData()
    this.$route.meta.keepAlive = true
  },
  methods: {
    handleChangeText(n) {
      this.mealsServiceName = n
      this.finished = false
      this.page = 1
      this.serviceContentData = []
      this.getContentData()
    },
    onLoad() {
      this.page++
      this.getContentData()
    },
    getHeaderData() {
      // 调 listDictsByCode 接口
      getServiceType().then((res) => {
        if (res && res.code == '200') {
          this.serviceHeaderData = res.data
          // 做判断 两种情况
          // 第一种是点击 home  主页中 nav 跳转
          // 第二种是点击 footer 组件中 服务进入
          if (this.$route.query.name) {
            this.activeHeader = this.$route.query.name + '类'
          } else {
            this.activeHeader = res.data[0].typeName
          }
        } else {
          this.serviceHeaderData = []
        }
      })
    },
    getContentData() {
      if (!this.activeHeader) return
      this.loading = true
      let data = {
        mealsServiceName: this.mealsServiceName,
        category: this.activeHeader,
        limit: this.limit,
        page: this.page,
      }
      // 调 getBusinessList 接口
      getServiceList(data).then((res) => {
        this.loading = false
        if (res && res.code == '200') {
          res.data.forEach((i) => {
            this.serviceContentData.push(i)
          })
          if (res.data.length < 10) {
            this.finished = true
          }
        }
      })
    },
    // BoxHeader.vue 组件将当前被点击的 navItem 传递过来
    servicehandelActive(n) {
      this.activeHeader = n
    },
  },
}
</script>

<style lang="less" scoped>
.service {
  background: #fff;
  padding-bottom: 66px;
}
</style>
