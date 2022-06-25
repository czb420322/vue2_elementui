<template>
 <div>
  <el-dialog title="新增图片线索" :visible.sync="dialogVisible" @open="openDia" @close="closeClue" width="70%">
          <span class="addimgclue">
            <div class="imgleft">
              <p class="imgtitle"><b>| </b>添加图片</p>
              <p class="fileimg">
                <i>*</i>
                <span>上传图片：</span>
                <input type="file" @change="fileChange($event)" accept = 'image/*' id="upload_file" multiple>
                  <el-button class="searchBtn" type="primary" @click="fileClick">1.上传图片</el-button>
                  <el-button class="tryBtn" type="warning" @click="Startagg" :disabled="disableStart">2.开始标注</el-button>
                  <el-button class="searchBtn" type="primary" @click="handlable" :disabled="disableVideo">3.确认标注</el-button>
                  <!-- <el-button type="success" @click="savelable">4.修改标注信息</el-button> -->
                  <el-button class="delBtn" type="danger" @click="clearcoord">4.清空标注</el-button>
              </p>
              <div class="putimg">
                <div class="putimg_top">
                  <div class="put_left">
                    <div v-for="(item,index) in imglist" :key="index">
                      <p class="el-icon-close" @click="fileDels(index)"></p>
                      <img :src="item.file.src" :index="index" id="imgs" @click="getlable($event,index)">
                    </div>
                  </div>
                  <div class="put_right"  @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">
                    <p class="el-icon-plus"></p>
                    <div>将文件拖拽到此处</div>
                  </div>
                </div>
                <div class="putimg_btn" id="putImg">
                  <p class="el-icon-close big-icon-close " @click="deleteimg" v-show="isdelete"></p>
                  <!-- <div class="btns">
                    <el-button type="warning" @click="Startagg">2.开始标注</el-button>
                    <el-button type="primary" @click="handlable">3.确认标注</el-button>
                    <el-button type="success" @click="savelable">4.修改标注信息</el-button>
                    <el-button type="danger" @click="clearcoord">5.清空标注</el-button>
                  </div> -->
                  <img :src="bigimg" id="imgstwo">
                  <canvas id="canvas"></canvas>
                </div>
              </div>
            </div>
            <div class="imgright">
              <p class="imgtitle"><b>| </b>目标标注</p>
              <div class="infos">
                <div class="lableshow" id="clickBtn" v-for="(item,i) in lableList" :key="i" :class="{'actives':item.actives}" @click="showInfo(item,i)">
                  <span>{{item[2]+(i+1)}}&nbsp; <i class="el-icon-close" @click.stop="deletelbale(i)"></i> </span>
                </div>
              </div>
              <p class="imgtype"><span>目标类型:</span>
               <el-radio-group v-model="person" @change="radioChange">
                  <el-radio :label="1" :disabled="disabled1">人</el-radio>
                  <el-radio :label="2" :disabled="disabled2">骑车人</el-radio>
                  <el-radio :label="3" :disabled="disabled3">车辆</el-radio>
                </el-radio-group>
              </p>
              <div class="imgtrait">
                <ul v-show="carshow">
                  <li>
                    <span>标注名称：</span>
                    <input type="text" class="carNum" @blur="savelable" v-model="lableName" placeholder="请输入标注名称">
                  </li>
                  <li>
                    <span>标注时间：</span>
                    <input type="text" v-model="lableTime" id="test1" placeholder="请输入标注时间">
                  </li>
                  <li>
                    <span>车牌号码：</span>
                    <input @blur="savelable" type="text" class="carNum" v-model="carPlateNum" placeholder="请输入车牌号码">
                  </li>
                  <li>
                    <span>车牌种类：</span>
                    <el-select v-model="PlateClass"  @change="savelable" placeholder="请选择车牌种类">
                      <el-option v-for="item in PlateClassType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>车牌颜色：</span>
                    <el-select v-model="carPlateColor" @change="savelable" placeholder="请选择车牌颜色">
                      <el-option v-for="item in PlateColorType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>车身颜色：</span>
                    <el-select v-model="carColor" @change="savelable" placeholder="请选择车身颜色">
                      <el-option v-for="item in CarColorType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li v-show="ismorshow">
                    <span>可疑行为：</span>
                    <el-select v-model="VehicleBehavior" @change="savelable" placeholder="请选择可疑行为">
                      <el-option v-for="item in VehicleBehaviorType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li v-show="ismorshow">
                    <span>车前物品：</span>
                    <el-select v-model="FrontThing" @change="savelable" placeholder="请选择车前物品">
                      <el-option v-for="item in FrontThingType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li v-show="ismorshow">
                    <span>车后物品：</span>
                    <el-select v-model="RearThing" @change="savelable" placeholder="请选择车后物品">
                      <el-option v-for="item in RearThingType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li v-show="ismorshow">
                    <span>车膜颜色：</span>
                    <el-select v-model="AutoFoilColor" @change="savelable" placeholder="请选择车膜颜色">
                      <el-option v-for="item in AutoFoilColorType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                </ul>
                <ul v-show="psersonshow">
                  <li>
                    <span>标注名称：</span>
                    <input type="text" @blur="savelable" class="carNum" v-model="lableName" placeholder="请输入标注名称">
                  </li>
                  <li>
                    <span>标注时间：</span>
                    <input type="text" v-model="lableTime" id="test2" @blur="savelable" placeholder="请输入标注时间">
                  </li>
                  <li>
                    <span>性别：</span>
                    <el-select v-model="Gender" @change="savelable" placeholder="请选择性别">
                      <el-option v-for="item in GenderType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>体态：</span>
                    <el-select v-model="posture" @change="savelable" placeholder="请选择体态">
                      <el-option v-for="item in BodyType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>民族：</span>
                    <el-select v-model="EthicCode" @change="savelable" placeholder="请选择民族">
                      <el-option v-for="item in EthicCodeType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>年龄段：</span>
                    <el-select v-model="PersonAge" @change="savelable" placeholder="请选择年龄段">
                      <el-option v-for="item in PersonAgeType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>朝向：</span>
                    <el-select v-model="PersonView" @change="savelable" placeholder="请选择朝向">
                      <el-option v-for="item in PersonViewType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>发型：</span>
                    <el-select v-model="HairStyle" @change="savelable" placeholder="请选择发型">
                      <el-option v-for="item in HairStyleType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>头部颜色：</span>
                    <el-select v-model="HairColor" @change="savelable" placeholder="请选择头发颜色">
                      <el-option v-for="item in HairColorStyle" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>上衣类型：</span>
                    <el-select v-model="CoatStyle" @change="savelable" placeholder="请选择上衣类型">
                      <el-option v-for="item in CoatStyleType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>上衣颜色：</span>
                    <el-select v-model="Color" @change="savelable" placeholder="请选择上衣颜色">
                      <el-option v-for="item in ColorType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>上衣纹理：</span>
                    <el-select v-model="CoatTexture" @change="savelable" placeholder="请选择上衣纹理">
                      <el-option v-for="item in CoatTextureType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>下衣类型：</span>
                    <el-select v-model="PantsStyle" @change="savelable" placeholder="请选择下衣类型">
                      <el-option v-for="item in PantsStyleType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>下衣颜色：</span>
                    <el-select v-model="CulotteColor" @change="savelable" placeholder="请选择下衣颜色">
                      <el-option v-for="item in CulotteColorType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>鞋子类型：</span>
                    <el-select v-model="ShoesStyle" @change="savelable" placeholder="请选择鞋子类型">
                      <el-option v-for="item in ShoesStyleType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>鞋子颜色：</span>
                    <el-select v-model="ShoesColor" @change="savelable" placeholder="请选择鞋子颜色">
                      <el-option v-for="item in ShoesColorType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>包类型：</span>
                    <el-select v-model="BagStyle" @change="savelable" placeholder="请选择包类型">
                      <el-option v-for="item in BagStyleType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>包颜色：</span>
                    <el-select v-model="BagColor" @change="savelable" placeholder="请选择包颜色">
                      <el-option v-for="item in BagColorType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>携物：</span>
                    <el-select v-model="HandArticle" @change="savelable" placeholder="请选择携物">
                      <el-option v-for="item in HandArticleType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li v-show="ismorshow">
                    <span>人的状态：</span>
                    <el-select v-model="PersonStatus" @change="savelable" placeholder="请选择人的状态">
                      <el-option v-for="item in PersonStatusType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                   <li v-show="ismorshow">
                    <span>姿势：</span>
                    <el-select v-model="pose" @change="savelable" placeholder="请选择姿势">
                      <el-option v-for="item in PostureType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <!-- <li v-show="ismorshow">
                    <span>行为：</span>
                    <el-select v-model="Behavior" @change="savelable" placeholder="请选择">
                      <el-option v-for="item in BehaviorType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li> -->
                  <li v-show="ismorshow">
                    <span>习惯动作：</span>
                    <el-select v-model="HabitualAction" @change="savelable" placeholder="请选择习惯动作">
                      <el-option v-for="item in HabitualActionType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                </ul>
                <ul v-show="cpshow">
                  <li>
                    <span>标注名称：</span>
                    <input type="text" @blur="savelable" class="carNum" v-model="lableName" placeholder="请输入标注名称">
                  </li>
                  <li>
                    <span>标注时间：</span>
                    <input type="text" v-model="lableTime" id="test3" @blur="savelable" placeholder="请输入标注时间">
                  </li>
                  <li>
                    <span>性别：</span>
                    <el-select v-model="Gender" @change="savelable" placeholder="请选择性别">
                      <el-option v-for="item in GenderType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>体态：</span>
                    <el-select v-model="BikeBody" @change="savelable" placeholder="请选择体态">
                      <el-option v-for="item in BikeBodyType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>民族：</span>
                    <el-select v-model="EthicCode" @change="savelable" placeholder="请选择民族">
                      <el-option v-for="item in EthicCodeType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>年龄段：</span>
                    <el-select v-model="PersonAge" @change="savelable" placeholder="请选择年龄段">
                      <el-option v-for="item in PersonAgeType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>朝向：</span>
                    <el-select v-model="BikeTowards" @change="savelable" placeholder="请选择朝向">
                      <el-option v-for="item in BikeTowardsType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>发型：</span>
                    <el-select v-model="BikeHairStyle" @change="savelable" placeholder="请选择发型">
                      <el-option v-for="item in BikeHairStyleType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>上衣类型：</span>
                    <el-select v-model="BikeCoatStyle" @change="savelable" placeholder="请选择上衣类型">
                      <el-option v-for="item in BikeCoatStyleType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>上衣颜色：</span>
                    <el-select v-model="BikeCoatStyleColor" @change="savelable" placeholder="请选择上衣颜色">
                      <el-option v-for="item in BikeCoatStyleColorType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>上衣纹理：</span>
                    <el-select v-model="BikeCoatTexture" @change="savelable" placeholder="请选择上衣纹理">
                      <el-option v-for="item in BikeCoatTextureType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>下衣类型：</span>
                    <el-select v-model="BikeCulotteStyle" @change="savelable" placeholder="请选择下衣类型">
                      <el-option v-for="item in BikeCulotteStyleType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>下衣颜色：</span>
                    <el-select v-model="BikeCulotteColor" @change="savelable" placeholder="请选择下衣颜色">
                      <el-option v-for="item in BikeCulotteColorType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>包类型：</span>
                    <el-select v-model="BikeBag" @change="savelable" placeholder="请选择包类型">
                      <el-option v-for="item in BikeBagType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>包颜色：</span>
                    <el-select v-model="BikeBagColor" @change="savelable" placeholder="请选择包颜色">
                      <el-option v-for="item in BikeBagColorType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>眼睛：</span>
                    <el-select v-model="EyePart" @change="savelable" placeholder="请选择眼睛">
                      <el-option v-for="item in EyePartType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>嘴：</span>
                    <el-select v-model="MouthPart" @change="savelable" placeholder="请选择嘴">
                      <el-option v-for="item in MouthPartType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>围脖：</span>
                    <el-select v-model="ScarfPart" @change="savelable" placeholder="请选择围脖">
                      <el-option v-for="item in ScarfPartType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>车颜色：</span>
                    <el-select v-model="BikeColor" @change="savelable" placeholder="请选择车颜色">
                      <el-option v-for="item in BikeColorType" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>驾驶人数：</span>
                    <el-select v-model="Driver" @change="savelable" placeholder="请选择驾驶人数">
                      <el-option v-for="item in DriverCount"  :key="item.value" :value="item.field" :label="item.field">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span>是否打伞：</span>
                    <el-select v-model="BikeUmbrella" @change="savelable" placeholder="请选择是否打伞">
                      <el-option v-for="item in BikeUmbrellaFlag" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                  <li>
                    <span class="font">是否携物：</span>
                    <el-select v-model="BikeCarray" @change="savelable" placeholder="请选择是否携物">
                      <el-option v-for="item in BikeCarraying" :key="item.value" :value="item.value" :label="item.value">
                    </el-option></el-select>
                  </li>
                </ul>
              </div>
              <p class="more" v-show="iscpshow" @click="showMore">{{title}}</p>
            </div>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button class="cancleBtn"  @click="clearcoord();cancleDia()">取消</el-button>
            <el-button class="passBtn" :disabled="showUpload" @click="UploadImg">确定</el-button>
          </span>
  </el-dialog>
 </div>
