/*
 * @Author: your name
 * @Date: 2020-12-10 09:37:09
<<<<<<< .mine
<<<<<<< .mine
 * @LastEditTime : 2021-08-09 19:29:12
||||||| .r65296
 * @LastEditTime : 2021-05-26 15:00:49
=======
 * @LastEditTime : 2021-06-07 16:14:13
||||||| .r65311
 * @LastEditTime : 2021-06-07 16:14:13
=======
 * @LastEditTime : 2021-06-08 16:47:50
>>>>>>> .r65312
>>>>>>> .r65311
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/'
import Register from '@/page/register/'

//注册路由
Vue.use(Router)
// 解决路由Navigating to current location ("xxx路由") is not allowed
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}


//注册路由
Vue.use(Router)
//创建路由实例,配置router
export default new Router({
    routes: [{
            path: "/",
            redirect: "/login"
        },
        {
            path: "/loginin",
            // component: vehicle
            component: () =>
                import('../page/login/loginin'),
        },

        {
            path: "/platform",
            // component: platform
            component: () =>
                import('../components/platform'),
        },
        {
            path: "/vehicle",
            // component: vehicle
            component: () =>
                import('../page/vehicle/vehicle'),
        },
        {
            path: "/caseIndex",
            // component: caseIndex
            component: () =>
                import('../page/casestudy/caseIndex'),
        },
        {
            path: '/caseIndexcxp',
            // component: caseIndexcxp
            component: () =>
                import('../page/casestudy/caseIndexcxp'),
        },
        {
            path: '/content/:id',
            // component: Content
            component: () =>
                import('@/page/content'),
        },
        {
            path: '/province',
            // component: Province
            component: () =>
                import('@/components/province'),
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/admin',
            // component: AdminInformation
            component: () =>
                import('@/page/adminInformation/'),
        },
        {
            path: '/modifypass',
            // component: Modifypass
            component: () =>
                import('@/page/modifypass/'),
        },
        {
            path: '/logGrid',
            // component: LogGrid
            component: () =>
                import('../page/logGrid/logGrid'),
        },
        {
            path: '/dicGrid',
            // component: DicGrid
            component: () =>
                import('../page/dicGrid/dicGrid'),
        },
        // {
        //   path: '/ol',
        //   component: Ol
        // },
        // {
        //   path: '/olg',
        //   component: OLG
        // },
        {
            path: '/asto',
            // component: Asto,
            component: () =>
                import('../page/asto/asto.vue'),
        },
        {
            path: '/analyticcenter',
            // component: AnalyticCenter,
            component: () =>
                import('../page/analyticcenter/analyticcenter.vue'),
        },
        {
            path: '/newsfeed',
            // component: NewsFeed,
            component: () =>
                import('../page/newsfeed/newsfeed.vue'),
        },
        {
            path: '/visibility',
            // component: Visibility,
            component: () =>
                import('../page/visibility/visibility.vue'),
        },

        //系统管理
        {
            path: '/manage',
            // component: Manage
            component: () =>
                import('../page/manage/manage.vue'),
        },
        {
            path: '/manage/logManage',
            // component: LogManage
            component: () =>
                import('../page/logManage/logManage.vue'),
        },
        {
            path: '/manage/device',
            // component: Device
            component: () =>
                import('../page/device/device.vue'),
        },
        {
            path: '/manage/dicManage',
            // component: DicManage
            component: () =>
                import('../page/dicManage/dicManage.vue'),
        },

        {
            path: '/manage/roleManage',
            // component: RoleManage
            component: () =>
                import('../page/roleManage/roleManage.vue'),
        },
        {
            path: '/manage/faceManage',
            // component: FaceManage
            component: () =>
                import('../page/videoCombat/faceManage.vue'),
        },

        {
            path: "/manage/departmentManage",
            // component: DepartmentManage
            component: () =>
                import('../page/departmentManage/departmentManage.vue'),
        },
        {
            path: "/manage/case3DManage",
            // component: case3DManage
            component: () =>
                import('../page/case3DManage/case3DManage'),
        },
        {
            path: "/manage/userManage",
            redirect: "/manage/userManage/userList"
        },
        {
            path: "/manage/userManage",
            // component: UserManage,
            component: () =>
                import('../page/userManage/userManage.vue'),
            children: [{
                    path: "/manage/userManage/userList",
                    // component: UserList
                    component: () =>
                        import('../page/userManage/userList.vue'),
                },
                {
                    path: "/manage/userManage/userApprove",
                    // component: UserApprove
                    component: () =>
                        import('../page/userManage/userApprove.vue'),
                },
                // {
                //     path: '/manage/userManage/deviceDeploy',
                //     component: () =>
                //         // import('../page/userManage/deviceDeploy.vue'),
                //         import('../page/userManage/deviceDeploySky.vue'),
                // },
            ]
        },
        //天网配置
        {
            path: '/manage/userManage/deviceDeploy',
            component: () =>
                import('../page/userManage/deviceDeploySky.vue'),
        },

        /* 车辆判研*/
        {
            path: '/carJudged',
            // component: CarJudged
            component: () =>
                import('../page/carJudged/carJudged.vue'),
        },
        {
            path: '/device',
            // component: Device
            component: () =>
                import('../page/device/device.vue'),
        },
        {
            path: '/devicesubmit',
            // component: DeviceSubmit
            component: () =>
                import('../page/device/device_submit'),
        },
        /*车辆判研路由*/
        {
            path: '/carJudged/carTypeSearch',
            // component: CarTypeSearch
            component: () =>
                import('../page/carJudged/carTypeSearch.vue'),
        },
        {
            path: '/carJudged/carPlateSearch',
            // component: CarPlateSearch
            component: () =>
                import('../page/carJudged/carPlateSearch.vue'),
        },
        {
            path: '/carJudged/categorySearch',
            // component: CategorySearch
            component: () =>
                import('../page/carJudged/categorySearch.vue'),
        },
        {

            path: '/carJudged/synSearchCar',
            // component: SynSearchCar
            component: () =>
                import('../page/carJudged/synSearchCar.vue'),
        },

        {
            path: '/carJudged/imgSearchCar',
            // component: ImgSearchCar,
            component: () =>
                import('../page/carJudged/imgSearchCar.vue'),
            name: "imgSearchCar"
        },

        {
            path: '/carJudged/faceSearch',
            // component: faceSearch,
            component: () =>
                import('../page/carJudged/faceSearch.vue'),
            name: "faceSearch"
        },
        {
            path: '/carJudged/firstToCity',
            // component: firstToCity,
            component: () =>
                import('../page/carJudged/firstToCity.vue'),
            name: "firstToCity"
        },
        {
            path: '/carJudged/monitCar',
            // component: monitCar,
            component: () =>
                import('../page/carJudged/monitCar.vue'),
            children: [{
                path: '/carJudged/monitCar/monitDetail',
                // component: monitDetail,
                component: () =>
                    import('../page/carJudged/monitDetail.vue'),
            }]

        },
        {
            path: '/carJudged/foothold',
            // component: foothold,
            component: () =>
                import('../page/carJudged/foothold.vue'),
            name: 'foothold'
        },

        {
            path: '/carJudged/deployManage',
            // component: deployManage
            component: () =>
                import('../page/carJudged/deployManage.vue'),
        },
        {
            path: '/carJudged/deployApply',
            // component: deployApply,
            component: () =>
                import('../page/carJudged/deployApply.vue'),
            name: 'deployApply'
        },
        {
            path: '/carJudged/areaCrash',
            // component: areaCrash
            component: () =>
                import('../page/carJudged/areaCrash.vue'),

        },
        {
            path: '/carJudged/trackBack',
            // component: trackBack,
            component: () =>
                import('../page/carJudged/trackBack.vue'),
            name: 'trackBack'
        },
        {
            path: '/carJudged/oftenPass',
            // component: oftenPass
            component: () =>
                import('../page/carJudged/oftenPass.vue'),
        },
        {
            path: '/carJudged/drivingTogether',
            // component: drivingTogether,
            component: () =>
                import('../page/carJudged/drivingTogether.vue'),
            name: 'drivingTogether'
        },
        {
            path: '/carJudged/similarPlate',
            // component: similarPlate
            component: () =>
                import('../page/carJudged/similarPlate.vue'),
        },
        {
            path: '/carJudged/plateOverMuch',
            // component: plateOverMuch,
            component: () =>
                import('../page/carJudged/plateOverMuch'),
            name: 'plateOverMuch'
        },
        {
            path: '/carJudged/hideByDay',
            // component: hideByDay
            component: () =>
                import('../page/carJudged/hideByDay'),
        },
        {
            path: '/carJudged/currentDeploy',
            // component: currentDeploy
            component: () =>
                import('../page/carJudged/currentDeploy'),
        },
        {
            path: '/carJudged/currentDeploy/historyWarn',
            // component: historyWarn
            component: () =>
                import('../page/carJudged/historyWarn'),
        },
        {
            path: '/carJudged/carCount',
            // component: carCount
            component: () =>
                import('../page/carJudged/carCount'),
        },
        {
            path: '/carJudged/lookDeploy',
            // component: lookDeploy
            component: () =>
                import('../page/carJudged/lookDeploy'),
        },
        {
            path: '/carJudged/approveDeploy',
            // component: approveDeploy
            component: () =>
                import('../page/carJudged/approveDeploy'),
        },

        {
            path: '/carJudged/trafficStatistics',
            // component: trafficStatistics
            component: () =>
                import('../page/carJudged/trafficStatistics'),
        },

        {
            path: '/carJudged/motorcycle',
            // component: motorcycle
            component: () =>
                import('../page/carJudged/motorcycle'),
        },

        {
            path: '/videoCombat',
            // component: videoCombat
            component: () =>
                import('../page/videoCombat/videoindex.vue'),
        },
        {
            path: '/videoCombat/datacollection',
            // component: Datacollection
            component: () =>
                import('../page/videoCombat/datacollection.vue'),
        },
        {
            path: "/videoCombat/datacollection/onlinecollect",
            // component: Onlinecollect
            component: () =>
                import('../page/videoCombat/onlinecollect.vue'),
        },
        {
            path: '/videoCombat/taskMan',
            redirect: "/videoCombat/taskMan/nocolleted"
        },
        {
            path: "/videoCombat/taskMan",
            // component: Taskman,
            component: () =>
                import('../page/videoCombat/taskMan.vue'),
            children: [{
                    path: "/videoCombat/taskMan/nocolleted",
                    // component: NoColleted,
                    component: () =>
                        import('../page/videoCombat/taskMan/nocolleted.vue'),
                },
                {
                    path: "/videoCombat/taskMan/colleted",
                    // component: Colleted,
                    component: () =>
                        import('../page/videoCombat/taskMan/colleted.vue'),
                }
            ]
        },
        {
            path: "/videoCombat/taskMan/newtask",
            redirect: "/videoCombat/taskMan/newtask/videoreterval"
        },
        {
            path: "/videoCombat/taskMan/newtask",
            // component: Newtask,
            component: () =>
                import('../page/videoCombat/newTask.vue'),
            children: [{
                    path: '/videoCombat/taskMan/newtask/videoreterval',
                    // component: Videoreterval
                    component: () =>
                        import('../page/videoCombat/addTask/videoreterval.vue'),
                },
                {
                    path: '/videoCombat/taskMan/newtask/videostruc',
                    // component: Videostruc
                    component: () =>
                        import('../page/videoCombat/addTask/videostruc.vue'),
                },
                {
                    path: '/videoCombat/taskMan/newtask/stateprevice',
                    // component: Stateprevice
                    component: () =>
                        import('../page/videoCombat/addTask/stateprevice.vue'),
                }
            ]
        },
        {
            path: '/videoCombat/historyvideo',
            // component: HistoryVideo,
            component: () =>
                import('../page/videoCombat/historyvideo.vue'),
            meta: {
                title: '视图库作战平台....'
            }
        },
        {
            path: '/videoCombat/detaukStruc',
            // component: DetaukStruc
            component: () =>
                import('../page/videoCombat/detailStruc.vue'),
        },
        {
            path: '/videoCombat/commTolable',
            // component: commTolable
            component: () =>
                import('../page/videoCombat/commTolable.vue'),
        },
        {
            path: '/videoCombat/caseInfomanage',
            // component: videoUpload
            component: () =>
                import('../page/casestudy/caseinfomanage.vue'),
        },

        {
            path: '/videoCombat/soloscout',
            // component: Soloscout
            component: () =>
                import('../page/videoCombat/soloscout.vue'),
        },
        {
            path: '/videoCombat/twoscout',
            // component: Twoscout
            component: () =>
                import('../page/videoCombat/twoscout.vue'),
        },
        {
            path: '/videoCombat/special',
            // component: Special
            component: () =>
                import('../page/videoCombat/special.vue'),
        },
        {
            path: '/videoCombat/myCasCade',
            // component: myCasCade
            component: () =>
                import('../page/casestudy/myCasCade.vue'),
        },
        {
            path: '/casestudy/myCaseCade',
            // component: myCaseCade
            component: () =>
                import('../page/casestudy/myCaseCade.vue'),
        },

        {
            path: '/videoCombat/addcasetwo',
            // component: Videocasetwo
            component: () =>
                import('../page/casestudy/addcasetwo.vue'),
        },
        {
            path: '/videoCombat/faceManage',
            // component: FaceManage
            component: () =>
                import('../page/videoCombat/faceManage.vue'),
        },
        {
            path: '/videoCombat/lookMyApprovePage',
            // component: lookMyApprovePage
            component: () =>
                import('../page/casestudy/lookMyApprovePage.vue'),
        },
        {
            path: '/videoCombat/caseViewPlayer',
            // component: caseViewPlayer
            component: () =>
                import('../page/casestudy/caseViewPlayer.vue'),
        },
        {
            path: '/videoCombat/editMyApprovePage',
            // component: editMyApprovePage
            component: () =>
                import('../page/casestudy/editMyApprovePage.vue'),
        },








        {
            path: '/videoCombat/realvideo',
            // component: RealVideo,
            component: () =>
                import('../page/videoCombat/realvideo.vue'),
            meta: {
                title: '视图库作战平台..'
            }
        },
        {
            path: '/videoCombat/videoplay',
            // component: Videoplay,
            component: () =>
                import('../page/videoCombat/videoplay.vue'),
            meta: {
                title: '视图库作战平台.'
            }
        },
        {
            path: '/videoCombat/videomonitor',
            // component: Videomonitor,
            component: () =>
                import('../page/videoCombat/videomonitor.vue'),
            meta: {
                title: '视图库作战平台...'
            }

        },
        {
            path: '/videoCombat/searchImg',
            // component: SearchImg,
            component: () =>
                import('../page/videoCombat/searchImg.vue'),
            name: "searchImg"
        },
        {
            path: '/videoCombat/semantic',
            //  component: Semantic
            component: () =>
                import('../page/videoCombat/semantic.vue'),
        },

        //案事件研判路由
        {
            path: '/casestudy',
            // component: Casestudy,
            component: () =>
                import('../page/casestudy/casestudy.vue'),
        },
        {
            path: '/casestudy/cascadeApprove',
            // component: cascadeApprove
            component: () =>
                import('../page/casestudy/cascadeApprove.vue'),
        },
        {
            path: '/casestudy/myCasCade',
            // component: myCasCade
            component: () =>
                import('../page/casestudy/myCasCade.vue'),
        },

        {
            path: '/casestudy/approvePage',
            // component: approvePage
            component: () =>
                import('../page/casestudy/approvePage.vue'),
        },
        {
            path: '/casestudy/lookApprovePage',
            // component: lookApprovePage
            component: () =>
                import('../page/casestudy/lookApprovePage.vue'),
        },
        {
            path: '/casestudy/lookMyApprovePage',
            // component: lookMyApprovePage
            component: () =>
                import('../page/casestudy/lookMyApprovePage.vue'),
        },
        {
            path: '/casestudy/editMyApprovePage',
            // component: editMyApprovePage
            component: () =>
                import('../page/casestudy/editMyApprovePage.vue'),
        },
        {
            path: '/casestudy/approvePlayer',
            // component: approvePlayer
            component: () =>
                import('../page/casestudy/approvePlayer.vue'),
        },
        {
            path: '/casestudy/myApprovePlayer',
            // component: myApprovePlayer
            component: () =>
                import('../page/casestudy/myApprovePlayer.vue'),
        },
        {
            path: '/casestudy/cascadeView',
            // component: cascadeView
            component: () =>
                import('../page/casestudy/cascadeView.vue'),
        },
        {
            path: '/casestudy/lookCaseViewPage',
            // component: lookCaseViewPage
            component: () =>
                import('../page/casestudy/lookCaseViewPage.vue'),
        },
        {
            path: '/casestudy/caseViewPlayer',
            // component: caseViewPlayer
            component: () =>
                import('../page/casestudy/caseViewPlayer.vue'),
        },
        {
            path: '/casestudy/spaceMessage',
            // component: spaceMessage
            component: () =>
                import('../page/casestudy/spaceMessage.vue'),
        },

        {
            path: '/casestudy/caseMark',
            // component: caseMark
            component: () =>
                import('../page/casestudy/caseMark.vue'),
        },
        {
            path: '/casestudy/caseApprove',
            // component: caseApprove
            component: () =>
                import('../page/casestudy/caseApprove.vue'),
        },
        {
            path: '/casestudy/caseApprovePage',
            // component: caseApprovePage
            component: () =>
                import('../page/casestudy/caseApprovePage.vue'),
        },

        {
            path: '/casestudy/lookCaseApprovePage',
            // component: lookCaseApprovePage
            component: () =>
                import('../page/casestudy/lookCaseApprovePage.vue'),
        },

        {
            path: '/casestudy/caseRetrieval',
            // component: caseRetrieval
            component: () =>
                import('../page/casestudy/caseRetrieval/caseRetrieval.vue'),
        },
        {
            path: '/casestudy/caseRetrievalSearch',
            // component: caseRetrievalSearch
            component: () =>
                import('../page/casestudy/caseRetrieval/caseRetrievalSearch.vue'),
        },
        {
            path: '/casestudy/caseSearchReflex',
            // component: caseSearchReflex
            component: () =>
                import('../page/casestudy/caseRetrieval/caseSearchReflex.vue'),
        },
        {
            path: '/casestudy/casePictureCombat',
            // component: casePictureCombat
            component: () =>
                import('../page/casestudy/caseRetrieval/casePictureCombat.vue'),
        },
        {
            path: '/casestudy/imgSearchCase',
            // component: imgSearchCase
            component: () =>
                import('../page/casestudy/caseRetrieval/imgSearchCase.vue'),
        },
        {
            path: '/casestudy/case3DSearch',
            // component: case3DSearch
            component: () =>
                import('../page/casestudy/caseRetrieval/case3DSearch.vue'),
        },

        {
            path: '/casestudy/caseInfostat',
            // component: CaseInfoStat
            component: () =>
                import('../page/casestudy/caseInfostat.vue'),
        },

        {
            path: '/casestudy/casetimestat',
            // component: CaseTimeStat
            component: () =>
                import('../page/casestudy/casetimestat.vue'),
        },
        {
            path: '/casestudy/caseareastat',
            // component: CaseAreaStat
            component: () =>
                import('../page/casestudy/caseareastat.vue'),
        },
        {
            path: '/casestudy/casesortstat',
            // component: CaseSortStat
            component: () =>
                import('../page/casestudy/casesortstat.vue'),
        },
        {
            path: '/casestudy/casetypestat',
            // component: CaseTypeStat
            component: () =>
                import('../page/casestudy/casetypestat.vue'),
        },
        {
            path: '/casestudy/casevideostat',
            // component: CaseVideoStat
            component: () =>
                import('../page/casestudy/casevideostat.vue'),
        },
        {
            path: '/casestudy/caseInfomanage',
            // component: CaseInfomanage
            component: () =>
                import('../page/casestudy/caseinfomanage.vue'),
        },
        {
            path: '/casestudy/caseInfomanage/addcase',
            // component: Addcase
            component: () =>
                import('../page/casestudy/addcase.vue'),
        },
        {
            path: '/casestudy/caseInfomanage/addsyncase',
            // component: AddSynCase
            component: () =>
                import('../page/casestudy/addsyncase.vue'),
        },
        {
            path: '/casestudy/caseInfomanage/addcasetwo',
            // component: Addcasetwo
            component: () =>
                import('../page/casestudy/addcasetwo.vue'),
        },
        //  {
        //    path: '/casestudy/caseInfomanage/addcasetwo1',
        //   //  component: Addcasetwo1
        //    component: () =>
        //   import('../page/casestudy/addcasetwo1.vue'),
        //  },
        {
            path: '/casestudy/myupload',
            //  component: MyUpload
            component: () =>
                import('../page/casestudy/myupload.vue'),
        },
        {
            path: '/casestudy/mycollect',
            //  component: MyCollect
            component: () =>
                import('../page/casestudy/mycollect.vue'),
        },
        {
            path: '/casestudy/mybrowse',
            //  component: MyBrowse
            component: () =>
                import('../page/casestudy/mybrowse.vue'),
        },


        {
            path: '/casestudy/casCadePlayer',
            // component: casCadePlayer
            component: () =>
                import('../page/casestudy/casCadePlayer.vue'),
        },

        {
            path: '/casestudy/case3DSearchResult',
            // component: case3DSearchResult
            component: () =>
                import('../page/casestudy/caseRetrieval/case3DSearchResult.vue'),
        },
        {
            path: '/casestudy/casePicture_look',
            // component: casePicture_look
            component: () =>
                import('../page/casestudy/caseRetrieval/casePicture_look.vue'),
        },
        {
            path: '/videoCombat/casePicture_look',
            // component: casePicture_look
            component: () =>
                import('../page/casestudy/caseRetrieval/casePicture_look.vue'),
        },
        {
            path: '/casestudy/mysynergy',
            //  component: Mysynergy
            component: () =>
                import('../page/casestudy/mysynergy'),
        },

        {
            path: "/videoCombat/personFace",
            // component: 人脸1V1
            component: () =>
                import('../page/casestudy/personFace.vue'),
        },
        {
            path: "/videoCombat/caseInfoExhibition",
            component: () =>
                import('../page/casestudy/caseInfoExhibition.vue'),
        },
        //可视化
        {
            path: "/videoCombat/viewinfo",
            component: () =>
                import('../page/casestudy/ViewInfo.vue'),
        },
        // 结构化平台
        {
            path: '/videoStrucPlat',
            component: () =>
                import('../page/VideoStructPlatform/VideoStructPlatform.vue'),
        },
        //语义搜索
        {
            path: "/videoStrucPlat/semanticSearch",
            // component:语义搜索
            component: () =>
                import('../page/VideoStructPlatform/semanticSearch.vue'),
        },
        //以图搜图
        {
            path: "/videoStrucPlat/searchPrint",
            component: () =>
                import('../page/VideoStructPlatform/searchPrint.vue'),
        },
        {
            path: "/videoStrucPlat/resourceManage",
            component: () =>
                import('../page/VideoStructPlatform/resourceManage.vue'),
        },
        {
            path: "/videoStrucPlat/taskManage",
            component: () =>
                import('../page/VideoStructPlatform/taskManage.vue'),
        },
        {
            path: "/videoStrucPlat/hashrate",
            component: () =>
                import('../page/VideoStructPlatform/hashrate.vue'),
        },
        {
            path: "/manage/hashrate",
            component: () =>
                import('../page/VideoStructPlatform/hashrate.vue'),
        },
        // 结构化平台
        {
            path: "/caseindexStruct",
            component: () =>
                import('../page/VideoStructPlatform/caseindexStruct.vue'),
        },
        // 视频检索
        {
            path: "/videoStrucPlat/videoRetrieval",
            component: () =>
                import('../page/VideoStructPlatform/videoRetrieval.vue'),
        },
        {
            path: "/videoStrucPlat/caseParticulars",
            component: () =>
                import('../page/VideoStructPlatform/caseInfo/caseParticulars.vue'),
        },
        //一体机案件列表
        {
            path: "/videoStrucPlat/caseList",
            component: () =>
                import('../page/VideoStructPlatform/caseInfo/caseList.vue'),
        },
        //一体机标注池
        {
            path: "/videoStrucPlat/MarkPool",
            component: () =>
                import('../page/VideoStructPlatform/caseInfo/MarkPool.vue'),
        },
        //布控结果
        {
            path: "/videoStrucPlat/viseResult",
            component: () =>
                import('../page/VideoStructPlatform/viseResult.vue'),
        },
        // {
        //     path: "/videoStrucPlat/test",
        //     component: () =>
        //         import('../page/VideoStructPlatform/test.vue'),
        // },
    ]
})
