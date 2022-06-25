/*
 * @Author: your name
 * @Date: 2020-10-16 13:29:39
 * @LastEditTime : 2021-06-08 17:21:51
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\store\getters.js
 */
export default {
    // 接口请求返回的状态值存入返回时间   用于多个请求一起返回同样的提示信息时只提示一次
    getResCodeTime: state => {
        return state.resCodeTime;
    },
    getCurrentUser: state => {
        return state.currentUser;
    },
    getMenuRouter: state => {
        return state.menurouter;
    },
    getToIndex: state => {
        return state.toIndex;
    },
    getCurrentUserImg: state => {
        return state.currentUserImg
    },
    getWarnMessage: state => {
        return state.warnMessage
    },
    getshowAllModel: state => {
        return state.showAllModel
    },
    //得到手工标注
    ishandupdate(state) {
        return state.ishandupdate
    },
    //
    gethanlabel(state) {
        return state.hanlabel
    },
    //
    getshowPersonCase(state) {
        return state.showPersonCase
    },
    //glst结构化一次排查返回的筛选条件信息
    glststrusInfo(state) {
        return state.glststrusInfo
    },
    //中科院结构化一次排查返回的筛选条件信息
    zkystrusInfo(state) {
        return state.zkystrusInfo
    },
    glstfeature(state) {
        return state.glstfeature
    },
    // 获取人脸属性比对信息
    sendInfo(state) {
        return state.sendInfo
    },
    //返回消息推动的对象
    pushMessage(state) {
        return state.pushMessage
    },
    //返回消息推送的类别
    messagerank(state) {
        return state.messagerank
    },
    //返回消息推送的显示和隐藏
    pushbool(state) {
        return state.pushbool
    },
    //设置结构化信息的显示和隐藏
    showInfo(state) {
        return state.showInfo
    },
    //结构化信息的类型  人车骑车人
    showInfoMan(state) {
        return state.showInfoMan
    },
    //结构化信息的类型  人车骑车人
    lableInfo(state) {
        return state.lableInfo
    },
    //结构化信息的类型  人车骑车人
    lableInfoMan(state) {
        return state.lableInfoMan
    },
    //真实名称
    trueName(state) {
        return state.trueName
    },
    //是否返回glst的结构化信息
    showglstinfo(state) {
        return state.showglstinfo
    },
    //返回glst的结构化人车骑车人信息
    glstargetinfo(state) {
        return state.glstargetinfo
    },
    //是否返回zky的结构化信息
    showzkyinfo(state) {
        return state.showzkyinfo
    },
    //返回zky的结构化人车骑车人信息
    zkytargetinfo(state) {
        return state.zkytargetinfo
    },
    //点击当前点位的信息
    deviceInfo(state) {
        return state.deviceInfo
    },
    searchImgBtn(state) {
        return state.searchImgBtn
    },
    //返回检索片段播放时候的所有信息
    videoretriInfo(state) {
        return state.videoretriInfo
    },
    //返回当前案件是否属于协同案件
    showjudged(state) {
        return state.showjudged
    },
    isupdatejudged(state) {
        return state.isupdatejudged
    },
    //得到手工标注
    isShowLoading(state) {
        return state.isShowLoading
    },
    openSDK(state) {
        return state.openSDK
    },
    sdkInfo(state) {
        return state.sdkInfo
    },
    isopenOffVideo(state) {
        return state.isopenOffVideo
    },
    isopenOnVideo(state) {
        return state.isopenOnVideo
    },
    // 中科院结构化tab
    iszkyStrucTable(state) {
        return state.iszkyStrucTable
    },
    //设置研判消息推送值
    judgeDetails(state) {
        return state.judgeDetails
    },
    // 中科院结构化点击
    zkyNum(state) {
        return state.zkyNum
    },
    showDxplayer(state) {
        return state.showDxplayer
    },
    DxplayerInfo(state) {
        return state.DxplayerInfo
    },
    // 存放快捷以图搜图的时候当前点击的对象以及存放的数组
    targetToSearchImg(state) {
        return state.targetToSearchImg
    },
    ////是从哪个地方打开的结构化目标，一个是案件管理中，一个是任务管理中
    targetToOenStrus(state) {
        return state.targetToOenStrus
    },
    // 是否打开大图
    showlookImgPic(state) {
        return state.showlookImgPic
    },
    // 是否打开大图
    showlookBigImg(state) {
        return state.showlookBigImg
    },
    strusResult(state) {
        return state.strusResult
    },
    showStructDxplayer(state) {
        return state.showStructDxplayer
    },
    //  一次排查结构化属性
    zkyStusinfo(state) {
        return state.zkyStusinfo
    },
    structureFileUuid(state) {
        return state.structureFileUuid
    },
    routerlink(state) {
        return state.routerlink
    },
    //存放快捷以车搜的时候当前点击的对象和存放的数组
    targetToSearchImgCar(state) {
        return state.targetToSearchImgCar
    },
    nowplayObj(state){
        return state.nowplayObj
    },
    showplayvideo(state){
        return state.showplayvideo
    },
    onlineDeviceList(state){
        return state.onlineDeviceList
    }
}
