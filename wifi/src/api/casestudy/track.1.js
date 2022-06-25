let face = require('@/assets/images/device/face.png')

import moment from 'moment'
import _ from 'lodash'
const mixins = {
  data: function () {
    return {
      u_imgrul: '',
      u_id: '',
      showimgrul: '$store.state.defaultImg',
      polylineObj: null,
      deletMarkers: [],
      totalMetres: 0,
      timeDifference: 0,
      allspot: [],
      initTimeArr: [],
      dragPoints: [],
      progreesArr: [],
      showProgreesArr: [],
      showProgreesFlag: false,
      isTrajectory: false,
      trajectoryArr: []
    }
  },
  filters: {
    typetopt(val) {
      if (val == 5) {
        return '临时点设备'
      } else if (val == 1) {
        return '天网设备'
      } else if (val == 4) {
        return '社会面设备'
      } else if (val == 6) {
        return '信息点设备'
      }
    },
    secondHands(val) {
      if (val == 0 || val == '' || val == undefined) {
        val = 0
        return ('快' + val)
      }
      if (Math.sign(val) == -1) {
        val = -(val)
        return ('快' + val)
      } else if (Math.sign(val) == 1) {
        val = val
        return '慢' + val
      }
    },
  },
  methods: {
    //切换嫌疑目标
    changeSuspicionType(val) {
      if (val == 1) {
        return '（ 人 ）';
      } else if (val == 2) {
        return '（ 骑车人 ）'
      } else if (val == 3) {
        return '（ 车辆 ）'
      }
    },
    //获取案发点的标注信息
    getCaseId(id) {
      let data = {
        caseUuid: id
      }
      data = this.$qs.stringify(data)
      this.$http.post('pca/point/img/hotspotQuery', data).then(res => {
        if (res.data.code == 200) {
          this.hotspotId = res.data.data.hotspotId
          this.getImgquery(res.data.data.hotspotId)
        }
      })
    },
    //过滤字段
    isEmpty(text, state) {
      if (String(text) == '0') {
        return '没'
      } else if (String(text) == '1') {
        if (state) {
          return text
        } else {
          return '是'
        }
      } else if (String(text) == '' || text == null || text == undefined) {
        return '未知'
      } else {
        return text
      }
    },
    //查询信息点图片的方法
    //查询信息方法
    getImgquery(id) {
      let data = {
        pointId: id,
        caseUuid: this.$route.query.caseUuid
      }
      data = this.$qs.stringify(data)
      this.$http.post('pca/point/img/query', data).then(res => {
        if (res.data.code == 200) {
          if (res.data.data == null) {
            this.u_imgrul = ''
            this.u_id = ''
            this.showimgrul = ''
          } else {
            this.u_imgrul = res.data.data.imgUrl
            this.u_id = res.data.data.id
            this.showimgrul = this.u_imgrul.split(',')[0]
          }
        }
      })
    },
    //切换嫌疑人获取嫌疑人的坐标
    getlats(id) {
      let data = {
        suspicionUuid: id
      }
      this.trajectoryArr = []
      this.$http.get('pca/casemng/suspicion/mark/trajectory', {
        params: data
      }).then(res => {
        if (res.data.code == 200) {
          if (res.data.data.length > 0) {
            this.trajectoryArr = res.data.data
            // 轨迹显示关键代码
            // this.trajectoryArr = res.data.data
            // console.log(result, 'resultresultresultresultresult')
            // let handData = this.processData(res.data.data)
            if (res.data.data.length > 1) {
              this.sorts(res.data.data);
            } else {
              this.isTrajectory = false
              this.$notify({
                type: 'warning',
                message: '暂无轨迹',
                position: 'bottom-right',
                duration: 3000
              });
            }
          }
        }
      })
    },
    processData(arr) {
      // 缓存用于记录
      const cache = [];
      for (const t of arr) {
        // 检查缓存中是否已经存在
        if (cache.find(c => c.deviceId === t.deviceId)) {
          // 已经存在说明以前记录过，现在这个就是多余的，直接忽略
          continue;
        }
        // 不存在就说明以前没遇到过，把它记录下来
        cache.push(t);
      }

      // 记录结果就是过滤后的结果
      return cache;
    },
    process(arr) {
      // 缓存用于记录
      const cache = [];
      for (const t of arr) {
        // 检查缓存中是否已经存在
        if (cache.find(c => c.latitude === t.latitude && c.longitude === t.longitude)) {
          // 已经存在说明以前记录过，现在这个就是多余的，直接忽略
          continue;
        }
        // 不存在就说明以前没遇到过，把它记录下来
        cache.push(t);
      }

      // 记录结果就是过滤后的结果
      return cache;
    },
    // 转换经纬度
    zuobiao2Pixels(trajectoryLongitude, trajectoryLatitude, index) {
      var point = new BMap.Point(trajectoryLongitude, trajectoryLatitude);
      var pixel = this.map.pointToPixel(point);
      this.isTrajectory = true
      setTimeout(() => {
        this.$nextTick(() => {
          document.getElementById('trajectoryPic' + index).style.left = (pixel.x - 15) + 'px';
          document.getElementById('trajectoryPic' + index).style.top = (pixel.y - 155) + 'px';
        })
      }, 200)

    },
    // 给点位进行排序
    sorts(data) {
      let dataArr = data
      dataArr.forEach(v => {
        v.sortTime = moment(v.videoStartTime, 'YYYY-MM-DD HH:mm:ss').valueOf() + Number(v.relativeTime) + Number(v.offset)
      })
      dataArr.sort(function (a, b) {
        if (a.sortTime === b.sortTime) {
          return b.sortTime - a.sortTime;
        } else {
          return a.sortTime - b.sortTime;
        }
      });
      dataArr.forEach(v => {
        let obj = {}
        obj.latitude = v.latitude
        obj.longitude = v.longitude
        obj.videoStartTime = v.videoStartTime
        obj.videoCaptureUrl = v.videoCaptureUrl
        this.progreesArr.push(obj)
      })
      this.progreesArr = _.uniqWith(this.progreesArr, _.isEqual)
      let idx = 0
      let idx1 = 0
      idx = _.findIndex(dataArr, function (o) {
        return o.markId !== undefined
      })
      dataArr = _.drop(dataArr, idx)
      idx1 = _.findLastIndex(dataArr, function (o) {
        return o.markId !== undefined
      })
      if (dataArr.length - 1 - idx1 > 0) {
        dataArr = _.dropRight(dataArr, dataArr.length - 1 - idx1)
      }
      let mapData = []
      let obj;
      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i].longitude == null || dataArr[i].longitude == undefined || dataArr[i].longitude == '') {
          continue
        }
        let time1
        if (dataArr[i].absoluteTime == null) {
          time1 = this.getTrajectory(dataArr[i].videoStartTime, Number(dataArr[i].relativeTime), Number(dataArr[i].offset))
        } else {
          time1 = this.getVideoNowTime(dataArr[i].absoluteTime, dataArr[i].offset)
        };
        let time2 = time1
          .replace(" ", "")
          .replace("-", "")
          .replace("-", "")
          .replace(":", "")
          .replace(":", "");
        obj = {
          time: time2,
          longitude: dataArr[i].longitude,
          latitude: dataArr[i].latitude
        };
        mapData.push(obj);
      }
      this.showTrajectory(mapData);
    },
    //创建目标轨迹
    showTrajectory(mapData) {
      let newData = []
      if (mapData.length < 2) {
        return
      }
      //  轨迹进度关键代码
      for (let i = 0; i < this.progreesArr.length; i++) {
        if (i + 1 < this.progreesArr.length) {
          let start = moment(this.progreesArr[i].videoStartTime, 'YYYY-MM-DD HH:mm:ss')
          let end = moment(this.progreesArr[i + 1].videoStartTime, 'YYYY-MM-DD HH:mm:ss')
          let ss = this.formatTime(end.diff(start, 'seconds'))
          newData.push(ss)
        }
      }
      this.progreesArr.forEach((v, i) => {
        v.rightTime = newData[i] || ''
        v.timeFlag = v.videoStartTime.split(' ')[0]
        v.rightFlag = v.videoStartTime.split(' ')[1]
      })

      this.showProgreesArr = this.dataHandle(this.progreesArr)
      // process
      if (this.showProgreesArr.length > 0) {
        this.showProgreesFlag = true
      }
      this.allspot = mapData
      this.initTimeArr = mapData
      let datas = [];
      let num;
      for (let i = 0; i < mapData.length; i++) {
        num = new BMap.Point(Number(mapData[i].longitude), Number(mapData[i].latitude));
        datas.push(num);
      }
      this.map.centerAndZoom(new BMap.Point(datas[0].lng, datas[0].lat), sessionStorage.getItem('bmapLevel'))
      let icons = new BMap.IconSequence(
        new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
          scale: 0.6, //图标缩放大小
          strokeWeight: "2", //图标宽度
          strokeColor: "white" //图标颜色
        }), '1%', '5%', false
      )
      this.polylineObj = new BMap.Polyline(datas, {
        // enableEditing: true, //是否启用线编辑，默认为false
        enableClicking: true, //是否响应点击事件，默认为true
        strokeColor: '#48affe',
        icons: [icons],
        strokeWeight: 10,
        strokeOpacity: 0.99,
      });
      this.map.addOverlay(this.polylineObj);
      console.log(this.trajectoryArr, 66666);

      // if(this.trajectoryArr.length > 1) {
      //   for (let i = 0; i < this.trajectoryArr.length; i++) {
      //     let getLongitude = this.trajectoryArr[i].longitude // 获取经度
      //     let getLatitude = this.trajectoryArr[i].latitude  // 获取纬度
      //     this.zuobiao2Pixels(getLongitude,getLatitude,i)
      //   }
      // }

      let blueCar = new BMapLib.LuShu(this.map, datas, {
        defaultContent: "", //"从浔阳路到滨江路"
        autoView: false, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
        icon: new BMap.Icon('/static/images/Mario1.png', new BMap.Size(60, 60), {
          anchor: new BMap.Size(11, 31)
        }),
        speed: 3000,
        landmarkPois: [],
        enableRotation: false //是否设置marker随着道路的走向进行旋转
      });
      blueCar.start();

      // let _this = this
      // _this.map.addEventListener("zoomstart", function (evt) {
      //   _this.iszoom = true
      //   for (let i = 0; i < _this.trajectoryArr.length; i++) {
      //     let getLongitude = _this.trajectoryArr[i].longitude // 获取经度
      //     let getLatitude = _this.trajectoryArr[i].latitude  // 获取纬度
      //     _this.zuobiao2Pixels(getLongitude,getLatitude,i)
      //   }
      // })
      //缩放地图结束
      // setTimeout(()=>{
      //   _this.map.addEventListener("zoomend", function (evt) {
      //       for (let i = 0; i < _this.trajectoryArr.length; i++) {
      //         let getLongitude = _this.trajectoryArr[i].longitude // 获取经度
      //         let getLatitude = _this.trajectoryArr[i].latitude  // 获取纬度
      //         _this.zuobiao2Pixels(getLongitude,getLatitude,i)
      //       }
      //   })
      // },200)
      //拖拽地图开始
      // _this.map.addEventListener("dragstart", function (evt) {
      //   // _this.showarrPoisArr = false
      // })
      // _this.map.addEventListener("dragging", function (evt) {
      //   for (let i = 0; i < _this.trajectoryArr.length; i++) {
      //     let getLongitude = _this.trajectoryArr[i].longitude // 获取经度
      //     let getLatitude = _this.trajectoryArr[i].latitude  // 获取纬度
      //     _this.zuobiao2Pixels(getLongitude,getLatitude,i)
      //   }
      // })
      //拖拽地图结束
      // _this.map.addEventListener("dragend", function (evt) {
      //   for (let i = 0; i < _this.trajectoryArr.length; i++) {
      //     let getLongitude = _this.trajectoryArr[i].longitude // 获取经度
      //     let getLatitude = _this.trajectoryArr[i].latitude  // 获取纬度
      //     _this.zuobiao2Pixels(getLongitude,getLatitude,i)
      //   }
      // })
    },

    //  补零
    pasZero(str) {
      return new RegExp(/^\d$/g).test(str) ? `0${str}` : str
    },

    // 转换
    formatTime(_seconds) {
      _seconds = parseInt(_seconds)
      let mins, seconds;
      let result = '';
      seconds = parseInt(_seconds % 60)
      mins = parseInt(_seconds / 60)

      result = `时差： ${this.pasZero(mins)}分${this.pasZero(seconds)}秒`
      return result
    },

    // 数据格式处理
    dataHandle(arr) {
      let result = []
      let temp = {}
      for (let item of arr) {
        if (!temp[item.timeFlag]) {
          temp[item.timeFlag] = []
          result.push(temp[item.timeFlag])
        }
        temp[item.timeFlag].push(item)
      }
      return result
    },
      // 轨迹编辑
      editPolylineHandler(text) {
        if (text == '轨迹编辑') {
          this.polylineObj.enableEditing()
          this.defaultText = '轨迹重置'
          this.timeDifference = moment(this.allspot[this.allspot.length - 1].time, 'YYYYMMDDHHmmss').valueOf() - moment(this.allspot[0].time, 'YYYYMMDDHHmmss').valueOf()
          this.polylineObj.addEventListener('mouseout', (e) => {
            this.allspot = this.polylineObj.getPath()
            console.log(this.allspot,'this.allspot');
            console.log(this.trajectoryArr,'trajectoryArr');
            //通过移动点位获取所有当前点位的经纬度（包括标注点以及拖动点）
            //然后通过标注点以及信息点来比较当前拖拽的点位和轨迹点位向比较
            let indexarr = []  //当前点位存储的信息
            for (let i = 0; i < this.trajectoryArr.length; i++) {
              for (let j = 0; j < this.allspot.length; j++) {
                if(this.trajectoryArr[i].longitude == this.allspot[j].lng && this.trajectoryArr[i].latitude == this.allspot[j].lat){
                  indexarr.push(j)
                }
              }
            }
            console.log(indexarr,'数组');
            console.log(this.allspot);

            let diffarr = []
            //通过得到的索引去循环当前拖拽点当前对应的索引位置
            //判断当前索引的所有差值
            for (let i = 0; i < indexarr.length; i++) {
              if(i + i <= indexarr.length){
                diffarr.push(indexarr[i+ 1]  - indexarr[i])
              }
            }
            console.log(diffarr,5555);  //[3,5]
            let arrlist = []
            for (let i = 0; i < indexarr.length; i++) {
              if(i + 1 <= indexarr.length){
                arrlist.push(this.allspot.slice(indexarr[i],indexarr[i+1]))
              }
            }
            // console.log(arrlist);
            for (let i = 0; i < this.trajectoryArr.length; i++) {
              for (let j = 0; j < arrlist.length; j++) {
                if(this.trajectoryArr[i].longitude == arrlist[j][0].lng && this.trajectoryArr[i].latitude == arrlist[j][0].lat){
                  arrlist[j][0] = Object.assign(arrlist[j][0], this.trajectoryArr[i])
                  for (let k = 0; k < arrlist[j].length; k++) {
                    arrlist[j][k].deviceId = this.trajectoryArr[i].deviceId
                    arrlist[j][k].videoStartTime = '1970-02-02 00:00:00'
                    arrlist[j][k].offset = 0
                    arrlist[j][k].relativeTime = 0
                    arrlist[j][k].longitude =  arrlist[j][k].lng
                    arrlist[j][k].latitude =  arrlist[j][k].lat
                    arrlist[j][k].suspicionUuid = this.suspicionUuids
                    arrlist[j][k].index = k
                  }
                }
              }
            }
            console.log(arrlist);
             let concatList = [].concat.apply([],arrlist)
             console.log(concatList,6666);
             this.dragPoints = []
            for (let i = 0; i < concatList.length; i++) {
              if(concatList[i].markId == undefined){
                console.log(333333);
                this.dragPoints.push(concatList[i])
              }
            }
            console.log(this.dragPoints,22222);


          })
        } else {
          this.changeSuspicionObj(this.suspicionUuids)
          this.polylineObj.disableEditing()
          this.defaultText = '轨迹编辑'
        }
      },

    // 轨迹编辑
    // editPolylineHandler(text) {
    //   if (text == '轨迹编辑') {
    //     console.log(5555555);
    //     this.polylineObj.enableEditing()
    //     this.defaultText = '轨迹重置'
    //     this.timeDifference = moment(this.allspot[this.allspot.length - 1].time, 'YYYYMMDDHHmmss').valueOf() - moment(this.allspot[0].time, 'YYYYMMDDHHmmss').valueOf()
    //     this.polylineObj.addEventListener('mouseout', (e) => {
    //       //  删除之前marker
    //       if (this.deletMarkers && this.deletMarkers.length > 0) {
    //         for (var i = 0; i < this.deletMarkers.length; i++) {
    //           this.map.removeOverlay(this.deletMarkers[i])
    //         }
    //       }
    //       console.log(this.deletMarkers,'this.deletMarkers');
    //       this.totalMetres = 0
    //       // // 自定义时间数组
    //       var timeArr = []
    //       // // 自定义每相邻两个点距离的数组
    //       var MetresArr = []
    //       // // 获取所有点的经纬度数组
    //       this.allspot = this.polylineObj.getPath()
    //       console.log(this.allspot,'this.allspot');
    //       // // 循环经纬度数组
    //       for (var i = 0; i < this.allspot.length; i++) {
    //         // 计算每相邻两点之间的米数距离
    //         var rice = +(this.map.getDistance(this.allspot[i], this.allspot[i + 1]))
    //         if (rice) {
    //           MetresArr.push(rice)
    //           this.totalMetres += rice
    //         }
    //       }
    //       MetresArr = _.dropRight(MetresArr, 1)
    //       this.allspot = _.dropRight(this.allspot, 1)
    //       this.allspot = _.drop(this.allspot, 1)
    //       this.allspot.forEach((item, index) => {
    //         item.time = MetresArr[index]
    //       })
    //       console.log(this.allspot,'this.allspot6666666666');
    //       var time = this.timeDifference / this.totalMetres
    //       for (var i = 0; i < this.allspot.length; i++) {
    //         // 总时间除总米数，得到每一米的时间
    //         var itemTime = 0;
    //         for (var j = 0; j < (i + 1); j++) {
    //           if (j == 0) {
    //             itemTime = Math.round(this.allspot[j].time * time)
    //           } else {
    //             itemTime += Math.round(this.allspot[j].time * time)
    //           }
    //         }
    //         timeArr[i] = moment(moment(this.initTimeArr[0].time, 'YYYY-MM-DD HH:mm:ss') + itemTime).format(
    //           'YYYY-MM-DD HH:mm:ss');
    //       }
    //       this.allspot.forEach((item, index) => {
    //         item.videoStartTime = timeArr[index]
    //         item.offset = 0
    //         item.relativeTime = 0
    //         item.longitude = item.lng
    //         item.latitude = item.lat
    //         item.suspicionUuid = this.suspicionUuids
    //       })
    //       this.dragPoints = this.allspot
    //       console.log(this.dragPoints, 222222111);
    //     })

    //   } else {
    //     this.changeSuspicionObj(this.suspicionUuids)
    //     this.polylineObj.disableEditing()
    //     this.defaultText = '轨迹编辑'
    //   }
    // },


    //保存轨迹编辑
    savePolylineHandler() {
      this.defaultText = '轨迹编辑'
      let data = {
        dragPoints: JSON.stringify(this.dragPoints),
      }
      data = this.$qs.stringify(data);
      this.$http.post('pca/casemng/suspicion/mark/trajectory/save', data, ).then(res => {
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "保存成功！",
            position: "bottom-right",
            duration: 3000
          });
          this.polylineObj.disableEditing()
          this.changeSuspicionObj()
        } else {
          this.$notify({
            type: "warning",
            message: "保存失败！",
            position: "bottom-right",
            duration: 3000
          });
          this.polylineObj.disableEditing()
        }
      })
    },
    //画折线图
    brokenline(arrPois) {
      //箭头图标
      this.map.centerAndZoom(new BMap.Point(arrPois[0].lng, arrPois[0].lat), sessionStorage.getItem('bmapLevel'))
      let sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
        scale: 0.6,
        strokeColor: '#fff',
        strokeWeight: '2',
      });
      let icons = new BMap.IconSequence(sy, '1%', '5%');
      let polyline = new BMap.Polyline(arrPois, {
        // enableEditing: true, //是否启用线编辑，默认为false
        enableClicking: true, //是否响应点击事件，默认为true
        strokeColor: '#48affe',
        strokeWeight: 6,
        strokeOpacity: 0.99,
        icons: [icons] //折线内的图标样式
      });
      this.map.addOverlay(polyline);
      this.map.setViewport(arrPois);
      let marker = new BMap.Marker(arrPois[0]); //起点marker
      let iconc = new BMap.Icon("/static/images/start.png", new BMap.Size(40, 35), {
        offset: new BMap.Size(5, 5),
        imageOffset: new BMap.Size(5, 10),
      }); //地点图标
      marker.setIcon(iconc);
      marker.setTop(true);
      this.map.addOverlay(marker); //将标记添加到地图中
      marker = new BMap.Marker(arrPois[arrPois.length - 1]); //终点marker
      iconc = new BMap.Icon("/static/images/dest.png", new BMap.Size(40, 35), {
        offset: new BMap.Size(5, 5),
        imageOffset: new BMap.Size(5, 10),
      }); //终点icon
      marker.setIcon(iconc);
      marker.setTop(true);
      this.map.addOverlay(marker); //将标记添加到地图中

      let blueCar = new BMapLib.LuShu(this.map, arrPois, {
        defaultContent: "",
        autoView: false, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
        icon: new BMap.Icon('/static/images/Mario1.png', new BMap.Size(60, 60), {
          anchor: new BMap.Size(11, 31),
          setTop: true
        }),
        speed: 3000,
        landmarkPois: [],
        enableRotation: false
      });
      blueCar.start();
      setTimeout(() => {
        for (let i = 0; i < this.arrPoisArr.length; i++) {
          arrPois[i] = new BMap.Point(this.arrPoisArr[i].longitude, this.arrPoisArr[i].latitude);
          let getLongitude = this.arrPoisArr[i].longitude // 获取经度
          let getLatitude = this.arrPoisArr[i].latitude // 获取纬度
          this.zuobiao2Pixel(getLongitude, getLatitude, i)
        }
      }, 1000)


    },
  }

};
export default mixins
