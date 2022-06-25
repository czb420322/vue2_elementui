<!--
 * @Author: chenxf
 * @Date: 2020-05-17 16:47:05
 * @LastEditTime : 2020-07-22 11:40:11
 * @LastEditors  : chenxf
 * @Description:
 * @FilePath: \vacp-wfes\src\components\parproperty\targetproperty.vue
 * @
 -->
<template>
    <div class="detail">
        <div class="ownNature oneNature">
            <p class="natureName">目标属性</p>
            <p class="natureName">案件名称</p>
            <p class="natureName">案发时间</p>
            <p class="natureName">嫌疑目标
                <el-select v-model="suspicion" @change="changeSus" value-key="suspicionUuid">
                    <el-option v-for="sus in susperList" :key="sus.suspicionUuid" :value="sus" :label="sus.suspicionName"></el-option>
                </el-select>
            </p>
            <p class="natureName">目标对象
                <el-select v-model="lableModel" @change="getchangeSus" value-key="videoMark.markId">
                    <el-option v-for="item in lableMarkList" :key="item.videoMark.markId" :value="item" :label="item.videoMark.markName"></el-option>
                </el-select>
            </p>
            <!-- 人 -->
            <p v-show="sustarget == 1" class="natureName">目标年龄段</p>
            <p v-show="sustarget == 1" class="natureName">目标包类型</p>
            <p v-show="sustarget == 1" class="natureName">目标包颜色</p>
            <p v-show="sustarget == 1" class="natureName">目标携物</p>
            <p v-show="sustarget == 1" class="natureName">目标下衣类型</p>
            <p v-show="sustarget == 1" class="natureName">目标下衣颜色</p>
            <p v-show="sustarget == 1" class="natureName">目标发型</p>
            <p v-show="sustarget == 1" class="natureName">目标头发颜色</p>
            <p v-show="sustarget == 1" class="natureName">目标民族</p>
            <p v-show="sustarget == 1" class="natureName">目标性别</p>
            <p v-show="sustarget == 1" class="natureName">目标体态</p>
            <p v-show="sustarget == 1" class="natureName">目标鞋子类型</p>
            <p v-show="sustarget == 1" class="natureName">目标鞋子颜色</p>
            <p v-show="sustarget == 1" class="natureName">目标上衣类型</p>
            <p v-show="sustarget == 1" class="natureName">目标上衣颜色</p>
            <p v-show="sustarget == 1" class="natureName">目标上衣纹理</p>
            <p v-show="sustarget == 1" class="natureName">目标朝向</p>
            <!-- <p v-show="sustarget == 1" class="natureName">目标状态</p>
            <p v-show="sustarget == 1" class="natureName">目标姿态</p>
            <p v-show="sustarget == 1" class="natureName">目标行为</p>
             <p v-show="sustarget == 1" class="natureName">目标动作习惯</p> -->
            <!-- 骑车人 -->
            <p v-show="sustarget == 2" class="natureName">目标年龄段</p>
            <p v-show="sustarget == 2" class="natureName">目标包类型</p>
            <p v-show="sustarget == 2" class="natureName">目标包颜色</p>
            <p v-show="sustarget == 2" class="natureName">目标车颜色</p>
            <p v-show="sustarget == 2" class="natureName">目标是否携物</p>
            <p v-show="sustarget == 2" class="natureName">目标下衣类型</p>
            <p v-show="sustarget == 2" class="natureName">目标下衣颜色</p>
            <p v-show="sustarget == 2" class="natureName">目标驾驶人数</p>
            <p v-show="sustarget == 2" class="natureName">目标眼部特征</p>
            <p v-show="sustarget == 2" class="natureName">目标发型</p>
            <p v-show="sustarget == 2" class="natureName">目标嘴部特征</p>
            <p v-show="sustarget == 2" class="natureName">目标民族</p>
            <p v-show="sustarget == 2" class="natureName">目标围脖</p>
            <p v-show="sustarget == 2" class="natureName">目标性别</p>
            <p v-show="sustarget == 2" class="natureName">目标体态</p>
            <p v-show="sustarget == 2" class="natureName">目标是否打伞</p>
            <p v-show="sustarget == 2" class="natureName">目标上衣类型</p>
            <p v-show="sustarget == 2" class="natureName">目标上衣颜色</p>
            <p v-show="sustarget == 2" class="natureName">目标上衣纹理</p>
            <p v-show="sustarget == 2" class="natureName">目标朝向</p>
            <!-- 汽车 -->
            <p v-show="sustarget == 3" class="natureName">目标车牌种类</p>
            <p v-show="sustarget == 3" class="natureName">目标车牌颜色</p>
            <p v-show="sustarget == 3" class="natureName">目标车辆号牌</p>
            <p v-show="sustarget == 3" class="natureName">目标车辆颜色</p>
            <!-- <p v-show="sustarget == 3" class="natureName">目标可疑行为</p> -->
            <!-- <p v-show="sustarget == 3" class="natureName">目标前部物品类型</p>
            <p v-show="sustarget == 3" class="natureName">目标后部物品类型</p>
            <p v-show="sustarget == 3" class="natureName">目标车模颜色</p> -->
            <p class="natureName operation">操作</p>
        </div>
        <div class="ownNature twoNature">
            <p class="natureName natureNamefirst">原点案件</p>
            <p :title="dataCaseInfo.caseName" class="natureItem">{{ dataCaseInfo.caseName }}</p>
            <p :title="dataCaseInfo.timeLowLimit" class="natureItem">{{ dataCaseInfo.timeLowLimit }}</p>
            <p :title="suspicion.suspicionName" class="natureItem">{{suspicion.suspicionName}}</p>
            <p :title="susName" class="natureItem">{{ susName }}</p>
            <!-- 人 -->
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.ageType) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.bagStyle) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.bagColor) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.appendant) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.trousersStyle) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.trousersColor) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.hairStyle) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.hairColor) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.ethicCode) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.genderCode) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.bodyType) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.shoesStyle) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.shoesColor) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.coatStyle) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.coatColor) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.coatTexture) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.viewType) }}</p>
            <!-- <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.status) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.gesture) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.behavior) }}</p>
            <p v-show="sustarget == 1" class="natureItem">{{ isEmpty(lableInfoMan.habitualMovement) }}</p> -->

            <!-- 骑车人 -->
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.ageType) }}</p>
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.bagStyle) }}</p>
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.bagColor) }}</p>
            <!-- <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.plateColor) }}</p> -->
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.vehicleColor) }}</p>

            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.carryingType) }}</p>
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.trousersStyle) }}</p>
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.trousersColor) }}</p>
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.driverCount,true) }}</p>
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.eyePart) }}</p>
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.hairStyle) }}</p>
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.mouthPart) }}</p>
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.ethicCode) }}</p>
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.scarf) }}</p>
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.genderCode) }}</p>
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.bodyType) }}</p>
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.umbrellaFlag) }}</p>
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.coatStyle) }}</p>
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.coatColor) }}</p>
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.coatTexture) }}</p>
            <p v-show="sustarget == 2" class="natureItem">{{ isEmpty(lableInfoMan.viewType) }}</p>
            <!-- 汽车 -->
            <p v-show="sustarget == 3" class="natureItem">{{ isEmpty(lableInfoMan.plateClass) }}</p>
            <p v-show="sustarget == 3" class="natureItem">{{ isEmpty(lableInfoMan.plateColor) }}</p>
            <p v-show="sustarget == 3" class="natureItem">{{ isEmpty(lableInfoMan.plateNo) }}</p>
            <p v-show="sustarget == 3" class="natureItem">{{ isEmpty(lableInfoMan.vehicleColor) }}</p>
            <!-- <p v-show="sustarget == 3" class="natureItem">{{ isEmpty(lableInfoMan.behavior) }}</p> -->
            <!-- <p v-show="sustarget == 3" class="natureItem">{{ isEmpty(lableInfoMan.vehicleFrontItem) }}</p>
            <p v-show="sustarget == 3" class="natureItem">{{ isEmpty(lableInfoMan.vehicleRearItem) }}</p>
            <p v-show="sustarget == 3" class="natureItem">{{ isEmpty(lableInfoMan.filmColor) }}</p> -->
            <p class="natureItem operation"></p>
        </div>
        <div v-for="(item,index) in caseList" :key="index" class="ownNature threeNature">
            <p class="natureName natureNamefirst">候选案件</p>
            <p :title="item.caseName" class="natureItem">{{item.caseName}}</p>
            <p :title="item.timeLowLimit" class="natureItem">{{item.timeLowLimit}}</p>
            <p class="natureItem">{{item.caseSuspicion.suspicionName}}</p>
            <p :title="item.motorVehicle.markName" v-if="sustarget == 3" class="natureItem">{{item.motorVehicle.markName}}</p>
            <p :title="item.person.markName" v-if="sustarget == 1" class="natureItem">{{item.person.markName}}</p>
            <p :title="item.bicycle.markName" v-if="sustarget == 2" class="natureItem">{{item.bicycle.markName}}</p>

            <!-- 人 -->
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.ageType) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.bagStyle) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.bagColor) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.appendant) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.trousersStyle) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.trousersColor) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.hairStyle) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.hairColor) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.ethicCode) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.genderCode) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.bodyType) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.shoesStyle) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.shoesColor) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.coatStyle) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.coatColor) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.coatTexture) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.viewType) }}</p>
            <!-- <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.status) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.gesture) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.behavior) }}</p>
            <p v-if="sustarget == 1" class="natureItem">{{ isEmpty(item.person.habitualMovement) }}</p> -->
            <!-- 骑车人 -->
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.ageType) }}</p>
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.bagStyle) }}</p>
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.bagColor) }}</p>
            <!-- <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.plateColor) }}</p> -->
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.vehicleColor) }}</p>

            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.carryingType) }}</p>
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.trousersStyle) }}</p>
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.trousersColor) }}</p>
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.driverCount,true) }}</p>
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.eyePart) }}</p>
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.hairStyle) }}</p>
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.mouthPart) }}</p>
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.ethicCode) }}</p>
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.scarf) }}</p>
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.genderCode) }}</p>
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.bodyType) }}</p>
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.umbrellaFlag) }}</p>
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.coatStyle) }}</p>
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.coatColor) }}</p>
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.coatTexture) }}</p>
            <p v-if="sustarget == 2" class="natureItem">{{ isEmpty(item.bicycle.viewType) }}</p>
            <!-- 汽车 -->
            <p v-if="sustarget == 3" class="natureItem">{{ isEmpty(item.motorVehicle.plateClass) }}</p>
            <p v-if="sustarget == 3" class="natureItem">{{ isEmpty(item.motorVehicle.plateColor) }}</p>
            <p v-if="sustarget == 3" class="natureItem">{{ isEmpty(item.motorVehicle.plateNo) }}</p>
            <p v-if="sustarget == 3" class="natureItem">{{ isEmpty(item.motorVehicle.vehicleColor) }}</p>
            <!-- <p v-if="sustarget == 3" class="natureItem">{{ isEmpty(item.motorVehicle.behavior) }}</p> -->
            <!-- <p v-if="sustarget == 3" class="natureItem">{{ isEmpty(item.motorVehicle.vehicleFrontItem) }}</p>
            <p v-if="sustarget == 3" class="natureItem">{{ isEmpty(item.motorVehicle.vehicleRearItem) }}</p>
            <p v-if="sustarget == 3" class="natureItem">{{ isEmpty(item.motorVehicle.filmColor) }}</p> -->
            <!-- <p v-show="sustarget == 3" class="natureName">小轿车种类</p>
            <p v-show="sustarget == 3" class="natureName">蓝色</p>
            <p v-show="sustarget == 3" class="natureName">鄂A35785</p>
            <p v-show="sustarget == 3" class="natureName">白色</p>
            <p v-show="sustarget == 3" class="natureName">跟踪</p>
            <p v-show="sustarget == 3" class="natureName">无</p>
            <p v-show="sustarget == 3" class="natureName">无</p>
            <p v-show="sustarget == 3" class="natureName">白色</p> -->

            <p class="natureItem operation naBtn">
                <el-button :title="item.iscase ? '已添加串并' : ''" type="primary" :disabled="item.iscase" class="searchBtn" @click="addtolist(item)">添加</el-button>
            </p>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
