<!--
 * @Author: your name
 * @Date: 2020-01-06 15:06:47
 * @LastEditTime : 2021-01-12 11:42:42
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\components\zkyinfo.vue
 -->

<template>
  <div id="zkyinfo" class="zkyinfo" :class="showlookImgPic == true ? 'glstinfoPic' : 'glstinfo'">
      <div v-if="zkytargetinfo.zkytype == 4">
      <p style="font-weight: 700;color:#BE883A">人脸结构化属性</p>
      <p v-show="!$commons.isEmpty(zkytargetinfo.deviceName)" :title="zkytargetinfo.deviceName"><span>点位名称：<i></i></span>{{zkytargetinfo.deviceName}}</p>
      <p><span>目标出现时间：<i></i></span>{{zkytargetinfo.faceObj | lableTime}}</p>
      <p><span>年龄：<i></i></span>{{$commons.isEmpty(zkytargetinfo.faceObj.age) ? '未知' : zkytargetinfo.faceObj.age}}</p>
      <p><span>性别：<i></i></span>{{zkytargetinfo.faceObj.gender == '0' ? '男' : (zkytargetinfo.gender == '1' ? '女' : '未知')}}</p>
      <p><span>是否戴口罩：<i></i></span>{{zkytargetinfo.faceObj.mask == 0 ? '不戴口罩' : '戴口罩'}}</p>
      <p><span>是否戴墨镜：<i></i></span>{{zkytargetinfo.faceObj.sunGlasses == 0 ? '不戴墨镜' : '戴墨镜'}}</p>
      <p><span>是否戴眼镜：<i></i></span>{{zkytargetinfo.faceObj.eyeGlasses == 0 ? '不戴眼镜' : '戴眼镜'}}</p>
    </div>
    <div v-show="zkytargetinfo.zkytype == 1 || zkytargetinfo.facetype == 1" :class="{active:zkytargetinfo.zkytype == 4}">
      <p style="font-weight: 700;color:#BE883A">人员结构化属性</p>
      <p v-show="!$commons.isEmpty(zkytargetinfo.deviceName)" :title="zkytargetinfo.deviceName"><span>点位名称：<i></i></span>{{zkytargetinfo.deviceName}}</p>
      <p><span>目标出现时间：<i></i></span>{{zkytargetinfo | lableTime}}</p>
      <p><span>性别：<i></i></span>{{$commons.isEmpty(zkytargetinfo.sex) ? '未知' : zkytargetinfo.sex }}</p>
      <!-- <p><span>民族：<i></i></span>{{$commons.isEmpty(zkytargetinfo.ethnic) ? '未知' : zkytargetinfo.ethnic }}</p> -->
      <p><span>年龄段：<i></i></span>{{$commons.isEmpty(zkytargetinfo.age) ? '未知' : zkytargetinfo.age }}</p>
      <p><span>发型：<i></i></span>{{$commons.isEmpty(zkytargetinfo.hairStyle) ? '未知' : zkytargetinfo.hairStyle }}</p>
      <p><span>上衣类型：<i></i></span>{{$commons.isEmpty(zkytargetinfo.coatLength) ? '未知' : zkytargetinfo.coatLength}}</p>
      <p><span>上衣颜色：<i></i></span>{{$commons.isEmpty(zkytargetinfo.coatColor) ? '未知' : zkytargetinfo.coatColor }}</p>
      <p><span>上衣纹理：<i></i></span>{{$commons.isEmpty(zkytargetinfo.coatPattern) ? '未知' : zkytargetinfo.coatPattern}}</p>
      <p><span>下衣类型：<i></i></span>{{$commons.isEmpty(zkytargetinfo.trousersStyle) ? '未知' : zkytargetinfo.trousersStyle}}</p>
      <p><span>下衣颜色：<i></i></span>{{$commons.isEmpty(zkytargetinfo.trousersColor) ? '未知' : zkytargetinfo.trousersColor }}</p>
      <!-- <p><span>鞋子类型：<i></i></span>{{$commons.isEmpty(zkytargetinfo.shoesStyle) ? '未知' : zkytargetinfo.shoesStyle }}</p> -->
      <!-- <p><span>鞋子颜色：<i></i></span>{{$commons.isEmpty(zkytargetinfo.shoesColor) ? '未知' : zkytargetinfo.shoesColor }}</p> -->
      <!-- <p><span>头部标志：<i></i></span>{{$commons.isEmpty(zkytargetinfo.headLandMark) ? '未知' : zkytargetinfo.headLandMark }}</p> -->
      <!-- <p><span>附属物品：<i></i></span>{{$commons.isEmpty(zkytargetinfo.accessoryItem) ? '未知' : zkytargetinfo.accessoryItem }}</p> -->
      <p><span>包类型：<i></i></span>{{$commons.isEmpty(zkytargetinfo.packageStyle) ? '未知' : zkytargetinfo.packageStyle }}</p>
    </div>
    <div v-show="zkytargetinfo.zkytype == 2 || zkytargetinfo.facetype == 3">
      <p style="font-weight: 700;color:#BE883A">车辆结构化属性</p>
      <p v-show="!$commons.isEmpty(zkytargetinfo.deviceName)" :title="zkytargetinfo.deviceName"><span>点位名称：<i></i></span>{{zkytargetinfo.deviceName}}</p>
      <p><span>目标出现时间：<i></i></span>{{zkytargetinfo | lableTime}}</p>
      <p><span>车牌号码：<i></i></span> {{$commons.isEmpty(zkytargetinfo.plateNo) ? '未知' : zkytargetinfo.plateNo }}</p>
      <p><span>车牌类型：<i></i></span>{{$commons.isEmpty(zkytargetinfo.plateClass) ? '未知' : zkytargetinfo.plateClass }}</p>
      <!-- <p><span>车牌颜色：<i></i></span>{{$commons.isEmpty(zkytargetinfo.plateColor) ? '未知' : zkytargetinfo.plateColor }}</p> -->
      <!-- <p>车辆角度:{{$commons.isEmpty(zkytargetinfo.vehicleAngle) ? '未知' : zkytargetinfo.vehicleAngle }}</p> -->
      <!-- <p>车辆型号:{{$commons.isEmpty(zkytargetinfo.vehicleClass) ? '未知' : zkytargetinfo.vehicleClass }}</p> -->
      <p><span>车身颜色：<i></i></span>{{$commons.isEmpty(zkytargetinfo.vehicleColor) ? '未知' : zkytargetinfo.vehicleColor }}</p>
      <!-- <p>车辆标志:{{$commons.isEmpty(zkytargetinfo.landMark) ? '未知' : zkytargetinfo.landMark }}</p> -->
      <!-- <p>面部遮挡:{{zkytargetinfo.faceMask == 0 ? '面部遮挡' : '面部未遮挡'}}</p> -->
    </div>
    <div v-show="zkytargetinfo.zkytype == 3 || zkytargetinfo.facetype == 2">
      <p style="font-weight: 700;color:#BE883A">骑车人结构化属性</p>
      <p v-show="!$commons.isEmpty(zkytargetinfo.deviceName)" :title="zkytargetinfo.deviceName"><span>点位名称：<i></i></span>{{zkytargetinfo.deviceName}}</p>
      <p><span>目标出现时间：<i></i></span>{{zkytargetinfo | lableTime}}</p>
      <p><span>性别：<i></i></span>{{$commons.isEmpty(zkytargetinfo.sex) ? '未知' : zkytargetinfo.sex}}</p>
      <p><span>民族：<i></i></span>{{$commons.isEmpty(zkytargetinfo.ethnic) ? '未知' : zkytargetinfo.ethnic}}</p>
      <p><span>年龄段：<i></i></span>{{$commons.isEmpty(zkytargetinfo.age) ? '未知' : zkytargetinfo.age}}</p>
      <p><span>发型：<i></i></span>{{$commons.isEmpty(zkytargetinfo.hairStyle) ? '未知' : zkytargetinfo.hairStyle }}</p>
      <p><span>上衣类型：<i></i></span>{{$commons.isEmpty(zkytargetinfo.coatLength) ? '未知' : zkytargetinfo.coatLength}}</p>
      <p><span>上衣颜色：<i></i></span>{{$commons.isEmpty(zkytargetinfo.coatColor) ? '未知' : zkytargetinfo.coatColor }}</p>
      <p><span>上衣纹理：<i></i></span>{{$commons.isEmpty(zkytargetinfo.coatPattern) ? '未知' : zkytargetinfo.coatPattern}}</p>
      <p><span>下衣类型：<i></i></span>{{$commons.isEmpty(zkytargetinfo.trousersStyle) ? '未知' : zkytargetinfo.trousersStyle}}</p>
      <p><span>下衣颜色：<i></i></span>{{$commons.isEmpty(zkytargetinfo.trousersColor) ? '未知' : zkytargetinfo.trousersColor }}</p>
      <p><span>包类型：<i></i></span>{{$commons.isEmpty(zkytargetinfo.packageStyle) ? '未知' : zkytargetinfo.packageStyle}}</p>
      <p><span>包颜色：<i></i></span>{{$commons.isEmpty(zkytargetinfo.packageColor) ? '未知' : zkytargetinfo.packageColor}}</p>
      <p><span>车颜色：<i></i></span>{{$commons.isEmpty(zkytargetinfo.vehicleColor) ? '未知' : zkytargetinfo.vehicleColor }}</p>
      <p><span>是否打伞：<i></i></span>{{$commons.isEmpty(zkytargetinfo.umbrella) ? '未知' : zkytargetinfo.umbrella}}</p>
      <!-- <p>违法载人:{{$commons.isEmpty(zkytargetinfo.manned) ? '未知' : zkytargetinfo.manned }}</p> -->
      <p><span>是否携物：<i></i></span>{{$commons.isEmpty(zkytargetinfo.accessoryItem) ? '未知' : zkytargetinfo.accessoryItem}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions,mapMutations, mapState,mapGetters } from 'vuex'  //引入vuex
