import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import home from './home.js';
import quota from './quota.js';
import trend from './trend.js';
import drgs from './drgs.js';
import yyqk from './yyqk.js';

const baseRoutes = [
    
];

const routes = baseRoutes.concat(
        home,
        quota,
        trend,
        drgs,
        yyqk,
    );

const router = new VueRouter({
    routes : routes,
  })
  
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    next()
})

export default router;