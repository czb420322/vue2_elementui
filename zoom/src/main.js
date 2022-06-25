import Vue from 'vue';
import App from './App';
import { router } from './router';
import '@/assets/css/sm.css';
import '@/assets/css/public.css';
import '@/assets/css/my.css';
import '@/assets/less/main.less';
import app from '@/assets/js/util/app';
import API from './api';
import VConsole from '@/assets/js/util/VConsole';
import axios from './axios';
import FastClick from 'fastclick';
import compCheck from '@/assets/js/util/comp-check';
import store from './store'
import configJs from './config.js';
import glutton from './assets/js/util/glutton';
import VueAMap from 'vue-amap';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: 'aa8f2be57739e16a90c49e28f52ab78f',
    plugin: ['AMap.Geolocation'],
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.4'
});
//在created或monted生命周期中将FastClick绑定到body
// FastClick.attach(document.body)
// FastClick.prototype.focus = function (targetElement) {
//     targetElement.focus()
// }
let orignalSetItem = window.localStorage.setItem;   // 原生localStorage.setItem方法
localStorage.setItem = function (key, newValue) {
    let setItemEvent = new Event("setItemEvent");  // 重写注册setItem
    setItemEvent.key = key;
    setItemEvent.newValue = newValue;
    window.dispatchEvent(setItemEvent);            // 派发setItem
    orignalSetItem.apply(this, arguments);         // 设置值
}

import vHeader from "@/templates/header.vue";
Vue.component('vHeader', vHeader)
import clickLogin from "@/templates/clickLogin.vue";
Vue.component('clickLogin', clickLogin)

// 表单组件
import dataPicker from "@/templates/dataPicker.vue";
Vue.component('eg-data-picker', dataPicker)
import dataChecker from "@/templates/dataChecker.vue";
Vue.component('eg-data-checker', dataChecker)
import datePicker from "@/templates/datePicker.vue";
Vue.component('eg-date-picker', datePicker)
import stackPicker from "@/templates/stackPicker.vue";
Vue.component('eg-stack-picker', stackPicker)
import commonOpenModal from "@/templates/commonOpenModal.vue";
Vue.component('commonOpenModal', commonOpenModal)
import uploaderImg from "@/templates/uploaderImg.vue";
Vue.component('uploader-img', uploaderImg)
import uploaderFile from "@/templates/uploaderFile.vue";
Vue.component('uploader-file', uploaderFile)
import vanEmpty from "@/templates/vanEmpty.vue";
Vue.component('my-empty', vanEmpty)
import activityRules from "@/templates/activityRules.vue";
Vue.component('activity-rules', activityRules)
import informationPopup from "@/templates/informationPopup.vue";
Vue.component('informationPopup-rules', informationPopup)
import masonryHint from "@/templates/masonryHint.vue";
Vue.component('masonryHint-rules', masonryHint)
import subsidyRule from "@/templates/subsidyRule.vue";
Vue.component('subsidyRule-rules', subsidyRule)
import educationRule from "@/templates/educationRule.vue";
Vue.component('educationRule-rules', educationRule)
import accountHint from "@/templates/accountHint.vue";
Vue.component('accountHint-rules', accountHint)

// 工具
import utils from '@/assets/js/util/utils'
Vue.use(utils);

// 按需引入
import { Button, NavBar, Tabbar, TabbarItem, Cell, CellGroup, Field, Icon, Toast, DatetimePicker, Popup, Picker, Loading, Dialog, Swipe, SwipeItem, Lazyload, Row, Col, Tab, Tabs, Grid, GridItem, Checkbox, CheckboxGroup, Uploader, Panel, Divider, Search, Image, Sidebar, SidebarItem, Rate, Sku, Stepper, AddressList, GoodsAction, GoodsActionIcon, GoodsActionButton, AddressEdit, List, Sticky, Skeleton, Area, Tag, Step, Steps, SwitchCell, Card, SubmitBar, ActionSheet, Switch, Form, DropdownMenu, DropdownItem, Radio, RadioGroup, Collapse, CollapseItem, Overlay, IndexBar, IndexAnchor, PullRefresh, Popover, NoticeBar, Empty,Pagination  } from 'vant';
Vue.use(Button).use(NavBar).use(Tabbar).use(TabbarItem).use(Cell).use(CellGroup).use(Field).use(Icon).use(Toast).use(DatetimePicker).use(Popup).use(Picker).use(Loading).use(Dialog).use(Swipe).use(SwipeItem).use(Lazyload).use(Row).use(Col).use(Tab).use(Tabs).use(Grid).use(GridItem).use(Checkbox).use(CheckboxGroup).use(Uploader).use(Panel).use(Divider).use(Search).use(Image).use(Sidebar).use(SidebarItem).use(Rate).use(Sku).use(Stepper).use(AddressList).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(AddressEdit).use(List).use(Sticky).use(Skeleton).use(Area).use(Tag).use(Step).use(Steps).use(SwitchCell).use(Card).use(SubmitBar).use(ActionSheet).use(Switch).use(Form).use(DropdownMenu).use(DropdownItem).use(Radio).use(RadioGroup).use(Collapse).use(CollapseItem).use(Overlay).use(IndexBar).use(IndexAnchor).use(PullRefresh).use(Popover).use(NoticeBar).use(Empty).use(Pagination);

