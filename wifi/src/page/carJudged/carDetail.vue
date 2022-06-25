<template>
  <div class="cardetail" v-show="isShow">
    <!-- 车综下第二行部分 -->
    <el-dialog
      title="车辆详情"
      :visible.sync="isShow"
      width="12.5rem"
      class="dialog"
      @open="openDialog"
      :before-close="handleClose"
      :modal-append-to-body="false">
      <div class="carDetailWrap">
        <div class="orders" v-if="type != 'footHoldD'">
          <el-radio v-model="orderTypeCD" label="desc" @change="refreshDataCD">倒序</el-radio>
          <el-radio v-model="orderTypeCD" label="asc" @change="refreshDataCD">顺序</el-radio>
        </div>
        <div class="carsList" v-if="type != 'footHoldD'">
          <div class="carsDetail" v-for="(item,index) in carR.data.rows" :key="index">
            <div :id="'smallBoxCarR_'+index" class="carsPicture" @mouseover="openBigBox(index);setMaskPos(index,$event)" @mousemove="setMaskPos(index,$event)" @click="showCarouselCarR(index)" @mouseout="closeBigBox(index)">
              <b :id="'imgBd_'+index" class="boderShow"></b>
              <img :class="imgListWH[index]" :src="item.imageUrl" alt="loading">
              <span :id="'maskCarR_'+index" class="mask"></span>
            </div>
            <div :id="'bigBoxCarR_'+index" class="bigBox"><img :id="'bigImgCarR_'+index"  :src="item.imageUrl" alt="loading"></div>
            <div class="carsMessage">
              <div class="carsMessageTxt"><span>车牌: </span><span class="plateno" :title="item.plateNo == '@'?'未识别':item.plateNo">{{item.plateNo == '@'?'未识别':item.plateNo}}</span></div>
              <div class="carsMessageTxt" v-show="!item.isCarHead"><span>车型: </span><span :title="item.vehicleModel">{{item.vehicleModel}}</span></div>
              <div class="carsMessageTxt"><span>时间: </span><span :title="item.passTime">{{item.passTime}}</span></div>
              <div class="carsMessageTxt"><span>位置: </span><span class="tollgatep" :title="item.tollgatePlace">{{item.tollgatePlace}}</span></div>
              <div class="carsMessageTxt"><span>方向: </span><span :title="item.direction">{{item.direction}}</span></div>
              <div class="carsMessageTxt oprList"><span>快捷操作: </span><span v-show="imgSearchBtn" class="opr opr1" title="以图搜车" @click="goToSearchImg(item.imageUrl)"></span><span v-show="firstToCityBtn" class="opr opr2" title="初次入城" @click="goToFirstToCity(item.plateNo)"></span><span v-show="footHoldBtn" class="opr opr3" title="落脚点分析" @click="goToFootHold(item.plateNo)"></span><span v-show="trackBackBtn" class="opr opr4" title="轨迹重现" @click="goToTrackBack(item.plateNo)"></span><span v-show="plateOverMuchBtn" class="opr opr5" title="一牌多车分析" @click="goToPlateOverMuch(item.plateNo)"></span><span v-show="drivingTogetherBtn" class="opr opr7" title="同行车分析" @click="goToDrivingTogether(item.plateNo)"></span><span v-show="deployApplyBtn" class="opr opr8" title="布控申请" @click="goToDeployApply(item.plateNo)"></span></div>
              <!-- <span class="opr opr9" title="添加线索池" @click="goToAddDeploy(item.vehicleId,item.imageUrl,item.passTime,item.tollgatePlace)"></span> -->
            </div>
          </div>
          <div class="nodata" v-if="!carR.data.rows.length"> 暂无数据</div>
        </div>
        <div class="carsList" v-else>
          <div class="carsDetail" v-for="(item,index) in carR.data.rows" :key="index">
            <div :id="'smallBoxCarR_'+index" class="carsPicture" @mouseover="openBigBox(index);setMaskPos(index,$event)" @mousemove="setMaskPos(index,$event)" @click="showCarouselCarR(index)" @mouseout="closeBigBox(index)">
               <b :id="'imgBd_'+index" class="boderShow"></b>
              <img :class="imgListWH[index]" :src="item.imageUrl" alt="loading">
              <span :id="'maskCarR_'+index" class="mask"></span>
            </div>
            <div :id="'bigBoxCarR_'+index" class="bigBox"><img :id="'bigImgCarR_'+index"  :src="item.imageUrl" alt="loading"></div>
            <div class="carsMessage">
              <div class="carsMessageTxt"><span>性质: </span> <span>{{Number(item.type)?"返回":"出行"}}</span></div>
              <div class="carsMessageTxt"><span>方向: </span> <span>{{item.direction}}</span></div>
              <div class="carsMessageTxt"><span>出现时间: </span> <span>{{item.passTime}}</span></div>
              <!--<div class="carsMessageTxt oprList"><span>操作: </span><span v-show="imgSearchBtn" class="opr opr1" title="以图搜车" @click="goToSearchImg(item.imgUrl)"></span><span v-show="firstToCityBtn" class="opr opr2" title="初次入城" @click="goToFirstToCity(item.plateNo)"></span><span v-show="footHoldBtn" class="opr opr3" title="落脚点分析" @click="goToFootHold(item.plateNo)"></span><span v-show="trackBackBtn" class="opr opr4" title="轨迹重现" @click="goToTrackBack(item.plateNo)"></span><span v-show="plateOverMuchBtn" class="opr opr5" title="一牌多车分析" @click="goToPlateOverMuch(item.plateNo)"></span><span v-show="drivingTogetherBtn" class="opr opr7" title="同行车分析" @click="goToDrivingTogether(item.plateNo)"></span><span v-show="deployApplyBtn" class="opr opr8" title="布控申请" @click="goToDeployApply(item.plateNo)"></span><span class="opr opr9" title="添加线索池" @click="goToAddDeploy(item.vehicleId,item.imgUrl,item.passTime,item.tollgatePlace)"></span></div>-->
            </div>
          </div>
          <div v-if="!carR.data.rows.length"> 暂无数据</div>
        </div>
        <div class="pageNation" v-if="type != 'footHoldD'">
          <el-pagination
            ref="pageDom"
            :background=true
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="Number(carR.data.pageNo)"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            :page-size="Number(carR.data.pageSize)"
            layout="total, sizes, prev, pager, next, jumper"
            :total="Number(carR.data.total)">
          </el-pagination>
        </div>
        <div class="pageNation" v-else>

          <el-pagination
            ref="pageDom"
            :background=true
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            :page-size="Number(carR.data.pageSize)"
            layout="sizes, prev, pager, next"
            :total="Number(carR.data.total)">
          </el-pagination>


          <!-- <el-pagination
            ref="pageDom"
            :background=true
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="Number(carR.data.pageNo)"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            :page-size="Number(carR.data.pageSize)"
            layout="total, sizes, prev, pager, next, jumper"
            >
          </el-pagination> -->
        </div>
      </div>
    </el-dialog>

    <!-- <el-dialog
      title="图片信息"
      :visible.sync="carouselCarR"
      width="12rem"
      :modal-append-to-body="false"
      @close="closeCarousel">
      <el-carousel ref="carouselCarREl"   height="6rem" indicator-position="none" :autoplay='false' @change="changeActive">
        <el-carousel-item v-for="(item,index) in carR.data.rows" :key="'carR_'+index">
          <div class="carouselCarRImg" :id="'cCarRImg_'+index">
            <img v-if="type !== 'footHoldD'" :id="'cCarRImgItem_'+index" :src="item.imageUrl" />
            <img v-else :id="'cCarRImgItem_'+index" :src="item.imgUrl" />
            <div v-if="type !== 'footHoldD'" class="facelistCar" :id="'faceListCar_'+index">
              <span class="faceItemCar" v-for="faceItem in faceStyleCar[index]"><img :style="{'top':-faceItem.top+'px', 'left': -faceItem.left+'px'}" :width="faceItem.width" :height="faceItem.height" :src="item.imageUrl" /></span>
            </div>
            <span :id="'cCarRImgRedBorder_'+index" class="carsRedBorder"></span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-dialog> -->

      <el-dialog
        title="图片信息"
        :visible.sync="carouselCarR"
        width="14rem"
        class="mainDialog"
        :modal-append-to-body="false"
        @open="openCarousel"
        @close="closeCarousel">
        <el-carousel ref="carouselCarREl" id="carouselCarREl" height="7rem" arrow="never" :autoplay="false" indicator-position="none" @change="changeActive">
          <el-carousel-item v-for="(item,index) in carR.data.rows" :key="index">
            <div class="carouselCarRImg" :id="'cCarRImg_'+index">
              <img v-if="type != 'footHoldD'" :id="'cCarRImgItem_'+index" :src="item.imageUrl" />
              <img v-else :id="'cCarRImgItem_'+index" :src="item.imageUrl" />
              <!-- <div v-if="type != 'footHoldD'" class="facelistCar" :id="'faceListCar_'+index">
                <span class="faceItemCar" v-for="faceItem in faceStyleCar[index]"><img :style="{'top':-faceItem.top+'px', 'left': -faceItem.left+'px'}" :width="faceItem.width" :height="faceItem.height" :src="item.imageUrl" /></span>
              </div> -->
              <span :id="'cCarRImgRedBorder_'+index" class="carsRedBorder"></span>
          </div>
          </el-carousel-item>
        </el-carousel>

        <div class="bottomWarp">
          <div class="bottomItem" ref="bottomItem">
            <div class="carouseItem" :class="{ONcarouseItem:index == Indexs}" v-for="(item,index) in carR.data.rows" :key="index">
              <img  v-if="type != 'footHoldD'" :src="item.imageUrl" @click="setActiveItem(index)">
              <img v-else  :src="item.imageUrl" @click="setActiveItem(index)">
            </div>
          </div>
        </div>

        <div class="information" v-if="carouselCarR">
          <div class="infotitle"><b>|</b> 车辆标识物</div>
           <div class="infomain">
            <div class="item">车牌号码：{{carR.data.rows[Indexs].plateNo}}</div>
            <div class="item">车牌类型：{{carR.data.rows[Indexs].plateClass}}</div>
            <div class="item">车牌颜色：{{carR.data.rows[Indexs].plateColor}}</div>
            <div class="item">车型：{{carR.data.rows[Indexs].vehicleModel}}</div>
            <div class="item">时间：{{carR.data.rows[Indexs].passTime}}</div>
            <div class="item">位置：{{carR.data.rows[Indexs].tollgatePlace}}</div>
            <div class="item">方向：{{carR.data.rows[Indexs].direction}}</div>
            <div class="item" v-show="type == 'footHoldD'">性质：{{carR.data.rows[Indexs].type?"返回":"出行"}}</div>
            <div class="item">面部：{{carR.data.rows[Indexs].face.length}}</div>
            <div class="item">是否抽烟：{{carR.data.rows[Indexs].smoke | judgeNum }}</div>
            <div class="item">是否打电话：{{carR.data.rows[Indexs].calling  | judgeNum}}</div>
            <div class="item">是否打开遮阳板：{{carR.data.rows[Indexs].sunshield  | judgeNum}}</div>
            <div class="item">是否系安全带：{{carR.data.rows[Indexs].belt  | judgeNum}}</div>
          </div>

          <div class="tool">
            <div class="infotitle"><b>|</b> 操作</div>
            <div class="toolInfo">
                <span @click="changeScale('large')" title="放大"></span>
                <span @click="changeScale('small')" title="缩小"></span>
                <span @click="changeRotate()"  title="旋转"></span>
                <span @click="reduction()" title="还原"></span>
                <span @click="circulationPaly()" title="循环播放"></span>
              <!-- <el-button @click="changeScale('large')" title="放大" class="iconfont  icon-icon--"></el-button>
              <el-button @click="changeScale('small')"  title="缩小" class="iconfont  icon-suoxiao"></el-button>
              <el-button @click="changeRotate()"  title="旋转" class="iconfont  icon-yulanxuanzhuan"></el-button>
              <el-button @click="reduction()"  title="还原" class="iconfont  icon-restore"></el-button>
              <el-button @click="circulationPaly()"  title="循环播放" class="iconfont  icon-xunhuan"></el-button> -->
            </div>
          </div>

        </div>

      </el-dialog>







  </div>
