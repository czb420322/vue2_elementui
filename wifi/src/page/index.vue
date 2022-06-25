<template>
  <div>
    <!-- <Header /> -->
    <!-- <div style="heigth:100px;background:red">pppp9999</div> -->
    <router-view/>
	</div>
</template>
<script>
  import Header from '@/components/header'
  import Uploadpicture from '../components/upload_picture'
  import Searchall from '../components/search_all'
  import Indexcontent from '../components/platform'
  import { mapState } from 'vuex';
  export default {
    data(){
      return {
         list:[],
        //  status:""
      }
    },
    computed: {
      ...mapState([
        'status',
        'token',
        'currentUser'
      ]),
    },
    created () {

    },
    mounted(){

    },
    components:{
      Uploadpicture,Searchall,Indexcontent,Header
    },
    methods:{

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
// .tt_{
//   background: red;
//   width: 200px;
//   height: 200px;
// }
</style>
