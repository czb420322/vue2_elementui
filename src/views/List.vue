<!--
 * @Author: your name
 * @Date: 2021-06-18 19:52:22
 * @LastEditTime: 2021-09-04 23:26:54
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \lesson22\src\views\List.vue
-->
<template>
  <div>
      全局的数据为{{num}}4554787874
      <button @click="add">+</button>
  </div>
</template>

<script>
import  {mapState,mapMutations} from  "vuex"
export default {
    computed:{
        ...mapState(["num"])
    },
    methods:{
        ...mapMutations(["add"])
    }


}
</script>

<style>

</style>