</template>

<script>
  import  vehicle from '../../api/vehicle/vehicle.js'
  export default {
    name: "carDetail",
    props: {
      isShow: {
        type:Boolean
      },
      type: {
        type: String
      },
      carParams: {
        type: Object,
        default(){
          return {};
        }
      },
      carResult: {
        type: Object,
        default (){
          return {
            code: null,
            message: "",
            data: {
              pageNo: 0,
              pageSize: 10,
              total: 0,
              rows:[]
            }
          }
        }
      }
    },
    data (){
      return {
        imgSearchBtn:this.$storage.getSession("305")!=null?true:false,
        firstToCityBtn: this.$storage.getSession("308")!=null?true:false,
        footHoldBtn:this.$storage.getSession("309")!=null?true:false,
        trackBackBtn:this.$storage.getSession("313")!=null?true:false,
        plateOverMuchBtn:this.$storage.getSession("310")!=null?true:false,
        drivingTogetherBtn:this.$storage.getSession("314")!=null?true:false,
        deployApplyBtn: this.$storage.getSession("317")!=null?true:false,
        loading: null,
        carouselCarR: false,
        carouselOldIndex: -1,
        firstOpen: true,
        mask: false,
        Indexs:0,
        carouselElSize:0.8, //缩放大小
        carouselElRotate:0, //旋转
        timeCircul:null,
        //orderBy: 'pass_time',
        orderTypeCD: 'desc',
        carR: {
          code: null,
          message: "",
          data: {
            pageNo: 0,
            pageSize: 0,
            total: 0,
            rows: []
          },
        },
        dataParams:{}
      }
    },
    filters:{
      judgeNum(val){
        if(val == 0 || val == null){
          return '否'
        }else{
          return '是'
        }
      }
    },
    mixins:[vehicle],
    computed:{
      imgListWH(){
        let arr = [];
        let dList = this.carR.data.rows;
        if(dList.length){
          for(let i=0;i<dList.length;i++){
            // console.log(dList[i]);
            let imgw = dList[i].imageWidth;
            let imgh = dList[i].imageHeight;
            let rate = this.$store.state.screenWidth / 1920;
            let retw = 216 * rate;
            let reth = 150 * rate;
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
              let bbb = document.getElementById('imgBd_'+i)
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
      faceStyleCar (){
        let arr = [];
        let dList = this.carR.data.rows;
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
            //arrItem = [{},{}];
            arr.push(arrItem);
          }
        }
        //arr = [[{},{}],[{},{}]];
        return arr;
      }
    },
    watch: {
      carResult: {
        handler(newValue, oldValue) {
          this.carR = newValue;
          this.orderTypeCD = this.carParams.orderType;
        },
        deep: true
      }
    },
    methods: {
      openDialog(){
        this.$nextTick(function(){
          if(this.$refs["pageDom"]){
            this.$refs["pageDom"].lastEmittedPage = 1;
          }
        });
      },
      handleSizeChange (val){
        //this.carR.data.pageSize = val;
        //this.carR.data.pageNo = 1;

        let dParams = this.carParams;
        dParams.pageNo = 1;
        dParams.pageSize = val;
        dParams.orderType = this.orderTypeCD;

        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.getVD(this.type, dParams,(res)=>{
          this.transValue(res.data, this.carR);
          if(this.carR.data.rows.length === 0 ) {
              this.$notify({
                        type: 'info',
                        message: '抱歉，未查询到符合条件的数据！',
                        position: 'bottom-right',
                        duration: 3000
                      });
          //  layer.alert('抱歉，未查询到符合条件的数据！', {icon: 5, title: "消息提示"});
          }
        });
      },
      handleCurrentChange(val) {
        //this.carR.data.pageNo = val;
        let dParams = this.carParams;
        dParams.pageNo = val;
        dParams.pageSize = this.carR.data.pageSize;
        dParams.orderType = this.orderTypeCD;
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.getVD(this.type, dParams,(res)=>{
          this.transValue(res.data, this.carR);
          if(this.carR.data.rows.length === 0 ) {
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
      refreshDataCD (){
        //this.carR.data.pageNo = 1;
        //this.carR.data.pageSize = 10;
        let dParams = this.carParams;
        dParams.pageNo = 1;
        dParams.pageSize = 10;
        dParams.orderType = this.orderTypeCD;
        this.$refs["pageDom"].lastEmittedPage = 1;
        this.getVD(this.type, dParams,(res)=>{
          this.transValue(res.data, this.carR);
          if(this.carR.data.rows.length === 0 ) {
              this.$notify({
                        type: 'info',
                        message: '抱歉，未查询到符合条件的数据！',
                        position: 'bottom-right',
                        duration: 3000
                      });
            //layer.alert('抱歉，未查询到符合条件的数据！', {icon: 5, title: "消息提示"});
          }
        });
      },
      handleClose(){
        this.$emit("closeCarDetail");
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
        //  layer.alert('未识别车牌无法参与技战法！', {icon: 5, title: "消息提示"});
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
        //  layer.alert('未识别车牌无法参与技战法！', {icon: 5, title: "消息提示"});
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
            //this.$alert("加入线索池失败","消息提示");
              this.$notify({
                        type: 'error',
                        message: '加入线索池失败！',
                        position: 'bottom-right',
                        duration: 3000
                      });
           // layer.alert('加入线索池失败！',{icon:5,title:"消息提示"});
          }
        })
      },
      goToCarMorePlate(){
        //let routeData = this.$router.resolve({ name: 'searchImg', query: { imgUrl: img ,menuCode: 111}});
        //window.open(routeData.href, '_blank');
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
      openBigBox(index){
        let smallBox = $("#smallBoxCarR_"+index), bigBoxNode = document.getElementById("bigBoxCarR_"+index), bigBox = $(bigBoxNode);
        let resultList = $(".carDetailWrap"), carsDetail = $(bigBoxNode.parentNode);
        let sTop = smallBox.offset().top,
          sLeft = smallBox.offset().left,
          sW = smallBox.width(),
          sH = smallBox.height(),
          winW = window.innerWidth,
          winH = window.innerHeight,
          parentTop = resultList.offset().top,
          parentLeft = resultList.offset().left,
          parentW = resultList.width(),
          parentH = resultList.height(),
          carsDetailW = carsDetail.width(),
          carsDetailH = carsDetail.height();
        let bW = bigBox.width() + 20,
          bH = bigBox.height() + 20;
        let bTop = sH, bLeft = 0;
        if(parentTop + parentH - sTop - sH< bH){
          if(sTop - parentTop < bH){
            if(parentTop + parentH - sTop - sH < bH - sH){
              bTop = -bH + carsDetailH;
              if(parentW + parentLeft - sLeft -sW > bW){
                bLeft = sW;
              }else{
                bLeft = -bW;
              }
            }else{
              bTop = 0;
              if(parentW + parentLeft - sLeft -sW > bW){
                bLeft = sW;
              }else{
                bLeft = -bW;
              }
            }
          }else{
            bTop = -bH;
          }
        }else{
          if(parentW + parentLeft - sLeft -sW < bW - sW){
            bLeft = -bW + sW;
          }
        }


        bigBoxNode.style.display = 'block';
        bigBoxNode.style.top = bTop + "px";
        bigBoxNode.style.left = bLeft + "px";


        let boxImgParent = document.getElementById("smallBoxCarR_"+index);
        let boxImg = boxImgParent.getElementsByTagName('img')[0];  //小图
        let mask = document.getElementById("maskCarR_"+index);  //小盒子

        let bigImage = document.getElementById("bigImgCarR_"+index);  //大图

        let maskW = bigBox.width() * $(boxImg).width()/$(bigImage).width();
        let maskH = bigBox.height() * $(boxImg).height()/$(bigImage).height();
        mask.style.width = maskW + 'px';
        mask.style.height = maskH + 'px';
      },
      setMaskPos(index, e){
        e = e || window.event;

        let box = document.getElementById("smallBoxCarR_"+index);

        let boxImg = box.getElementsByTagName('img')[0];  //小图
        let mask = document.getElementById("maskCarR_"+index);  //小盒子

        let bigImage = document.getElementById("bigImgCarR_"+index);  //大图
        let bigBox = document.getElementById("bigBoxCarR_"+index);   //大盒子


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
      closeBigBox(index){
        document.getElementById("bigBoxCarR_"+index).style.display = 'none';
      },

      redBorderStyle(i,obj){
        let imgBox = document.getElementById("cCarRImg_"+i);
        let imgs = document.getElementById("cCarRImgItem_"+i);
        let redBorder = document.getElementById("cCarRImgRedBorder_"+i);

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

        let faceList = document.getElementById("faceListCar_"+i);
        if(faceList){
          faceList.style.top = unitTop + "px";
          faceList.style.right = unitLeft + "px";
        }

      },
      closeCarousel(){
        clearInterval(this.timeCircul)
        this.carouselCarR = false;
        //this.firstOpen = true;
      },
      showCarouselCarR(index){
        this.Indexs = index
        this.carouselCarR = true;
        let _this = this;
        setTimeout(function(){
          _this.redBorderStyle(index, _this.carR.data.rows[index]);
          _this.$refs["carouselCarREl"].setActiveItem(index);
          _this.reduction()
          // _this.changeLeft()
        }, 100);
      },
      setActiveItem(index){
        clearInterval(this.timeCircul)
        this.Indexs = index
        this.$refs["carouselCarREl"].setActiveItem(index);
        // this.changeLeft()
      },
      changeActive(newIndex, oldIndex){
        this.Indexs = newIndex
        // this.changeLeft()
        if(!this.$refs["carouselCarREl"]){
          this.$nextTick(function () {
            this.redBorderStyle(newIndex, this.carR.data.rows[newIndex]);
            this.$refs["carouselCarREl"].setActiveItem(newIndex);
          });
        }else{
          this.redBorderStyle(newIndex, this.carR.data.rows[newIndex]);
          this.$refs["carouselCarREl"].setActiveItem(newIndex);
        }
      },
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
        document.getElementById('carouselCarREl').style.transform = 'rotateZ('+this.carouselElRotate+'deg) scale('+ this.carouselElSize +')'
      },

      //旋转图片
      changeRotate(){
        clearInterval(this.timeCircul)
         this.carouselElRotate += 90
         document.getElementById('carouselCarREl').style.transform = 'rotateZ('+this.carouselElRotate+'deg) scale('+ this.carouselElSize +')'
      },
        //还原
      reduction(){
        clearInterval(this.timeCircul)
        this.carouselElSize = 0.8
        this.carouselElRotate = 0
        document.getElementById('carouselCarREl').style.transform = 'rotateZ(0deg) scale(0.8)'
      },
      //循环播放
      circulationPaly(){
        clearInterval(this.timeCircul)
        this.timeCircul = setInterval(()=>{
          this.$refs["carouselCarREl"].next();
        },2000)
      },
      //打开模态框的时候执行键盘事件
      openCarousel(){
         let _this = this;
        document.onkeydown = function(e){
          clearInterval(_this.timeCircul)
          if(e.key == "ArrowLeft" && _this.carouselCarR){
            if(!_this.$refs["carouselCarREl"]){
              _this.$nextTick(function () {
                _this.$refs["carouselCarREl"].prev();
              });
            }else{
              _this.$refs["carouselCarREl"].prev();
            }

          }
          if(e.key == "ArrowRight" && _this.carouselCarR){
            if(!_this.$refs["carouselCarREl"]){
              _this.$nextTick(function () {
                _this.$refs["carouselCarREl"].next();
              });
            }else{
              _this.$refs["carouselCarREl"].next();
            }
          }
        }

         //滚轮放大缩小
        document.onmousewheel = function(e){
          if(e.wheelDelta == 120  && _this.carouselCarR){
            clearInterval(_this.timeCircul)
            _this.changeScale('large')
          }else if(e.wheelDelta == -120  && _this.carouselCarR){
            clearInterval(_this.timeCircul)
            _this.changeScale('small')
          }
        }
      },

    },
    mounted (){
      this.carR = this.carResult;
      // this.orderTypeCD = this.carParams.orderType;

    }
  }
</script>

<style scoped>
@import '../../assets/css/searchCar.css';

  .orders{
    position: absolute;
    top:0.16rem;
    right:0.68rem;
  }
  .orders >>> .el-radio__label{
    font-size: 0.14rem;
    padding-left: 0.1rem;
  }
.cardetail>>>.el-dialog {
  /* margin-top: 2vh !important; */
  /* margin: 0 !important; */
  margin-left:3.96rem !important;
  margin-top: 1.4rem !important;
  margin-bottom: 0
}
.cardetail >>> .el-dialog__body{
  padding: 0.1rem 0.1rem 0.1rem 0.2rem;
}
.mainDialog >>>.el-dialog .el-dialog__body{
   /* background: #e7eef1; */
     padding:0 !important;
    border: 1px solid #13436E;
    margin:0.2rem;
     background-color: rgba(16, 35, 56, 0.5);
    position: relative;
    line-height: 0.24rem !important;
}

.cardetail .el-dialog__wrapper >>> .el-dialog__header {
  padding: 0.1rem 0.2rem;
  background: #f3f6f8;
  /* border-bottom: 1px solid #dcdfe6; */
  /* box-shadow: 0 1px 1px #cdcdcd; */
    border: 1px solid #13436E;
  font-size: 0.18rem;
  line-height: 0.32rem;
}
.cardetail .el-dialog__wrapper >>> .el-dialog__title{
  font-size: 0.18rem;
}
.cardetail .el-dialog__wrapper >>> .el-dialog__headerbtn{
  top: 0.2rem;
  right: 0.2rem;
  font-size: 0.16rem;
}

.pageNation{
  text-align:right;
}
.carDetailWrap{
  overflow-x:auto;
}
.carsList{
  overflow: auto;
  max-height:6.38rem;
  min-height:6rem;
  min-width:12rem;
}
.carsList .nodata{
  text-align:center;
}
.carsDetail {
  width: 2.16rem;
  margin: 0.10rem;
  display: inline-block;
  position: relative;
  background:url('../../assets/images/carJudged/carbg.png') center no-repeat ;
    background-size: 100% 100%;
    color:#99c9fa ;
}

.carsPicture {
  position: relative;
  text-align: center;
  overflow: hidden;
  width: 2.16rem;
  height: 1.5rem;
}
.carsPicture img{
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
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
  /* background-color: #F0F2F7; */
  justify-content: space-around;
  color:#99c9fa ;
}

.carsMessageTxt {
  width: 100%;
  font-size: 0.12rem;
  line-height: 16px;
  height:16px;
  overflow: hidden;
  padding-left: 0.04rem;
  text-overflow:ellipsis;
  white-space:nowrap
}
.carsMessageTxt span:first-child{
  color:#99c9fa ;
}
.carsMessage .plateno, .carsMessage .tollgatep{
  color: #fdb04d;
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
  background:url(../../assets/images/carJudged/opr_9.png) no-repeat center center;
}

.bigBox{
  display:none;
  box-sizing: border-box;
  position: absolute;
  z-index:3;
  width:4rem;
  height:4rem;
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
.carouselCarRImg{
  position: relative;
  height: 6rem;
  overflow: hidden;
}
.carouselCarRImg img{
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin: auto;
}
.carouselCarRImg .carsRedBorder{
  position: absolute;
  border:1px solid red;
}

.el-carousel {
  width: 8.5rem !important;
  margin-left: 0.5rem;
  transform: scale(0.8);
  transition: all 0.2s;
  transform: rotateZ(0deg)
}

.el-carousel>>>.el-carousel__arrow {
  background: rgba(0, 0, 0, 0.5)
}

.facelistCar{
  position: absolute;
  width: 102px;
}
.faceItemCar{
  display:block;
  position:relative;
  width:100px;
  height:100px;
  border:1px solid #fff;
  margin-bottom: 0.05rem;
  background:#fff;
  overflow: hidden;
}
.faceItemCar img{
  position: absolute;
  right:auto;
  bottom:auto;
  margin:0;
}
/* .cardetail >>> .el-dialog__wrapper{
  position: absolute;
} */

/* .cardetail >>> .el-dialog{
  margin-top: 0vh !important;
} */
.cardetail .el-dialog__wrapper /deep/ .el-dialog {
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

</style>
