<template>
  <div class="searchbox">
    <div class="searchleft">
      <span class="icon">当前位置：</span>
      <span class="location">{{moduleName}}</span>
    </div>
    <div class="searchright">
      <el-input v-model.trim="car"  placeholder="在此处输入要搜索的车牌号码" @blur='searchCar'  @keyup.enter="searchCar"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchCar">搜索</el-button>
      <div v-show="searchErr" id="searchErr" class="searchErr">车牌号格式输入不正确！</div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  export default {
    name: "search_vehicle",
    props: ["moduleName"],
    data(){
      return{
        car:"",
        searchErr: false
      }
    },
    computed:{
      ...mapState([
        'toIndex',
      ]),
      ...mapGetters([
        'getToIndex'
      ]),
    },
    methods:{
      searchCar(){

          if(this.car != "") {
            let xxreg = /^[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新港澳台]{1}[A-Z]{1}[A-Z*0-9]{1,5}[A-Z*0-9挂学警港澳]{0,1}$/;   //模糊车牌
            if (!xxreg.test(this.car)) {
              //this.$message.error('车牌号格式输入不正确');
              this.searchErr = true;
              return;
            } else {
              this.searchErr = false;
              this.$router.push({path: "/carJudged/carPlateSearch", query: {menuCode: '303', plateNo: this.car}});  //跳转到车牌搜车
            }
          }else{
            this.searchErr = false;
          }

      }
    }
  }
</script>

<style scoped>
  .searchbox{
    min-width: 1200px;
    position: fixed;
    top: 0.6rem;
    left: 0;
    width: 100%;
    display: flex;
    height: 0.54rem;
    background: #edf0f5;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dcdfe6;
    box-shadow: 0 1px 1px #cdcdcd;
  }
  .searchleft{
    width:6.3rem;
    font-size: 0.16rem;
    margin-left: 0.3rem;
  }
  .searchleft .icon{
    display: inline-block;
    color: #757575;
    background: url("../assets/images/sysmanage/home.png") no-repeat;
    text-indent: 0.24rem;
  }
  .searchleft .location{
    color: #3685cb;
    font-size: 0.18rem;
  }
  .searchright{
    flex: 2;
    display: flex;
    align-items: center;
    position: relative;
  }
  .searchbox .el-input{
    width: 6.5rem;
    margin-right: 0.2rem;
  }
  .searchErr{
    position: absolute;
    background: red;
    color:#fff;
    left:4.4rem;
    width:2rem;
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
  .searchbox .el-button{
    height:0.41rem;
    padding: 0 0.2rem;
    font-size:0.14rem;
    line-height:0.41rem;
  }
  .searchright >>> .el-input__inner{
    font-size:0.14rem;
    height:0.41rem;
    padding: 0 0.2rem;
    padding-right:2.2rem;
    line-height:0.41rem;
  }
</style>
