<template>
  <div class="confirm" v-if="isShow">
    <div class="con_box">
      <div class="content" :class="'context' + text.icon">
        <h6></h6>
        <!-- <img src="../assets/images/confirm/error.png" alt=""> -->
        <div class="backimg" :class="'backimg' + text.icon"></div>
        <p>{{text.msg}}</p>
        <div class="btn">
          <span @click="close()" class="cancle" v-if="text.btn.no">{{text.btn.no}}</span>
          <span @click="ok()" class="true" v-if="text.btn.ok">{{text.btn.ok}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: true,
      text: {
        type: "提示",
        icon:1,
        msg: "确定删除此条信息？",
        btn: {
          ok: "确定",
          no: "取消"
        }
      }
    };
  },
  mounted(){
    let _this = this
    document.onkeydown = function (e) {
      var key = window.event.keyCode;
      if (key == 32 || key == 13) {
        _this.ok()
        return false
      }
    };
  },
  methods: {
    close() {
      this.isShow = false
      console.log("关闭");
    },
    ok() {
      this.isShow = false
      console.log("确定");
    }
  }
};
</script>
<style scoped>
.confirm {
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
}
.con_box {
  width: 3.72rem;
  height: 2.3rem;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 5px;
}
.content{
  width: 100%;
  height: 2.3rem;
  color: #fff;
  position: relative;
}
.context1 {
  background: url('../assets/images/confirm/delete.png') no-repeat center /100% 100%;
  background-size: contain;
}
.context2 {
  background: url('../assets/images/confirm/selectBig.png') no-repeat center /100% 100%;
  background-size: contain;
}
.context3 {
  background: url('../assets/images/confirm/trueBig.png') no-repeat center /100% 100%;
  background-size: contain;
}
.context4 {
  background: url('../assets/images/confirm/selectBig.png') no-repeat center /100% 100%;
  background-size: contain;
}
.content .backimg{
  width: .68rem;
  height: .6rem;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
}
.content .backimg1{
  background: url('../assets/images/confirm/error.png') no-repeat center /100% 100%;
}
.content .backimg2{
  background: url('../assets/images/confirm/select.png') no-repeat center /100% 100% ;
}
.content .backimg3{
  background: url('../assets/images/confirm/true.png') no-repeat center /100% 100%;
}
.content .backimg4{
  background: url('../assets/images/confirm/plaint.png') no-repeat center /100% 100%;
}

.context1 p,
.context2 p,
.context3 p,
.context4 p{
  position: relative;
  top: 55%;
  text-align: center;
  color: #d16f66;
  padding:0 .1rem;
  font-size: .14rem;
}
.context2 p{
  color: #9D8D57;
}
.context3 p{
  color: #2e93fb;
}
.context4 p{
  color: #9D8D57;
}
.btn{
  width: 100%;
  height: .3rem;
  position: absolute;
  bottom: .2rem;
  left: 0;
  display: flex;
}
.context1 div span,
.context2 div span,
.context3 div span,
.context4 div span{
  display: inline-block;
  margin: 0 auto;
  width: .78rem;
  height: 0.28rem;
  background-size: 100% 100%;
  cursor: pointer;
  text-align: center;
  line-height: 0.28rem;
}

.context1 div .true,
.context2 div .true,
.context3 div .true,
.context4 div .true{
  background: url('../assets/images/confirm/blue-bg-normal.png') no-repeat center /100% 100%;
  /* right: 30px; */
}
.context1 div .true:hover,
.context2 div .true:hover,
.context3 div .true:hover,
.context4 div .true:hover{
  background: url('../assets/images/confirm/blue-bg-hover.png') no-repeat center /100% 100%;
}
.context1 div .cancle,
.context2 div .cancle,
.context3 div .cancle,
.context4 div .cancle{
  background: url('../assets/images/confirm/yellow-bg-normal.png') no-repeat center /100% 100%;
  /* right: 120px; */
}
.context1 div .cancle:hover,
.context2 div .cancle:hover,
.context3 div .cancle:hover,
.context4 div .cancle:hover{
  background: url('../assets/images/confirm/yellow-bg-hover.png') no-repeat center /100% 100%;
}

</style>

