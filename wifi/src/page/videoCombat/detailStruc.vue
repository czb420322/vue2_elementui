<!--
 * @Author: your name
 * @Date: 2019-12-06 10:43:56
 * @LastEditTime : 2020-11-02 14:49:12
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\videoCombat\detailStruc.vue
 -->
<template>
 <div class="semantic">
    <div class="topInfo">
         <router-link class="sysname" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查</router-link>
        <p class="childname">结构化任务详情</p>
    </div>
    <div class="searchmain">
      <div class="left">
        <p class="firstp"><span>|</span>&nbsp;&nbsp;条件查询</p>
        <p class="twop">搜索条件</p>
        <div class="setion">
          <span>目标类型：</span>
         <div>
            <span @click="changeTab('tab1')" class="items"><b><i></i></b>行人</span>
            <span @click="changeTab('tab2')" class="items"><b><i></i></b>骑车人</span>
            <span @click="changeTab('tab3')" class="items"><b><i></i></b>车辆</span>
         </div>
        </div>
        <div class="disresult">
          <p><span>|</span> 目标信息：</p>
          <div id='tab2' class="results">
            <ul>
              <li>
                <span>性别：</span>
                <el-select v-model="Gender" placeholder="请选择性别">
                  <el-option v-for="item in GenderType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>体态：</span>
                <el-select v-model="BikeBody" placeholder="请选择体态">
                  <el-option v-for="item in BikeBodyType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>民族：</span>
                <el-select v-model="EthicCode" placeholder="请选择民族">
                  <el-option v-for="item in EthicCodeType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>年龄段：</span>
                <el-select v-model="PersonAge" placeholder="请选择年龄段">
                  <el-option v-for="item in PersonAgeType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>朝向：</span>
                <el-select v-model="BikeTowards" placeholder="请选择朝向">
                  <el-option v-for="item in BikeTowardsType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>发型：</span>
                <el-select v-model="BikeHairStyle" placeholder="请选择发型">
                  <el-option v-for="item in BikeHairStyleType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>上衣类型：</span>
                <el-select v-model="BikeCoatStyle" placeholder="请选择上衣类型">
                  <el-option v-for="item in BikeCoatStyleType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>上衣颜色：</span>
                <el-select v-model="BikeCoatStyleColor" placeholder="请选择上衣颜色">
                  <el-option v-for="item in BikeCoatStyleColorType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>上衣纹理：</span>
                <el-select v-model="BikeCoatTexture" placeholder="请选择上衣纹理">
                  <el-option v-for="item in BikeCoatTextureType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>下衣类型：</span>
                <el-select v-model="BikeCulotteStyle" placeholder="请选择下衣类型">
                  <el-option v-for="item in BikeCulotteStyleType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>下衣颜色：</span>
                <el-select v-model="BikeCulotteColor" placeholder="请选择下衣颜色">
                  <el-option v-for="item in BikeCulotteColorType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>包类型：</span>
                <el-select v-model="BikeBag" placeholder="请选择包类型">
                  <el-option v-for="item in BikeBagType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>包颜色：</span>
                <el-select v-model="BikeBagColor" placeholder="请选择包颜色">
                  <el-option v-for="item in BikeBagColorType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>眼睛：</span>
                <el-select v-model="EyePart" placeholder="请选择眼睛">
                  <el-option v-for="item in EyePartType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>嘴：</span>
                <el-select v-model="MouthPart" placeholder="请选择嘴">
                  <el-option v-for="item in MouthPartType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>围脖：</span>
                <el-select v-model="ScarfPart" placeholder="请选择围脖">
                  <el-option v-for="item in ScarfPartType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>车颜色：</span>
                <el-select v-model="BikeColor" placeholder="请选择车颜色">
                  <el-option v-for="item in BikeColorType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>驾驶人数：</span>
                <el-select v-model="DriverNum" placeholder="请选择">
                  <el-option v-for="item in DriverCount" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>是否打伞：</span>
                <el-select v-model="BikeUmbrella" placeholder="请选择是否打伞">
                  <el-option v-for="item in BikeUmbrellaFlag" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span class="font">是否携物：</span>
                <el-select v-model="BikeCarray" placeholder="请选择是否携物">
                  <el-option v-for="item in BikeCarraying" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
            </ul>
          </div>
          <div id='tab1' class="results">
            <ul>
              <li>
                <span>性别：</span>
                <el-select v-model="pGender" placeholder="请选择性别">
                  <el-option v-for="item in GenderType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>体态：</span>
                <el-select v-model="pBody" placeholder="请选择体态">
                  <el-option v-for="item in BodyType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>民族：</span>
                <el-select v-model="pEthicCode" placeholder="请选择民族">
                  <el-option v-for="item in EthicCodeType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>年龄段：</span>
                <el-select v-model="pPersonAge" placeholder="请选择年龄段">
                  <el-option v-for="item in PersonAgeType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>朝向：</span>
                <el-select v-model="pPersonView" placeholder="请选择朝向">
                  <el-option v-for="item in PersonViewType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>发型：</span>
                <el-select v-model="pHairStyle" placeholder="请选择发型">
                  <el-option v-for="item in HairStyleType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>头部颜色：</span>
                <el-select v-model="pHairColor" placeholder="请选择头部颜色">
                  <el-option v-for="item in HairColorStyle" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>上衣类型：</span>
                <el-select v-model="pCoatStyle" placeholder="请选择上衣类型">
                  <el-option v-for="item in CoatStyleType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>上衣颜色：</span>
                <el-select v-model="pCoatColor" placeholder="请选择上衣颜色">
                  <el-option v-for="item in ColorType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>上衣纹理：</span>
                <el-select v-model="pCoatTexture" placeholder="请选择上衣纹理">
                  <el-option v-for="item in CoatTextureType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>下衣类型：</span>
                <el-select v-model="pPantsStyle" placeholder="请选择下衣类型">
                  <el-option v-for="item in PantsStyleType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>下衣颜色：</span>
                <el-select v-model="pCulotteColor" placeholder="请选择下衣颜色">
                  <el-option v-for="item in CulotteColorType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>鞋子类型：</span>
                <el-select v-model="pShoesStyle" placeholder="请选择鞋子类型">
                  <el-option v-for="item in ShoesStyleType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>鞋子颜色：</span>
                <el-select v-model="pShoesColor" placeholder="请选择鞋子颜色">
                  <el-option v-for="item in ShoesColorType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>包类型：</span>
                <el-select v-model="pBagStyle" placeholder="请选择包类型">
                  <el-option v-for="item in BagStyleType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>包颜色：</span>
                <el-select v-model="pBagColor" placeholder="请选择包颜色">
                  <el-option v-for="item in BagColorType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>携物：</span>
                <el-select v-model="pHandArticle" placeholder="请选择携物">
                  <el-option v-for="item in HandArticleType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>

            </ul>
          </div>
          <div id='tab3' class="results">
            <ul>
              <li>
                <span>有无车牌：</span>
                <el-select v-model="value" placeholder="请选择有无车牌">
                   <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </li>
              <li>
                <span>车牌号码：</span>
                <input type="text" class="carNum" v-model="carNum" placeholder="请输入车牌号码">
              </li>
               <li>
                <span>号牌种类：</span>
                <el-select v-model="PlateClass" placeholder="请选择车牌种类">
                  <el-option v-for="item in PlateClassType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
               <li>
                <span>号牌颜色：</span>
                <el-select v-model="PlateColor" placeholder="请选择号牌颜色">
                  <el-option v-for="item in PlateColorType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
               <li>
                <span>车辆品牌：</span>
                <el-select v-model="VehicleBrand" placeholder="请选择车辆品牌" @change="getVehicleModelByBrand">
                  <el-option v-for="item in VehicleBrandType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
               <li>
                <span>车辆类型：</span>
                <el-select v-model="VehicleKind" placeholder="请选择车辆类型">
                  <el-option v-for="item in VehicleKindType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li>
                <span>车身颜色：</span>
                <el-select v-model="CarColor" placeholder="请选择车身颜色">
                  <el-option v-for="item in CarColorType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>
              <li class="carModel">
                <span>车辆型号：</span>
                <el-select v-model="carModel" placeholder="请选择车辆型号">
                  <el-option v-for="item in carModelType" :key="item.value" :value="item.field" :label="item.value">
                </el-option></el-select>
              </li>

            </ul>
            <car-info @sendSynToParent="getSynDataFromChild"></car-info>
          </div>
        </div>

        <div class="btnmain">
          <div class="button">
            <el-button type="warning" class="el-icon-refresh" @click="hide">重置</el-button>
            <el-button type="primary" class="el-icon-search" @click="searchall">搜索</el-button>
          </div>
        </div>


      </div>
      <div class="right">
        <el-dialog
          title="详细信息"
          :visible.sync="centerDialogVisible"
          width="55%"
          center
          :modal-append-to-body="false">
          <div class="center">
            <p>光谷地铁抓拍图（2018-02-20 12：12：12）</p>
              <div class="cenmain">
                <el-carousel>
                  <el-carousel-item v-for="item in 4" :key="item">
                    <h3>{{ item }}</h3>
                  </el-carousel-item>
                </el-carousel>
              </div>
            <div class="details">
              <p>识别信息</p>
              <ul>
                <li>
                  <span>目标类型：</span>
                  <span>行人</span>
                </li>
                <li>
                  <span>目标类型：</span>
                  <span>行人</span>
                </li>
                <li>
                  <span>目标类型：</span>
                  <span>行人</span>
                </li>
                <li>
                  <span>目标类型：</span>
                  <span>行人</span>
                </li>
                <li>
                  <span>目标类型：</span>
                  <span>行人</span>
                </li>
                <li>
                  <span>目标类型：</span>
                  <span>行人</span>
                </li>
                <li>
                  <span>目标类型：</span>
                  <span>行</span>
                </li>
                <li>
                  <span>目标类：</span>
                  <span>行人</span>
                </li>
                <li>
                  <span>目标类型：</span>
                  <span>行人</span>
                </li>
                <li>
                  <span>目标类：</span>
                  <span>行</span>
                </li>
                <li>
                  <span>目标类型：</span>
                  <span>行</span>
                </li>
                <li>
                  <span>目标类型：</span>
                  <span>行人</span>
                </li>
                <li>
                  <span>目标类型：</span>
                  <span>行人</span>
                </li>
                <li>
                  <span>目标类型：</span>
                  <span>行人</span>
                </li>
              </ul>
            </div>
          </div>
        </el-dialog>

        <div ref="rightmain" class="rightmain">
          <p>检索结果</p>
          <div class="searchOk">
            <ul>
              <li v-for="(item,index) in searchOk" :key="index">
                <img :src="item.traceImgUrl" alt="">
                <p>
                  <span><i> 地点：</i>{{item.devicePlace}}</span>
                  <span><i> 时间：</i>{{item.markTime}}</span>
                </p>
              </li>
            </ul>

          <!-- 任务的弹出层 -->
            <el-row type="flex" class="row-bg" justify="center">
              <el-col :span="6">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalCount">
                </el-pagination>
              </el-col>
            </el-row>

          </div>
        </div>
        <footer>
          <p><img src="../../assets/logo.png">武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span></p>
        </footer>
      </div>
    </div>
 </div>
