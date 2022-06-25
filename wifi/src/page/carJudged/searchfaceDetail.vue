<template>
  <!--<transition name="fade">-->
  <div class="searchDetail">
    <div  class="detailTop">
        <div class="detailTitle">| 搜索展示 </div>
        <!-- 人脸搜车页面 -->
        <div>
          <el-button class="searchBtn"  @click="downAllImg"><span class="el-icon-download" ></span>批量下载</el-button>
        </div>
    </div>
    <div class="addBasket" @click="faceSearchCar()">
      <i class="el-icon-present"></i>
      <span class="NumFlag">{{totalFlag}}</span>
    </div>
    <div class="skipTrack">
      <el-button style="padding: 0.06rem" type="danger" plain @click="trackReappea()">轨迹</el-button>
    </div>
    <ul class="resultList">
      <li id='tab1' class="detailMid">
        <div class="carsList">
          <div class="carsDetail" v-for="(item,index) in searchResultDefault.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index">
            <div :id="'smallBox_'+index" class="carsPicture" @mouseover="openBigBox(index);setMaskPos(index,$event)" @mousemove="setMaskPos(index,$event)" @click="showCarousel(index)" @mouseout="closeBigBox(index)">
              <b :id="'imgBody_'+index" class="boderShow"></b>
              <img :class="imgListWH[index]" :src="item.imageUrl" alt="loading">
              <div class="facePic" :id="'faceList1_'+index">
                <span class="faceNum" v-for="(faceItem,i) in faceType[index]" :key="i">
                  <img :style="{'top':-faceItem.top+'px', 'left': -faceItem.left+'px'}" :width="faceItem.width" :height="faceItem.height" :src="item.imageUrl" />
                </span>
              </div>
              <span :id="'mask_'+index" class="mask"></span>
            </div>
            <div :id="'bigBox_'+index" class="bigBox"><img :id="'bigImg_'+index"  :src="item.imageUrl" alt="loading"></div>
            <div class="carsMessage">
              <div class="carsMessageTxt" v-show="isCarHead != 4 && isCarHead !=8 && isCarHead != 2 && isCarHead !=14"><span>车&nbsp;&nbsp;牌&nbsp;: &nbsp;</span><span class="plateno" :title="item.plateNo == '@'?'未识别':item.plateNo">{{item.plateNo == "@"?'未识别':item.plateNo}}</span></div>
              <div class="carsMessageTxt" v-show="isCarHead != 0 && isCarHead !=1"><span>相似度: &nbsp;</span><span class="plateno" >{{item.score?(Number(item.score)*100).toFixed(2)+'%':item.score}}</span></div>
              <div class="carsMessageTxt" v-show="isCarHead != 4 && isCarHead !=8 && isCarHead != 2 && isCarHead !=14"><span>车&nbsp;&nbsp;型&nbsp;: &nbsp;</span><span :title="item.vehicleModel">{{item.vehicleModel}}</span></div>
              <div class="carsMessageTxt"><span>时&nbsp;&nbsp;间&nbsp;: &nbsp;</span><span :title="item.passTime">{{item.passTime}}</span></div>
              <div class="carsMessageTxt"><span>位&nbsp;&nbsp;置&nbsp;: &nbsp;</span><span class="tollgatep" :title="item.tollgatePlace">{{item.tollgatePlace}}</span></div>
              <div class="carsMessageTxt"><span>方&nbsp;&nbsp;向&nbsp;: &nbsp;</span><span :title="item.direction">{{item.direction}}</span></div>
              <div class="addFace">
                <i class="el-icon-circle-plus" @click="addFaceLists(item)"></i>
              </div>
              <div class="carsMessageTxt oprList" v-show="isCarHead != 4 && isCarHead !=8 && isCarHead != 2 && isCarHead !=14">
                <span>快捷操作&nbsp;: &nbsp;</span>
                <span title="图片下载" class="opr opr9" @click="downImg(index,item)"></span>
                <span v-show="imgSearchBtn" class="opr opr1" title="以图搜车" @click="goToSearchImg(item.imageUrl)"></span>
                <span v-show="firstToCityBtn" class="opr opr2" title="初次入城" @click="goToFirstToCity(item.plateNo)"></span>
                <span v-show="footHoldBtn" class="opr opr3" title="落脚点分析" @click="goToFootHold(item.plateNo)"></span>
                <span v-show="trackBackBtn" class="opr opr4" title="轨迹重现" @click="goToTrackBack(item.plateNo)"></span>
                <span v-show="plateOverMuchBtn" class="opr opr5" title="一牌多车分析" @click="goToPlateOverMuch(item.plateNo)"></span>
                <span v-show="drivingTogetherBtn" class="opr opr7" title="同行车分析" @click="goToDrivingTogether(item.plateNo)"></span>
                <span  v-show="deployApplyBtn" class="opr opr8" title="布控申请" @click="goToDeployApply(item.plateNo)"></span></div>
              <!-- <span class="opr opr9" title="添加线索池" @click="goToAddDeploy(item.vehicleId,item.imageUrl,item.passTime,item.tollgatePlace)"></span> -->
            </div>
          </div>
          <div class="nodata" v-if="!searchResultDefault.length"> 暂无数据</div>
        </div>
        <div class="pageNation">
          <el-pagination
            :background=true
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="Number(this.totalNum)">
          </el-pagination>
        </div>
      </li>
    </ul>
    <!-- 删除弹出框开始 -->
    <el-dialog
      title="轨迹重现"
      :visible.sync="deleteDialogVisible"
      :close-on-click-modal="false"
      :appendToBody="true"
      width="9rem"
      class="dialog">
      <el-table
        :data="totalFaceFlag"
        border
        style="width: 100%">
        <el-table-column
          prop="plateNo"
          label="车牌">
        </el-table-column>
        <el-table-column
          prop="vehicleModel"
          label="车型"
          width="280">
        </el-table-column>
        <el-table-column
          prop="passTime"
          label="时间">
        </el-table-column>
        <el-table-column width="130"
          label="操作">
          <template slot-scope="scope">
            <el-button type="danger"  class="searchBtn" icon="el-icon-delete" @click="deleteFaceList(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
       <span slot="footer" class="dialog-footer">
          <el-button @click="cancleTrack"></el-button>
          <el-button  @click="trackReappea()"></el-button>
        </span>
    </el-dialog>
    <!-- 删除弹出框结束 -->
    <el-dialog
        title="图片信息"
        :visible.sync="carousel"
        width="14rem"
        :modal-append-to-body="false"
        @close="closeCarousel">
        <el-carousel ref="carouselEl" id="carouselEl" height="7rem" arrow="never" :autoplay="false" indicator-position="none" @change="changeActive">
          <el-carousel-item v-for="(item,index) in searchResultDefault" :key="index">
            <div class="carouselImg" :id="'cImg_'+index">
              <img :id="'cImgItem_'+index" :src="item.imageUrl" />
              <div class="facelist" :id="'faceList_'+index">
                <span class="faceItem" v-for="(faceItem,i) in faceStyle[index]" :key="i">
                  <img :style="{'top':-faceItem.top+'px', 'left': -faceItem.left+'px'}" :width="faceItem.width" :height="faceItem.height" :src="item.imageUrl" />
                  <!-- <span class="searchData" @click="searchData(item,i)">搜</span> -->
                </span>
              </div>
              <span :id="'cImgRedBorder_'+index" class="carsRedBorder"></span>
            </div>
          </el-carousel-item>
        </el-carousel>

        <div class="bottomWarp">
          <div class="bottomItem" ref="bottomItem">
            <div class="carouseItem" :class="{ONcarouseItem:index == Indexs}" v-for="(item,index) in searchResultDefault" :key="index">
              <img :src="item.imageUrl" @click="setActiveItem(index)">
            </div>
          </div>
        </div>

        <div class="information" v-if="carousel">
          <div class="infotitle"><b>|</b> 车辆标识物</div>
          <div class="infomain">
            <div class="item" v-show="isCarHead != 4 && isCarHead !=8 && isCarHead != 2 && isCarHead !=14">车型：{{searchResultDefault[Indexs].vehicleModel}}</div>
            <div class="item">时间：{{searchResultDefault[Indexs].passTime}}</div>
            <div class="item">位置：{{searchResultDefault[Indexs].tollgatePlace}}</div>
            <div class="item">方向：{{searchResultDefault[Indexs].direction}}</div>
          </div>

          <div class="tool">
            <div class="infotitle"><b>|</b> 操作</div>
            <div class="toolInfo">
              <span @click="changeScale('large')" title="放大"></span>
                <span @click="changeScale('small')" title="缩小"></span>
                <span @click="changeRotate()"  title="旋转"></span>
                <span @click="reduction()" title="还原"></span>
                <span @click="circulationPaly()" title="循环播放"></span>
            </div>
        </div>
        </div>
    </el-dialog>


    <form action="tvas/downloadFile/downloadImage" method="post" v-for="(item,index) in  searchResultDefault" :key="index" :id="'a'+index" v-show="false" >
      <input type="text" :value="item.tollgatePlace +'-'+ item.passTime.replace(/-/g,'').replace(' ','').replace(/:/g,'')" name="imgName">
      <input type="text" :value="item.imageUrl" name="url">
    </form>


      <form action="tvas/downloadFile/batchDownloadImage" method="post" id="downAll"  v-show="false" >
        <input type="text" :value="this.searchParams.vehicleBrandCode" name="vehicleBrandCode">
        <input type="text" :value="this.searchParams.vehicleKindCode" name="vehicleKindCode">
        <input type="text" :value="this.searchParams.vehicleModelCode" name="vehicleModelCode">
        <input type="text" :value="this.searchParams.vehicleKind" name="vehicleKind">
        <input type="text" :value="this.searchParams.vehicleBrand" name="vehicleBrand">
        <input type="text" :value="this.searchParams.vehicleFeature" name="vehicleFeature">
        <input type="text" :value="this.searchParams.vehicleModel" name="vehicleModel">
        <input type="text" :value="this.searchParams.isCarHead" name="isCarHead">
        <input type="text" :value="this.searchParams.beginDateTime" name="beginDateTime">
        <input type="text" :value="this.searchParams.endDateTime" name="endDateTime">
        <input type="text" :value="this.searchParams.tollgateIds" name="tollgateIds">
        <input type="text" value="1" name="currentPage">
        <input type="text" value="10" name="pageSize">
        <input type="text" value="pass_time" name="orderBy">
        <input type="text" value="desc" name="orderType">
        <input type="text" :value="this.dataUrl + this.otherPort" name="url">
      </form>
  </div>

  <!--</transition>-->
