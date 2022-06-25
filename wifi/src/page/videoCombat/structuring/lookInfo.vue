<template>
  <div class="taskMange">
    <el-dialog
        title="排查条件设置"
        :visible.sync="dialogVisible"
        @close="closeDia"
	      :close-on-press-escape="false"
        :close-on-click-modal="false"
        @open="opendia"
        width="60%">
        <div class="taskrelation" v-if="dialogVisible">
          <!-- 坐标排查区域 -->
          <div class="lookleft">
            <p class="toptitle"><span>|</span>&nbsp;排查点位</p>
            <div class="loollcenter">
              <div class="treecenter">
                <el-radio-group v-model="deviceId">
                  <el-radio v-for="(item,index) in ptlist" :label="item.deviceUuid" :key="index" @change="getptlist($event,index)">
                    {{item.cameraName}}
                    <el-checkbox-group v-if="checkpt == index" @change="getallVideo" v-model="checkvideo">
                      <el-checkbox v-for="(video,keyindex) in videolist" :label="video" :key="keyindex">{{video.fileName}}</el-checkbox>
                    </el-checkbox-group>
                  </el-radio>
                </el-radio-group>

                <!-- <div class="ptlocl" v-for="(item,index) in ptlist" :key="index" @click="getptlist(index)">
                  <img v-show="checkpt == index" src="../../../assets/isON.png" alt="">
                  <img v-show="checkpt != index" src="../../../assets/isOFF.png" alt="">
                   <span>{{item.name}}</span>
                    <el-checkbox-group v-show="checkpt == index" @change="getallVideo" v-model="checkvideo">
                      <el-checkbox v-for="(video,keyindex) in videolist" :label="video.id" :key="keyindex">{{video.aaa}}</el-checkbox>
                    </el-checkbox-group>
                </div> -->
              </div>
              <div class="timecenter">
                <p class="toptitle"><span>|</span>&nbsp;时间过滤</p>
                 <p class="timeclass">
                  <el-checkbox  v-model="checkbegintime" @change="changebegintime" :disable="forbidtime"></el-checkbox>
                  <span>开始时间：</span>
                  <input type="text" v-show="timeone == 1" v-model="beginData" id="checkbegin" readonly placeholder="3333">
                  <input type="text" v-show="timeone == 2" v-model="beginData" id="checkone" readonly placeholder="1111">
                  <input type="text" v-show="timeone == 3" v-model="beginData" id="noneone" readonly placeholder="5555">
                </p>
                <p class="timeclass">
                  <el-checkbox  v-model="checkendtime" @change="changeendtime" :disable="forbidtime"></el-checkbox>
                  <span>结束时间：</span>
                  <input type="text"  v-show="timetwo == 1" v-model="endData" id="checkend" readonly placeholder="444">
                  <input type="text" v-show="timetwo == 2" v-model="endData" id="checktwo" readonly placeholder="2222">
                  <input type="text" v-show="timetwo == 3" v-model="endData" id="nonetwo" readonly placeholder="6666">
                </p>
              </div>
              <div class="controlcenter">
                <p class="toptitle"><span>|</span>&nbsp;空间过滤</p>
                <p class="controlclass">
                  <span class="controlone">区域过滤：</span>
                  <span class="controltwo">
                    <el-radio v-model="arearule" @change="clearCanvas" label="1">感兴趣区域</el-radio>
                    <el-radio v-model="arearule" @change="clearCanvas" label="2">排查区域</el-radio>
                  </span>
                </p>
                <p  class="controlclass">
                  <span class="controlone">跨线/方向过滤：</span>
                  <span class="controltwo">
                    <el-radio v-model="arearule" @change="clearCanvas" label="3">跨线排查</el-radio>
                    <el-radio v-model="arearule" @change="clearCanvas" label="4">方向排查</el-radio>
                  </span>
                </p>
              </div>

            </div>
          </div>
          <!-- 右边排查区域 -->
          <div class="lookright">
            <p class="toptitle"><span>|</span>&nbsp;场景快照</p>
            <div class="imgcanvas" id="imgcanvas" @click="getcoordnate" @dblclick="dbgetcoor">
              <img id="lookimg" :src="lableimg" alt="">
              <canvas id="onecanvas"></canvas>
              <canvas id="twocanvas" v-show="showCanvas" style="z-index:1"></canvas> <!--  画箭头的canvas -->
            </div>

            <p class="toptitle"><span>|</span>&nbsp;属性过滤</p>
            <div class="labelinfo">
              <div class="searchkline">
                <el-button :disabled="disperson" :class="{avtive: isoptfor == 1}" @click="getpersonInfo" class="commBtn addBtn">行人</el-button>
                <el-button :disabled="discar" :class="{avtive: isoptfor == 2}" @click="getcarInfo" class="commBtn addBtn">车辆</el-button>
                <el-button :disabled="disbic" :class="{avtive: isoptfor == 3}" @click="getbicInfo" class="commBtn addBtn">骑车人</el-button>
              </div>
              <div class="showinfo" v-show="isoptfor == 1">
                <p>
                  <span>上衣款式：<i></i></span>
                  <el-select @visible-change="getpropers(3,22)" v-model="coatLength">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>上衣纹理：<i></i></span>
                  <el-select @visible-change="getpropers(3,9)" v-model="coatPattern">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>上衣颜色：<i></i></span>
                  <el-select @visible-change="getpropers(3,54)" v-model="coatColor">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>下衣款式：<i></i></span>
                  <el-select @visible-change="getpropers(3,10)" v-model="trousersStyle">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>下衣颜色：<i></i></span>
                  <el-select @visible-change="getpropers(3,56)" v-model="trousersColor">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>鞋子款式：<i></i></span>
                  <el-select @visible-change="getpropers(3,23)" v-model="shoesStyle">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>鞋子颜色：<i></i></span>
                  <el-select @visible-change="getpropers(3,24)" v-model="shoesColor">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>性别：<i></i></span>
                  <el-select @visible-change="getpropers(3,16)" v-model="sex">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>民族：<i></i></span>
                  <el-select @visible-change="getpropers(3,19)" v-model="ethnic">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>头部标志：<i></i></span>
                  <el-select @visible-change="getpropers(3,2)" v-model="headLandMark">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>附属物品：<i></i></span>
                  <el-select @visible-change="getpropers(3,20)" v-model="accessoryItem">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>发型：<i></i></span>
                  <el-select @visible-change="getpropers(3,21)" v-model="hairStyle">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>年龄：<i></i></span>
                  <el-select @visible-change="getpropers(3,8)" v-model="age">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>包款式：<i></i></span>
                  <el-select @visible-change="getpropers(3,52)" v-model="packageStyle">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
              </div>
              <div class="showinfo" v-show="isoptfor == 2">
                <p>
                  <span>车辆角度：<i></i></span>
                  <el-select @visible-change="getpropers(1,3)" v-model="vehicleAngle">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>车辆型号：<i></i></span>
                  <el-select @visible-change="getpropers(1,34)" v-model="vehicleClass">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>车辆颜色：<i></i></span>
                  <el-select @visible-change="getpropers(1,39)" v-model="vehicleColor">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>车辆标志：<i></i></span>
                  <el-select @visible-change="getpropers(1,57)" v-model="landMark">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>面部遮挡：<i></i></span>
                  <!-- <el-select @visible-change="getpropers(1,62)" v-model="CoatStyle"> -->
                  <el-select v-model="faceMask">
                    <!-- <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option> -->
                    <el-option  label="面部遮挡" value="0" key="0"></el-option>
                    <el-option  label="面部未遮挡" value="1" key="1"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>车牌颜色：<i></i></span>
                  <el-select @visible-change="getpropers(4,21)" v-model="plateColor">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>车牌类型：<i></i></span>
                  <el-select @visible-change="getpropers(4,20)" v-model="plateClass">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>

              </div>
              <div class="showinfo" v-show="isoptfor == 3">
                <p>
                  <span>头部标识：<i></i></span>
                  <el-select @visible-change="getpropers(2,3)" v-model="headLandMark">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>车型：<i></i></span>
                  <el-select @visible-change="getpropers(2,4)" v-model="vehicleClass">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>车辆角度：<i></i></span>
                  <el-select @visible-change="getpropers(2,1)" v-model="vehicleAngle">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>骑车人性别：<i></i></span>
                  <el-select @visible-change="getpropers(2,16)" v-model="sex">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>骑车人民族：<i></i></span>
                  <el-select @visible-change="getpropers(2,19)" v-model="ethnic">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>骑车人包类型：<i></i></span>
                  <el-select @visible-change="getpropers(2,2)" v-model="backpackClass">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>上衣颜色：<i></i></span>
                  <el-select @visible-change="getpropers(2,5)" v-model="coatColor">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>上衣图案：<i></i></span>
                  <el-select @visible-change="getpropers(2,6)" v-model="coatPattern">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>车身颜色：<i></i></span>
                  <el-select @visible-change="getpropers(2,8)" v-model="vehicleColor">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
                <p>
                  <span>违法载人：<i></i></span>
                  <el-select @visible-change="getpropers(2,9)" v-model="manned">
                    <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                  </el-select>
                </p>
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
           <el-button class="cancleBtn" @click="dialogVisible = false">取 消</el-button>
            <el-button v-show="!istwoinves" type="primary" class="passBtn" @click="investigate" >开 始 排 查</el-button>
            <el-button v-show="istwoinves" type="primary" class="passBtn" @click="investigate" >二 次 排 查</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>

