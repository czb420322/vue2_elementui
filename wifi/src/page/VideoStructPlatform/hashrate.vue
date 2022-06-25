<!--
 * @Author: your name
 * @Date: 2019-12-06 10:43:56
 * @LastEditTime : 2020-11-30 10:55:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\videoCombat\taskMan.vue
 -->
<template>
    <div class="parent">
        <!-- <headers/> -->
        <div class="topInfo">
            <img src="../../assets/updataImg/location.png" alt>
            <span class="sysname childname">当前位置：</span>
            <router-link class="sysname" :to="{path:'/manage',query:{menuCode:600}}">系统管理 ></router-link>
            <p class="sysname">&nbsp;算力切换</p>
        </div>
        <p class="splitline"></p>
        <div class="warpper">
            <div class="main">
                <p>
                    <span>涉案视频结构化：</span>
                    <input type="num" v-model="num">

                </p>
                <p>
                    <span>视频结构化：</span>
                    <input type="num" v-model="num2">
                </p>
                <el-button type="primary" class="searchBtn" @click="changeHashrate">切换</el-button>
            </div>
        </div>
        <footer>
            <p>
                <img src="../../assets/logo.png">武汉大千信息技术有限公司&copy;版权所有 2008-
                <span>{{ new Date().getFullYear() }}</span>
            </p>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            num:0,  //侦查
            num2:0,  //结构化平台
            gpuinfo:{},
            nextNum:0,
            loading:null
        };
    },
    mounted() {
        this.getGpuNum()
    },
    methods: {
        //得到Gpu的数量
        getGpuNum(){
            this.num = 0
            this.num2 = 0
            this.nextNum = 0
            this.$http.post('/vsas/structure/calculable/gpu/sum').then((res)=>{
                this.gpuinfo = JSON.parse(res.data.data).data[0]
                this.gpuinfo = JSON.parse(res.data.data).data[0]
                for (let i = 0; i < this.gpuinfo.servers.length; i++) {
                    if(this.gpuinfo.servers[i].type == 0){
                        this.num += 1
                        this.nextNum += 1
                    }else if(this.gpuinfo.servers[i].type == 1){
                        this.num2 += 1
                    }
                }
            })
        },
        //切换算力
        changeHashrate(){
            let list = []
            for (let i = 0; i < this.gpuinfo.servers.length; i++) {
                list.push({
                    "ip":this.gpuinfo.servers[i].ip,
                    "port":this.gpuinfo.servers[i].port,
                    "type":this.gpuinfo.servers[i].type
                })
                if(i<this.num){
                    list[i].type = 0
                }else{
                    list[i].type = 1
                }
            }
            let data = {
                servers:list
            }
            let num = 0
            for (let i = 0; i < list.length; i++) {
                if(list[i].type == 0){
                    num += 1
                }
            }
            if(this.nextNum == num){
                this.$notify({
                    type: "warning",
                    message: "请切换数据",
                    position: "bottom-right",
                    duration: 3000
                });
                return
            }
            this.loading = this.$loading({
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "正在加载！"
            });
            data = this.$qs.stringify(data,{arrayFormat:'indices',allowDots:true})
            this.$http.post('/vsas/structure/calculable/changingOver',data).then((res)=>{
                if(res.data.code == 200){
                    setTimeout(()=>{
                        this.$notify({
                            type: "success",
                            message: "切换成功！",
                            position: "bottom-right",
                            duration: 3000
                        });
                        this.loading.close()
                        this.getGpuNum()
                    },5000)

                }else{
                    setTimeout(()=>{
                        this.loading.close()
                    },5000)
                    this.$notify({
                        type: "warning",
                        message: "切换失败！",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            })
        },
    },
    destroyed(){
    },
};
</script>

<style scoped>
@import "../../assets/css/commom.css";

.parent {
    width: 100%;
    position: absolute;
    top: 0.6rem;
    bottom: 0px;
    left: 0px;
}

.splitline {
    width: 100%;
    height: 0.02rem;
    background: #333232;
}
footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 0.6rem;
    color: #909399;
    padding-top: 0.1rem;
    font-size: 0.14rem;
    text-align: center;
}
footer img {
    vertical-align: middle;
}
.warpper {
    width: 100%;
    min-width: 1200px;
    position: absolute;
    height: calc(100% - .9rem);
    left: 0;
    overflow: auto;
    position: relative;
}
.main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 5rem;
    height: 3rem;
    border: 1px solid #134276 ;
    margin: 0 auto;
    text-align: center;
    padding-top: .8rem
}
.main p{
    margin-bottom: .3rem;
}
.main p input{
    width: calc(100% - 1.6rem);
    line-height: .25rem;
    height: .25rem;
    padding-left: .1rem;
}
.main p span{
    display: inline-block;
    width: 1.2rem;
    text-align: right;
}

</style>