</template>

<script>
import { imgwh, windowToCanvas } from "../../videoCombat/canvas.js";
import dictionaries from "../../../api/realvideo/dictionaries.js";
import uploadVi from "../../../api/casestudy/uploadVI.js";
import fileupload from "../../../api/casestudy/fileupload.js";


export default {
  data() {
    return {
      dialogVisible: false,
      actives: false,
      ismorshow: false, //是否展示更多
      disabled1: true,
      disabled2: true,
      disabled3: true,
      person: 1,
      imglist: [], //装图片的集合
      lableList: [], //标注数组,
      bigimg: "", //放大图
      isdelete: false, //是否删除
      hotspotId: "", //案发点ID
      index: 0, // 图片的索引
      pedestrian: {}, //识别对象
      cpshow: false,
      carshow: false,
      psersonshow: false,
      deviceUuid: "",
      radioIndex:'',
      lableName:'',
      lableTime:'',
      showUpload:true,
      iscpshow:false,
      title:'展开更多'
    };
  },
  watch: {
    isImg(val) {
      this.dialogVisible = val;
    },
    deviceid(val) {
      this.deviceUuid = val;
      console.log(this.deviceUuid,7777);
    },
  },
  props: {
    isImg: Boolean,
    deviceid:String
  },
  mixins: [fileupload, dictionaries, uploadVi],
  methods: {
    showMore(){
      this.ismorshow = !this.ismorshow
      if(this.ismorshow){
        this.title = '隐藏'
      }else{
        this.title = '展开更多'
      }
    },
    openDia(){
      this.showUpload = true
      this.clearAll();
      this.lableTime = this.getCurrentDate();
      this.$nextTick(()=>{
        laydate.render({
          elem: '#test1', //指定元素
          type:'datetime',
          format:'yyyy-MM-dd HH:mm:ss',
          max:this.getCurrentDate(),
          done(value, date, endDate){
            this.lableTime = value;
          },
        });
        laydate.render({
          elem: '#test2', //指定元素
          type:'datetime',
          format:'yyyy-MM-dd HH:mm:ss',
          max:this.getCurrentDate(),
          done(value, date, endDate){
            this.lableTime = value;
          },
        });
        laydate.render({
          elem: '#test3', //指定元素
          type:'datetime',
          format:'yyyy-MM-dd HH:mm:ss',
          max:this.getCurrentDate(),
          done(value, date, endDate){
            this.lableTime = value;
          },
        });
      })
    },
    cancleDia() {
      this.iscpshow = false
      this.isDiscernError = true
      this.dialogVisible = false;
      this.imglist = []
      this.lableList = []
      this.isdelete = false
      this.$emit("childByimg", this.dialogVisible);
    },
    closeClue() {
      this.cancleDia();
      this.disableVideo = true
      this.imglist = []
      this.lableList = []
      this.bigimg = null;
      this.disabled1 = this.disabled2 = this.disabled3 = true;
      this.cpshow = this.psersonshow = this.carshow = false;
      var canvas = document.getElementById("canvas");
      canvas.height = document.getElementById("imgstwo").clientHeight;
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
    },
    //清空标注
    clearcoord() {
      this.disableVideo = this.disableStart = false
      this.one = 0;
      this.person = 1
      this.isDiscernError = true;
      this.allowCoord = false;
      this.psersonshow = this.carshow = this.cpshow = false;
      var canvas = document.getElementById("canvas");
      canvas.height = document.getElementById("imgstwo").clientHeight;
      this.clearAll();
    },
    //删除视频
    fileDels(index) {
      this.imglist.splice(index, 1);
      this.bigimg = null;
      this.isdelete = false;
    },
    deleteimg() {
      this.clearcoord();
      this.bigimg = "";
      this.isdelete = false;
    },
    //删除数组
    deletelbale(i) {
      if(this.lableList.length == 0){
        this.showUpload = true
      }
      this.cpshow = this.carshow = this.psersonshow = false;
      this.lableList.splice(i, 1);
      this.clearcoord();
      var canvas = document.getElementById("canvas");
      canvas.height = document.getElementById("imgstwo").clientHeight;
    },
    //点击单选按钮改变的事件
    radioChange(lable) {
      this.radioIndex = lable
      this.lableTime = this.getCurrentDate();
      this.clearAll();
      if (lable == 1) {
        this.iscpshow = true
        this.psersonshow = true;
        this.carshow = this.cpshow =this.ismorshow =false;
      } else if (lable == 2) {
        this.iscpshow = false
        this.cpshow = true;
        this.carshow = this.psersonshow = this.ismorshow =false;
      } else if (lable == 3) {
        this.iscpshow = true
        this.carshow = true;
        this.psersonshow = this.cpshow = this.ismorshow =false;
      }
    }
  }
};
</script>

