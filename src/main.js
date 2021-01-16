import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import tools from './util/tool.js'

import '@/plugins/index.js'

import '@/assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.config.devtools = true

Vue.prototype.$tools = tools

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
