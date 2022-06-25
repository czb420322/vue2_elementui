//import axios from 'axios'

//接口数据
const mixins = {
  data(){
    return{
      loading:null,
      showlist:[],
      listTreeData:[],
      isNone: false
    }
  },
  computed:{

  },
  watch:{
    textInfo(val){
      if(val != ''){
        setTimeout(()=>{
          this.selectVideoData()
        },500)

      }else{
        this.selectVideoData()
      }
    },
    filterText(val){
      if(val != ''){
        setTimeout(()=>{
          this.getVDByModel()
        },500)
      }else{
        this.getVDByModel()
      }
    },
    facilityName(val){
      if(val != ''){
        setTimeout(()=>{
          this.gettreeModel()
        },500)

      }else{
        this.gettreeModel()
      }
    }
  },
  mounted () {

  },
  methods: {
    //获取视频卡口的信息
    getByModel(successFn) {
      this.$http({
        url: 'sms/ape/selectByVideo',
        method: 'post'
      }).then((res) => {
        successFn(res);
      }).catch((err) => {
      });
    },
    // 获取视频的信息
    getVDByModel() {
      // this.loading = this.$loading({
      //   target:'.showhide',
      //   lock: true,
      //   background: "rgba(255,255,255,0.4)",
      //   text: "正在加载.."
      // });
      let data = {
        apeName:this.filterText
      }
      data = this.$qs.stringify(data)
      this.$http.post("/sms/ape/selectByVideo",data).then(res => {
        if (res.data.code == 200) {
          this.showlist = []
          // this.loading.close()
          this.treeData = this.getOffline(res.data.data)
          let obj={}
          for (let i = 0; i < this.treeData.length; i++) {
            obj = {
              state:true
            }
            this.showlist.push(obj)
          }
          // this.createMarkerAll(this.videoList, videoIco);
        }else{
          // this.loading.close()
          this.$notify({
            type: 'error',
            message: '获取视频列表失败',
            position: 'bottom-right',
            duration: 3000
          });
        }
      });
    },
    // 获取视频的信息
    gettreeModel() {
      this.loading = this.$loading({
        target:'.showhide',
        lock: true,
        background: "rgba(255,255,255,0.4)",
        // background:"red",
        text: "正在加载.."
      });
      let data = {
        apeName:this.facilityName
      }
      data = this.$qs.stringify(data)
      this.$http.post("/sms/ape/selectByVideo",data).then(res => {
        if (res.data.code == 200) {
          this.showlist = []
          this.loading.close()
          this.listTreeData = this.getOffline(res.data.data)
          if(this.listTreeData.length > 0) {
            this.isNone = false
          } else {
            this.isNone = true
          }
          let obj={}
          for (let i = 0; i < this.listTreeData.length; i++) {
            obj = {
              state:true
            }
            this.showlist.push(obj)
          }
          // this.createMarkerAll(this.videoList, videoIco);
        }else{
          this.loading.close()
          this.$notify({
            type: 'error',
            message: '获取视频列表失败',
            position: 'bottom-right',
            duration: 3000
          });
        }
      });
    },
    showtree(index){
      this.showlist[index].state = true
    },
    hidetree(index){
      console.log(111);
     this.showlist[index].state = false
    },
    showhide(index){
      this.showlist[index].state = !this.showlist[index].state
    },
    //离线采集模块
    //查询接口
    getdatacoll(data, successFn) {
      this.$http({
        url: 'vsas/collection/offline/list',
        method: 'get',
        params: data
      }).then((res) => {
        successFn(res)
      }).catch(err => {
      })
    },
    //转码视频后的接口
    getrealvideo(data,successFn){
      this.$http({
        url: 'vsas/collection/offline/list?status=4',
        method: 'get',
        params: data
      }).then((res) => {
        successFn(res)
      }).catch(err => {
      })
    },

    //过滤天网离线视频
    getOnline(datalist){
      let arr = []
      for (let i = 0; i < datalist.length; i++) {
        let list = datalist[i].apes
        for (let j = 0; j < list.length; j++) {
          if(list[j].isOnline !== '1'){
            arr.push(list[j])
          }
        }
      }
      for (let k = 0; k < arr.length; k++) {
        for (let i = 0; i < datalist.length; i++) {
          let list = datalist[i].apes
          for (let j = 0; j < list.length; j++) {
            if(arr[k].shebeiId == list[j].shebeiId){
              list.splice(j,1)
            }
          }
        }
      }


      for (let i = 0; i < datalist.length; i++) {
        if(datalist[i].apes.length == 0 || datalist[i].apes == null){
          datalist.splice(i,1)
        }
      }
      return datalist
    },
    //给当前设备加上在线，离线字样
    getOffline(datalist){
      for (let i = 0; i < datalist.length; i++) {
        let apes = datalist[i].apes
        for (let j = 0; j < apes.length; j++) {
          if(apes[j].isOnline == 1){
            apes[j].name = ('(在线) ' + apes[j].name)
          }else{
            apes[j].name = ('(离线) ' + apes[j].name)
          }
        }
      }
      return datalist
    }


  }

};
export default mixins