<style scoped>
@import '../../../assets/css/commom.css';
.el-dialog__wrapper >>> .el-dialog__header {
  background-color: #f3f6f8;
  font-size: 0.18rem;
}
.el-dialog__wrapper >>> .el-dialog__body {
  padding: 0.2rem;
  font-size: 0.14rem;
}
.el-dialog__wrapper >>> .el-dialog__footer {
  padding: 0.2rem;
  border-top: 1px solid #ccc;
  text-align: center;
}
.el-button {
  padding: 0.1rem 0.2rem;
  font-size: 0.14rem;
}
.el-dialog__wrapper >>> .el-button {
  padding: 0.1rem 0.5rem;
  margin-right: 0.5rem;
}
.bottons {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
}
.bottons .el-button {
  margin-right: 0.2rem;
}
.addimgclue {
  display: block;
  height: 6rem;
  padding: 0 0.2rem;
   background-color: rgba(16, 35, 56, 0.5);
}
.imgleft {
  width: 48%;
  height: 100%;
  float: left;
  /* border: 1px solid #000; */
  color:#99c9fa ;
  /* background-color: rgba(16, 35, 56, 0.5);  */
}
.fileimg i {
  font-style: normal;
  color: red;
  vertical-align: middle;
}
.fileimg .el-button {
  cursor: pointer;
  padding: 0.05rem 0.15rem;
  margin-right: 0.1rem;
}

