// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App'
import Main from './components/Main'
import About from './components/About'
import VueScroll from 'vue-scroll'

Vue.use(VueScroll)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ElementUI)

const store = new Vuex.Store({
	state: {
		folderIsShow: false
	},
	mutations: {
		updatefolderStatus(state, status) {
			state.folderIsShow = status
		}
	}
})
const routes = [{
		path: '/',
		component: Main
    },
	{
		path: '/main',
		component: Main
    },
	{
		path: '/about',
		component: About
    }
]
const router = new VueRouter({
	routes
})
/* eslint-disable no-new */
new Vue({
	router,
	store,
	el: '#app',
	template: '<App/>',
	components: {
		App
	}
}).$mount('#app')
