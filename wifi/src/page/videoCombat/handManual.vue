<template>
  <div>
    <el-dialog title="标注信息" :visible.sync="dialogVisible" width="60%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body @close="closeDialog" @open="OpenHandle">
      <span class="handMain" v-if="dialogVisible">
        <div class="HandMainLeft" id="ImgleftHandManual">
          <img id="imgurlHandManual" :src="videoimg" alt="">
          <canvas id="canvasHandManual"></canvas>
          <canvas id="imgcanvas" v-show="false"></canvas>
        </div>
        <div class="HandMainRight">
          <p class="lableTime showcheck">
             <el-radio-group v-model="checkShow" :disabled="ishandupdate" @change="radioChange">
                <el-radio :label="1" :disabled="disabled1">人</el-radio>
                <el-radio :label="2" :disabled="disabled2">骑车人</el-radio>
                <el-radio :label="3" :disabled="disabled3">车辆</el-radio>
              </el-radio-group>
          </p>
          <p class="lableTime">
            <span>标注时间：</span><input type="text" v-model="lableTime" id="test1" placeholder="请输入标注时间"></p>
          <p class="lableTime">
            <span>标注名称：</span><input type="text" v-model="lableName" placeholder="请输入标注名称"></p>
          <!-- <div id="searchImg">
            <img id="imgUrlShow" :src="imgUrlShow" alt="">
          </div> -->
          <ul v-show="carshow">
            <li>
              <span>车牌号码：</span>
              <input type="text" class="carNum" v-model="carPlateNum" placeholder="请输入车牌号码">
            </li>
            <li>
              <span>车辆类型 :&nbsp;</span>
              <el-select v-model="cartarget" placeholder="请选择车辆类型">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
              </el-option></el-select>
            </li>
            <li>
              <span>车牌种类：</span>
              <el-select v-model="PlateClass" placeholder="请选择车辆种类">
                <el-option v-for="item in PlateClassType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>车牌颜色：</span>
              <el-select v-model="carPlateColor" placeholder="请选择车牌颜色">
                <el-option v-for="item in PlateColorType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>车身颜色：</span>
              <el-select v-model="carColor" placeholder="请选择车身颜色">
                <el-option v-for="item in CarColorType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span><b>|</b>&nbsp;备注信息：</span>
              <textarea style="resize: none" maxlength="200" v-model="remark" placeholder="请输入备注信息"></textarea>
            </li>
          </ul>
          <ul v-show="psersonshow">
            <li>
              <span>性别：</span>
              <el-select v-model="Gender" placeholder="请选择性别">
                <el-option v-for="item in GenderType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>体态：</span>
              <el-select v-model="posture" placeholder="请选择体态">
                <el-option v-for="item in BodyType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>民族：</span>
              <el-select v-model="EthicCode" placeholder="请选择民族">
                <el-option v-for="item in EthicCodeType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>年龄段：</span>
              <el-select v-model="PersonAge" placeholder="请选择年龄段">
                <el-option v-for="item in PersonAgeType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>朝向：</span>
              <el-select v-model="PersonView" placeholder="请选择朝向">
                <el-option v-for="item in PersonViewType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>发型：</span>
              <el-select v-model="HairStyle" placeholder="请选择发型">
                <el-option v-for="item in HairStyleType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>头部颜色：</span>
              <el-select v-model="HairColor" placeholder="请选择头部颜色">
                <el-option v-for="item in HairColorStyle" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>上衣类型：</span>
              <el-select v-model="CoatStyle" placeholder="请选择上衣类型">
                <el-option v-for="item in CoatStyleType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>上衣颜色：</span>
              <el-select v-model="Color" placeholder="请选择上衣颜色">
                <el-option v-for="item in ColorType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>上衣纹理：</span>
              <el-select v-model="CoatTexture" placeholder="请选择上衣纹理">
                <el-option v-for="item in CoatTextureType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>下衣类型：</span>
              <el-select v-model="PantsStyle" placeholder="请选择下衣类型">
                <el-option v-for="item in PantsStyleType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>下衣颜色：</span>
              <el-select v-model="CulotteColor" placeholder="请选择下衣颜色">
                <el-option v-for="item in CulotteColorType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>鞋子类型：</span>
              <el-select v-model="ShoesStyle" placeholder="请选择鞋子类型">
                <el-option v-for="item in ShoesStyleType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>鞋子颜色：</span>
              <el-select v-model="ShoesColor" placeholder="请选择鞋子颜色">
                <el-option v-for="item in ShoesColorType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>包类型：</span>
              <el-select v-model="BagStyle" placeholder="请选择包类型">
                <el-option v-for="item in BagStyleType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>包颜色：</span>
              <el-select v-model="BagColor" placeholder="请选择包颜色">
                <el-option v-for="item in BagColorType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>携物：</span>
              <el-select v-model="HandArticle" placeholder="请选择携物">
                <el-option v-for="item in HandArticleType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span><b>|</b>&nbsp;备注信息：</span>
              <textarea style="resize: none" maxlength="200" v-model="remark" placeholder="请输入备注信息"></textarea>
            </li>
          </ul>
          <ul v-show="cpshow">
            <li>
              <span>性别：</span>
              <el-select v-model="Gender" placeholder="请选择性别">
                <el-option v-for="item in GenderType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>体态：</span>
              <el-select v-model="BikeBody" placeholder="请选择体态">
                <el-option v-for="item in BikeBodyType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>民族：</span>
              <el-select v-model="EthicCode" placeholder="请选择民族">
                <el-option v-for="item in EthicCodeType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>年龄段：</span>
              <el-select v-model="PersonAge" placeholder="请选择年龄段">
                <el-option v-for="item in PersonAgeType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>朝向：</span>
              <el-select v-model="BikeTowards" placeholder="请选择朝向">
                <el-option v-for="item in BikeTowardsType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>发型：</span>
              <el-select v-model="BikeHairStyle" placeholder="请选择发型">
                <el-option v-for="item in BikeHairStyleType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>上衣类型：</span>
              <el-select v-model="BikeCoatStyle" placeholder="请选择上衣类型">
                <el-option v-for="item in BikeCoatStyleType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>上衣颜色：</span>
              <el-select v-model="BikeCoatStyleColor" placeholder="请选择上衣颜色">
                <el-option v-for="item in BikeCoatStyleColorType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>上衣纹理：</span>
              <el-select v-model="BikeCoatTexture" placeholder="请选择上衣纹理">
                <el-option v-for="item in BikeCoatTextureType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>下衣类型：</span>
              <el-select v-model="BikeCulotteStyle" placeholder="请选择下衣类型">
                <el-option v-for="item in BikeCulotteStyleType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>下衣颜色：</span>
              <el-select v-model="BikeCulotteColor" placeholder="请选择下衣颜色">
                <el-option v-for="item in BikeCulotteColorType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>包类型：</span>
              <el-select v-model="BikeBag" placeholder="请选择包类型">
                <el-option v-for="item in BikeBagType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>包颜色：</span>
              <el-select v-model="BikeBagColor" placeholder="请选择包颜色">
                <el-option v-for="item in BikeBagColorType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>眼睛：</span>
              <el-select v-model="EyePart" placeholder="请选择眼睛">
                <el-option v-for="item in EyePartType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>嘴：</span>
              <el-select v-model="MouthPart" placeholder="请选择嘴">
                <el-option v-for="item in MouthPartType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>围脖：</span>
              <el-select v-model="ScarfPart" placeholder="请选择围脖">
                <el-option v-for="item in ScarfPartType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>车颜色：</span>
              <el-select v-model="BikeColor" placeholder="请选择车颜色">
                <el-option v-for="item in BikeColorType" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>驾驶人数：</span>
              <el-select v-model="Driver" placeholder="请选择驾驶人数">
                <el-option v-for="item in DriverCount" :key="item.value" :value="item.field" :label="item.field">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>是否打伞：</span>
              <el-select v-model="BikeUmbrella" placeholder="请选择是否打伞">
                <el-option v-for="item in BikeUmbrellaFlag" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span class="font">是否携物：</span>
              <el-select v-model="BikeCarray" placeholder="请选择是否携物">
                <el-option v-for="item in BikeCarraying" :key="item.value" :value="item.value" :label="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span><b>|</b>&nbsp;备注信息：</span>
              <textarea style="resize: none" maxlength="200" v-model="remark" placeholder="请输入备注信息"></textarea>
            </li>
          </ul>
        </div>

      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAll" class="cancleBtn">取 消</el-button>
        <el-button v-show="ishandupdate" v-no-more-click  @click="updatelable" class="cancleBtn">修 改</el-button>
        <el-button @click="judged" v-no-more-click class="rejectBtn" type="success" :disabled="abledBtn" v-show="gandeable">研 判</el-button>
        <el-button type="primary" v-no-more-click class="passBtn" v-show="!ishandupdate" :disabled="abledBtn" @click="videoOK ">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dictionaries from "../../api/realvideo/dictionaries.js";
