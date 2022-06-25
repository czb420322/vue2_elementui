<!--
 * @Author: chenxf
 * @Date: 2020-05-17 16:47:05
 * @LastEditTime : 2021-04-21 15:11:30
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\components\zkystructure.vue
 * @
 -->
<template>
   <div class="labelinfo">
    <p class="toptitle"><span>|</span>&nbsp;属性过滤</p>
    <div class="searchkline">
      <el-button :disabled="zkyperson" v-show="iszkyStrucTable == 1"  :class="{avtive: iszkyStrucTable == 1}" @click="getpersonInfo" class="commBtn addBtn">行人</el-button>
      <el-button :disabled="zkycar" v-show="iszkyStrucTable == 2" :class="{avtive: iszkyStrucTable == 2}" @click="getcarInfo" class="commBtn addBtn">车辆</el-button>
      <el-button :disabled="zkybic" v-show="iszkyStrucTable == 3" :class="{avtive: iszkyStrucTable == 3}" @click="getbicInfo" class="commBtn addBtn">骑车人</el-button>
    </div>
    <div class="showinfo" v-show="iszkyStrucTable == 1">
      <p>
        <span>性别：<i></i></span>
        <el-select :disabled="issex" @visible-change="getpropers(1,'sex')" v-model="sex">
            <el-option label value></el-option>
          <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <!-- <p>
        <span>民族：<i></i></span>
        <el-select :disabled="isethnic" @visible-change="getpropers(1,'ethnic')" v-model="ethnic">
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p> -->
      <p>
        <span>年龄段：<i></i></span>
        <el-select :disabled="isage" @visible-change="getpropers(1,'age')" v-model="age">
            <el-option label value></el-option>
          <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>发型：<i></i></span>
        <el-select :disabled="ishairStyle" @visible-change="getpropers(1,'hairStyle')" v-model="hairStyle">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>上衣类型：<i></i></span>
        <el-select :disabled="iscoatLength" @visible-change="getpropers(1,'coatLength')" v-model="coatLength">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>上衣颜色：<i></i></span>
        <el-select :disabled="iscoatColor" @visible-change="getpropers(1,'coatColor')" v-model="coatColor">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>上衣纹理：<i></i></span>
        <el-select :disabled="iscoatPattern" @visible-change="getpropers(1,'coatPattern')" v-model="coatPattern">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>下衣类型：<i></i></span>
        <el-select :disabled="istrousersStyle" @visible-change="getpropers(1,'trousersStyle')" v-model="trousersStyle">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>下衣颜色：<i></i></span>
        <el-select :disabled="istrousersColor" @visible-change="getpropers(1,'trousersColor')" v-model="trousersColor">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <!-- <p>
        <span>鞋子类型：<i></i></span>
        <el-select :disabled="isshoesStyle" @visible-change="getpropers(1,'shoesStyle')" v-model="shoesStyle">
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>鞋子颜色：<i></i></span>
        <el-select :disabled="isshoesColor" @visible-change="getpropers(1,'shoesColor')" v-model="shoesColor">
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p> -->
      <p>
        <span>包类型：<i></i></span>
        <el-select :disabled="ispackageStyle" @visible-change="getpropers(1,'packageStyle')" v-model="packageStyle">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
    </div>
    <div class="showinfo" v-show="iszkyStrucTable == 2">
      <!-- <p>
        <span>车辆角度：<i></i></span>
        <el-select @visible-change="getpropers(1,3)" v-model="vehicleAngle">
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>车型：<i></i></span>
        <el-select @visible-change="getpropers(1,34)" v-model="vehicleClass">
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p> -->
      <!-- <p>
        <span>标志物：<i></i></span>
        <el-select @visible-change="getpropers(1,57)" v-model="landMark">
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p> -->
      <!-- <p>
        <span>面部遮挡：<i></i></span>
        <el-select v-model="faceMask">
          <el-option  label="遮挡" value="0" key="0"></el-option>
          <el-option  label="未遮挡" value="1" key="1"></el-option>
        </el-select>
      </p> -->
      <p>
        <span>车牌号码：<i></i></span>
        <input type="text" :disabled="isplateNo" class="plant"  v-model="plateNo">
        <!-- <el-input v-model="plateNo"></el-input> -->
        <!-- <el-select >
          <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select> -->
      </p>
      <p>
        <span>车牌类型：<i></i></span>
        <el-select :disabled="isplateClass" @visible-change="getpropers(2,'plateClass')" v-model="plateClass">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <!-- <p>
        <span>车牌颜色：<i></i></span>
        <el-select :disabled="isplateColor" @visible-change="getpropers(2,'plateColor')" v-model="plateColor">
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p> -->
      <p>
        <span>车身颜色：<i></i></span>
        <el-select :disabled="isvehicleColor" @visible-change="getpropers(2,'vehicleColor')" v-model="vehicleColor">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
    </div>
    <div class="showinfo" v-show="iszkyStrucTable == 3">
       <p>
        <span>性别：<i></i></span>
        <el-select :disabled="issex" @visible-change="getpropers(3,'sex')" v-model="sex">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>民族：<i></i></span>
        <el-select :disabled="isethnic" @visible-change="getpropers(3,'ethnic')" v-model="ethnic">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>年龄段：<i></i></span>
        <el-select :disabled="isage" @visible-change="getpropers(3,'age')" v-model="age">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>发型：<i></i></span>
        <el-select :disabled="ishairStyle" @visible-change="getpropers(3,'hairStyle')" v-model="hairStyle">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <!-- <p>
        <span>车型：<i></i></span>
        <el-select @visible-change="getpropers(2,4)" v-model="vehicleClass">
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p> -->
      <!-- <p>
        <span>车辆角度：<i></i></span>
        <el-select @visible-change="getpropers(2,1)" v-model="vehicleAngle">
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p> -->
      <p>
        <span>上衣类型：<i></i></span>
        <el-select :disabled="iscoatLength" @visible-change="getpropers(3,'coatLength')" v-model="coatLength">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>上衣颜色：<i></i></span>
        <el-select :disabled="iscoatColor" @visible-change="getpropers(3,'coatColor')" v-model="coatColor">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>上衣纹理：<i></i></span>
        <el-select :disabled="iscoatPattern" @visible-change="getpropers(3,'coatPattern')" v-model="coatPattern">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>下衣类型：<i></i></span>
        <el-select :disabled="istrousersStyle" @visible-change="getpropers(3,'trousersStyle')" v-model="trousersStyle">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>下衣颜色：<i></i></span>
        <el-select :disabled="istrousersColor" @visible-change="getpropers(3,'trousersColor')" v-model="trousersColor">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>包类型：<i></i></span>
        <el-select :disabled="ispackageStyle" @visible-change="getpropers(3,'packageStyle')" v-model="packageStyle">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>包颜色：<i></i></span>
        <el-select :disabled="ispackageColor" @visible-change="getpropers(3,'packageColor')" v-model="packageColor">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>车颜色：<i></i></span>
        <el-select :disabled="isvehicleColor"  @visible-change="getpropers(3,'vehicleColor')" v-model="vehicleColor">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>是否打伞：<i></i></span>
        <el-select :disabled="isumbrella" @visible-change="getpropers(3,'umbrella')" v-model="umbrella">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <p>
        <span>是否携物：<i></i></span>
        <el-select :disabled="isaccessoryItem" @visible-change="getpropers(3,'accessoryItem')" v-model="accessoryItem">
            <el-option label value></el-option>
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p>
      <!-- <p>
        <span>违法载人：<i></i></span>
        <el-select @visible-change="getpropers(2,9)" v-model="manned">
           <el-option v-for="item in propertyList" :key="item.valueString" :value="item.valueString" :label="item.value"></el-option>
        </el-select>
      </p> -->
    </div>
  </div>
