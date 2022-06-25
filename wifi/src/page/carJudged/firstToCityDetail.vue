<template>
  <!--<transition name="fade">-->
    <div class="searchDetail">
     <div  class="detailTop">
          <div class="resultTitle">| 搜索展示</div>
          <!-- 初次入城 -->
          <div class="topSearch">
            <div class="orderWay" style="display: none;">
              <span>排序方式:</span>
              <select class="orderSlt" v-model="orderByPop" @change="refreshData" placeholder="请选择排序方式">
                <option value="pass_time">过车时段</option>
                <option value="1">循环时段</option>
              </select>
            </div>
            <el-radio style="display: none;" v-model="orderTypePop" label="desc" @change="refreshData">倒序</el-radio>
            <el-radio style="display: none;" v-model="orderTypePop" label="asc" @change="refreshData">顺序</el-radio>
            <el-button  @click="downAllImg" class="searchBtn" type="primary"><span class="el-icon-download" ></span>批量下载</el-button>
          </div>
       </div>
      <div class="resultList">

        <div class="carsList">
          <div class="carsDetail" v-for="(item,index) in actualData" :key="index">
            <div :id="'smallBox_'+index" class="carsPicture" @mouseover="openBigBox(index);setMaskPos(index,$event)" @mousemove="setMaskPos(index,$event)" @click="showCarousel(index)" @mouseout="closeBigBox(index)">
              <b :id="'imgFirst_'+index" class="boderShow"></b>
              <img :class="imgListWH[index]" :src="item.imageUrl" alt="loading">
              <span :id="'mask_'+index" class="mask"></span>
            </div>
            <div :id="'bigBox_'+index" class="bigBox"><img :id="'bigImg_'+index"  :src="item.imageUrl" alt="loading"></div>
            <div class="carsMessage">
              <div class="carsMessageTxt"><span>车&nbsp;&nbsp;牌&nbsp;: &nbsp;</span><span class="plateno" :title="item.plateNo == '@'?null:item.plateNo">{{item.plateNo == "@"?null:item.plateNo}}</span></div>
              <div class="carsMessageTxt" v-show="!item.isCarHead"><span>车&nbsp;&nbsp;型&nbsp;: &nbsp;</span><span :title="item.vehicleModel">{{item.vehicleModel}}</span></div>
              <div class="carsMessageTxt"><span>时&nbsp;&nbsp;间&nbsp;: &nbsp;</span><span :title="item.passTime">{{item.passTime}}</span></div>
              <div class="carsMessageTxt"><span>位&nbsp;&nbsp;置&nbsp;: &nbsp;</span><span class="tollgatep" :title="item.tollgatePlace">{{item.tollgatePlace}}</span></div>
              <div class="carsMessageTxt"><span>方&nbsp;&nbsp;向&nbsp;: &nbsp;</span><span :title="item.direction">{{item.direction}}</span></div>
              <div class="carsMessageTxt oprList"><span>快捷操作&nbsp;: &nbsp;</span>
                <span title="图片下载" class="opr opr9" @click="downImg(index,item)"></span>
                <span v-show="imgSearchBtn" class="opr opr1" title="以图搜车" @click="goToSearchImg(item.imageUrl)"></span>
                <span v-show="firstToCityBtn" class="opr opr2" title="初次入城" @click="goToFirstToCity(item.plateNo)"></span>
                <span v-show="footHoldBtn" class="opr opr3" title="落脚点分析" @click="goToFootHold(item.plateNo)"></span>
                <span v-show="trackBackBtn" class="opr opr4" title="轨迹重现" @click="goToTrackBack(item.plateNo)"></span>
                <span v-show="plateOverMuchBtn" class="opr opr5" title="一牌多车分析" @click="goToPlateOverMuch(item.plateNo)"></span>
                <span v-show="drivingTogetherBtn" class="opr opr7" title="同行车分析" @click="goToDrivingTogether(item.plateNo)"></span>
                <span v-show="deployApplyBtn" class="opr opr8" title="布控申请" @click="goToDeployApply(item.plateNo)"></span></div>
              <!-- <span class="opr opr9" title="添加线索池" @click="goToAddDeploy(item.vehicleId,item.imageUrl,item.passTime,item.tollgatePlace)"></span> -->
            </div>
          </div>
          <div v-if="!sR.data.rows.length">暂无数据</div>
        </div>
        <div class="pageNation">
          <el-pagination
            :background=true
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="Number(pageNo)"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="Number(pageSize)"
            layout="total, sizes, prev, pager, next, jumper"
            :total="Number(total)">
          </el-pagination>
        </div>
      </div>

      <!-- <el-dialog
        title="图片信息"
        :visible.sync="carousel"
        width="12rem"
        :modal-append-to-body="false"
        @close="closeCarousel">
        <el-carousel ref="carouselEl"  height="6rem" indicator-position="none" :autoplay='false' @change="changeActive">
          <el-carousel-item v-for="(item,index) in actualData" :key="index">
            <div class="carouselImg" :id="'cImg_'+index">
              <img :id="'cImgItem_'+index" :src="item.imageUrl" />
              <div class="facelist" :id="'faceList_'+index">
                <span class="faceItem" v-for="faceItem in faceStyle[index]"><img :style="{'top':-faceItem.top+'px', 'left': -faceItem.left+'px'}" :width="faceItem.width" :height="faceItem.height" :src="item.imageUrl" /></span>
              </div>
              <span :id="'cImgRedBorder_'+index" class="carsRedBorder"></span>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-dialog> -->


      <el-dialog
        title="图片信息"
        :visible.sync="carousel"
        width="14rem"
        :modal-append-to-body="false"
        @close="closeCarousel">
        <el-carousel ref="carouselEl" id="carouselEl" height="7rem" arrow="never" :autoplay="false" indicator-position="none" @change="changeActive">
          <el-carousel-item v-for="(item,index) in actualData" :key="index">
            <div class="carouselImg" :id="'cImg_'+index">
              <img :id="'cImgItem_'+index" :src="item.imageUrl" />
              <div class="facelist" :id="'faceList_'+index">
                <span class="faceItem" v-for="(faceItem,index) in faceStyle[index]" :key="index"><img :style="{'top':-faceItem.top+'px', 'left': -faceItem.left+'px'}" :width="faceItem.width" :height="faceItem.height" :src="item.imgUrl" /></span>
              </div>
              <span :id="'cImgRedBorder_'+index" class="carsRedBorder"></span>
            </div>
          </el-carousel-item>
        </el-carousel>

        <div class="bottomWarp">
          <div class="bottomItem" ref="bottomItem">
            <div class="carouseItem" :class="{ONcarouseItem:index == Indexs}" v-for="(item,index) in actualData" :key="index">
              <img :src="item.imageUrl" @click="setActiveItem(index)">
            </div>
          </div>
        </div>

        <div class="information" v-if="carousel">
          <div class="infotitle"><b>|</b> 车辆标识物</div>
          <div class="infomain">
            <div class="item">车牌号码：{{actualData[Indexs].plateNo}}</div>
            <div class="item">车牌类型：{{actualData[Indexs].plateClass}}</div>
            <div class="item">车牌颜色：{{actualData[Indexs].plateColor}}</div>
            <div class="item">车型：{{actualData[Indexs].vehicleModel}}</div>
            <div class="item">时间：{{actualData[Indexs].passTime}}</div>
            <div class="item">位置：{{actualData[Indexs].tollgatePlace}}</div>
            <div class="item">方向：{{actualData[Indexs].direction}}</div>
            <div class="item">车辆颜色：{{actualData[Indexs].vehicleColor}}</div>
            <div class="item">面部：{{actualData[Indexs].face.length}}</div>
            <div class="item">是否抽烟：{{actualData[Indexs].smoke | judgeNum }}</div>
            <div class="item">是否打电话：{{actualData[Indexs].calling  | judgeNum}}</div>
            <div class="item">是否打开遮阳板：{{actualData[Indexs].sunshield  | judgeNum}}</div>
            <div class="item">是否系安全带：{{actualData[Indexs].belt  | judgeNum}}</div>
          </div>

          <div class="tool">
            <div class="infotitle"><b>|</b> 操作</div>
            <div class="toolInfo">
               <span @click="changeScale('large')" title="放大"></span>
                <span @click="changeScale('small')" title="缩小"></span>
                <span @click="changeRotate()"  title="旋转"></span>
                <span @click="reduction()" title="还原"></span>
                <span @click="circulationPaly()" title="循环播放"></span>
             <!--  <el-button @click="changeScale('large')" title="放大" class="iconfont  icon-icon--"></el-button>
              <el-button @click="changeScale('small')"  title="缩小" class="iconfont  icon-suoxiao"></el-button>
              <el-button @click="changeRotate()"  title="旋转" class="iconfont  icon-yulanxuanzhuan"></el-button>
              <el-button @click="reduction()"  title="还原" class="iconfont  icon-restore"></el-button>
              <el-button @click="circulationPaly()"  title="循环播放" class="iconfont  icon-xunhuan"></el-button>-->
            </div>
          </div>


        </div>

      </el-dialog>

       <form action="tvas/downloadFile/downloadImage" method="post" v-for="(item,index) in  actualData" :key="index" :id="'a'+index" v-show="false" >
        <input type="text" :value="item.tollgatePlace +'-'+ item.passTime.replace(/-/g,'').replace(' ','').replace(/:/g,'')" name="imgName">
        <input type="text" :value="item.imageUrl" name="url">
      </form>

      <form action="tvas/downloadFile/batchDownloadImage" method="post" id="downAll"  v-show="false" >
        <input type="text" :value="this.searchParams.category" name="category">
        <input type="text" :value="this.searchParams.vehicleModel" name="vehicleModel">
        <input type="text" :value="this.searchParams.plateNo" name="plateNo">
        <input type="text" :value="this.searchParams.plateClass" name="plateClass">
        <input type="text" :value="this.searchParams.followTime" name="followTime">
        <input type="text" :value="this.searchParams.followNumber" name="followNumber">
        <input type="text" :value="this.searchParams.excludePlateNo" name="excludePlateNo">
        <input type="text" :value="this.searchParams.conditions" name="conditions">
        <input type="text" :value="this.searchParams.beginDateTime" name="beginDateTime">
        <input type="text" :value="this.searchParams.endDateTime" name="endDateTime">
        <input type="text" :value="this.searchParams.tollgateIds" name="tollgateIds">
        <input type="text" :value="this.searchParams.beginDateTime2" name="beginDateTime2">
        <input type="text" :value="this.searchParams.backdate" name="backdate">
        <input type="text" value="1" name="pageNo">
        <input type="text" value="100" name="pageSize">
        <input type="text" value="pass_time" name="orderBy">
        <input type="text" value="desc" name="orderType">
        <input type="text" :value="this.dataUrl + this.otherPort" name="url">
      </form>








    </div>
  <!--</transition>-->