import lookinfo from '../../../api/realvideo/lookinfo.js' //引入js
import videoDown from "../../../api/casestudy/videoDown.js";
import beginEnd from "../../../api/realvideo/BenEedTime.js"; //时间
import glstlist from "../../../api/realvideo/glstproperty.js"; //glst 结构化信息的js
import { mapActions,mapMutations, mapState,mapGetters } from 'vuex'  //引入vuex
import zkyStructure from '../../../components/zkystructure' // 中科院属性过滤字段

export default {
  data(){
    return{


    }
  },
  mixins:[lookinfo,videoDown,beginEnd,glstlist],
  components:{
    // videoTwoStrus
    zkyStructure
  },
  mounted(){

  },
  watch:{
    openinves(val){
      this.dialogVisible = val
      console.log(11111);
    }
  },

  props:{
    openinves:Boolean,
    istwoinves:Boolean, //是否是二次排查  false 表示不是 true 表示是二次排查
  },
  methods:{
    ...mapMutations([
      'setglststrusInfo' //通过一次排查的返回来更改返回值
    ]),
  }

}
</script>


<style scoped>
@import '../../../assets/css/commom.css';
.taskrelation{
  width: 100%;
  height: 6.5rem;
}
.lookleft{
  width: 30%;
  height: 100%;
  float: left;
  border: 1px solid red;
  background-color: rgba(16, 35, 56, 0.5);
  padding: 0 0.1rem;
}
.lookright{
  width: 68%;
  height: 100%;
  margin-left: 32%;
  border: 1px solid blue;
  background-color: rgba(16, 35, 56, 0.5);
}
.toptitle{
  line-height: 0.4rem;
  color: #99c9fa;
  color: #fff;
  font-size: 0.16rem;
}
.toptitle span{
  font-weight: 700;
}
.loollcenter{
  width: 100%;;
  height: calc(100% - 0.4rem);
  border: 1px solid #162E4A;
}
.treecenter{
  width: 100%;
  height: 40%;
  border: 1px solid yellow;
  overflow: auto;
  color: #99c9fa;
  padding: 0 0.1rem;
}
.ptlocl{
  cursor: pointer;
}
.ptlocl > span{
  margin-left: 0.1rem;
}
.ptlocl div{
  margin-left: 0.3rem;
}


