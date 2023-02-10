<template>
  <div class="woker_box">
    <div class="worker_container">
      <dl v-for="item in ServiceData" :key="item.title" @click="handleBlank(item)">
        <dt>
          <img :src="require(`@/views/ProvideAged/assets/icons/${item.icon}.png`)" class="icon" alt="norm-icon">
        </dt>
        <dd>
          <p class="service_item">{{item.title}}</p>
          <p>{{item.number}}<span>{{item.text}}</span></p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkerItem',
  props: {
    ServiceData: [Array]
  },
  methods: {
    handleBlank (item) {
      if (item.path) {
       this.$router.push(item.path)
      
      }
    }
  }
}
</script>
<style lang="less" scoped>
.woker_box{
  width: 90%;
  margin-bottom: 0.3rem;
}
.worker_container{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 0.3rem;
    dl{
       display: flex;
       margin-left: 0.7rem;
       margin-bottom: 0.6rem;
       cursor:pointer;
        dt{
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
              img{
                height: 100%;
              }
            }
          dd{
              height: 0.47em;
              font-size: 0.2rem;
              margin-left: 12px;
              padding-bottom: 10px;
              color: rgba(73, 163, 255, 1);
                p{
                  font-size: 0.3rem;
                  padding-bottom: 0.05rem;
                    span{
                      font-size:0.15rem;
                    }
                  }
            }
      }
  .service_item{
    font-size: 0.2rem;
  }
}
</style>