</template>

<script>
  import  vehicle from '../../api/vehicle/vehicle.js'
  import  carDetail from './carDetail'
  import mapFun from '../../api/vehicle/mapFun.js'
  export default {
    components:{
      carDetail
    },
    props:{
      isCarHead:{
        type:Number
      },
      searchType: {
        type: String
      },
      searchParams: {
        type: Object,
        default(){
          return {};
        }
      },
      port:{ //下载的接口
        type:String
      },
      searchResultDefault: Array,
      totalNum: Number
    },
    filters: {
      typeIndex(val){
        if(val == 100){
          return '自行车'
        }else if(val == 101){
          return '摩托车'
        }else if(val == 102){
          return '三轮车'
        }
      }
    },
    data() {
      return {
        otherPort:'',
        dataUrl:'',
        imgSearchBtn:this.$storage.getSession("305")!=null?true:false,
        firstToCityBtn: this.$storage.getSession("308")!=null?true:false,
        footHoldBtn:this.$storage.getSession("309")!=null?true:false,
        trackBackBtn:this.$storage.getSession("313")!=null?true:false,
        plateOverMuchBtn:this.$storage.getSession("310")!=null?true:false,
        drivingTogetherBtn:this.$storage.getSession("314")!=null?true:false,
        deployApplyBtn: this.$storage.getSession("317")!=null?true:false,
        loading: null,
        carousel: false,
        carouselOldIndex: -1,
        firstOpen: true,
        mask: false,
        orderByPop: 'pass_time',
        orderTypePop: 'desc',
        showCarDetail: false,
        currentItem: null,
        currentType: null,
        currentParams: null,
        Indexs:0,
        carouselElSize:0.8, //缩放大小
        carouselElRotate:0, //旋转
        timeCircul:null,
        carResult: {
          code: null,
          message: "",
          data: {
            currentPage: 0,
            pageSize: 0,
            total: 0,
            rows:[]
          }
        },
        pageSize:10,
        total:0,
        currentPage: 1, // 当前页
        totalFlag: 0, // 默认总数
        totalFaceFlag: [], // 存放人脸搜车数据
        deleteDialogVisible: false, // 默认隐藏
        color: ["red","blue","orange","pink","black","green","yellow","gray","purple"]
      }
    },
    computed:{
      imgListWH(){
        let arr = [];
        let dList = this.searchResultDefault.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
        if(dList.length){
          for(let i=0;i<dList.length;i++){
            let imgw = dList[i].imageWidth;
            let imgh = dList[i].imageHeight;
            let rate = this.$store.state.screenWidth / 1920;
            let retw = 256 * rate ;
            let reth = 170 * rate;
            let unit = 1;
            let unitTop =0
            let unitLeft = 0
            if (retw / reth < imgw / imgh) {
              arr.push("width");
              unit = imgw / retw;
              unitTop = (reth - imgh / unit)/2;
            } else {
              arr.push("height");
              unit = imgh / reth;
              unitLeft = (retw - imgw / unit)/2;
            }
            let top = unitTop + dList[i].leftTopY / unit;
            let left = unitLeft + dList[i].leftTopX / unit;
            let width = (dList[i].rightBtmX - dList[i].leftTopX) /unit;
            let height = (dList[i].rightBtmY - dList[i].leftTopY)/unit;
            setTimeout(() => {
              let imgBody = document.getElementById('imgBody_'+i)
              imgBody.style.width = width + 'px'
              imgBody.style.height = height +'px'
              imgBody.style.border = '1px solid red'
              imgBody.style.top =  top + 'px'
              imgBody.style.left = left + 'px'
            }, 200);
          }
        }
        return arr;
      },
      faceStyle (){
        let arr = [];
        let dList = this.searchResultDefault;
        // console.log(dList,888888888888888888)
        if(dList.length){
          for(let i=0;i<dList.length;i++){
            let arrItem = [];
            let face = dList[i].face;
            if(face.length){
              for(let j=0;j<face.length;j++){
                // let faceLeft = Number(face[j][0]);
                // let faceTop = Number(face[j][1]);
                if( Number(face[j][2]) < Number(face[j][0])){
                  let temp = face[j][0];
                  face[j][0]= face[j][2];
                  face[j][2] = temp;
                }
                if(Number(face[j][3]) < Number(face[j][1])){
                  let temp = face[j][1];
                  face[j][1]= face[j][3];
                  face[j][3] = temp;
                }
                let faceLeft = Number(face[j][0]) + Number(dList[i].leftTopX);// + Number(dList[i].window[0]);
                let faceTop = Number(face[j][1]) + Number(dList[i].leftTopY);// + Number(dList[i].window[1]);
                let faceWidth = Number(face[j][2]) - Number(face[j][0]);
                let faceHeight = Number(face[j][3]) - Number(face[j][1]);
                let unit = 1;
                let faceLeftPos = 0;
                let faceTopPos = 0;
                if(faceWidth< 100 && faceHeight< 100){
                  faceTopPos = (100 - faceHeight) /2;
                  faceLeftPos = (100 - faceWidth) /2;
                }else{
                  if(1 < faceWidth / faceHeight){
                    unit = faceWidth / 100;
                    faceLeftPos = 0;
                    faceTopPos = (100 - faceHeight/unit) /2;
                  }else{
                    unit = faceHeight / 100;
                    faceTopPos = 0;
                    faceLeftPos = (100 - faceWidth/unit) /2;
                  }
                }

                let temp = {
                  left: faceLeft/unit - faceLeftPos,
                  top: faceTop/unit - faceTopPos,
                  width: dList[i].imageWidth / unit,
                  height: dList[i].imageHeight / unit
                };
                arrItem.push(temp);
              }
            }
            arr.push(arrItem);
            // console.log(arr,776622662266)
          }
        }
        return arr;
      },
      faceType (){
        let arr = [];
        let listPage = this.searchResultDefault
        let dList = listPage.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize); // 做分页
        console.log(dList,888888888888888888)
        if(dList.length){
          for(let i=0;i<dList.length;i++){
            let arrItem = [];
            let face = dList[i].face;
            //let face = [[0, 10, 50, 90],[100, 200, 360, 450]];
            if(face.length){
              for(let j=0;j<face.length;j++){
                // let faceLeft = Number(face[j][0]);
                // let faceTop = Number(face[j][1]);
                if( Number(face[j][2]) < Number(face[j][0])){
                  let temp = face[j][0];
                  face[j][0]= face[j][2];
                  face[j][2] = temp;
                }
                if(Number(face[j][3]) < Number(face[j][1])){
                  let temp = face[j][1];
                  face[j][1]= face[j][3];
                  face[j][3] = temp;
                }
                let faceLeft = Number(face[j][0]) + Number(dList[i].leftTopX);// + Number(dList[i].window[0]);
                let faceTop = Number(face[j][1]) + Number(dList[i].leftTopY);// + Number(dList[i].window[1]);
                let faceWidth = Number(face[j][2]) - Number(face[j][0]);
                let faceHeight = Number(face[j][3]) - Number(face[j][1]);
                let unit = 1;
                let faceLeftPos = 0;
                let faceTopPos = 0;
                if(faceWidth< 50 && faceHeight< 50){
                  faceTopPos = (50 - faceHeight) /2;
                  faceLeftPos = (50 - faceWidth) /2;
                }else{
                  if(1 < faceWidth / faceHeight){
                    unit = faceWidth / 50;
                    faceLeftPos = 0;
                    faceTopPos = (50 - faceHeight/unit) /2;
                  }else{
                    unit = faceHeight / 50;
                    faceTopPos = 0;
                    faceLeftPos = (50 - faceWidth/unit) /2;
                  }
                }

                let temp = {
                  left: faceLeft/unit - faceLeftPos,
                  top: faceTop/unit - faceTopPos,
                  width: dList[i].imageWidth / unit,
                  height: dList[i].imageHeight / unit
                };
                arrItem.push(temp);
              }
            }
            arr.push(arrItem);
            // console.log(arr,776622662266)
          }
        }
        return arr;
      }
    },
    watch: {
    },
    mixins:[vehicle,mapFun],
    methods: {
      //单个文件下载
      downImg(index,row){
        document.getElementById('a'+index).submit();
      },
      // 添加人脸数据
      addFaceLists(item){
        if(this.totalFaceFlag.length > 0){
          var flag = false;
          for(var i = 0; i < this.totalFaceFlag.length; i++){
            if(this.totalFaceFlag[i].vehicleId == item.vehicleId){
              flag = true;
              break;
            }
          }
          if(!flag){
            this.totalFaceFlag.push(item);
            this.totalFlag = this.totalFaceFlag.length;
          }else{
            this.$notify({
              type: 'warning',
              message: '请勿重复添加',
              position: 'bottom-right',
              duration: 3000
            });
          }
        }else{
          this.totalFaceFlag.push(item);
          this.totalFlag = this.totalFaceFlag.length;
        }
      },
      // 人脸搜车数据弹出框
      faceSearchCar(){
        this.deleteDialogVisible = true
      },
      // 删除数据
      deleteFaceList(row) {
        var vehicleId = row.vehicleId;
        for(var i = 0;i < this.totalFaceFlag.length; i++){
          if(this.totalFaceFlag[i].vehicleId == vehicleId){
            this.totalFaceFlag.splice(i,1);
            this.totalFlag = this.totalFaceFlag.length
          }
        }
      },
      // 点击取消
      cancleTrack() {
        this.deleteDialogVisible = false
      },
      // 点击确定
      trackReappea() {
        if(this.totalFaceFlag.length == 0) {
          this.deleteDialogVisible = false
          return
        }
        this.deleteDialogVisible = false
        this.$emit('searchMap',false,this.totalFaceFlag)
        console.log(this.totalFaceFlag,123456789);
        // this.runLine(this.totalFaceFlag,this.color[0]);
      },
       //批量下载
      downAllImg(){
        console.log(this.searchParams,999);
        // return
        if(this.searchResultDefault.length < 1000){
          this.loading = this.$loading({
            lock: true,
            background: "rgba(255,255,255,0.4)",
            text: "正在下载..."
          });
          // if(this.searchParams.isCarHead == 0 || this.searchParams.isCarHead == 1){
            document.getElementById('downAll').submit();
          // }else {
          //   document.getElementById('downAllmor').submit();
          // }

          setTimeout(() => {
            this.loading.close();
          }, 3000);

        }else if(this.searchResultDefault.length <= 2000){
          this.loading = this.$loading({
            lock: true,
            background: "rgba(255,255,255,0.4)",
            text: "正在下载..."
          });
          // if(this.searchParams.isCarHead == 0 || this.searchParams.isCarHead == 1){
            document.getElementById('downAll').submit();
          // }else {
            // document.getElementById('downAllmor').submit();
          // }
          // document.getElementById('downAll').submit();
          setTimeout(() => {
            this.loading.close();
          }, 6000);
        }else if(this.searchResultDefault.length > 2000){
          let _this = this
              this.$myconfirm({
              type: '提示',
              msg: '数据量过大，只能下载前2000张',
              icon: 4,
              btn: {
                ok: '确定',
                no: '取消'
              }
            }).then(() => {
                _this.loading = _this.$loading({
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "正在下载..."
              });
              // if(this.searchParams.isCarHead == 0 || this.searchParams.isCarHead == 1){
                  document.getElementById('downAll').submit();
                // }else {
                //   document.getElementById('downAllmor').submit();
                // }
              // document.getElementById('downAll').submit();
              setTimeout(() => {
                _this.loading.close();
              }, 6000);
            })
            .catch(() => {
              console.log('no')
            })
        }
      },
      // 点击搜索人脸
      searchData(row,index) {
        // this.$router.push({path: '/carJudged/faceSearch?menuCode=363'})
        this.carousel = false;
        this.$emit('childbyface',row,index)
        console.log(row,8888);
      },

      //每页val条
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1
      },
      //当前页
      handleCurrentChange(val) {
        this.currentPage = val;
      },


      //切换标签
      changeTab: function (item) {
        let tabs = [ "tab1"];
        let topItem = document.getElementsByClassName('topItem');
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i] == item) {
            document.getElementById(tabs[i]).style.display = "block";
            topItem[i].style.backgroundColor = '#409EFF';
            topItem[i].style.color = 'white'
          } else {
            document.getElementById(tabs[i]).style.display = "none";
            topItem[i].style.backgroundColor = '#eee';
            topItem[i].style.color = '#000'
          }
        }
      },
      closeCarousel(){
        this.carousel = false;
      },


      closeCarDetail (isClose){
        this.showCarDetail = false;
      },

      goToSearchImg(img){
        let routeData = this.$router.resolve({ name: 'imgSearchCar', query: { imgUrl: img ,menuCode: 305}});
        window.open(routeData.href, '_blank');
      },
      goToFirstToCity(plateNo){
        if(plateNo == "@" || plateNo == "未识别"){
           this.$notify({
            type: 'warning',
            message: '未识别车牌无法参与技战法！',
            position: 'bottom-right',
            duration: 3000
          });
         // layer.alert('未识别车牌无法参与技战法！', {icon: 5, title: "消息提示"});
          return;
        }
        let routeData = this.$router.resolve({ name: 'firstToCity', query: { plateNo: plateNo ,menuCode: 308}});
        window.open(routeData.href, '_blank');
      },
      goToFootHold(plateNo){
        if(plateNo == "@" || plateNo == "未识别"){
            this.$notify({
            type: 'warning',
            message: '未识别车牌无法参与技战法！',
            position: 'bottom-right',
            duration: 3000
          });
         // layer.alert('未识别车牌无法参与技战法！', {icon: 5, title: "消息提示"});
          return;
        }
        let routeData = this.$router.resolve({ name: 'foothold', query: { plateNo: plateNo ,menuCode: 309}});
        window.open(routeData.href, '_blank');
      },
      goToTrackBack(plateNo){
        if(plateNo == "@" || plateNo == "未识别"){
           this.$notify({
            type: 'warning',
            message: '未识别车牌无法参与技战法！',
            position: 'bottom-right',
            duration: 3000
          });
         // layer.alert('未识别车牌无法参与技战法！', {icon: 5, title: "消息提示"});
          return;
        }
        let routeData = this.$router.resolve({ name: 'trackBack', query: { plateNo: plateNo ,menuCode: 313}});
        window.open(routeData.href, '_blank');
      },
      goToPlateOverMuch(plateNo){
        if(plateNo == "@" || plateNo == "未识别"){
           this.$notify({
            type: 'warning',
            message: '未识别车牌无法参与技战法！',
            position: 'bottom-right',
            duration: 3000
          });
         // layer.alert('未识别车牌无法参与技战法！', {icon: 5, title: "消息提示"});
          return;
        }
        let routeData = this.$router.resolve({ name: 'plateOverMuch', query: { plateNo: plateNo ,menuCode: 310}});
        window.open(routeData.href, '_blank');
      },
      goToDrivingTogether(plateNo){
        if(plateNo == "@" || plateNo == "未识别"){
           this.$notify({
            type: 'warning',
            message: '未识别车牌无法参与技战法！',
            position: 'bottom-right',
            duration: 3000
          });
         // layer.alert('未识别车牌无法参与技战法！', {icon: 5, title: "消息提示"});
          return;
        }
        let routeData = this.$router.resolve({ name: 'drivingTogether', query: { plateNo: plateNo ,menuCode: 314}});
        window.open(routeData.href, '_blank');
      },
      goToDeployApply(plateNo){
        if(plateNo == "@" || plateNo == "未识别"){
           this.$notify({
            type: 'warning',
            message: '未识别车牌无法申请布控！',
            position: 'bottom-right',
            duration: 3000
          });
         // layer.alert('未识别车牌无法申请布控！', {icon: 5, title: "消息提示"});
          return;
        }
        let routeData = this.$router.resolve({ name: 'deployApply', query: { plateNo: plateNo ,menuCode: 317}});
        window.open(routeData.href, '_blank');
      },
      goToAddDeploy(vehicleId,imgUrl,passTime,addr){
        let data = {
          userId: this.$storage.getSession('userInfo').userId,
          clueType: 2,
          source: 1,
          clueId: vehicleId,
          imgUrl: imgUrl,
          passTime:passTime,
          addr:addr
        };
        data = this.$qs.stringify(data);//post请求分离data
        this.$http.post('tvas/my-clue-pool/add',data).then(res=>{
          if(res.data.code == 200){
            //this.$alert("已加入线索池","消息提示");
              this.$notify({
                type: 'success',
                message: '已加入线索池！',
                position: 'bottom-right',
                duration: 3000
              });
           // layer.alert('已加入线索池！',{icon:6,title:"消息提示"});
          }else{
             this.$notify({
              type: 'error',
              message: '加入线索池失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        })
      },
      getScroll() {
        let scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        return {
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        }
      },

      // 获取鼠标在页面的位置，处理浏览器兼容性
      getPage(e) {
        let pageX = e.pageX || e.clientX + this.getScroll().scrollLeft;
        let pageY = e.pageY || e.clientY + this.getScroll().scrollTop;
        return {
          pageX: pageX,
          pageY: pageY
        }
      },
      setMaskPos(index, e){
        e = e || window.event;

        let box = document.getElementById("smallBox_"+index);

        let boxImg = box.getElementsByTagName('img')[0];  //小图
        let mask = document.getElementById("mask_"+index);  //小盒子

        let bigImage = document.getElementById("bigImg_"+index);  //大图
        let bigBox = document.getElementById("bigBox_"+index);   //大盒子


        let maskX = this.getPage(e).pageX - $(boxImg).offset().left;
        let maskY = this.getPage(e).pageY - $(boxImg).offset().top;

        maskX = maskX - mask.clientWidth / 2;
        maskY = maskY - mask.clientHeight / 2;

        maskX = maskX < 0 ? 0 : maskX;
        maskY = maskY < 0 ? 0 : maskY;

        maskX = maskX > boxImg.clientWidth - mask.clientWidth ? boxImg.clientWidth - mask.clientWidth : maskX;
        maskY = maskY > boxImg.clientHeight - mask.clientHeight ? boxImg.clientHeight - mask.clientHeight : maskY;

        mask.style.left = maskX + boxImg.offsetLeft + 'px';
        mask.style.top = maskY + boxImg.offsetTop + 'px';

        let unit = $(bigImage).width() / $(boxImg).width();

        let bigImageX = (maskX) * unit;
        let bigImageY = (maskY) * unit;

        bigImage.style.left = -bigImageX + 'px';
        bigImage.style.top = -bigImageY + 'px';
      },
      openBigBox(index){
        let smallBox = $("#smallBox_"+index),
          bigBoxNode = document.getElementById("bigBox_"+index),
          bigBox = $(bigBoxNode);
        let resultList = $(".resultList");
        let sTop = smallBox.offset().top,
          sLeft = smallBox.offset().left,
          sW = smallBox.width(),
          sH = smallBox.height(),
          winW = window.innerWidth,
          winH = window.innerHeight,
          parentTop = resultList.offset().top;
        let bW = bigBox.width() + 20,
          bH = bigBox.height() + 20;
        let bTop = sH, bLeft = 0;
        if(winH - sTop - sH< bH){
          if(sTop - parentTop < bH){
            bTop = 0;
            if(winW - sLeft -sW > bW){
              bLeft = sW;
            }else{
              bLeft = -bW;
            }
          }else{
            bTop = -bH;
          }
        }
        if(bTop){
          if(winW - sLeft -sW < bW){
            bLeft = - bW + sW;
          }
        }

        bigBoxNode.style.display = 'block';
        bigBoxNode.style.top = bTop + "px";
        bigBoxNode.style.left = bLeft + "px";

        let boxImgParent = document.getElementById("smallBox_"+index);
        let boxImg = boxImgParent.getElementsByTagName('img')[0];  //小图
        let mask = document.getElementById("mask_"+index);  //小盒子

        let bigImage = document.getElementById("bigImg_"+index);  //大图

        let maskW = bigBox.width() * $(boxImg).width()/$(bigImage).width();
        let maskH = bigBox.height() * $(boxImg).height()/$(bigImage).height();
        mask.style.width = maskW + 'px';
        mask.style.height = maskH + 'px';

      },
      closeBigBox(index){
        document.getElementById("bigBox_"+index).style.display = 'none';
      },

      redBorderStyle(i,obj){
        let imgBox = document.getElementById("cImg_"+i);
        let imgs = document.getElementById("cImgItem_"+i);
        let redBorder = document.getElementById("cImgRedBorder_"+i);

        let imgw = obj.imageWidth;
        let imgh = obj.imageHeight;
        let retw = imgBox.clientWidth;
        let reth = imgBox.clientHeight;
        let unit = 1;
        let unitTop = 0;
        let unitLeft = 0;

        if (retw / reth < imgw / imgh) {
          imgs.style.width = "100%";
          unit = imgw / retw;
          unitTop = (reth - imgh / unit)/2;
        } else {
          imgs.style.height = "100%";
          unit = imgh / reth;
          unitLeft = (retw - imgw / unit)/2;
        }

        let top = unitTop + obj.leftTopY / unit;
        let left = unitLeft + obj.leftTopX / unit;
        let width = (obj.rightBtmX - obj.leftTopX) /unit;
        let height = (obj.rightBtmY - obj.leftTopY)/unit;

        redBorder.style.top = top+"px";
        redBorder.style.left = left+"px";
        redBorder.style.width = width+"px";
        redBorder.style.height = height+"px";

        let faceList = document.getElementById("faceList_"+i);
        faceList.style.top = unitTop + "px";
        faceList.style.right = unitLeft + "px";
      },
      openCarousel(){
        this.$nextTick(function () {
          if(this.data.length && this.firstOpen){
            this.redBorderStyle(0, this.searchResultDefault[0]);
            this.$refs["carouselEl"].setActiveItem(0);
            this.carouselOldIndex = 0;
            this.firstOpen = false;
          }
        });
      },
      showCarousel(index){
        this.Indexs = index
        if(index == this.carouselOldIndex){
          //打开的是上次打开的图片
          this.carousel = true;
          return;
        }
        if(this.firstOpen){
          this.carousel = true;
          this.$nextTick(function () {
            setTimeout(()=>{
              this.redBorderStyle(index, this.searchResultDefault[index]);
              this.$refs["carouselEl"].setActiveItem(index);
              this.carouselOldIndex = index;
              this.reduction()
              // this.changeLeft()
            }, 100);
          });
          this.firstOpen = false;
        }else{
          this.carousel = true;
          this.redBorderStyle(index, this.searchResultDefault[index]);
          this.$refs["carouselEl"].setActiveItem(index);
          this.carouselOldIndex = index;
          this.reduction()
          // this.changeLeft()
        }
      },
      setActiveItem(index){
        clearInterval(this.timeCircul)
        this.Indexs = index
        this.$refs["carouselEl"].setActiveItem(index);
        // this.changeLeft()
      },
      changeActive(newIndex, oldIndex){
        this.Indexs = newIndex
        // this.changeLeft()
        if(!this.$refs["carouselEl"]){
          this.$nextTick(function () {
            this.redBorderStyle(newIndex, this.searchResultDefault[newIndex]);
            this.$refs["carouselEl"].setActiveItem(newIndex);
          });
        }else{
          this.redBorderStyle(newIndex, this.searchResultDefault[newIndex]);
          this.$refs["carouselEl"].setActiveItem(newIndex);
        }
      },

      //改变缩略图的left值
      changeLeft(){
        if(this.Indexs > 3){
          this.$refs.bottomItem.style.left = -(this.Indexs - 3) + 'rem'
        }else{
          this.$refs.bottomItem.style.left = 0
        }
      },
      //放大缩小图片
      changeScale(state){
        clearInterval(this.timeCircul)
        if(state == 'large'){
          if(this.carouselElSize >0.9){
            return
          }
          this.carouselElSize +=  0.1
        }
        if(state == 'small'){
          if(this.carouselElSize < 0.4){
            return
          }
          this.carouselElSize -=  0.1
        }
        document.getElementById('carouselEl').style.transform = 'rotateZ('+this.carouselElRotate+'deg) scale('+ this.carouselElSize +')'
      },

      //旋转图片
      changeRotate(){
        clearInterval(this.timeCircul)
         this.carouselElRotate += 90
         document.getElementById('carouselEl').style.transform = 'rotateZ('+this.carouselElRotate+'deg) scale('+ this.carouselElSize +')'
      },

      //还原
      reduction(){
        clearInterval(this.timeCircul)
        this.carouselElSize = 0.8
        this.carouselElRotate = 0
        document.getElementById('carouselEl').style.transform = 'rotateZ(0deg) scale(0.8)'
      },
       //循环
      circulationPaly(){
        clearInterval(this.timeCircul)
        this.timeCircul = setInterval(()=>{
          this.$refs["carouselEl"].next();
        },2000)
      },

    },
    mounted() {
      this.dataUrl = window.origin
      this.currentPage = 1;
      this.pageSize = 10;
      console.log(this.totalNum,222211111)
      let _this = this;
      document.onkeydown = function(e){
        if(e.key == "ArrowLeft" && _this.carousel){
          if(!_this.$refs["carouselEl"]){
            _this.$nextTick(function () {
              _this.$refs["carouselEl"].prev();
            });
          }else{
            _this.$refs["carouselEl"].prev();
          }

        }
        if(e.key == "ArrowRight" && _this.carousel){
          if(!_this.$refs["carouselEl"]){
            _this.$nextTick(function () {
              _this.$refs["carouselEl"].next();
            });
          }else{
            _this.$refs["carouselEl"].next();
          }
        }
      };
      //滚轮放大缩小
      document.onmousewheel = function(e){
        if(e.wheelDelta == 120  && _this.carousel){
          clearInterval(_this.timeCircul)
          _this.changeScale('large')
        }else if(e.wheelDelta == -120  && _this.carousel){
          clearInterval(_this.timeCircul)
          _this.changeScale('small')
        }
      };
    }
  }

</script>

<style scoped>
@import '../../assets/css/searchCar.css';
@import '../../assets/css/commom.css';
  .searchDetail {
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;
    /* background-color: #f9fafb; */
    transition: all 1s;
    /* border: 1px solid #dcdfe6;
    border-top:none; */
     border: 1px solid #36506d;
    background-color: rgba(16, 35, 56, 0.5);
  }
  .searchDetail a{
    text-decoration:underline;
  }
 .searchDetail .detailTitle{
   color:#c0c0c0
 }
 .detailTop .el-button{
    margin-right:0.3rem;
    padding: 0.1rem 0.2rem;
 }
  .resultList{
    flex: 1;
    display:flex;
    flex-direction: column;
  }
  .resultList .detailMid {
    width: 100%;
      padding: 0.06rem 0.3rem 0 0.3rem;
    height: 100%;
    overflow-y: auto;
  }

  .dataWrap{
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .dataWrap table {
    margin:0.2rem;
    width: 30%;
    text-align: center;
    border-collapse: collapse;
    font-size: 0.14rem;
    color: #606266;
    border-color: grey;
  }

  .dataWrap tr:nth-child(2n+1), .dataWrap tr:hover {
    background-color: #f7f9fa;
  }
  .searchData{
    z-index: 2;
    width: 0.3rem;
    height: 0.3rem;
    text-align: center;
    border: 1px solid #f7f9fa;
    font-size: 20px;
    color: #409eff;
    position: absolute;
    top: 0;
    right: 0px;
    cursor: pointer;
  }
  .dataWrap td {
    border: 1px solid #dedfe0;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 0.36rem;
    font-size: 0.14rem;
    color:#808080;
  }
  .dataWrap td a{
    color:#64acff;
  }

  .dataWrap th {
    display: table-cell;
    border: 1px solid #cdcdcd;
    white-space: nowrap;
    overflow: hidden;
    padding: 0.16rem 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    background-color: #ecf0f3;
    color: #545454;
    text-align: center;
    font-size: 0.16rem;
  }
  .resultTitle{
    height: 0.5rem;
    padding-left: 0.2rem;
    line-height: 0.5rem;
    font-size: 0.18rem;
    color: white;
    background-color: #409EFF;
  }
  .detailTop {
    display:flex;
    align-items: center;
    padding-left: 2%;
    height: 0.64rem;
    position: relative;
    /* border-bottom: 1px solid #dcdfe6;
    box-shadow: 0 0 1px #cdcdcd; */
    border-bottom: 1px solid #1f3b50;
    border-top: 1px solid #264565;
     background-color: rgba(19, 41, 66, .9);
    justify-content: space-between
  }
  /* .detailTop .topItem {
    width: 18%;
    height: 0.38rem;
    background-color: #EEEEEE;
    text-align: center;
    line-height: 0.38rem;
    font-size: 0.16rem;
    border-radius: 0.05rem;
    cursor: pointer;
  } */
  .detailTop .topItem {
    width: 18%;
    height: 0.38rem;
    background-color: #132f4c;
    text-align: center;
    line-height: 0.38rem;
    font-size: 0.16rem;
    border-radius: 0.05rem;
    cursor: pointer;
    border: 1px solid #235588;
    border-radius: 3px
  }
  .detailTop .topSearch {
    position: absolute;
    right: 0.35rem;
    top: 0.32rem;
    font-size: 0.14rem;
    line-height: 2;
  }

  .topSearch1{
    align-items: center;
    height: 0.4rem;
    background-color: #F6F7FB;
    color: #303133;
    padding-left: 0.2rem;
    font-size: 0.16rem;
    line-height: 0.4rem;
    border-bottom: 1px solid #dcdfe6;
  }
  .topSearch1 .el-button{
    float: right;
    padding: 0 0.15rem;
    line-height: 0.25rem;
    margin-top: 0.06rem;
    margin-right: 0.9rem;
    font-size: 0.12rem;
  }
  .topSearch1  .orderWay{
    margin-right: 0.2rem;
  }
  .topSearch1 select{
    padding:2px;
    width: 1rem;
  }

  .orderWay {
    display: inline-block;
    margin-right:  0.2rem;
  }

  .orderSlt {
    font-size: 0.14rem;
    /*height: 0.22rem;*/
    border: 1px solid #E6E8ED;
  }

  .detailTop .topSearch >>> .el-radio__label{
    font-size: 0.14rem;
    padding-left: 0.1rem;
  }


  .nodata{
    text-align: center;
  }

  .carsList{
    flex: 1;
    display:flex;
    flex-wrap: wrap;
    font-size: 0.14rem;
  }
  .carsDetail {
    display:inline-block;
    box-sizing: content-box;
    width: 2.56rem;
    min-width: 183px;
    margin: 0.06rem 0.12rem;
    position: relative;
    /* border: 1px solid #c9cacd; */
    /* background:#f0f2f7; */
     background:url('../../assets/images/carJudged/carbg.png') center no-repeat ;
    background-size: 100% 100%;
    color:#99c9fa ;
    padding-bottom: 0.04rem;
    padding-top: 0.04rem;
  }

  .carsPicture {
    position: relative;
    width: 2.56rem;
    min-width: 183px;
    height: 1.70rem;
    text-align: center;
    overflow: hidden;
  }
  .carsPicture img{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .carsPicture .width{
    width: 100%;
  }
  .carsPicture .height{
    height: 100%;
  }
  .carsPicture:hover .mask{
    display:block;
  }
  .carsMessage {
    width: 100%;
    height: 1.28rem;
    min-height:100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color:#99c9fa ;
  }

  .carsMessageTxt {
    width: 100%;
    font-size: 0.12rem;
    line-height: 16px;
    height:16px;
    padding-left: 0.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .carsMessageTxt span:first-child{
    color:#99c9fa ;
  }
  .carsMessage .plateno, .carsMessage .tollgatep{
    color: #fdb04d;
  }

  .el-dialog__wrapper >>> .el-dialog__header {
    padding: 0.1rem 0.2rem;
    background: #f3f6f8;
     border-bottom: 1px solid #13436E;
    /* box-shadow: 0 1px 1px #cdcdcd; */
    font-size: 0.18rem;
    line-height: 0.32rem;
  }
  .el-dialog__wrapper >>> .el-dialog__title{
    font-size: 0.18rem;
  }
  .el-dialog__wrapper >>> .el-dialog__headerbtn{
    top: 0.2rem;
    right: 0.2rem;
    font-size: 0.16rem;
  }
  .el-dialog__wrapper >>>.el-dialog .el-dialog__body{
      padding:0 !important;
    border: 1px solid #13436E;
    margin:0.2rem;
     background-color: rgba(16, 35, 56, 0.5);
    position: relative;
    /* background: #e7eef1; */
    position: relative;
     line-height: 0.24rem !important;
  }


  .opr{
    display:inline-block;
    width:0.17rem;
    height:0.17rem;
    margin-right: 2px;
    vertical-align: middle;
    cursor: pointer;
  }
  .opr1{
    background:url(../../assets/images/carJudged/opr_1.png) no-repeat center center;
  }
  .opr2{
    background:url(../../assets/images/carJudged/opr_2.png) no-repeat center center;
  }
  .opr3{
    background:url(../../assets/images/carJudged/opr_3.png) no-repeat center center;
  }
  .opr4{
    background:url(../../assets/images/carJudged/opr_4.png) no-repeat center center;
  }
  .opr5{
    background:url(../../assets/images/carJudged/opr_5.png) no-repeat center center;
  }
  .opr6{
    background:url(../../assets/images/carJudged/opr_6.png) no-repeat center center;
  }
  .opr7{
    background:url(../../assets/images/carJudged/opr_7.png) no-repeat center center;
  }
  .opr8{
    background:url(../../assets/images/carJudged/opr_8.png) no-repeat center center;
  }
  .opr9{
    background:url(../../assets/images/carJudged/down.png) no-repeat center center;
  }

  .pageNation {
    position: absolute;
    /* margin-top:0.2rem; */
    height: 0.5rem;
    display: flex;
    justify-content: flex-end;
    margin-right: 0.2rem;
    align-items: center;
    bottom: 0;
    right: 45px;
  }

  .bigBox{
    display:none;
    box-sizing: border-box;
    position: absolute;
    z-index:3;
    width:4rem;
    height:4rem;
    /*margin: 10px;*/
    border: 10px solid #fff;
    border-radius:0.1rem;
    background: #fff;
    overflow:hidden;
  }
  .bigBox img {
    position: absolute;
    /*width:1200px;*/
  }
  .mask{
    display: none;
    position:absolute;
    width: 40px;
    height: 40px;
    top:0;
    left:0;
    background:rgba(255,255,255,0.5);
    cursor: move;
  }
  .carouselImg{
    position: relative;
    height: 6rem;
    overflow: hidden;
  }
  .carouselImg img{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin: auto;
  }
  .carouselImg .carsRedBorder{
    position: absolute;
    border:1px solid red;
  }


  .facelist{
    position: absolute;
    width: 102px;
    right: 47px;
  }
  .faceItem{
    display:block;
    position:relative;
    width:100px;
    height:100px;
    border:1px solid #fff;
    margin-bottom: 0.05rem;
    background:#fff;
    overflow: hidden;
  }
  .facePic{
    position: relative;
    width: 52px;
  }
  .faceNum{
    display:block;
    position: relative;;
    width:50px;
    height:50px;
    border:1px solid #fff;
    margin-bottom: 0.05rem;
    background:#fff;
    overflow: hidden;
    margin-left:1.82rem;
  }
  .faceNum img{
    position: absolute;
    right:auto;
    bottom:auto;
    margin:0;
  }
  .faceItem img{
    position: absolute;
    right:auto;
    bottom:auto;
    margin:0;
  }
  /* .searchDetail >>> .el-dialog__wrapper{
    position: absolute;
  } */
  /* .searchDetail >>> .el-dialog{
    margin-top: vh !important;
  } */
.searchDetail .el-dialog__wrapper /deep/ .el-dialog {
  margin-top: 1.4rem !important;
}
.boderShow{
  position: absolute;
  z-index: 2;
}
 .toolInfo{
    background: transparent;
  }
  .toolInfo{
  line-height: 0.5rem;
}
.toolInfo span{
  display: inline-block;
  width: 0.3rem;
  height: 0.3rem;
  background-size: 100% 100%;
  cursor: pointer;
  margin-right: 0.1rem;
  margin-top: 0.2rem;
}
.toolInfo span:nth-child(1){
  background: url('../../assets/images/carJudged/small/big.png') no-repeat center center;
}
.toolInfo span:nth-child(1):hover{
  background: url('../../assets/images/carJudged/small/bighover.png') no-repeat center center;
}
.toolInfo span:nth-child(2){
  background: url('../../assets/images/carJudged/small/small.png') no-repeat center center;
}
.toolInfo span:nth-child(2):hover{
  background: url('../../assets/images/carJudged/small/smallhover.png') no-repeat center center;
}
.toolInfo span:nth-child(3){
  background: url('../../assets/images/carJudged/small/right.png') no-repeat center center;
}
.toolInfo span:nth-child(3):hover{
  background: url('../../assets/images/carJudged/small/righthover.png') no-repeat center center;
}
.toolInfo span:nth-child(4){
  background: url('../../assets/images/carJudged/small/normal.png') no-repeat center center;
}
.toolInfo span:nth-child(4):hover{
  background: url('../../assets/images/carJudged/small/normalhover.png') no-repeat center center;
}
.toolInfo span:nth-child(5){
  background: url('../../assets/images/carJudged/small/circul.png') no-repeat center center;
}
.toolInfo span:nth-child(5):hover{
  background: url('../../assets/images/carJudged/small/circulhover.png') no-repeat center center;
}
.addFace{
  position: absolute;
  right: 15px;
  bottom: 0.25rem;
  font-size: 16px;
  cursor: pointer;
}
.addBasket{
  position: absolute;
  width: 0.3rem;
  height: 0.3rem;
  bottom: 0.7rem;
  border-radius: 0.09rem;
  right: 0.27rem;
  background-color:#fff;
  cursor: pointer
}
.addBasket .el-icon-present{
  width: 100%;
  height: 100%;
}
.NumFlag{
  position: absolute;
  top: 6px;
  right: 11px;
}
.skipTrack{
  position: absolute;
  bottom: 1.1rem;
  right: 0.2rem;
  border-radius: 5px;
}
</style>
