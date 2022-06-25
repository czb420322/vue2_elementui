<template>
  <!--<transition name="fade">-->
    <!-- 车辆综合上面部分 -->
    <div class="searchDetail">
      <div  class="detailTop">
          <div  @click="changeTab('tab1')" class="topItem">默认</div>
          <div style="margin-left:15px;" @click="changeTab('tab2')" class="topItem">车牌合并显示</div>
          <div style="margin-left:15px;" @click="changeTab('tab3')" class="topItem">位置合并显示</div>
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
            <el-button class="searchBtn" type="primary" v-show="showdownAll"  @click="downAllImg"><span class="el-icon-download" ></span>批量下载</el-button>
            <el-radio v-model="orderTypePop" label="desc" @change="refreshData">
              <img v-show="orderTypePop=='desc'" class="rorder" src="../../assets/images/carJudged/rorder.png" alt="">
               <img v-show="orderTypePop=='asc'" class="rorder" src="../../assets/images/carJudged/rorderun.png" alt="">
              倒序</el-radio>
            <el-radio v-model="orderTypePop" label="asc" @change="refreshData">
               <img v-show="orderTypePop=='asc'" class="rorder" src="../../assets/images/carJudged/order.png" alt="">
                <img v-show="orderTypePop=='desc'" class="rorder" src="../../assets/images/carJudged/orderun.png" alt="">
               顺序</el-radio>

          </div>
      </div>
      <ul class="resultList">
        <li id='tab1' class="detailMid">
          <div class="carsList">

            <div class="carsDetail" v-for="(item,index) in srD.data.rows" :key="index">
              <!-- <el-button type='primary' @click="downImg(index,item)">下载</el-button> -->

              <div :id="'smallBox_'+index" class="carsPicture" @mouseover="openBigBox(index);setMaskPos(index,$event)" @mousemove="setMaskPos(index,$event)" @click="showCarousel(index)" @mouseout="closeBigBox(index)">
                <!-- <canvas :id="'canvas'+index"></canvas> -->
                <b :id="'img_'+index" class="boderShow"></b>
                <img :class="imgListWH[index]" :id="'imgs_'+index" :src="item.imageUrl" alt="loading">
                <span :id="'mask_'+index" class="mask"></span>
              </div>
              <div :id="'bigBox_'+index" class="bigBox"><img :id="'bigImg_'+index"  :src="item.imageUrl" alt="loading"></div>
              <div class="carsMessage">
                <div class="carsMessageTxt"><span>车&nbsp;&nbsp;牌&nbsp;: &nbsp;</span><span class="plateno" :title="item.plateNo == '@'?'未识别':item.plateNo">{{item.plateNo == '@'?'未识别':item.plateNo}}</span></div>
                <div class="carsMessageTxt" v-show="!item.isCarHead"><span>车&nbsp;&nbsp;型&nbsp;: &nbsp;</span><span :title="item.vehicleModel">{{item.vehicleModel}}</span></div>
                <div class="carsMessageTxt"><span>时&nbsp;&nbsp;间&nbsp;: &nbsp;</span><span :title="item.passTime">{{item.passTime}}</span></div>
                <div class="carsMessageTxt"><span>位&nbsp;&nbsp;置&nbsp;: &nbsp;</span><span class="tollgatep" :title="item.tollgatePlace">{{item.tollgatePlace}}</span></div>
                <div class="carsMessageTxt"><span>方&nbsp;&nbsp;向&nbsp;: &nbsp;</span><span :title="item.direction">{{item.direction}}</span></div>
                <div class="carsMessageTxt oprList">
                  <!-- <span>操&nbsp;&nbsp;作&nbsp;: &nbsp;</span> -->
                  <span>快捷操作&nbsp;:</span>
                  <span title="图片下载" class="opr opr9" @click="downImg(index,item)"></span>
                  <span v-show="imgSearchBtn" class="opr opr1 " title="以图搜车" @click="goToSearchImg(item.imageUrl)"></span>
                  <span v-show="firstToCityBtn" class="opr opr2" title="初次入城" @click="goToFirstToCity(item.plateNo)"></span>
                  <span v-show="footHoldBtn" class="opr opr3" title="落脚点分析" @click="goToFootHold(item.plateNo)"></span>
                  <span v-show="trackBackBtn" class="opr opr4" title="轨迹重现" @click="goToTrackBack(item.plateNo)"></span>
                  <span v-show="plateOverMuchBtn" class="opr opr5" title="一牌多车分析" @click="goToPlateOverMuch(item.plateNo)"></span>
                  <span v-show="drivingTogetherBtn" class="opr opr7" title="同行车分析" @click="goToDrivingTogether(item.plateNo)"></span>
                  <span v-show="deployApplyBtn" class="opr opr8" title="布控申请" @click="goToDeployApply(item.plateNo)"></span>
                </div>
                <!-- <span class="opr opr9" title="添加线索池" @click="goToAddDeploy(item.vehicleId,item.imageUrl,item.passTime,item.tollgatePlace)"></span> -->
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
            <!-- <span class="demonstration">调整每页显示条数</span>
            <el-pagination
              :background=true
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage2"
              :page-sizes="[10]"
              :page-size="10"
              layout="sizes, prev, pager, next"
              :total="100">
            </el-pagination> -->


            </div>
        </li>

        <!--车牌合并显示-->
        <li id='tab2' style="display: none" class="detailMid">
          <div class="dataWrap">
              <el-table
              ref="table1"
              :data="currentListPN[0]"
              style="width: 30%">
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50"

              >
              </el-table-column>
              <el-table-column
                prop="plateNo"
                align="center"
                show-overflow-tooltip
                label="车牌号"
              >
                <template slot-scope="scope">
                    <span>{{scope.row.plateNo == '@'?'未识别':scope.row.plateNo}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="vehicleCount"
                align="center"
                show-overflow-tooltip
                label="过车次数"
                 width="80"
              >
                  <template slot-scope="scope">
                    <span @click="getPNDetail(scope.row.plateNo)"><a href="javascript:;">{{scope.row.vehicleCount}}</a></span>
                </template>
              </el-table-column>

            </el-table>
            <!-- sffffffffffffffffffffffffffffffffff -->
            <!-- <table>
              <thead>
              <tr>
                <th width="50">序号</th>
                <th width="225">车牌号</th>
                <th width="75">过车次数</th>
              </tr>
              </thead>
              <tr v-for="(item, index) in currentListPN[0]">
                <td>{{index+1+(pageNo-1)* pageSize}}</td>
                <td>{{item.plateNo == '@'?'未识别':item.plateNo}}</td>
                <td @click="getPNDetail(item.plateNo)"><a href="javascript:;">{{item.vehicleCount}}</a></td>
              </tr>
              <tr v-if="!currentListPN[0].length">
                <td colspan="3">暂无数据</td>
              </tr>
            </table> -->
                 <el-table
              ref="table1"
              :data="currentListPN[1]"
              style="width: 30%">
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50"
                :index="indexMethod"
              >
              </el-table-column>
              <el-table-column
                prop="plateNo"
                align="center"
                show-overflow-tooltip
                label="车牌号"
              >
                <template slot-scope="scope">
                    <span>{{scope.row.plateNo == '@'?'未识别':scope.row.plateNo}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="vehicleCount"
                align="center"
                show-overflow-tooltip
                label="过车次数"
                 width="80"
              >
                  <template slot-scope="scope">
                    <span @click="getPNDetail(scope.row.plateNo)"><a href="javascript:;">{{scope.row.vehicleCount}}</a></span>
                </template>
              </el-table-column>

            </el-table>
            <!-- aaaaaaaaaaaaaaaaaaaaaaaaaa -->
            <!-- <table>
              <thead>
              <tr>
                <th width="50">序号</th>
                <th width="225">车牌号</th>
                <th width="75">过车次数</th>
              </tr>
              </thead>
              <tr  v-for="(item, index) in currentListPN[1]">
                <td>{{index+(pageSize/3)*1+1+(pageNo-1)* pageSize}}</td>
                <td>{{item.plateNo == '@'?'未识别':item.plateNo}}</td>
                <td @click="getPNDetail(item.plateNo)"><a href="javascript:;">{{item.vehicleCount}}</a></td>
              </tr>
              <tr v-if="!currentListPN[1].length">
                <td colspan="3">暂无数据</td>
              </tr>
            </table> -->

              <el-table
              ref="table1"
              :data="currentListPN[2]"
              style="width: 30%">
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50"
                :index="indexMethodtwo"
              >
              </el-table-column>
              <el-table-column
                prop="plateNo"
                align="center"
                show-overflow-tooltip
                label="车牌号"
              >
                <template slot-scope="scope">
                    <span>{{scope.row.plateNo == '@'?'未识别':scope.row.plateNo}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="vehicleCount"
                align="center"
                show-overflow-tooltip
                label="过车次数"
                 width="80"
              >
                  <template slot-scope="scope">
                    <span @click="getPNDetail(scope.row.plateNo)"><a href="javascript:;">{{scope.row.vehicleCount}}</a></span>
                </template>
              </el-table-column>

            </el-table>
                <!-- dddddddddddddddddddddddd -->
            <!-- <table>
              <thead>
              <tr>
                <th width="50">序号</th>
                <th width="225">车牌号</th>
                <th width="75">过车次数</th>
              </tr>
              </thead>
              <tr  v-for="(item, index) in currentListPN[2]">
                <td>{{index+(pageSize/3)*2+1+(pageNo-1)* pageSize}}</td>
                <td>{{item.plateNo == '@'?'未识别':item.plateNo}}</td>
                <td @click="getPNDetail(item.plateNo)"><a href="javascript:;">{{item.vehicleCount}}</a></td>
              </tr>
              <tr v-if="!currentListPN[2].length">
                <td colspan="3">暂无数据</td>
              </tr>
            </table> -->
          </div>
          <div class="pageNation pagePN">

            <el-pagination
              :background=true
              @size-change="handleSizeChangePN"
              @current-change="handleCurrentChangePN"
              :current-page="Number(pageNo)"
              :page-sizes="[21, 42]"
              :page-size="Number(pageSize)"
              layout="total, sizes, prev, pager, next, jumper"
              :total="Number(total)">
            </el-pagination>

          </div>
        </li>

        <!--位置合并显示-->
        <li id='tab3' style="display: none" class="detailMid">
          <div class="dataWrap">
              <el-table
              ref="table1"
              :data="currentListT[0]"
              style="width: 30%"
              >
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50"
              >
              </el-table-column>
              <el-table-column
                prop="tollgatePlace"
                align="center"
                show-overflow-tooltip
                label="卡口位置"
              >
              </el-table-column>
              <el-table-column
                prop="vehicleCount"
                align="center"
                show-overflow-tooltip
                label="过车数量"
                 width="80"
              >
                  <template slot-scope="scope">
                    <span @click="getTDetail(scope.row.tollgateId)"><a href="javascript:;">{{scope.row.vehicleCount}}</a></span>
                </template>
              </el-table-column>

            </el-table>
            <!-- <table>
              <thead>
              <tr>
                <th width="50">序号</th>
                <th width="225">卡口位置</th>
                <th width="75">过车数量</th>
              </tr>
              </thead>
              <tr v-for="(item, index) in currentListT[0]">
                <td>{{index+1+(srT.data.pageNo-1)* srT.data.pageSize}}</td>
                <td>{{item.tollgatePlace}}</td>
                <td @click="getTDetail(item.tollgateId)"><a href="javascript:;">{{item.vehicleCount}}</a></td>
              </tr>
              <tr v-if="!currentListT[0].length">
                <td colspan="3">暂无数据</td>
              </tr>
            </table> -->
              <el-table
              ref="table1"
              :data="currentListT[1]"
              style="width: 30%"
              >
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50"
              >
              </el-table-column>
              <el-table-column
                prop="tollgatePlace"
                align="center"
                show-overflow-tooltip
                label="卡口位置"
              >
              </el-table-column>
              <el-table-column
                prop="vehicleCount"
                align="center"
                show-overflow-tooltip
                label="过车数量"
                 width="80"
              >
                  <template slot-scope="scope">
                    <span @click="getTDetail(scope.row.tollgateId)"><a href="javascript:;">{{scope.row.vehicleCount}}</a></span>
                </template>
              </el-table-column>

            </el-table>
            <!-- <table>
              <thead>
              <tr>
                <th width="50">序号</th>
                <th width="225">卡口位置</th>
                <th width="75">过车数量</th>
              </tr>
              </thead>
              <tr  v-for="(item, index) in currentListT[1]">
                <td>{{index+(srT.data.pageSize/3)*1+1+(srT.data.pageNo-1)* srT.data.pageSize}}</td>
                <td>{{item.tollgatePlace}}</td>
                <td @click="getTDetail(item.tollgateId)"><a href="javascript:;">{{item.vehicleCount}}</a></td>
              </tr>
              <tr v-if="!currentListT[1].length">
                <td colspan="3">暂无数据</td>
              </tr>
            </table> -->
              <el-table
              ref="table1"
              :data="currentListT[2]"
              style="width: 30%"
              >
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50"
              >
              </el-table-column>
              <el-table-column
                prop="tollgatePlace"
                align="center"
                show-overflow-tooltip
                label="卡口位置"
              >
              </el-table-column>
              <el-table-column
                prop="vehicleCount"
                align="center"
                show-overflow-tooltip
                label="过车数量"
                 width="80"
              >
                  <template slot-scope="scope">
                    <span @click="getTDetail(scope.row.tollgateId)"><a href="javascript:;">{{scope.row.vehicleCount}}</a></span>
                </template>
              </el-table-column>

            </el-table>
            <!-- <table>
              <thead>
              <tr>
                <th width="50">序号</th>
                <th width="225">卡口位置</th>
                <th width="75">过车数量</th>
              </tr>
              </thead>
              <tr  v-for="(item, index) in currentListT[2]">
                <td>{{index+(srT.data.pageSize/3)*2+1+(srT.data.pageNo-1)* srT.data.pageSize}}</td>
                <td>{{item.tollgatePlace}}</td>
                <td @click="getTDetail(item.tollgateId)"><a href="javascript:;">{{item.vehicleCount}}</a></td>
              </tr>
              <tr v-if="!currentListT[2].length">
                <td colspan="3">暂无数据</td>
              </tr>
            </table> -->
          </div>
          <div class="pageNation">

            <el-pagination
              :background=true
              @size-change="handleSizeChangeT"
              @current-change="handleCurrentChangeT"
              :current-page="Number(srT.data.pageNo)"
              :page-sizes="[18, 21, 30, 42, 54, 99]"
              :page-size="Number(srT.data.pageSize)"
              layout="total, sizes, prev, pager, next, jumper"
              :total="Number(srT.data.total)">
            </el-pagination>


          </div>

        </li>

      </ul>
      <car-detail :isShow="showCarDetail" :type="currentType" :carParams="currentParams" :carResult="carResult" @closeCarDetail="closeCarDetail"></car-detail>

      <el-dialog
        title="图片信息"
        :visible.sync="carousel"
        width="14rem"
        :modal-append-to-body="false"
        @close="closeCarousel">
        <el-carousel ref="carouselEl" id="carouselEl" height="7rem" arrow="never" :autoplay="false" :initial-index='0' indicator-position="none" @change="changeActive"  >
          <template v-if="srD.data.rows">
          <el-carousel-item v-for="(item,index) in srD.data.rows" :key="index">
            <div class="carouselImg" :id="'cImg_'+index">
              <img :id="'cImgItem_'+index" :src="item.imageUrl" />
              <div class="facelist" :id="'faceList_'+index">
                <span class="faceItem" v-for="(faceItem,i) in faceStyle[index]" :key="i"><img :style="{'top':-faceItem.top+'px', 'left': -faceItem.left+'px'}" :width="faceItem.width" :height="faceItem.height" :src="item.imageUrl" />
                   <!-- <span class="searchData" @click="searchData(item,i)">搜</span> -->
                </span>

              </div>
              <span :id="'cImgRedBorder_'+index" class="carsRedBorder"></span>
            </div>
          </el-carousel-item>
           </template>
        </el-carousel>

        <div class="bottomWarp">
          <div class="bottomItem" ref="bottomItem">
            <div class="carouseItem" :class="{ONcarouseItem:index == Indexs}" v-for="(item,index) in srD.data.rows" :key="index">
              <img :src="item.imageUrl" @click="setActiveItem(index)">
            </div>
          </div>
        </div>

        <div class="information" v-if="carousel">
          <div class="infotitle"><b>|</b> 车辆标识物</div>
          <div class="infomain">
            <div class="item">车牌号码：{{srD.data.rows[Indexs].plateNo}}</div>
            <div class="item">车牌类型：{{srD.data.rows[Indexs].plateClass}}</div>
            <div class="item">车牌颜色：{{srD.data.rows[Indexs].plateColor}}</div>
            <div class="item">车型：{{srD.data.rows[Indexs].vehicleModel}}</div>
            <div class="item">车辆颜色：{{srD.data.rows[Indexs].vehicleColor}}</div>
            <div class="item">时间：{{srD.data.rows[Indexs].passTime}}</div>
            <div class="item">位置：{{srD.data.rows[Indexs].tollgatePlace}}</div>
            <div class="item">方向：{{srD.data.rows[Indexs].direction}}</div>
            <div class="item">面部：{{srD.data.rows[Indexs].face.length}}</div>
            <div class="item">是否抽烟：{{srD.data.rows[Indexs].smoke | judgeNum }}</div>
            <div class="item">是否打电话：{{srD.data.rows[Indexs].calling  | judgeNum}}</div>
            <div class="item">是否打开遮阳板：{{srD.data.rows[Indexs].sunshield  | judgeNum}}</div>
            <div class="item">是否系安全带：{{srD.data.rows[Indexs].belt  | judgeNum}}</div>
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

        <form action="tvas/downloadFile/downloadImage" method="post" v-for="(item,index) in  srD.data.rows" :key="index" :id="'a'+index" v-show="false" >
          <input type="text" :value="item.tollgatePlace +'-'+ item.passTime.replace(/-/g,'').replace(' ','').replace(/:/g,'')" name="imgName">
          <input type="text" :value="item.imageUrl" name="url">
        </form>


      <!-- 批量下载 -->
      <form action="tvas/downloadFile/batchDownloadImage" method="post" id="downAll"  v-show="false" >
        <input type="text" :value="this.searchParams.category" name="category">
        <input type="text" :value="this.searchParams.isCarHead" name="isCarHead">
        <input type="text" :value="this.searchParams.vehicleKind" name="vehicleKind">
        <input type="text" :value="this.searchParams.vehicleModel" name="vehicleModel">
        <input type="text" :value="this.searchParams.vehicleColor" name="vehicleColor">
        <input type="text" :value="this.searchParams.hasPlate" name="hasPlate">
        <input type="text" :value="this.searchParams.plateNo" name="plateNo">
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
        <input type="text" :value="this.dataUrl + this.otherPort" name="url">
      </form>
    </div>
</template>

<script>
  import  vehicle from '../../api/vehicle/vehicle.js'
  import  carDetail from './carDetail'
  export default {
    components:{
      carDetail
    },
    props:{
      searchType: {
        type: String
      },
      searchTypePN: {
        type: String
      },
      searchTypeT: {
        type: String
      },
      searchParams: {
        type: Object,
        default(){
          return {};
        }
      },
      port:{
        type:String
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
      searchResultPlateNo: {
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
      searchResultTollgate: {
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
    data() {
      return {
        otherPort:'',
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
        showdownAll:true,

        actualPageSize: 210,
        actualPageNo: 1,
        actualData: [],
        pageNo: 1,
        pageSize: 42,
        total: 0,
        Indexs:0,
        carouselElSize:0.8, //缩放大小
        carouselElRotate:0, //旋转
        dataUrl:'',
        timeCircul:null, //循环定时器

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
        srPN: {
          code: null,
          message: "",
          data: {
            pageNo: 0,
            pageSize: 0,
            total: 0,
            rows: []
          },
        },
        srT: {
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
    filters:{
      judgeNum(val){
        if(val == 0 || val == null){
          return '否'
        }else{
          return '是'
        }
      }
    },
    computed:{

      //车牌号搜索的一页数据拆分为三份展示
      currentListPN (){
        let list = this.actualData , clength = this.pageSize/3;
        return [list.slice(0,clength), list.slice(clength,clength*2), list.slice(clength*2,clength*3)];
      },

      //卡口位置搜索的一页数据拆分为三份展示
      currentListT (){
        let list = this.srT.data.rows , clength = this.srT.data.pageSize/3;
        return [list.slice(0,clength), list.slice(clength,clength*2), list.slice(clength*2,clength*3)];
      },

      imgListWH(){
        let arr = [];
        let dList = this.srD.data.rows;
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
            if(dList[i].imageWidth == 0){
               setTimeout(() => {
                let bbb = document.getElementById('img_'+i)
                bbb.style.width =0 + 'px'
                bbb.style.height =0 +'px'
                bbb.style.border = '0px solid red'
                bbb.style.top =  0  + 'px'
                bbb.style.left = 0 + 'px'

              }, 100);
            }else{
               setTimeout(() => {
                let bbb = document.getElementById('img_'+i)
                bbb.style.width =width + 'px'
                bbb.style.height =height +'px'
                bbb.style.border = '1px solid red'
                bbb.style.top =  top  + 'px'
                bbb.style.left = left + 'px'

              }, 100);
            }

          }
        }
        console.log(arr,3333);
        return arr;
      },
      faceStyle (){
        let arr = [];
        let dList = this.srD.data.rows;
        if(dList.length){
          for(let i=0;i<dList.length;i++){
            let arrItem = [];
            let face = dList[i].face;
            //let face = [[0, 10, 50, 90],[100, 200, 360, 450]];
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
                console.log(faceTopPos,999);
                console.log(faceLeftPos,11111);
                console.log(unit,888888888888888);

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
          this.otherPort = this.port
        },
        deep:true
      },
      searchResultPlateNo:{
        handler(newValue,oldValue){
          this.srPN = newValue;
          this.pageNo = 1;
          this.pageSize = 42;
          this.actualPageSize = 210;
          this.actualPageNo = 1;
          this.total = newValue.data.rows.length;
          this.actualData = newValue.data.rows.slice(0,this.pageSize);
        },
        deep:true
      },
      searchResultTollgate:{
        handler(newValue,oldValue){
          this.srT = newValue;
        },
        deep:true
      }
    },
    mixins:[vehicle],
    methods: {
      indexMethod(index){
        return 14 + index + 1
      },
      indexMethodtwo(index){
        return 28 + index + 1
      },
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
                 title: '',
                 message: '抱歉，未查询到符合条件的数据！',
                 position: 'bottom-right',
                 duration:3000
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
                 title: '',
                 message: '抱歉，未查询到符合条件的数据！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert('抱歉，未查询到符合条件的数据！', {icon: 5, title: "消息提示"});
          }
        });
      },
      //车辆合并
      handleSizeChangePN(val){
        //this.srPN.data.pageSize = val;
        //this.srPN.data.pageNo = 1;
        this.pageSize = val;
        this.pageNo  = 1;
        this.actualData = this.srPN.data.rows.slice((this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize);
      },
      handleCurrentChangePN(val) {
        //this.srPN.data.pageNo = val;
        this.pageNo = val;
        let maxPageNo = Math.ceil(this.total / this.pageSize);
        if(this.pageNo == maxPageNo){
          //this.actualPageNo = Math.ceil(this.total / this.actualPageSize) +1;
          this.actualPageNo = this.actualPageNo + 1;
          this.actualData = this.srPN.data.rows.slice((this.pageNo-1)*this.pageSize, this.pageNo*this.pageSize);
        }else{
          this.actualData = this.srPN.data.rows.slice((this.pageNo-1)*this.pageSize, this.pageNo*this.pageSize);
          return;
        }

        // this.loading = this.$loading({
        //   lock: true,
        //   background: "rgba(255,255,255,0.4)",
        //   text: "加载中"
        // });
        let dataParamsPN = this.searchParams;
        dataParamsPN.pageNo = this.actualPageNo;
        dataParamsPN.pageSize = this.actualPageSize;
        dataParamsPN.orderType = this.orderTypePop;

        this.getVD(this.searchTypePN, dataParamsPN, (res)=>{
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
          //this.transValue(res.data, this.srPN);
          if(resData.data.rows.length === 0 ) {
            //layer.alert('抱歉，未查询到符合条件的数据！', {icon: 5, title: "消息提示"});
          }else{
            this.srPN.data.rows = this.srPN.data.rows.concat(resData.data.rows);
            this.total = this.srPN.data.rows.length;
            let pagesize = this.pageSize;
            let pageno = this.pageNo;
            let apno = this.actualPageNo;
            this.$nextTick(function(){
              this.pageSize = pagesize;
              this.pageNo = pageno;
              this.actualPageNo = apno;
              this.actualData = this.srPN.data.rows.slice((this.pageNo-1)*this.pageSize,this.pageNo*this.pageSize);
            });
          }
        });
      },

      //卡口位置
      handleSizeChangeT(val){
        // this.srT.data.pageSize = val;
        // this.srT.data.pageNo = 1;
        let dataParamsT = this.searchParams;
        dataParamsT.pageNo = 1;
        dataParamsT.pageSize = val;
        dataParamsT.orderType = this.orderTypePop;

        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.getVD(this.searchTypeT, dataParamsT, (res)=>{
          this.transValue(res.data, this.srT);
          if(this.srT.data.rows.length === 0 ) {
             this.$notify({
                 type: 'info',
                 title: '',
                 message: '抱歉，未查询到符合条件的数据！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert('抱歉，未查询到符合条件的数据！', {icon: 5, title: "消息提示"});
          }
        });
      },
      handleCurrentChangeT(val) {
        //this.srT.data.pageNo = val;
        let dataParamsT = this.searchParams;
        dataParamsT.pageNo = val;
        dataParamsT.pageSize = this.srT.data.pageSize;
        dataParamsT.orderType = this.orderTypePop;

        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.getVD(this.searchTypeT, dataParamsT, (res)=>{
          this.transValue(res.data, this.srT);
          if(this.srT.data.rows.length === 0 ) {
             this.$notify({
                 type: 'info',
                 title: '',
                 message: '抱歉，未查询到符合条件的数据！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert('抱歉，未查询到符合条件的数据！', {icon: 5, title: "消息提示"});
          }
        });
      },

      //切换标签
      changeTab: function (item) {
        let tabs = [ "tab1", "tab2", "tab3"];
        let topItem = document.getElementsByClassName('topItem');
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i] == item) {
            if(i!=0){
              this.showdownAll = false
            }else if(i ==0){
              this.showdownAll = true
            }
            document.getElementById(tabs[i]).style.display = "block";
            topItem[i].style.backgroundColor = '#409EFF';
            topItem[i].style.color = 'white'
          } else {
            document.getElementById(tabs[i]).style.display = "none";
            topItem[i].style.backgroundColor = '#132f4c';
            topItem[i].style.color = '#99c9fa'
          }
        }

      },
      //重新获取数据
      refreshData (val){
        //this.srD.data.pageNo = 1;
        //this.srD.data.pageSize = 10;
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
                 title: '',
                 message: '抱歉，未查询到符合条件的数据！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert('抱歉，未查询到符合条件的数据！', {icon: 5, title: "消息提示"});
          }
        });

        // this.srPN.data.pageNo = 1;
        // this.srPN.data.pageSize = 42;
        this.pageNo = 1;
        this.pageSize = 42;
        this.actualPageSize = 210;
        this.actualPageNo = 1;
        let dataParamsPN = this.searchParams;
        dataParamsPN.pageNo = 1;
        dataParamsPN.pageSize = 210;
        dataParamsPN.orderType = this.orderTypePop;

        this.getVD(this.searchTypePN, dataParamsPN, (res)=>{
          this.transValue(res.data, this.srPN);
          if(this.srPN.data.rows.length === 0 ) {
             this.$notify({
                 type: 'info',
                 title: '',
                 message: '抱歉，未查询到符合条件的数据！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert('抱歉，未查询到符合条件的数据！', {icon: 5, title: "消息提示"});
          }else{
            this.total = this.srPN.data.rows.length;
            this.actualData = this.srPN.data.rows.slice(0,this.pageSize);
          }
        });

        //this.srT.data.pageNo = 1;
        //this.srT.data.pageSize = 42;
        let dataParamsT = this.searchParams;
        dataParamsT.pageNo = 1;
        dataParamsT.pageSize = 42;
        dataParamsT.orderType = this.orderTypePop;
        this.getVD(this.searchTypeT, dataParamsT, (res)=>{
          this.transValue(res.data, this.srT);
          if(this.srT.data.rows.length === 0 ) {
             this.$notify({
                 type: 'info',
                 title: '',
                 message: '抱歉，未查询到符合条件的数据！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert('抱歉，未查询到符合条件的数据！', {icon: 5, title: "消息提示"});
          }
        });
      },
      getPNDetail(pnId){
        this.currentType = this.searchTypePN + "Q";
        this.currentParams = $.extend({},this.searchParams);
        this.currentParams.plateNo = pnId;
        this.currentParams.pageNo = 1;
        this.currentParams.pageSize = 10;
        this.currentParams.orderBy = "pass_time";
        this.currentParams.orderType =  "desc";
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.getVD(this.currentType, this.currentParams,(res)=>{
          this.transValue(res.data, this.carResult);
        });
        this.showCarDetail = true;
      },
      getTDetail (tId){
        this.currentType = this.searchTypeT + "Q";
        this.currentParams = $.extend({},this.searchParams);
        this.currentParams.tollgateIds = tId;
        this.currentParams.pageNo = 1;
        this.currentParams.pageSize = 10;
        this.currentParams.orderBy = "pass_time";
        this.currentParams.orderType =  "desc";
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.getVD(this.currentType, this.currentParams,(res)=>{
          this.transValue(res.data, this.carResult);
          if(this.carResult.data.rows.length === 0 ) {
             this.$notify({
                 type: 'info',
                 title: '',
                 message: '抱歉，未查询到符合条件的数据！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert('抱歉，未查询到符合条件的数据！', {icon: 5, title: "消息提示"});
          }
        });
        this.showCarDetail = true;
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
                 title: '',
                 message: '未识别车牌无法参与技战法！',
                 position: 'bottom-right',
                 duration:3000
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
                 title: '',
                 message: '未识别车牌无法参与技战法！',
                 position: 'bottom-right',
                 duration:3000
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
                 title: '',
                 message: '未识别车牌无法参与技战法！',
                 position: 'bottom-right',
                 duration:3000
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
                 title: '',
                 message: '未识别车牌无法参与技战法！',
                 position: 'bottom-right',
                 duration:3000
               });
          //layer.alert('未识别车牌无法参与技战法！', {icon: 5, title: "消息提示"});
          return;
        }
        let routeData = this.$router.resolve({ name: 'plateOverMuch', query: { plateNo: plateNo ,menuCode: 310}});
        window.open(routeData.href, '_blank');
      },
      goToDrivingTogether(plateNo){
        if(plateNo == "@" || plateNo == "未识别"){
           this.$notify({
                 type: 'warning',
                 title: '',
                 message: '未识别车牌无法参与技战法！',
                 position: 'bottom-right',
                 duration:3000
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
                 title: '',
                 message: '未识别车牌无法申请布控！',
                 position: 'bottom-right',
                 duration:3000
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
                 title: '',
                 message: '已加入线索池！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert('已加入线索池！',{icon:6,title:"消息提示"});
          }else{
            //this.$alert("加入线索池失败","消息提示");
             this.$notify({
                 type: 'error',
                 title: '',
                 message: '加入线索池失败！',
                 position: 'bottom-right',
                 duration:3000
               });
            //layer.alert('加入线索池失败！',{icon:5,title:"消息提示"});
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

      // 点击搜索人脸详情
      searchData(row,index) {
        console.log(index,3333333333)
        this.$router.push({path: '/carJudged/faceSearch?menuCode=363', query:{faceSearchList:row,index:index}})
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
        clearInterval(this.timeCircul)
        this.carousel = false;
      },


      showCarousel(index){
        this.Indexs = index
        this.carousel = true;
        let _this = this;
         setTimeout(() => {
           _this.redBorderStyle(index, _this.srD.data.rows[index]);
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
      changeActive(newIndex){
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
      //循环播放
      circulationPaly(){
        clearInterval(this.timeCircul)
        this.timeCircul = setInterval(()=>{
          this.$refs["carouselEl"].next();
        },2000)
      },

      //单个下载
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
              icon: 3,
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
      this.dataUrl = window.origin
      this.changeTab('tab1');
      this.srD = this.searchResultDefault;
      this.srPN = this.searchResultPlateNo;
      this.total = this.srPN.data.rows.length;
      this.actualData = this.srPN.data.rows.slice(0,this.pageSize);
      this.srT = this.searchResultTollgate;

      let _this = this;
      //鼠标按下事件
      document.onkeydown = function(e){
        if(e.key == "ArrowLeft" && _this.carousel){
          clearInterval(_this.timeCircul)
          if(!_this.$refs["carouselEl"]){
            _this.$nextTick(function () {
              _this.$refs["carouselEl"].prev();
            });
          }else{
            _this.$refs["carouselEl"].prev();
          }

        }
        if(e.key == "ArrowRight" && _this.carousel){
          clearInterval(_this.timeCircul)
          if(!_this.$refs["carouselEl"]){
            _this.$nextTick(function () {
              _this.$refs["carouselEl"].next();
            });
          }else{
            _this.$refs["carouselEl"].next();
          }
        }
      }

      document.onmousewheel = function(e){
        clearInterval(_this.timeCircul )
        if(e.wheelDelta == 120  && _this.carousel){
          _this.changeScale('large')
        }else if(e.wheelDelta == -120 && _this.carousel){
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
    /* background-color: #f9fafb; */
    border: 1px solid #36506d;
    background-color: rgba(16, 35, 56, 0.5);
    transition: all 1s;
    /* border: 1px solid #dcdfe6; */
    /* border-top:none; */
  }
  .searchDetail a{
    text-decoration:underline;
  }
  .resultList{
    flex: 1;
    display:flex;
    flex-direction: column;

    /* background-color:#f4f6f7;
    background-image: url("../../assets/images/carJudged/watermark.png"); */
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .resultList .detailMid {
    width: 100%;
    padding: 0.06rem 0.3rem 0 0.3rem;
    height: 100%;
    overflow-y: auto;
    /*justify-content: center;*/
    /*align-items: center;*/

  }

  .dataWrap{
    display:flex;
    justify-content: center;
  }
  .dataWrap .el-table {
    margin:0.2rem;
    width: 30%;
    /* text-align: center;
    border-collapse: collapse; */
    font-size: 0.14rem;
    /* color: #606266;
    border-color: grey; */
    border: 2px solid rgba(12, 68, 135, 0.3) !important;
}
 .dataWrap>>> .el-table td,.dataWrap>>> .el-table th.is-leaf {
    border: 1px solid rgba(12, 68, 135, 0.3) !important;
}

  /* .dataWrap tr:nth-child(2n+1), .dataWrap tr:hover {
    background-color: #f7f9fa;
  } */

  /* .dataWrap td {
    border: 1px solid #dedfe0;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 0.36rem;
    font-size: 0.14rem;
    color:#808080;
  } */
  .dataWrap tr td:last-child a{
    color:#3893f2;
    text-decoration: underline;
  }
  .dataWrap td a{
    color:#64acff;
  }

  /* .dataWrap th {
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
  } */

  .detailTop {
    display:flex;
    align-items: center;
    padding-left: 2%;
    height: 0.64rem;
    position: relative;
    border-bottom: 1px solid #1f3b50;
    border-top: 1px solid #264565;
    /* border-left:1px solid #426380;
    border-right: 1px solid #426380; */
    background-color: rgba(19, 41, 66, .9)
    /* box-shadow: 0 0 1px #cdcdcd; */
  }
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
    top: 0.12rem;
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
    /* display: flex; */
    /* align-items: center */
  }

  .detailTop .topSearch .el-button{
    margin-right:0.3rem;
    padding: 0.1rem 0.2rem;
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
    margin: 0.06rem 0.12rem;
    /* border: 1px solid #c9cacd; */
    background:url('../../assets/images/carJudged/carbg.png') center no-repeat ;
    background-size: 100% 100%;
    color:#99c9fa ;
    position: relative;
    padding-bottom: 0.04rem;
    padding-top: 0.04rem;
  }
  .carsDetail .el_button{
    position: absolute;
    top: -0.05rem;
    right: -0.1rem;
    z-index: 1;
    padding: 0.05rem 0.1rem;
    font-size: 0.14rem;
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
    border: 1px solid #133b66;
    /* border-bottom: 2px solid #123051 */
    border-bottom: none
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
    /* border-bottom: 1px solid #dcdfe6; */
    /* box-shadow: 0 1px 1px #cdcdcd; */
    border-bottom: 1px solid #13436E;
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
  .el-dialog__wrapper >>> .el-dialog .el-dialog__body{
    /* background: #e7eef1; */
    padding:0 !important;
    border: 1px solid #13436E;
    margin:0.2rem;
     background-color: rgba(16, 35, 56, 0.5);
    position: relative;
   line-height: 0.24rem !important;
    /* width: calc(100% - 0.4rem);
    height: calc(100% - 0.4rem) */
  }
 .searchDetail .el-dialog__wrapper /deep/ .el-dialog {
  margin-top: 1.4rem !important;
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
    /* <img src="../../assets/images/carJudged/down.png"   alt=""> */
  }

  .pageNation {
    position: relative;
    /* margin-top:0.05rem; */
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
   overflow: auto;
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
  /* .searchDetail >>> .el-dialog__wrapper{
    position: absolute;
  } */

.boderShow{
  position: absolute;
  z-index: 2;
}
.rorder{
  width: 0.21rem;
  height: 0.17rem;
  vertical-align: middle
}
.el-table>>>td {
  padding: 0.05rem 0;
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
