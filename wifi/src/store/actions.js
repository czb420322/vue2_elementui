
import * as type from './mutations_type.js'
// import jsonp from 'jsonp'
import axios from 'axios'
export default{
    //首页切换全文检索层
    toggleSearch({commit,state}){
        commit(type.TOGGLE_PIC_DIV)
    },
    //登陆页切换管理员信息
    toggleAdminInfo({commit,state}){
        console.log("切换管理员信息")
        commit("TOGGLE_ADMIN_INFO")
        console.log("切换管理员信息")
    },

    //获取toke
    getToken({commit,state}, token){
        // commit("TOKEN")
        state.token=token;
    },

    //获取currentUser
    // getCurrentUser({commit,state},data){
    //     // commit("CURRENT_USER_NAME")
    //     state.currentUser=data.userName
    // }

    //改变设备管理类型
    changeDeviceType({commit,state},index){
        state.deviceType = index
    },

    //设备类型是否可编辑
    isDeviceEmit({commit,state},bool){
        // console.log("修改emit陈工")
        state.deviceEmit = bool
        // console.log("修改emit陈工")
        // commit('DEVICEEMIT')
    },

    //设备类型是否可提交
    isDeviceSubmit({commit,state}){
        // state.deviceSubmit = !state.deviceSubmit
        // console.log(state.deviceSubmit+"***~~~")
        commit('DEVICESUBMIT')
        // console.log(state.deviceSubmit+"***")
    },

    //初始化地图实例
    mapInit({commit,state},map){
        state.map = map
        // console.log('Action数据变化')
        // console.log(state.map)
        // console.log('Action数据变化')
    },
    getPoint({commit,state},point){
        state.point = point
    },
    //rightclick地图时的点位
    rightClickMap({commit,state},point){
        state.point = point
    },
    changeOK({commit,state}){
        state.ok = !state.ok
    },
    setMarkerData({commit,state},markerData){
        state.markerData = markerData
    },
    setIdx({commit,state},index){
        state.idx = index
    },
    deviceData({commit,state},data){
        console.log("修改deviceDataList")
        state.deviceDataList = data
        console.log("修改deviceDataList")
    },

    selectdistid({commit,state},id){
        console.log("修改区域id")
        state.selectdist  = id
        console.log("修改区域id")
    },
    closeAllModel ({commit}) {
      commit('AllModel');
    },

    //视频
    async updateDeviceVideoData({commit,dispatch,state}){
        return axios.post('/sys/ape/selectByVideo').then(res=>{
            commit("UPDATEVIDEO",res.data.data)
        })
    },

     //人像
    async updateDeviceFaceData({commit,dispatch,state}){
        return axios.post('/sys/ape/selectByPortrait').then(res=>{
            commit("UPDATEFACE",res.data.data)
        })
    },
    //设置是否能修改标注
    toggleHandLable({commit}){
      commit("setHandlable")
    },
    toggleHandfalse({commit}){
      commit("setHandlablefalse")
    },
    togglePersonLable({commit}){
      commit("setPersonCase")
      console.log("切换成功222")
    },
    togglePersonfalse({commit}){
      console.log("切换成功1111111")
      commit("setPersonCasefalse")
      console.log("切换成功33333")
    },
    getonlineDeviceList({commit}){
        // return axios.post('/sms/ape/selectByGbsApe').then(res=>{
        return axios.post('/sms/ape/selectByGbsApeTree').then(res=>{
            console.log('是否触发5555666');
            commit("setonlineDeviceList",res.data.data)
        })
    }
    // updateHanble({commit,state},data){
    //   state.hanlabel = data
    // }

}
