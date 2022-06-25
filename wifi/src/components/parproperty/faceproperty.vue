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
                <el-select v-model="lableModel" @change="getchangeSus" value-key="traceImgUrl">
                    <el-option v-for="item in lableMarkList" :key="item.traceImgUrl" :value="item" :label="item.markName"></el-option>
                </el-select>
            </p>
            <!-- 人 -->
            <p class="natureName">相似度</p>
            <p class="natureName personName">

            </p>
            <p class="natureName operation">操作</p>
        </div>
        <div class="ownNature twoNature">
            <p class="natureName natureNamefirst">原点案件</p>
            <p :title="dataCaseInfo.caseName" class="natureItem">{{ dataCaseInfo.caseName }}</p>
            <p :title="dataCaseInfo.timeLowLimit" class="natureItem">{{ dataCaseInfo.timeLowLimit }}</p>
            <p class="natureItem">{{ suspicion.suspicionName }}</p>
            <p class="natureItem">{{lableModel.markName}}</p>
            <p class="natureItem">-</p>
            <p class="natureItem personName" id="personPic">
              <img class="imgPicture" id="imgUrlReveal" :src="snapshotFile" alt>
            </p>
            <p class="natureItem operation"></p>
        </div>
        <div v-for="(item,index) in caseList.slice(($store.state.casecurrent-1)*$store.state.casePage,$store.state.casecurrent*$store.state.casePage)" :key="index" class="ownNature threeNature">
            <p class="natureName natureNamefirst">候选案件</p>
            <p :title="item.caseName" class="natureItem">{{item.caseName}}</p>
            <p :title="item.timeLowLimit" class="natureItem">{{item.timeLowLimit}}</p>
            <p class="natureItem">{{item.suspicionName}}</p>
            <p class="natureItem">{{item.markName}}</p>
            <p class="natureItem">{{item.score | score}}</p>
            <p class="natureItem personName" v-if="checkshow">
              <img class="imgPicture" :id="'candidateFace_'+index" v-show="aaa"
              :src="item.snapshotFile">
            </p>
            <p class="natureItem operation naBtn">
                <el-button :title="item.iscase ? '已添加串并' : ''" class="searchBtn" :disabled="item.iscase" type="primary" @click="addtolist(item)">添加</el-button>
            </p>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      caseList: [], // 候选案件
      sustarget: "",
      suspicion:{},  //嫌疑目标对象
      lableMarkList:[], //嫌疑目标对象下面的标注数组
      lableInfoMan:{},  //比对属性
      lableModel:{}, //比对标注的人脸
      sustype:'',
      facePerson:{}, // 嫌疑人人脸获取
      snapshotFile:'',
      refaceList: [], // 存储人脸
      checkshow:false,
      arr: [],
      loading:null,  //数据加载
      faceList:[], //比对结果列表
      aaa: false
    };
    },
    filters:{
      score(val){
        if(val != undefined){
          return (Number(val.substring(0, 6)) * 100).toFixed(2) + '%'
        }
      }
    },
    props: {
      susperList: Array,  //嫌疑人数组
      dataCaseInfo:Object,  //案件对象
      pondList:Array
    },
    watch:{
      susperList(val){
        if(val.length == 0){
          this.lableModel = {}
          this.suspicion = {}
          this.snapshotFile = ''
          this.sustarget = null;
          this.caseList = []
          this.lableMarkList = []
        }
      },
      '$store.state.casecurrent'(val){
        this.faceList = []
        this.checkshow = false
        this.faceList = this.caseList.slice((val-1)*this.$store.state.casePage,val*this.$store.state.casePage)
      },
      faceList:{
        handler(val, oldval){
          if(val.length){
            this.checkshow = true
            this.aaa = false
            for (let i = 0; i < val.length; i++) {
              var img = new Image()
              img.onload = () => {
                // setTimeout(()=>{
                  let imgs = document.getElementById("candidateFace_" + i);
                  setTimeout(()=>{
                    let imgWidth = imgs.naturalWidth;
                    let imgHeight = imgs.naturalHeight;
                    let facelable = val[i].facePos.split(',')
                    let faceLeft = facelable[0]; //+ Number(dList[i].window.face_left);
                    let faceTop = facelable[1]; // + Number(dList[i].window.face_right);
                    let faceWidth = facelable[2];
                    let faceHeight = facelable[3];
                    let unit = 1;
                    let faceLeftPos = 0;
                    let faceTopPos = 0;
                    if (faceWidth < 100 && faceHeight < 100) {
                      faceTopPos = (100 - faceHeight) / 2;
                      faceLeftPos = (100 - faceWidth) / 2;
                    } else {
                      if (1 < faceWidth / faceHeight) {
                        unit = faceWidth / 100;
                        faceLeftPos = 0;
                        faceTopPos = (100 - faceHeight / unit) / 2;
                      } else {
                        unit = faceHeight / 100;
                        faceTopPos = 0;
                        faceLeftPos = (100 - faceWidth / unit) / 2;
                      }
                    }
                    imgs.style.top =(-(faceTop / unit - faceTopPos)) + "px";
                    imgs.style.left = (-(faceLeft / unit - faceLeftPos)) +"px";
                    imgs.style.width = (imgWidth / unit ) + "px";
                    imgs.style.height = (imgHeight / unit) + "px";
                    setTimeout(()=>{
                      this.aaa = true
                    },110)
                  },100)
              }
              img.src = val[i].snapshotFile;
            }
          }
        },
        deep:true
      },
      //获取候选案件人脸
      caseList:{
        handler(val, oldval){
          if(val.length){
            this.refaceList =[]
            this.faceList = []
            this.$nextTick(()=>{
              this.faceList = this.caseList.slice((this.$store.state.casecurrent-1)*this.$store.state.casePage,this.$store.state.casecurrent*this.$store.state.casePage)
            })
          }
        },
        deep:true
      },
      // 获取嫌疑目标人脸
      facePerson:{
        handler(val,oldval){
          if(JSON.stringify(val) == '{}'){
            return
          }
          let imgs = document.getElementById("imgUrlReveal");  // 图片大小
            setTimeout(()=>{
              let imgWidth = imgs.naturalWidth;
              let imgHeight = imgs.naturalHeight;
              if(val.facePos == '' || val.facePos == null || val.facePos == undefined) {
                return
              }
              let facelable = val.facePos.split(',')
              let faceLeft = facelable[0]; //+ Number(dList[i].window.face_left);
              let faceTop = facelable[1]; // + Number(dList[i].window.face_right);
              let faceWidth = facelable[2];
              let faceHeight = facelable[3];
              let unit = 1;
              let faceLeftPos = 0;
              let faceTopPos = 0;
              if (faceWidth < 100 && faceHeight < 100) {
                faceTopPos = (100 - faceHeight) / 2;
                faceLeftPos = (100 - faceWidth) / 2;
              } else {
                if (1 < faceWidth / faceHeight) {
                  unit = faceWidth / 100;
                  faceLeftPos = 0;
                  faceTopPos = (100 - faceHeight / unit) / 2;
                } else {
                  unit = faceHeight / 100;
                  faceTopPos = 0;
                  faceLeftPos = (100 - faceWidth / unit) / 2;
                }
              }
              imgs.style.top =(-(faceTop / unit - faceTopPos)) + "px";
              imgs.style.left = (-(faceLeft / unit - faceLeftPos)) +"px";
              imgs.style.width = (imgWidth / unit ) + "px";
              imgs.style.height = (imgHeight / unit) + "px";
            },50)
        },
        deep: true
      }
    },
    methods: {
      //切换嫌疑目标对象
      changeSus(row){
        this.caseList = []
        this.lableMarkList = []
        this.$store.state.casecurrent = 1
        this.facePerson = {}
        this.lableModel = {}
        this.sustarget = null
        this.snapshotFile = ''
        this.getMarkList(row.suspicionUuid,row.suspicionType)
      },
      //得到嫌疑目标下面的所有数组
      getMarkList(suspicionUuid,suspicionType){
        let data = {
          caseUuid: this.$store.state.caseUuid,
          suspicionUuid: suspicionUuid,
          suspicionType: suspicionType
        };
        if(suspicionType == 1){//表示是行人
          this.sustype = 1
        }else if(suspicionType ==2){//表示是骑车人
          this.sustype = 4
        }
        data = this.$qs.stringify(data)
         this.$http.post('/vsas/speed/query/case/target',data).then(res=>{
          if(res.data.code == 200){
            if(res.data.data == null){
              this.lableMarkList = []
              this.lableModel = {}
            }else{
              for (let i = 0; i < res.data.data.length; i++) {
                if(res.data.data[i].featureFlag == 1){
                  this.lableMarkList.push(res.data.data[i])
                }
              }
              // this.lableMarkList = res.data.data
            }
          }
        })
      },
      //切换嫌疑目标对象下面的标注
      getchangeSus(row){
        this.caseList = []
        this.checkshow = false
        this.facePerson = row
        // if(this.facePerson.facePos == null) {

        // }
        this.$store.state.casecurrent = 1;
        this.snapshotFile = row.snapshotFile
        if(row.featureFlag == 1){
          this.snapshotFile = row.snapshotFile
          if(row.bicycleUuid){
            this.getfaceList(row.bicycleUuid)
          } else if(row.personUuid){
            this.getfaceList(row.personUuid)
          } else if(row.vehicleUuid){
            this.getfaceList(row.vehicleUuid)
          }
        }else{
          this.snapshotFile = ''
          this.$notify({
            type: 'warning',
            message: '没有比对结果，无法进行比对',
            position: 'bottom-right',
            duration: 3000
          });
        }
      },
      //获取人脸搜案件的比对结果
      getfaceList(id){
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "正在加载！"
        });
        let data = {
          feature:'',
          uuid:id,
          type:this.sustype,
          targetJson:JSON.stringify({}),
          caseUuid: this.$store.state.caseUuid,
        };
        data = this.$qs.stringify(data)
        this.$http.post('pca/feature/case/by/feature',data).then(res=>{

          this.loading.close();
          if(res.data.code == 200){
            this.caseList = res.data.data
            if(this.caseList == null){
              this.caseList = []
              this.$notify({
                type: 'warning',
                message: '没有比对结果!',
                position: 'bottom-right',
                duration: 3000
              });
            }
            this.caseList.forEach((item,i) => {
              this.pondList.forEach((itmes,j) => {
                if(item.caseUuid == itmes.caseUuid){
                  item.iscase = true
                }
              });
            });
            this.$store.state.caseTotal = this.caseList.length
          }else{
            this.caseList = []
            this.$store.state.caseTotal = 0
             this.$notify({
                type: 'warning',
                message: '没有比对结果!',
                position: 'bottom-right',
                duration: 3000
              });
          }

        })
      },
      // 添加案件
      addtolist(row){
        this.$emit('appendCase',row)
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
p.personName{
  position: relative;
  height: 1.5rem
}
.imgPicture{
  position: absolute;
  right: auto;
  bottom: auto;
  margin: 0;
}
</style>