.imgright {
  width: 50%;
  margin-left: 50%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
}
.imgright .infos {
  padding: 0.05rem;
}

.lableshow {
  display: inline-block;
  background-color: #409eff;
  color: #fff;
  /* border: 1px solid #fff; */
  border-radius: 5px;
  padding: 0.02rem 0.12rem;
  margin-right: 0.1rem;
  margin-bottom: 0.1rem;
  cursor: pointer;
}

.imgtitle  {
  color: #fff;
}
.imgtitle {
  font-size: 0.14rem;
  font-weight: 700;
}
.imgtype,
.fileimg {
  line-height: 0.4rem;
  margin-left: 0.1rem;
  position: relative;
}
.fileimg input {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  z-index: 1;
  opacity: 0;
}
.imgtype span {
  margin-right: 0.1rem;
  color:#99c9fa
}
.imgtype>>>.el-radio-group .el-radio__label{
  color:#99c9fa
}
.putimg {
  height: 83%;
  position: relative;
  /* border: 1px solid #000; */
}
.imgtrait {
  flex: 1;
  overflow: auto;
  height: 85%;
  padding: 0.3rem 0;
  padding-top: 0;
  /* background-color: rgba(16, 35, 56, 0.5);  */
  /* background-color: #fcfcfb; */
}
.imgtrait ul {
  padding: 0 0.15rem;
}
.imgtrait ul li {
  float: left;
  width: 50%;
  color: #99c9fa ;
  margin-top: 0.2rem;
}
.imgtrait ul li span {
  width: 0.8rem;
  display: inline-block;
}
.imgtrait ul li input {
  height: 0.3rem;
  border: 1px solid #dcdfe6;
  padding-left: 0.15rem;
  border-radius: 4px;
  width: 2rem;
}
.imgtrait ul li >>> .el-select > .el-input {
  width: 2rem;
}
.imgtrait ul li >>> .el-input__inner {
  height: 0.3rem;
}
.imgtrait ul li select {
  height: 0.25rem;
  color: #909399;
  border: 1px solid #dcdfe6;
  width: calc(100% - 1.5rem);
}

