<template>
  <div class="content_search">
    <div class="wrap">
      <div class="search" v-if="this.getToIndex.path == '/vehicle'" id="searchPanel">
        <input v-if="this.getToIndex.path == '/vehicle'" type="text" name="" v-model.trim="car" placeholder="在此处输入要搜索的车牌号码"   @keyup.enter="searchCar">
        <!-- <input v-else-if="this.getToIndex.path == '/caseIndex'" type="text" name="" v-model.trim="car" placeholder="在此处输入要搜索的案事件相关属性"   @keyup.enter="searchCar"> -->
        <!-- <input v-else type="text" name="" v-model.trim="car" placeholder="在此处输入要搜索的工具名称"   @keyup.enter="searchCar"> -->
        <img v-if="this.getToIndex.path == '/vehicle'" src="../assets/images/newIndex/cam-icon.png" alt="">
        <!--<div v-show="!status" class="ico" @click="toggleSearch"></div>-->
        <div v-if="this.getToIndex.path == '/vehicle'" v-show="searchErr" id="searchErr" class="searchErr">车牌号格式输入不正确！</div>
      </div>
      <div  v-if="this.getToIndex.path == '/vehicle'" :class="[{'sicon': status}, 'text']" @click="searchCar">搜索</div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    data(){
      return {
        list:[],
        car:"",
        searchErr: false
        //  status:true
      }
    },
    created () {

    },
    computed:{
      ...mapState([
        'status',
        'toIndex',
      ]),
      ...mapGetters([
        'getToIndex'
      ]),
    },
    methods:{
      // pop_search:function(){
      //   this.$emit('pop_search',{status:this.status})
      // },

      ...mapMutations([
        'TOGGLE_PIC_DIV'
      ]),
      ...mapActions([
        'toggleSearch'
      ]),
      searchCar(){
        if(this.getToIndex.path == "/vehicle"){
          if(this.car != ""){
            let xxreg = /^[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新港澳台]{1}[A-Z]{1}[A-Z*0-9]{1,5}[A-Z*0-9挂学警港澳]{0,1}$/;   //模糊车牌
            if (!xxreg.test(this.car)){
              //this.$message.error('车牌号格式输入不正确');
              this.searchErr = true;
              return;
            }else{
              this.searchErr = false;
              this.$router.push({path:"/carJudged/carPlateSearch",query:{menuCode: '303',plateNo:this.car}});  //跳转到车牌搜车
            }
          }else{
            this.searchErr = false;
          }
        }else if(this.getToIndex.path == "/caseIndex"){
          if(this.car != ""){
            sessionStorage.removeItem("caseSearchCondition");
            let SearchCondition = {
              keyword: this.car
            };
            sessionStorage.setItem('caseSearchCondition', JSON.stringify(SearchCondition));
            this.$router.push({path:'/casestudy/caseInfomanage',query:{menuCode:202}});
          }
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .content_search{
    position:absolute;
    top:0.6rem;
    left:0;
    width: 100%;
    min-width: 1200px;
    display: flex;
    // background: greenyellow;
    height:0.6rem;
    justify-content: center;
    align-items: center;
    // background:#F5F7FA;
    // border-bottom: 1px solid rgba(15, 44, 79, 0.5);
    box-shadow: 0 1px 1px 1px solid rgba(15, 44, 79, 0.5);
    .wrap{
      display: flex;
      width: 35%;
      height: 0.35rem;
      .search{
        display: flex;
        width: 88%;
        align-items: center;
        // background:#f8f9fb;
        // border:1px solid #c7c9cd;

        background-color: rgba(16, 35, 56, 0.5);
        position: relative;

      // ::-webkit-input-placeholder {
      //     color:   #fff
      // }
      img{
        position: absolute;
        right:0.11rem;
        top:0.11rem;
        height:0.17rem;
        width:0.2rem;
      }
        input{
          flex: 1;
          font-size: 0.14rem;
          height: 100%;
          border: none;
          border: 1px solid rgba(15, 44, 79, 0.5);
          background-color: rgba(16, 35, 56, 0.5);
          padding-left:0.1rem;
          padding-right:1.8rem;
          color:#99c9fa
          // letter-spacing: 1px;
        }

        .ico{
          width: 5%;
          height: 0;
          padding-top:4%;
          margin-right: 0.12rem;
          background: url("../assets/ss_03.png") no-repeat center;
          background-size: cover;
          cursor: pointer;
        }
        .searchErr{
          position: absolute;
          background: red;
          color:#fff;
          right:0.1rem;
          font-size:0.14rem;
          line-height: 0.24rem;
          padding: 0.04rem;
          padding-left: 0.08rem;
        }
        .searchErr::after{
          content: " ";
          position: absolute;
          top: 0.1rem;
          left: -1px;
          height: 0.09rem;
          width: 0.09rem;
          margin-left: -0.03rem;
          transform: rotate(-45deg);
          background: red;
        }
      }
      .text{
        display: flex;
        flex:1;
        justify-content: center;
        align-items: center;
        color:#fff;
        font-size: 0.14rem;
        background-color:#053061;
        color: #ECEEF0 !important;
        border: 1px solid #376c87;
        cursor: pointer;
      }
      .sicon{
        background:url(../assets/phone.png) no-repeat center center #2aa0fe;
        text-indent: -99999px;
      }
    }
  }

</style>
