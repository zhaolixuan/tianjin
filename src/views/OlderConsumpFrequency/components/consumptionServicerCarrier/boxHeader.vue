<template>
  <div class="box_header">
    <nav
      v-for="(item, index) in headerList"
      :key="index"
      :value="item.value"
      :class="['item',activeHeader == item.value ? 'active' : '']"
      v-on:click="handleChangeItem(item.value,item.label)"
    >
      {{ item.label }}
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    headerList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    activeHeader:{
      type:String,
      default:()=>{
        return '';
      }
    }
  },

  data() {
    return {};
  },

  methods: {
    handleChangeItem(id) {
      console.log(id);
      this.$emit('activeHeaderItem',id)
    }
  }
};
</script>

<style lang="less" scoped>
.box_header {
  height: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item {
    flex: 1;
    width: 2.2rem;
    border: 2px solid #004f6f;
    font-size: 0.18rem;
    // margin-right: -0.2rem;
    color: #68f4ff;
    font-weight: 600;
    padding: 3px 0.15rem;
    text-align: center;
  }
  .active{
    border: 2px solid #68f4ff;
  }
}
</style>
