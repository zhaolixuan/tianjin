<template>
  <vue-scroll class="scroll" :ops="ops">
    <slot></slot>
  </vue-scroll>
</template>

<script>
export default {
  // name: 'Scrolls',
  data () {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false
        },
        rail: {},
        bar: {
          background: '#eee'
        }
      }
    }
  }
}
</script>

<style>
</style>
