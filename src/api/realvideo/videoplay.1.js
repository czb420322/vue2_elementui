const mixins = {
  data: function () {
    return {
      showplay: true,
      showDataCell: false, //显示数据采集的模态框
      showTaskMan: false, //显示任务管理的模态框
      showVideoRetal: false, //显示新增采集任务的窗口
      showcommlable: false,
      showhandword: false, //显示手工标注
      VideoRetalList: {}, //传给子组件的对象
      taskList: [], //当前视频的任务列表
      time: [],
      videotime: 0, //当前视频总时长
      palytime: 0, //当前时间
      flag: true,
      tiemout: null, //控制定时器
      proressshow: true, //进度条的控制,
      videolist: [],
      beginTime: "",
      endTime: "",
      keyword: "",
      timeId: null, //定时器
      listNum: [-3, -2, -1, 0, 1, 2, 3],
      nowIndex: 3,
      actives: false,
      timeOne: null,
      timeTwo: null,
      timeThree: null,
      ImgfirstShow: false, //结构化，检索结果的展示图片的显示和隐藏
      ImgtwoShow: false, //结构化，检索结果的展示图片的显示和隐藏\
      currentPage: 1, //检索任务列表
      pageSize: 10,
      totalCount: 0,
      allVideoList: [],
      indexToval: '',
      videoPage: 1, //视频列表
      videoSize: 10,
      videototle: null,
      taskUuid: '', //任务检索列表的ID
      progress: '', //检索任务列表的进度
      fileUuid: '',
      timeFrag: '', //片段播放定时器
      timetoTaskList: null, //检索任务的列表定时器
      videocutImg: '', //截图图片
      souse: false,
      videoIndex: null, //播放视频的索引
      showpart: '', //显示片段播放的显示和隐藏
      showcheck: true, //显示和隐藏
      nowCheck: 11, //显示隐藏的索引
      t: null, //刷新视频列表的定时器
      list: [], //检索列表
      AllTime: '', //总时间
      timefragment: null, //片段的定时器
      timeToSeek: '', //获取当前视频时间的定时器
      showcir: null,
      thisTime: null,
      timeTosearch: null, //列表刷新定时器
      showbuffer: false, //显示缓冲
      timeToMore: null, //检索片段加载更多
      deviceId: null,
      timeToplay: null, //播放和暂停的切换
      rulePoint: '', //检索规则坐标
      ruleType: '', //检索规则类型
      taskStatus: '',
      checkOnline:'1', //在线和离线的切换
      deviceUuid:'',
      caseUuid:'',
      Timelist:null,
      checkId:'hisIdPlayer'
    }
  },
  created() {
    this.showplay == 'true'
    this.getDownLoad();
    OnExit();
  },
  watch: {
    // 监听总数的变化
    videototle(val, oldVal) { //普通的watch监听
      if(val != oldVal){
        this.videoPage = 1
      }
      if (oldVal == null) {
        return
      } else {
        this.nowCheck = this.nowCheck + val - oldVal
      }
    },
  },
  mounted() {
    this.showplay == 'true'
    this.getAllVideo(this.videoPage);
    // 刷新视频列表
    this.t = setInterval(() => {
      if (this.$router.currentRoute.path == "/videoCombat/videoplay") {
        this.getAllVideo(this.videoPage);
      } else {
        clearInterval(this.t);
      }
    }, 5000);
    this.nowIndex = 3;
    // 获取时间插件格式
    this.OpenTheTime('#text11', '#text12');
    this.OpenTheTime2('#hisTime1', '#hisTime2');

    //键盘事件
    // var lett = this;
    document.onkeydown = function (e) {
      var key = window.event.keyCode;
      if (key == 39) {
        OnSetup(1);
      }
      if (key == 37) {
        OnSetup(-1);
      }
      if (key == 116) {
        OnInit();
      }
    };
  },
  filters: {
    datatime(value) {
      var hour = Math.floor(value / 3600);
      /*补0操作*/
      hour = hour < 10 ? "0" + hour : hour;
      var minute = Math.floor((value % 3600) / 60);
      minute = minute < 10 ? "0" + minute : minute;
      var second = Math.floor(value % 60);
      second = second < 10 ? "0" + second : second;
      /*返回结果*/
      return hour +":" + minute + ":" + second;
    }
  },
  methods: {
    // 切换在线
    checkLis(){
      this.OpenTheTime('#text11', '#text12');
      this.checkOnline = 1
      document.title = document.title.split(".")[0] + '.';
      this.showTree = false;
      this.facilityName = '';
      OnInit();
      OnhisExits();
      this.BigRetrieval();
      this.ImgtwoShow = false
      this.allVideoList =[]
    },
    //切换历史流播放
    checkHis(){
      this.checkId = 'hisIdPlayer'
      // this.OpenTheTime2('#hisTime1', '#hisTime2');
      this.checkOnline = 2
      document.title = document.title.split(".")[0] + '....'
      OnhisInit()
      OnExit();
      this.BigRetrieval();
      this.ImgtwoShow = false
      this.allVideoList = []
      this.videRetalList = []
    },
    //隐藏检索列表和检索任务
    handleTask() {
      if (this.ImgfirstShow == true) {
        console.log(this.deviceId, 888);
        clearInterval(this.timeFrag) //片段播放的定时器
        clearInterval(this.timetoTaskList) //检索任务的列表定时器
        clearInterval(this.timeToSeek); //进度的请求
        clearInterval(this.thisTime) //循环播放的定时器
        clearInterval(this.timeTosearch)
        clearInterval(this.timeToMore)
        this.nowCheck = null;
        this.BigRetrieval();
        this.ImgfirstShow == false
        this.ImgtwoShow = false;
        OnPlay(this.deviceId, '')
      } else {

      }

    },
    //得到所有的视频列表
    getAllVideo(pageNum) {
      this.getSize();
      let userId = this.$storage.getSession('userInfo').userId;
      let data = {
        fileName: this.keyword,
        pageNum: pageNum,
        pageSize: this.videoSize,
        submiterId: userId,
        begin: this.beginTime,
        end: this.endTime,
        infoKind:0,
        statusl: '2,3,4,6',
        fastOrSpecial:'fast'
      };
      this.$http.get('vsas/collection/offline/list', {
        params: data
      }).then(res => {
        let obj2 = {}
        if (res.data.code == 200) {
          this.videolist = res.data.data.list;
          this.videototle = res.data.data.totalCount
        }
      })
    },
    //打开数据采集的模态框事件
    openDataCell() {
      OnPause('true')
      this.showDataCell = true
      document.title = document.title.split(".")[0];
    },
    //子组件传值
    childByDataCell(val, title) {
      OnPause('false')
      this.showDataCell = val
      document.title = title
      this.getAllVideo(this.videoPage)
      this.nowCheck = null; //关闭任务采集顺便关闭检索任务列表
    },
    //打开任务管理页面
    openTaskMan() {
      OnPause('true')
      this.showTaskMan = true
      document.title = document.title.split(".")[0];
    },
    //任务子组件传值
    childByTaskMan(val, title, list) {
      OnPause('false')
      this.showTaskMan = val;
      document.title = title;
      if (list.length > 0) {
        clearInterval(this.timeTosearch)
        clearInterval(this.t)
        this.videolist = list
        clearInterval(this.timetoTaskList)
        this.showTaskList(this.videolist[0].fileUuid, 0)
        this.nowCheck = 0
      } else {
        this.nowCheck = null
        this.getAllVideo(this.videoPage)
      }
    },
    //打开新增视频检索
    addvideoReatl(row, index) {
      OnPause('true')
      console.log(row,9999);
      this.indexToval = index
      this.VideoRetalList = row
      this.caseUuid = ''
      this.showVideoRetal = true;
      document.title = document.title.split(".")[0];
    },
    // 关闭检索任务
    childbyVideoReat(val, title) {
      OnPause('false')
      this.showVideoRetal = false;
      document.title = title;
      //1 表示离线采集
      if(this.checkOnline == 1){
        this.nowCheck = this.indexToval
        this.$nextTick(() => {
          setTimeout(() => {
            this.showTaskList(this.videolist[this.indexToval].fileUuid, this.indexToval)
          }, 100);
        })
      }

    },
    openCommlable() {
      OnPause('true')
      this.showcommlable = true;
      document.title = document.title.split(".")[0];
    },
    //打开标注池
    childbyCommLable(val, title) {
      OnPause('false')
      this.showcommlable = val
      document.title = title
    },
    // 打开列表刷新定时器
    openlistTime() {
      clearInterval(this.timeTosearch)
      this.timeTosearch = setInterval(() => {
        this.getAllVideo(this.videoPage);
      }, 5000);
    },
    //打开手工标注
    openhandwork() {
      // if(sessionStorage.getItem('time') == 0){
      //   return
      // }
      OnPause('true')
      OnPlayHide('false');
      OnTakeVideoSnapshot(); //执行C++截图的方法
      this.$nextTick(() => {
        let times = setInterval(() => {
          if (window.imgurl != undefined && window.imgurl.length > 20) {
            OnvideoHide();  //隐藏播放器
            this.showhandword = true;
            document.title = document.title.split(".")[0];
            clearInterval(times)
          }
        }, 100);
      })
    },
    childbyHandwork(val, title) {
      OnvideoShow()
      OnPause('false')
      this.showhandword = val
      document.title = title
    },
    showTaskList1(fileUuid, index) {
      let userId = this.$storage.getSession('userInfo').userId;
      let data = {
        fileUuid: fileUuid,
        commitUser: userId
      }
      this.$http.get('vsas/task/getTaskByVideo', {
        params: data
      }).then(res => {
        if (res.data.code == 200) {
          this.taskList = res.data.data
        }
      })
    },
    //隐藏
    hideList(fileUuid, index) {
      this.nowCheck = 11;
      clearInterval(this.timetoTaskList)
    },
    //获取当前文件的检索任务列表 并显示
    showTaskList(fileUuid, index) {
      clearInterval(this.timetoTaskList)
      this.nowCheck = index
      let userId = this.$storage.getSession('userInfo').userId;
      let data = {
        fileUuid: fileUuid,
        commitUser: userId
      }
      this.$http.get('vsas/task/getTaskByVideo', {
        params: data
      }).then(res => {
        if (res.data.code == 200) {
          this.taskList = res.data.data
          if (this.taskList.length == 0) {
            this.nowCheck = 11;
            clearInterval(this.timetoTaskList)
          }
          this.timetoTaskList = setInterval(() => {
            this.showTaskList1(fileUuid, index)
          }, 3000)

        }
      })
      // /task/getTaskByVideo
    },
    //删除检索任务
    deleteTask(row, fileUuid, index) {
      if (this.ImgfirstShow) {
        this.BigRetrieval();
        this.ImgtwoShow = false
        OnStopAll();
        let data = {
          id: row.taskUuid
        };
        data = this.$qs.stringify(data);
        this.$http.post("vsas/task/delete", data).then(res => {
          if (res.data.code == 200) {
            this.$notify({
              type: 'success',
              message: '删除检索任务成功！',
              position: 'bottom-right',
              duration: 3000
            });
            // this.$message({
            //   message: '删除检索任务成功！',
            //   type: 'success'
            // });
            setTimeout(() => {
              this.showTaskList(fileUuid, index)
            }, 10);
          } else {
            this.$notify({
              type: 'error',
              message: '删除检索任务失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
		});
      } else {
        let data = {
          id: row.taskUuid
        };
        data = this.$qs.stringify(data);
        this.$http.post("vsas/task/delete", data).then(res => {
          if (res.data.code == 200) {
            this.$notify({
              type: 'success',
              message: '删除检索任务成功！',
              position: 'bottom-right',
              duration: 3000
            });
            setTimeout(() => {
              this.showTaskList(fileUuid, index)
            }, 10);
          } else {
            this.$notify({
              type: 'error',
              message: '删除检索任务失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        });
      }

    },
    //刷新检索任务列表
    showVideoToMore(taskUuid, currentPage) {
      let data = {
        pageNum: currentPage,
        pageSize: this.pageSize,
        taskUuid: taskUuid,
        orderBy: '',
        orderType: '',
      }
      this.$http.get('vsas/task/video/retrieval', {
        params: data
      }).then(res => {
        if (res.data.code == 200) {
          console.log(666);
          // console.log(5666);
          this.allVideoList = res.data.data.list
          this.totalCount = res.data.data.totalCount
        }
      })
    },
    //获取检索任务结果列表
    showVideoMore(taskUuid, progress, fileUuid, currentPage) {
      clearInterval(this.timeToMore)
      clearInterval(this.Timelist)
      this.Timelist = setInterval(() => {
        OnSeek(-1);
        this.AllTime = sessionStorage.getItem('time')
        if (this.AllTime > 0) {
          clearInterval(this.Timelist)
          this.fileUuid = fileUuid
          this.taskUuid = taskUuid
          this.progress = progress
          let data = {
            pageNum: currentPage,
            pageSize: this.pageSize,
            taskUuid: taskUuid,
            orderBy: '',
            orderType: '',
          }
          console.log(data,9999);
          this.$http.get('vsas/task/video/retrieval', {
            params: data
          }).then(res => {
            if (res.data.code == 200) {
              console.log(res,999999);
              this.timeToMore = setInterval(() => {
                this.showVideoToMore(this.taskUuid, this.currentPage)
              }, 2000);
              this.allVideoList = res.data.data.list
              this.totalCount = res.data.data.totalCount
              if (this.allVideoList.length == 0) {
                this.BigRetrieval();
                this.ImgtwoShow = false
                return
              }
              if (this.AllTime > 0) {
                clearInterval(this.Timelist)
                setTimeout(() => {
                  this.$nextTick(() => {
                    document.getElementById('leftRight').style.width = '85%'
                    document.getElementById('result').style.width = '15%'
                    document.getElementById('result').style.right = '0px'
                    this.ImgfirstShow = true
                    this.ImgtwoShow = false
                    OnChageWindowSize()
                  })
                }, 100);
              }
            }
          })
        }
      }, 100)
    },
    //获取检索的信息  播放第一个检索片段的视频
    getPlayUrl(taskUuid, fileUuid) {
      clearInterval(this.timeToMore)
      clearInterval(this.timeId)
      this.proressshow = true
      OnChangeView(1)
      OnStopAll(-1);
      this.showpart = 0
      this.videoIndex = 0
      this.$http.get('vsas/task/detail?taskUuid=' + taskUuid).then(response => {
        if (response.data.code == 200) {
          this.rulePoint = response.data.data.taskSearch.points
          this.ruleType = response.data.data.taskSearch.type
          this.taskStatus = response.data.data.status
        }
      }).then(response => {
        this.$http.get('vsas/task/file?fileUuid=' + fileUuid).then(res => {
          let rulept = ''
          if (this.taskStatus == 3 || this.taskStatus == 9 || this.taskStatus == 10) {
            rulept = ''
            let lastindex = res.data.data.fileSourcePath.lastIndexOf("/")
            let playvalue = res.data.data.fileSourcePath
            let url = sessionStorage.getItem("hdfsAgentAddr");
            // playvalue = playvalue.slice(lastindex - 81, playvalue.length)
            // 修改为非大数据架构
            playvalue = playvalue.slice(lastindex - 87, playvalue.length)
            playvalue = playvalue.replace('source', 'decode')
            document.getElementById("idUrl").value = url + playvalue;
            this.deviceId = res.data.data.deviceId
            OnPlay(res.data.data.deviceId, '');
            clearInterval(this.timeFrag)
            this.videoIndex = null;
            setTimeout(() => {
              OnSeek(-1);
              this.videotime = JSON.parse(sessionStorage.getItem("time"));
              // this.getSeek();
            }, 200);
            this.getproress();
          } else {
            console.log(this.rulePoint,6666655555);
            if (this.ruleType == 1) {
              let firstTwo = this.rulePoint.split(',')
              if (firstTwo[0] == 0 && firstTwo[1] == 0) {
                rulept = '2-2-' + (firstTwo[2] - 4) + '-2-'+ (firstTwo[2] - 4) +'-' + (firstTwo[3] - 4) +'-2-'+(firstTwo[3] - 4) +'-2-2'
              } else {
                this.rulePoint = this.rulePoint + ',' + firstTwo[0] + ',' + firstTwo[1]
                rulept = this.rulePoint.replace(/,/g, '-')
              }

            } else if (this.ruleType == 2) {
              let firstTwo = this.rulePoint.split(',')
              if (firstTwo[0] == 0 && firstTwo[1] == 0) {
                rulept = '2-2-' + (firstTwo[2] - 4) + '-2-'+ (firstTwo[2] - 4) +'-' + (firstTwo[3] - 4) +'-2-'+(firstTwo[3] - 4) +'-2-2'
              } else {
                rulept = this.rulePoint.replace(/,/g, '-')
              }

            } else if (this.ruleType == 3) {
              let firstTwo = this.rulePoint.split(',')
              if (firstTwo[0] == 0 && firstTwo[1] == 0) {
                rulept = '2-2-' + (firstTwo[2] - 4) + '-2-'+ (firstTwo[2] - 4) +'-' + (firstTwo[3] - 4) +'-2-'+(firstTwo[3] - 4) +'-2-2'
              } else {
                let a = 0
                let b = 0
                if (Number(firstTwo[0]) > Number(firstTwo[2])) {
                  a = Number(firstTwo[2]) + (Number(firstTwo[0]) - Number(firstTwo[2])) / 2
                } else {
                  a = Number(firstTwo[0]) + (Number(firstTwo[2]) - Number(firstTwo[0])) / 2
                }

                if (Number(firstTwo[1]) > Number(firstTwo[3])) {
                  b = Number(firstTwo[3]) + (Number(firstTwo[1]) - Number(firstTwo[3])) / 2
                } else {
                  b = Number(firstTwo[1]) + (Number(firstTwo[3]) - Number(firstTwo[1])) / 2
                }
                console.log(a, b);
                let postPt = getPos(Math.ceil(Number(a)), Math.ceil(Number(b)), Math.ceil(Number(firstTwo[4])), Math.ceil(Number(firstTwo[5])))
                console.log(postPt, 999);
                rulept = Math.ceil(firstTwo[0]) + '-' + Math.ceil(firstTwo[1]) + '-' + Math.ceil(firstTwo[2]) + '-' + Math.ceil(firstTwo[3]) +
                  '-' + Math.ceil(a) + '-' + Math.ceil(b) + '-' + Math.ceil(firstTwo[4]) + '-' + Math.ceil(firstTwo[5]) + '-' + Math.ceil(postPt.ex) +
                  '-' + Math.ceil(postPt.ey) + '-' + Math.ceil(firstTwo[4]) + '-' + Math.ceil(firstTwo[5]) + '-' + Math.ceil(postPt.fx) + '-' + Math.ceil(postPt.fy)
              }
            }
            let lastindex = res.data.data.fileSourcePath.lastIndexOf("/")
            let playvalue = res.data.data.fileSourcePath
            let url = sessionStorage.getItem("hdfsAgentAddr");
            // playvalue = playvalue.slice(lastindex - 81, playvalue.length)
             // 修改为非大数据架构
             playvalue = playvalue.slice(lastindex - 87, playvalue.length)
            playvalue = playvalue.replace('source', 'decode')
            document.getElementById("idUrl").value = url + playvalue;
            this.deviceId = res.data.data.deviceId
            OnPlay(res.data.data.deviceId, rulept);
            setTimeout(() => {
              OnSeek(-1);
              this.videoIndex = 2
              this.palyfrag(this.allVideoList[0], 0)
            }, 800);
            this.getproress();
          }
        })
      })
    },
    //暂停
    pausefrag(index) {
      OnPause('true')
      this.showpart = null
      // this.showpart[index].state = false
    },
    showcircul(index) {
      this.showcir = index
    },
    //隐藏播放按钮
    hidecir() {
      this.showcir = null
    },
    // 单次播放
    circulplay(i) {
      this.palyfrag(this.allVideoList[i], i)
    },
    //全部循环播放
    allplay(task) {
      this.showVideoMore(task.taskUuid,task.progress,task.fileUuid,1);
      this.getPlayUrl(task.taskUuid,task.fileUuid);
      setTimeout(()=>{
        if (this.ImgfirstShow) {
          clearInterval(this.timeFrag) //清除单次循环
          clearInterval(this.thisTime) //清除循环播放
          setTimeout(() => {
            this.videoIndex = 0;
            this.showpart = 0
            this.Allcircul(0)
          }, 200);
        }
      },1000)

    },
    //循环播放
    Allcircul(a) {
      OnSeek(Math.floor(this.allVideoList[a].startTime / 1000))
      this.thisTime = setInterval(() => {
        OnNowTime();
        if (sessionStorage.getItem('nowtime') == Math.floor(this.allVideoList[a].entTime / 1000)) {
          a++
          this.videoIndex++
          this.showpart++
          if (a >= this.allVideoList.length) {
            this.$refs.scroll.scrollTop = 0
            this.videoIndex = 0
            this.showpart = 0
            clearInterval(this.thisTime)
            this.Allcircul(0)
            OnSpeed(0)
          } else if (a < this.allVideoList.length) {
            this.$refs.scroll.scrollTop = (this.$refs.scroll.scrollHeight-this.$refs.scroll.clientHeight) / 9 * a
            if (Math.floor(this.allVideoList[a].startTime / 1000) < Math.ceil(this.allVideoList[a - 1].entTime / 1000)) {
              OnSeek(Math.ceil(this.allVideoList[a - 1].entTime / 1000))
            } else {
              OnSeek(Math.floor(this.allVideoList[a].startTime / 1000))
            }
          }
        }
      }, 1000)
    },

    //播放单个片段
    palyfrag(row, index) {
      OnPause('false')
      clearInterval(this.timeFrag)
      if (this.videoIndex == index) {
        OnPause('false')
        this.showpart = index
      } else {
        this.videoIndex = index
        this.showpart = index
        let startTime = Math.floor(row.startTime / 1000);
        let endTime = Math.ceil(row.entTime / 1000);
        OnSeek(startTime)
        this.timeFrag = setInterval(() => {
          if (sessionStorage.getItem('nowtime') >= endTime) {
            OnSeek(startTime)
            OnSpeed(0)
            this.nowIndex = 3
          }
          if (sessionStorage.getItem('nowtime') == sessionStorage.getItem('time')) {
            OnSeek(startTime)
            OnSpeed(0)
            this.nowIndex = 3
          }
        }, 1000)
      }
    },
    changeColor(e) {},
    //改变播放进度
    playstep(item, i) {
      console.log(6555);
      clearInterval(this.timeOne)
      clearInterval(this.timeTwo)
      clearInterval(this.timeThree)
      this.nowIndex = i;
      OnSpeed(item);
      this.timeOne = setInterval(() => {
        OnNowTime();
        if (
          sessionStorage.getItem("nowtime") ==
          sessionStorage.getItem("time") - 1 ||
          sessionStorage.getItem("nowtime") == 0
        ) {
          this.nowIndex = 3;
        }
      }, 500);
    },
    //快进
    gofast() {
      clearInterval(this.timeOne)
      clearInterval(this.timeTwo)
      clearInterval(this.timeThree)
      OnSeek(-1);
      this.timeTwo = setInterval(() => {
        OnNowTime();
        if (
          sessionStorage.getItem("nowtime") ==
          sessionStorage.getItem("time") - 1
        ) {
          this.nowIndex = 3;
        }
      }, 500);
      if (this.nowIndex <= 5) {
        OnSpeed(this.nowIndex - 2);
        this.nowIndex++;
      } else if (this.nowIndex == 6) {
        this.nowIndex = 6;
        OnSpeed(this.nowIndex - 3);
      }
    },
    //快退
    goretreat() {
      clearInterval(this.timeOne)
      clearInterval(this.timeTwo)
      clearInterval(this.timeThree)
      this.timeThree = setInterval(() => {
        OnNowTime();
        if (sessionStorage.getItem("nowtime") == 0) {
          this.nowIndex = 3;
        }
      }, 500);
      if (this.nowIndex > 0) {
        OnSpeed(this.nowIndex - 4);

        this.nowIndex--;
      } else if ((this.nowIndex = 0)) {
        OnSpeed(this.nowIndex - 3);
      }
    },
    //清除列表定时器
    resetInter() {
      clearInterval(this.timetoTaskList)
      this.nowCheck = 11;
    },
    //视频列表的上一页，下一页
    prevList() {
      this.resetInter();
      this.videoPage -= 1
      if (this.videoPage > 1) {
        this.getAllVideo(this.videoPage)
      } else if (this.videoPage <= 1) {
        this.videoPage = 1
        this.getAllVideo(1)
      }
    },
    nextList() {
      this.resetInter();
      this.videoPage += 1
      let num = Math.ceil(this.videototle / this.videoSize)
      if (num > this.videoPage) {
        this.getAllVideo(this.videoPage)
      } else if (num <= this.videoPage) {
        this.videoPage = num
        this.getAllVideo(num)
      }

    },
    //检索上一页和下一页
    goprev() {
      this.$refs.scroll.scrollTop = 0
      this.showpart = null;
      this.videoIndex = null
      this.currentPage -= 1
      if (this.currentPage > 1) {
        this.showVideoMore(this.taskUuid, this.progress, this.fileUuid, this.currentPage)
      } else if (this.currentPage <= 1) {
        this.currentPage = 1
        this.showVideoMore(this.taskUuid, this.progress, this.fileUuid, this.currentPage)
      }
    },
    gonext() {
      this.$refs.scroll.scrollTop = 0
      this.showpart = null;
      this.videoIndex = null
      let num = Math.ceil(this.totalCount / this.pageSize)
      this.currentPage += 1
      if (num < this.currentPage) {
        this.currentPage = num
        return
      }
      if (num > this.currentPage) {
        this.showVideoMore(this.taskUuid, this.progress, this.fileUuid, this.currentPage)
      } else if (num <= this.currentPage) {
        this.currentPage = num
        this.showVideoMore(this.taskUuid, this.progress, this.fileUuid, this.currentPage)
      }
    },
    //播放视频
    getplay(index, row) {
      console.log(row,999);
      this.$refs.playpro.style.width = 0;
      clearInterval(this.Timelist)
      clearInterval(this.timeToSeek)
      clearInterval(this.timeToMore)
      clearInterval(this.timeFrag)
      clearInterval(this.timeId);
      this.BigRetrieval();
      this.ImgtwoShow = false
      this.nowIndex = 3;
      let lastindex = this.videolist[index].fileSourcePath.lastIndexOf("/")
      let playvalue = this.videolist[index].fileSourcePath
      let url = sessionStorage.getItem("hdfsAgentAddr");
    //   playvalue = playvalue.slice(lastindex - 81, playvalue.length)
    //修改为非大数据架构
     playvalue = playvalue.slice(lastindex - 87, playvalue.length)
      playvalue = playvalue.replace('source', 'decode')
      document.getElementById("idUrl").value = url + playvalue;
    //   console.log(document.getElementById("idUrl").value,999);
      OnPlay(row.deviceId, '');
      this.getproress();
      setTimeout(() => {
        OnSeek(-1);
        this.videotime = JSON.parse(sessionStorage.getItem("time"));
        // this.getSeek();
      }, 200);
    },
    //请求进度
    getSeek() {
      this.timeToSeek = setInterval(() => {
        OnSeek(-1);
        this.videotime = JSON.parse(sessionStorage.getItem("time"));
      }, 3000)
    },
    //进度条
    getproress() {
      clearInterval(this.timeId);
      OnSeek(-1);
      this.timeId = setInterval(() => {
        OnNowTime();
        this.palytime = JSON.parse(sessionStorage.getItem("nowtime"));
        this.videotime = JSON.parse(sessionStorage.getItem("time"));
        if (this.palytime <= this.videotime) {
          var percent = this.palytime / this.videotime * 100 + "%";
          this.$refs.playpro.style.width = percent;
        } else {
          this.palytime = this.videotime;
          this.$refs.playpro.style.width = 0;
        }
      }, 1000);
    },
    //关闭进度条
    closeproress() {
      // this.showplay = false
      clearInterval(this.timeId);
      this.$refs.playpro.style.width = 0;
      this.palytime = 0;
      this.videotime = 0;
      this.flag = true;
      this.proressshow = false;
    },
    // ceshiss(e){
    //   var offset = e.offsetX;
    //   var percent = offset / this.$refs.jumpon.clientWidth;
    //   this.palytime = parseInt(percent * this.videotime);
    //   this.$refs.playpro.style.width = this.palytime / this.videotime * 100 + "%";
    // },
    //跳播
    jumpon(e) {
      /*1.获取当前鼠标相对于父元素的left值--偏移值*/
      var offset = e.offsetX;
      // /*2.计算偏移值相对总父元素总宽度的比例*/
      var percent = offset / this.$refs.jumpon.clientWidth;
      /*3.计算这个位置对应的视频进度值*/
      this.palytime = parseInt(percent * this.videotime);
      OnSeek(this.palytime);
      if (this.flag) {
        this.tiemout = setInterval(() => {
          this.palytime++;
          if (this.palytime <= this.videotime) {
            var percent = this.palytime / this.videotime * 100 + "%";
            this.$refs.playpro.style.width = percent;
            // this.$refs.playpro.style.transition = "all 0.5s linear";
          } else {
            this.palytime = this.videotime;
          }
        }, 1000);
        this.flag = false;
      }
    },
    //创建检索任务
    createRetrieval() {
      document.getElementById('leftRight').style.width = '85%'
      document.getElementById('result').style.width = '15%'
      document.getElementById('result').style.right = '0px'
      this.ImgfirstShow = true
      this.ImgtwoShow = false
      OnChageWindowSize()
    },
    //检索列表的收起
    BigRetrieval() {
      document.getElementById('leftRight').style.width = '100%'
      document.getElementById('result').style.width = '10px'
      document.getElementById('result').style.right = '-10px'
      this.ImgfirstShow = false
      this.ImgtwoShow = true
      OnChageWindowSize()
    },
    //清空选择
    reset(){
      this.videoPage = 1
      this.beginTime = ''
      this.endTime = ''
      this.keyword = ''
      this.getAllVideo(1);
    }
  },
  destroyed() {
    OnExit();
    CloseVodPlayer();
    clearInterval(this.timeOne); //播放速率的定时器
    clearInterval(this.timeTwo); //快进
    clearInterval(this.timeThree); //快退的定时器
    clearInterval(this.timeId); //进度条的定时器
    clearInterval(this.tiemout); //跳播的定时器
    clearInterval(this.timeFrag) //片段播放的定时器
    clearInterval(this.timetoTaskList) //检索任务的列表定时器
    clearInterval(this.timeToSeek); //进度的请求
    clearInterval(this.thisTime) //循环播放的定时器
    clearInterval(this.timeTosearch) //列表加载的定时器
    clearInterval(this.timeToMore) //检索任务列表的刷新
    clearInterval(this.timeToplay);
    clearInterval(window.g_interval)
    clearInterval(this.Timelist)
  }
};
export default mixins
