/*
 * @Author: your name
 * @Date: 2020-10-28 09:14:12
 * @LastEditTime : 2021-06-08 17:25:02
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\store\mutations.js
 */
import * as type from './mutations_type.js'
export default {
    [type.TOGGLE_PIC_DIV](state) {
        state.status = !state.status;
    },

    ["TOGGLE_ADMIN_INFO"](state) {
        state.ifAdminInfo = !state.ifAdminInfo;
    },
    // ["CURRENT_USER_NAME"](state,token){
    //     state.currentUser=token;
    // },
    ["TOKEN"](state, token) {
        state.token = token;
    },
    ["DEVICEEMIT"](state, bool) {
        console.log("修改emit修改emit修改emit")
        state.deviceEmit = bool
        console.log('修改emit')
        // console.log(state.deviceEmit)
    },
    ["DEVICESUBMIT"](state) {
        // console.log(state.deviceSubmitDiv+'999999')
        state.deviceSubmitDiv = !state.deviceSubmitDiv
        // console.log(state.deviceSubmitDiv+'999999')
    },
    ['UPDATEVIDEO'](state, data) {
        state.videoList = data
    },
    ['UPDATEFACE'](state, data) {
        state.faceList = data
    },
    ['GETMAP'](state, map) {

        state.map = map
    },
    //更改请求返回的时间值
    ['RESCODETIME'](state, data) {
        state.resCodeTime = data;
    },
    setCurrentUser(state, data) {
        state.currentUser = data;
    },
    setMenuRouter(state, data) {
        state.menurouter = data;
    },
    setToIndex(state, data) {
        state.toIndex = data;
    },
    setCurrentUserImg(state, data) {
        state.currentUserImg = data;
    },
    setWarnMessage(state, data) {
        state.warnMessage = data;
    },
    setistuInfoShow(state, istuInfoShow) {
        state.istuInfoShow = istuInfoShow
    },

    //修改文本框的值
    setVideohand(state) {
        state.videoHand = !state.videoHand
    },
    //设置是否能修改标注
    setHandlable(state) {
        state.ishandupdate = true;
    },
    setHandlablefalse(state) {
        state.ishandupdate = false;
    },
    // 是否显示保存串并
    setPersonCase(state) {
        state.showPersonCase = false;
    },
    setPersonCasefalse(state) {
        state.showPersonCase = true;
    },
    //修改手工标注信息
    updatehanlabel(state, data) {
        state.hanlabel = data;
    },
    //通过glst一次排查的返回来更改返回值
    setzkystrusInfo(state, data) {
        state.zkystrusInfo = data;
    },
    //通过zky一次排查的返回来更改返回值
    setglststrusInfo(state, data) {
        state.glststrusInfo = data;
    },
    //通过一次排查的返回来更改返回值
    setglstfeature(state, data) {
        state.glstfeature = data;
    },
    // 设置中科院结构化点击
    setzkyNum(state, data) {
        state.zkyNum = data
    },
    //给人员属性嫌疑目标赋值
    setsendInfo(state, data) {
        state.sendInfo = data;
    },
    //给消息推送的对象赋值
    setpushMessage(state, data) {
        state.pushMessage = data;
    },
    //设置消息推送的类别
    setmessagerank(state, data) {
        state.messagerank = data
    },
    //设置消息推送的隐藏和显示
    showhidepushbool(state, data) {
        state.pushbool = data
    },
    //设置结构化信息的隐藏和显示
    setshowInfo(state, data) {
        state.showInfo = data
    },
    //结构化信息的类型  人车骑车人
    setshowInfoMan(state, data) {
        state.showInfoMan = data
    },
    //结构化信息
    setlableInfo(state, data) {
        state.lableInfo = data
    },
    //结构化信息
    setlableInfoMan(state, data) {
        state.lableInfoMan = data
    },
    //设置真实名称
    settrueName(state, data) {
        state.trueName = data
    },

    // hidepushbool(state,data){
    //   state.messagerank = data
    // }
    //添加消息提醒的数组
    // AddMessage(state,dataMsg) {
    //   //把webscoket发送过来的消息存入到messageWarn中
    //  state.messageWarn.unshift(dataMsg)
    // },
    // //修改消息提醒的数组
    // UpdataMessage(state,value){
    //    state.messageWarn.splice(value, 1)
    // },

    //添加上部分的数据
    AllTopMsg(state, dataMsg) {

        if (dataMsg.length) {
            for (let i = 0; i < dataMsg.length; i++) {
                if (dataMsg[i].mType == 2) {
                    if (dataMsg[i].judgeId == "0") {
                        dataMsg[i].typeName = "属性";
                    } else if (dataMsg[i].judgeId == "1") {
                        dataMsg[i].typeName = "人员特征";
                    } else if (dataMsg[i].judgeId == "2") {
                        dataMsg[i].typeName = "车辆特征";
                    } else if (dataMsg[i].judgeId == "3") {
                        dataMsg[i].typeName = "人";
                    } else if (dataMsg[i].judgeId == "4") {
                        dataMsg[i].typeName = "车";
                    } else if (dataMsg[i].judgeId == "5") {
                        dataMsg[i].typeName = "骑车人";
                    }
                }

            }
        }

        state.messageList = dataMsg;

    },
    AllModel(state) {
        state.showAllModel = !state.showAllModel;
        console.log(state.showAllModel);
    },

    //是否给gslt的结构化信息赋值
    setshowglstinfo(state, data) {
        state.showglstinfo = data
    },
    //返回glst的结构化人车骑车人信息
    setglstargetinfo(state, data) {
        state.glstargetinfo = data
    },
    //是否给zky的结构化信息赋值
    setshowzkyinfo(state, data) {
        state.showzkyinfo = data
    },
    //返回zky的结构化人车骑车人信息
    setzkytargetinfo(state, data) {
        state.zkytargetinfo = data
    },
    //设置当前点击当前点位的信息
    setdeviceInfo(state, data) {
        state.deviceInfo = data
    },
    //  //修改全部数据
    //  UpdataAllMessage(state,data){
    //   state.messageWarn = data
    //  }
    // 给以图搜图图片赋值
    setsearchImgBtn(state, data) {
        state.searchImgBtn = data
    },
    //给检索片段播放的时候赋值
    setvideoretriInfo(state, data) {
        state.videoretriInfo = data
    },
    //设置当前案件是否是协同
    setshowjudged(state, data) {
        state.showjudged = data
    },
    setisupdatejudged(state, data) {
        state.isupdatejudged = data
    },
    // 设置上传附件是否显示正在上传load
    setIsShowLoading(state, data) {
        state.isShowLoading = data
    },
    //设置打开SDK
    setopenSDK(state, data) {
        state.openSDK = data
    },
    setsdkInfo(state, data) {
        state.sdkInfo = data
    },
    //设置播放器的在线状态和离线状态
    setisopenOffVideo(state, data) {
        state.isopenOffVideo = data
    },
    setisopenOnVideo(state, data) {
        state.isopenOnVideo = data
    },
    //设置研判消息推送值
    setjudgeDetails(state, data) {
        state.judgeDetails = data
    },
    // 设置中科院结构化tab
    setiszkyStrucTable(state, data) {
        state.iszkyStrucTable = data
    },
    setshowDxplayer(state, data) {
        state.showDxplayer = data
    },
    setDxplayerInfo(state, data) {
        state.DxplayerInfo = data
    },
    // 存放快捷以图搜图的时候当前点击的对象以及存放的数组
    settargetToSearchImg(state, data) {
        state.targetToSearchImg = data
    },
    ////是从哪个地方打开的结构化目标，一个是案件管理中，一个是任务管理中
    settargetToOenStrus(state, data) {
        state.targetToOenStrus = data
    },
    // 给大图设置开关
    setshowlookImgPic(state, data) {
        state.showlookImgPic = data
    },
    // 给大图设置开关
    setshowlookBigImg(state, data) {
        state.showlookBigImg = data
    },
    setstrusResult(state, data) {
        state.strusResult = data
    },
    //  一次排查结构化属性
    setzkyStusinfo(state, data) {
        state.zkyStusinfo = data
    },
    setstructureFileUuid(state, data) {
        state.structureFileUuid = data
    },
    //设置以车搜车时的值
    settargetToSearchImgCar(state, data) {
        state.targetToSearchImgCar = data
    },
    setrouterlink(state, data) {
        state.routerlink = data
    },
    setshowStructDxplayer(state, data) {
        state.showStructDxplayer = data
    },
    setnowplayObj(state, data) {
        state.nowplayObj = data
    },
    setshowplayvideo(state, data) {
        state.showplayvideo = data
    },
    setonlineDeviceList(state,data){
        console.log(data,'是否触发');
        state.onlineDeviceList = data
    }


}