export default {
  data() {
    return {
    };
  },
  computed:{
    ...mapGetters([
      'showzkyinfo',  //是否显示信息
      'zkytargetinfo',  //结构化信息
      'showlookImgPic', // 查看大图
    ])
  },
  mounted(){
    this.glstSwitch = sessionStorage.getItem('glstStructureSwitch');
    this.zkySwitch = sessionStorage.getItem('zkyStructureSwitch');
  },
  methods: {
  },
  filters:{
    lableTime(val){
      if(val.absoluteTime){
        return val.absoluteTime
      }else{
        let nowplaytime = new Date(val.startTime).getTime();
        let alltime = Number(nowplaytime) + Number(val.appearTime) + (val.offset * 1000) // 开始时间+相对时间+设备时间
        let date = new Date(alltime)
        let YY = date.getFullYear();
        let MM = (date.getMonth() + 1) < 10 ? '0'+ (date.getMonth() + 1) : (date.getMonth() + 1);
        let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let mi = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mi + ':' + ss;
      }
    }
  }
};
</script>

<style scoped>
.zkyinfo {
  width: 2.6rem;
  font-size: 0.14rem;
  color: #99c9fa;
  border-radius: 5px;
  padding: 0.1rem;
  background-color: rgba(8, 28, 49, 0.9);
  border: 1px solid rgba(21, 48, 78, 0.9);
  position: absolute;
  z-index: 9999;
}
.zkyinfo p {
  display: inline-block;
  height: 0.2rem;
  width: 100%;
}
.zkyinfo p > span{
  width:1rem;
  line-height: 0.18rem;
  height: 0.2rem;
  float: left;
  color: #99c9fa;
  text-align: justify;
}
.zkyinfo p  i{
  width: 100%;
  display: inline-block;
}
.showInfo div p{
  width: 2.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.glstinfoPic{
  width: 4rem;
  height: 100%;
}
.glstinfoPic div p{
  width: 100%;
  height: 50px;
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
}
.active {
    height: 550px;
    width: 371px;
    overflow-y: auto;
}


@media (max-width:1440px){
    .zkyinfo{
        width: 3rem;
    }
    .zkyinfo p > span{
        width: 1.2rem;
    }
    .glstinfoPic{
        width: 3.85rem;
        overflow: auto;
    }
}
</style>
