import home from '../components/home.vue';

let routes = [
    {
        path: '*',
        component: home,
        meta: { title : "院长数据查询" }
    },
    {
        path: '/home',
        component: home,
        meta: { title : "院长数据查询" }
    }
];

export default routes;