import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


//---------------------------------导入axios------------------------------------------
import axios from 'axios'
import VueAxios from 'vue-axios'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'umeNYokrRauXW5Fx8Y06sZxOEVyQNzmNy'
})
Vue.use(VueAxios,axios,VueAlertLoading);
Vue.use(ElementUI);

//axios.defaults.timeout = 5000;                                                   //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //配置请求头
axios.defaults.baseURL = 'http://122.156.44.49:6456/presidentBI_service';              //配置接口地址
//axios.defaults.baseURL = 'http://www.swhcsoft.com/mpwechatApi';                  //配置接口地址


//---------------------------------导入样式文件---------------------------------------
import './assets/styles/bootstrap-table.css';
import './assets/styles/bootstrap.min.css';
import './assets/styles/common.css';
import './assets/styles/pagination.css';

//--------------------------导入百度报表-----------------------------------
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//-------------------------------------导入等待插件-----------------------------------
import VueAlertLoading from 'vue-alert-loading';
Vue.use(VueAlertLoading);


Vue.config.productionTip = false

//---------------------------------导入路由文件---------------------------------------
import router from './router/index.js';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
