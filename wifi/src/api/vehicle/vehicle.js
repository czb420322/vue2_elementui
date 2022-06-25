import axios from 'axios'

//接口数据
const mixins = {
  methods: {

    /* 转换请求返回的json对象到目标变量
    * 统一格式为
    *
        {
          code: "",
          message: "",
          data: {
            pageNo: 0,
            pageSize: 0,
            total: 0,
            rows:[]
          }
        }
    */

    //获取当前日期时间
    getCurrentDate() {
      let date = new Date();
      let seperator1 = "-";
      let seperator2 = ":";
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes()
      let seconds = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + hours + seperator2 + minutes
        + seperator2 + seconds;
      return currentdate;
    },

//当前时间减一周
    getWeekDay() {
      let currentTime = new Date();
      let newDate = new Date(currentTime - 7 * 24 * 3600 * 1000);
      let year = newDate.getFullYear()
      let month = newDate.getMonth() + 1;
      let strDate = newDate.getDate();
      let hours = newDate.getHours();
      let minutes = newDate.getMinutes()
      let seconds = newDate.getSeconds();

      if(month <= 9 ){
        month = "0" + month
      }
      if(strDate <= 9){
        strDate = "0" + strDate
      }
      if(hours <= 9){
        hours = "0" + hours
      }
      if(minutes <= 9){
        minutes = "0" + minutes
      }
      if(seconds <= 9){
        seconds = "0" + seconds
      }
      return year + '-' + month + '-' + strDate + ' ' + hours + ':' + minutes + ':' + seconds
      // let currentTime = this.getCurrentDate();
      // let weekDate = currentTime.split(' ')[0];
      // let weekTime = currentTime.split(' ')[1];

      // let year = Number(weekDate.split('-')[0]);
      // let month = Number(weekDate.split('-')[1])
      // let day = Number(weekDate.split('-')[2])

      // if (month >= 1 && month <= 9) {
      //   month = "0" + month;
      // }

      // if (day <= 7) {
      //   let newMonth="0"+(month-1)
      //   if ((month-1) != 2) {
      //     switch (month-1) {
      //       case 1:
      //         return year + '-' + newMonth + '-' + (day-7+31) + ' ' + weekTime;
      //       case 3:
      //         return year + '-' + newMonth + '-' + (day-7+31) + ' ' + weekTime;
      //       case 5:
      //         return year + '-' + newMonth + '-' + (day-7+31) + ' ' + weekTime;
      //       case 7:
      //         return year + '-' + newMonth + '-' + (day-7+31) + ' ' + weekTime;
      //       case 8:
      //         return year + '-' + newMonth + '-' + (day-7+31) + ' ' + weekTime;
      //       case 10:
      //         return year + '-' + (month-1) + '-' + (day-7+31) + ' ' + weekTime;
      //       case 12:
      //         return year + '-' + (month-1) + '-' + (day-7+31) + ' ' + weekTime;
      //       case 4:
      //         return year + '-' + newMonth + '-' + (day-7+30) + ' ' + weekTime;
      //       case 6:
      //         return year + '-' + newMonth + '-' + (day-7+30) + ' ' + weekTime;
      //       case 9:
      //         return year + '-' + newMonth + '-' + (day-7+30) + ' ' + weekTime;
      //       case 11:
      //         return year + '-' + (month-1) + '-' + (day-7+30) + ' ' + weekTime;
      //     }
      //   } else {
      //       if(year%4==0){
      //         return year + '-' + newMonth + '-' + (day-7+29) + ' ' + weekTime;
      //       }else{
      //         return year + '-' + newMonth + '-' + (day-7+28) + ' ' + weekTime;
      //       }
      //   }
      // } else {
      //   let newDay = day - 7
      //   if (newDay >= 0 && newDay <= 9) {
      //     newDay = "0" + newDay;
      //   }
      //   return year + '-' + month + '-' + newDay + ' ' + weekTime
      // }
    },
    getDateString(date){
      //date 为毫秒数
      let d = new Date(date);
      let mm = (d.getMonth()+1) >= 10?(d.getMonth()+1): '0'+(d.getMonth()+1);
      let dd = d.getDate() >= 10?d.getDate():'0'+d.getDate();
      let hh = d.getHours()>= 10?d.getHours():'0'+d.getHours();
      let MM = d.getMinutes()>= 10?d.getMinutes(): '0'+d.getMinutes();
      let ss = d.getSeconds()>= 10? d.getSeconds():'0'+d.getSeconds();
      return d.getFullYear()+'-'+mm+'-'+dd+' 23:59:59';
    },
    getDateStrings(date) {
      //date 为毫秒数
      let d = new Date(date);
      let mm = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
      let dd = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate();
      let hh = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours();
      let MM = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes();
      let ss = d.getSeconds() >= 10 ? d.getSeconds() : '0' + d.getSeconds();
      return d.getFullYear() + '-' + mm + '-' + dd + ' 00:00:00';
    },

    transValue(source, target) {
      // console.log('测试查询'+JSON.stringify(source))
      target.code = source.code;
      target.message = source.message;
      target.data.pageNo = source.data.pageNo?source.data.pageNo: 0;
      target.data.pageSize = source.data.pageSize?source.data.pageSize:0;
      target.data.total = source.data.total?source.data.total:0;
      target.data.rows = source.data.rows;
    },

    //获取车辆颜色列表
    getColorType (successFn){
      this.$http({
        url: 'sms/static/getTypeByCode?code=VehicleKindColorType',
        method: 'get'
      }).then((res) => {
        if(res.data.code != 200){
          layer.alert(res.data.message,{icon:2,title:"消息提示"});
        }else{
          successFn(res);
        }
      })
    },

    //获取车牌类别列表
    getPlateClassType (successFn){
      this.$http({
        url: 'sms/static/getTypeByCode?code=PlateClassType',
        method: 'get'
      }).then((res) => {
        if(res.data.code != 200){
          layer.alert(res.data.message,{icon:2,title:"消息提示"});
        }else{
          successFn(res);
        }
      })
    },

    //获取车辆类别
    getVehicleKind(successFn) {
      this.$http({
        url: 'sms/static/getVehicleKind',
        method: 'get'
      }).then((res) => {
        successFn(res);
      })
    },

    //获取车辆品牌
    getVehicleBrand(successFn) {
      this.$http({
        url: 'sms/static/getVehicleBrand',
        method: 'get'
      }).then((res) => {
        if(res.data.code != 200){
          layer.alert(res.data.message,{icon:2,title:"消息提示"});
        }else{
          successFn(res);
        }
      })
    },

    //获取某车辆类型的车辆品牌
    getVehicleBrandByKind(vehicleKind, successFn) {
      this.$http({
        url: 'sms/static/getVehicleBrand/' + vehicleKind,
        method: 'get'
      }).then((res) => {
        if(res.data.code != 200){
          layer.alert(res.data.message,{icon:2,title:"消息提示"});
        }else{
          successFn(res);
        }
      })
    },

    //获取模糊搜索车辆品牌名称查询车辆品牌
    getVehicleBrandByFuzzy(brandName, successFn) {
      this.$http({
        url: 'sms/static/getVehicleBrand/fuzzy?brandName=' + brandName,
        method: 'get'
      }).then((res) => {
        if(res.data.code != 200){
          layer.alert(res.data.message,{icon:2,title:"消息提示"});
        }else{
          successFn(res);
        }
      })
    },

    //获取车辆型号
    getVehicleModel(successFn) {
      this.$http({
        url: 'sms/static/getVehicleModel',
        method: 'get'
      }).then((res) => {
        if(res.data.code != 200){
          layer.alert(res.data.message,{icon:2,title:"消息提示"});
        }else{
          successFn(res);
        }
      })
    },

    //获取某品牌的车辆型号
    getVehicleModelByBrand(vehicleBrand, successFn) {
      this.$http({
        url: 'sms/static/getVehicleModel/' + vehicleBrand,
        method: 'get'
      }).then((res) => {
        if(res.data.code != 200){
          layer.alert(res.data.message,{icon:2,title:"消息提示"});
        }else{
          successFn(res);
        }
      })
    },

    //获取某品牌的车辆型号的模糊搜索
    getVehicleModelByBrandAndFuzzy(vehicleBrand, modelName, successFn) {
      this.$http({
        url: 'sms/static/getVehicleModel/vehicleBrand/fuzzy?modelName=' + modelName + '&vehicleBrand=' + vehicleBrand,
        method: 'get'
      }).then((res) => {
        if(res.data.code != 200){
          layer.alert(res.data.message,{icon:2,title:"消息提示"});
        }else{
          successFn(res);
        }
      })
    },

    //获取模糊搜索车辆型号名称查询车辆型号
    getVehicleModelByFuzzy(modelName, successFn) {
      this.$http({
        url: 'sms/static/getVehicleModel/fuzzy?modelName=' + modelName,
        method: 'get',
      }).then((res) => {
        if(res.data.code != 200){
          layer.alert(res.data.message,{icon:2,title:"消息提示"});
        } else{
          successFn(res);
        }
      })
    },

    //获取车型ID的查询
    getVehicleById(modelId, successFn) {
      this.$http({
        url: 'sms/static/getById/' + modelId,
        method: 'get'
      }).then((res) => {
        if(res.data.code != 200){
          layer.alert(res.data.message,{icon:2,title:"消息提示"});
        }else{
          successFn(res);
        }
      })
    },


    //获取卡口列表
    getTollgateList (successFn){
      this.$http({
        url: 'sms/apeTollgate/search',
        method: 'post'
      }).then((res) => {
        if(res.data.code != 200){
          layer.alert("获取卡口列表服务异常",{icon:2,title:"消息提示"});
        }else{
          successFn(res);
        }
      })
    },


    resStatus(res){
      if(this.loading){
        this.loading.close();
      }
      let flag = true;
      if(res.data.code !== 200 && res.data.code !== '200' ){
        layer.alert(res.data.message,{icon:2,title:"消息提示"});
        flag = false;
      }
      return flag;
    },

    getVD(type, options, fn) {
      switch (type) {
        case "ID":
          this.getVDById(options, fn);
          break;
        case "placeByTID":
          this.getVDPlaceByTId(options, fn);
          break;

        case "model":
          this.getVDByModel(options, fn);
          break;
        case "modelPN":
          this.getVDByModelShowPlateNo(options, fn);
          break;
        case "modelT":
          this.getVDByModelShowTollgate(options, fn);
          break;
        case "modelPNQ":
          this.getVDByModelQueryPlateNo(options, fn);
          break;
        case "modelTQ":
          this.getVDByModelQueryTollgateId(options, fn);
          break;

        case "kindBicycle":
          this.getVDKindBicycle(options, fn);
        break;

        case "kind":
          this.getVDByKind(options, fn);
          break;

        case "kindPN":
          this.getVDByKindShowPlateNo(options, fn);
          break;
        case "kindT":
          this.getVDByKindShowTollgate(options, fn);
          break;
        case "kindPNQ":
          this.getVDByKindQueryPlateNo(options, fn);
          break;
        case "kindTQ":
          this.getVDByKindQueryTollgateId(options, fn);
          break;

        case "plateNo":
          this.getVDByPlateNo(options, fn);
          break;
        case "plateNoT":
          this.getVDByPlateNoShowTollgate(options, fn);
          break;
        case "plateNoTQ":
          this.getVDByPlateNoQueryTollgateId(options, fn);
          break;

        case "syn":
          this.getVDBySyn(options, fn);
          break;
        case "synPN":
          this.getVDBySynShowPlateNo(options, fn);
          break;
        case "synT":
          this.getVDBySynShowTollgate(options, fn);
          break;
        case "synPNQ":
          this.getVDBySynQueryPlateNo(options, fn);
          break;
        case "synTQ":
          this.getVDBySynQueryTollgateId(options, fn);
          break;

        case "Image":
          this.getVDByImage(options, fn);
          break;
        case "Detail":
          this.getVDByDetail(options, fn);
          break;

        case "facePic":
          this.getVDByfacePic(options, fn);
          break;

        case "firstCity":
          this.getFirstCity(options, fn);
          break;

        case "footHold":
          this.getFootHold(options, fn);
          break;
        case "footHoldD":
          this.getFootHoldDetail(options, fn);
          break;

        case "moreCar":
          this.getMoreCar(options, fn);
          break;
        case "moreCarD":
          this.getMoreCarDetail(options, fn);
          break;

        case "similarPlate":
          this.getSimilarPlate(options, fn);
          break;
        case "similarPlateD":
          this.getSimilarPlateDetail(options, fn);
          break;

        case "frequently":
          this.getFrequently(options, fn);
          break;
        case "frequentlyD":
          this.getFrequentlyDetail(options, fn);
          break;

        case "trajectory":
          this.getTrajectory(options, fn);
          break;

        case "follow":
          this.getFollow(options, fn);
          break;

        case "dayNight":
          this.getDayNight(options, fn);
          break;

        case "moreArea":
          this.getMoreArea(options, fn);
          break;

        case "flow":
          this.getFlow(options, fn);
          break;

        case "":
        default:
          break;
      }
    },

    //搜索  根据车辆ID获取车辆数据
    getVDById(id, successFn) {
      this.$http({
        url: 'vehicle/common/query',
        method: 'get',
        params: {
          vehicleId: id
        }
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //搜索  根据卡口ID获取车辆卡口位置
    getVDPlaceByTId(id, successFn) {
      this.$http({
        url: 'tvas/common/queryPlace/ByTollgateIds',
        method: 'get',
        params: {
          tollgateIds: id
        }
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //搜索 按车型搜车  获取默认查询数据
    getVDByModel(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/model/query/vehicleModel',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //搜索 按车型搜车  获取车牌分组数据（车牌合并显示）
    getVDByModelShowPlateNo(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/model/plateno/group/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //搜索 按车型搜车  车牌分组下具体车辆数据查询
    getVDByModelQueryPlateNo(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/model/plateno/group/query/plateNo',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //搜索 按车型搜车  获取卡口分组数据（位置合并显示）
    getVDByModelShowTollgate(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/model/tollgate/group/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //搜索 按车型搜车  卡口分组下具体车辆数据查询
    getVDByModelQueryTollgateId(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/model/tollgate/group/query/tollgateId',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //获取非机动车辆类别
    getVehicleKindBicycle(successFn){
      this.$http({
        url: 'sms/static/getTypeByCode?code=MotorcycleKindType',
        method: 'get'
      }).then((res) => {
        successFn(res);
      })
    },

    //搜索 搜非机动车 获取默认查询数据
    getVDKindBicycle(options, successFn){
      let data = this.$qs.stringify(options);
      this.$http({
        url: '/tvas/common/bicycle/kind/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },





    //搜索 按类别搜车  获取默认查询数据
    getVDByKind(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/kind/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //搜索 按类别搜车  获取车牌分组数据（车牌合并显示）
    getVDByKindShowPlateNo(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/kind/plateno/group/query/vehicleKind',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //搜索 按类别搜车  车牌分组下具体车辆数据查询
    getVDByKindQueryPlateNo(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/kind/plateno/group/query/vehicleKind/plateNo',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //搜索 按类别搜车  获取卡口分组数据（位置合并显示）
    getVDByKindShowTollgate(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/kind/tollgate/group/query/vehicleKind',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //搜索 按类别搜车  卡口分组下具体车辆数据查询
    getVDByKindQueryTollgateId(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/kind/tollgate/group/query/vehicleKind/tollgateId',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },


    //搜索 按车牌搜车  获取默认查询数据
    getVDByPlateNo(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/plateno/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //搜索 按车牌搜车  获取卡口分组数据（位置合并显示）
    getVDByPlateNoShowTollgate(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/plateno/tollgate/group/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //搜索 按车牌搜车  卡口分组下具体车辆数据查询
    getVDByPlateNoQueryTollgateId(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/plateno/tollgate/group/query/tollgateId',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },


    //搜索 综合搜车  获取默认查询数据
    getVDBySyn(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/synthesizeSearch/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //搜索 综合搜车  获取车牌分组数据（车牌合并显示）
    getVDBySynShowPlateNo(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/synthesizeSearch/plateno/group/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //搜索 综合搜车  车牌分组下具体车辆数据查询
    getVDBySynQueryPlateNo(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/synthesizeSearch/plateno/group/query/plateNo',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //搜索 综合搜车  获取卡口分组数据（位置合并显示）
    getVDBySynShowTollgate(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/synthesizeSearch/tollgate/group/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //搜索 综合搜车  卡口分组下具体车辆数据查询
    getVDBySynQueryTollgateId(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/synthesizeSearch/tollgate/group/query/tollgateId',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },


    //搜索 以图搜车
    getVDByImage(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/image/queryVehicle/ByImage',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },
    // 人脸搜车
    getVDByfacePic(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/image/searchVehicleByFace',
        method: 'post',
        data: data
      }).then((res) => {
        console.log(res,669996)
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //车辆实时监控
    getVDByDetail(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/common/queryDetailVehicle/ByTollgateIds',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },


    //初次入城分析
    getFirstCity(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/synthesizeAnalyze/firstcity/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //落脚点分析
    getFootHold(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/foothold/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //落脚点分析详细
    getFootHoldDetail(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/foothold/query/tollgateId',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //一车多牌分析
    getMoreCar(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/morecar/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //一车多牌分析详细
    getMoreCarDetail(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/morecar/query/plateNo',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //相似车牌分析
    getSimilarPlate(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/similarplate/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //相似车牌分析详细
    getSimilarPlateDetail(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/similarplate/query/plateNo',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //频繁过车分析
    getFrequently(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/frequently/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //频繁过车分析
    getFrequentlyDetail(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/frequently/query/plateNo',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //轨迹重现分析
    getTrajectory(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/synthesizeAnalyze/trajectory/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //同行车辆分析
    getFollow(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/synthesizeAnalyze/follow/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //昼伏夜出分析
    getDayNight(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/synthesizeAnalyze/daynight/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //多区域碰撞分析
    getMoreArea(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/synthesizeAnalyze/morearea/query',
        method: 'post',
        data: data
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },

    //图片上传
    vehicleImgUpload(options, successFn) {
      let data = this.$qs.stringify(options);
      this.$http({
        url: 'tvas/image/upload',
        method: 'post',
        data: data,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then((res) => {
        if(this.resStatus(res)){
          successFn(res);
        }
      })
    },
    //车型选择
    getCarBrand() {
      setTimeout(()=>{
        this.showFirst = !this.showFirst;
        this.showSecond = false;
      },0)
    },
    getCarModule() {
      setTimeout(()=>{
        this.showFirst = false;
        this.showSecond = !this.showSecond;
      },0)
    },
  }
};
export default mixins
