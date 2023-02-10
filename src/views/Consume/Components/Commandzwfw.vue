<template>
    <div class="rank_2">
       <radartwo :id="radartwo.id" :clazz="radartwo.class" :option="radartwo.option" :zwfwProportion="zwfwProportion" ></radartwo>
    </div>
</template>
<script>
import * as jdChart from '@/components/Echarts/index.js'
import Api from "@/api/api";
export default {
  data () {
    return {
      data: {},
      radartwo: {
        id: 'radartwo',
        class: '',
        option: {
          style: 'width:100%;height:100%'
        }
      },
      // zwfwProportion: {
      //   indicator: [
      //     {name: '金融', max: 70},
      //     {name: '社会服务', max: 70},
      //     {name: '批发零售', max: 70},
      //     {name: '房地产', max: 70},
      //     {name: '住宿和餐饮', max: 70},
      //     {name: '交通仓储邮政', max: 70}
      //   ],
      //   value: [],
      //   name:"",
      //   value2: [52.3, 23.8, 9.3, 5.5, 3.8, 2.1]
      // }
      zwfwProportion:{
        indicator:[],
        value:[],
        name:'',
        value2:[]
      }
    }
  },
  components: {
    ...jdChart
  },
  methods:{
   init(){
      Api.getIndustryStruct().then(res=>{
        res.forEach((value,index) => {
          this.zwfwProportion.indicator.push({name:value.industryType,max:70})
          this.zwfwProportion.value2.push(value.produceValueR)
        });
      })
    }
  },
  mounted(){
    this.init()
  }

}
</script>
<style scoped>
.rank_2{
    height: 75%;
  }
</style>
