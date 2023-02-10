<template>
  <div class="header">
    <div class="header_tit">
      <a href="/">{{ activeName }}</a>
    </div>
    <div class="nav">
      <div class="navleft_tit">
        <ul>
          <li v-for="leftBtn in leftBtns" :key="leftBtn.key" @click="changeValue(leftBtn.key, leftBtn.contentTitle)"
              :class="leftBtn.key == activeKey ? 'active' : ''">
            <p v-if="leftBtn.type === 'frame'">
              <router-link :to="{ path: '/' + leftBtn.type, query: { url: leftBtn.url, key: leftBtn.key } }">
                <i :class="leftBtn.icon"></i>
                {{ leftBtn.name }}
              </router-link>
            </p>
            <p v-else>
              <router-link :to="{ path: '/' + leftBtn.url, query: { key: leftBtn.key } }">
                <i :class="leftBtn.icon"></i>
                {{ leftBtn.name }}
              </router-link>
            </p>
          </li>
        </ul>
      </div>
      <div class="navright_tit">
        <ul>
          <li v-for="rightBtn in rightBtns" :key="rightBtn.key"
              @click="changeValue(rightBtn.key, rightBtn.contentTitle)"
              :class="rightBtn.key == activeKey ? 'active' : ''">
            <p v-if="rightBtn.type === 'frame'">
              <router-link :to="{ path: '/' + rightBtn.type, query: { url: rightBtn.url, key: rightBtn.key } }">
                <i :class="rightBtn.icon"></i>
                {{ rightBtn.name }}
              </router-link>
            </p>
            <p v-else>
              <router-link :to="{ path: '/' + rightBtn.url, query: { key: rightBtn.key } }">
                <i :class="rightBtn.icon"></i>
                {{ rightBtn.name }}
              </router-link>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
	data() {
		return {
			leftBtns: this.$store.state.headerStore.leftBtns,
			rightBtns: this.$store.state.headerStore.rightBtns
		};
	},
	computed: {
		activeKey() {
			// let key = this.$store.state.activeKey;
			// if (key !== -1) {
			// 	return key;
			// } else {
			// 	return this.$route.query.key;
			// }
			// return this.$store.state.activeKey; // 这句原本就是注释的

			return this.$route.query.key; // 12月3日修改为这句逻辑
		},
		activeName() {
			return this.$store.state.activeName;
		}
	},
	created(){
		var newArray=[...this.leftBtns,...this.rightBtns]
		newArray.forEach((item)=>{
			if(item.key===Number(this.$route.query.key)){
				this.$store.commit('setActiveName', item.name);
			}
		})
	},
	methods: {
		changeValue(key, contentTitle) {
			this.$store.commit('setActiveName', contentTitle);
			this.$store.commit('setActiveKey', key);
		}
	}
};
</script>
<style scoped>
.header {
	position: relative;
	height: 11%;
	z-index: 99;
}
.header_tit {
	background: url('../../assets/img/title_bg.png') no-repeat center center;
	width: 100%;
	height: 1.34rem;
	color: #a5dcff;
	font-size: 0.32rem;
	font-weight: bold;
	text-align: center;
	line-height: 0.8rem;
	position: absolute;
	background-size: 100% 1.34rem;
}
.header_tit a {
	color: #fff;
	text-decoration: none;
}
.header .nav {
	width: 100%;
	color: #fff;
	float: right;
}
.navleft_tit {
	width: 7.5rem;
	position: absolute;
	margin-left: 0.9rem;
}
.navright_tit {
	width: 7.5rem;
	position: absolute;
	right: 0;
	top: 0;
}
.nav ul {
	display: flex;
}
.nav ul li {
	flex: 1;
	font-size: 0.16rem;
	color: #b1dfff;
	height: 0.54rem;
	line-height: 0.54rem;
	position: relative;
}
.nav ul li a {
	text-decoration: none;
	color: #a5dcff;
	display: block;
	position: absolute;
	width: 100%;
}
.nav ul li i {
	float: left;
	width: 0.46rem;
	height: 0.54rem;
	background-size: 0.46rem 0.54rem;
	margin-right: 0.1rem;
}
.cyfz {
	background: url('../../assets/img/cyfz.png') no-repeat;
}
.nav ul li.active i.cyfz {
	background: url('../../assets/img/cyfz_on.png') no-repeat;
	width: 0.62rem;
	height: 0.55rem;
	background-size: 0.63rem 0.55rem;
}
.szsy {
	background: url('../../assets/img/szsy.png') no-repeat;
}
.nav ul li.active i.szsy {
	background: url('../../assets/img/szsy_on.png') no-repeat;
	width: 0.62rem;
	height: 0.55rem;
	background-size: 0.63rem 0.55rem;
}
.xczx {
	background: url('../../assets/img/xczx.png') no-repeat;
}
.nav ul li.active i.xczx {
	background: url('../../assets/img/xczx_on.png') no-repeat;
	width: 0.62rem;
	height: 0.55rem;
	background-size: 0.63rem 0.55rem;
}
.whjy {
	background: url('../../assets/img/whjy.png') no-repeat;
}
.nav ul li.active i.whjy {
	background: url('../../assets/img/whjy_on.png') no-repeat;
	width: 0.62rem;
	height: 0.55rem;
	background-size: 0.63rem 0.55rem;
}
.hjzl {
	background: url('../../assets/img/hjzl.png') no-repeat;
}
.nav ul li.active i.hjzl {
	background: url('../../assets/img/hjzl_on.png') no-repeat;
	width: 0.62rem;
	height: 0.55rem;
	background-size: 0.63rem 0.55rem;
}
.zwfw {
	background: url('../../assets/img/zwfw.png') no-repeat;
}
.nav ul li.active i.zwfw {
	background: url('../../assets/img/zwfw_on.png') no-repeat;
	width: 0.62rem;
	height: 0.55rem;
	background-size: 0.63rem 0.55rem;
}
</style>
