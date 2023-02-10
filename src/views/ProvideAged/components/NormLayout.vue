<template>
  <div :class="normClassNames">
    <div class="title-container" v-if="title ? true : false">
      <img :src="iconPath ? iconPath : ''" class="icon" alt="norm-icon" />
      <div class="title">
        <a v-if="href" :href="href" target="_blank">
          <span>{{ title }}</span>
          <span v-if="more" class="more">
            更多
            <i class="icon-more"></i>
          </span>
        </a>
        <span v-else>{{ title }}</span>
        <img
          class="row-split"
          alt="column-split"
          src="@/views/ProvideAged/assets/row-split.png"
        />
      </div>
    </div>
    <p v-if="subtitle" class="subtitle-title">{{ subtitle }}</p>
    <div :class="normChart">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NormLayout",
  props: {
    icon: {
      type: String,
      default: () => ""
    },
    title: {
      type: String,
      default: () => ""
    },
    href: [String],
    more: [Boolean],
    subtitle: [String],
    half: {
      type: Boolean,
      default: () => true
    },
    double: {
      type: Boolean,
      default: () => false
    },
    maxHeight: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    normClassNames() {
      return [
        "norm-container",
        this.half ? "half" : "all",
        this.maxHeight ? "max-height" : "",
        this.double ? "double" : ""
      ];
    },
    normChart() {
      return [
        "norm-chart_container",
        this.double ? "double" : "",
        this.maxHeight ? "max-height" : ""
      ];
    },
    iconPath() {
      return require(`@/views/ProvideAged/assets/icons/${this.icon}.png`);
    }
  }
};
</script>

<style lang="less" scoped>
.norm-container {
  &.half {
    width: 50%;
  }
  &.all {
    width: 100%;
  }
  &.max-height {
    height: 4.5rem;
  }
  .title-container {
    display: flex;
    align-items: center;
    font-size: 0.19rem;
    color: rgba(201, 238, 255, 1);
    .icon {
      height: 0.3rem;
      margin-right: 8px;
    }
    .title {
      display: flex;
      height: 0.3rem;
      flex-direction: column;
      justify-content: space-between;
      text-align: left;
      a {
        text-decoration: none;
        color: rgba(201, 238, 255, 1);
      }
      .more {
        padding: 0 8px;
        font-size: 12px;
        border-radius: 19px;
        border: 1px solid #2e3f62;
      }
      .row-split {
        width: 1.1rem;
      }
    }
  }
  .norm-chart_container {
    position: relative;
    height: 2.5rem;
    padding: 3%;
    box-sizing: border-box;
    &.double {
      width: 450px;
      height: 3.9rem;
    }
    &.max-height {
      height: 4.5rem;
    }
  }
  .icon-more {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-image: url("~@/views/ProvideAged/assets/icons/more.png");
    background-size: 100% 100%;
  }
}
.subtitle-title {
  color: rgba(201, 238, 255, 1);
  font-size: 0.14rem;
  text-align: left;
  margin-left: 9%;
  margin-top: 3%;
}
</style>
