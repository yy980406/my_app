import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

// 引入css文件
import "./assets/css/reset.css";
// 引入iconfont
import "./assets/css/iconfont.css";
// 引入rem文件
import "./assets/js/index"
// 引入公共组件
import "./components/index"
// 引入公共过滤器
import "./filters/index"


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
