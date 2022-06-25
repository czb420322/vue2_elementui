<template>
 <div class="semantic">
    <div class="topInfo">
         <router-link class="sysname" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查</router-link>
        <p class="childname">语义查询</p>
    </div>
    <div class="searchmain">
      <div class="left">
        <p class="firstp"><span>|</span>&nbsp;&nbsp;语义查询</p>
        <p class="twop">搜索条件</p>

        <div class="searchtrim">
          <span class="item active" ref="onespan" @click="onlinesearch"><b><i></i></b> 在线搜索</span>
          <span class="item" ref="twospan" @click="offlinesearch"><b><i></i></b>离线搜索</span>
        </div>
        <div class="setion">
          <span>目标类型：</span>
         <div>
            <span @click="changeTab('tab1')" class="items"><b><i></i></b>行人</span>
            <span @click="changeTab('tab2')" class="items"><b><i></i></b>骑车人</span>
            <span @click="changeTab('tab3')" class="items"><b><i></i></b>车辆</span>
         </div>
        </div>
        <div class="captime" v-show="isonline">
         <span>抓拍时段：</span>
          <div>
              <el-date-picker
              v-model="time1"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择开始时间">
            </el-date-picker>
            <el-date-picker
              v-model="time2"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择结束时间">
            </el-date-picker>
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
                <el-select v-model="DriverNum" placeholder="请选择驾驶人数">
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
                <el-select v-model="PlateClass" placeholder="请选择号牌种类">
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
          <p class="threep">地图操作工具</p>
          <div class="maphandle">
            <ul>
              <li  @click="drawCopeReact">
                <img src="../../assets/images/carJudged/frame-1.png" alt="">
              </li>
              <li @click="drawCopeLine">
                <img src="../../assets/images/carJudged/drawALine-1.png" alt="">
              </li>
              <li  @click="closeCopeDraw">
                <img src="../../assets/images/carJudged/move-1.png" alt="">
              </li>
              <li @click="showaddress =! showaddress">
                <img src="../../assets/images/carJudged/meun.png" alt="">
              </li>
              <li @click="clearCopeDrawing">
                <img src="../../assets/images/carJudged/delete-1.png" alt="">
              </li>
            </ul>
          </div>
          <div class="button">
            <el-button type="warning" class="el-icon-refresh" @click="hide">重置</el-button>
            <el-button type="primary" class="el-icon-search" @click="searchall">搜索</el-button>
          </div>
        </div>


      </div>
      <div class="right">
        <div id="mapContent"></div>
        <img class="dingwei" src="../../assets/case/quickPos.png" @click="InitCopeMap('mapContent');initCarPoint();" />
        <div class="point">
          <span>经度：{{point.lng}}</span><br>
          <span>纬度：{{point.lat}}</span>
        </div>
         <!-- 区域点选择 -->
        <div class="address" v-show="showaddress">
          <p><input type="text" placeholder="请输入关键字或者关卡名字"><i class="el-icon-search"></i></p>
          <el-tree
            :data="treeList"
            show-checkbox
            node-key="shebeiId"
            ref="tree"
            @check='getCheckedCopeNodes'
            :props="defaultProps">
          </el-tree>
        </div>


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

          <img @click="showarea" v-show="check1" src="../../assets/images/carJudged/666.png" alt="">
          <img @click="showarea1" v-show="check" src="../../assets/images/carJudged/555.png" alt="">
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
import copeMapFun from '../../api/vehicle/copeMapFun.js'
import dictionaries from "../../api/realvideo/dictionaries.js";
import carInfo from '../carJudged/carInfoComponets'
let carIco = require('@/assets/images/device/car.png')
 export default {

    data () {
      return {
        isonline:true,
        time1:'',
        time2:'',
        targettype:0,
        currentPage:1, // 当前页码
        pageSize: 10, //每页显示的条数
        totalCount:0, //数据总条数
        check:false,  //隐藏
        check1:true,  //显示
        centerDialogVisible: false,
        showaddress:false,  //地图的显示隐藏
        tollgateIdsArr:[],  //总体选中的卡口列表
        tollArr: [],  //地图选中的卡口列表
        tollTreeArr: [], // 菜单选中的卡口列表
        category:0,   //在线离线
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
        treeList: [],
        defaultProps: {
          children: 'apes',
          label: 'name'
        },
        num:'',
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
      }
    },
    components: {
      carInfo
    },

    mounted () {
      this.changeTab('tab1');
      this.InitCopeMap('mapContent');
      this.getKakou();
      this.getVehicleModel();
    },
    computed:{
      newpoints (){
        let arr = [];
        if(this.treeList !== null && this.treeList.length !==0){
          for(let i=0;i<this.treeList.length;i++){
            let apeToll = this.treeList[i].apes;
            let temp = arr.concat(apeToll);
            arr = temp;
          }
        }
        return arr;
      },
    },
    mixins:[copeMapFun,dictionaries],
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
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      getKakou(){
        this.$http.post('/sms/ape/selectByVideo').then(res => {
          if (res.data.code === 200) {
            this.treeList = res.data.data
            this.initCarPoint();
          }
        })
      },
      //详情框
      godetails(){
        this.centerDialogVisible = true;
      },
      searchall(){
        if(this.time1 === '' || this.time2 === ''){
          this.$alert('时间不能为空')
          return
        }
        var rightmain = this.$refs.rightmain;
        rightmain.style.left="13px";
        rightmain.style.transition = 'all 1s ease';
        var device = this.tollgateIdsArr.join(',')
        //骑车人
        var cp = {
          gender:this.Gender,
          bodyType:this.BikeBody,
          ethic:this.EthicCode,
          ageType:this.PersonAge,
          viewType:this.BikeTowards,
          hairType:this.BikeHairStyle,
          coatStyle:this.BikeCoatStyle,
          coatColor:this.BikeCoatStyleColor,
          coatTexture:this.BikeCoatTexture,
          trousersStyle:this.BikeCulotteStylem,
          trousersColor:this.BikeCulotteColor,
          bagStyle:this.BikeBag,
          bagColor:this.BikeBagColor,
          eyePart:this.eyePart,
          mouthPart:this.mouthPart,
          scarf:this.scarf,
          vehicleColor:this.BikeColor,
          driverCount:this.DriverNum,
          umbrellaFlag:this.BikeUmbrella,
          carryingType:this.BikeCarray
        }
        //行人
        var person={
          gender:this.pGender,//	性别
          bodyType:this.pBody,//	体态
          ethic:this.pEthicCode,//	民族
          ageType:this.pPersonAge,//	年龄段
          appendant:this.pHandArticle,//	携带物
          viewType:this.pPersonView,//	朝向
          hairType:this.pHairStyle,//	头部
          hairColor:this.pHairColor,//	头部颜色
          coatStyle:this.pCoatStyle,//	上衣类型
          coatColor:this.pCoatColor,//	上衣颜色
          coatTexture:this.pCoatTexture,//	上衣纹理
          trousersStyle:this.pPantsStyle,//	下衣类型
          trousersColor:this.pCulotteColor,//	下衣颜色
          shoesStyle:this.pShoesStyle,//	鞋子类型
          shoesColor:this.pShoesColor,//	鞋子颜色
          bagStyle:this.pBagStyle,//	包类型
          bagColor:this.pBagColor,//	包颜色
        }
        //车辆
        var car = {
          hasPlate:this.value,
          plateNo:this.carNum,
          plateClass:this.PlateClass,
          plateColor:this.PlateColor,
          vehicleBrand:this.VehicleBrand,
          vehicleKind:this.vehicleKind,
          vehicleModel:this.carModel,
          vehicleColor:this.CarColor
        }
        var data;

        var cardata = Object.assign(car,this.carInfo);

        var publicdata1 = {
          category:this.category,  //在线 离线             //目标类型
          beginDateTime:this.time1,
          endDateTime:this.time2,
          deviceId:device,
          pageNo:1,
          pageSize:20,
          // orderBy:'pass_time',
          // orderType:'desc',
        }
        var publicdata2 = {
            category:this.category,  //在线 离线
            deviceId:device,
            pageNo:1,
            pageSize:20,
            // orderBy:'pass_time',
            // orderType:'desc',
        }
        if(this.category == 0 && this.num == 0){
          this.index = 0
          var traceType={traceType:this.index,}
          data = Object.assign(person,publicdata1,traceType)
        }else if(this.category == 0 && this.num == 1){
          this.index = 2
          var traceType={traceType:this.index,}
          data = Object.assign(cp,publicdata1,traceType)
        }
        else if(this.category == 0 && this.num == 2){
          this.index = 4
          var traceType={traceType:this.index,}
          data = Object.assign(cardata,publicdata1,traceType)
        }
        else if(this.category == 1 && this.num == 0){
          this.index = 0
          var traceType={traceType:this.index,}
          data = Object.assign(person,publicdata2,traceType)
        }
        else if(this.category == 0 && this.num == 1){
          this.index = 2
          var traceType={traceType:this.index,}
          data = Object.assign(cp,publicdata2,traceType)
        }
        else if(this.category == 0 && this.num == 2){
          this.index = 4
          var traceType={traceType:this.index,}
          data = Object.assign(cardata,publicdata2,traceType)
        }



        data = this.$qs.stringify(data)
         this.$http.post('vsas/semantic/query/outline',data).then(res=>{
          if(res.data.code === 200){
            this.searchOk = res.data.data.rows
          }
        })
      },
      showarea(){
        var rightmain = this.$refs.rightmain;
        this.check1 = false;
        this.check = true;
        rightmain.style.left="100%";
        rightmain.style.transition = 'all 1s ease';
      },
      showarea1(){
        var rightmain = this.$refs.rightmain;
        this.check1 = true;
        this.check = false;
        rightmain.style.left="13px";
        rightmain.style.transition = 'all 1s ease';
      },
      //重置
      hide(){
        var rightmain = this.$refs.rightmain;
        rightmain.style.left="calc(100% + 13px)";
        rightmain.style.transition = 'all 1s ease';
        this.clearall();
      },
      changeTab(item){
        var tabs = ["tab1", "tab2","tab3"];
        var items = document.getElementsByClassName('items');
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i] == item) {
            this.num = i;
            document.getElementById(tabs[i]).style.display = "block";
            items[i].classList.add('active')
          } else {
            document.getElementById(tabs[i]).style.display = "none";
            items[i].classList.remove('active')
          }
        }
      },
      onlinesearch(){
        this.isonline = true;
        this.category = 0;
        this.$refs.onespan.classList.add('active');
        this.$refs.twospan.classList.remove('active');
        this.clearall();
      },
      offlinesearch(){
        this.isonline = false;
        this.category = 1;
        this.$refs.onespan.classList.remove('active');
        this.$refs.twospan.classList.add('active');
        this.clearall();
      },
       //清除
      clearall(){
        this.$refs.tree.setCheckedKeys([])
        this.clearCopeDrawing()
      },
    }
  }
</script>

<style scoped>
  @import './css/semantic.css';
</style>
