<template>
  <span class="polulation-norm">
    <router-link v-if="path" :to="path" class="link" target="_blank">
      <span class="norm-name norm">{{ label }}</span>
    </router-link>
    <span v-else class="norm-name norm">{{ label }}</span>
    <span>
      <span class="norm-value">{{ value || 0 }}</span>
      <span class="norm-unit norm">{{ unit || '人' }}</span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'PopulationNorm',
  props: {
    label: [String],
    value: [String, Number],
    unit: [String],
    path: [Object]
  }
}
</script>

<style lang="less" scoped>
.polulation-norm {
  flex:1;
  display: flex;
  flex-direction: column;
  text-align: center;

  .link {
    line-height: 0.166rem;
    text-decoration: none;
    cursor: pointer;
  }

  .norm {
    font-size: 0.166rem;
    line-height: 0.166rem;
    color: rgba(172, 216, 248, 1);
  }
  .norm-value {
    font-size: 0.333rem;
    font-weight: 600;
    color: rgba(139, 236, 255, 1);
  }
}
</style>
