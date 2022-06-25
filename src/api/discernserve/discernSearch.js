/*
 * @Author: your name
 * @Date: 2021-03-17 19:54:28
 * @LastEditTime : 2021-05-25 15:59:35
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes\src\api\discernserve\discernSearch.js
 */

import qs from 'qs'
import axios from 'axios'

// 以图搜图图片识别接口
const recImage = (data) => axios.post('/vsas/structure/recImage',qs.stringify(data))
// 获取当前案件下的最小时间和最大视频时间
const getSmLaTime = (data) => axios.get('/vsas/structure/getDate',{params: data})

//获取当前案件下是否有无未完成的任务
const getcheckTaskFinish= (data) => axios.post('/vsas/task/checkTaskFinish',qs.stringify(data))

//获取视频列表
const getvideolist= (data) => axios.get('/vsas/collection/offline/list',{params: data})

export {
  recImage,
  getSmLaTime,
  getcheckTaskFinish,
  getvideolist
}
