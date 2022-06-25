<template>

  <div>
    <!-- <Header/> -->
    <!-- <Nav/> -->
    <!-- <Login_modify_out/> -->
    <div class="search">
      <div>全文检索</div>
      <div>
        <input type="text" />
        <img />
      <div>
      <div>检索</div>
    </div>
    
  </div>
</template>
<script>
  import Header from '../components/header'
  import Nav from './nav/'
  import Login_modify_out from './nav/login_modify_out'
  
  export default {
    data(){
      return {
         list:[]
      }
    },
    created () {
      
    },
    components:{
      Header
      // Nav
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .search{
    height: 58px;
  }
  input{

  }
</style>
