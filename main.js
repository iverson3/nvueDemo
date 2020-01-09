import Vue from 'vue'
import App from './App'
import store from './store/index.js';

// Vue原型上挂载的属性或方法，不能在 .nvue 中使用

// Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