import vueEsign from 'vue-esign'
Vue.use(vueEsign)

import SignCanvas from "sign-canvas";
Vue.use(SignCanvas);

Vue.filter('transformTimestamp', function (val) {
    return compCheck.transformTimestamp(val);
})
Vue.filter('transformDatesTimestamp', function (val) {
    return compCheck.transformDatesTimestamp(val);
})
// 手机号中间隐藏
Vue.filter('phoneConceal', function (value) {
    if (value) { return value.substr(0, 3) + "****" + value.substr(7) }
    return '';
})
// 身份证号中间隐藏
Vue.filter('idNoConceal', function (value) {
    if (value) { return value.substr(0, 6) + "****" + value.substr(14) }
    return '';
})
// 银行卡号截取显示后4位
Vue.filter('bank', function (value) {
    if (value) { return value.substr(value.length - 4) }
    return '';
})
// 银行卡号前面隐藏，显示后4位
Vue.filter('bankHide', function (value) {
    if (value) { return "**** **** **** " + value.substr(value.length - 4) }
    return '';
})
// 万元
Vue.filter('tenThousand', function (value) {
    if (value) { return (value / 10000).toFixed(2) + '万' }
    return '0';
})
// 时间截取到年月日
Vue.filter('dateDayFilter', function (value) {
    if (value) { return value.substring(0, 10) }
    return '';
})
// 时间截转时间
Vue.filter('timestampToTime', function (value) {
    if (value) { return compCheck.timestampToTime(value) }
    return '';
})
// 时间截取到时
Vue.filter('datehourFilter', function (value) {
    if (value) { return value.substring(0, 13) }
    return '';
})
// 处理保险止期
Vue.filter('InsurancePeriod', function (value, insuYearUnit) {
    if (value && insuYearUnit) { return compCheck.InsurancePeriod(value, insuYearUnit) }
    return '';
})
// 车牌号：从第3位开始到第6位，掩盖4位
Vue.filter('licenseNoConceal', function (value) {
    if (value) { return value.substr(0, 3) + "****" + value.substr(7) }
    return '';
})
// 车架号：从第5位开始到第8位，掩盖4位
Vue.filter('frameNoConceal', function (value) {
    if (value) { return value.substr(0, 5) + "****" + value.substr(9) }
    return '';
})
// 发动机号：从第2位开始，到第5位，掩盖4位
Vue.filter('engineNoConceal', function (value) {
    if (value) { return value.substr(0, 2) + "****" + value.substr(6) }
    return '';
})
// 姓名掩码
Vue.filter('nameNoConceal', function (value) {
    if (value) {
        let first = value.substr(0, 1)
        let yard = '*';
        for (let i = 1; i < value.length - 1; i++) {
            yard += '*'
        }
        return first + yard
    }
    return '';
})

// Vue.prototype.$iosSystem = app.isIos() ? 32 : 0;
Vue.prototype.$iosSystem = 0;
Vue.prototype.$API = API;
Vue.prototype.$CTXBASE = configJs.config.ctx_base;
Vue.prototype.$HTTPBASE = configJs.config.http_base;
// 微信分享授权
Vue.prototype.$WxUrlAuthorize = function (local) {
    if (local) {
        let url = `${local}&manageVersion=${store.state.common.manageVersion}}`
        return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + configJs.APPID + '&redirect_uri=' + encodeURIComponent(url) + '&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect';
    }
    return ''
};

new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
});
