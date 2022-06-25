<!--
 * @Author: your name
 * @Date: 2020-10-13 19:30:09
 * @LastEditTime : 2021-08-03 10:56:59
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev-dongxihu-zhencha\vacp-wfes\src\page\videoCombat\faceMan\faceComparison.vue
 -->
<template>
    <div class="facecom">
        <el-dialog
            title="人脸比对"
            :visible.sync="dialogVisible"
            @close="closeDia"
            :show-close="true"
            top="8vh"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            @open="opendia"
            width="70%"
        >
            <div class="mainface">
                <div class="faceleft">
                    <div class="facePos" id="Faceshow">
                        <img v-if="isflag" id="imgItemsearch-show" :src="imgUrlFace">
                    </div>

                    <div class="div1">
                        <div @click.stop="choiceCar($event)" class="show" id="imgBoxsearch">
                            <div
                                size="small"
                                class="deleteImg"
                                icon
                                type="danger"
                                @click.stop="clearPhoto()"
                            ></div>
                            <img id="imgItemsearch" :src="imgUrl">
                            <canvas id="PCanvas" class="showPhoto"></canvas>
                        </div>
                    </div>
                    <div class="btn">
                        <el-upload
                            class="upload"
                            action="vehicle/image/upload"
                            name="uploadImage"
                            ref="upload"
                            :before-upload="img1AvatarUpload"
                        >
                            <el-button
                                size="small"
                                class="topBtn mr15"
                                icon="el-icon-picture-outline"
                                type="primary"
                            >上传图片</el-button>
                        </el-upload>
                        <el-button
                            icon="el-icon-printer"
                            class="bibtn topBtn"
                            @click="FaceComparison"
                            type="success"
                        >比对</el-button>
                    </div>
                </div>
                <div class="faceright">
                    <ul id="topDom">
                        <li v-for="(item,index) in newfaceList.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index">
                            <div class="showimgPic">
                                <img
                                    :src="item.faceUrl"
                                    @load="imgscale('.face_block')"
                                    class="face_block"
                                    @click.stop.self="ClickCheckd(item, index)"
                                >
                            </div>
                            <div class="facescore">
                                相似度：{{item.score | score}}
                            </div>
                            <div class="faceInfo faceshow">
                                <div><span>姓名：<i></i></span> <span>{{item.name}}</span></div>
                                <div><span>性别：<i></i></span> <span>{{item.sex | sexmater}}</span></div>
                                <div><span>出生年月：<i></i></span> <span>{{item.birthday}}</span></div>
                                <div><span>身份证号：<i></i></span> <p :title="item.certNumber" class="textoverflow">{{item.certNumber}}</p></div>
                            </div>
                        </li>
                    </ul>
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[12, 24, 36]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount"
                    ></el-pagination>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" class="cancleBtn" @click="dialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import personFace from "../../../api/casestudy/personFace.js";
import scale from '../../../api/common/scale.js';  //导出日志模态框
export default {
    data() {
        return {
            dialogVisible: false,
            currentPage: 1,
            pageSize: 12,
            totalCount: 0,
            newfaceList: [],
            loading:null
        };
    },
    mounted() {},
    watch: {
        openface(val) {
            this.dialogVisible = val;
        }
    },
    mixins: [personFace,scale],
    props: {
        openface: Boolean,
        btnlibInfo: Object
    },
    filters:{
        sexmater(val){
            if(val == 1){
                return '女'
            }else if(val == 2){
                return '未知'
            }else{
                return '男'
            }
        },
        score(val){
            if(val != undefined){
            return (Number(val.substring(0, 6)) * 100).toFixed(2) + '%'
            }
        }
    },
    methods: {
        //关闭模态框
        closeDia() {
            this.dialogVisible = false;
            this.$emit("childbyface", false);
            this.clearPhoto();
            this.currentPage = 1;
            this.pageSize = 12;
            this.totalCount = 0;
            this.newfaceList = [];
            this.feature1 = ''
        },
        //打开模态框
        opendia() {},
        //人脸比对
        FaceComparison() {
            if(this.imgUrl == ''){
                this.$notify({
                    type:'warning',
                    message:'请上传图片！',
                    duration:'3000',
                    position: 'bottom-right',
                })
                return
            }
            if(this.feature1 == ''){
                this.$notify({
                    type:'warning',
                    message:'暂无特征！',
                    duration:'3000',
                    position: 'bottom-right',
                })
                return
            }
            //每次比对之前都清空一下页数和结果
            this.currentPage = 1;
            this.pageSize = 12;
            this.newfaceList = []
            this.totalCount = 0;

            let data = {
                featrure:this.feature1,
                faceDbPrimaryKey: this.btnlibInfo.id
            };
            this.loading = this.$loading({
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "正在比对"
            });
            data = this.$qs.stringify(data);
            this.$http.post("vsas/face/1vN", data).then(res => {
                if(res.data.code == 200){
                    this.loading.close()
                    this.newfaceList = res.data.data
                    this.totalCount = this.newfaceList.length
                }

            }).catch(()=>{
                this.loading.close()
            })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.currentPage = 1
        },
        handleCurrentChange(val) {
            this.currentPage = val
        }
    }
};
</script>


