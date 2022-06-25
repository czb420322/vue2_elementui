<template>
  <!--<transition name="fade">-->
    <!-- 非机动车 -->
    <div class="searchDetail">
      <div  class="detailTop">
          <div class="topSearch">
            <div class="orderWay" style="display: none;">
              <span>排序方式:</span>
              <select name="" class="orderSlt" v-model="orderByPop">
                <option value="pass_time">时间</option>
                <option value="plate_no">车牌</option>
                <option value="tollgatePlace">位置</option>
                <option value="vehicleModel">型号</option>
                <option value="direction">方向</option>
              </select>
            </div>
            <el-button type="primary" @click="downAllImg" class="searchBtn"><span class="el-icon-download" ></span>批量下载</el-button>
            <el-radio v-model="orderTypePop" label="desc" @change="refreshData">倒序</el-radio>
            <el-radio v-model="orderTypePop" label="asc" @change="refreshData">顺序</el-radio>


          </div>
      </div>
      <ul class="resultList">
        <li id='tab1' class="detailMid">
          <div class="carsList">

            <div class="carsDetail" v-for="(item,index) in srD.data.rows" :key="index">
              <!-- <el-button type='primary' @click="downImg(index,item)">下载</el-button> -->
              <div :id="'smallBox_'+index" class="carsPicture" @mouseover="openBigBox(index);setMaskPos(index,$event)" @mousemove="setMaskPos(index,$event)" @click="showCarousel(index)" @mouseout="closeBigBox(index)">
                <b :id="'img_'+index" class="boderShow"></b>
                <img :class="imgListWH[index]" :src="item.imgUrl" alt="loading">
                <span :id="'mask_'+index" class="mask"></span>
              </div>
              <div :id="'bigBox_'+index" class="bigBox"><img :id="'bigImg_'+index"  :src="item.imgUrl" alt="loading"></div>
              <div class="carsMessage">
                <!-- <div class="carsMessageTxt"><span>车&nbsp;&nbsp;牌&nbsp;: &nbsp;</span><span class="plateno" :title="item.plateNo == '@'?'未识别':item.plateNo">{{item.plateNo == '@'?'未识别':item.plateNo}}</span></div> -->
                <div class="carsMessageTxt" v-show="!item.isCarHead"><span>车&nbsp;&nbsp;型&nbsp;: &nbsp;</span><span :title="item.vehicleModel">{{item.vehicleModel}}</span></div>
                <div class="carsMessageTxt"><span>时&nbsp;&nbsp;间&nbsp;: &nbsp;</span><span :title="item.passTime">{{item.passTime}}</span></div>
                <div class="carsMessageTxt"><span>位&nbsp;&nbsp;置&nbsp;: &nbsp;</span><span class="tollgatep" :title="item.tollgatePlace">{{item.tollgatePlace}}</span></div>
                <div class="carsMessageTxt"><span>方&nbsp;&nbsp;向&nbsp;: &nbsp;</span><span :title="item.direction">{{item.direction}}</span></div>
                <div class="carsMessageTxt">
                  <span>快捷操作&nbsp;:</span>
                  <span class="opr opr2" title="下载"  @click="downImg(index,item)"></span>
                  <span class="opr opr1" title="以图搜车" @click="goToSearchImg(item.imgUrl)"></span>
                </div>
              </div>
            </div>
            <div class="nodata" v-if="!srD.data.rows.length"> 暂无数据</div>
          </div>
          <div class="pageNation">
            <el-pagination
              :background=true
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="Number(srD.data.pageNo)"
              :page-sizes="[10, 20, 30, 40, 50, 100]"
              :page-size="Number(srD.data.pageSize)"
              layout="total, sizes, prev, pager, next, jumper"
              :total="Number(srD.data.total)">
            </el-pagination>
            </div>
        </li>


      </ul>
      <!-- <car-detail :isShow="showCarDetail" :type="currentType" :carParams="currentParams" :carResult="carResult" @closeCarDetail="closeCarDetail"></car-detail> -->
      <el-dialog
        title="图片信息"
        :visible.sync="carousel"
        width="14rem"
        :modal-append-to-body="false"
        @close="closeCarousel">
        <el-carousel ref="carouselEl" id="carouselEl" height="7rem" arrow="never" :autoplay="false" indicator-position="none" @change="changeActive">
          <el-carousel-item v-for="(item,index) in srD.data.rows" :key="index">
            <div class="carouselImg" :id="'cImg_'+index">
              <img :id="'cImgItem_'+index" :src="item.imgUrl" />
              <div class="facelist" :id="'faceList_'+index">
                <span class="faceItem" v-for="(faceItem,index) in faceStyle[index]" :key="index"><img :style="{'top':-faceItem.top+'px', 'left': -faceItem.left+'px'}" :width="faceItem.width" :height="faceItem.height" :src="item.imgUrl" /></span>
              </div>
              <span :id="'cImgRedBorder_'+index" class="carsRedBorder"></span>
            </div>
          </el-carousel-item>
        </el-carousel>

        <div class="bottomWarp">
          <div class="bottomItem" ref="bottomItem">
            <div class="carouseItem" :class="{ONcarouseItem:index == Indexs}" v-for="(item,index) in srD.data.rows" :key="index">
              <img :src="item.imgUrl" @click="setActiveItem(index)">
            </div>
          </div>
        </div>

        <div class="information" v-if="carousel">
           <div class="infotitle"><b>|</b> 车辆标识物</div>
           <div  class="infomain">
             <div class="item">车型：{{srD.data.rows[Indexs].vehicleModel}}</div>
            <div class="item">时间：{{srD.data.rows[Indexs].passTime}}</div>
            <div class="item">位置：{{srD.data.rows[Indexs].tollgatePlace}}</div>
            <div class="item">方向：{{srD.data.rows[Indexs].direction}}</div>
           </div>
           <div class="tool">
              <div class="infotitle"><b>|</b> 操作</div>
              <div class="toolInfo">
                <span @click="changeScale('large')" title="放大"></span>
                <span @click="changeScale('small')" title="缩小"></span>
                <span @click="changeRotate()"  title="旋转"></span>
                <span @click="reduction()" title="还原"></span>
                <span @click="circulationPaly()" title="循环播放"></span>
                <!-- <el-button @click="changeScale('large')" title="放大"></el-button>
                <el-button @click="changeScale('small')"  title="缩小"></el-button>
                <el-button @click="changeRotate()"  title="旋转"></el-button>
                <el-button @click="reduction()"  title="还原"></el-button>
                <el-button @click="circulationPaly()"  title="循环播放"></el-button> -->
              </div>
            </div>

        </div>

      </el-dialog>

      <!-- 单个下载 -->
        <form action="tvas/downloadFile/downloadImage" method="post" v-for="(item,index) in  srD.data.rows" :id="'a'+index" v-show="false" :key="index">
          <input type="text" :value="item.tollgatePlace +'-'+ item.passTime.replace(/-/g,'').replace(' ','').replace(/:/g,'')" name="imgName">
          <input type="text" :value="item.imgUrl" name="url">
        </form>


        <!-- 批量下载 -->
        <form action="tvas/downloadFile/batchDownloadImage" method="post" id="downAll"  v-show="false" >
          <input type="text" :value="this.searchParams.vehicleKind" name="vehicleKind">
          <input type="text" :value="this.searchParams.timeType" name="timeType">
          <input type="text" :value="this.searchParams.beginDateTime" name="beginDateTime">
          <input type="text" :value="this.searchParams.endDateTime" name="endDateTime">
          <input type="text" :value="this.searchParams.beginDate" name="beginDate">
          <input type="text" :value="this.searchParams.endDate" name="endDate">
          <input type="text" :value="this.searchParams.beginTime" name="beginTime">
          <input type="text" :value="this.searchParams.endTime" name="endTime">
          <input type="text" :value="this.searchParams.tollgateIds" name="tollgateIds">
          <input type="text" value="1" name="pageNo">
          <input type="text" value="10" name="pageSize">
          <input type="text" value="pass_time" name="orderBy">
          <input type="text" value="desc" name="orderType">
          <input type="text" :value="this.dataUrl+'/tvas/common/bicycle/kind/query'" name="url">
        </form>

    </div>
  <!--</transition>-->