</template>
<script>
import getzkyinfo from '../../../api/realvideo/getzkyinfo.js'
import { mapActions,mapMutations, mapState,mapGetters } from 'vuex'  //引入vuex
  export default{
    data(){
      return{
        zkyperson:false,  //当前禁用行人模块
        zkycar:false,  //当前禁用车 模块
        zkybic:false,  //当前禁用骑车人模块
        propertyList:[], //属性列表
        // 人的12种
        coatLength: '', //上衣款式
        coatPattern: '', //上衣图案
        coatColor: '', //上身颜色
        trousersStyle: '', //下身类别
        trousersColor: '', //下身颜色
        shoesStyle: '', //鞋子款式
        shoesColor: '', //鞋子颜色
        sex: '', //性别
        ethnic: '', //民族
        hairStyle: '', //发型
        age: '', //年龄
        packageStyle: '', //包款式

        // 车的7种
        vehicleAngle: '', // 车辆角度
        vehicleClass: '', // 车型
        vehicleColor: '', // 车辆颜色
        landMark: '', //标志物
        faceMask: '', //面部遮挡
        plateColor: '', // 车牌颜色
        plateClass: '', // 车牌类型
        plateNo: '', // 车牌号码
        packageColor: '', // 包颜色

        // 人的10种
        manned: '', // 违法载人
        umbrella:'',//是否打伞
        accessoryItem:'',//是否携物
        issex:false,  //性别禁用                  //人骑车人共用
        isethnic:false,  //民族禁用               //人骑车人共用
        isage:false,  //年龄禁用
        ishairStyle:false,  //发型禁用
        iscoatLength:false,  //上衣款式禁用
        iscoatColor:false,  //上衣颜色禁用     //人骑车人共用
        iscoatPattern:false,  //上衣纹理禁用    //人骑车人共用
        istrousersStyle:false,  //下衣类别禁用
        istrousersColor:false,  //下衣颜色禁用
        isshoesStyle:false,  //鞋子款式禁用
        isshoesColor:false,  //鞋子颜色禁用
        ispackageStyle:false,  //包款式禁用
        // 车的属性  7种
        isplateNo:false, // 车牌号码
        isplateClass:false,  //车牌类型禁用
        isplateColor:false,  //车牌颜色禁用
        isvehicleColor:false,  //车辆颜色禁用     //车和骑车人共用
        // 骑车人属性  10种
        isbackpackClass:false,  //骑车人包类型禁用
        ispackageColor:false,  //包颜色
        isumbrella:false, // 车颜色
        isaccessoryItem:false,// 是否携物
      }
    },
    mounted(){
    },
    computed: {
      ...mapGetters([
        'iszkyStrucTable',
        'glststrusInfo'
      ]),
    },
    methods:{
      ...mapMutations([
        'setiszkyStrucTable'
      ]),
      //type表示类型 1：行人，2：机动车，3：骑车人，4：车牌属性，5：人脸属性'
      //id 表示类型中对应ID
      getpropers(type,id){
        let data = {
          attributeType:type,
          attributeId:id
        }
        this.$http.get('vsas/structure/getDictionaryZkyList',{params:data}).then(res=>{
          if(res.data.code == 200){
            this.propertyList = res.data.data
            console.log(this.propertyList,33333333333);
          }
        })
      },
      //得到人的信息
      getpersonInfo(){
        if(this.zkyperson || this.zkycar || this.zkybic){
          this.iszkyStrucTable = 1
          return
        }
        this.clearporpe()
        this.setiszkyStrucTable(1)
      },
      //得到车的信息
      getcarInfo(){
        if(this.zkyperson || this.zkycar || this.zkybic){
          this.iszkyStrucTable = 2
          return
        }
        this.clearporpe()
        this.setiszkyStrucTable(2)
      },
      //得到骑车人的信息
      getbicInfo(){
        if(this.zkyperson || this.zkycar || this.zkybic){
          this.iszkyStrucTable = 3
          return
        }
        this.clearporpe()
        this.setiszkyStrucTable(3)
      },
      zkyField(){
        console.log(this.glststrusInfo,8888888888);
        if(this.iszkyStrucTable == 1){
          this.zkyperson = false
          this.zkycar = true
          this.zkybic = true
          this.sex = this.glststrusInfo.personZky.sex;  //性别                  //人骑车人共用
          // this.ethnic = this.glststrusInfo.personZky.ethnic;  //民族               //人骑车人共用
          this.age = this.glststrusInfo.personZky.age;  //年龄
          this.hairStyle = this.glststrusInfo.personZky.hairStyle;  //发型
          this.coatLength = this.glststrusInfo.personZky.coatLength;  //上衣款式
          this.coatColor = this.glststrusInfo.personZky.coatColor;  //上衣颜色        //人骑车人共用
          this.coatPattern = this.glststrusInfo.personZky.coatPattern;  //上衣纹理      //人骑车人共用
          this.trousersStyle = this.glststrusInfo.personZky.trousersStyle;  //下衣类别
          this.trousersColor = this.glststrusInfo.personZky.trousersColor;  //下衣颜色
          // this.shoesStyle = this.glststrusInfo.personZky.shoesStyle;  //鞋子款式
          // this.shoesColor = this.glststrusInfo.personZky.shoesColor;  //鞋子颜色
          this.packageStyle = this.glststrusInfo.personZky.packageStyle;  //包款式
          this.$commons.isEmpty(this.glststrusInfo.personZky.sex) ? this.issex = false : this.issex = true
          // this.$commons.isEmpty(this.glststrusInfo.personZky.ethnic) ? this.isethnic = false : this.isethnic = true
          this.$commons.isEmpty(this.glststrusInfo.personZky.age) ? this.isage = false : this.isage = true
          this.$commons.isEmpty(this.glststrusInfo.personZky.hairStyle) ? this.ishairStyle= false : this.ishairStyle= true
          this.$commons.isEmpty(this.glststrusInfo.personZky.coatLength) ? this.iscoatLength = false : this.iscoatLength = true
          this.$commons.isEmpty(this.glststrusInfo.personZky.coatColor) ? this.iscoatColor = false : this.iscoatColor = true
          this.$commons.isEmpty(this.glststrusInfo.personZky.coatPattern) ? this.iscoatPattern = false : this.iscoatPattern = true
          this.$commons.isEmpty(this.glststrusInfo.personZky.trousersStyle) ? this.istrousersStyle = false : this.istrousersStyle = true
          this.$commons.isEmpty(this.glststrusInfo.personZky.trousersColor) ? this.istrousersColor = false : this.istrousersColor = true
          // this.$commons.isEmpty(this.glststrusInfo.personZky.shoesStyle) ? this.isshoesStyle = false : this.isshoesStyle = true
          // this.$commons.isEmpty(this.glststrusInfo.personZky.shoesColor) ? this.isshoesColor = false : this.isshoesColor = true
          this.$commons.isEmpty(this.glststrusInfo.personZky.packageStyle) ? this.ispackageStyle = false : this.ispackageStyle = true
        } else if(this.iszkyStrucTable == 2){
          this.zkyperson = true
          this.zkycar = false
          this.zkybic = true
          this.plateNo = this.glststrusInfo.motorVehicleZky.plateNo;  //车牌号码
          this.plateClass = this.glststrusInfo.motorVehicleZky.plateClass;  //车牌类型
          this.plateColor = this.glststrusInfo.motorVehicleZky.plateColor;  //车牌颜色
          this.vehicleColor = this.glststrusInfo.motorVehicleZky.vehicleColor;  //车辆颜色     //车和骑车人共用
          // this.vehicleAngle = this.glststrusInfo.motorVehicleZky.vehicleAngle;  //车辆角度     //车和骑车人共用
          this.vehicleClass = this.glststrusInfo.motorVehicleZky.vehicleClass;  //车辆型号     //车和骑车人共用
          this.$commons.isEmpty(this.glststrusInfo.motorVehicleZky.plateNo) ? this.isplateNo = false : this.isplateNo = true
          this.$commons.isEmpty(this.glststrusInfo.motorVehicleZky.plateClass) ? this.isplateClass = false : this.isplateClass = true
          this.$commons.isEmpty(this.glststrusInfo.motorVehicleZky.plateColor) ? this.isplateColor = false : this.isplateColor = true
          this.$commons.isEmpty(this.glststrusInfo.motorVehicleZky.vehicleColor) ? this.isvehicleAngle = false : this.isvehicleColor = true
          this.$commons.isEmpty(this.glststrusInfo.motorVehicleZky.vehicleClass) ? this.isvehicleClass = false : this.isvehicleClass = true
        } else if(this.iszkyStrucTable == 3){
          this.zkyperson = true
          this.zkycar = true
          this.zkybic = false
          this.sex = this.glststrusInfo.bicycleZky.sex;  //骑车人性别
          this.ethnic = this.glststrusInfo.bicycleZky.ethnic;  //骑车人民族
          this.age = this.glststrusInfo.bicycleZky.age;  //年龄
          this.hairStyle = this.glststrusInfo.bicycleZky.hairStyle;  //发型
          this.coatLength = this.glststrusInfo.bicycleZky.coatLength;  //上衣款式
          this.coatColor = this.glststrusInfo.bicycleZky.coatColor;  //上衣颜色        //人骑车人共用
          this.coatPattern = this.glststrusInfo.bicycleZky.coatPattern;  //上衣纹理
          this.trousersStyle = this.glststrusInfo.bicycleZky.trousersStyle;  //下衣类别
          this.trousersColor = this.glststrusInfo.bicycleZky.trousersColor;  //下衣颜色
          this.packageStyle = this.glststrusInfo.bicycleZky.packageStyle;  //骑车人包类型
          this.packageColor = this.glststrusInfo.bicycleZky.packageColor; // 包颜色
          this.vehicleColor = this.glststrusInfo.bicycleZky.vehicleColor;  //车身颜色
          this.umbrella =  this.glststrusInfo.bicycleZky.umbrella;// 是否打伞
          this.accessoryItem = this.accessoryItem // 是否携物
          this.$commons.isEmpty(this.glststrusInfo.bicycleZky.sex) ? this.issex = false : this.issex = true
          this.$commons.isEmpty(this.glststrusInfo.bicycleZky.ethnic) ? this.isethnic = false : this.isethnic = true
          this.$commons.isEmpty(this.glststrusInfo.bicycleZky.age) ? this.isage = false : this.isage = true
          this.$commons.isEmpty(this.glststrusInfo.bicycleZky.hairStyle) ? this.ishairStyle = false : this.ishairStyle = true
          this.$commons.isEmpty(this.glststrusInfo.bicycleZky.coatLength) ? this.iscoatLength = false : this.iscoatLength = true
          this.$commons.isEmpty(this.glststrusInfo.bicycleZky.coatColor) ? this.iscoatColor = false : this.iscoatColor = true
          this.$commons.isEmpty(this.glststrusInfo.bicycleZky.coatPattern) ? this.iscoatPattern = false : this.iscoatPattern = true
          this.$commons.isEmpty(this.glststrusInfo.bicycleZky.trousersStyle) ? this.istrousersStyle = false : this.istrousersStyle = true
          this.$commons.isEmpty(this.glststrusInfo.bicycleZky.trousersColor) ? this.istrousersColor = false : this.istrousersColor = true
          this.$commons.isEmpty(this.glststrusInfo.bicycleZky.packageStyle) ? this.ispackageStyle = false : this.ispackageStyle = true
          this.$commons.isEmpty(this.glststrusInfo.bicycleZky.packageColor) ? this.ispackageColor = false : this.ispackageColor = true
          this.$commons.isEmpty(this.glststrusInfo.bicycleZky.vehicleColor) ? this.isvehicleColor = false : this.isvehicleColor = true
          this.$commons.isEmpty(this.glststrusInfo.bicycleZky.umbrella) ? this.isumbrella = false : this.isumbrella = true
          this.$commons.isEmpty(this.glststrusInfo.bicycleZky.accessoryItem) ? this.isaccessoryItem = false : this.isaccessoryItem = true
        }
      },
      // 返回中科院结构化信息
      getzky(){
        let data = {}
        if(this.iszkyStrucTable == 1){
          data = {
            sex:this.sex,  //性别  //人骑车人共用
            ethnic:this.ethnic,  //民族  //人骑车人共用
            age:this.age,  //年龄
            hairStyle:this.hairStyle,  //发型
            coatLength:this.coatLength,  //上衣款式
            coatColor:this.coatColor,  //上衣颜色        //人骑车人共用
            coatPattern:this.coatPattern,  //上衣纹理
            trousersStyle:this.trousersStyle,  //下衣类别
            trousersColor:this.trousersColor,  //下衣颜色
            shoesStyle:this.shoesStyle,  //鞋子款式
            shoesColor:this.shoesColor,  //鞋子颜色
            packageStyle:this.packageStyle,  //包款式
          }
        }else if(this.iszkyStrucTable == 2){
          data = {
            plateNo:this.plateNo,
            plateClass:this.plateClass,  //车牌类型
            plateColor:this.plateColor,  //车牌颜色
            vehicleColor:this.vehicleColor,  //车辆颜色     //车和骑车人共用
            // vehicleAngle:this.vehicleAngle,  //车辆角度     //车和骑车人共用
            // vehicleClass:this.vehicleClass,  //车辆型号     //车和骑车人共用
            // landMark:this.landMark,  //车辆标识
            // faceMask:this.faceMask,  //面部遮挡        0：遮挡，1：为遮挡
          }
        }else if(this.iszkyStrucTable == 3){
          data = {
            sex:this.sex,  //骑车人性别
            ethnic:this.ethnic,  //骑车人民族
            age:this.age,  //年龄
            hairStyle:this.hairStyle,  //发型
            coatLength:this.coatLength,  //上衣款式
            coatColor:this.coatColor,  //上衣颜色
            coatPattern:this.coatPattern,  //上衣纹理
            trousersStyle:this.trousersStyle,  //下衣类别
            trousersColor:this.trousersColor,  //下衣颜色
            packageStyle:this.packageStyle,  //包款式
            packageColor:this.packageColor, // 包颜色
            vehicleColor:this.vehicleColor,  //车身颜色
            umbrella: this.umbrella, // 是否打伞
            accessoryItem: this.accessoryItem // 是否携物
            // manned:this.manned,      //违法载人
            // vehicleClass:this.vehicleClass,  //车型
            // headLandMark:this.headLandMark,  //头部标识物
            // vehicleAngle:this.vehicleAngle,  //车辆角度
          }
        }
        this.$emit('zkytab',this.iszkyStrucTable)
        return data
      },
       //切换人车骑车人属性的时候切换清空glst所有的字段
      clearporpe(){
        this.sex = '';  //性别
        this.ethnic = '';  //民族
        this.age = '';  //年龄
        this.hairStyle = '';  //发型
        this.coatLength = '';  //上衣款式
        this.coatPattern = '';  //上衣纹理
        this.coatColor = '';  //上衣颜色        //人骑车人共用
        this.trousersStyle = '';  //下衣类别
        this.trousersColor = '';  //下衣颜色
        this.shoesStyle = '';  //鞋子款式
        this.shoesColor = '';  //鞋子颜色
        this.packageStyle = '';  //包款式
        // 车的属性  7种
        // this.vehicleAngle = '';  //车辆角度     //车和骑车人共用
        // this.vehicleClass = '';  //车辆型号     //车和骑车人共用
        this.vehicleColor = '';  //车辆颜色     //车和骑车人共用
        // this.landMark = '';  //车辆标识
        // this.faceMask = '';  //面部遮挡        0：遮挡，1：为遮挡
        this.plateColor = '';  //车牌颜色
        this.plateClass = '';  //车牌类型
        this.plateNo = ''
        // 骑车人属性  10种  跟人和车共7种字段
        this.backpackClass = '';  //骑车人包类型
        this.coatPattern = '';  //上衣纹理
        this.manned = '';      //违法载人
        this.packageColor = '';
        this.umbrella = '',//是否打伞
        this.accessoryItem = ''//是否携物
      }
    }
  }