</template>

<script>
    import  vehicle from '../../api/vehicle/vehicle.js'
    export default {
      name: "firstToCityDetail",
      props: {
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
        searchResult: {
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
        }
      },
      data () {
        return {
          dataUrl:'',   //本机Ip
          otherPort:'',  //接口
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
          orderByPop: "pass_time",
          orderTypePop: "desc",
          actualPageSize: 100,
          actualPageNo: 1,
          actualData: [],
          pageNo: 1,
          pageSize: 10,
          total: 0,
          Indexs:0,
          carouselElSize:0.8, //缩放大小
          carouselElRotate:0, //旋转，
          timeCircul:null,
          sR: {
            code: null,
            message: "",
            data: {
              pageNo: 0,
              pageSize: 0,
              total: 0,
              rows: []
            }
          }
        }
      },
      computed:{
        dataParams (){
          let dParams = this.searchParams;
          dParams.pageNo = this.actualPageNo;
          dParams.pageSize = this.actualPageSize;
          dParams.orderType = this.orderTypePop;
          return dParams;
        },
        imgListWH(){
          // let arr = [];
          // let dList = this.actualData;
          // if(dList.length){
          //   for(let i=0;i<dList.length;i++){
          //     let imgw = dList[i].imageWidth;
          //     let imgh = dList[i].imageHeight;
          //     let retw = 256;
          //     let reth = 178;
          //     let unit = 1;
          //     if (retw / reth < imgw / imgh) {
          //       arr.push("width");
          //     } else {
          //       arr.push("height");
          //     }
          //   }
          // }
          // return arr;



          let arr = [];
          let dList = this.actualData;
          if(dList.length){
          for(let i=0;i<dList.length;i++){
            // console.log(dList[i]);
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
              let bbb = document.getElementById('imgFirst_'+i)
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
          let dList = this.actualData;
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
              arr.push(arrItem);
            }
          }
          return arr;
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
      watch: {
        searchResult: {
          handler(newValue, oldValue) {
            this.orderTypePop = this.searchParams.orderType;
            this.sR = newValue;
            this.pageNo = 1;
            this.pageSize = 10;
            this.actualPageSize = 100;
            this.actualPageNo = 1;
            this.otherPort = this.port
            this.total = newValue.data.rows.length;
            this.actualData = newValue.data.rows.slice(0,this.pageSize);
          },
          deep: true
        }
      },
      mixins:[vehicle],
      methods: {
        //单个下载
        downImg(index,row){
          document.getElementById('a'+index).submit();
        },

        //批量下载
        downAllImg(){
          if(this.total < 1000){
            this.loading = this.$loading({
              lock: true,
              background: "rgba(255,255,255,0.4)",
              text: "正在下载..."
            });
            document.getElementById('downAll').submit();
            setTimeout(() => {
              this.loading.close();
            }, 3000);

          }else if(this.total <= 2000){
            this.loading = this.$loading({
              lock: true,
              background: "rgba(255,255,255,0.4)",
              text: "正在下载..."
            });
            document.getElementById('downAll').submit();
            setTimeout(() => {
              this.loading.close();
            }, 6000);
          }else if(this.total > 2000){
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

        //每页val条
        handleSizeChange(val) {
          this.pageSize = val;
          this.pageNo  = 1;
          if(this.pageSize <= this.actualPageSize) {
            this.actualData = this.sR.data.rows.slice((this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize);
            return;
          }else{
            this.actualPageSize = this.pageSize;
            this.actualPageNo = 1;
          }
          // this.loading = this.$loading({
          //   lock: true,
          //   background: "rgba(255,255,255,0.4)",
          //   text: "加载中"
          // });
          this.getVD(this.searchType, this.dataParams,(res)=>{
            this.transValue(res.data, this.sR);
            if(this.sR.data.rows.length === 0 ) {
                this.$notify({
                        type: 'info',
                        message: '抱歉，未查询到符合条件的数据！',
                        position: 'bottom-right',
                        duration: 3000
                      });
             // layer.alert('抱歉，未查询到符合条件的数据！', {icon: 5, title: "消息提示"});
            }else{
              this.total = this.sR.data.rows.length;
              this.$nextTick(function(){
                this.pageSize = val;
                this.pageNo = 1;
                this.actualData = this.sR.data.rows.slice((this.pageNo-1)*this.pageSize,this.pageNo*this.pageSize);
              });
            }
          });
        },
        //当前页
        handleCurrentChange(val) {
          this.pageNo = val;
          let maxPageNo = Math.ceil(this.total / this.pageSize);
          if(this.pageNo == maxPageNo){
            //this.actualPageNo = Math.ceil(this.total / this.actualPageSize) +1;
            this.actualPageNo = this.actualPageNo+1;
            this.actualData = this.sR.data.rows.slice((this.pageNo-1)*this.pageSize, this.pageNo*this.pageSize);
          }else{
            this.actualData = this.sR.data.rows.slice((this.pageNo-1)*this.pageSize, this.pageNo*this.pageSize);
            return;
          }
          this.loading = this.$loading({
            lock: true,
            background: "rgba(255,255,255,0.4)",
            text: "加载中"
          });
          this.getVD(this.searchType, this.dataParams,(res)=>{
            let resData = {
              code: null,
              message: "",
              data: {
                pageNo: 0,
                pageSize: 0,
                total: 0,
                rows: []
              }
            };
            this.transValue(res.data, resData);
            if(resData.data.rows.length === 0 ) {
              //layer.alert('抱歉，未查询到符合条件的数据！', {icon: 5, title: "消息提示"});
            }else{
              this.sR.data.rows = this.sR.data.rows.concat(resData.data.rows);
              this.total = this.sR.data.rows.length;
              let pagesize = this.pageSize;
              let pageno = this.pageNo;
              let apno = this.actualPageNo;
              this.$nextTick(function(){
                this.pageSize = pagesize;
                this.pageNo = pageno;
                this.actualPageNo = apno;
                this.actualData = this.sR.data.rows.slice((this.pageNo-1)*this.pageSize,this.pageNo*this.pageSize);
              });
             }
          });
        },
        //重新获取数据
        refreshData () {
          this.actualPageNo = 1;
          this.actualPageSize = 100;
          this.loading = this.$loading({
            lock: true,
            background: "rgba(255,255,255,0.4)",
            text: "加载中"
          });
          this.getVD(this.searchType, this.dataParams, (res) => {
            this.transValue(res.data, this.sR);
            if(this.sR.data.rows.length === 0 ) {
                this.$notify({
                        type: 'info',
                        message: '抱歉，未查询到符合条件的数据！',
                        position: 'bottom-right',
                        duration: 3000
                      });
             // layer.alert('抱歉，未查询到符合条件的数据！', {icon: 5, title: "消息提示"});
            }else{
              this.pageNo = 1;
              this.pageSize = 10;
              this.total = this.sR.data.rows.length;
              this.actualData =  this.sR.data.rows.slice(0,this.pageSize);
            }
          });
        },

        goToSearchImg(img){
          let routeData = this.$router.resolve({ name: 'imgSearchCar', query: { imgUrl: img ,menuCode: 305}});
          window.open(routeData.href, '_blank');
        },
        goToFirstToCity(plateNo){
          let routeData = this.$router.resolve({ name: 'firstToCity', query: { plateNo: plateNo ,menuCode: 308}});
          window.open(routeData.href, '_blank');
        },
        goToFootHold(plateNo){
          let routeData = this.$router.resolve({ name: 'foothold', query: { plateNo: plateNo ,menuCode: 309}});
          window.open(routeData.href, '_blank');
        },
        goToTrackBack(plateNo){
          let routeData = this.$router.resolve({ name: 'trackBack', query: { plateNo: plateNo ,menuCode: 313}});
          window.open(routeData.href, '_blank');
        },
        goToPlateOverMuch(plateNo){
          let routeData = this.$router.resolve({ name: 'plateOverMuch', query: { plateNo: plateNo ,menuCode: 310}});
          window.open(routeData.href, '_blank');
        },
        goToDrivingTogether(plateNo){
          let routeData = this.$router.resolve({ name: 'drivingTogether', query: { plateNo: plateNo ,menuCode: 314}});
          window.open(routeData.href, '_blank');
        },
        goToDeployApply(plateNo){
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
              //this.$alert("加入线索池失败","消息提示");
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
        // setMaskPos(index, e){
        //   e = e || window.event;
        //   let bigBox = document.getElementById("bigBox_"+index);
        //   let box = document.getElementById("smallBox_"+index);
        //   let mask = document.getElementById("mask_"+index);
        //   let bigImage = document.getElementById("bigImg_"+index);
        //
        //   let boxImg = box.getElementsByTagName('img')[0];
        //   let maskX = this.getPage(e).pageX - $(box).offset().left;
        //   let maskY = this.getPage(e).pageY - $(box).offset().top;
        //
        //   maskX = maskX - mask.offsetWidth / 2;
        //   maskY = maskY - mask.offsetHeight / 2;
        //
        //   maskX = maskX < boxImg.offsetLeft ? boxImg.offsetLeft : maskX;
        //   maskY = maskY < boxImg.offsetTop ? boxImg.offsetTop : maskY;
        //
        //   maskX = maskX > box.offsetWidth - mask.offsetWidth - boxImg.offsetLeft ? box.offsetWidth - mask.offsetWidth - boxImg.offsetLeft: maskX;
        //   maskY = maskY > box.offsetHeight - mask.offsetHeight - boxImg.offsetTop ? box.offsetHeight - mask.offsetHeight - boxImg.offsetTop: maskY;
        //
        //   mask.style.left = maskX + 'px';
        //   mask.style.top = maskY + 'px';
        //
        //   let maskMax = box.offsetWidth - mask.offsetWidth;
        //   let bigImageMax = bigImage.offsetWidth - bigBox.offsetWidth;
        //   let maskHMax = box.offsetHeight - mask.offsetHeight;
        //   let bigImageHMax = bigImage.offsetHeight - bigBox.offsetHeight;
        //
        //   let bigImageX = maskX * bigImageMax / maskMax;
        //   let bigImageY = maskY * bigImageHMax / maskHMax;
        //
        //   bigImage.style.left = -bigImageX + 'px';
        //   bigImage.style.top = -bigImageY + 'px';
        // },
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
          let resultList = $(".carsList"), carsDetail = $(bigBoxNode.parentNode);
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

          let pid = "bigImg_"+i;
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
        // openCarousel(){
        //   this.$nextTick(function () {
        //     if(this.actualData.length && this.firstOpen){
        //       this.redBorderStyle(0, this.actualData[0]);
        //       this.$refs["carouselEl"].setActiveItem(0);
        //       this.carouselOldIndex = 0;
        //       this.firstOpen = false;
        //     }
        //   });
        // },
        closeCarousel(){
          this.carousel = false;
          clearInterval(this.timeCircul)
        },
        showCarousel(index){
          this.Indexs = index
          this.carousel = true;
          let _this = this;
          setTimeout(()=>{
            _this.redBorderStyle(index,_this.actualData[index]);
            _this.$refs["carouselEl"].setActiveItem(index);
            _this.reduction()
            // _this.changeLeft()
          }, 100);
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
              this.redBorderStyle(newIndex, this.actualData[newIndex]);
              this.$refs["carouselEl"].setActiveItem(newIndex);
            });
          }else{
            this.redBorderStyle(newIndex, this.actualData[newIndex]);
            this.$refs["carouselEl"].setActiveItem(newIndex);
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
        this.sR = this.searchResult;
        this.pageNo = 1;
        this.pageSize = 10;
        this.total = this.sR.data.rows.length;
        this.actualData =  this.sR.data.rows.slice(0,this.pageSize);
        let _this = this;
        document.onkeydown = function(e){
          clearInterval(_this.timeCircul)
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
        }
      }
    }
</script>

<style scoped>
@import '../../assets/css/commom.css';
  .fade-enter-active, .fade-leave-active {
    transform: translate3d(0, 0, 0);
  }

  .fade-enter, .fade-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
  .searchDetail {
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;

    transition: all 1s;
    border: 1px solid #36506d;
    border-top:none;
    background-image: url("../../assets/updataImg/home-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
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
  .topSearch{
    align-items: center;
    height: 0.4rem;
    color: #303133;
    padding-left: 0.2rem;
    font-size: 0.16rem;
    line-height: 0.4rem;
  }
  .topSearch .el-button{
    float: right;
    margin-right:0.3rem;
    padding: 0.1rem 0.2rem;
    font-size: 0.12rem;
  }
  .topSearch  .orderWay{
    margin-right: 0.2rem;
  }
  .topSearch select{
      padding:2px;
      width: 1rem;
  }
  .resultTitle{
    height: 0.5rem;
    padding-left: 0.2rem;
    line-height: 0.5rem;
    font-size: 0.18rem;
    color:#c0c0c0

  }
  .resultList {
    width: 100%;
    padding: 1%;

    /*display: flex;*/
    /*flex-direction: column;*/
    overflow-y: auto;
    /*justify-content: center;*/
    /*align-items: center;*/

  }
  .carsList{
    min-width: 1014px;
    min-height:524px;
    overflow: auto;
    /*flex: 1;*/
    /*display:flex;*/
    /*flex-wrap: wrap;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    font-size: 0.14rem;
  }
  .carsDetail {
    /*display:inline-block;*/
    float:left;
    box-sizing: content-box;
    width: 2.56rem;
    min-width: 183px;
   margin: 0.06rem 0.12rem;
    position: relative;

   background:url('../../assets/images/carJudged/carbg.png') center no-repeat ;
    background-size: 100% 100%;
      padding-bottom: 0.04rem;
    padding-top: 0.04rem;
  }

  .carsPicture {
    position: relative;
    width: 2.56rem;
    min-width: 183px;
    height: 1.7rem;
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
    overflow: hidden;
    padding-left: 0.1rem;
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
  .el-dialog__wrapper >>>.el-dialog  .el-dialog__body{
    padding:0 !important;
    border: 1px solid #13436E;
    margin:0.2rem;
     background-color: rgba(16, 35, 56, 0.5);
    position: relative;
    /* background: #e7eef1; */
    position: relative;
     line-height: 0.24rem !important;
  }
  .el-dialog__wrapper >>> .el-dialog__title{
    font-size: 0.18rem;
  }
  .el-dialog__wrapper >>> .el-dialog__headerbtn{
    top: 0.2rem;
    right: 0.2rem;
    font-size: 0.16rem;
  }
.searchDetail>>>.el-dialog {
  margin-left:3.96rem !important;
  margin-bottom: 0;
  margin-top:1.4rem !important;
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
    position: relative;

    height: 0.5rem;
    display: flex;
    justify-content: flex-end;
    margin-right: 0.2rem;
    align-items: center;
  }
  .pageNation >>> .el-pagination__total{
    display: none;
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

.pageItem {
  margin: 0 5px;
  background-color: #f4f4f5;
  color: #606266;
  min-width: 30px;
  border-radius: 2px;
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
  .resultList >>> .el-dialog__wrapper{
    position: absolute;
  }
  .boderShow{
  position: absolute;
  z-index: 2;
}


/* 新加的 */
.bottomWarp{
    width: 9.5rem;
    height: 0.9rem;
    position: absolute;
    left: 0.5rem;
    bottom: 0.2rem;
    z-index: 999;
    overflow: hidden;
  }
  .bottomItem{
    position: absolute;
    left: 0;
    top: 0;
    height: 0.9rem;
    transition: 0.3s;
  }
  .bottomItem .carouseItem{
    height: 0.9rem;
    width: 0.9rem;
    float: left;
    box-sizing: border-box;
  margin-right:0.05rem;
  border: 1px solid #133b66
  }
  .ONcarouseItem{
    border: 1px solid #1897f0 !important;
  }
  .bottomItem .carouseItem img{
    height: 100%;
    width: 100%;
  }



  .searchDetail >>> .el-carousel{
    width:8.5rem !important;
    margin-left: 0.5rem;
    transform: scale(0.8);
    transition: all 0.2s;
    transform: rotateZ(0deg)
  }
  .searchDetail >>> .el-carousel__arrow{
    background: rgba(0,0,0,0.5)
  }
  .information {
  position: absolute;
  right: 0rem;
  top: 0.2rem;
  width: 3.5rem;
  z-index: 1;
  font-size: 0.15rem
}
.infotitle{
  color: #409eff;
  font-size: 0.14rem;
}
.information .infomain {
   width: 3rem;
  margin-top: 0.1rem;
  color: #99c9fa ;
  padding-left: 0.2rem;
  /* border: 1px solid rgba(189, 205, 222, 0.27); */
  font-size: 0.14rem;
  /* background-color: rgba(215, 223, 232, 0.27); */
  background:transparent
}

.information .item {
  margin-bottom: 0.1rem;
}
  .tool {
  position: absolute;
  right: 0rem;
  bottom: -1rem;
  width: 3.5rem;
  z-index: 1;
}

.tool >>> .el-button {
  margin: 0;
  padding: 0.1rem 0.15rem;
  background: rgba(225, 225, 225, 0)
}


.tool span {
  color: white;
  font-size: 0.14rem;
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
