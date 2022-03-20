import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import VueViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Antd);
Vue.use(VueViewer);
Vue.config.productionTip = false
export const eventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
