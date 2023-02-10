<template>
  <div :class="['population-container', inYearWork ? 'in-year-work' : '' ]" >
    <template v-for="(norm, index) in norms">
      <el-tooltip
        v-if="norm.tooltip"
        :key="`${norm.label}-tooltip`"
        effect="dark"
        :content="norm.tooltip"
        placement="top"
      >
        <population-norm
          :key="`${norm.label}-norm`"
          :label="norm.label"
          :value="norm.value"
          :unit="norm.unit"
          :path="norm.path"
        />
      </el-tooltip>
      <population-norm
        v-else
        :key="`${norm.label}-norm`"
        :label="norm.label"
        :value="norm.value"
        :unit="norm.unit"
        :path="norm.path"
      />
      <img
        v-if="index !== norms.length - 1"
        :key="`${norm.label}-img`"
        alt="column-split"
        src="@/views/ProvideAged/assets/column-split.png"
      />
    </template>
  </div>
</template>

<script>
import PopulationNorm from './norm.vue'

export default {
  name: 'ColumnNorms',
  components: {
    PopulationNorm
  },
  props: {
    norms: {
      type: Array,
      default: () => []
    },
    inYearWork: [Boolean]
  }
}
</script>

<style lang="less" scoped>
.population-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.25rem;
  box-sizing: border-box;
  padding: 0.18rem 0rem;
  background-size: 100% 100%;
  background-image: url("~@/views/ProvideAged/assets/population_bg.png");

  img {
    height: 0.634rem;
  }

  &.in-year-work {
    padding: 0.28rem 0rem;
    background-image: url('~@/views/YearKeyWork/assets/population_bg.png');
  }
}
</style>
