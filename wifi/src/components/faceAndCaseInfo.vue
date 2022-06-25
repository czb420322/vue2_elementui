<template>
 <div id="faceCase" v-show="$store.state.showFaceCace" class="faceCase">
    <div>
      <p>人员姓名：<span>{{this.$store.state.faceInfo.name}}</span></p>
      <p>人员生日：<span>{{this.$store.state.faceInfo.birthday}}</span></p>
      <p>身份证号：<span>{{this.$store.state.faceInfo.certNumber}}</span></p>
      <p>性别：<span>{{this.$store.state.faceInfo.sex == 0 ? '男' : '女'}}</span></p>
      <p>备注：<span>{{this.$store.state.faceInfo.remark}}</span></p>
    </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {

   },
   methods: {

   }
 }
</script>

<style scoped>
.faceCase{
  width: 2.5rem;
  font-size: 0.14rem;
  color: #99c9fa;
  border-radius: 5px;
  padding: 0.1rem;
  background-color: rgba(8, 28, 49, 0.9);
  border: 1px solid rgba(21, 48, 78, 0.9);
  position: absolute;
  z-index: 9999;
}


</style>
