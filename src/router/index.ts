import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/login",
    component: () => import("../views/login/index.vue")
  }
];

const router = new VueRouter({
  routes
});
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    const token = localStorage.getItem("Authorization");

    if (token === "null" || token === "") {
      next("/login");
    } else {
      next();
    }
  }
});
export default router;
