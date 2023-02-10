<template>
  <norm-layout icon="population" title="老年人口库" :href="href" :more="true">
    <div class="table-container">
      <div class="table-label table-column">
        <span class="name">姓名</span>
        <span class="gender">性别</span>
        <span class="age">年龄</span>
        <span class="education">是否独居</span>
        <span class="contract">身体状态</span>
      </div>
      <div
        class="table-column"
        v-for="(item, index) in populations"
        :key="index"
      >
        <span class="name">{{ item.name }}</span>
        <span class="gender">{{ item.gender }}</span>
        <span class="age">{{ item.age }}</span>
        <span class="education">{{ item.isLiveAlone }}</span>
        <span class="contract">{{ item.personbody }}</span>
      </div>
    </div>
  </norm-layout>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/api";
import NormLayout from "../NormLayout.vue";

export default {
  name: "PopulationLibrary",
  components: {
    NormLayout
  },
  data() {
    return {
      pageSize: 5,
      currentPage: 1,
      populations: []
    };
  },

  mounted() {
    this.getOlderData();
  },

  computed: {
    ...mapGetters(["breadCrumbCodes"]),
    code() {
      return this.$store.state.code[0];
    },
    type() {
      return this.$store.state.type;
    },
    href() {
      // console.log(breadCrumbCodes)
      const codesParam = `&code=${this.breadCrumbCodes.join("&code=")}`;
      return `/#/olderPage?key=2${codesParam}&type=${this.type}`;
    }
  },

  watch: {
    code() {
      this.getOlderData();
    }
  },

  methods: {
    personbodyText(personbody) {
      const personText = ["完全自理", "半失能", "失能"];
      return personText[personbody - 1];
    },
    getOlderData() {
      var params = {
        page: this.currentPage,
        pageSize: this.pageSize
      };
      if (this.type === 2) {
        params.zoneCode = this.code;
      } else if (this.type === 3) {
        params.streetCode = this.code;
      } else if (this.type === 4) {
        params.communityCode = this.code;
      }
      let monthlyIncomeTable = this.$store.state.olderStore.monthlyIncome;
      api.getOlderData(params).then(res => {
        var data = res.obj.records || [];
        this.populations = data.map(item => {
          return {
            name: item.name || "-",
            gender: item.sex || "-",
            age: item.age || "-",
            isLiveAlone: item.isLiveAlone ? "是" : "否",
            personbody: this.personbodyText(item.personbody) || "-"
          };
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.table-container {
  border: 1px solid rgba(16, 140, 255, 0.3);
  box-shadow: 0px 0px 10px rgba(16, 140, 255, 0.3) inset;
}
.table-column {
  display: flex;
  justify-content: space-around;
  span {
    font-size: 12px;
    line-height: 0.4rem;
    color: rgba(201, 238, 255, 1);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .name {
    width: 10%;
  }
  .gender {
    width: 8%;
  }
  .age {
    width: 8%;
  }
  .education {
    width: 14%;
  }
  .contract {
    width: 20%;
  }
  .income {
    width: 25%;
  }
}
.table-column:nth-child(odd) {
  background-color: rgba(0, 140, 255, 0.1);
}
</style>