</script>
<style scoped>
@import '../../../assets/css/commom.css';
.labelinfo{
  width: 100%;
  height: 2.5rem;
  border: 1px solid #162E4A;
  margin-top: 0.1rem;
  /* padding: 0 0.1rem; */
  /* border: 1px solid tan; */
}
.labelinfo .searchkline{
  padding:  0 0.1rem;
}
.searchkline .el-button{
  padding: 0 0.1rem;
  border: 1px solid #133045;
}
.toptitle{
  line-height: 0.4rem;
  color: #99c9fa;
  color: #fff;
  font-size: 0.16rem;
  padding-left: 0.1rem;
}
.toptitle span{
  font-weight: 700;
}
.showinfo {
  margin-top: 0.1rem;
  padding: 0 0.1rem;
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
.commBtn{
  display: inline-block;
  width: 0.6rem;
  height: 0.25rem;
  line-height: 0.25rem;
  cursor: pointer;
  font-size: 0.12rem;
  margin-right: 0.1rem;
}
.el-select{
  height: 0.25rem;
  width: 1.3rem;
}
.el-select .el-input,
.el-select /deep/ .el-input{
  font-size: 0.12rem;
}
.el-select .el-input__inner,
.el-select /deep/ .el-input__inner{
  height: 0.25rem !important;
  line-height: 0.25rem;
}
.plant{
  height: 0.25rem;
  width: 1.3rem;
  height: 0.25rem !important;
  line-height: 0.25rem!important;
}
.avtive{
  border-radius: 5px 0 5px 5px;
  background: #3D82A6 url('../../../assets/images/videoNewImg/btnnormal.png') no-repeat center center / 100% 100%;
}
</style>


