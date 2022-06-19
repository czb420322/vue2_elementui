/*
 * @Author: your name
 * @Date: 2021-06-18 19:52:22
 * @LastEditTime: 2021-09-04 23:15:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \lesson22\src\main.js
 */
import "./css/main.css";
import "./sass/test.scss";
// @ts-ignore
import App from "./App.vue";
import router from "./router";
import store from "./store";
/*引入Vue框架*/
import Vue from "vue";
/*引入资源请求插件*/
import VueResource from "vue-resource";
/*使用VueResource插件*/
Vue.use(VueResource);
Vue.config.devtools = true
new Vue({
  router,
  store,
  render: (h) => h(App),
 
}).$mount("#app");