.putimg {
  padding-left: 0.95rem;
}
.putimg_top {
  width: 100%;
  border: 1px solid rgba(16, 35, 56, 0.9);
  height: 25%;
  padding: 0.1rem;
  /* background-color: #f3f6f9; */
  /* background-color: rgba(16, 35, 56, 0.9);  */
      background-color: rgba(0,0,0,.2);
}
.putimg_btn {
  margin-top: 2%;
  height: 70%;
  position: relative;
  border: 1px solid rgba(16, 35, 56, 0.9);
  background:rgba(0,0,0,.2)
}
.putimg_btn img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.putimg_btn p {
  position: absolute;
  right: 0;
  z-index: 9999;
  color: #fff;
}

/* .addvideoclue{
  display: inline-block;
  padding:0 0.3rem;
} */
.addvideoclue p span {
  margin: 0.1rem 0;
  width: 1.2rem;
  display: inline-block;
  text-align: right;
  margin-right: 0.1rem;
}
.addvideoclue p input {
  width: calc(100% - 1.5rem);
  height: 0.3rem;
  border: 1px solid #dcdfe6;
  padding-left: 0.1rem;
}
.addvideoclue p i {
  color: red;
  font-style: normal;
}
.addvideoclue p .input {
  width: calc(100% - 4rem);
}
.fileviode {
  position: relative;
  margin-left: 0.3rem;
  margin-top: 0.1rem;
}
.el-upload__tip {
  color: red;
}
.fileviode .el-button {
  padding: 0.05rem 0.1rem;
}
.put_left {
  width: 60%;
  height: 100%;
  overflow: auto;
  float: left;
}
.put_left div {
  height: calc(100% - 0.1rem);
  float: left;
  width: 31%;
  margin-right: 2%;
  position: relative;
  margin-bottom: 2%;
  /* border: 1px solid #000; */
}
.put_left div p {
  cursor: pointer;
  position: absolute;
  color: #fff;
  right: 0;
}

