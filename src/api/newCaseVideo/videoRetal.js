/*
 * @Author: chenxf
 * @Date: 2020-05-17 16:47:06
 * @LastEditTime : 2020-05-27 11:15:10
 * @LastEditors  : chenxf
 * @Description:
 * @FilePath: \vacp-wfes\src\api\newCaseVideo\videoRetal.js
 * @
 */
import {
  draw,
  circle,
  drawPolygon,
  coorValue,
  imgwh,
  Line
} from '../../page/videoCombat/canvas'
import md5 from 'js-md5'
const mixins = {
  data: function () {
    return {
      videoImg: null, //图片url
      retrimodel: 1, // 检索方式
      targetsize: 1, // 目标大小
      targetqxd: 1, // 目标清晰度
      taskName: '', //任务名称
      showImg: false, // 显示图片
      coordinates: [], //装图片的数组
      circle: [], // 装圆点的坐标
      actualcoord: [], // 实际图片的坐标
      actuacircle: [], // 实际圆点的坐标
      tastNameList: [], //获取所有的任务名称
      points: [], //装图片的实际坐标
      fileUuid: '', //文件ID
      videoUrl: '', //文件Url
      deviceId: '',
      showCanvas:false,
      isbdclick:false,
    }
  },
  methods: {
    //自动更新任务名称
    setName() {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      let Name = userInfo.value.userName;
      let date = new Date();
      let year = date.getFullYear(); //获取系统的年；
      let mouth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
      let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); // 获取系统日，
      let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(); //获取系统时，
      let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); //分
      let seon = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(); //秒
      this.taskName = Name + year + mouth + day + hour + min + seon + '视频检索'
      console.log(this.taskName);
    },
    // 画规则
    getcanvas(e) {
      var context = document.getElementById('canvasVideoReterval').getContext('2d')
      var x = e.offsetX
      var y = e.offsetY
      // if (this.retrimodel === 1) {
      //   context.clearRect(0, 0, e.target.clientWidth, e.target.clientHeight)
      //   drawPolygon(context, this.coordinates) //画框
      // }
      if (this.retrimodel === 1) {
        // //如果当前坐标小于等于2则使用前面两个点进行坐标绘制
        if(!this.isbdclick){
          this.coordinates.push([e.offsetX, e.offsetY]);
          if(this.coordinates.length == 2){
            draw(this.coordinates, context)
          }else if(this.coordinates.length > 2){
            //当数组大于2个的时候永远使用最后两项来画图
            draw(this.coordinates.slice(this.coordinates.length - 2,this.coordinates.length), context)
          }
        }
      }
      if (this.retrimodel === 2) {
        this.coordinates.push([e.offsetX, e.offsetY])
        draw(this.coordinates, context)  //画线
      }
      if (this.retrimodel === 3) {
        this.coordinates.push([e.offsetX, e.offsetY])
        draw(this.coordinates, context) // 线
        if(this.coordinates.length > 2){
          this.showCanvas = true
          this.getyuan()
        }
      }
    },
    //3.画框结束前结束画线，并存储
    dbgetcoor(e){
      //判断是否双击完成，双击完成不能再次点击
      if(!this.isbdclick){
        var context = document.getElementById('canvasVideoReterval').getContext('2d')
        var x = e.offsetX  //当前点击的位置的横坐标
        var y = e.offsetY  //当前点击的位置的纵坐标
        // this.coordinates.push([x, y])
        if(this.retrimodel == 1 && this.coordinates.length >2){
          let coord = [this.coordinates[this.coordinates.length - 1],this.coordinates[0]]
          draw(coord, context)
          this.isbdclick = true
        }
      }
    },
    //画箭头
    getyuan() {
      console.log(this.coordinates,6666);
      var canvas = document.getElementById('canvasVideo')
      var context = document.getElementById('canvasVideo').getContext('2d')
      context.clearRect(0, 0, canvas.width, canvas.height);
      let a = 0
      let b = 0
      if (this.coordinates[0][0] > this.coordinates[1][0]){
        a = this.coordinates[1][0] + (this.coordinates[0][0] - this.coordinates[1][0]) / 2
      }else{
        a = this.coordinates[0][0] + (this.coordinates[1][0] - this.coordinates[0][0]) / 2
      }

      if (this.coordinates[0][1] > this.coordinates[1][1]){
        b = this.coordinates[1][1] + (this.coordinates[0][1] - this.coordinates[1][1]) / 2;
      }else{
        b = this.coordinates[0][1] + (this.coordinates[1][1] - this.coordinates[0][1]) / 2;
      }
      var line = new Line(a, b, this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1],'red');
      line.drawWithArrowheads(context);
      // var context = document.getElementById('canvasVideoReterval').getContext('2d')
      // var x = e.offsetX
      // var y = e.offsetY
      // this.circle.unshift(x)
      // this.circle.unshift(y)
      // if (this.circle.length === 2 && this.retrimodel == 3) {
      //   circle(context, x, y)
      // }
    },
    //清空画布
    clearcanvas() {
      this.isbdclick = false
      this.points = []
      this.actuacircle = [];
      this.actualcoord = [];
      this.coordinates = []
      this.circle = []
      this.showCanvas = false
      var context = document.getElementById('canvasVideoReterval').getContext('2d')
      var context1 = document.getElementById('canvasVideo').getContext('2d')
      var reterimg = document.getElementById('reterimgVideoReterval')
      context.clearRect(0, 0, reterimg.clientWidth, reterimg.clientHeight)
      context1.clearRect(0, 0, reterimg.clientWidth, reterimg.clientHeight)
    },
    //获取所有的任务名称
    queryData() {
      let userId = this.$storage.getSession("userInfo").userId
      let data = {
        pageNum: 1,
        pageSize: 500,
        orderBy: '',
        orderType: '',
        commitUser: userId,
        taskName: '',
        type: '', //任务类型
        status: '', //任务状态
        begin: '',
        end: ''
      };
      this.$http.get("vsas/task/list", {
        params: data
      }).then(res => {
        if (res.data.code == 200) {
          this.tastNameList = res.data.data.list
        }
      });
    },
    //提交任务
    getsubmit() {
      //判断是否有当前任务名称
      // for (let i = 0; i < this.tastNameList.length; i++) {
      //   if (this.tastName == this.tastNameList[i].taskName) {
      //     this.$notify({
      //       type: 'warning',
      //       message: '已有当前任务名称',
      //       position: 'bottom-right',
      //       duration: 3000
      //     });
      //     return
      //   }
      // }
      // 获取盒子的大小
      if (this.taskName == '') {
        this.$notify({
          type: 'warning',
          message: '请输入任务名称',
          position: 'bottom-right',
          duration: 3000
        });
        return
      }
      // 放到一个数组中去
      var imgs = document.getElementById('imgs')
      if (this.retrimodel === 1) {
        if(this.coordinates.length == 0){
          this.actualcoord = []
        }else if(this.coordinates.length > 0 && this.coordinates.length < 3){
          this.$notify({
            type: "warning",
            message: "请闭合区域",
            position: "bottom-right",
            duration: 3000
          });
          return
        }else if(this.coordinates.length > 3 && !this.isbdclick){
            this.$notify({
              type: "warning",
              message: "请闭合区域",
              position: "bottom-right",
              duration: 3000
            });
            return
        }else {
          coorValue(imgs, this.coordinates, this.actualcoord);
        }
        // if(this.coordinates.length){
        //   this.coordinates.push(this.coordinates[this.coordinates.length - 1])
        // }
        // coorValue(imgs, this.coordinates, this.actualcoord)
      }else if (this.retrimodel === 2) {
        if(this.coordinates.length < 2){
          this.$notify({
            type: 'warning',
            message: '请创建检索规则',
            position: 'bottom-right',
            duration: 3000
          });
          return
        }else{
          coorValue(imgs, this.coordinates.slice(0, 2), this.actualcoord)
        }

      }else if (this.retrimodel === 3) {
        if(this.coordinates.length < 3){
          this.$notify({
            type: 'warning',
            message: '请创建检索规则',
            position: 'bottom-right',
            duration: 3000
          });
          return
        }else{
          coorValue(imgs, this.coordinates.slice(0, 2), this.actualcoord)
          var imgw = imgs.naturalWidth
          var imgh = imgs.naturalHeight
          var retw = imgs.clientWidth
          var reth = imgs.clientHeight
          this.actuacircle[0] = parseInt(imgw * this.coordinates[this.coordinates.length - 1][0] / retw)
          this.actuacircle[1] = parseInt(imgh * this.coordinates[this.coordinates.length - 1][1] / reth)
        }
      }
      if (this.actuacircle.length == 0){
        this.points = this.actualcoord.join(',')
      }else{
        this.points = this.actualcoord.join(',') +','+ this.actuacircle.join(',')
      }
      if (this.points.length == 0) {
        // this.points = '0,0,' + imgs.naturalWidth + ',' + imgs.naturalHeight
        this.points = '0,0,' + imgs.naturalWidth + ',0,' +imgs.naturalWidth +
        ',' +imgs.naturalHeight + ',0,' + imgs.naturalHeight
      }

      // 在线{}，离线!={}
      if(JSON.stringify(this.VideoRetalList) == '{}'){
        // `/skyDrawFlow?submiterId=${this.$storage.getSession("userInfo").userId}&
        // submiterName=${this.$storage.getSession("userInfo").userName}&
        // infoKind=1&taskName=${this.taskName}&gbDeviceId=${this.gbDeviceId}&snapUrl=''&needAutoStruct=0&
        // taskType=0&category=2&searchType=${this.retrimodel}&size=${this.targetsize}&clarity=${this.targetqxd}&points=${this.points}&
        // gbServer=${sessionStorage.getItem('controlHead').substring(8,sessionStorage.getItem('controlHead').lastIndexOf(':'))}&
        // gbPort=5000&deviceId=${window.imgurl.substring(window.imgurl.indexOf('=') + 1,window.imgurl.length)}&
        // startTime=${this.beginData.replace(' ','_')}&endTime=${this.endData.replace(' ','_')}&
        // fileAdd=${sessionStorage.getItem('collectAddInterface')}&caseUuid=${this.caseUuid}&
        // fileFini=${sessionStorage.getItem('collectFinishInterface')}&
        // parseAdd=${window.origin + '/vsas/video/search/task/add'}&
        // hdfs=${sessionStorage.getItem('collectHdfsPath')}`

        let data = {
            submiterId:this.$storage.getSession("userInfo").userId,
            submiterName:this.$storage.getSession("userInfo").userName,
            infoKind:1,
            taskName:this.taskName,
            gbDeviceId:this.gbDeviceId,
            snapUrl:'',
            needAutoStruct:0,
            taskType:0,
            category:2,
            searchType:this.retrimodel,
            size:this.targetsize,
            clarity:this.targetqxd,
            points:this.points,
            gbServer:sessionStorage.getItem("controlHead").substring(8, sessionStorage.getItem("controlHead").lastIndexOf(":")),
            gbPort:5000,
            deviceId:window.imgurl.substring(window.imgurl.indexOf('=') + 1,window.imgurl.length),
            startTime:this.beginData.replace(' ','_'),
            endTime:this.endData.replace(' ','_'),
            fileAdd:sessionStorage.getItem("collectAddInterface"),
            fileFini:sessionStorage.getItem("collectFinishInterface"),
            parseAdd:'http://' + sessionStorage.getItem("vsasModuleUrl") +  "/video/search/task/add",
            caseUuid:this.caseUuid,
            hdfs:sessionStorage.getItem("collectHdfsPath"),
            sessionId:md5(new Date().getTime() + (Math.floor(Math.random() * (1000 - 1 )) + 1).toString())
        }
        console.log(data,88777)
        data = this.$qs.stringify(data)
        this.$http.post('/vsas/task/sky/create',data).then(res=>{
            this.dialogVisible = false
            if(res.data.code == 200){
                this.$notify({
                    type: "success",
                    message: "任务创建成功",
                    position: "bottom-right",
                    duration: 3000
                });
            }else{
                this.$notify({
                    type: "error",
                    message: "任务创建失败",
                    position: "bottom-right",
                    duration: 3000
                });
            }

        // this.$http.get(
        //   `/skyDrawFlow?submiterId=${this.$storage.getSession("userInfo").userId}&
        //   submiterName=${this.$storage.getSession("userInfo").userName}&
        //   infoKind=1&taskName=${this.taskName}&gbDeviceId=${this.gbDeviceId}&snapUrl=''&needAutoStruct=0&
        //   taskType=0&category=2&searchType=${this.retrimodel}&size=${this.targetsize}&clarity=${this.targetqxd}&points=${this.points}&
        //   gbServer=${sessionStorage.getItem('controlHead').substring(8,sessionStorage.getItem('controlHead').lastIndexOf(':'))}&
        //   gbPort=5000&deviceId=${window.imgurl.substring(window.imgurl.indexOf('=') + 1,window.imgurl.length)}&
        //   startTime=${this.beginData.replace(' ','_')}&endTime=${this.endData.replace(' ','_')}&
        //   fileAdd=${sessionStorage.getItem('collectAddInterface')}&caseUuid=${this.caseUuid}&
        //   fileFini=${sessionStorage.getItem('collectFinishInterface')}&
        //   parseAdd=${window.origin + '/vsas/video/search/task/add'}&
        //   hdfs=${sessionStorage.getItem('collectHdfsPath')}`
        // ).then(res=>{
        //   this.dialogVisible = false
        //   if(res.data.code == 200){
        //     this.$notify({
        //       type: "success",
        //       message: "任务创建成功",
        //       position: "bottom-right",
        //       duration: 3000
        //     });
        //   }else{
        //     this.$notify({
        //       type: "error",
        //       message: "任务创建失败",
        //       position: "bottom-right",
        //       duration: 3000
        //     });
        //   }
        // }).catch(()=>{
        //   this.dialogVisible = false;
        //   this.$notify({
        //     type: "error",
        //     message: "任务创建失败",
        //     position: "bottom-right",
        //     duration: 3000
        //   });
        })
      }else{
        let data = {
          task: {
            taskName: this.taskName, //任务名称
            type: 0 //检索还是结构化
          },
          taskSearch: {
            category: 2, //离线还是在线
            type: this.retrimodel, //检索方式：
            size: this.targetsize, //大小
            clarity: this.targetqxd, //清晰
            points: this.points, //检索规则坐标
            videoUrl: this.videoUrl,
            // videoUrl: 'http://172.24.1.230:50070/webhdfs/v1/videtek/guiyang/debug/video/20190109/42FC4F6A13D94fb7A9039DB6B4E79223/7D1420468F8744baA1B606956B1B70B4/decode/20190107130019-20190107140018.flv',
            deviceId: this.deviceId,
            fileUuid: this.fileUuid,
            fileNum: 1
          }
        }
        data = JSON.stringify(data)
        let data2 = {
          datas: data
        }

        data2 = this.$qs.stringify(data2)
        this.$http.post('vsas/task/add', data2).then(res => {
          if (res.data.code == 200) {
            this.dialogVisible = false
            this.$notify({
              type: 'success',
              message: '任务创建成功',
              position: 'bottom-right',
              duration: 3000
            });
          }
        })
      }

      this.taskName = ''
      this.points = []
    },
  }
};
export default mixins