<style scoped>
@import "../../../assets/css/commom.css";
.mainface {
    height: 7rem;
}
.mainface > div {
    height: 100%;
}
.faceleft {
    width: 40%;
    float: left;
    border: 1px solid rgba(38, 85, 134, 0.32);
}
.faceright {
    width: 59%;
    float: right;
    border: 1px solid rgba(38, 85, 134, 0.32);
}

.show {
    position: relative;
    width: 100%;
    height: 100%;
}

.facePos {
    position: relative;
    width: 1.77rem;
    height: 1.77rem;
    margin: 0 auto;
    border: 1px solid #1c3f67;
    overflow: hidden;
    /* background: url(../../../assets/images/faceContrast/l_photo.png) no-repeat; */
    /* background-size:100% 100%; */
}

.showPhoto,
#imgItemsearch {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin:auto;
}
.facePos img{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin:0 auto;
}

#imgBoxsearch img {
    margin: auto;
}

.clearBtn {
    position: absolute;
    bottom: 1rem;
    left: 5.8rem;
}

.deleteImg {
    width: 0.2rem;
    height: 0.2rem;
    background: url(../../../assets/images/faceContrast/delete.png) no-repeat;
    position: absolute;
    top: 0;
    right: 0;
    background-size: 100% 100%;
    border: 0;
    z-index: 9999;
}
.deleteImg:hover {
    cursor: pointer;
}
.div1 {
    flex: 6;
    width: 100%;
    height: 60%;
    padding: 0.1rem;
    /* border: 1px solid red; */
}
.div1 > div {
    width: 100%;
    height: 100%;
    border: 1px solid #1c3f67;
}
.btn {
    width: 100%;
    height: 0.4rem;
    position: relative;
}
.btn .upload {
    position: absolute;
    top: 0;
    left: 50%;
}
.bibtn {
    position: absolute;
    top: 0.12rem;
    right: 32%;
}

.el-progress /deep/ .el-progress__text {
    color: #99c9fa;
    font-size: 0.38rem !important;
}
.topBtn {
    position: absolute;
    z-index: 1;
}
.mr15 {
    margin-left: -1rem;
}
.faceright ul{
    height: 90%;
    overflow: auto
}
.faceright ul li{
    width: 24%;
    height: 1.9rem;
    float: left;
    margin-right: 1%;
    margin-bottom: .1rem;
    border: 1px solid red;
    position: relative;

}
.faceright ul .showimgPic{
  position: relative;
  height: 100%;
}
.showimgPic img{
    /* width: 100%; */
    /* height: 100%; */
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
}
.facescore{
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(32,49,67,.6);
    color: #99c9fa;
    padding: 0.02rem 0.05rem
}
.faceInfo{
    width: 100%;
    height: .9rem;
    position: absolute;
    bottom: 0;
    color: #99c9fa;
    padding: 0 0.05rem;
    cursor: pointer;
    display: none;
    padding-top: .05rem;
    font-size: 0.12rem
}
.faceInfo >div{
    height: .2rem;
}
.faceright ul li:hover .faceshow{
    display: block;
    background: rgba(32,49,67,.6);
}
.faceInfo span{
    line-height: 0.2rem;
}
.faceInfo span:first-child{
    width: .8rem;
    float: left;
    height: .2rem;
    text-align: justify;
}
.faceInfo i{
    width: 100%;
    display: inline-block
}
.textoverflow{
    width: calc(100% - .8rem);
    height: .2rem;
    line-height: .2rem;
    display: inline-block;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.el-pagination{
    text-align: right;
    margin-top: .2rem;
    margin-right: .2rem;
}

</style>
