/*
 * @Author: 李志远
 * @Date: 2019-10-30 14:40:25
 * @LastEditTime : 2020-01-02 16:21:05
 * @LastEditors  : 李志远
 * @Description: 描述
 * @FilePath: \vacp-wfes\src\components\gs-component\index.js
 * @写bug苦逼，一直写bug一直苦逼
 */
import PaginationComponent from './Pagination.vue'
import TagdialogComponent from './VDialog.vue'
import GsDialogComponent from './Dialog.vue'
import PaginationsComponent from './Paginations.vue'

const GsComponent = {
    install: function (Vue) { 
        Vue.component('Pagination', PaginationComponent)
        Vue.component('VDialog', TagdialogComponent)
        Vue.component('GsDialog', GsDialogComponent)
        Vue.component('Paginations', PaginationsComponent)
     }
}

export default GsComponent