</template>

<script>
import dictionaries from "../../api/realvideo/dictionaries.js";
 import carInfo from '../carJudged/carInfoComponets'
 export default {

    data () {
      return {
        targettype:0,
        currentPage:1, // 当前页码
        pageSize: 10, //每页显示的条数
        totalCount:0, //数据总条数
        centerDialogVisible: false,
        options: [
          {
          value: '0',
          label: '无'
        }, {
          value: '1',
          label: '有'
        }
        ],
        value: '',

        defaultProps: {
          children: 'apes',
          label: 'name'
        },
        searchOk:[], //得到的返回结果
        //骑车人
        Gender:'',
        BikeBody: '',
        EthicCode:'',
        PersonAge:'',
        BikeTowards: '',
        BikeHairStyle: '',
        BikeCoatStyle: '',
        BikeCoatStyleColor: '',
        BikeCoatTexture: '',
        BikeCulotteStyle: '',
        BikeCulotteColor: '',
        BikeBag: '',
        BikeBagColor: '',
        EyePart: '',
        MouthPart: '',
        ScarfPart: '',
        BikeColor: '',
        BikeUmbrella: '',
        BikeCarray: '',
        DriverNum:'',

        //行人
        pGender:'', //性别
        pBody:'',  //体态
        pEthicCode :'',//民族
        pPersonAge:'',  //年龄段
        pPersonView:'',  //朝向
        pHairStyle:'', //发型
        pHairColor:'',  //头部颜色
        pCoatStyle:'', // 上衣类型
        pCoatColor:'',  //上衣颜色
        pCoatTexture:'',  //上衣纹理
        pPantsStyle:'', //下衣类型
        pCulotteColor:'', //下衣颜色
        pShoesStyle:'', //鞋子类型
        pShoesColor:'', //鞋子颜色
        pBagStyle:'', // 包类型
        pBagColor:'', //包颜色
        pHandArticle:'', //是否携带物品

        //车辆
        carInfo:{},  //车辆标识信息
        carNum:'',  //车牌号码
        PlateClass:'',  //号牌种类
        PlateColor:'',  //号牌颜色
        VehicleBrand:'', //车辆类型
        VehicleKind:'',  //车辆类别
        CarColor:'',  //车身颜色
        carModelType:[], // 车辆类别
        carModel:'',
        id:'',
      }
    },
    components: {
      carInfo
    },

    mounted () {
      this.changeTab('tab1');
      this.getVehicleModel();
      this.id = this.$route.query.id
    },
    mixins:[dictionaries],
    methods:{
      //获取所有车辆类别
      getVehicleModelByBrand(e){
        this.$http.get('sms/static/getVehicleModel/' + e).then(res=>{
          if(res.data.code == 200){
            this.carModelType = res.data.data
          }
        })
      },
      getVehicleModel(){
         this.$http.get('sms/static/getVehicleModel').then(res=>{
          if(res.data.code == 200){
            this.carModelType = res.data.data
          }
        })
      },
      //获取车辆标识信息
      getSynDataFromChild (p){
        if(p.driver){
          this.carInfo.driver = JSON.stringify(p.driver);
        }else{
          this.carInfo.driver = null;
        }
        if(p.face){
          this.carInfo.face = JSON.stringify(p.face);
        }else{
          this.carInfo.face = null;
        }
        if(p.belt){
          this.carInfo.belt = JSON.stringify(p.belt);
        }else{
          this.carInfo.belt = null;
        }
        if(p.sunshield){
          this.carInfo.sunshield = JSON.stringify(p.sunshield);
        }else{
          this.carInfo.sunshield = null;
        }
        if(p.decoratio){
          this.carInfo.decoratio = JSON.stringify(p.decoratio);
        }else{
          this.carInfo.decoratio = null;
        }
        if(p.napkinbox){
          this.carInfo.napkinbox = JSON.stringify(p.napkinbox);
        }else{
          this.carInfo.napkinbox = null;
        }
        if(p.zhuanjt){
          this.carInfo.zhuanjt = JSON.stringify(p.zhuanjt);
        }else{
          this.carInfo.zhuanjt = null;
        }
        if(p.callPhone){
          this.carInfo.callPhone = JSON.stringify(p.callPhone);
        }else{
          this.carInfo.callPhone = null;
        }
        if(p.smoke){
          this.carInfo.smoke = JSON.stringify(p.smoke);
        }else{
          this.carInfo.smoke = null;
        }
        if(p.sunroof){
          this.carInfo.sunroof = parseInt(p.sunroof.value);
        }else{
          this.carInfo.sunroof = null;
        }
        if(p.bracket){
          this.carInfo.bracket = parseInt(p.bracket.value);
        }else{
          this.carInfo.bracket = null;
        }
        if(p.tag){
          this.carInfo.tag = JSON.stringify(p.tag);
        }else{
          this.carInfo.tag = null;
        }
      },
      handleSizeChange(val){

      },
      handleCurrentChange(){

      },

      searchall(){
        console.log(this.id.id,222);
      },

      //重置
      hide(){

      },
      changeTab(item){
        var tabs = ["tab1", "tab2","tab3"];
        var items = document.getElementsByClassName('items');
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i] == item) {
            document.getElementById(tabs[i]).style.display = "block";
            items[i].classList.add('active')
          } else {
            document.getElementById(tabs[i]).style.display = "none";
            items[i].classList.remove('active')
          }
        }
      },
       //清除
      clearall(){

      },
    }
  }
</script>

<style scoped>
  @import './css/searchSturc.css';
</style>
