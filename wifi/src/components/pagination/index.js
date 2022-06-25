import PaginationComponent from './Pagination.vue'

const Pagination = {
    install: function (Vue) { 
        Vue.component('Pagination', PaginationComponent)
     }
}

export default Pagination