.put_left div img {
  width: 100%;
  height: 100%;
}
.put_right {
  width: 40%;
  margin-left: 60%;
  height: 100%;
  text-align: center;
  color: #ccc;
  /* background-color: rgba(0,0,0,.2); */
  border: 1px dashed #4d6b8c;
}
.put_right p {
  margin-top: 0.3rem;
}
.putvideo_btn {
  border: 1px solid #dcdfe6;
  height: 1rem;
  width: calc(100% - 1.5rem);
  margin-left: 1.3rem;
}
.more {
  position: absolute;
  right: 0.1rem;
  bottom: 0.05rem;
  cursor: pointer;
  color: #409eff;
}
.actives {
  background-color: red;
}

.putimg_btn canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 99;
}
.putimg_btn .btns{
  position: absolute;
  bottom: 0.1rem;
  left: 0.2rem;
  z-index:999
}
.putimg_btn .btns .el-button{
  padding: 0.05rem 0.1rem;
  margin-right: 0.1rem;
}
.passBtn{
  cursor: pointer;
}
/* #putImg{
  padding:0.1rem;
}
#putImg #imgstwo{
  width: calc(100% - 0.2rem) !important;
  max-width: calc(100% - 0.2rem);
  max-height:calc(100% - 0.2rem);
} */
.big-icon-close{
  right:0.1rem !important
}
</style>
