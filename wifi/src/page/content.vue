<template>
  <div>

    <div class="">
      <ul>
        <li v-for="(i,index) in list" :key="index">
          <router-link :to="'/content/' + i.id">
            {{ i.title }}
         </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
         list:[]
      }
    },
    created () {
      this.$http.get('https://cnodejs.org/api/v1/topics')//测试axios请求
      .then((response)=> {
         this.list=response.data.data;//this需要注意，then方法里面的回掉函数用箭头函数
         console.log(this.list)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
</script>
