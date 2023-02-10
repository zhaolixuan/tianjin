<template>
    <footer>
        <div  @click="handelOrder(servertext)">{{ servertext }}</div>
    </footer>
</template>

<script>
export default {
    
    props: ['servertext'],
    name: '',
    data() {
        return {
            active: false,
        }
    },
    methods: {

        handelOrder(n) {
            this.$emit('handelOrder', n)
        },
    },
    mounted() {},
}
</script>

<style lang="less" scoped>
footer {
   // position: absolute;
     // position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    height: 70px;
    background: #fff;
    align-items: center;
    justify-content: center;
    div {
        background: #05b178;
        border-radius: 27px;
        color: #ffffff;
        height: 53px;
        text-align: center;
        line-height: 53px;
        width: 352px;
        font-size: 18px;
        font-weight: 600;
    }
}
</style>
