/*
 * @Author: 李志远
 * @Date: 2020-01-19 11:51:12
 * @LastEditTime : 2021-06-10 11:11:02
 * @LastEditors  : Please set LastEditors
 * @Description: 描述
 * @FilePath: \vacp-wfes\src\main.js
 * @写bug苦逼，一直写bug一直苦逼
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Qs from 'qs'
import './assets/css/global.css'
import storage from './api/manages/storage.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import 'echarts/theme/macarons.js'
import './assets/iconfont/iconfont.css'
import axios from 'axios'// 引入axios
import 'jquery'
import './common/laydate/laydate.js'
import './common/js/layui/layui.all.js'
import './common/js/layui/css/layui.css'
import './common/js/layui/css/modules/laydate/default/laydate.css'
import './common/js/layui/css/modules/layer/default/layer.css'
import vfilter from './api/vfilter'  //引入全局过滤器
import theConfirm from './api/confirm'
import './api/directive'
import './components/fullscreen/index'
import videoStrus from './page/videoCombat/structuring/videoStrus.vue'
import common from './common/js/common'
import api from '../static/js/http';
import md5 from 'js-md5'
import '../static/zTree/jquery.ztree.all.min.js';
import '../static/zTree/jquery.ztree.exhide.js';
import constant from './common/js/constant'


import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
console.log(preview, 'previewpreviewpreview--------------');
Vue.use(preview)
import highstock from 'highcharts/highstock';
// import highcharts from 'highcharts';
import Wordcloud from 'highcharts/modules/wordcloud';
Wordcloud(highstock)
import highcharts3d from 'highcharts/highcharts-3d'
highcharts3d(highstock)
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(highstock);
// import highchartsMore from 'highcharts/highcharts-more';
import loadExporting from 'highcharts/modules/exporting'
loadExporting(highstock)
import highchartsNoData from 'highcharts/modules/no-data-to-display';
import offlineExporting from 'highcharts/modules/offline-exporting';
offlineExporting(highstock)
// import highchartsNoData from 'highcharts-no-data-to-display';
highchartsNoData(highstock)
// import 'highcharts/modules/no-data-to-display'
highstock.setOptions({  // 图表下载设置成中文
  lang: {
    printChart:"打印图表",
    downloadJPEG: "下载JPEG 图片" ,
    downloadPDF: "下载PDF文档"  ,
    downloadPNG: "下载PNG图片"  ,
    downloadSVG: "下载SVG矢量图"
   }
});
// Vue.config.productionTip = false
// require('../mock')  // 引入mock文件
// 全局分页组件引入
import GsComponent from './components/gs-component'
Vue.use(GsComponent)

import GsPanel from './components/panel'
Vue.use(GsPanel)

import GsColumn from './components/column'
Vue.use(GsColumn)

import GsTable from './components/table'
Vue.use(GsTable)

import GsSearch from './components/search'
Vue.use(GsSearch)

import Gspaginations from './components/paginations'
Vue.use(Gspaginations)

Vue.prototype.$myconfirm = theConfirm;
Vue.prototype.$commons = common;
Vue.prototype.$constant = constant;



Vue.component('videoStrus',videoStrus)
for (const key in vfilter) {
  Vue.filter(key,vfilter[key])
}

Vue.use(ElementUI)
Vue.prototype.$storage = storage
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$highstock = highstock
Vue.prototype.$http = axios // 设置axios为全局
Vue.prototype.$qs = Qs // 设置qs为全局,分离formdata数据
Vue.prototype.$api = api // 设置axios为全局
Vue.prototype.$md5 = md5 // 设置axios为全局
// Vue.prototype.themeStyle = 'blue' // 换肤
// if(localStorage.themeStyle != undefined) {
//   Vue.prototype.themeStyle = localStorage.themeStyle
// }
// Vue.prototype.selectSkin = '换肤' // 换肤
// if(localStorage.selectSkin != undefined) {
//   Vue.prototype.selectSkin = localStorage.selectSkin
// }
window.axiosProArr = []
Vue.prototype.$http.defaults.timeout =  1000 * 60 * 20  //10分钟
Vue.prototype.$http.interceptors.request.use(
  config => {
    let token = Vue.prototype.$storage.getSession('token')
    let currentUser = Vue.prototype.$storage.getSession('name')
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    config.headers.token = token
    if (token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      //   console.log(config.headers)
      config.headers.token = token
      config.headers.currentUser = currentUser

    }
    config.cancelToken = new axios.CancelToken(cancle =>{
        window.axiosProArr.push({cancle})
      })


    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
Vue.prototype.$http.interceptors.response.use(
  response => {
    let token = response.headers.token
    let currentuser = response.headers.currentuser
    if (token != null) {
      Vue.prototype.$storage.setSession('token', token)
      Vue.prototype.$storage.setSession('name', currentuser)
    }

    //一时间有几个请求同时失败（状态不等于200,"200"），时间间隔小于2秒时，只弹出一次提示框
    let codeTime = store.getters.getResCodeTime;
    //console.log( (new Date()).getTime() - codeTime);
    if(codeTime && response.data.code !== 200 && response.data.code !== "200" && ((new Date()).getTime() - codeTime < 2000 )){
      return;
      // return response;
    }
    if(response.data.code !== 200 && response.data.code !== "200"){
      store.commit('RESCODETIME', new Date().getTime());
    }else{
      if(response.statusText == '') {
        response.statusText='OK'
      }
    }


    if (response.data.code === 3001) {
      sessionStorage.clear();
      router.push('/login');
       Vue.prototype.$notify({
        type: 'warning',
        message: '用户ID不能为空',
        position: 'bottom-right',
        duration: 3000
      });
      window.axiosProArr.forEach((e,i)=>{
        e.cancle();
        delete window.axiosProArr[i]
      })
      if(document.title.indexOf('.') != -1){
        document.title = document.title.split('.')[0]
      }
      return;
    }
    if (response.data.code === 3002) {
      sessionStorage.clear();
      router.push('/login');
      Vue.prototype.$notify({
        type: 'warning',
        message: '登录信息不能为空',
        position: 'bottom-right',
        duration: 3000
      });
      if(document.title.indexOf('.') != -1){
        document.title = document.title.split('.')[0]
      }
      router.push('/login');
      window.axiosProArr.forEach((e,i)=>{
        e.cancle();
        delete window.axiosProArr[i]
      })
      return;
    }
    if (response.data.code === 3003) {
      sessionStorage.clear();
      router.push('/login');
        Vue.prototype.$notify({
          type: 'warning',
          message: '登录信息不一致！',
          position: 'bottom-right',
          duration: 3000
        });
        if(document.title.indexOf('.') != -1){
          document.title = document.title.split('.')[0]
        }
      window.axiosProArr.forEach((e,i)=>{
        e.cancle();
        delete window.axiosProArr[i]
      })
      return;
    }
    if (response.data.code === 421) {
      sessionStorage.clear();
      router.push('/login');
      //Vue.prototype.$alert("未登录","消息提示");、
       Vue.prototype.$notify({
         type: 'warning',
         message: '用户未登录！',
         position: 'bottom-right',
         duration: 3000
       });
      if(document.title.indexOf('.') != -1){
        document.title = document.title.split('.')[0]
      }
      window.axiosProArr.forEach((e,i)=>{
        e.cancle();
        delete window.axiosProArr[i]
      })
      return;
    }
    if (response.data.code === 3004) {
      sessionStorage.clear();
      router.push('/login');
      window.axiosProArr.forEach((e,i)=>{
        e.cancle();
        delete window.axiosProArr[i]
      })
      Vue.prototype.$notify({
        type: 'warning',
        message: '登录超时，请重新登录！',
        position: 'bottom-right',
        duration: 3000
      });
      if(document.title.indexOf('.') != -1){
        document.title = document.title.split('.')[0]
      }
      return;

    }
    if (response.data.code === 3005) {
      sessionStorage.clear();
      router.push('/login');
      window.axiosProArr.forEach((e,i)=>{
        e.cancle();
        delete window.axiosProArr[i]
      })
      Vue.prototype.$notify({
        type: 'warning',
        message: '当前用户被踢下线，请重新登录！',
        position: 'bottom-right',
        duration: 3000
      });
      if(document.title.indexOf('.') != -1){
        document.title = document.title.split('.')[0]
      }
      return;
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 这里写清除token的代码
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath} // 登录成功后跳入浏览的当前页面
          })
      }
    }
    return Promise.reject(error.response)
  })
// Vue.use(Vuex)

// Vue.use(storage);
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  window.axiosProArr.forEach((e, i) => {
    if(sessionStorage.getItem('isUploadTrue') != 1){
        e.cancle();
        delete window.axiosProArr[i]
    }
});
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    let title2 = to.meta.title.split(".");
    title2.shift();
    let tt = title2.join(".");
    let title1 = "";
    let pageIndex = Number(sessionStorage.getItem("pageIndex"));
    let logotile =  Number(sessionStorage.getItem("currentDeploymentType"));
    if(pageIndex == 1 && logotile == 1){
      title1 = "昆仑视频侦查系统";
    }else if(pageIndex == 1 && (logotile == 2 || logotile == 3)){
      title1 = "昆仑案件管理系统";
    }else if(pageIndex == 2){
      title1 = "昆仑车辆大数据平台";
    }else if(pageIndex == 3 && logotile == 1){
      title1 = "昆仑视频侦查系统";
    }else if(pageIndex == 3 && (logotile == 2 || logotile == 3)){
      title1 = "昆仑案件管理系统";
    }else if(pageIndex == 4){
        title1 = "视频结构化一体机";
    }
    // if(pageIndex == 1){
    //   title1 = "昆仑视频侦查实战平台";
    // }else if(pageIndex == 2){
    //   title1 = "昆仑车辆大数据平台";
    // }else if(pageIndex == 3){
    //   title1 = "昆仑视频侦查实战平台";
    // }
    document.title = title1 + tt +".";
    sessionStorage.setItem('title', title1 + tt +".");
  }
  else{
    let pageIndex = Number(sessionStorage.getItem("pageIndex"));
    let logotile =  Number(sessionStorage.getItem("currentDeploymentType"));
    if(pageIndex == 1 && logotile == 1){
      document.title = "昆仑视频侦查系统";
    }else if(pageIndex == 1 && (logotile == 2 || logotile == 3)){
      document.title = "昆仑案件管理系统";
    }else if(pageIndex == 2){
      document.title = "昆仑车辆大数据平台";
    }else if(pageIndex == 3 && logotile == 1){
      document.title = "昆仑视频侦查系统";
    }else if(pageIndex == 3 && (logotile == 2 || logotile == 3)){
      document.title = "昆仑案件管理系统";
    }else if(pageIndex == 4){
        document.title = "视频结构化一体机";
    }
    // if(pageIndex == 1){
    //   document.title = "昆仑视频侦查实战平台";
    // }else if(pageIndex == 2){
    //   document.title = "昆仑车辆大数据平台";
    // }else if(pageIndex == 3){
    //   document.title = "昆仑视频侦查实战平台";
    // }
    sessionStorage.setItem('title', document.title);
    // OnExit();
  }
  next();
})






new Vue({
  el: '#app',
  router, // 挂载路由
  store,
  // store,
  components: { App },
  template: '<App/>', // 模板,
  methods: {

  },
  watch: {
    '$route' (to, from) {
      if(g_openplay) {
        CloseVodPlayer();
      }
      // CloseVodPlayer();
      this.$store.state.showlookImgPic = false;
    }
  }
})