export default {
    data() {
        return {
          caseList: [],
          sustarget: "",
          suspicion:{}, //嫌疑目标
          lableMarkList:[], //嫌疑目标对象数组
          lableModel:{},
          lableInfoMan:{},  //比对属性
          loading: null,
          susName: ''
        };
    },
    props: {
      susperList: Array,
      dataCaseInfo:Object,
      pondList:Array
    },
    watch:{
      susperList(val){
        if(val.length == 0){
          this.lableModel = {}
          this.suspicion = {}
          this.sustarget = null;
          this.caseList = []
        } else {
          for (let i = 0; i < val.length; i++) {
            if(val[i].suspicionUuid == this.sendInfo.suspicionUuid){
              this.suspicion = val[i]
              console.log(this.suspicion, '999999999999999999')
              this.changeSus(this.suspicion)
            }
          }
        }

      },
      lableModel:{
         handler(val) {
            if(JSON.stringify(val) == '{}' ){
              this.susName = ''
              return
            }
            let list = val.videoMark.attrList
            this.lableInfoMan = {}
            if(val.videoMark.typeId == 4){//骑车人
              this.sustarget = 2
              for (let i = 0; i < list.length; i++) {
                let key = list[i].itemCode
                let val = list[i].valueName
                this.lableInfoMan[key] = val
              }
            }else if(val.videoMark.typeId == 1){//行人
              this.sustarget = 1
              for (let i = 0; i < list.length; i++) {
                let key = list[i].itemCode
                let val = list[i].valueName
                this.lableInfoMan[key] = val
              }
            }else if(val.videoMark.typeId == 2){//汽车
              this.sustarget = 3
              for (let i = 0; i < list.length; i++) {
                let key = list[i].itemCode
                let val = list[i].valueName
                this.lableInfoMan[key] = val
              }
            }
         },
         deep: true,
      },
    },
    computed: {
      ...mapGetters(['sendInfo'])
    },
    components: {},
    filters: {
      NoEmpty(val){
        if(val == 0){
          return '否'
        }else if(val == 1){
          return '是'
        }else if(val == null || val == '' || val == undefined){
          return '未知'
        }
      }
    },
    methods: {
      //过滤字段
      isEmpty(text,state){
        if(String(text) == '0'){
          return '否'
        }else if(String(text) == '1'){
          if(state){
            return text
          }else{
            return '是'
          }
        }
        else if(String(text) == '' || text == null || text == undefined){
          return '未知'
        }else{
          return text
        }
      },
      //获取嫌疑目标下面的标注对象
      changeSus(row){
        this.lableModel = {}
        this.sustarget = null
        this.getMarkList(row.suspicionUuid,row.suspicionType)
        this.caseList = []
        this.$store.state.casecurrent = 1;
        this.$store.state.casePage = 5;
        this.$store.state.caseTotal = 0;
      },
      getMarkList(suspicionUuid,suspicionType){
        let data = {
          caseUuid: this.$store.state.caseUuid,
          suspicionUuid: suspicionUuid,
          suspicionType: suspicionType
        };
        data = this.$qs.stringify(data)
        this.$http.post('vsas/speed/getSuspicionTargetRel',data).then(res=>{
          if(res.data.code == 200){
            if(this.$store.state.caseTarget){
              this.lableMarkList = res.data.data
              for (let i = 0; i < res.data.data.length; i++) {
                if(res.data.data[i].videoMark.markId == this.sendInfo.markId){
                  this.lableModel = res.data.data[i]
                  this.getchangeSus(this.lableModel)
                }
              }
            }else{
              if(res.data.data == null){
                this.lableMarkList = []
                this.lableModel = {}
              }else{
                this.lableMarkList = res.data.data
              }
            }
          }
        })
      },
      //得到嫌疑目标标注的ID
      getchangeSus(row){
        this.susName = row.videoMark.markName || ''
        console.log(row, 777777777777777777)
        this.$store.state.casecurrent = 1;
        this.$store.state.casePage = 5;
        this.$store.state.caseTotal = 0;
        let data = {
          markId:row.videoMark.markId,
          typeId:row.videoMark.typeId
        }
        data = this.$qs.stringify(data)
        this.$http.post('pca/casemng/query/target/by/mark',data).then(res=>{
          if(res.data.code == 200){
            if(res.data.data.personUuid != undefined){
              this.$store.state.personUuid = res.data.data.personUuid
              this.$store.state.vehicleUuid = ''
              this.$store.state.bicycleUuid = ''
              this.getPersonlist(res.data.data.personUuid)
            }else if(res.data.data.vehicleUuid != undefined){//表示车
              this.$store.state.personUuid = ''
              this.$store.state.vehicleUuid = res.data.data.vehicleUuid
              this.$store.state.bicycleUuid = ''
              this.getCarlist(res.data.data.vehicleUuid)
            }else if(res.data.data.bicycleUuid != undefined){
              this.$store.state.personUuid = ''
              this.$store.state.vehicleUuid =''
              this.$store.state.bicycleUuid = res.data.data.bicycleUuid
              this.getBiclist(res.data.data.bicycleUuid)
            }
          }
        })
      },
      //查询人的列表
      getPersonlist(id){
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "正在加载！"
        });
        let data = {
          caseId: this.$store.state.caseUuid,
          targetId: id,
          pageNum:this.$store.state.casecurrent,
          pageSize:this.$store.state.casePage,
        }
        data = this.$qs.stringify(data)
        this.$http.post('pca/target/comparison/peopleAttr',data).then(res=>{
           this.loading.close();
          if(res.data.code == 200){
            this.caseList = res.data.data.list
            this.caseList.forEach((item,i) => {
              this.pondList.forEach((itmes,j) => {
                if(item.caseUuid == itmes.caseUuid){
                  item.iscase = true
                }
              });
            });
            this.$store.state.caseTotal = res.data.data.totalCount
          }
        })
      },
      //得到汽车的列表
      getCarlist(id){
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "正在加载！"
        });
        let data = {
          caseId: this.$store.state.caseUuid,
          targetId: id,
          pageNum:this.$store.state.casecurrent,
          pageSize:this.$store.state.casePage,
        }
        data = this.$qs.stringify(data)
        this.$http.post('pca/target/comparison/carAttr',data).then(res=>{
          this.loading.close();
          if(res.data.code == 200){
            this.caseList = res.data.data.list
            this.caseList.forEach((item,i) => {
              this.pondList.forEach((itmes,j) => {
                if(item.caseUuid == itmes.caseUuid){
                  item.iscase = true
                }
              });
            });
            this.$store.state.caseTotal = res.data.data.totalCount
          }
        })
      },
      //得到骑车人的列表
      getBiclist(id){
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "正在加载！"
        });
        let data = {
          caseId: this.$store.state.caseUuid,
          targetId: id,
          pageNum:this.$store.state.casecurrent,
          pageSize:this.$store.state.casePage,
        }
        data = this.$qs.stringify(data)
        this.$http.post('pca/target/comparison/bicycleAttr',data).then(res=>{
          this.loading.close();
          if(res.data.code == 200){
            this.caseList = res.data.data.list
            this.caseList.forEach((item,i) => {
              this.pondList.forEach((itmes,j) => {
                if(item.caseUuid == itmes.caseUuid){
                  item.iscase = true
                }
              });
            });
            this.$store.state.caseTotal = res.data.data.totalCount
          }
        })
      },
      addtolist(row){
        this.$http.get('pca/casemng/baseinfo/query?caseUuid='+row.caseUuid).then(res=>{
          if(res.data.code == 200){
            this.$emit('appendCase',res.data.data)
          }
        })
      },



    }
};
</script>

<style scoped>
@import '../../assets/css/commom.css';
.detail {
    margin-top: 0.1rem;
    overflow: hidden;
    /* font-size: 0.12rem; */
}
.ownNature {
    float: left;
}
.oneNature {
    width: 2rem;
}
.ownNature p {
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
    border-top: 1px solid #112845;
    border-left: 1px solid #112845;
}
.twoNature,
.threeNature {
    width: 1.81rem;
    line-height: 0.3rem;
}
.twoNature p {
    border-right: 1px solid #112845;
}
.twoNature p:last-child,
.operation {
    border-bottom: 1px solid #112845;
}
.threeNature p {
    border-top: 1px solid #112845;
    border-left: 0;
    border-right: 1px solid #112845;
}
.naBtn .el-button {
    padding: 0 0.2rem;
    height: 0.2rem;
    font-size: 0.12rem !important;
}
.el-select {
    width: 1rem;
}
.el-select >>> .el-input__inner {
    height: 0.25rem;
    line-height: 0.25rem;
    /* padding: 0 0.1rem; */
}
.natureItem{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
