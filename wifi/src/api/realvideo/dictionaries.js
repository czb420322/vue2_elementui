const mixins = {
  data: function () {
    return {
      structurList:[],  //结构化结果
      // CarColorType: '',
      // PlateClassType:'',  //号牌种类
      // VehicleBrandType:'', //车辆品牌
      // VehicleKindType:'',  //车辆类别
      // PlateColorType: '', // 号牌颜色
      // PersonAgeType: '',
      // BagStyleType:'',
      // BagColorType: '',
      // HandArticleType: '',
      // PantsStyleType: '',
      // CulotteColorType: '',
      // HairStyleType: '',
      // HairColorStyle: '',
      // EthicCodeType: '',
      // GenderType: '',
      // BodyType: '',
      // ShoesStyleType: '',
      // ShoesColorType: '',
      // CoatStyleType: '',
      // ColorType: '',
      // CoatTextureType: '',
      // PersonViewType: '',


      // BikeBagType: '',
      // BikeBagColorType: '',
      // BikeColorType: '',
      // BikeCarraying: '',
      // BikeCulotteStyleType: '',
      // BikeCulotteColorType: '',
      // EyePartType: '',
      // BikeHairStyleType: '',
      // MouthPartType: '',
      // BikeBodyType: '',
      // ScarfPartType: '',
      // BikeUmbrellaFlag: '',
      // BikeCoatStyleType: '',
      // BikeCoatStyleColorType: '',
      // BikeCoatTextureType: '',
      // BikeTowardsType: '',
      // DriverCount:'',
      // CaseType:'',

      // VehicleBehaviorType:'', // 车辆可疑行为
      // FrontThingType: '', //车前部物品类型
      // RearThingType:'',  //车后
      // AutoFoilColorType:'',//贴膜颜色

      // //人
      // PersonStatusType:'',   //人的状态
      // PostureType:'',   //姿态
      // BehaviorType:'',   //行为

      // SleeveStyleType:'',  // 袖子类型
      // SleeveColorType:'',  //袖子颜色

      // HabitualActionType: '', //习惯动作

      // //骑车
      // BikeStatureType: '', //骑车人身高
      // RoadTerrainType: '', //道路地形分类
      // CulotteStyleType: '', //裙裤类型
      // DataSourceType: '', //视频图像数据来源



    }
  },
  created() {
    // this.getCarColorType();
    // this.getPlateClassType();
    // this.getPlateColorType();
    // this.getVehicleBrandType();
    // this.getVehicleKindType();


    // this.getPersonAgeType();
    // this.getBagStyleType()
    // this.getBagColorType()
    // this.getHandArticleType()
    // this.getPantsStyleType()
    // this.getCulotteColorType()
    // this.getHairStyleType()
    // this.getHairColorStyle()
    // this.getEthicCodeType()
    // this.getGenderType()
    // this.getBodyType()
    // this.getShoesStyleType()
    // this.getShoesColorType()
    // this.getCoatStyleType()
    // this.getColorType()
    // this.getCoatTextureType()
    // this.getCoatTextureType()
    // this.getPersonViewType();


    // this.getBikeBagType();
    // this.getBikeBagColorType();
    // this.getBikeColorType();
    // this.getBikeCarraying();
    // this.getBikeCulotteStyleType();
    // this.getBikeCulotteColorType();
    // this.getEyePartType();
    // this.getBikeHairStyleType();
    // this.getMouthPartType();
    // this.getScarfPartType();
    // this.getBikeBodyType();
    // this.getBikeUmbrellaFlag();
    // this.getBikeCoatStyleType();
    // this.getBikeCoatTextureType();
    // this.getBikeTowardsType();
    // this.getDriverCount();
    // this.getBikeCoatStyleColorType()
    // this.getCaseType()

    // this.getVehicleBehaviorType()
    // this.getFrontThingType();
    // this.getRearThingType()
    // this.getAutoFoilColorType()
    // this.getPersonStatusType()
    // this.getPostureType()
    // this.getBehaviorType()
    // this.getSleeveStyleType()
    // this.getSleeveColorType()
    // this.getHabitualActionType()
    // this.getBikeStatureType()
    // this.getRoadTerrainType()
    // this.getCulotteStyleType()
    // this.getCulotteColorType()
    // this.getDataSourceType()




  },
  methods: {
    getstructurList(type){
      this.$http.get('sms/static/getTypeByCode?code='+type).then(res => {
        if (res.data.code == 200) {
          this.structurList = res.data.data
        }
      })
    },
    //可疑行为
    getVehicleBehaviorType() {
      this.$http.get('sms/static/getTypeByCode?code=VehicleBehaviorType').then(res => {
        if (res.data.code == 200) {
          this.VehicleBehaviorType = res.data.data
        }
      })
    },
    //车前部物品类型
    getFrontThingType() {
      this.$http.get('sms/static/getTypeByCode?code=FrontThingType').then(res => {
        if (res.data.code == 200) {
          this.FrontThingType = res.data.data
        }
      })
    },
    //车后部物品类型
    getRearThingType() {
      this.$http.get('sms/static/getTypeByCode?code=RearThingType').then(res => {
        if (res.data.code == 200) {
          this.RearThingType = res.data.data
        }
      })
    },
    //车模颜色
    getAutoFoilColorType() {
      this.$http.get('sms/static/getTypeByCode?code=AutoFoilColorType').then(res => {
        if (res.data.code == 200) {
          this.AutoFoilColorType = res.data.data
        }
      })
    },


    //人
    //人的状态
    getPersonStatusType() {
      this.$http.get('sms/static/getTypeByCode?code=PersonStatusType').then(res => {
        if (res.data.code == 200) {
          this.PersonStatusType = res.data.data
        }
      })
    },
    //姿态
    getPostureType() {
      this.$http.get('sms/static/getTypeByCode?code=PostureType').then(res => {
        if (res.data.code == 200) {
          this.PostureType = res.data.data
        }
      })
    },
    //行为
    getBehaviorType() {
      this.$http.get('sms/static/getTypeByCode?code=BehaviorType').then(res => {
        if (res.data.code == 200) {
          this.BehaviorType = res.data.data
        }
      })
    },

    //袖子
    getSleeveStyleType() {
      this.$http.get('sms/static/getTypeByCode?code=SleeveStyleType').then(res => {
        if (res.data.code == 200) {
          this.SleeveStyleType = res.data.data
        }
      })
    },
    getSleeveColorType() {
      this.$http.get('sms/static/getTypeByCode?code=SleeveColorType').then(res => {
        if (res.data.code == 200) {
          this.SleeveColorType = res.data.data
        }
      })
    },

    //习惯动作
    getHabitualActionType() {
      this.$http.get('sms/static/getTypeByCode?code=HabitualActionType').then(res => {
        if (res.data.code == 200) {
          this.HabitualActionType = res.data.data
        }
      })
    },

    ///骑车人身高
    getBikeStatureType() {
      this.$http.get('sms/static/getTypeByCode?code=BikeStatureType').then(res => {
        if (res.data.code == 200) {
          this.BikeStatureType = res.data.data
        }
      })
    },


    //道路地形分类
    getRoadTerrainType() {
      this.$http.get('sms/static/getTypeByCode?code=RoadTerrainType').then(res => {
        if (res.data.code == 200) {
          this.RoadTerrainType = res.data.data
        }
      })
    },
    //裙裤类型
    getCulotteStyleType() {
      this.$http.get('sms/static/getTypeByCode?code=CulotteStyleType').then(res => {
        if (res.data.code == 200) {
          this.CulotteStyleType = res.data.data
        }
      })
    },
    // 视频图像数据来源
    getDataSourceType() {
      this.$http.get('sms/static/getTypeByCode?code=DataSourceType').then(res => {
        if (res.data.code == 200) {
          this.DataSourceType = res.data.data
        }
      })
    },





    //案件类型
    getCaseType() {
      this.$http.get('sms/static/getTypeByCode?code=CaseType').then(res => {
        if (res.data.code == 200) {
          this.CaseType = res.data.data
        }
      })
    },
    //车辆颜色
    getCarColorType() {
      this.$http.get('sms/static/getTypeByCode?code=VehicleKindColorType').then(res => {
        if (res.data.code == 200) {
          this.CarColorType = res.data.data
        }
      })
    },
    //号牌种类
    getPlateClassType() {
      this.$http.get('sms/static/getTypeByCode?code=PlateClassType').then(res => {
        if (res.data.code == 200) {
          this.PlateClassType = res.data.data
        }
      })
    },
    //车辆品牌
    getVehicleBrandType() {
      this.$http.get('sms/static/getTypeByCode?code=VehicleBrandType').then(res => {
        if (res.data.code == 200) {
          this.VehicleBrandType = res.data.data
        }
      })
    },
    //车辆类别
    getVehicleKindType() {
      this.$http.get('sms/static/getTypeByCode?code=VehicleKindType').then(res => {
        if (res.data.code == 200) {
          this.VehicleKindType = res.data.data
        }
      })
    },
    //号牌颜色
    getPlateColorType() {
      this.$http.get('sms/static/getTypeByCode?code=PlateColorType ').then(res => {
        if (res.data.code == 200) {
          this.PlateColorType = res.data.data
        }
      })
    },
    // 行人
    //行人年龄段
    getPersonAgeType() {
      this.$http.get('sms/static/getTypeByCode?code=PersonAgeType').then(res => {
        if (res.data.code == 200) {
          this.PersonAgeType = res.data.data
        }
      })
    },
    //包款式
    getBagStyleType() {
      this.$http.get('sms/static/getTypeByCode?code=BagStyleType').then(res => {
        if (res.data.code == 200) {
          this.BagStyleType = res.data.data
        }
      })
    },
    //包颜色
    getBagColorType() {
      this.$http.get('sms/static/getTypeByCode?code=BagColorType').then(res => {
        if (res.data.code == 200) {
          this.BagColorType = res.data.data
        }
      })
    },
    //是否携带物
    getHandArticleType() {
      this.$http.get('sms/static/getTypeByCode?code=HandArticleType').then(res => {
        if (res.data.code == 200) {
          this.HandArticleType = res.data.data
        }
      })
    },
    //下衣类型
    getPantsStyleType() {
      this.$http.get('sms/static/getTypeByCode?code=PantsStyleType').then(res => {
        if (res.data.code == 200) {
          this.PantsStyleType = res.data.data
        }
      })
    },
    //下衣颜色
    getCulotteColorType() {
      this.$http.get('sms/static/getTypeByCode?code=CulotteColorType').then(res => {
        if (res.data.code == 200) {
          this.CulotteColorType = res.data.data
        }
      })
    },
    //发型
    getHairStyleType() {
      this.$http.get('sms/static/getTypeByCode?code=HairStyleType').then(res => {
        if (res.data.code == 200) {
          this.HairStyleType = res.data.data
        }
      })
    },
    //头发颜色
    getHairColorStyle() {
      this.$http.get('sms/static/getTypeByCode?code=HairColorStyle').then(res => {
        if (res.data.code == 200) {
          this.HairColorStyle = res.data.data
        }
      })
    },
    //民族
    getEthicCodeType() {
      this.$http.get('sms/static/getTypeByCode?code=EthicCodeType').then(res => {
        if (res.data.code == 200) {
          this.EthicCodeType = res.data.data
        }
      })
    },
    //性别
    getGenderType() {
      this.$http.get('sms/static/getTypeByCode?code=GenderType').then(res => {
        if (res.data.code == 200) {
          this.GenderType = res.data.data
        }
      })
    },
    //体态
    getBodyType() {
      this.$http.get('sms/static/getTypeByCode?code=BodyType').then(res => {
        if (res.data.code == 200) {
          this.BodyType = res.data.data
        }
      })
    },
    //鞋子款式
    getShoesStyleType() {
      this.$http.get('sms/static/getTypeByCode?code=ShoesStyleType').then(res => {
        if (res.data.code == 200) {
          this.ShoesStyleType = res.data.data
        }
      })
    },
    //鞋子颜色
    getShoesColorType() {
      this.$http.get('sms/static/getTypeByCode?code=ShoesColorType').then(res => {
        if (res.data.code == 200) {
          this.ShoesColorType = res.data.data
        }
      })
    },
    //上衣款式
    getCoatStyleType() {
      this.$http.get('sms/static/getTypeByCode?code=CoatStyleType').then(res => {
        if (res.data.code == 200) {
          this.CoatStyleType = res.data.data
        }
      })
    },
    //上衣颜色
    getColorType() {
      this.$http.get('sms/static/getTypeByCode?code=ColorType').then(res => {
        if (res.data.code == 200) {
          this.ColorType = res.data.data
        }
      })
    },
    //上衣纹理
    getCoatTextureType() {
      this.$http.get('sms/static/getTypeByCode?code=CoatTextureType').then(res => {
        if (res.data.code == 200) {
          this.CoatTextureType = res.data.data
        }
      })
    },
    //朝向
    getPersonViewType() {
      this.$http.get('sms/static/getTypeByCode?code=PersonViewType').then(res => {
        if (res.data.code == 200) {
          this.PersonViewType = res.data.data
        }
      })
    },



    // 骑车人
    //年龄段公用
    //骑车人包款式
    getBikeBagType() {
      this.$http.get('sms/static/getTypeByCode?code=BikeBagType').then(res => {
        if (res.data.code == 200) {
          this.BikeBagType = res.data.data
        }
      })
    },
    //骑车人包颜色
    getBikeBagColorType() {
      this.$http.get('sms/static/getTypeByCode?code=BikeBagColorType').then(res => {
        if (res.data.code == 200) {
          this.BikeBagColorType = res.data.data
        }
      })
    },
    // 所骑车颜色
    getBikeColorType() {
      this.$http.get('sms/static/getTypeByCode?code=BikeColorType').then(res => {
        if (res.data.code == 200) {
          this.BikeColorType = res.data.data
        }
      })
    },
    //是否携物
    getBikeCarraying() {
      this.$http.get('sms/static/getTypeByCode?code=BikeCarraying').then(res => {
        if (res.data.code == 200) {
          this.BikeCarraying = res.data.data
        }
      })
    },
    //下衣类型
    getBikeCulotteStyleType() {
      this.$http.get('sms/static/getTypeByCode?code=BikeCulotteStyleType').then(res => {
        if (res.data.code == 200) {
          this.BikeCulotteStyleType = res.data.data
        }
      })
    },
    //下衣颜色
    getBikeCulotteColorType() {
      this.$http.get('sms/static/getTypeByCode?code=BikeCulotteColorType').then(res => {
        if (res.data.code == 200) {
          this.BikeCulotteColorType = res.data.data
        }
      })
    },
    //眼部特征
    getEyePartType() {
      this.$http.get('sms/static/getTypeByCode?code=EyePartType').then(res => {
        if (res.data.code == 200) {
          this.EyePartType = res.data.data
        }
      })
    },
    //发型
    getBikeHairStyleType() {
      this.$http.get('sms/static/getTypeByCode?code=BikeHairStyleType').then(res => {
        if (res.data.code == 200) {
          this.BikeHairStyleType = res.data.data
        }
      })
    },
    //嘴部特征
    getMouthPartType() {
      this.$http.get('sms/static/getTypeByCode?code=MouthPartType').then(res => {
        if (res.data.code == 200) {
          this.MouthPartType = res.data.data
        }
      })
    },
    //围脖
    getScarfPartType() {
      this.$http.get('sms/static/getTypeByCode?code=ScarfPartType').then(res => {
        if (res.data.code == 200) {
          this.ScarfPartType = res.data.data
        }
      })
    },
    //体态
    getBikeBodyType() {
      this.$http.get('sms/static/getTypeByCode?code=BikeBodyType').then(res => {
        if (res.data.code == 200) {
          this.BikeBodyType = res.data.data
        }
      })
    },
    //是否打伞
    getBikeUmbrellaFlag() {
      this.$http.get('sms/static/getTypeByCode?code=BikeUmbrellaFlag').then(res => {
        if (res.data.code == 200) {
          this.BikeUmbrellaFlag = res.data.data
        }
      })
    },
    //上衣款式
    getBikeCoatStyleType() {
      this.$http.get('sms/static/getTypeByCode?code=BikeCoatStyleType').then(res => {
        if (res.data.code == 200) {
          this.BikeCoatStyleType = res.data.data
        }
      })
    },
    //上衣颜色
    getBikeCoatStyleColorType() {
      this.$http.get('sms/static/getTypeByCode?code=BikeCoatStyleColorType').then(res => {
        if (res.data.code == 200) {
          this.BikeCoatStyleColorType = res.data.data
        }
      })
    },
    //上衣纹理
    getBikeCoatTextureType() {
      this.$http.get('sms/static/getTypeByCode?code=BikeCoatTextureType').then(res => {
        if (res.data.code == 200) {
          this.BikeCoatTextureType = res.data.data
        }
      })
    },
    //朝向
    getBikeTowardsType() {
      this.$http.get('sms/static/getTypeByCode?code=BikeTowardsType').then(res => {
        if (res.data.code == 200) {
          this.BikeTowardsType = res.data.data
        }
      })
    },
    //驾驶人数
    getDriverCount() {
      this.$http.get('sms/static/getTypeByCode?code=DriverCount').then(res => {
        if (res.data.code == 200) {
          this.DriverCount = res.data.data
        }
      })
    },


  }
};
export default mixins