import uploadVi from "../../api/casestudy/uploadVI.js";
import { imgwh, windowToCanvas } from "../../page/videoCombat/canvas.js";
import videoDown from '../../api/casestudy/videoDown.js'
import reviseTime from '../../api/realvideo/reviseTime.js'
import { mapActions,mapMutations, mapState,mapGetters } from 'vuex'

export default {
  data() {
    return {
      dialogVisible: false,
      cpshow: false,
      carshow: false,
      psersonshow: true,
      videoimg: "", //图片地址
      seek: "", //返回的路径 截取100后的
      seek1: "", //给后台的图片url
      videoseek: "", //视频片段
      pedestrian: {},
      imgUrlShow: "", //图片地址、
      suspicion:'',  //嫌疑目标
      gandeable:false,
      timesId:null,
      showMenual:true,  //手工标注按钮
      checkShow:1,  //显示隐藏
      disabled1: false,
      disabled2: false,
      disabled3: false,
      lableTime:'',
      lableName:'嫌疑目标人',
      timeID:null,
      showcilck:true,
      abledBtn: true,
      recongBtn: false,
      getCaseUrlTimer:null,  //定时循环获取视频片段，回调
      getLable:{}, //得到标注的信息
      videoplaytime:'',   //标注的相对时间
      remark:'',//备注
      // showimg:false,
      options: [ //目标类型： 写死的数据
        {
          value: '4',
          label: "大型车"
        },
        {
          value: "5",
          label: "小型车"
        },
        {
          value: "6",
          label: "卡车"
        },
        {
          value: "8",
          label: "中巴"
        }
      ],
    };
  },
  computed:{
     ...mapGetters([
        'ishandupdate',
        'gethanlabel',
        'deviceInfo',
        'videoretriInfo'  //检索片段的信息
     ])
   },
  watch: {
    isHand(val) {
      this.dialogVisible = val;
    },
    disablegande(val){
      this.gandeable = val
    }
  },
  created () {
  },
  mixins: [dictionaries, uploadVi, reviseTime],
  methods: {
    //打开标注的回调
    OpenHandle() {
      if(this.ishandupdate){
        //修改标注
        this.getupdatelable();
      }else{
        //打开手工标注页面
        this.getnewlable();
      }
    },

    //打开手工标注以及研判的修改页面
    getupdatelable(){
       setTimeout(()=>{
          this.$nextTick(()=>{
            let row = this.gethanlabel
            console.log(row,'查看时间');
            this.getLable = {}
            for (let i = 0; i < row.attrs.length; i++) {
              let key = row.attrs[i].itemCode
              let val = row.attrs[i].valueName
              this.getLable[key] = val
            }
            if(row.videoMark.absoluteTime){
              console.log(this.gethanlabel.absoluteTime,'文件时间');
              this.lableTime = this.getTrajectory(row.videoMark.absoluteTime,Number(row.videoMark.relativeTime),Number(row.videoMark.offset))
            }else{
              console.log(this.gethanlabel.videoStartTime,'文件时间2');
              this.lableTime = this.getTrajectory(row.videoMark.videoStartTime,Number(row.videoMark.relativeTime),Number(row.videoMark.offset))
            }
            if(row.videoMark.typeId == 1){
              this.checkShow = 1
              this.lableName = row.videoMark.markName
              this.remark = row.videoMark.remark
              this.psersonshow = true;
              this.carshow = false;
              this.cpshow = false
              this.PersonAge = this.getLable.ageType; //年龄段
              this.EthicCode = this.getLable.ethicCode; // 民族代码
              this.Gender = this.getLable.genderCode; //  性别
              this.BagStyle = this.getLable.bagStyle; // 包款式
              this.BagColor = this.getLable.bagColor; // 包颜色
              this.HandArticle = this.getLable.appendant; // 携物(指手上拿的東西)
              this.PantsStyle = this.getLable.trousersStyle; // 下衣类型
              this.CulotteColor = this.getLable.trousersColor; // 下衣颜色
              this.HairStyle = this.getLable.hairStyle; // 发型
              this.HairColor = this.getLable.hairColor; // 头发颜色
              this.posture = this.getLable.bodyType; //体态
              this.ShoesStyle = this.getLable.shoesStyle; //   鞋子款式
              this.ShoesColor = this.getLable.shoesColor; //  鞋子颜色
              this.CoatStyle = this.getLable.coatStyle; //  上衣款式
              this.Color = this.getLable.coatColor; // 上衣颜色
              this.CoatTexture = this.getLable.coatTexture; //  上衣纹理
              this.PersonView = this.getLable.viewType; //  朝向
            }else if(row.videoMark.typeId == 2){
              this.checkShow = 3
              this.carshow = true;
              this.lableName = row.videoMark.markName
              this.remark = row.videoMark.remark
              this.cpshow = false;
              this.psersonshow  = false;
              this.carPlateColor = this.getLable.plateColor; //车牌颜色
              this.cartarget = this.getLable.traceTypeName; //目标类型
              this.carColor = this.getLable.vehicleColor; //车辆颜色
              this.carPlateNum = this.getLable.plateNo; //车牌号码
              this.PlateClass = this.getLable.plateClass;
            }else if(row.videoMark.typeId == 4){
              this.checkShow = 2
              this.lableName = row.videoMark.markName
              this.remark = row.videoMark.remark
              this.cpshow = true;
              this.carshow = false;
              this.psersonshow = false;
              this.cptarget = this.getLable.traceTypeName; //目标类型
              this.BikeBag = this.getLable.bagStyle; //包款式
              this.BikeBagColor = this.getLable.bagColor; //包颜色
              this.BikeColor = this.getLable.plateColor; // 所骑车颜色
              this.BikeCarray = (this.getLable.carryingType  == 0 || '' || null) ? '否' : '有'; // 是否携物
              this.BikeCulotteStyle = this.getLable.trousersStyle; // 下衣类型
              this.BikeCulotteColor = this.getLable.trousersColor; // 下衣颜色
              this.EyePart = this.getLable.eyePart; // 眼部特征
              this.BikeHairStyle = this.getLable.hairStyle; // 发型
              this.MouthPart = this.getLable.mouthPart; // 嘴部特征
              this.ScarfPart = this.getLable.scarf; //  围脖
              this.BikeBody = this.getLable.bodyType; //   体态
              this.BikeUmbrella = (this.getLable.umbrellaFlag == 0 || '' || null) ? '否' : '有'; //   是否打伞
              this.BikeCoatStyle = this.getLable.coatStyle; //  上衣款式
              this.BikeCoatStyleColor = this.getLable.coatColor; // 上衣颜色
              this.BikeCoatTexture = this.getLable.coatTexture; //  上衣纹理
              this.BikeTowards = this.getLable.viewType; //  朝向
              this.Driver = this.getLable.driverCount; //  驾驶人数
              this.PersonAge = this.getLable.ageType; //  年龄段
              this.EthicCode = this.getLable.ethicCode; // 民族代码
              this.Gender = this.getLable.genderCode; //  性别
            }

            this.videoimg = row.videoMark.videoCaptureUrl
            let imgs
            let divs
            divs = document.getElementById("ImgleftHandManual");
            imgs = document.getElementById("imgurlHandManual");
            let _this = this
            imgs.src = row.videoMark.videoCaptureUrl
              imgs.onload = function () {
                imgwh(imgs, divs);
                setTimeout(()=>{
                  // _this.showimg = true
                  var canvas
                  canvas = document.getElementById("canvasHandManual");
                  canvas.setAttribute("width", this.clientWidth);
                  canvas.setAttribute("height", this.clientHeight);
                  var context = canvas.getContext("2d");
                  context.beginPath();
                  context.lineWidth = 2;
                  context.strokeStyle = "red";
                  context.strokeRect(
                  row.videoMark.videoMarkPos.split(',')[0],
                  row.videoMark.videoMarkPos.split(',')[1],
                  row.videoMark.videoMarkPos.split(',')[2],
                  row.videoMark.videoMarkPos.split(',')[3]
                  );
                },100)
              };



          })
        },200)
    },
    //打卡手工标注页面
    getnewlable(){
      setTimeout(()=>{
        this.lableName = '嫌疑目标人';
        let _this = this;
        this.getCaseUrlTimer = setInterval(function(){
          OngetCaseUrl();
          _this.videoseek = sessionStorage.getItem('Imgseek');
          if(_this.videoseek.length > 5){
            _this.videoseek = sessionStorage.getItem('Imgseek').slice(4);
            _this.showcilck = false;
            clearInterval(_this.getCaseUrlTimer);
          }
        }, 200);
        this.$nextTick(()=>{
          this.clearAll();
          this.videoimg = '';
          this.showMenual = true;
          var canvas = document.getElementById("canvasHandManual");
          canvas.height = 0;
          let timeID = setInterval(() => {
            this.videoimg = sessionStorage.getItem("imgurl");
            if(this.videoimg == -1){
              clearInterval(timeID);
            }else if(this.videoimg != -1 && this.videoimg.length > 5){
              clearInterval(timeID);
              let _this = this;
              document.getElementById("imgurlHandManual").onload = function(){
                let info= _this.videoimg.split('?')[1]
                _this.videoplaytime = info.split('&')[1].split('=')[1]
                setTimeout(()=>{
                  console.log(_this.videoretriInfo.videoStartTime,'文件的时间获取');
                  _this.lableTime = _this.getTrajectory(_this.videoretriInfo.videoStartTime,Number(_this.videoplaytime),Number(_this.deviceInfo.offset))
                },200)
                _this.showMenual = false;
                _this.getcoord();
                imgwh(this,document.getElementById("ImgleftHandManual"));
                // setTimeout(()=>{
                //   _this.showimg = true
                // },100)
                let canvas = document.getElementById("canvasHandManual");
                canvas.setAttribute("width",document.getElementById("imgurlHandManual").clientWidth);
                canvas.setAttribute("height",document.getElementById("imgurlHandManual").clientHeight);
              };
            }
          }, 200);
        })
      },200)

    },
    //关闭
    closeDialog() {
      // this.showimg = false
      this.$emit("childByhand", false);
      sessionStorage.setItem('Imgseek',"");
      this.showcilck = true;
      this.abledBtn = true;
      this.lableName = ''
      this.lableTime = ''
      this.suspicion = '人';
      OnShow();
      this.clearcoord();
    },
    //通过图片获取canvas的宽高
    getCanvaswh() {
      this.$nextTick(()=>{
        var canvas = document.getElementById("canvasHandManual");
        canvas.setAttribute("width",document.getElementById("imgurlHandManual").clientWidth);
        canvas.setAttribute("height",document.getElementById("imgurlHandManual").clientHeight);
      })
    },
    //点击手工标注
    getcoord() {
      this.$nextTick(()=>{
        var canvas = document.getElementById("canvasHandManual");
        canvas.setAttribute("width",document.getElementById("imgurlHandManual").clientWidth);
        canvas.setAttribute("height",document.getElementById("imgurlHandManual").clientHeight);
        var context = canvas.getContext("2d");
        context.beginPath();
        context.lineWidth = 2;
        var hasmove = false
        canvas.onmousedown = e => {
          this.clearcoord();
          hasmove = false
          let ele = windowToCanvas(canvas, e.clientX, e.clientY);
          this.one = ele.x;
          this.two = ele.y;
          canvas.onmousemove = e => {
             hasmove = true
             if(hasmove){
                //鼠标移动的时候
                let ele = windowToCanvas(canvas, e.clientX, e.clientY);
                context.clearRect(0, 0, canvas.width, canvas.height);
                this.three = ele.x;
                this.four = ele.y;
                context.strokeStyle = "red";
                context.strokeRect(
                  this.one,
                  this.two,
                  this.three - this.one,
                  this.four - this.two
                );
             }

          };
        };
        canvas.onmouseup = e => {
          if(hasmove){
            canvas.onmousemove = null;
            context.stroke();
            this.handlab();
          }else{
            context.clearRect(0, 0, canvas.width, canvas.height);
            canvas.onmousemove = null;
            this.clearLable();
          }
          hasmove = false
        };
        canvas.onmouseout =  (e) => {
          hasmove = false
          canvas.onmousemove = null;
        }
      })
    },
    //手工标注框选目标后，跟后台进行进行交互，得到C++返回的结构化信息
    handlab() {
      if (this.one == "") {
        return;
      }
      // if(this.$store.state.recognition == 'true'){
        var imgs = document.getElementById("imgurlHandManual");
        var divs = document.getElementById("canvasHandManual");
        var imgw = imgs.naturalWidth;
        var imgh = imgs.naturalHeight;
        var divw = divs.clientWidth;
        var divh = divs.clientHeight;
        let x = parseInt(imgw * this.one / divw);
        let y = parseInt(imgh * this.two / divh);
        let w = parseInt(imgw * (this.three - this.one) / divw);
        let h = parseInt(imgh * (this.four - this.two) / divh);
        //如果w h 大于0 表示是从左上角开始从下开始画PosX: 655PosY: 787Width: 185Height: 254  第一种方式不变
        //如果 w>0 h<0 表示是从左下角开始从上开始画   PosX: 549 PosY: 1024 Width: 353 Height: -252
        //如果 w<0 h>0 表示是从右上角开始从下开始画  PosX: 794PosY: 849Width: -225 Height: 192
        //如果 w<0 h<0 表示是从右上角开始从下开始画PosX: 816PosY: 1044Width: -237Height: -229
        if(w > 0 && h < 0){
          // 1024 + -252获取高度
          //把左下角横坐标加上元素的高度(负数)，变成左上角的横坐标，然后高度变成正数
          y = y + h
          h = Math.abs(h)
        }else if(w < 0 && h > 0){
          // 把右上角的纵坐标减去宽度变成左上角的纵坐标 然后宽度变成正数
          x = x + w
          w = Math.abs(w)
        }else if(w < 0 && h < 0){
          // 把右上角的纵坐标减去宽度变成左上角的纵坐标 然后宽度变成正数
           //把左下角横坐标加上元素的高度(负数)，变成左上角的横坐标，然后高度变成正数
          x = x + w
          y = y + h
          w = Math.abs(w)
          h = Math.abs(h)
        }


        let data = {
          imgUrl: this.videoimg,
          PosX: x,
          PosY: y,
          Width: w,
          Height: h,
          taskSource: 1
        };
        data = this.$qs.stringify(data);
        this.$http.post("vsas/searchImg/img/recognition", data).then(res => {
          if (res.data.code === 200) {
            this.abledBtn = this.showcilck;
            if (res.data.data[0].type_index === 0) {
              this.lableName = '嫌疑目标人'
              this.checkShow = 1;
              this.suspicion = '人';
              this.pedestrian = res.data.data[0];
              this.psersonshow = true;
              this.carshow = false;
              this.cpshow = false;
              this.persontarget = this.pedestrian.traceTypeName;
              this.PersonAge = this.pedestrian.age_type; //年龄段
              this.EthicCode = this.pedestrian.nation_type; // 民族代码
              this.Gender = this.pedestrian.sex_type; //  性别
              this.BagStyle = this.pedestrian.bag_type; // 包款式
              this.BagColor = this.pedestrian.bagcolor_type; // 包颜色
              this.HandArticle = this.pedestrian.carrying_type; // 携物(指手上拿的東西)
              this.PantsStyle = this.pedestrian.down_type; // 下衣类型
              this.CulotteColor = this.pedestrian.downcolor_type; // 下衣颜色
              this.HairStyle = this.pedestrian.head_type; // 发型
              this.HairColor = this.pedestrian.headcolor_type; // 头发颜色
              this.posture = this.pedestrian.shape_type; //体态
              this.ShoesStyle = this.pedestrian.shoe_type; //   鞋子款式
              this.ShoesColor = this.pedestrian.shoecolor_type; //  鞋子颜色
              this.CoatStyle = this.pedestrian.up_type; //  上衣款式
              this.Color = this.pedestrian.upcolor_type; // 上衣颜色
              this.CoatTexture = this.pedestrian.uptext_type; //  上衣纹理
              this.PersonView = this.pedestrian.view_type; //  朝向
            }
            else if (
              res.data.data[0].type_index === 1 ||
              res.data.data[0].type_index === 2 ||
              res.data.data[0].type_index === 3
            ) {
              this.lableName = '嫌疑骑车人'
              this.checkShow = 2
              this.suspicion = '骑车人'
              this.pedestrian = res.data.data[0];
              this.cpshow = true;
              this.carshow = false
              this.psersonshow = false
              this.cptarget = this.pedestrian.traceTypeName; //目标类型
              this.BikeBag = this.pedestrian.bag_type; //包款式
              this.BikeBagColor = this.pedestrian.bagcolor_type; //包颜色
              this.BikeColor = this.pedestrian.carcolor_type; // 所骑车颜色
              this.BikeCarray = this.pedestrian.carrying_type; // 是否携物
              this.BikeCulotteStyle = this.pedestrian.down_type; // 下衣类型
              this.BikeCulotteColor = this.pedestrian.downcolor_type; // 下衣颜色
              this.EyePart = this.pedestrian.eye_part; // 眼部特征
              this.BikeHairStyle = this.pedestrian.head_type; // 发型
              this.MouthPart = this.pedestrian.mouth_part; // 嘴部特征
              this.ScarfPart = this.pedestrian.scarf; //  围脖
              this.BikeBody = this.pedestrian.shape_type; //   体态
              this.BikeUmbrella = this.pedestrian.umbrella_flag; //   是否打伞
              this.BikeCoatStyle = this.pedestrian.up_type; //  上衣款式
              this.BikeCoatStyleColor = this.pedestrian.upcolor_type; // 上衣颜色
              this.BikeCoatTexture = this.pedestrian.uptext_type; //  上衣纹理
              this.BikeTowards = this.pedestrian.view_type; //  朝向
              this.Driver = this.pedestrian.driver_count; //  驾驶人数
              this.PersonAge = this.pedestrian.age_type; //  年龄段
              this.EthicCode = this.pedestrian.nation_type; // 民族代码
              this.Gender = this.pedestrian.sex_type; //  性别
            }
            else if (
              res.data.data[0].type_index === 4 ||
              res.data.data[0].type_index === 5 ||
              res.data.data[0].type_index === 6 ||
              res.data.data[0].type_index === 7 ||
              res.data.data[0].type_index === 8
            ) {
              this.lableName = '嫌疑目标车'
              this.checkShow = 3
              this.suspicion = '车'
              this.carshow = true;
              this.cpshow = false;
              this.psersonshow = false
              this.pedestrian = res.data.data[0];
              this.carPlateColor = this.pedestrian.plate_color; //车牌颜色
              this.cartarget = this.pedestrian.traceTypeName; //目标类型
              this.carColor = this.pedestrian.vehicle_color_id; //车辆颜色
              this.carPlateNum = this.pedestrian.plate_number; //车牌号码
              this.PlateClass = this.pedestrian.plate_class;
            }else{
              this.$notify({
                type: 'warning',
                message: '不满足智能标注要求,请重新框选或手工填写！',
                position: 'bottom-right',
                duration: 3000
              });
              this.recodebad();
            }
          }
          else{
            this.$notify({
              type: 'warning',
              message: '不满足智能标注要求,请重新框选或手工填写！',
              position: 'bottom-right',
              duration: 3000
            });
            this.recodebad();
          }
        });
      // }
      // else{
      //   this.recodebad();
      // }

    },
    recodebad(){
      this.abledBtn = this.showcilck;
      this.checkShow = 1
      this.lableName = '嫌疑目标人'
      this.suspicion = '人';
      this.PersonAge=this.BagStyle=this.BagColor=this.HandArticle=this.PantsStyle=this.CulotteColor=this.HairStyle=''
      this.HairColor=this.EthicCode=this.Gender=this.posture=this.ShoesStyle=this.ShoesColor=this.CoatStyle=''
      this.Color=this.CoatTexture=this.PersonView=this.PersonStatus=this.pose=this.Behavior=this.HabitualAction=''
      this.psersonshow = true
      this.pedestrian.type_index = 0
      this.pedestrian.obj_left = this.one * document.getElementById("imgurlHandManual").naturalWidth / document.getElementById("canvasHandManual").clientWidth //  左上
      this.pedestrian.obj_top = this.two * document.getElementById("imgurlHandManual").naturalHeight / document.getElementById("canvasHandManual").clientHeight //  左下
      this.pedestrian.obj_right = this.three * document.getElementById("imgurlHandManual").naturalWidth / document.getElementById("canvasHandManual").clientWidth //  右上
      this.pedestrian.obj_bootom = this.four * document.getElementById("imgurlHandManual").naturalHeight / document.getElementById("canvasHandManual").clientHeight
    },

    clearAll(){
      this.PersonAge=this.BagStyle=this.BagColor=this.HandArticle=this.PantsStyle=this.CulotteColor=this.HairStyle=''
      this.HairColor=this.EthicCode=this.Gender=this.posture=this.ShoesStyle=this.ShoesColor=this.CoatStyle=''
      this.Color=this.CoatTexture=this.PersonView=this.PersonStatus=this.pose=this.Behavior=this.HabitualAction=''
      this.PersonAge=this.BikeBag=this.BikeBagColor=this.BikeColor=this.BikeCarray=this.BikeCulotteStyle=this.BikeCulotteColor = ''
      this.Driver=this.EyePart=this.BikeHairStyle=this.MouthPart=this.EthicCode=this.ScarfPart=this.Gender=''
      this.BikeBody=this.cptIndex=this.BikeUmbrella=this.BikeCoatStyle=this.BikeCoatStyleColor=this.BikeCoatTexture=this.BikeTowards=''
      this.PlateClass=this.carPlateColor=this.carPlateNum=this.carColor=''
      this.VehicleBehavior=this.FrontThing=this.RearThing=this.AutoFoilColor=''
      this.remark = ''
    },
    radioChange(lable){
      this.radioIndex = lable
      this.clearAll();
      if(lable == 1){
        this.suspicion = '人'
        //人
        this.lableName = '嫌疑目标人'
        this.psersonshow = true
        this.carshow = false
        this.cpshow = false;
        this.pedestrian.type_index = 0  //后台对应的是0  人
        this.checkShow = 1
      }else if(lable == 2){
        this.suspicion = '骑车人'
        //骑车人
        this.lableName = '嫌疑骑车人'
        this.cpshow = true;
        this.carshow = false
        this.psersonshow = false
        this.pedestrian.type_index = 1  //后台对应的是1  骑车人
        this.checkShow = 2
      }else if(lable == 3){
        this.suspicion = '车'
        //车
        this.lableName = '嫌疑目标车'
        this.carshow = true;
        this.psersonshow = false
        this.cpshow = false;
        this.pedestrian.type_index = 4  //后台对应的是4  车
        this.checkShow = 3
      }
    },

    dataURLtoBlob(dataurl) {// Base64转Blob对象
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    videoOK() {
      if(this.lableName == ''){
        this.$notify({
          type: 'warning',
          message: '请输入嫌疑目标名称！',
          position: 'bottom-right',
          duration: 3000
        });
        return
      }
      if(this.one == ''){
         this.$notify({
          type: 'warning',
          message: '请框选目标',
          position: 'bottom-right',
          duration: 3000
        });
        return
      }
      //5.18添加的重新获取图片然后添加到新的图片
      let imgs  = document.getElementById("imgurlHandManual")
      let cans = document.getElementById("canvasHandManual")
      let canvas = document.getElementById('imgcanvas')
      let img = new Image
      let _this = this
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload =  ()=> {
        //获取点位在图片中的实际坐标
        let one = Math.ceil(_this.one * imgs.naturalWidth / cans.clientWidth) //  左上
        let two = Math.ceil(_this.two * imgs.naturalHeight / cans.clientHeight) //  左下
        let three = Math.ceil(_this.three * imgs.naturalHeight / cans.clientHeight) //  左下
        let four = Math.ceil(_this.four * imgs.naturalHeight / cans.clientHeight) //  左下
        canvas.width = img.width
        canvas.height = img.height
        let context = canvas.getContext('2d')
        context.clearRect(0, 0, img.width, img.height);
        context.beginPath();
        context.lineWidth = 5;
        context.strokeStyle = "red";
        context.drawImage(img, 0, 0, img.width, img.height)
        context.strokeRect(
          one,
          two,
          three - one,
          four - two
        );
        context.stroke();
        let base64Codes = canvas.toDataURL("image/png")
        let files = this.dataURLtoBlob(base64Codes)
        let formData = new FormData();
        let file = new File([files],new Date().getTime()+'.jpg');
        formData.append('files',file);
        this.$http({url:'/sms/uploadFile/upload',method:'post',data:formData}).then(reponse=>{
          console.log(reponse,50000);
          if(reponse.data.code == 200){
            this.dialogVisible = false;
              var AllObj = {};
              if (this.pedestrian.type_index == 0) {
                //行人
                AllObj.ageType = this.PersonAge; //年龄段
                AllObj.bagStyle = this.BagStyle; // 包款式
                AllObj.bagColor = this.BagColor; // 包颜色
                AllObj.appendant = this.HandArticle; // 携物(指手上拿的東西)
                AllObj.trousersStyle = this.PantsStyle; // 下衣类型
                AllObj.trousersColor = this.CulotteColor; // 下衣颜色
                AllObj.hairStyle = this.HairStyle; // 发型
                AllObj.hairColor = this.HairColor; // 头发颜色
                AllObj.ethicCode = this.EthicCode; // 民族代码
                AllObj.genderCode = this.Gender; //  性别
                AllObj.bodyType = this.posture; //体态
                AllObj.shoesStyle = this.ShoesStyle; //   鞋子款式
                AllObj.shoesColor = this.ShoesColor; //  鞋子颜色
                AllObj.traceTypeName = this.persontarget; //行人目标
                AllObj.typeIndex = this.pedestrian.type_index;
                AllObj.coatStyle = this.CoatStyle; //  上衣款式
                AllObj.coatColor = this.Color; // 上衣颜色
                AllObj.coatTexture = this.CoatTexture; //  上衣纹理
                AllObj.viewType = this.PersonView; //  朝向
                AllObj.leftTopX = this.pedestrian.obj_left; //  左上
                AllObj.leftTopY = this.pedestrian.obj_top; //  左下
                AllObj.rightBtmX = this.pedestrian.obj_right; //  右上
                AllObj.rightBtmY = this.pedestrian.obj_bootom; //  右下
              }
              if (this.pedestrian.type_index == 1 || this.pedestrian.type_index == 2 || this.pedestrian.type_index ===3) {
                //骑车人
                AllObj.ageType = this.PersonAge; //年龄段
                AllObj.bagStyle = this.BikeBag; //包款式
                AllObj.bagColor = this.BikeBagColor; //包颜色
                AllObj.plateColor = this.BikeColor; // 所骑车颜色
                AllObj.carryingType = this.BikeCarray == '没' ? 0 : 1; // 是否携物
                AllObj.trousersStyle = this.BikeCulotteStyle; // 下衣类型
                AllObj.trousersColor = this.BikeCulotteColor; // 下衣颜色
                AllObj.driverCount = parseInt(this.Driver) //  驾驶人数
                AllObj.eyePart = this.EyePart; // 眼部特征
                AllObj.hairStyle = this.BikeHairStyle; // 发型
                AllObj.mouthPart = this.MouthPart; // 嘴部特征
                AllObj.ethicCode = this.EthicCode; // 民族代码
                AllObj.scarf = this.ScarfPart; //围脖
                AllObj.genderCode = this.Gender; //  性别
                AllObj.bodyType = this.BikeBody; //   体态
                AllObj.typeIndex = this.pedestrian.type_index; //目标编号
                AllObj.umbrellaFlag = this.BikeUmbrella == '没' ? 0 : 1; //   是否打伞
                AllObj.coatStyle = this.BikeCoatStyle; //  上衣款式
                AllObj.coatColor = this.BikeCoatStyleColor; // 上衣颜色
                AllObj.coatTexture = this.BikeCoatTexture; //  上衣纹理
                AllObj.viewType = this.BikeTowards; //  朝向
                AllObj.traceTypeName = this.cptarget; //目标类型
                AllObj.leftTopX = this.pedestrian.obj_left; //  左上
                AllObj.leftTopY = this.pedestrian.obj_top; //  左下
                AllObj.rightBtmX = this.pedestrian.obj_right; //  右上
                AllObj.rightBtmY = this.pedestrian.obj_bootom; //  右下
                // AllObj.objFeature = this.pedestrian.obj_feature      //  地址
              }
              if (this.pedestrian.type_index == 4 || this.pedestrian.type_index == 5 ||  this.pedestrian.type_index == 6 ||
                this.pedestrian.type_index == 7 ||  this.pedestrian.type_index == 8) {
                //汽车
                AllObj.plateClass = this.PlateClass;
                AllObj.plateColor = this.carPlateColor; //车牌颜色
                AllObj.plateNo = this.carPlateNum; //车辆号牌
                AllObj.vehicleColor = this.carColor; //车辆颜色
                AllObj.vehicleUuid = this.pedestrian.vehicle_id; //车辆ID
                AllObj.typeIndex = this.pedestrian.type_index; //车辆类型
                AllObj.traceTypeName = this.cartarget; //目标类型
                AllObj.leftTopX = this.pedestrian.obj_left; //  左上
                AllObj.leftTopY = this.pedestrian.obj_top; //  左下
                AllObj.rightBtmX = this.pedestrian.obj_right; //  右上
                AllObj.rightBtmY = this.pedestrian.obj_bootom; //  右下
              }
              var arr2 = [];
              for (var key in AllObj) {
                var obj1 = {};
                (obj1["itemCode"] = key), (obj1["valueName"] = AllObj[key]);
                arr2.push(obj1);
              }
              let data1 = {
                mark: {
                  typeId: this.pedestrian.type_index,
                  videoUrl: this.videoseek,
                  videoCaptureUrl:reponse.data.data[0],
                  deviceId:this.deviceId,
                  caseUuid:this.caseUuid,
                  createTime:'',
                  markName:this.lableName,
                  snapshotFile: this.videoimg, //原始图片
                  videoMarkPos:this.one+','+this.two+','+(this.three - this.one)+','+(this.four - this.two),
                  fileUuid:this.videoretriInfo.fileUuid,
                  relativeTime:this.videoplaytime,  //返回给后台的毫秒数
                  genType:1, //1手工标注产生；2研判产生；3天网标注产生',
                  absoluteTime:'',  //针对天网标注
                  markImgBase64Str:'',
                },
                attrs: arr2
              };
              data1 = JSON.stringify(data1);
              let data2 = {
                data: data1,
                featureFlag:0,
                remark:this.remark
              };
              data2 = this.$qs.stringify(data2);
              this.$http.post("/pca/video/mark/mark", data2).then(res => {
                if (res.data.code === 200) {
                  this.$notify({
                    type: 'success',
                    message: '标注成功，已加入标注池',
                    position: 'bottom-right',
                    duration: 3000
                  });
                  // setTimeout(() => {
                  //   this.$notify({
                  //     type: 'success',
                  //     message: '加入标注池成功！',
                  //     position: 'bottom-right',
                  //     duration: 3000
                  //   });
                  // }, 500)
                }else{
                  this.$notify({
                    type: 'error',
                    message: '标注失败',
                    position: 'bottom-right',
                    duration: 3000
                  });
                }
              });
              this.one = '';
              this.clearcoord();
              this.carshow = false
              this.psersonshow = false
              this.cpshow = false;
          }

        })
      }
      img.src = window.origin+ '/fastDfs/'+ this.videoimg.slice(this.videoimg.indexOf('group'),this.videoimg.length)

      // return
      // setTimeout(()=>{
      //   let canvasimg = cans.toDataURL()
      //   let datas = {
      //     imgBase64Str:canvasimg.split(',')[1]
      //   }
      //   datas = this.$qs.stringify(datas)
      //   this.$http.post('sms/uploadFile/upload/base64',datas).then(res=>{
      //     if(res.data.code == 200){

      //     }
      //   })
      // },100)
    },

    //修改标注
    updatelable(){
      if(this.lableName == ''){
        this.$notify({
          type: 'warning',
          message: '请输入嫌疑目标名称！',
          position: 'bottom-right',
          duration: 3000
        });
        return
      }
      this.dialogVisible = false
      var AllObj = {}
      if (this.gethanlabel.videoMark.typeId == 1) { //行人
        AllObj.ageType = this.PersonAge //年龄段
        AllObj.bagStyle = this.BagStyle // 包款式
        AllObj.bagColor = this.BagColor // 包颜色
        AllObj.appendant = this.HandArticle // 携物(指手上拿的東西)
        AllObj.trousersStyle = this.PantsStyle // 下衣类型
        AllObj.trousersColor = this.CulotteColor // 下衣颜色
        AllObj.hairStyle = this.HairStyle // 发型
        AllObj.hairColor = this.HairColor // 头发颜色
        AllObj.ethicCode = this.EthicCode // 民族代码
        AllObj.genderCode = this.Gender //  性别
        AllObj.bodyType = this.posture //体态
        AllObj.shoesStyle = this.ShoesStyle //   鞋子款式
        AllObj.shoesColor = this.ShoesColor //  鞋子颜色
        AllObj.coatStyle = this.CoatStyle //  上衣款式
        AllObj.coatColor = this.Color // 上衣颜色
        AllObj.coatTexture = this.CoatTexture //  上衣纹理
        AllObj.viewType = this.PersonView //  朝向
        AllObj.typeIndex = this.getLable.typeIndex
        AllObj.leftTopX = this.getLable.leftTopX //  左上
        AllObj.leftTopY = this.getLable.leftTopY //  左下
        AllObj.rightBtmX = this.getLable.rightBtmX //  右上
        AllObj.rightBtmY = this.getLable.rightBtmY //  右下
      }
      if (this.gethanlabel.videoMark.typeId == 4) {
        //骑车人
        AllObj.ageType = this.PersonAge //年龄段
        AllObj.bagStyle = this.BikeBag //包款式
        AllObj.bagColor = this.BikeBagColor //包颜色
        AllObj.plateColor = this.BikeColor // 所骑车颜色
        AllObj.carryingType = this.BikeCarray == '没' ? 0 : 1 // 是否携物
        AllObj.trousersStyle = this.BikeCulotteStyle // 下衣类型
        AllObj.trousersColor = this.BikeCulotteColor // 下衣颜色
        AllObj.driverCount = parseInt(this.Driver) //  驾驶人数
        AllObj.eyePart = this.EyePart // 眼部特征
        AllObj.hairStyle = this.BikeHairStyle // 发型
        AllObj.mouthPart = this.MouthPart // 嘴部特征
        AllObj.ethicCode = this.EthicCode // 民族代码
        AllObj.scarf = this.ScarfPart //围脖
        AllObj.genderCode = this.Gender //  性别
        AllObj.bodyType = this.BikeBody //   体态
        AllObj.umbrellaFlag = this.BikeUmbrella == '没' ? 0 : 1 //   是否打伞
        AllObj.coatStyle = this.BikeCoatStyle //  上衣款式
        AllObj.coatColor = this.BikeCoatStyleColor // 上衣颜色
        AllObj.coatTexture = this.BikeCoatTexture //  上衣纹理
        AllObj.viewType = this.BikeTowards //  朝向
        AllObj.traceTypeName = this.cptarget //目标类型
        AllObj.typeIndex = this.getLable.typeIndex
        AllObj.leftTopX = this.getLable.leftTopX //  左上
        AllObj.leftTopY = this.getLable.leftTopY //  左下
        AllObj.rightBtmX = this.getLable.rightBtmX //  右上
        AllObj.rightBtmY = this.getLable.rightBtmY //  右下
      }
      if (this.gethanlabel.videoMark.typeId == 2) { //汽车
        AllObj.plateClass = this.PlateClass
        AllObj.plateColor = this.carPlateColor; //车牌颜色
        AllObj.plateNo = this.carPlateNum; //车辆号牌
        AllObj.vehicleColor = this.carColor; //车辆颜色
        AllObj.vehicleUuid = this.getLable.vehicleUuid; //车辆ID
        AllObj.vehicleClass = this.cartarget; //目标类型
        AllObj.traceTypeName = this.cartarget; //目标类型
        AllObj.typeIndex = this.getLable.typeIndex
        AllObj.leftTopX = this.getLable.leftTopX //  左上
        AllObj.leftTopY = this.getLable.leftTopY //  左下
        AllObj.rightBtmX = this.getLable.rightBtmX //  右上
        AllObj.rightBtmY = this.getLable.rightBtmY //  右下
      }
      var arr2 = [];
      for (var key in AllObj) {
        var obj1 = {}
        obj1["itemCode"] = key,
        obj1["valueName"] = AllObj[key]
        arr2.push(obj1)
      }
      let data1 = {
        mark: {
          typeId: this.gethanlabel.videoMark.typeId,
          videoUrl: this.gethanlabel.videoMark.videoUrl,
          videoCaptureUrl: this.gethanlabel.videoMark.videoCaptureUrl,
          deviceId: this.gethanlabel.videoMark.deviceId,
          caseUuid: this.gethanlabel.videoMark.caseUuid,
          createTime: document.getElementById("test1").value,
          markName: this.lableName,
          markId:this.gethanlabel.videoMark.markId
        },
        attrs: arr2,
      }
      data1 = JSON.stringify(data1)
      let data2
      data2 = {
        data: data1,
        remark:this.remark
      }
      data2 = this.$qs.stringify(data2)
      this.$http.post('vsas/video/mark/update', data2).then(res => {
        this.dialogVisible = false;
        if (res.data.code == 200) {
          this.$notify({
            type: 'success',
            message: '修改成功',
            position: 'bottom-right',
            duration: 3000
          });
        } else {
          this.$notify({
            type: 'error',
            message: '修改失败',
            position: 'bottom-right',
            duration: 3000
          });
        }
      })
    },
    //清空标注
    clearcoord() {
      var canvas = document.getElementById("canvasHandManual");
      canvas.height = document.getElementById("imgurlHandManual").clientHeight;
      this.carshow = false
      this.cpshow = false;
      this.one = "";
      this.psersonshow = true
      this.checkShow = 1
      this.clearAll();
    },
    closeAll(){
      this.dialogVisible = false;
      this.clearcoord()
    },


    //研判消息
    judged() {
      if(this.lableName == ''){
        this.$notify({
          type: 'warning',
          message: '请输入研判目标名称！',
          position: 'bottom-right',
          duration: 3000
        });
        return
      }
      if(this.one == ''){
         this.$notify({
          type: 'warning',
          message: '请框选目标',
          position: 'bottom-right',
          duration: 3000
        });
        return
      }
       //5.18添加的重新获取图片然后添加到新的图片
      //5.18添加的重新获取图片然后添加到新的图片
      let imgs  = document.getElementById("imgurlHandManual")
      let cans = document.getElementById("canvasHandManual")
      let canvas = document.getElementById('imgcanvas')
      let img = new Image
      let _this = this
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload =  ()=> {
        //获取点位在图片中的实际坐标
        let one = Math.ceil(_this.one * imgs.naturalWidth / cans.clientWidth) //  左上
        let two = Math.ceil(_this.two * imgs.naturalHeight / cans.clientHeight) //  左下
        let three = Math.ceil(_this.three * imgs.naturalHeight / cans.clientHeight) //  左下
        let four = Math.ceil(_this.four * imgs.naturalHeight / cans.clientHeight) //  左下
        canvas.width = img.width
        canvas.height = img.height
        let context = canvas.getContext('2d')
        context.clearRect(0, 0, img.width, img.height);
        context.beginPath();
        context.lineWidth = 5;
        context.strokeStyle = "red";
        context.drawImage(img, 0, 0, img.width, img.height)
        context.strokeRect(
          one,
          two,
          three - one,
          four - two
        );
        context.stroke();
        let base64Codes = canvas.toDataURL("image/png")
        let files = this.dataURLtoBlob(base64Codes)
        let formData = new FormData();
        let file = new File([files],new Date().getTime()+'.jpg');
        formData.append('files',file);
        this.$http({url:'/sms/uploadFile/upload',method:'post',data:formData}).then(reponse=>{
          console.log(reponse,50000);
          if(reponse.data.code == 200){
            var AllObj = {};
            AllObj.createTimeStr = document.getElementById("test1").value;
            AllObj.markName = this.lableName;
            if(this.pedestrian.type_index == 0 || this.checkShow == 1){  //行人
                AllObj.ageType = this.PersonAge;      //年龄段
                AllObj.bagStyle = this.BagStyle;         // 包款式
                AllObj.bagColor = this.BagColor;      // 包颜色
                AllObj.appendant = this.HandArticle;    // 携物(指手上拿的東西)
                AllObj.trousersStyle = this.PantsStyle;         // 下衣类型
                AllObj.trousersColor = this.CulotteColor;      // 下衣颜色
                AllObj.hairStyle = this.HairStyle;         // 发型
                AllObj.hairColor = this.HairColor;          // 头发颜色
                AllObj.ethicCode = this.EthicCode;         // 民族代码
                AllObj.genderCode = this.Gender;            //  性别
                AllObj.bodyType = this.posture;        //体态
                AllObj.shoesStyle = this.ShoesStyle    //   鞋子款式
                AllObj.shoesColor = this.ShoesColor           //  鞋子颜色
                AllObj.traceTypeName =   this.persontarget     //行人目标
                AllObj.typeIndex = this.pedestrian.type_index
                AllObj.coatStyle = this.CoatStyle  //  上衣款式
                AllObj.coatColor = this.Color            // 上衣颜色
                AllObj.coatTexture = this.CoatTexture      //  上衣纹理
                AllObj.viewType = this.PersonView      //  朝向
                AllObj.leftTopX = this.pedestrian.obj_left      //  左上
                AllObj.leftTopY = this.pedestrian.obj_top      //  左下
                AllObj.rightBtmX = this.pedestrian.obj_right     //  右上
                AllObj.rightBtmY = this.pedestrian.obj_bootom      //  右下
            }
            if(this.pedestrian.type_index == 1 || this.pedestrian.type_index == 2 || this.pedestrian.type_index == 3 || this.checkShow == 2){
              //骑车人
              AllObj.ageType = this.PersonAge  //年龄段
              AllObj.bagStyle = this.BikeBag  //包款式
              AllObj.bagColor = this.BikeBagColor //包颜色
              AllObj.plateColor = this.BikeColor   // 所骑车颜色
              AllObj.carryingType = this.BikeCarray == '没' ? 0 : 1    // 是否携物
              AllObj.trousersStyle = this.BikeCulotteStyle   // 下衣类型
              AllObj.trousersColor = this.BikeCulotteColor  // 下衣颜色
              AllObj.driverCount = parseInt(this.Driver)   //  驾驶人数
              AllObj.eyePart = this.EyePart     // 眼部特征
              AllObj.hairStyle = this.BikeHairStyle// 发型
              AllObj.mouthPart = this.MouthPart    // 嘴部特征
              AllObj.ethicCode = this.EthicCode    // 民族代码
              AllObj.scarf = this.ScarfPart  //围脖
              AllObj.genderCode = this.Gender     //  性别
              AllObj.bodyType = this.BikeBody   //   体态
              AllObj.typeIndex = this.pedestrian.type_index //目标编号
              AllObj.umbrellaFlag = this.BikeUmbrella == '没' ? 0 : 1   //   是否打伞
              AllObj.coatStyle = this.BikeCoatStyle//  上衣款式
              AllObj.coatColor = this.BikeCoatStyleColor   // 上衣颜色
              AllObj.coatTexture = this.BikeCoatTexture     //  上衣纹理
              AllObj.viewType = this.BikeTowards     //  朝向
              AllObj.leftTopX = this.pedestrian.obj_left      //  左上
              AllObj.leftTopY = this.pedestrian.obj_top      //  左下
              AllObj.rightBtmX = this.pedestrian.obj_right     //  右上
              AllObj.rightBtmY = this.pedestrian.obj_bootom      //  右下
            }
            if(this.pedestrian.type_index == 4 || this.pedestrian.type_index == 5 || this.pedestrian.type_index == 6 ||
              this.pedestrian.type_index == 7 || this.pedestrian.type_index == 8 || this.checkShow == 3){  //汽车
                AllObj.plateClass = this.PlateClass;
                AllObj.plateColor = this.carPlateColor; //车牌颜色
                AllObj.plateNo = this.carPlateNum; //车辆号牌
                AllObj.vehicleColor = this.carColor; //车辆颜色
                AllObj.vehicleUuid = this.pedestrian.vehicle_id; //车辆ID
                AllObj.typeIndex = this.pedestrian.type_index; //车辆类型
                AllObj.traceTypeName = this.cartarget; //目标类型
                AllObj.vehicleClass = this.cartarget; //目标类型
                AllObj.leftTopX = this.pedestrian.obj_left; //  左上
                AllObj.leftTopY = this.pedestrian.obj_top; //  左下
                AllObj.rightBtmX = this.pedestrian.obj_right; //  右上
                AllObj.rightBtmY = this.pedestrian.obj_bootom; //  右下
            }
            var arr2 = [];
            for (var key in AllObj) {
              var obj1 = {}
              obj1["itemCode"] = key,
              obj1["valueName"] =AllObj[key]
              arr2.push(obj1)
            }
            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            let userId = userInfo.value.userId;
            let userName = userInfo.value.trueName
            let dataList = {
                mark: {
                  typeId:this.pedestrian.type_index,
                  videoUrl:this.videoseek,
                  videoCaptureUrl:reponse.data.data[0],
                  markName:this.lableName,
                  snapshotFile: this.videoimg, //原始图片
                  videoMarkPos:this.one+','+this.two+','+(this.three - this.one)+','+(this.four - this.two),
                  fileUuid:this.videoretriInfo.fileUuid,
                  relativeTime:this.videoplaytime,  //返回给后台的毫秒数
                  genType:2, //1手工标注产生；2研判产生；3天网标注产生',
                  absoluteTime:'',  //针对天网标注
                  videoStartTime:this.videoretriInfo.videoStartTime,
                  markImgBase64Str:'',
                  remark:this.remark
                },
                attrs:arr2,
                judgeVote:{
                  caseUuid:this.caseUuid,
                  deviceId:this.deviceId,
                  userId:userId,
                  suspicion:this.suspicion, //嫌疑目标
                  beginTime:'',  //时间
                  description:'',  //描述
                  location:'',  //位置
                  vedioUrl:this.videoseek,   //视频地址
                  imgUrl:reponse.data.data[0],   //图片地址
                  userName:userName,
                }
            }
            dataList = JSON.stringify(dataList);
            let data1 = {
              data:dataList
            };
            data1 = this.$qs.stringify(data1);
            this.$http.post('pca/synergyvote/save',data1).then(res=>{
              if(res.data.code == 200){
                this.dialogVisible = false;
                this.clearcoord();
                this.$notify({
                  type: 'success',
                  message: '研判成功',
                  position: 'bottom-right',
                  duration: 3000
                });
              }else{
                this.$notify({
                  type: 'error',
                  message: res.data.message,
                  position: 'bottom-right',
                  duration: 3000
                });
              }
            })
          }
        })
      }
      img.src = window.origin+ '/fastDfs/'+ this.videoimg.slice(this.videoimg.indexOf('group'),this.videoimg.length)
      // return
      // setTimeout(()=>{
      //   let canvasimg = cans.toDataURL()
      //    let datas = {
      //     imgBase64Str:canvasimg.split(',')[1]
      //   }
      //   datas = this.$qs.stringify(datas)
      //   this.$http.post('sms/uploadFile/upload/base64',datas).then(res=>{
      //     if(res.data.code == 200){
      //     }
      //   })
      // },100)





    }
  },
  props: {
    isHand: Boolean,
    deviceId:String,
    disablegande:Boolean,
    caseUuid:String
  }
};
</script>

<style scoped>
@import '../../assets/css/commom.css';
.el-dialog__wrapper{
  z-index: 3500 !important;
}
body /deep/  .el-select-dropdown{
  z-index: 4444 !important;
}
body /deep/ .el-popper{
   z-index: 4444 !important;
}
/* .el-select{
  z-index: 9999 !important;
} */
#searchImg {
  width: 100%;
  height: 2rem;
  border: 1px solid #000;
  position: relative;
  overflow: hidden;
}
/* #searchImg img{
  width: 100%;
  height: 100%;
  border: 1px solid red;
} */
.handMain {
  width: 100%;
  height: 5rem;
  display: inline-block;
}
.HandMainLeft {
  position: relative;
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}
.HandMainLeft canvas {
  z-index: 999;
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
.HandMainLeft img {
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
.el-dialog__wrapper >>> .el-dialog__header {
  background-color: #f3f6f8;
}
.el-dialog__wrapper >>> .el-dialog__footer {
  border-top: 1px solid #d5dade;
}
.el-dialog__wrapper >>> .el-dialog__body {
  padding: 10px 20px;
}
.handMain > div:first-child {
  width: 70%;
  height: 100%;
  float: left;
  /* border: 1px solid #ccc; */
}
.handMain > div:last-child {
  margin-left: 71%;
  width: 29%;
  height: 100%;
  /* border: 1px solid #ccc; */
}
.el_btn .el-button {
  padding: 0.05rem 0.15rem;
}
.el_btn {
  position: absolute;
  bottom: 5px;
  padding-left: 0.2rem;
}
.HandMainRight {
  position: relative;
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}
.HandMainRight ul {
  /* border: 1px solid #000; */
  height: 72%;
  padding-top: 0.1rem;
  overflow: auto;
}
.HandMainRight ul li {
  padding-bottom: 0.1rem;
}
.HandMainRight ul li span {
  width: 1rem;
  display: inline-block;
  text-align: right;
  color: #99c9fa;
}
.HandMainRight ul li .el-select {
  height: 0.3rem;
  width: 1.8rem;
}
.HandMainRight ul li input {
  height: 0.3rem;
  width: 1.8rem;
  border: 1px solid #dcdfe6;
  padding-left: 0.2rem;
  border-radius: 3px;
  color: #606266;
}
.HandMainRight ul li >>> .el-input__inner {
  height: 0.3rem;
}
.lableTime {
  margin-top: 0.1rem;
}
.lableTime span {
  display: inline-block;
  width: 1rem;
  text-align: right;
  color: #99c9fa;
}
.lableTime input {
  width: 1.8rem;
  padding-left: 0.15rem;
  line-height: 0.3rem;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
}
.showcheck{
  padding: 0 0.3rem;
}
#imgcanvas{
  opacity: 0;
}
</style>
