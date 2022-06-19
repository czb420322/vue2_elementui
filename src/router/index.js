// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import List from "../views/List.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/list",
    name: "list",
    component: List,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/time",
    name: "Time",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Time.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
