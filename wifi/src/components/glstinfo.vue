
<template>
  <div id="glstinfo" class="glstinfo" :class="showlookImgPic == true ? 'glstinfoPic' : 'glstinfo'">
    <div v-show="glstargetinfo.glsttype == 1">
      <p style="font-weight: 700;color:#BE883A">结构化属性</p>
      <p v-show="!$commons.isEmpty(glstargetinfo.deviceName)" :title="glstargetinfo.deviceName"><span>点位名称：<i></i></span>{{glstargetinfo.deviceName}}</p>
      <p><span>目标出现时间：<i></i></span>{{glstargetinfo | lableTime}}</p>
      <p><span>上衣款式：<i></i></span>{{$commons.isEmpty(glstargetinfo.coatLength) ? '未知' : glstargetinfo.coatLength}}</p>
      <p><span>上衣纹理：<i></i></span>{{$commons.isEmpty(glstargetinfo.coatPattern) ? '未知' : glstargetinfo.coatPattern  }}</p>
      <p><span>上衣颜色：<i></i></span>{{$commons.isEmpty(glstargetinfo.coatColor) ? '未知' : glstargetinfo.coatColor }}</p>
      <p><span>下衣款式：<i></i></span>{{$commons.isEmpty(glstargetinfo.trousersStyle) ? '未知' : glstargetinfo.trousersStyle}}</p>
      <p><span>下衣颜色：<i></i></span>{{$commons.isEmpty(glstargetinfo.trousersColor) ? '未知' : glstargetinfo.trousersColor }}</p>
      <p><span>鞋子款式：<i></i></span>{{$commons.isEmpty(glstargetinfo.shoesStyle) ? '未知' : glstargetinfo.shoesStyle }}</p>
      <p><span>鞋子颜色：<i></i></span>{{$commons.isEmpty(glstargetinfo.shoesColor) ? '未知' : glstargetinfo.shoesColor }}</p>
      <p><span>性别：<i></i></span>{{$commons.isEmpty(glstargetinfo.sex) ? '未知' : glstargetinfo.sex }}</p>
      <!-- <p>民族:{{$commons.isEmpty(glstargetinfo.ethnic) ? '未知' : glstargetinfo.ethnic }}</p> -->
      <p><span>头部标志：<i></i></span>{{$commons.isEmpty(glstargetinfo.headLandMark) ? '未知' : glstargetinfo.headLandMark }}</p>
      <p><span>附属物品：<i></i></span>{{$commons.isEmpty(glstargetinfo.accessoryItem) ? '未知' : glstargetinfo.accessoryItem }}</p>
      <p><span>发型：<i></i></span>{{$commons.isEmpty(glstargetinfo.hairStyle) ? '未知' : glstargetinfo.hairStyle }}</p>
      <p><span>年龄：<i></i></span>{{$commons.isEmpty(glstargetinfo.age) ? '未知' : glstargetinfo.age }}</p>
      <p><span>包款式：<i></i></span>{{$commons.isEmpty(glstargetinfo.packageStyle) ? '未知' : glstargetinfo.packageStyle }}</p>
    </div>
     <div v-show="glstargetinfo.glsttype == 2">
      <p style="font-weight: 700;color:#BE883A">结构化属性</p>
      <p v-show="!$commons.isEmpty(glstargetinfo.deviceName)" :title="glstargetinfo.deviceName"><span>点位名称：<i></i></span>{{glstargetinfo.deviceName}}</p>
      <p><span>目标出现时间：<i></i></span>{{glstargetinfo | lableTime}}</p>
      <p><span>车辆角度：<i></i></span>{{$commons.isEmpty(glstargetinfo.vehicleAngle) ? '未知' : glstargetinfo.vehicleAngle }}</p>
      <p><span>车辆型号：<i></i></span>{{$commons.isEmpty(glstargetinfo.vehicleClass) ? '未知' : glstargetinfo.vehicleClass }}</p>
      <p><span>车辆颜色：<i></i></span>{{$commons.isEmpty(glstargetinfo.vehicleColor) ? '未知' : glstargetinfo.vehicleColor }}</p>
      <p><span>车辆标志：<i></i></span>{{$commons.isEmpty(glstargetinfo.landMark) ? '未知' : glstargetinfo.landMark }}</p>
      <p><span>面部遮挡：<i></i></span>{{glstargetinfo.faceMask == 0 ? '面部遮挡' : '面部未遮挡'}}</p>
      <p><span>车牌颜色：<i></i></span>{{$commons.isEmpty(glstargetinfo.plateColor) ? '未知' : glstargetinfo.plateColor }}</p>
      <p><span>车牌类型：<i></i></span>{{$commons.isEmpty(glstargetinfo.plateClass) ? '未知' : glstargetinfo.plateClass }}</p>

      <p><span>特殊车辆：<i></i></span>{{$commons.isEmpty(glstargetinfo.specialVehicles) ? '未知' : glstargetinfo.specialVehicles}}</p>
      <p><span>车后盖：<i></i></span>{{$commons.isEmpty(glstargetinfo.vehicleBack) ? '未知' : glstargetinfo.vehicleBack}}</p>
      <p><span>车身破损：<i></i></span>{{$commons.isEmpty(glstargetinfo.bodyBreakage) ? '未知' : glstargetinfo.bodyBreakage}}</p>
      <p><span>车顶物件：<i></i></span>{{$commons.isEmpty(glstargetinfo.roofGoods) ? '未知' : glstargetinfo.roofGoods}}</p>
      <p><span>车牌遮挡：<i></i></span>{{$commons.isEmpty(glstargetinfo.plateOcclusion) ? '未知' : glstargetinfo.plateOcclusion}}</p>
      <p><span>车身红绳：<i></i></span>{{$commons.isEmpty(glstargetinfo.bodyRed) ? '未知' : glstargetinfo.bodyRed}}</p>
    </div>
    <div v-show="glstargetinfo.glsttype == 3">
      <p style="font-weight: 700;color:#BE883A">结构化属性</p>
      <p v-show="!$commons.isEmpty(glstargetinfo.deviceName)" :title="glstargetinfo.deviceName"><span>点位名称：<i></i></span>{{glstargetinfo.deviceName}}</p>
      <p><span>目标出现时间：<i></i></span>{{glstargetinfo | lableTime}}</p>
      <p><span>头部标志：<i></i></span>{{$commons.isEmpty(glstargetinfo.headLandMark) ? '未知' : glstargetinfo.headLandMark }}</p>
      <p><span>车型：<i></i></span>{{$commons.isEmpty(glstargetinfo.vehicleClass) ? '未知' : glstargetinfo.vehicleClass }}</p>
      <p><span>车辆角度：<i></i></span>{{$commons.isEmpty(glstargetinfo.vehicleAngle) ? '未知' : glstargetinfo.vehicleAngle }}</p>
      <p><span>骑车人性别：<i></i></span>{{$commons.isEmpty(glstargetinfo.sex) ? '未知' : glstargetinfo.sex }}</p>
      <!-- <p>骑车人民族:{{$commons.isEmpty(glstargetinfo.ethnic) ? '未知' : glstargetinfo.ethnic }}</p> -->
      <p><span>骑车人包类型：<i></i></span>{{$commons.isEmpty(glstargetinfo.backpackClass) ? '未知' : glstargetinfo.backpackClass }}</p>
      <p><span>上衣颜色：<i></i></span>{{$commons.isEmpty(glstargetinfo.coatColor) ? '未知' : glstargetinfo.coatColor }}</p>
      <p><span>上衣图案：<i></i></span>{{$commons.isEmpty(glstargetinfo.coatPattern) ? '未知' : glstargetinfo.coatPattern }}</p>
      <p><span>车身颜色：<i></i></span>{{$commons.isEmpty(glstargetinfo.vehicleColor) ? '未知' : glstargetinfo.vehicleColor }}</p>
      <p><span>违法载人：<i></i></span>{{$commons.isEmpty(glstargetinfo.manned) ? '未知' : glstargetinfo.manned }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions,mapMutations, mapState,mapGetters } from 'vuex'  //引入vuex
export default {
  data() {
    return {};
  },
  computed:{
    ...mapGetters([
      'showglstinfo',  //是否显示信息
      'glstargetinfo',  //结构化信息
      'showlookImgPic', // 查看大图
    ])
  },

  methods: {
  },
  filters:{
    lableTime(val){
      if(val.absoluteTime){
        return val.absoluteTime
      }else{
        let nowplaytime = new Date(val.fileStartTime).getTime();
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
.glstinfo {
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
.glstinfo p {
  display: inline-block;
  height: 0.2rem;
  width: 100%;
}
.glstinfo p > span{
  width:1rem;
  line-height: 0.18rem;
  height: 0.2rem;
  float: left;
  color: #99c9fa;
  text-align: justify;
}
.glstinfo p  i{
  width: 100%;
  display: inline-block;
}
.glstinfoPic{
  width: 4rem;
  height: 100%;
}
.glstinfoPic div p{
  width: 2.2rem;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.showInfo div p{
  width: 2.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
