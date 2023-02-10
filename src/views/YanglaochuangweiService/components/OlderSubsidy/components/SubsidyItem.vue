<template>
  <div class="content_item">
    <dl v-for="item in SubsidyData" :key="item.text" @click="handleList(item)">
      <dt>{{item.allowType}}</dt>
      <dd>
        {{item.allowanceTypeTotal}}
        <span>人</span>
      </dd>
      <img
        v-show="item.line"
        class="column-split"
        src="@/views/ProvideAged/assets/column-split.png"
        alt
      />
    </dl>
  </div>
</template>

<script>
export default {
  name: 'SubsidyItem',
  props: {
    SubsidyData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleList (con) {
      if (con.path) {
        let { path, query } = con.path
       this.$router.push({
          path,
          query
        })

      }
    }
  }
}
</script>

<style lang="less" scoped>
.content_item {
  height: 0.9rem;
  margin-left: 0.3rem;
  display: flex;
  flex-wrap: wrap;
  margin-top: .2rem;
  dl {
    width: 33%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    background-color: rgba(24, 138, 254, 0.24);
    margin-bottom: 0.2rem;
    dt {
      color: #ffffff;
      text-align: center;
      font-size: 0.16rem;
      margin-bottom: 0.06rem;
      white-space: pre;
    }
    dd {
      color: #3df9cf;
      font-size: 0.22rem;
      font-weight: bold;
      span {
        font-size: 0.15rem;
        font-weight: 100;
      }
    }
    .column-split {
      position: absolute;
      right: 0;
    }
  }
}
</style>
