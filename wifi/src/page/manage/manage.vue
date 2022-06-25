<template>
    <div class="manage">
        <!-- <search-module moduleName="系统管理页面" /> -->
        <div class="manageConten">
            <div v-for="(item,index) in list" :key="index">
                <p v-if="item.mlist.length" class="sysmanage messageNotic">
                    <span class="line"></span>
                    <span class="text" v-text="item.name"></span>
                </p>
                <ul class="syslist">
                    <!-- <router-link tag="li" v-for="(child,cindex) in item.mlist" :key="cindex" class="item"
                :to="{path:cssobj[child.menuCode][1],query:{menuCode:child.menuCode}}"
                :class="cssobj[child.menuCode][0]"
                    >-->
                    <li
                        @click="goToRouter(child)"
                        v-for="(child,i) in item.mlist"
                        :key="i "
                        class="item"
                        :class="cssobj[child.menuCode][0]"
                    ></li>
                    <!-- </router-link> -->
                </ul>
            </div>
        </div>
        <footerSecond/>
    </div>
</template>
<script>
import footerSecond from "../../components/footer_second";
import searchModule from "../../components/search_module";
import { getModuleList } from "../../api/manages/userManage";
export default {
    data() {
        return {
            list: [],
            system_list: [],
            info_list: [],
            cssobj: {
                601: ["department", "/manage/departmentManage"],
                602: ["user", "/manage/userManage"],
                603: ["role", "/manage/roleManage"],
                604: ["log", "/manage/logManage"],
                605: ["dictionary", "/manage/dicManage"],
                606: ["quitpment", "/manage/device"],
                607: ["opration", ""],
                608: ["store", ""],
                609: ["timesync", ""],
                610: ["msgtake", ""],
                611: ["msgnotic", ""],
                672: ["case3D", "/manage/case3DManage"],
                673: ["faceManage", "/manage/faceManage"], //人像库管理
                675: ["hashrate", "/manage/hashrate"] //人像库管理
                // 673:['case3D','/manage/case3DManage']
            },
            loading: null
        };
    },
    mounted() {
        this.queryModule();
    },
    components: {
        searchModule,
        footerSecond
    },
    methods: {
        //跳转单独的运维页面页面
        goToRouter(val) {
            if (val.menuCode == 607) {
                this.$http.get("sms/monitor/toMonitor").then(res => {
                    console.log(res, 77777);
                    window.open(res.data.data, "_blank");
                });
                return;
            }
            this.$router.push({
                path: this.cssobj[val.menuCode][1],
                query: { menuCode: val.menuCode }
            });
        },
        queryModule: function() {
            let that = this;
            let menuCode = this.$route.query["menuCode"];
            let userId = this.$storage.getSession("userInfo").userName;
            let data = {
                parentId: menuCode,
                currentUser: userId
            };
            data = that.$qs.stringify(data); //post请求分离data
            that.loading = that.$loading({
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "加载中"
            });
            that.$http.post("/sms/menu/secondChildMenu", data).then(res => {
                that.loading.close();
                if (res.statusText == "OK" && res.data.code == "200") {
                    this.list = res.data.data;
                } else if (res.data.code == 100) {
                    this.$router.push("/login");
                } else {
                    // layer.alert(res.data.message,{icon:5,title:"消息提示"});
                    this.$router.push("/login");
                }
            });
        }
    }
};
</script>
<style  scoped>
@import "../../assets/css/nav_page_second.css";

.case3D {
    background: url("../../assets/system/case3dnormal.png") no-repeat center /
        90% 90%;
}
.case3D:hover {
    background: url("../../assets/system/case3dhover.png") no-repeat center /
        100% 100%;
}
/* 人像库管理 */
.faceManage {
    background: url("../../assets/images/videoNewImg/videoImg/faceManage.png")
        no-repeat center / 90% 90%;
}
.faceManage:hover {
    background: url("../../assets/images/videoNewImg/videoImg/faceManageHover.png")
        no-repeat center / 100% 100%;
}
 .hashrate{
      background: url("../../assets/images/VideoStructPlatform/hashrate.png") no-repeat center / 90% 90%;
  }
  .hashrate:hover{
      background: url("../../assets/images/VideoStructPlatform/hashratehover.png") no-repeat center / 100% 100%;
  }
.department {
    background: url("../../assets/system/departmentnormal.png") no-repeat center /
        90% 90%;
}
.department:hover {
    background: url("../../assets/system/departmenthover.png") no-repeat center /
        100% 100%;
}
.user {
    background: url("../../assets/system/usernormal.png") no-repeat center / 90%
        90%;
}
.user:hover {
    background: url("../../assets/system/userhover.png") no-repeat center / 100%
        100%;
}
.role {
    background: url("../../assets/system/rolenormal.png") no-repeat center / 90%
        90%;
}
.role:hover {
    background: url("../../assets/system/rolehover.png") no-repeat center / 100%
        100%;
}
.log {
    background: url("../../assets/system/lognormal.png") no-repeat center / 90%
        90%;
}
.log:hover {
    background: url("../../assets/system/loghover.png") no-repeat center / 100%
        100%;
}
.dictionary {
    background: url("../../assets/system/dictionarynormal.png") no-repeat center /
        90% 90%;
}
.dictionary:hover {
    background: url("../../assets/system/dictionaryhover.png") no-repeat center /
        100% 100%;
}
.quitpment {
    background: url("../../assets/system/quitpmentnormal.png") no-repeat center /
        90% 90%;
}
.quitpment:hover {
    background: url("../../assets/system/quitpmenthover.png") no-repeat center /
        100% 100%;
}
.opration {
    background: url("../../assets/system/opration.png") no-repeat center / 90%
        90%;
}
.opration:hover {
    background: url("../../assets/system/oprationhover.png") no-repeat center /
        100% 100%;
}
.store {
    background: url("../../assets/system/store.png");
}
.timesync {
    background-image: url("../../assets/system/timesync.png");
}
.msgtake {
    background-image: url("../../assets/system/msgtake.png");
}
.msgnotic {
    background-image: url("../../assets/system/msgnotic.png");
}
</style>
