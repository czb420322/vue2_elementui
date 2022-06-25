/*
 * @Author: your name
 * @Date: 2019-12-18 17:28:34
 * @LastEditTime : 2020-12-30 14:48:20
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\api\realvideo\glstproperty.js
 */
const mixins = {
    data: function () {
      return {
        propertyList:[], //属性列表、
        // 人的属性  14种
        coatLength:'',  //上衣款式
        coatPattern:'',  //上衣纹理      //人骑车人共用
        coatColor:'',  //上衣颜色        //人骑车人共用
        trousersStyle:'',  //下衣类别
        trousersColor:'',  //下衣颜色
        shoesStyle:'',  //鞋子款式
        shoesColor:'',  //鞋子颜色
        sex:'',  //性别                  //人骑车人共用
        ethnic:'',  //民族               //人骑车人共用
        headLandMark:'',  //头部标识物   //人骑车人共用
        accessoryItem:'',  //附属物品
        hairStyle:'',  //发型
        age:'',  //年龄
        packageStyle:'',  //包款式
        // 车的属性  13种
        vehicleAngle:'',  //车辆角度     //车和骑车人共用
        vehicleClass:'',  //车辆型号     //车和骑车人共用
        vehicleColor:'',  //车辆颜色     //车和骑车人共用
        landMark:'',  //车辆标识
        faceMask:'',  //面部遮挡        0：遮挡，1：为遮挡
        plateColor:'',  //车牌颜色
        plateClass:'',  //车牌类型
        specialVehicles:'', // 特殊车辆
        vehicleBack:'', // 车后盖
        bodyBreakage:'', // 车身破损
        roofGoods:'',
        plateOcclusion:'', //车牌遮挡
        bodyRed:'', // 车辆红绳
        // 骑车人属性  10种
        backpackClass:'',  //骑车人包类型
        manned:'',      //违法载人
        // coatPattern:'',  //上衣纹理
        // vehicleClass:'',  //车型
        // headLandMark:'',  //头部标识物
        // vehicleAngle:'',  //车辆角度
        // sex:'',  //骑车人性别
        ethnic:'',  //骑车人民族
        // coatColor:'',  //上衣颜色
        // vehicleColor:'',  //车身颜色
        pointPos:'',//点位选择

        iscoatLength:false,  //上衣款式禁用
        iscoatPattern:false,  //上衣纹理禁用    //人骑车人共用
        iscoatColor:false,  //上衣颜色禁用     //人骑车人共用
        istrousersStyle:false,  //下衣类别禁用
        istrousersColor:false,  //下衣颜色禁用
        isshoesStyle:false,  //鞋子款式禁用
        isshoesColor:false,  //鞋子颜色禁用
        issex:false,  //性别禁用                  //人骑车人共用
        isethnic:false,  //民族禁用               //人骑车人共用
        isheadLandMark:false,  //头部标识物禁用   //人骑车人共用
        isaccessoryItem:false,  //附属物品禁用
        ishairStyle:false,  //发型禁用
        isage:false,  //年龄禁用
        ispackageStyle:false,  //包款式禁用
        // 车的属性  13种
        isvehicleAngle:false,  //车辆角度禁用     //车和骑车人共用
        isvehicleClass:false,  //车辆型号禁用     //车和骑车人共用
        isvehicleColor:false,  //车辆颜色禁用     //车和骑车人共用
        islandMark:false,  //车辆标识禁用
        isfaceMask:false,  //面部遮挡禁用        0：遮挡，1：为遮挡
        isplateColor:false,  //车牌颜色禁用
        isbodyBreakage:false, // 车身破损禁用
        isvehicleBack:false, // 车后盖盖禁用
        isspecialVehicles:false, //特殊车辆禁用
        isplateClass:false,  //车牌类型禁用
        isroofGoods:false, //车顶物件禁用
        isplateOcclusion:false, // 车牌遮挡禁用
        isbodyRed:false,
        // 骑车人属性  10种
        isbackpackClass:false,  //骑车人包类型禁用\
        ismanned:false,  //违法载人禁用
        isPointPos:false,//点位选择禁用
        isplateNo:false,//车牌号码输入禁用
        isumbrella:false,//是否打伞禁用
        ispackageColor:false,//包颜色禁用
      }
    },
    created() {

    },
    watch: {

    },
    mounted() {

    },
    filters: {

    },
    methods: {
      //type表示类型 '属性分类，1：机动车属性，2：非机动车属性，3：行人属性，4：车牌属性，5：人脸属性',
      //id 表示类型中对应ID
      getpropers(type,id){
        window.axiosProArr.forEach((e,i)=>{
          if(sessionStorage.getItem('isUploadTrue') != 1){
              e.cancle();
              delete window.axiosProArr[i]
          }
        })
        let data = {
          attributeType:type,
          attributeId:id
        }
        this.$http.get('vsas/structure/getDictionaryList',{params:data}).then(res=>{
          if(res.data.code == 200){
            this.propertyList = res.data.data
          }
        })
      },
      //切换人车骑车人属性的时候切换清空glst所有的字段
      clearporpe(){
        this.coatLength = '';  //上衣款式
        this.coatPattern = '';  //上衣纹理
        this.coatColor = '';  //上衣颜色        //人骑车人共用
        this.trousersStyle = '';  //下衣类别
        this.trousersColor = '';  //下衣颜色
        this.shoesStyle = '';  //鞋子款式
        this.shoesColor = '';  //鞋子颜色
        this.sex = '';  //性别                  //人骑车人共用
        this.ethnic = '';  //民族               //人骑车人共用
        this.headLandMark = '';  //头部标识物   //人骑车人共用
        this.accessoryItem = '';  //附属物品
        this.hairStyle = '';  //发型
        this.age = '';  //年龄
        this.packageStyle = '';  //包款式
        // 车的属性  13种
        this.vehicleAngle = '';  //车辆角度     //车和骑车人共用
        this.vehicleClass = '';  //车辆型号     //车和骑车人共用
        this.vehicleColor = '';  //车辆颜色     //车和骑车人共用
        this.landMark = '';  //车辆标识
        this.faceMask = '';  //面部遮挡        0：遮挡，1：为遮挡
        this.plateColor = '';  //车牌颜色
        this.plateClass = '';  //车牌类型
        this.specialVehicles = '' // 特殊车辆
        this.vehicleBack = '' // 车后盖
        this.bodyBreakage = '' // 车身破损
        this.roofGoods = '' //车顶物件
        this.plateOcclusion = '' // 车牌遮挡
        this.bodyRed = '' // 车辆红绳
        this.plateNo = '';//车牌号码
        // 骑车人属性  10种  跟人和车共7种字段
        this.backpackClass = '';  //骑车人包类型
        this.coatPattern = '';  //上衣纹理
        this.manned = '';      //违法载人
        this.packageColor = '';//骑车人包颜色
        this.umbrella = '';//是否打伞
        this.PointPos = '';//当前点位
      },
    }
  };
  export default mixins