</template>

<script>
  import  vehicle from '../../api/vehicle/vehicle.js'
  // import  carDetail from './carDetail'
  export default {
    components:{
      // carDetail
    },
    props:{
      searchType: {
        type: String
      },
      searchParams: {
        type: Object,
        default(){
          return {};
        }
      },
      searchResultDefault: {
        type: Object,
        default(){
          return {
            code: null,
            message: "",
            data: {
              pageNo: 0,
              pageSize: 0,
              total: 0,
              rows:[]
            }
          };
        }
      },
    },
    data() {
      return {
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

        actualPageSize: 210,
        actualPageNo: 1,
        pageNo: 1,
        pageSize: 42,
        total: 0,
        showCarDetail: false,
        currentType: null,
        currentParams: null,
        carResult: {
          code: null,
          message: "",
          data: {
            pageNo: 0,
            pageSize: 0,
            total: 0,
            rows:[]
          }
        },
        srD: {
          code: null,
          message: "",
          data: {
            pageNo: 0,
            pageSize: 0,
            total: 0,
            rows: []
          },
        },
        Indexs:0,
        carouselElSize:0.8, //缩放大小
        carouselElRotate:0, //旋转
        mororTimeCircul:null, //定时器
        dataUrl:'',
      }
    },
    computed:{
      imgListWH(){
        let arr = [];
        let dList = this.srD.data.rows;
        if(dList.length){
          for(let i=0;i<dList.length;i++){
            // console.log(dList[i]);
            let imgw = dList[i].imageWidth;
            let imgh = dList[i].imageHeight;
            let rate = this.$store.state.screenWidth / 1920;
            console.log(rate);
            let retw = 256 * rate;
            let reth = 178 * rate;
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
              let bbb = document.getElementById('img_'+i)
              bbb.style.width =width + 'px'
              bbb.style.height =height +'px'
              bbb.style.border = '1px solid red'
              bbb.style.top =  top + 'px'
              bbb.style.left = left + 'px'

            }, 100);
          }
        }
        return arr;
      },


      faceStyle (){
        let arr = [];
        let dList = this.srD.data.rows;
        if(dList.length){
          for(let i=0;i<dList.length;i++){
            let arrItem = [];
            let face = dList[i]
            if(face.length){
              for(let j=0;j<face.length;j++){
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

                let faceLeft = Number(face[j][0]) + Number(dList[i].leftTopX) ;//+ Number(dList[i].window[0]);
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
          }
        }
        return arr;
      }


    },
    watch:{
      searchResultDefault:{
        handler(newValue,oldValue){
          this.orderTypePop = this.searchParams.orderType;
          this.srD = newValue;
        },
        deep:true
      },
      bodyWidth(val){
        this.bodyWidth = val
      }
    },

    mixins:[vehicle],

    methods: {
      //每页val条
      handleSizeChange(val) {
        //this.srD.data.pageSize = val;
        //this.srD.data.pageNo = 1;
        let dataParams = this.searchParams;
        dataParams.pageNo = 1;
        dataParams.pageSize = val;
        dataParams.orderType = this.orderTypePop;

        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.getVD(this.searchType, dataParams,(res)=>{
          this.transValue(res.data, this.srD);
          if(this.srD.data.rows.length === 0 ) {
              this.$notify({
                        type: 'info',
                        message: '抱歉，未查询到符合条件的数据！',
                        position: 'bottom-right',
                        duration: 3000
                      });
           // layer.alert('抱歉，未查询到符合条件的数据！', {icon: 5, title: "消息提示"});
          }
        });
      },
      //当前页
      handleCurrentChange(val) {
        //this.srD.data.pageNo = val;
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        let dataParams = this.searchParams;
        dataParams.pageNo = val;
        dataParams.pageSize = this.srD.data.pageSize;
        dataParams.orderType = this.orderTypePop;
        this.getVD(this.searchType, dataParams,(res)=>{
          this.transValue(res.data, this.srD);
          if(this.srD.data.rows.length === 0 ) {
              this.$notify({
                        type: 'info',
                        message: '抱歉，未查询到符合条件的数据！',
                        position: 'bottom-right',
                        duration: 3000
                      });
           // layer.alert('抱歉，未查询到符合条件的数据！', {icon: 5, title: "消息提示"});
          }
        });
      },


      //重新获取数据
      refreshData (val){
        let dataParams = this.searchParams;
        dataParams.pageNo = 1;
        dataParams.pageSize = 10;
        dataParams.orderType = this.orderTypePop;
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.getVD(this.searchType, dataParams,(res)=>{
          this.transValue(res.data, this.srD);
          if(this.srD.data.rows.length === 0 ){
              this.$notify({
                        type: 'info',
                        message: '抱歉，未查询到符合条件的数据！',
                        position: 'bottom-right',
                        duration: 3000
                      });
           // layer.alert('抱歉，未查询到符合条件的数据！', {icon: 5, title: "消息提示"});
          }
        });
        this.pageNo = 1;
        this.pageSize = 42;
        this.actualPageSize = 210;
        this.actualPageNo = 1;
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
        //  layer.alert('未识别车牌无法参与技战法！', {icon: 5, title: "消息提示"});
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
        //  layer.alert('未识别车牌无法参与技战法！', {icon: 5, title: "消息提示"});
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
        //  layer.alert('未识别车牌无法参与技战法！', {icon: 5, title: "消息提示"});
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
        //  layer.alert('未识别车牌无法申请布控！', {icon: 5, title: "消息提示"});
          return;
        }
        let routeData = this.$router.resolve({ name: 'deployApply', query: { plateNo: plateNo ,menuCode: 317}});
        window.open(routeData.href, '_blank');
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
      closeCarousel(){
        clearInterval(this.mororTimeCircul)
        this.carousel = false;
      },
      showCarousel(index){
        this.Indexs = index
        this.carousel = true;
        setTimeout(()=>{
          this.redBorderStyle(index, this.srD.data.rows[index]);
          this.$refs["carouselEl"].setActiveItem(index);
          this.reduction()
          // this.changeLeft()
        }, 100);
      },
      setActiveItem(index){
        clearInterval(this.mororTimeCircul)
        this.Indexs = index
        this.$refs["carouselEl"].setActiveItem(index);
        // this.changeLeft()
      },
      changeActive(newIndex, oldIndex){
        this.Indexs = newIndex
        // this.changeLeft()
        if(!this.$refs["carouselEl"]){
          this.$nextTick(function () {
            this.redBorderStyle(newIndex, this.srD.data.rows[newIndex]);
            this.$refs["carouselEl"].setActiveItem(newIndex);
          });
        }else{
          this.redBorderStyle(newIndex, this.srD.data.rows[newIndex]);
          this.$refs["carouselEl"].setActiveItem(newIndex);
        }
      },

      //跳转到以图搜车的页面
      goToSearchImg(img){
        let routeData = this.$router.resolve({ name: 'imgSearchCar', query: { imgUrl: img ,menuCode: 305}});
        window.open(routeData.href, '_blank');
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
        clearInterval(this.mororTimeCircul)
        if(state == 'large'){
          if(this.carouselElSize > 0.9){
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
        clearInterval(this.mororTimeCircul)
         this.carouselElRotate += 90
         document.getElementById('carouselEl').style.transform = 'rotateZ('+this.carouselElRotate+'deg) scale('+ this.carouselElSize +')'
      },

      //还原
      reduction(){
        clearInterval(this.mororTimeCircul)
        this.carouselElSize = 0.8
        this.carouselElRotate = 0
        document.getElementById('carouselEl').style.transform = 'rotateZ(0deg) scale(0.8)'
      },
      //循环播放
      circulationPaly(){
        clearInterval(this.mororTimeCircul)
        this.mororTimeCircul = setInterval(()=>{
          this.$refs["carouselEl"].next();
        },2000)
      },

      //下载图片
      downImg(index,row){
        document.getElementById('a'+index).submit();
      },
      //批量下载
      downAllImg(){
        if(this.srD.data.total < 1000){
          this.loading = this.$loading({
            lock: true,
            background: "rgba(255,255,255,0.4)",
            text: "正在下载..."
          });
          document.getElementById('downAll').submit();
          setTimeout(() => {
            this.loading.close();
          }, 3000);

        }else if(this.srD.data.total <= 2000){
          this.loading = this.$loading({
            lock: true,
            background: "rgba(255,255,255,0.4)",
            text: "正在下载..."
          });
          document.getElementById('downAll').submit();
          setTimeout(() => {
            this.loading.close();
          }, 6000);
        }else if(this.srD.data.total > 2000){
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
              document.getElementById('downAll').submit();
              setTimeout(() => {
                _this.loading.close();
              }, 6000);
            })
            .catch(() => {
              console.log('no')
            })
          // layer.open({
          //   content: '数据量过大，只能下载前2000张',
          //   icon: 7,
          //   btn: ['确定', '取消'],
          //   yes: function(index, layero){
          //     _this.loading = _this.$loading({
          //       lock: true,
          //       background: "rgba(255,255,255,0.4)",
          //       text: "正在下载..."
          //     });
          //     document.getElementById('downAll').submit();
          //     layer.close(index);
          //     setTimeout(() => {
          //       _this.loading.close();
          //     }, 6000);
          //   },
          // });
        }
      },


    },
    mounted() {
      let _this = this;
      this.dataUrl = window.origin
      this.srD = this.searchResultDefault;

      //键盘左右移动
      document.onkeydown = function(e){
        if(e.key == "ArrowLeft" && _this.carousel){
          clearInterval(_this.mororTimeCircul)
          if(!_this.$refs["carouselEl"]){
            _this.$nextTick(function () {
              _this.$refs["carouselEl"].prev();
            });
          }else{
            _this.$refs["carouselEl"].prev();
          }
        }
        if(e.key == "ArrowRight" && _this.carousel){
          clearInterval(_this.mororTimeCircul)
          if(!_this.$refs["carouselEl"]){
            _this.$nextTick(function () {
              _this.$refs["carouselEl"].next();
            });
          }else{
            _this.$refs["carouselEl"].next();
          }
        }
      }
      //滚轮放大缩小
      document.onmousewheel = function(e){
        if(e.wheelDelta == 120  && _this.carousel){
          clearInterval(_this.mororTimeCircul)
          _this.changeScale('large')
        }else if(e.wheelDelta == -120  && _this.carousel){
          clearInterval(_this.mororTimeCircul)
          _this.changeScale('small')
        }
      }


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
    background-color: rgba(16, 35, 56, 0.5);
    transition: all 1s;
    border: 1px solid #36506d;
    border-top:none;
  }
  .searchDetail a{
    text-decoration:underline;
  }
  .resultList{
    flex: 1;
    display:flex;
    flex-direction: column;
  }
  .resultList .detailMid {
    width: 100%;
    padding: 0.12rem 0.3rem;
    height: 100%;
    overflow-y: auto;
  }

  .dataWrap{
    display:flex;
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

  .dataWrap td {
    border: 1px solid #dedfe0;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 0.36rem;
    font-size: 0.14rem;
    color:#808080;
  }
  .dataWrap tr td:last-child a{
    color:#3893f2;
    text-decoration: underline;
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

  .detailTop {
    display:flex;
    align-items: center;
    padding-left: 2%;
    height: 0.5rem;
    position: relative;
    border-bottom: 1px solid #1f3b50;
    background-color: rgba(19, 41, 66, .9);
  }
  .detailTop .topItem {
    width: 18%;
    height: 0.38rem;
    background-color: #EEEEEE;
    text-align: center;
    line-height: 0.38rem;
    font-size: 0.16rem;
    border-radius: 0.05rem;
    cursor: pointer;
  }
  .detailTop .topSearch {
    position: absolute;
    right: 0.35rem;
    top: 0.13rem;
    font-size: 0.14rem;
    line-height: 2;
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

  .detailTop .topSearch >>> .el-button{
    padding: 0.05rem 0.1rem;
    margin-right:0.3rem;
  }


  .nodata{
    text-align: center;
  }

  .carsList{
    min-width:1022px;
    width:100%;
    /*display:flex;*/
    /*flex-wrap: wrap;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    font-size: 0.14rem;
  }
  .carsDetail {
    display:inline-block;
    position: relative;
    box-sizing: content-box;
    width: 2.56rem;
    min-width: 183px;
    margin: 0.12rem;
    background:url('../../assets/images/carJudged/carbg.png') center no-repeat ;
    background-size: 100% 100%;
    /* border: 1px solid #c9cacd; */
    /* background:#f0f2f7; */
    position: relative;
  }
  .carsDetail .el_button{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    cursor: pointer;
  }

  .carsPicture {
    position: relative;
    width: 2.56rem;
    min-width: 183px;
    height: 1.78rem;
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
    color:#99c9fa;
  }

  .carsMessageTxt {
    width: 100%;
    font-size: 0.12rem;
    line-height: 16px;
    height:16px;
    overflow: hidden;
    padding-left: 0.1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .carsMessageTxt span:first-child{
    color:#99c9fa;
  }
  .carsMessage .plateno, .carsMessage .tollgatep{
    color: #fdb04d;
  }

   /* .el-dialog__wrapper >>> .el-dialog__header {
    padding: 0.1rem 0.2rem;
    background: #f3f6f8;
    border-bottom: 1px solid #dcdfe6;
    box-shadow: 0 1px 1px #cdcdcd;
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
  }*/
  .el-dialog__wrapper >>>.el-dialog .el-dialog__body{
    /* background: #e7eef1; */
     padding:0 !important;
    border: 1px solid #13436E;
    margin:0.2rem;
    background-color: rgba(16, 35, 56, 0.5);
    position: relative;
     line-height: 0.24rem !important;
  }
  .el-dialog__wrapper >>> .el-dialog{
    margin-top: 1vh !important;
  }
  /* .el-dialog__wrapper{
    top: 1rem;
    left: 3rem;
  } */

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
    background:url(../../assets/images/carJudged/down.png) no-repeat center center;
  }


  /* .opr9{
    background:url(../../assets/images/carJudged/opr_9.png) no-repeat center center;
  } */

  .pageNation {
    position: relative;
    height: 0.5rem;
    display: flex;
    justify-content: flex-end;
    margin-right: 0.2rem;
    align-items: center;
  }
  .pagePN >>> .el-pagination__total{
    display: none;
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

  .demonstration{
    color: #666;
  }

  .facelist{
    position: absolute;
    width: 102px;
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
  .faceItem img{
    position: absolute;
    right:auto;
    bottom:auto;
    margin:0;
  }
  .information{
    top: 0.3rem;
  }
  .information .infomain,
  .toolInfo{
    background: transparent;
  }
  .item{
    color: #99c9fa;
  }
  .searchDetail .el-dialog__wrapper /deep/ .el-dialog {
  margin-top: 1.4rem !important;
}
  /* .searchDetail >>> .el-dialog__wrapper{
    position: absolute;
  } */




/* 阿萨大苏打 */

  /* .bottomWarp{
    width: 10rem;
    height: 1rem;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 0.15rem;
    z-index: 999;
    overflow: hidden;
  }
  .bottomItem{
    position: absolute;
    left: 0;
    top: 0;
    height: 1rem;
    transition: 0.3s;
  }
  .bottomItem .carouseItem{
    height: 1rem;
    width: 1rem;
    float: left;
    box-sizing: border-box
  }
  .ONcarouseItem{
     border: 0.03rem solid red !important;
  }
  .bottomItem .carouseItem img{
    height: 100%;
    width: 100%;
  }
  .searchDetail >>> .el-dialog{
    margin-top: 2vh !important;
    margin:0 !important;
  }


  .searchDetail >>> .el-carousel{
    width:7rem !important;
    margin-left: 2.2rem;
    transform: scale(0.8);
    transition: all 0.2s;
    transform: rotateZ(0deg)
  }
  .searchDetail >>> .el-carousel__arrow{
    background: rgba(0,0,0,0.5)
  }

  .information{
    position: absolute;
    right: 0rem;
    top: 2.2rem;
    height: 6rem;
    width: 3.5rem;
    z-index: 1;
    color: white;
    font-size: 0.15rem
  }
  .information .item{
    margin-bottom: 0.3rem;
  }
  .tool{
    position: absolute;
    left: 0.6rem;
    top: 2.2rem;
    height: 6rem;
    width: 1rem;
    z-index: 1;
  }
  .tool >>> .el-button{
    display: block;
    margin:0;
    margin-bottom:0.2rem;
    background: rgba(225,225,225,0)
  }
  .tool span{
    color: white;
    font-size: 0.15rem;
  } */

.boderShow{
  position: absolute;
  z-index: 2;
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




</style>
