<template>
  <div class="bbbb">
    <p class="carInfo"><span>|</span> 车辆标识信息</p>
    <div class="Infos radioInfo">
      <el-checkbox v-model="detection">
        <span>是否有副驾</span>
      </el-checkbox>
      <div >
        <el-radio :disabled="!detection" v-model="dt" :label="1">有</el-radio>
        <el-radio :disabled="!detection" v-model="dt" :label="0">无</el-radio>
      </div>
    </div>
    <div class="Infos radioInfo">
      <el-checkbox v-model="detection9">
        <span>天窗</span>
      </el-checkbox>
      <div >
        <el-radio :disabled="!detection9" v-model="dt9" :label="1">有</el-radio>
        <el-radio :disabled="!detection9" v-model="dt9" :label="0">无</el-radio>
      </div>
    </div>
    <div class="Infos radioInfo">
      <el-checkbox v-model="detection10">
        <span>行李架</span>
      </el-checkbox>
      <div >
        <el-radio :disabled="!detection10" v-model="dt10" :label="1">有</el-radio>
        <el-radio :disabled="!detection10" v-model="dt10" :label="0">无</el-radio>
      </div>
    </div>
    <div class="Infos">
      <el-checkbox v-model="detection1">
        <span>检测面部</span>
      </el-checkbox>
        <div :class="detection1?'ys':0">
          <select :disabled="!detection1"  v-model="face.mark">
            <option value=">">大于</option>
            <option value="=">等于</option>
            <option value="<">小于</option>
          </select>
          <input :disabled="!detection1" class="two" type="number" min="0" max="10" v-model="face.value"
          onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}" />
          <b>人</b>
        </div>
    </div>
    <div class="Infos">
      <el-checkbox v-model="detection2">
        <span>系安全带</span>
      </el-checkbox>
        <div :class="detection2?'ys':0">
          <select :disabled="!detection2"  v-model="belt.mark">
            <option value=">">大于</option>
            <option value="=">等于</option>
            <option value="<">小于</option>
          </select>
          <input :disabled="!detection2" class="two" type="number" min="0" max="10" v-model="belt.value"
          onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}" />
          <b>人</b>
        </div>
    </div>
    <div class="Infos">
      <el-checkbox v-model="detection3">
        <span>打开遮阳板</span>
      </el-checkbox>
        <div :class="detection3?'ys':0">
          <select :disabled="!detection3"  v-model="sunshield.mark">
            <option value=">">大于</option>
            <option value="=">等于</option>
            <option value="<">小于</option>
          </select>
          <input :disabled="!detection3" class="two" type="number" min="0" max="10" v-model="sunshield.value"
          onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}" />
          <b>个</b>
        </div>
    </div>
    <div class="Infos">
      <el-checkbox v-model="detection4">
        <span>车辆挂饰</span>
      </el-checkbox>
        <div :class="detection4?'ys':0">
          <select :disabled="!detection4"  v-model="decoratio.mark">
            <option value=">">大于</option>
            <option value="=">等于</option>
            <option value="<">小于</option>
          </select>
          <input  :disabled="!detection4" class="two" type="number" min="0" max="10" v-model="decoratio.value"
          onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}" />
          <b>个</b>
        </div>
    </div>
    <div class="Infos">
      <el-checkbox v-model="detection5">
        <span>纸巾盒</span>
      </el-checkbox>
        <div :class="detection5?'ys':0">
          <select :disabled="!detection5"  v-model="napkinbox.mark">
            <option value=">">大于</option>
            <option value="=">等于</option>
            <option value="<">小于</option>
          </select>
          <input :disabled="!detection5" class="two" type="number" min="0" max="10" v-model="napkinbox.value"
          onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}" />
          <b>个</b>
        </div>
    </div>
    <div class="Infos">
      <el-checkbox v-model="detection6">
        <span>转经筒</span>
      </el-checkbox>
        <div :class="detection6?'ys':0">
          <select :disabled="!detection6"  v-model="zhuanjt.mark">
            <option value=">">大于</option>
            <option value="=">等于</option>
            <option value="<">小于</option>
          </select>
          <input :disabled="!detection6" class="two" type="number" min="0" max="10" v-model="zhuanjt.value"
          onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}" />
          <b>个</b>
        </div>
    </div>
    <div class="Infos">
      <el-checkbox v-model="detection7">
        <span>打电话</span>
      </el-checkbox>
        <div :class="detection7?'ys':0">
          <select :disabled="!detection7"  v-model="callPhone.mark">
            <option value=">">大于</option>
            <option value="=">等于</option>
            <option value="<">小于</option>
          </select>
          <input :disabled="!detection7" class="two" type="number" min="0" max="10" v-model="callPhone.value"
          onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}" />
          <b>人</b>
        </div>
    </div>
    <div class="Infos">
      <el-checkbox v-model="detection8">
        <span>抽烟</span>
      </el-checkbox>
        <div :class="detection8?'ys':0">
          <select :disabled="!detection8"  v-model="smoke.mark">
            <option value=">">大于</option>
            <option value="=">等于</option>
            <option value="<">小于</option>
          </select>
          <input :disabled="!detection8" class="two" type="number" min="0" max="10" v-model="smoke.value"
          onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}" />
          <b>人</b>
        </div>
    </div>
    <div class="Infos">
      <el-checkbox v-model="detection11">
        <span>年检标</span>
      </el-checkbox>
        <div :class="detection11?'ys':0">
          <select :disabled="!detection11"  v-model="tag.mark">
            <option value=">">大于</option>
            <option value="=">等于</option>
            <option value="<">小于</option>
          </select>
          <input :disabled="!detection11" class="two" type="number" min="0" max="10" v-model="tag.value"
          onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}" />
          <b>个</b>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['isReset'],
    data () {
      return {
        driver:{ mark: ">", value: 0},
        face:{ mark: ">", value: 0},
        belt: { mark:">", value: 0},
        sunshield:{ mark: ">", value: 0},
        decoratio:{ mark: ">", value: 0},
        napkinbox:{ mark: ">", value: 0},
        zhuanjt:{ mark: ">", value: 0},
        callPhone:{ mark: ">", value: 0},
        smoke:{ mark: ">", value: 0},
        sunroof:{ mark: ">", value: 0},
        bracket:{ mark: ">", value: 0},
        tag:{ mark:">", value:0},

        detection: false,
        detection1: false,
        detection2: false,
        detection3: false,
        detection4: false,
        detection5: false,
        detection6: false,
        detection7: false,
        detection8: false,
        detection9: false,
        detection10: false,
        detection11: false,
        dt: 1,
        dt9: 1,
        dt10: 1
      }
    },
    watch:{
      isReset(newValue,oldValue){
        if(newValue){
          this.empty();
        }
      }
    },
    computed: {
      params (){
        let p = {};
        if(this.detection){
          p.driver = this.dt? { mark: ">", value: 1}: { mark: "<=", value: 1};
        }
        if(this.detection1){
          p.face = { mark: this.face.mark, value: this.face.value };
        }
        if(this.detection2){
          p.belt = { mark: this.belt.mark, value: this.belt.value };
        }
        if(this.detection3){
          p.sunshield = { mark: this.sunshield.mark, value: this.sunshield.value };
        }
        if(this.detection4){
          p.decoratio = { mark: this.decoratio.mark, value: this.decoratio.value };
        }
        if(this.detection5){
          p.napkinbox = { mark: this.napkinbox.mark, value: this.napkinbox.value };
        }
        if(this.detection6){
          p.zhuanjt = { mark: this.zhuanjt.mark, value: this.zhuanjt.value };
        }
        if(this.detection7){
          p.callPhone = { mark: this.callPhone.mark, value: this.callPhone.value };
        }
        if(this.detection8){
          p.smoke = { mark: this.smoke.mark, value: this.smoke.value };
        }
        if(this.detection9){
          p.sunroof = this.dt9? { value: 1}: {value: 0};
        }
        if(this.detection10){
          p.bracket = this.dt10? {value: 1}: {value: 0};
        }
        if(this.detection11){
          p.tag = { mark: this.tag.mark, value: this.tag.value };
        }
        return p;

      }
    },
    methods: {
      passSynData (){
        this.$emit('sendSynToParent',this.params);
      },
      empty(){
        this.driver={ mark: ">", value: 0};
        this.face={ mark: ">", value: 0};
        this.belt= { mark:">", value: 0};
        this.sunshield={ mark: ">", value: 0};
        this.decoratio={ mark: ">", value: 0};
        this.napkinbox={ mark: ">", value: 0};
        this.zhuanjt={ mark: ">", value: 0};
        this.callPhone={ mark: ">", value: 0};
        this.smoke={ mark: ">", value: 0};
        this.sunroof={ mark: ">", value: 0};
        this.bracket={ mark: ">", value: 0};
        this.tag={ mark:">", value:0};

        this.detection= false;
        this.detection1= false;
        this.detection2= false;
        this.detection3= false;
        this.detection4= false;
        this.detection5= false;
        this.detection6= false;
        this.detection7= false;
        this.detection8= false;
        this.detection9= false;
        this.detection10= false;
        this.detection11= false;
        this.dt= 1;
        this.dt9= 1;
        this.dt10= 1;
      }
    },
    updated () {
      this.passSynData();
    }
  }