.timecenter{
  width: 100%;
  height: 23%;
  border: 1px solid tan;
  margin: 2% 0;
  color: #99c9fa;
}
.timecenter .timeclass{
  padding: 0 0.1rem;
  height: 0.4rem;
}
.timeclass input{
  width: 1.8rem;
  height: 0.3rem;
  padding-left: 0.1rem;
}
.controlcenter{
  width: 100%;
  height: 35%;
  border: 1px solid tan;
}
.controlclass{
 padding-left: 0.3rem;
 color: #99c9fa;
}
.controlclass .controlone{
  float: left;
  height: 0.6rem;
  line-height: 0.5rem;
  width: 1.1rem;
  text-align: right;
  margin-right: 0.1rem;
}
.controlclass .controltwo{
  float: left;
  width: 1rem;
  height: 0.6rem;
}
.el-radio+.el-radio{
  margin: 0;
  margin-top: 0.1rem;
}
.el-checkbox-group{
  margin-left: 0.25rem;
}
.el-checkbox-group .el-checkbox{
  width: 100%;
  display: block;
  margin: 0.05rem 0;
}
.el-checkbox-group .el-checkbox+.el-checkbox{
  margin: 0.05rem 0;
}
.imgcanvas{
  width: 100%;
  height: 3.5rem;
  border: 1px solid yellow;
  position: relative;
}
.imgcanvas img,
.imgcanvas canvas{
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.imgcanvas img{
  width: auto;
  height: 100%;
}
.labelinfo{
  width: 100%;
  height: 2.2rem;
  border: 1px solid tan;
}
.avtive{
  background: url('../../../assets/images/videoNewImg/btnnormal.png') no-repeat center center / 100% 100%;
}
.commBtn{
  display: inline-block;
  width: 0.6rem;
  height: 0.25rem;
  line-height: 0.25rem;
  cursor: pointer;
  font-size: 0.12rem;
  margin-right: 0.1rem;
}
.searchkline .el-button{
  padding: 0 0.1rem;
  border: 1px solid #133045;
}
.showinfo {
  margin-top: 0.1rem;
}
.showinfo p {
  display: inline-block;
  height: 0.35rem;
  width: 32%;
}
.showinfo p > span{
  width:1rem;
  line-height: 0.25rem;
  height: 0.25rem;
  float: left;
  color: #99c9fa;
  text-align: justify;
}
.showinfo p  i{
  width: 100%;
  display: inline-block;
}
.el-select{
  height: 0.25rem;
  width: 1.3rem;
}
.el-select >>> .el-input{
  font-size: 0.12rem;
}
.el-select >>> .el-input__inner{
  height: 0.25rem;
  line-height: 0.25rem;
}
.el-radio{
  display: block;
}



</style>
