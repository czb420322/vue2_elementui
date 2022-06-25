<template>
 <div class="searchimg">
   <!-- <headers/> -->
    <div class="topInfo">
         <router-link class="sysname" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查</router-link>
        <p class="childname">以图搜图</p>
    </div>
    <div class="searchmain">
      <div class="left">
        <p class="firstp"><span>|</span>&nbsp;&nbsp;以图搜图</p>
        <p class="twop">搜索条件</p>
        <div class="searchtrim">
          <span class="item active" ref="onespan" @click="onlinesearch"><b><i></i></b> 在线搜索</span>
          <span class="item" ref="twospan" @click="offlinesearch"><b><i></i></b>离线搜索</span>
        </div>
        <div class="left_img">
            <div id="search">
              <img id="sss" :src="imgUrlShow" alt="">
            </div>
            <p @click="uploadImg">上传图片</p>
        </div>
        <div class="setion">
          <span>阈值区间：</span>
          <el-slider v-model="setion"></el-slider>
        </div>
        <div class="captime" v-show="isOnline">
         抓拍时段：
          <div class="timeaaaa">
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
        <p class="maxshow">最大显示：<input type="text" v-model="maxpage">&nbsp;&nbsp;条</p>
        <div class="disresult">
          <p class="result">识别结果：</p>
          <ul v-show="cpShow">
            <li><span>目标类型：</span><b>{{cpData.traceTypeName}}</b></li>
            <li><span>年龄段：</span><b>{{cpData.age_type}}</b></li>
            <li><span>包款式：</span><b>{{cpData.bag_type}}</b></li>
            <li><span>包颜色：</span><b>{{cpData.bagcolor_type}}</b></li>
            <li><span>车颜色：</span><b>{{cpData.carcolor_type}}</b></li>
            <li><span>是否携物：</span><b>{{cpData.carrying_type}}</b></li>
            <li><span>下衣类型：</span><b>{{cpData.down_type}}</b></li>
            <li><span>下衣颜色：</span><b>{{cpData.downcolor_type}}</b></li>
            <li><span>骑车人数：</span><b>{{cpData.driver_count}}</b></li>
            <li><span>眼部特征：</span><b>{{cpData.eye_part}}</b></li>
            <li><span>发型：</span><b>{{cpData.head_type}}</b></li>
            <li><span>嘴部特征：</span><b>{{cpData.mouth_part}}</b></li>
            <li><span>民族：</span><b>{{cpData.nation_type}}</b></li>
            <li><span>围脖：</span><b>{{cpData.scarf}}</b></li>
            <li><span>性别：</span><b>{{cpData.sex_type}}</b></li>
            <li><span>体态：</span><b>{{cpData.shape_type}}</b></li>
            <li><span>是否打伞：</span><b>{{cpData.umbrella_flag}}</b></li>
            <li><span>上衣款式：</span><b>{{cpData.up_type}}</b></li>
            <li><span>上衣颜色：</span><b>{{cpData.upcolor_type}}</b></li>
            <li><span>上衣纹理：</span><b>{{cpData.uptext_type}}</b></li>
            <li><span>朝向：</span><b>{{cpData.view_type}}</b></li>
          </ul>
          <ul v-show="personShow">
            <li><span>目标类型：</span><b>{{personData.traceTypeName}}</b></li>
            <li><span>年龄段：</span><b>{{personData.age_type}}</b></li>
            <li><span>包款式：</span><b>{{personData.bag_type}}</b></li>
            <li><span>包颜色：</span><b>{{personData.bagcolor_type}}</b></li>
            <li><span>是否携物：</span><b>{{personData.carrying_type}}</b></li>
            <li><span>下衣类型：</span><b>{{personData.down_type}}</b></li>
            <li><span>下衣颜色：</span><b>{{personData.downcolor_type}}</b></li>
            <li><span>发型：</span><b>{{personData.head_type}}</b></li>
            <li><span>头发颜色：</span><b>{{personData.headcolor_type}}</b></li>
            <li><span>民族：</span><b>{{personData.nation_type}}</b></li>
            <li><span>性别：</span><b>{{personData.sex_type}}</b></li>
            <li><span>体态：</span><b>{{personData.shape_type}}</b></li>
            <li><span>鞋子款式：</span><b>{{personData.shoe_type}}</b></li>
            <li><span>鞋子颜色：</span><b>{{personData.shoecolor_type}}</b></li>
            <li><span>上衣款式：</span><b>{{personData.up_type}}</b></li>
            <li><span>上衣颜色：</span><b>{{personData.upcolor_type}}</b></li>
            <li><span>上衣纹理：</span><b>{{personData.uptext_type}}</b></li>
            <li><span>朝向：</span><b>{{personData.view_type}}</b></li>
          </ul>
          <ul v-show="carShow">
            <li><span>目标类型：</span><b>{{carData.traceTypeName}}</b></li>
            <li><span>车牌颜色：</span><b>{{carData.plate_color}}</b></li>
            <li><span>车牌号码：</span><b>{{carData.plate_number}}</b></li>
            <li><span>车身颜色：</span><b>{{carData.vehicle_color_id}}</b></li>
            <li><span>车牌类型：</span><b>{{carData.plate_class}}</b></li>
          </ul>
        </div>
        <!-- 地图识别工具 -->
        <div class="mapfilxd">
          <p class="threep">地图操作工具</p>
          <div class="maphandle">
            <ul>
              <li @click="drawCopeReact">
                <img src="../../assets/images/carJudged/frame-1.png" alt="">
              </li>
              <li @click="drawCopeLine">
                <img src="../../assets/images/carJudged/drawALine-1.png" alt="">
              </li>
              <li @click="closeCopeDraw">
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
          <!-- <p><input type="text" placeholder="请输入关键字或者关卡名字"><i class="el-icon-search"></i></p> -->
          <el-tree
            :data="treeList"
            show-checkbox
            node-key="shebeiId"
            ref="tree"
            @check='getCheckedCopeNodes'
            :props="defaultProps">
          </el-tree>
        </div>
        <!-- 任务的弹出层 -->
        <el-dialog
          title="上传图片"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <div class="center">
            <div class="logleft">
              <p><span>|</span> 图片源</p>
                <div class="showImg" id="imgBox" @click="choiceCar">
                  <img id="imgItem" :src="imgUrl"/>
                  <canvas id="photoCanvas" class="showPhoto" width="0" height="0"></canvas>
                </div>
                <el-upload
                  class="uploadPhoto"
                  action="vsas/searchImg/img/recognition"
                  name="image"
                  ref="upload"
                  :before-upload="beforeAvatarUpload">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>

            </div>
            <div class="logright">
                <p class="carInfo"><span>|</span> 目标标识信息</p>
                <div>
                  <ul v-show="cpShow">
                    <li><span>目标类型：</span><b>{{cpData.traceTypeName}}</b></li>
                    <li><span>年龄段：</span><b>{{cpData.age_type}}</b></li>
                    <li><span>包款式：</span><b>{{cpData.bag_type}}</b></li>
                    <li><span>包颜色：</span><b>{{cpData.bagcolor_type}}</b></li>
                    <li><span>车颜色：</span><b>{{cpData.carcolor_type}}</b></li>
                    <li><span>是否携物：</span><b>{{cpData.carrying_type}}</b></li>
                    <li><span>下衣类型：</span><b>{{cpData.down_type}}</b></li>
                    <li><span>下衣颜色：</span><b>{{cpData.downcolor_type}}</b></li>
                    <li><span>骑车人数：</span><b>{{cpData.driver_count}}</b></li>
                    <li><span>眼部特征：</span><b>{{cpData.eye_part}}</b></li>
                    <li><span>发型：</span><b>{{cpData.head_type}}</b></li>
                    <li><span>嘴部特征：</span><b>{{cpData.mouth_part}}</b></li>
                    <li><span>民族：</span><b>{{cpData.nation_type}}</b></li>
                    <li><span>围脖：</span><b>{{cpData.scarf}}</b></li>
                    <li><span>性别：</span><b>{{cpData.sex_type}}</b></li>
                    <li><span>体态：</span><b>{{cpData.shape_type}}</b></li>
                    <li><span>是否打伞：</span><b>{{cpData.umbrella_flag}}</b></li>
                    <li><span>上衣款式：</span><b>{{cpData.up_type}}</b></li>
                    <li><span>上衣颜色：</span><b>{{cpData.upcolor_type}}</b></li>
                    <li><span>上衣纹理：</span><b>{{cpData.uptext_type}}</b></li>
                    <li><span>朝向：</span><b>{{cpData.view_type}}</b></li>
                  </ul>
                  <ul v-show="personShow">
                    <li><span>目标类型：</span><b>{{personData.traceTypeName}}</b></li>
                    <li><span>年龄段：</span><b>{{personData.age_type}}</b></li>
                    <li><span>包款式：</span><b>{{personData.bag_type}}</b></li>
                    <li><span>包颜色：</span><b>{{personData.bagcolor_type}}</b></li>
                    <li><span>是否携物：</span><b>{{personData.carrying_type}}</b></li>
                    <li><span>下衣类型：</span><b>{{personData.down_type}}</b></li>
                    <li><span>下衣颜色：</span><b>{{personData.downcolor_type}}</b></li>
                    <li><span>发型：</span><b>{{personData.head_type}}</b></li>
                    <li><span>头发颜色：</span><b>{{personData.headcolor_type}}</b></li>
                    <li><span>民族：</span><b>{{personData.nation_type}}</b></li>
                    <li><span>性别：</span><b>{{personData.sex_type}}</b></li>
                    <li><span>体态：</span><b>{{personData.shape_type}}</b></li>
                    <li><span>鞋子款式：</span><b>{{personData.shoe_type}}</b></li>
                    <li><span>鞋子颜色：</span><b>{{personData.shoecolor_type}}</b></li>
                    <li><span>上衣款式：</span><b>{{personData.up_type}}</b></li>
                    <li><span>上衣颜色：</span><b>{{personData.upcolor_type}}</b></li>
                    <li><span>上衣纹理：</span><b>{{personData.uptext_type}}</b></li>
                    <li><span>朝向：</span><b>{{personData.view_type}}</b></li>
                  </ul>
                  <ul v-show="carShow">
                    <li><span>目标类型：</span><b>{{carData.traceTypeName}}</b></li>
                    <li><span>车牌颜色：</span><b>{{carData.plate_color}}</b></li>
                    <li><span>车牌号码：</span><b>{{carData.plate_number}}</b></li>
                    <li><span>车身颜色：</span><b>{{carData.vehicle_color_id}}</b></li>
                    <li><span>车牌类型：</span><b>{{carData.plate_class}}</b></li>
                  </ul>
                </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancle">取 消</el-button>
            <el-button type="primary" @click="caveCanvas">确 定</el-button>
          </span>
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
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
              </el-pagination>
          </div>
        </div>

      </div>
      <footer>
          <p><img src="../../assets/logo.png">武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span></p>
        </footer>
    </div>
 </div>
