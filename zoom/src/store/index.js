import Vue from 'vue'
import Vuex from 'vuex'
import car from './modules/car/'
import home from './modules/home/'
import my from './modules/my/'
import common from './modules/common/'
import order from './modules/order/'
import renewedInsurance from './modules/renewedInsurance/'
import study from './modules/study/'
import integral from './modules/integral/'
import shop from './modules/shop/'
import clockIn from './modules/clockIn/'

import createPersistedState from "vuex-persistedstate"

//挂载Vuex
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    car,
    home,
    my,
    common,
    order,
    renewedInsurance,
    study,
    integral,
    shop,
    clockIn
  },
  plugins: [createPersistedState()]
})