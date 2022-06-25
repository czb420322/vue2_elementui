<template>
    <div class="detail">
        <div class="ownNature oneNature">
            <p class="natureName">特征属性</p>
            <p class="natureName">案件名称</p>
            <p class="natureName">案发时间</p>
            <p class="natureName">嫌疑目标
              <el-select v-model="suspicion" @change="changeSus" value-key="suspicionUuid">
                <el-option v-for="sus in susperList" :key="sus.suspicionUuid" :value="sus" :label="sus.suspicionName"></el-option>
              </el-select>
            </p>
            <p v-show="showstate == 1" class="natureName">额</p>
            <p v-show="showstate == 1" class="natureName">眉</p>
            <p v-show="showstate == 1" class="natureName">眼</p>
            <p v-show="showstate == 1" class="natureName">鼻</p>
            <p v-show="showstate == 1" class="natureName">嘴</p>
            <p v-show="showstate == 1" class="natureName">耳</p>
            <p v-show="showstate == 1" class="natureName">脸</p>
            <p v-show="showstate == 1" class="natureName">脑</p>
            <p v-show="showstate == 1" class="natureName">颈</p>
            <p v-show="showstate == 1" class="natureName">肩</p>
            <p v-show="showstate == 1" class="natureName">臂</p>
            <p v-show="showstate == 1" class="natureName">手</p>
            <p v-show="showstate == 1" class="natureName">胸</p>
            <p v-show="showstate == 1" class="natureName">腹</p>
            <p v-show="showstate == 1" class="natureName">腰</p>
            <p v-show="showstate == 1" class="natureName">胯</p>
            <p v-show="showstate == 1" class="natureName">背</p>
            <p v-show="showstate == 1" class="natureName">臀</p>
            <p v-show="showstate == 1" class="natureName">腿</p>
            <p v-show="showstate == 1" class="natureName">脚</p>
            <p v-show="showstate == 1" class="natureName">人</p>

            <p v-show="showstate == 2" class="natureName">雨刷器</p>
            <p v-show="showstate == 2" class="natureName">车标</p>
            <p v-show="showstate == 2" class="natureName">风窗玻璃</p>
            <p v-show="showstate == 2" class="natureName">前照灯</p>
            <p v-show="showstate == 2" class="natureName">尾灯</p>
            <p v-show="showstate == 2" class="natureName">转向灯</p>
            <!-- <p v-show="showstate == 2" class="natureName">侧车灯</p> -->
            <p v-show="showstate == 2" class="natureName">车牌号</p>
            <p v-show="showstate == 2" class="natureName">前雾灯</p>
            <p v-show="showstate == 2" class="natureName">后雾灯</p>
            <p v-show="showstate == 2" class="natureName">后视镜</p>
            <p v-show="showstate == 2" class="natureName">保险杠</p>
            <p v-show="showstate == 2" class="natureName">发动机舱盖</p>
            <p v-show="showstate == 2" class="natureName">前车轮</p>
            <p v-show="showstate == 2" class="natureName">后车轮</p>
            <p v-show="showstate == 2" class="natureName">门把手</p>
            <p v-show="showstate == 2" class="natureName">车门</p>
            <p v-show="showstate == 2" class="natureName">车窗</p>
            <p v-show="showstate == 2" class="natureName">天窗/车顶</p>
            <p v-show="showstate == 2" class="natureName">行李盖</p>
            <p v-show="showstate == 2" class="natureName">油箱盖</p>
            <p v-show="showstate == 2" class="natureName">排气孔</p>
            <p v-show="showstate == 2" class="natureName">翼子板</p>
            <p v-show="showstate == 2" class="natureName">车身</p>
            <p class="natureName operation">操作</p>
        </div>
        <div class="ownNature twoNature">
            <p class="natureName natureNamefirst">原点案件</p>
            <p :title="dataCaseInfo.caseName" class="natureItem">{{dataCaseInfo.caseName}}</p>
            <p :title="dataCaseInfo.timeLowLimit" class="natureItem">{{dataCaseInfo.timeLowLimit}}</p>
            <p class="natureItem">{{suspicion.suspicionName}}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.forehead) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.eyebrow) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.eye) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.nose) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.mouth) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.ear) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.face) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.brain) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.neck) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.shoulder) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.arm) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.hand) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.chest) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.abdomen) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.waist) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.crotch) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.back) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.buttocks) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.leg) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.foot) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(person3DObj.people) }}</p>

            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.wiper) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.vehicleMark) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.windowglass) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.headlamp) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.taillight) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.turningLamp) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.carNumber) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.frontFogLamp) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.rearFogLamp) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.rearviewMirror) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.bumper) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.engineHatchCover) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.frontWheel) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.rearWheel) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.doorHandle) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.carDoor) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.window) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.skylightRoof) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.luggageCover) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.oilTankCover) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.exhaustHole) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.wingedPlate) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(car3DObj.body) }}</p>



            <p class="natureItem operation"></p>
        </div>
        <div v-for="(item,index) in person3Dlist" :key="index" class="ownNature threeNature">
            <p class="natureName natureNamefirst">候选案件</p>
            <p :title="item.caseName" class="natureItem">{{item.caseName}}</p>
            <p :title="item.timeLowLimit" class="natureItem">{{item.timeLowLimit}}</p>
            <p class="natureItem">{{item.caseSuspicion.suspicionName}}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.forehead) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.eyebrow) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.eye) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.nose) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.mouth) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.ear) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.face) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.brain) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.neck) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.shoulder) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.arm) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.hand) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.chest) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.abdomen) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.waist) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.crotch) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.back) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.buttocks) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.leg) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.foot) }}</p>
            <p v-show="showstate == 1" class="natureItem">{{ isEmpty(item.people) }}</p>


            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.wiper) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.vehicleMark) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.windowglass) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.headlamp) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.taillight) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.turningLamp) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.carNumber) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.frontFogLamp) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.rearFogLamp) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.rearviewMirror) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.bumper) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.engineHatchCover) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.frontWheel) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.rearWheel) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.doorHandle) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.carDoor) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.window) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.skylightRoof) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.luggageCover) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.oilTankCover) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.exhaustHole) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.wingedPlate) }}</p>
            <p v-show="showstate == 2" class="natureItem">{{ isEmpty(item.body) }}</p>
            <p class="natureItem operation naBtn">
                <el-button :title="item.iscase ? '已添加串并' : ''" type="primary" :disabled="item.iscase" class="searchBtn" @click="addtolist(item)">添加</el-button>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            suspicion:{},
            person3DObj:{},
            person3Dlist:[],
            car3DObj:{},
            car3Dlist:[],
            showstate:null,
            loading:null,

        };
    },
    props: {
        susperList: Array,
        dataCaseInfo: Object,
        pondList:Array
    },
    watch:{
      susperList(val){
        if(val.length == 0){
          this.suspicion = {};
          this.showstate = null;
          this.person3Dlist = []
        }else if(this.$store.state.targetProperty){
          for (let i = 0; i < val.length; i++) {
            if(val[i].suspicionUuid == this.$store.state.suspicionUuid){
              this.suspicion = val[i]
              this.changeSus(this.suspicion)
            }
          }
        }
      },
    },
    components: {},
    methods: {
      isEmpty(text){
        if(String(text) == '' || text == null || text == undefined){
          return '-'
        }else{
          return text
        }
      },
      //切换的时候更新目标
      changeSus(row){
        this.person3Dlist = []
        this.person3DObj = {};
        this.car3DObj = {};
        this.$store.state.casecurrent = 1;
        this.$store.state.casePage = 5;
        this.$store.state.caseTotal = 0;
        this.$store.state.suspicionType = row.suspicionType
        this.$store.state.suspicionUuid = row.suspicionUuid
        if(row.suspicionType == 1){//行人
          this.showstate = 1
          this.getPerorigin(row.suspicionUuid)
          this.getAllPer(row.suspicionUuid)
          // suspicionUuid
        }else if(row.suspicionType == 3){
          this.getCarorigin(row.suspicionUuid)
          this.getAllCar(row.suspicionUuid)
          this.showstate = 2
          //suspicionUuid
        }
      },
      //查询人的三维目标
      getPerorigin(id){
        let data = {
          suspicionId: id
        }
        data = this.$qs.stringify(data)
        this.$http.post('pca/target/comparison/personThree',data).then(res=>{
          if(res.data.code == 200){
            this.person3DObj = res.data.data
          }
        })
      },
      //得到人的比对三维
      getAllPer(id){
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
        this.$http.post('pca/target/comparison/threeSuspicionCase',data).then(res=>{
          this.loading.close();
          if(res.data.code == 200){
            this.person3Dlist = res.data.data.list
            this.person3Dlist.forEach((item,i) => {
              this.pondList.forEach((itmes,j) => {
                if(item.caseUId == itmes.caseUuid){
                  item.iscase = true
                }
              });
            });
            this.$store.state.caseTotal = res.data.data.totalCount
          }
        })
      },
      //车三维比对
      getCarorigin(id){
        let data = {
          suspicionId: id
        }
        data = this.$qs.stringify(data)
        this.$http.post('pca/target/comparison/carThree',data).then(res=>{
          if(res.data.code == 200){
            this.car3DObj = res.data.data
          }
        })
      },
      //得到人的比对三维
      getAllCar(id){
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
        this.$http.post('pca/target/comparison/carthreeSuspicionCase',data).then(res=>{
          this.loading.close();
          if(res.data.code == 200){
            this.person3Dlist = res.data.data.list
            this.person3Dlist.forEach((item,i) => {
              this.pondList.forEach((itmes,j) => {
                if(item.caseUId == itmes.caseUuid){
                  item.iscase = true
                }
              });
            });
            this.$store.state.caseTotal = res.data.data.totalCount
          }
        })
      },
      //添加到对比队列比中去
      addtolist(row){
        this.$http.get('pca/casemng/baseinfo/query?caseUuid='+row.caseUId).then(res=>{
          console.log(res,3666);
          if(res.data.code == 200){
            this.$emit('appendCase',res.data.data)
          }
        })

      }
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
    width: 1.8rem;
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
}
.natureItem{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
