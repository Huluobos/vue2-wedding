import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import layout from '@/views/layout.vue'
import page1 from '@/views/page1'
import page2 from '@/views/page2'
import wish from '@/views/wish'
Vue.use(Router)

// 公共路由
export const constantRoutes = [
  {
    path: "/",
    name:'layout',
    redirect: "/page1",
    component: layout,
    children: [
      {
        meta:{index:0},
        path: "/page1",
        component: page1,
      },
      {
        path: "/page2",
        meta:{index:1},
        component: page2,
      },
      {
        path: "/wish",
        meta:{index:2},
        component: wish,
      },
    ],
  },
];

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}

export default new Router({
  base: process.env.VUE_APP_APP_NAME ? process.env.VUE_APP_APP_NAME : "/",
  // mode: 'history', // 去掉url中的#
  mode: 'hash', // 去掉url中的#
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})