</template>
<script>
import mapFun from '../../api/vehicle/copeMapFun.js'
import dictionaries from "../../api/realvideo/dictionaries.js";
let carIco = require('@/assets/images/device/car.png')
 export default {
    data () {
      return {
        setion:50,   //阈值
        isOnline:true,  //是否显示时间
        time1:'',
        time2:'',
        currentPage:1, // 当前页码
        pageSize: 10, //每页显示的条数
        totalCount:0, //数据总条数
        check:false,  //隐藏
        check1:true,  //显示
        imgUrl:null,   //图片地址
        centerDialogVisible: false,
        showaddress:false,  //地图的显示隐藏
        checkList:[],
        treeList: [],
        defaultProps: {
          children: 'apes',
          label: 'name'
        },
        category:0,  //在线离线
        maxpage:20,
        cpShow:false,   //骑车人的显示和隐藏
        personShow:false,  //行人的显示和隐藏
        carShow:false,    //汽车的显示和隐藏
        unit: 1,  //图片宽度适应比例尺
        imgWidth:'',   //图片的宽度
        imgHeight:'',  //图片的高度

        uploadloading:'',
        imgData:[],  //所有的数据
        personData:{},  //行人的信息
        cpData:{},      //骑车人的信息
        carData:{},     // 车的信息
        currentCar: null,
        imgUrlShow:null,  //保存的图片
        tollgateIdsArr:[],  //总体选中的卡口列表
        tollArr: [],  //地图选中的卡口列表
        tollTreeArr: [], // 菜单选中的卡口列表
        searchOk:'', // 搜索结果
      }
    },
    components: {
    },
    computed:{
      carList (){
        let cList = [];
        if(this.imgData.length){
          for(let i=0;i<this.imgData.length;i++){
            cList.push({
              obj_bootom: this.imgData[i].obj_bootom,
              obj_top: this.imgData[i].obj_top,
              obj_right: this.imgData[i].obj_right,
              obj_left: this.imgData[i].obj_left
            });
          }
        }
        return cList;
      },
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
   mounted () {
      this.getKakou();
      this.InitCopeMap('mapContent');
    },

    mixins:[mapFun,dictionaries],
    methods:{
      //上传文件
      uploadImg(){
        this.centerDialogVisible = true
        this.clearall();
      },
      //取消
      cancle(){
        this.centerDialogVisible = false
        if(document.getElementById("simg")){
          document.getElementById("simg").remove();
        }
        if(document.getElementById("photoCanvas")){
          document.getElementById("photoCanvas").width = 0;
          document.getElementById("photoCanvas").height = 0;
        }
        this.imgUrl = this.imgUrlShow = '';
        this.carShow = this.personShow = this.cpShow = false;
      },
      //点击当前的div获取当前点击的位置
      choiceCar (ev){
        if(this.carList.length > 0 ){
          for(let i = 0;i<this.carList.length;i++){
            if( (this.carList[i].obj_left / this.unit) < ev.offsetX && (this.carList[i].obj_right / this.unit) > ev.offsetX && (this.carList[i].obj_top / this.unit) < ev.offsetY && (this.carList[i].obj_bootom/ this.unit) > ev.offsetY){
              this.currentCar = i;
            }
          }
        }else{
          return null;
        }
        if(this.imgData[this.currentCar].type_index === 0){
          this.personData = this.imgData[this.currentCar]
          this.personShow = true;
          this.cpShow = this.carShow = false;
        }
        if(this.imgData[this.currentCar].type_index == 1 || this.imgData[this.currentCar].type_index == 2 || this.imgData[this.currentCar].type_index == 3){
          this.cpData = this.imgData[this.currentCar]
          this.cpShow = true;
          this.personShow = this.carShow = false;
        }
        if(this.imgData[this.currentCar].type_index == 4 || this.imgData[this.currentCar].type_index == 5 || this.imgData[this.currentCar].type_index == 6 ||
        this.imgData[this.currentCar].type_index == 7 || this.imgData[this.currentCar].type_index == 8){
          this.carData = this.imgData[this.currentCar]
          this.carShow = true;
          this.personShow = this.cpShow =false;
        }
        this.clearRect();
        this.drawAllCar()
        this.drawBorder(this.currentCar);
      },
      //清除canvas画布
      clearRect(){
        let photoCanvas = document.getElementById("photoCanvas");
        let pCtx = photoCanvas.getContext("2d");
        pCtx.clearRect(0,0,this.imgWidth, this.imgHeight);
      },
      //花红色的边框
      drawBorder(pIndex){
        let pos = this.carList[pIndex];
        let photoCanvas = document.getElementById("photoCanvas");
        let pCtx = photoCanvas.getContext("2d");
        let x = pos.obj_left / this.unit;
        let y = pos.obj_top  / this.unit;
        let w = (pos.obj_right - pos.obj_left) / this.unit;
        let h = (pos.obj_bootom - pos.obj_top) / this.unit;
        pCtx.strokeStyle = "red";
        pCtx.strokeRect(x,y,w,h);
      },
      // 话黄色的边框
      drawAllCar(){
        for (let i = 0; i < this.carList.length; i++) {
          let pos = this.carList[i];
          let photoCanvas = document.getElementById("photoCanvas");
          let pCtx = photoCanvas.getContext("2d");
          let x = pos.obj_left / this.unit;
          let y = pos.obj_top  / this.unit;
          let w = (pos.obj_right - pos.obj_left) / this.unit;
          let h = (pos.obj_bootom - pos.obj_top) / this.unit;
          pCtx.strokeStyle = "yellow";
          pCtx.strokeRect(x,y,w,h);
        }
      },
      //文件上传
      beforeAvatarUpload(file){
        if(file.type != "image/jpg" && file.type != "image/jpeg" && file.type != "image/bmp" && file.type != "image/png" && file.type != "image/gif" && file.type != "image/bmf"){
          this.$alert("只能上传bmp/jpg/jpeg/png/gif/bmf格式图片！","消息提示");
          return false;
        }
        let _this = this;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (theFile)=> {
        　　var image = new Image();
          image.src = theFile.target.result;
          image.onload = (e)=> {
            this.imgWidth = image.width;
            this.imgHeight = image.height
          };
        };
        let formData = new FormData();
        formData.append('image',file);
        formData.append('taskSource',2)
        this.$http({
          url:'vsas/searchImg/img/recognition',
          method:'post',
          data:formData,
          onUploadProgress: function(progressEvent) {
            if(progressEvent.loaded != progressEvent.total){
              if(!_this.uploadloading){
                _this.uploadloading = _this.$loading({
                  text: '正在上传...',
                  spinner: 'el-icon-loading',
                  target: "#imgBox"
                });
              }
            }
          }
        }).then(res=>{
          if(_this.uploadloading){
            _this.uploadloading.close();
          }
          if(res.data.code == 200){
            this.imgUrl = reader.result;
            this.imgUrlShow = reader.result;
            this.imgData = res.data.data
            this.imgWH();
            this.drawAllCar()
            if(this.imgData[0].type_index == 0){
              this.personData = this.imgData[0]
              this.personShow = true;
              this.drawBorder(0)
              this.cpShow = this.carShow = false;
            }
            if(this.imgData[0].type_index == 1 || this.imgData[0].type_index == 2 || this.imgData[0].type_index == 3){
              this.cpData = this.imgData[0]
              this.cpShow = true;
              this.drawBorder(0)
              this.personShow = this.carShow = false;
            }
            if(this.imgData[0].type_index == 4 || this.imgData[0].type_index == 5 || this.imgData[0].type_index == 6 ||
            this.imgData[0].type_index == 7 || this.imgData[0].type_index == 8){
              this.carData = this.imgData[0]
              this.carShow = true;
              this.drawBorder(0)
              this.personShow = this.cpShow =false;
            }
          }
          if(res.data.code === 999){
            this.personShow= this.cpShow = this.carShow = false;
            this.imgWH();
            this.$alert("图片识别失败", "消息提示");
            this.imgUrl = reader.result
          }

        });
        return false;
      },
      //图片的自适应
      imgWH(){
        let imgBox = document.getElementById("imgBox");
        let imgs = document.getElementById("imgItem");
        let photoCanvas = document.getElementById("photoCanvas");
        let imgw = this.imgWidth;
        let imgh = this.imgHeight;
        let retw = imgBox.clientWidth;
        let reth = imgBox.clientHeight;
        if (retw / reth < imgw / imgh) {
          imgs.style.width = "100%";
          imgs.style.height = "auto"
          this.unit = imgw / retw;
        } else {
          imgs.style.height = "100%";
          imgs.style.width = "auto"
          this.unit = imgh / reth;
        }
        photoCanvas.width = imgw / this.unit;
        photoCanvas.height = imgh /this.unit;
      },
      //卡口ID
      getKakou(){
        this.$http.post('/sms/ape/selectByVideo').then(res => {
          if (res.data.code === 200) {
            this.treeList = res.data.data
            this.initCarPoint();
          }
        })
      },
      //上传图片的确定
      caveCanvas (){
        this.centerDialogVisible = false;
        let photoCanvas = document.getElementById("photoCanvas");
        let png = photoCanvas.toDataURL("image/png");
        let searchImg = document.getElementById("search");
        let simg = document.getElementById("simg");
        if(!simg){
          simg = document.createElement("img");
        }
        simg.src = png;
        simg.id = "simg";
        simg.style.position="absolute";
        simg.style.top = 0;
        simg.style.left = 0;
        simg.style.bottom = 0;
        simg.style.right = 0;
        simg.style.margin = "auto";
        simg.style.height = "100%";
        searchImg.appendChild(simg);
        this.imgUrlShow = this.imgUrl;
      },
      searchall(){
        var rightmain = this.$refs.rightmain;
        rightmain.style.left="13px";
        rightmain.style.transition = 'all 1s ease';
        let device = this.tollgateIdsArr.join(',')
        if(this.personShow){
          var index = this.personData.type_index
          var feature = this.personData.obj_feature
        }
        else if(this.carShow){
          var index = this.carData.type_index
          var feature = this.carData.obj_feature
        }
        else if(this.cpShow){
          var index = this.cpData.type_index
          var feature = this.cpData.obj_feature
        }
          var data = {}
        if(this.category == 0){
            data = {
              category:this.category,
              traceFeature:feature,
              //traceFeature:'lLovj60Imj8NJ3VfHluhPw0ndV8eW4E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT8AAAAAAAAAAAAAAAAAAAAADSd1Xx5bkT8AAAAAAAAAAA0ndV8eW5E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACUui+PrQiaPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT8AAAAAAAAAAA0ndV8eW4E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bkT9XBA0ndV+uPw0ndV8eW5E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT8AAAAAAAAAAA0ndV8eW4E/DSd1Xx5boT8AAAAAAAAAAA0ndV8eW6E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT9XBA0ndV+uPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT8AAAAAAAAAAAAAAAAAAAAADSd1Xx5bkT8AAAAAAAAAAA0ndV8eW5E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANJ3VfHluRPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0ndV8eW4E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANJ3VfHluRPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT8AAAAAAAAAAA0ndV8eW4E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwFoBawWsdT/vnYlE896pP5zACZzACaw/Ce0ltJfQvj/yxPlGGk+sP2YIMbtdhqA/FDiBEziBoz+Yf/mXf/m3PwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABrVhHAq2alPxAEQRAEQYA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              threshold:this.setion,
              beginDateTime:this.time1,
              endDateTime:this.time2,
              deviceId:device,
              pageNo:1,
              pageSize:this.maxpage,
              orderBy:'pass_time',
              orderType:'desc',
              traceType:index
          }
        }else if(this.category == 1){
          data = {
              category:this.category,
              traceFeature:feature,
              //traceFeature:'lLovj60Imj8NJ3VfHluhPw0ndV8eW4E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT8AAAAAAAAAAAAAAAAAAAAADSd1Xx5bkT8AAAAAAAAAAA0ndV8eW5E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACUui+PrQiaPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT8AAAAAAAAAAA0ndV8eW4E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bkT9XBA0ndV+uPw0ndV8eW5E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT8AAAAAAAAAAA0ndV8eW4E/DSd1Xx5boT8AAAAAAAAAAA0ndV8eW6E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT9XBA0ndV+uPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT8AAAAAAAAAAAAAAAAAAAAADSd1Xx5bkT8AAAAAAAAAAA0ndV8eW5E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANJ3VfHluRPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0ndV8eW4E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANJ3VfHluRPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT8AAAAAAAAAAA0ndV8eW4E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwFoBawWsdT/vnYlE896pP5zACZzACaw/Ce0ltJfQvj/yxPlGGk+sP2YIMbtdhqA/FDiBEziBoz+Yf/mXf/m3PwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABrVhHAq2alPxAEQRAEQYA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              threshold:this.setion,
              deviceId:aaa,
              pageNo:1,
              pageSize:this.maxpage,
              orderBy:'pass_time',
              orderType:'desc',
              traceType:index
          }
        }
        // let data = {
        //   category:this.category,
        //   traceFeature:'lLovj60Imj8NJ3VfHluhPw0ndV8eW4E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT8AAAAAAAAAAAAAAAAAAAAADSd1Xx5bkT8AAAAAAAAAAA0ndV8eW5E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACUui+PrQiaPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT8AAAAAAAAAAA0ndV8eW4E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bkT9XBA0ndV+uPw0ndV8eW5E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT8AAAAAAAAAAA0ndV8eW4E/DSd1Xx5boT8AAAAAAAAAAA0ndV8eW6E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT9XBA0ndV+uPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT8AAAAAAAAAAAAAAAAAAAAADSd1Xx5bkT8AAAAAAAAAAA0ndV8eW5E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANJ3VfHluRPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0ndV8eW4E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANJ3VfHluRPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSd1Xx5bgT8AAAAAAAAAAA0ndV8eW4E/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwFoBawWsdT/vnYlE896pP5zACZzACaw/Ce0ltJfQvj/yxPlGGk+sP2YIMbtdhqA/FDiBEziBoz+Yf/mXf/m3PwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABrVhHAq2alPxAEQRAEQYA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        //   threshold:20,
        //   beginDateTime:'1970-01-18 00:08:06',
        //   endDateTime:'2018-06-25 00:08:06',
        //   deviceId:'deb184cbd0bc4f6fadea94a2d794682e,deb184cbd0bc4f6fadea94a2d794682e,eb10affb39964cdc878eb0e580b1bbdd,b098cbe1eb684d4cbaaa428fa1f7b7fc,0278479d174a4ceeb8766e7344abea23',
        //   pageNo:1,
        //   pageSize:20,
        //   orderBy:'pass_time',
        //   orderType:'desc',
        //   traceType:4
        // }
        data = this.$qs.stringify(data)
        // data = JSON.stringify(data)
        this.$http.post('vsas/searchImg/img/outline',data).then(res=>{
          if(res.data.code === 200){
            this.searchOk = res.data.data.rows
          }
        })

      },
      //搜索
      showarea(){
        var rightmain = this.$refs.rightmain;
        this.check1 = false;
        this.check = true;
        rightmain.style.left="100%";
        rightmain.style.transition = 'all 1s ease';
      },
      //切换隐藏
      showarea1(){
        var rightmain = this.$refs.rightmain;
        this.check1 = true;
        this.check = false;
        rightmain.style.left="13px";
        rightmain.style.transition = 'all 1s ease';
      },
      hide(){
        var rightmain = this.$refs.rightmain;
        rightmain.style.left="calc(100% + 13px)";
        rightmain.style.transition = 'all 1s ease';
        this.clearall();
      },
      //清除
      clearall(){
         this.$refs.tree.setCheckedKeys([])
        this.clearCopeDrawing()
        if(document.getElementById("simg")){
          document.getElementById("simg").remove();
        }
        if(document.getElementById("photoCanvas")){
          document.getElementById("photoCanvas").width = 0;
          document.getElementById("photoCanvas").height = 0;
        }
        this.imgUrl = this.imgUrlShow = null;
        this.time1 = this.time2 = this.setion = '';
        this.carShow = this.personShow = this.cpShow = false;
      },
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      onlinesearch(){
        this.isOnline = true;
        this.category = 0
        this.$refs.onespan.classList.add('active');
        this.$refs.twospan.classList.remove('active');
        this.clearall();
      },
      offlinesearch(){
        this.clearall();
        this.isOnline = false;
        this.category=1
        this.$refs.onespan.classList.remove('active');
        this.$refs.twospan.classList.add('active');
      }
    },
  //  created(){
  //     let imgUrl = this.$router.history.current.query.imgUrl;
  //  }
  }
</script>

<style scoped>
@import './css/searchImg.css';
  /* @; */
</style>
