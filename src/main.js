import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Input, Form, FormItem, Message } from 'element-ui'

import '@/assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
// Vue.use(Message)
Vue.component('Message', Message)

Vue.config.productionTip = false

Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
