<template>
  <div class="Page-left">
    <norm-layout text="养老补贴政策覆盖人群" :flag="false" :addPath="path"></norm-layout>
    <div class="main-conntainer">
      <ul class="case_content">
        <li v-for="(item,index) in caseData" :key="index" @click="handleTopage(item.path)">
          <img
            class="iconfont"
            :src="require(`@/views/ProvideSubsidy/assets/${item.icon}.png`)"
            alt
          />
          <span class="case-label">{{item.label}}：</span>
          <div class="case-text">
            {{item.value}}
            <span>人</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import { mapGetters } from 'vuex'
export default {
  name: 'SubsidyCase',
  props: {
    allowanceTypeList: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['breadCrumbCodes']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0]
      return params
    },
    path () {
      return {
        path: 'olderPage',
        query: { code: this.breadCrumbCodes }
      }
    },
    caseData () {
      let {
        allowanceTypeTotal9,
        allowanceTypeTotal10,
        allowanceTypeTotal2,
        allowanceTypeTotal3,
        allowanceTypeTotal12,
        allowanceTypeTotal11,
        allowanceTypeTotal8
      } = this.allowanceTypeList
      let data = [
        { label: '意外保险', icon: 'older', value: allowanceTypeTotal9 },
        {
          label: '助餐补贴(70岁以上)',
          icon: 'older',
          value: allowanceTypeTotal10
        },
        {
          label: '低保',
          icon: 'basic',
          value: allowanceTypeTotal2,
          path: {
            path: 'olderSubsidy',
            query: {
              allowanceType: '2',
              code: this.breadCrumbCodes
            }
          }
        },
        {
          label: '低收入',
          icon: 'money',
          value: allowanceTypeTotal3,
          path: {
            path: 'olderSubsidy',
            query: {
              allowanceType: '3',
              code: this.breadCrumbCodes
            }
          }
        },
        {
          label: '居家养老(市级)',
          icon: 'give',
          value: allowanceTypeTotal12,
          path: {
            path: 'olderSubsidy',
            query: {
              allowancePolicy: '2',
              code: this.breadCrumbCodes
            }
          }
        },
        {
          label: '居家养老(区级)',
          icon: 'soldier',
          value: allowanceTypeTotal11,
          path: {
            path: 'olderSubsidy',
            query: {
              allowancePolicy: '1',
              code: this.breadCrumbCodes
            }
          }
        },
        {
          label: '百岁补贴',
          icon: 'director',
          value: allowanceTypeTotal8,
          path: {
            path: 'olderSubsidy',
            query: {
              allowanceType: '8',
              code: this.breadCrumbCodes
            }
          }
        }
      ]
      return data
    }
  },
  methods: {
    handleTopage (pathCon) {
      if (pathCon) {
        let { path, query } = pathCon
       this.$router.push({
          path,
          query
        })

      }
    }
  },
  components: {
    NormLayout
  }
}
</script>

<style lang="less" scoped>
.Page-left {
  width: 100%;
  height: 68%;
  .main-conntainer {
    width: 100%;
    height: 100%;
    padding: 0.2rem 0 0 0.5rem;
    .case_content {
      width: 90%;
      height: 84.5%;
      li {
        height: 0.85rem;
        width: 100%;
        color: #ffffff;
        background-image: url("~@/views/ProvideSubsidy/assets/list_bg.png");
        display: flex;
        align-items: center;
        line-height: 0.92rem;
        font-size: 0.16rem;
        cursor: pointer;
        .iconfont {
          height: 0.54rem;
          width: 0.54rem;
          margin: 0 0.33rem;
        }
        .case-label {
          width: 50%;
        }
      }
      li:nth-child(even) {
        background-image: url("~@/views/ProvideSubsidy/assets/list-active_bg.png");
      }
    }
  }
  .case-text {
    color: #ff8400;
    font-size: 0.2rem;
    font-weight: bold;
    span {
      font-size: 0.13rem;
      color: #28e1fe;
    }
  }
}
</style>