</script>

<style scoped>
/* @import url('../../assets/css/commom.css'); */
  .el-collapse {
    border-top: none;
    border-bottom: none;
  }

  .bbbb .carInfo{
    color: #409eff;
    font-size: 0.14rem;
    margin: 0.2rem 0;
  }
  .bbbb .carInfo span{
    margin-right: 0.1rem;
    width: 2px;
    }

  .bbbb .Infos{
    margin-bottom: 0.2rem;
    margin-left: 0.16rem;
    position: relative;
  }
  .bbbb .Infos  .el-checkbox{
    color: #99c9fa ;
    line-height: 0.25rem;
    font-size:0.14rem;
  }
  .bbbb .Infos  .el-checkbox select{
    color: #99c9fa ;
  }
  .bbbb .Infos  .el-checkbox .two{
    border-left: 1px solid #c0c4cc;
  }
  .bbbb .Infos .is-checked div{
    border: 1px solid #409eff;
  }
  .bbbb .Infos .is-checked div select{
    color: #409eff;
  }
  .bbbb .Infos .is-checked div .two{
    color: #409eff !important;
    border-left: 1px solid #409eff;
  }
  .bbbb .Infos .ys{
    border: 1px solid #409eff;
  }
  .bbbb .Infos .ys select{
    color: #409eff;
  }
  .bbbb .Infos .ys .two{
    color: #409eff !important;
    border-left: 1px solid #409eff;
  }
  .bbbb .Infos div{
    width: 1.35rem;
    height: 24px;
    display: inline-block;
    /* border: 1px solid #c0c4cc; */
   border: 1px solid #2A2D30 ;
    position: absolute;
    left: 1.4rem;
    color:#99c9fa ;
    border-radius: 2px
  }
  .bbbb .Infos div select{
    width: 0.65rem;
    text-align: center;
    border: 0;
    font-size: 12px;
    color: #99c9fa ;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .bbbb .Infos div select option{
    color:#99c9fa ;
     background:#030810
  }
  .bbbb .Infos div select option:hover{
    background:rgba(12, 68, 135, 0.4) ;
   color:#99c9fa !important;
  }
  .bbbb .Infos div input{
    margin-top: -2px;
  }
  .bbbb .Infos div span{
    display: inline-block;
    padding: 0 5px;
  }
  .bbbb .Infos div b{
    position: absolute;
    right: -20px;
    font-weight: normal;
    font-size:0.14rem;
  }

  .bbbb .radioInfo div{
    border: none;
  }
  .bbbb .radioInfo div .el-radio+.el-radio{
     position: absolute;
     right: -20px;
     top: 5px;
   }

  .two{
    width:0.5rem;
    border:none;
    text-align:center;
    border-left: 1px solid #ccc;
  }
  .two:disabled{
    background:transparent;
  }

  .bbbb .Infos .el-checkbox >>> .el-checkbox__label{
    padding-left: 0.1rem;
    line-height: 0.2rem;
    font-size: 0.14rem;
  }
 .bbbb .Infos>>>.el-radio__input.is-disabled+span.el-radio__label {
    color: #99c9fa  !important;
}
.Infos>>>.el-checkbox__input .el-checkbox__inner{
  background: transparent ;
    border: 1px solid #409eff
}
.Infos>>>.el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: #409EFF;
    border-color: #409EFF;
}
</style>

